---
title: "CD Events and Updatecli"
date: 2024-01-11T00:00:00+00:00
draft: false
weight: 50
images: [""]
contributors: ["olblak"]
---

## Introduction

If there is one thing I learned working with various CI tools, is, not everything should be handled by those CI solutions.

I am sorry but I had to say it.

Don't get me wrong,  CI tools like Jenkins, disrupted the way we build software. Jenkins has a tremendous plugin ecosystem. Even almost 20 years after its creation, Jenkins remains in the top 10 of the Linux Foundation project with the biggest development velocity as per Linux Foundation [**link**](https://docs.google.com/spreadsheets/d/1aiHuku3_DZZCjcdm9FLftIVjSWsSdcoBrhOp37Jwi5g/edit#gid=1169691230)

And yet I truly believe a CI should focus on orchestrating pipelines by leveraging various [**CD events**](https://cdevents.dev/) while being agnostic of what those pipelines are doing.

Updatecli came out from the Jenkins project. Jenkins as a large open source project with many different components, contributors,  technologies, and also some legacy too. it was hard, for me, to keep up, and easy to mess up.

I started building a tool that would allow me to describe with manifest(s), where the information is coming from and how it should be propagated between those components, contributors, etc. The source of truth had to be git repositories so everybody could learn, audit, and improve our work. I needed a tool to automatically push changes to those git repositories based on various information.

The idea behind Updatecli was born.

One of the early design decisions made was to build a command line tool instead of another Jenkins plugin. I wanted to be able to execute the same command on my machine (Linux), contributors machines (Linux/MacOS/Windows) AND Jenkins.  Yes, Jenkins as a CI solution was the cornerstone of what I wanted to achieve.

Ultimately, It was easier to test locally and I could leverage CI events.

The core idea behind an Updatecli manifest can be resumed as this.

1. Define the **source** aka where the information is coming from
2. Define the **target**  aka what file should be updated based on the source information
3. Define the **condition** aka what are the condition to pass before updating my target
4. Define the **scm** aka the Git repository to interact with
5. Define the **action** aka what to do when a target is modified for example pushing the change to a temporary branch on a git repository and then opening a pull request.

Updatecli was meant to be executed from Jenkins and leveraging the various event type that a classical CI solution offers. I also wanted to make it easier to define update policies locally without additional constraints.

We learned a few things about Updatecli and CD events, and how it helped us build many different types of Update pipeline.

This blog post is not about how we use Updatecli within Jenkins but how we built it to be CI agnostic. For the remaining part of this blog post, I am going to use another popular CI solution nowadays: GitHub Action, the GitHub CI service.

* GitHub Action is not open source but it's free for public projects
* GitHub Action doesn't have a large plugin ecosystem but preferred to talk about a marketplace.
* GitHub Action is not super fast but it's free and you can still pay for faster runner if need

Overall, GitHub action is easy to pick, it works well within GitHub but, unless of a good reason, it's usually a good rule of thumb to avoid being too much tightly couple to a specific solution.

*When an open source project evolves the wrong way, often the only solution is either to quit or to fork.*  
*When a company evolves the wrong way, often the only solution is either to quit or to pay.*  
*In the end it's all about risk management but quitting should always remain a viable alternative.*  

## CD Events

GitHub Action provides many different types of events, some are quite common for CI tools, like cronjob scheduler and others are specific to GitHub like someone starring the GitHub repository.

I'll focus on common CI events which makes **my** usage of Updatecli, CI agnostic.

### On Manual

*Trigger your workflow manually. [**doc**](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch)*

```yaml
name: updatecli
on:
  workflow_dispatch:
```

`workflow_dispatch` is probably the easiest event to use.

It allows users to manually trigger a pipeline on demand via the GitHub user interface. We usually rely on this if either a pipeline failed or if we are just impatient to wait for another event to trigger.

This is the equivalent of running Updatecli on a developer machine except that the CI has more credentials configured, or at least it should.

### On Push

*Run your workflow when you push a commit or tag, or when you create a repository from a template.  [**doc**](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#push)*

```yaml
on:
  push:
    branches:
      - main
```

We often use this trigger as a fallback. If someone or something changes the git repository then we trigger Updatecli to ensure that repository complies with the state defined by Updatecli manifest.

For example just before an important release, we identify a major regression with one of the dependencies. It's unfortunate because we executed all the automated tests but they didn't catch the regression. So we decide to rollback to the previously known "stable" version to unblock the release.
Now, right after the rollback, Updatecli reopened a pull request with the latest unstable version which triggers tests once again. Now we know that once the release is delivered, our new priority becomes to add a test case to catch the regression, fix the regression and only then move to the next release work.

### On pullrequest

*Runs your workflow when activity on a pull request in the workflow's repository occurs. [**doc**](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request)*

```yaml
on:
  pull_request:
```

We rely on the `pull_request` event to trigger Updatecli in "dryrun" mode to validate that the changes introduced by the pullrequest is not breaking existing Updatecli pipeline.

This pipeline should only have read-only permission as it shouldn't change anything.
It's one of those great synergy between GitHub action and GitHub repository as we don't have to configure specific short live credentials.
When we execute Updatecli from a GitHub action workflow, we rely on the `GITHUB_TOKEN` to have the right permission as explained on [GitHub Documentation](https://docs.github.com/en/actions/security-guides/automatic-token-authentication)

## External

*Trigger a webhook event called [`repository_dispatch`](https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#repository_dispatch) when you want to trigger a workflow for activity that happens outside of GitHub. [**doc**](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#repository_dispatch)*

```yaml
on:
  repository_dispatch:
    types: [project-release]
```

The `repository_dispatch` is an interesting event which turns out to be amazing when combined with Updatecli to orchestrate a release across different repositories.

For example, we use this approach on the Epinio project, where the main repository [epinio/epinio](https://github.com/epinio/epinio) relies on [peter-evans/repository-dispatch](https://github.com/peter-evans/repository-dispatch) to trigger right after [Goreleaser](https://goreleaser.com/), a release event,  to send to other Git repositories. When those targeted repositories receive the "release" event, they trigger an Updatecli execution to retrieve the latest Epinio version that just got released  and then:

* [epinio/docs](https://github.com/epinio/docs)
  * Update installation URL links
  * Generate the new version website used by Docusaurus
* [epinio/helm-charts](https://github.com/epinio/helm-charts)
  * Update Epinio helm chart docker images to reference the latest Epinio version.

This greatly speed up the release process as we went from "please don't forget to do X on each repository" to "please review all pull requests associated with the release".

Obviously this chain of pipeline requires a bit of configuration but once in place it becomes a real time saver.

## Schedule

*The `schedule` event allows you to trigger a workflow at a scheduled time. [**doc**](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request)*

```yaml
on:
  schedule:
    - cron: '0 * * * *'
```

The schedule is probably the easiest one to use and the most difficult one to master as It can be used for different scenarios.

**Updatecli is designed to be idempotent.**

This means that no matter how often it is executed, the result will always be the same. So it's tempting to execute Updatecli often **but** running it too many times has some side effects too.

1. We may exhaust third API limit quickly like on GitHub
2. Each pull request opened by Updatecli will more than likely trigger a CI job which may exhaust API limit version quickly (cfr1)
3. Each pull request opened by Updatecli will more than likely trigger a notification which may increase the level of noise for the team.

To decide whether we want a small/long time frame usually depends if we monitor internal or external dependencies.

### Internal Dependencies

By internal dependencies, we mean all dependencies own by the team.
Usually we want to go fast so we prefer the `repository_dispatch` event but we can use the schedule as a fallback mechanism in case another event failed.

### External Dependencies

By external dependencies, we mean all dependencies the team has no control over.
Usually they are a bit more complex and depends on the dependency and the project where the dependency is used.

For projects in "maintenance" mode, differently said, that doesn't change much. We trigger Updatecli every few days/weeks and we group all the changes together so we can only review the changes once in a while.

## What's next?

In this post, I covered the CD events I mainly use with Updatecli but they are many more. There is an incubated project at the Continuous Delivery Foundation that maintain a common specification for continuous delivery events, available at https://cdevents.dev/

## Design Pipeline

Each time I have a problem which can be solve with CI solution, before jumping in the fully integrated solution. I usually proceed this way:

*Do I need to execute a few simple commands?*

If yes, then I hide the commands behind a **simple** Makefile so I can run them such as  `make build`, `make test`, `make release`

* It allows me to run the same command on my machine than I would do from the CI.
* No matter the project, I always end-up running the same command.
* If I need to change the command, I only do it once.

*Do I need to execute complex instructions?*

If yes, it's probably better to move the complexity from the Makefile to a shell script. Not everybody knows all the details of the Makefile syntax. That being said, the Makefile remains the main abstraction that now executes custom scripts.

*Does my complex script become hard to maintain?*

Well that is the final evolution where I build a tool using a programming language like Golang.
That's where Updatecli stand today:

* There are so many edge cases to consider.
* Updatecli interacts with a lot of API which require proper testing.

## Conclusion

No matter the event type we rely on, the longer we wait to merge a pull request created by Updatecli, the bigger is the chance to be affected by merge conflict. But even long running pull requests have benefits. They remind us that we'll need to schedule time to properly maintain our projects because the longer we wait to update dependencies, the bigger is the risk to do it at the worst time which ultimately leads to costly consequences.

## Links

* [triggering a workflow](https://docs.github.com/en/actions/using-workflows/triggering-a-workflow)
* [manually trigger a workflow](https://docs.github.com/en/actions/using-workflows/manually-running-a-workflow)
* [events that trigger workflows](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)
* [cncf/velocity](https://github.com/cncf/velocity)
* [cdevents](https://cdevents.dev)
