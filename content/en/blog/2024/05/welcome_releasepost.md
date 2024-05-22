---
title: "Welcome Releasepost"
date: 2024-05-22T00:00:00+00:00
draft: false
weight: 50
images: [""]
contributors: ["olblak"]
---

No matter the project I am working on, I am constantly looking for project release notes.

The good news is we now have access to great tools to automatically generate those release notes such as [Release Drafter](https://github.com/release-drafter/release-drafter), [Changie](https://github.com/miniscruff/changie), [Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog), etc.

In 2024, there is no excuse to skip that critical piece of information.

The sad news is that I now spend a significant amount of time searching for those release notes on platforms like GitHub...

---

_What if I could visualize Updatecli changelogs from [www.updatecli.io](https://www.updatecli.io/changelogs/updatecli)?_

_How many people read release notes?_

_Does it even make sense to spend effort maintaining those release notes?_

---

To try to answer those questions, I made a small experiment:

Reposting automatically Updatecli release notes to [updatecli.io](https://updatecli.io/changelogs/updatecli), in a way that would allow me to reuse this pipeline for others projects.

Considering [updatecli.io](https://www.updatecli.io) is powered by [HUGO](https://gohugo.io), all I need is a way to automate the synchronization of GitHub release pages with my website's Git repository.

Updatecli already works great to automatically push file updates to git repositories.

Welcome Releasepost

## Releasepost

Releasepost can be downloaded from [github.com/updatecli/releasepost](https://github.com/updatecli/releasepost/releases)

It is an experimental command line tool that fetches information from a remote location like GitHub releases and then generates files locally such as:

```bash
.
├── changelogs
│   ├── v0.9.0.md
│   ├── v0.9.1.md
│   ├── v0.9.2.md
│   ├── v0.9.3.md
│   └── v0.9.4.md
└── index.md
```

Where the directory `changelogs` contains one file per changelog, and `index.md` a list of links to the various changelogs file.

In theory, it's as simple as that...

Let's see the Releasepost configuration used to generate [www.updatecli.io./changelogs](https://www.updatecli.io/changelogs/updatecli)

<details><summary>releasepost.yaml</summary>

```yaml
changelogs:
  - kind: github
    dir: content/en/changelogs/updatecli
    formats:
      - extension: asciidoc
        frontmatters: |
          ---
          title: "{{ .Changelog.Name }}"
          date: {{ .Changelog.PublishedAt }}
          ---
        indexfilename: _index
         indexfrontmatters: |
           ---
          title: "Changelogs"
          ---
      - extension: json
        indexfilename: _index
    spec:
      owner: updatecli
      repository: udash
```

sourced from <a href="https://github.com/updatecli/website/blame/master/.releasepost.yaml">releasepost.yaml</a>
</details>

The most important settings are:

* `spec.owner` and `spec.repository` specify the GitHub repository to monitor for release notes.
* `dir` specifies where to generate the files
* `formats` specifies the kind of files we want to generate so in this case json and Asciidoctor.

This configuration relies on the environment variable `RELEASEPOST_GITHUB_TOKEN` to set the GitHub credentials used to interact with the API.

[HUGO](https://gohugo.io) relies on specific behaviors like frontmatters to provide page metadata or an index file that differ from other tools like [Docusaurus](https://docusaurus.io/).

I must admit, I was envisioning a simpler configuration that would only contains the GitHub repository to monitor, but as always, the Devil hides in the details.

NOTE: More customization is available such as version filtering or the credentials to use but let's keep that for later.

You can try releasepost by running:

```bash
export RELEASEPOST_GITHUB_TOKEN=ghp_xxx
releasepost --config releasepost.yaml
```

## Updatecli

Running `releasepost --config` creates the files locally but it's only halfway.

We want to automatically publish them to our git repository.

The next step was to write a Updatecli policy that would run `releasepost` and take care of opening pull requests when needed, such as this [one](https://github.com/updatecli/website/pull/1428).

### Updatecli Policy

On the Updatecli project, we are using this policy:

->  [ghcr.io/updatecli/policies/releasepost/releasepost:0.1.0](https://github.com/updatecli/policies/pkgs/container/policies%2Freleasepost%2Freleasepost)

#### To visualize the pipeline of this policy:

<details><summary><code>updatecli manifest show ghcr.io/updatecli/policies/releasepost/releasepost:0.1.0</code></summary>

```bash
+++++++++++
+ PREPARE +
+++++++++++

Loading Pipeline "/tmp/updatecli/store/6a8e68ae473a5dafa270650cd74fd296e61abaf4820daf4b50e0e21c8649b710/updatecli.d/default.tpl"

SCM repository retrieved: 0


++++++++++++++++++
+ AUTO DISCOVERY +
++++++++++++++++++



++++++++++++++++++++++++++++++++++
+ DOCS: SYNCHRONIZE RELEASE NOTE +
++++++++++++++++++++++++++++++++++

name: 'docs: synchronize release note'
pipelineid: releasepost
targets:
    default:
        name: synchronize release notes
        kind: shell
        spec:
            changedif:
                kind: exitcode
                spec:
                    failure: 2
                    success: 1
                    warning: 0
            command: releasepost --dry-run="$DRY_RUN" --config .releasepost.yaml
            environments:
                - name: GITHUB_TOKEN
                - name: RELEASEPOST_GITHUB_TOKEN
                - name: PATH
version: 0.77.0
```

</details>

#### To visualize what this pipeline would change

<details><summary><code>updatecli diff ghcr.io/updatecli/policies/releasepost/releasepost:0.1.0</code></summary>

```bash
+++++++++++
+ PREPARE +
+++++++++++

Loading Pipeline "/tmp/updatecli/store/6a8e68ae473a5dafa270650cd74fd296e61abaf4820daf4b50e0e21c8649b710/updatecli.d/default.tpl"

SCM repository retrieved: 0


++++++++++++++++++
+ AUTO DISCOVERY +
++++++++++++++++++



++++++++++++
+ PIPELINE +
++++++++++++



##################################
# DOCS: SYNCHRONIZE RELEASE NOTE #
##################################


TARGETS
========

default
-------

**Dry Run enabled**

The shell 🐚 command "/bin/sh /tmp/updatecli/bin/be57548ac59ed9a80520b8dd8275573480aa383875ea4597afc606297a890735.sh" ran successfully with the following output:
----
Running releasepost
Dry run mode enabled, no changelog will be saved to disk
Searching releases
GitHub Api credit used 1, remaining 4141 (reset at 2024-05-21T14:08:48Z)6 releases foundRelease found: v0.4.1
Looking for release information related to version v0.4.1 from updatecli/udash
Looking for release assets related to version v0.4.1 from updatecli/udash
GitHub Api credit used 1, remaining 4139 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4138 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4137 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4136 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4135 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4134 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4133 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4132 (reset at 2024-05-21T14:08:48Z)    => found 15 assets
Release found: v0.4.0
Looking for release information related to version v0.4.0 from updatecli/udash
Looking for release assets related to version v0.4.0 from updatecli/udash
GitHub Api credit used 1, remaining 4130 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4129 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4128 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4127 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4126 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4125 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4124 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4123 (reset at 2024-05-21T14:08:48Z)    => found 15 assets
Release found: v0.3.0
Looking for release information related to version v0.3.0 from updatecli/udash
Looking for release assets related to version v0.3.0 from updatecli/udash
GitHub Api credit used 1, remaining 4121 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4120 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4119 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4118 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4117 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4116 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4115 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4114 (reset at 2024-05-21T14:08:48Z)    => found 15 assets
Release found: v0.2.0
Looking for release information related to version v0.2.0 from updatecli/udash
Looking for release assets related to version v0.2.0 from updatecli/udash
GitHub Api credit used 1, remaining 4112 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4111 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4110 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4109 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4108 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4107 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4106 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4105 (reset at 2024-05-21T14:08:48Z)    => found 15 assets
Release found: v0.1.1
Looking for release information related to version v0.1.1 from updatecli/udash
Looking for release assets related to version v0.1.1 from updatecli/udash
GitHub Api credit used 1, remaining 4103 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4102 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4101 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4100 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4099 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4098 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4097 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4096 (reset at 2024-05-21T14:08:48Z)    => found 15 assets
Release found: v0.1.0
Looking for release information related to version v0.1.0 from updatecli/udash
Looking for release assets related to version v0.1.0 from updatecli/udash
GitHub Api credit used 1, remaining 4094 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4093 (reset at 2024-05-21T14:08:48Z)GitHub Api credit used 1, remaining 4092 (reset at 2024-05-21T14:08:48Z)    => found 6 assets
Generating changelogs
Generating index


Cleaning
Untracked files detected:
    * content/en/changelogs/updatecli/changelogs/v0.0.1.adoc

Result
    * content/en/changelogs/updatecli/changelogs/v0.4.1.adoc (created)
    * content/en/changelogs/updatecli/changelogs/v0.4.1.json (created)
    * content/en/changelogs/updatecli/changelogs/v0.4.0.adoc (modified)
    * content/en/changelogs/updatecli/changelogs/v0.4.0.json (modified)
    * content/en/changelogs/updatecli/changelogs/v0.3.0.adoc (modified)
    * content/en/changelogs/updatecli/changelogs/v0.3.0.json (modified)
    * content/en/changelogs/updatecli/changelogs/v0.2.0.adoc (modified)
    * content/en/changelogs/updatecli/changelogs/v0.2.0.json (modified)
    * content/en/changelogs/updatecli/changelogs/v0.1.1.adoc (modified)
    * content/en/changelogs/updatecli/changelogs/v0.1.1.json (modified)
    * content/en/changelogs/updatecli/changelogs/v0.1.0.adoc (modified)
    * content/en/changelogs/updatecli/changelogs/v0.1.0.json (modified)
    * content/en/changelogs/updatecli/_index.adoc (modified)
    * content/en/changelogs/updatecli/_index.json (modified)

----
⚠ - ran shell command "releasepost --dry-run=\"$DRY_RUN\" --config .releasepost.yaml"


ACTIONS
========


=============================

REPORTS:



⚠ docs: synchronize release note:
    Target:
        ⚠ [default] synchronize release notes


Run Summary
===========
Pipeline(s) run:
  * Changed:    1
  * Failed: 0
  * Skipped:    0
  * Succeeded:  0
  * Total:  1

```

</details>

---

That policy source is available on [github.com/updatecli/policies](https://github.com/updatecli/policies/tree/main/updatecli/policies/releasepost/releasepost)

---

Well, we are almost there, I have an Updatecli policy working locally but I am not ready yet to ship my laptop to the cloud for running Updatecli command.

Let's run Updatecli from the cloud.

## Automation

Here we are in the final stage where we see how we leverage a CI tool to periodically run `updatecli` which then runs `releasepost`.

First we need to specify the list of Updatecli policies to execute periodically.
In this example, we only have one policy for running releasepost.

<details><summary>update-compose.yaml</summary>

```yaml
policies:
  - name: Trigger releasepost
    policy: ghcr.io/updatecli/policies/releasepost/releasepost:0.1.0
    values:
      - updatecli/values.d/scm.yaml
```

</details>

It's worth highlighting that Updatecli policies can be customized using values files.
In this case we want to update the branch "master" on the GitHub repository "updatecli/website"

<details><summary>updatecli/values.d/scm.yaml</summary>

```yaml
scm:
  enabled: true
  user: updatecli-bot
  email: updatecli-bot@updatecli.io
  owner: updatecli
  repository: website
  username: "updatecli-bot"
  branch: master
```

</details>

Finally we configure our GitHub Action workflow.

<details><summary>.github/workflows/updatecli.yaml</summary>

```yaml
---
name: Updatecli
on:
  workflow_dispatch:
  schedule:
    # * is a special character in YAML so you have to quote this string
    # Run at 12:00 every Thursday
    - cron: '0 12 * * 4'
jobs:
  updatecli:
    if: github.ref == 'refs/heads/master'
    runs-on: ubuntu-latest
    steps:
      - name: "Checkout"
        uses: "actions/checkout@v4"

      - name: "Install Updatecli"
        uses: "updatecli/updatecli-action@v2"

      # releasepost is required by the Updatecli
      #   * policy ghcr.io/updatecli/policies/releasepost/releasepost
      - name: "Install Releasepost"
        uses: "updatecli/releasepost-action@main"

      - name: "Run updatecli"
        run: "updatecli compose apply --file update-compose.weekly.yaml"
        env:
          GITHUB_ACTOR: ${{ github.actor }}
          ## Used by Updatecli to interact with GitHub api
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          ## Used by Releasepost to interact with GitHub api
          RELEASEPOST_GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

</details>

## Conclusion

Here we are, to automate release note publishing to a documentation website.

We need three files:

1. A releasepost configuration that specifies the GitHub repository to monitor.
2. An update-compose.yaml file listing Updatecli policies to enforce.
3. A values file listing the GitHub repository to monitor for release notes and the GitHub repository to copy those release notes
4. A GitHub action workflow to execute Updatecli periodically.

To answer my initial questions.

_What if I could visualize Updatecli changelogs from [www.updatecli.io](https://www.updatecli.io/changelogs/updatecli)?_

It's working great for a few months now, and I am not looking back.

_How many people read release notes?_

Traffic show me that people/crawler do care.

_Does it even make sense to spend effort maintaining those release notes?_

I do think so, manually crafted release notes are by far the best ones but they are also the most time-consuming. It's difficult to maintain them over time for every project so automatically generated release notes are a good alternative.

I wish more project consider release notes as a critical component of their releases.

## Next steps

This project was built with flexibility in mind, so we could definitely envisioned building plugins for NPM, Gitlab releases, etc.

In the near by future, I am considering documenting how we automate release note publishing on Docusaurus website leveraging the versioning feature.
In that scenario, we only need release notes associated to the versioned website.

Example on [fleet.rancher.io/0.9/changelogs](https://fleet.rancher.io/0.9/changelogs/)

All of this don't replace the need to write good release notes, we just try to make them more visible.

## Links

* [Releasepost](https://github.com/updatecli/releasepost)
* [Updatecli](https://github.com/updatecli/updatecli)
