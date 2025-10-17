---
title: "Automating Golang Project Updates with Updatecli"
date: 2025-10-13T00:00:00+00:00
draft: false
weight: 50
images: [""]
contributors: ["olblak"]
---

---

Please note that this post is not an introduction to Updatecli but rather an overview of specific Updatecli uses cases for Golang related projects. If you are new to Updatecli, please start with [**Getting Started with Updatecli**](https://www.updatecli.io/docs/prologue/quick-start/).

With that being said, let's dive in.

---

<p align="center">
  <img style="max-height:600px;" src="/images/blog/2025/10/golang_updatecli.png" alt="show Updatecli love Golang"/>
</p>

Keeping your Go projects up to date—whether it’s module versions, replace directives, or the Go toolchain version—can be tedious and error-prone, especially as your codebase grows or you manage multiple repositories. **Updatecli** is a powerful, CI-friendly tool that helps automate these updates, ensuring your dependencies and configurations stay current with minimal manual effort.

In this post, we’ll explore three complementary approaches for automating Go project updates with Updatecli:

- **Golang autodiscovery**
- **Declarative manifests**
- **Shared policies**

Let’s use the following `go.mod` as our running example:

<details open><summary>go.mod</summary>

```
module example.com/updatecli-replace-test

go 1.25.0

    github.com/rancher/saml v0.3.0
require (
    github.com/crewjam/saml v0.6.0
    github.com/stretchr/testify v1.8.4
)

replace (
    github.com/rancher/saml => github.com/rancher/saml v0.2.0
    github.com/crewjam/saml v0.6.0 => github.com/crewjam/saml v0.5.0
    github.com/stretchr/testify => ../local/testify
)

```

</details>

---

## What Should You Update in this go.mod file?

**1. Go Version**
The `go 1.25.0` line sets the minimum Go toolchain version. Keeping this up to date ensures you benefit from the latest language features, performance, and security improvements.

**2. Module Requirements**
The `require` block lists your dependencies and their versions. Regularly updating these brings in bug fixes, security patches, and new features. Updatecli can help you automatically bump these to the latest compatible versions.

**3. Replace Directives**
The `replace` block overrides where Go fetches dependencies from—either a different version or a local path.
You might want to:

- Remove temporary local replacements when they’re no longer needed.
- Update to a newer version or a different fork.
- Ensure consistency across repositories.
Automation can help you keep these overrides up to date or alert you when a local path is used (which may not be suitable for CI/CD).

---

### 1. Golang Autodiscovery: Generic Updates

**Autodiscovery** scans your repository and automatically generates Updatecli manifests based on detected files (like `go.mod`). For Go projects, it can:

- Suggest updates to newer module versions.
- Detect and check replace directives.
- Propose Go version upgrades.

**When to use autodiscovery:**

- You want quick wins with a minimal amount of written manifests.
- You’re standardizing updates across many repos.
- You want to preview what Updatecli would propose.

#### Fine-tuning with "ignore" and "only" rules

Autodiscovery is flexible! You can focus on or skip specific modules or patterns:

- **`ignore`**: Exclude certain modules or replace directives from updates.

  _Example_: Ignore modules for example that do not publish release.

- **`only`**: Restrict updates to a defined set of modules.

  _Example_: Only update modules from `github.com/crewjam/*`.

#### Example: Customizing Autodiscovery for Golang

Suppose you want to:

- Update all Go modules to the latest patch version.
- Ignore updates to `github.com/stretchr/testify` (because of some internal project requirement).
- Automatically open one GitHub pull request per module for any proposed update (as opposed to grouping all changes in one pull request).
- Automatically merge the PR if all checks pass, because you trust your CI.

<details open><summary>.updatecli.d/autodiscovery.yaml</summary>

```yaml
name: Update All Golang modules
pipelineid: golang/autodiscovery
groupby: individual
autodiscovery:
  scmid: default
  actionid: openPR
  groupby: all
  crawlers:
    golang:
      ignore:
        - modules:
            "github.com/stretchr/testify": ""
      versionfilter:
        kind: semver
        pattern: patchonly

scms:
  default:
    kind: github
    spec:
      owner: myorg
      repository: updatecli-replace-test
      branch: main

actions:
  openPR:
    kind: github/pullrequest
    scmid: default
    spec:
      title: "chore(deps): Update Go module dependencies"
      labels:
        - dependencies
      automerge: true
```

</details>

This configuration can be tested locally with:

```sh
export UPDATECLI_GITHUB_TOKEN="your_github_token"
updatecli diff --config ../updatecli.d/autodiscovery.yaml
```

You can see generated pipelines with:

```sh
export UPDATECLI_GITHUB_TOKEN="your_github_token"
updatecli manifest show --config ../updatecli.d/autodiscovery.yaml
```

Please note you need to update the owner and repository fields in the `scms` section to match your GitHub repository.

**How this works:**

- The autodiscovery section enables the Golang crawler to scan for `go.mod` files, to search for modules and Go version.
- The `ignore` rule tells autodiscovery to skip the Golang module `github.com/stretchr/testify`.
- The `scms` section configures the GitHub repository to interact with.
- The `actions` section instructs Updatecli to open one pull request on GitHub for any changes and to automatically merge them if they pass all checks.

Each time Updatecli runs with this config, it will check for updates to your Go modules (except the ignored one) and propose changes via a PR.

Whether your run Updatecli in CI or locally, the result is the same. You can preview changes with `updatecli diff` and apply them with `updatecli apply`.

#### More ignore/only examples

<details open><summary>Ignore all replace directives</summary>

```yaml
autodiscovery:
  crawlers:
    golang:
      ignore:
        - replace: true
```

</details>

<details open><summary>Only update all go module starting with github.com/rancher/</summary>

```yaml
autodiscovery:
  crawlers:
    golang:
      only:
        - modules:
            "^github.com/rancher/*": ""
```

</details>

<details open><summary>Only update the Go version 1.24</summary>

```yaml
autodiscovery:
  crawlers:
    golang:
      onlygoversion: true
      versionfilter:
        kind: semver
        pattern: "1.24.x"
```

</details>

---

The combination of `ignore` and `only` rules allows you to precisely control what autodiscovery proposes, making it a powerful tool for automating Go project maintenance with minimal configuration.

### 2. Declarative Manifests: Full Control, Custom Logic

**Declarative manifests** give you fine-grained control over update behaviors, guardrails, and multi-step flows. They’re YAML files committed to the repo that define sources (where to read versions), conditions (should we update?), targets (what to change), SCM, and actions.

**When to use manifests:**

- You need tailored rules (e.g., pin to minor versions, skip pre-releases).
- You must coordinate updates across multiple files or repos.
- You want additional validation (tests, build checks) before writing changes.

#### Example: Update a Dependency with a PR

Suppose you want to update the Golang version in your go.mod, and in your Dockerfile at the same time but only if there is a Docker image tag for that specific version.
Finally if a change is needed then we want to open a pull request with the changes:

<p align="center">
  <img style="max-height:600px;" src="/images/blog/2025/10/golang_diagram.svg" alt="show Updatecli pipeline graph"/>
</p>

<details open><summary>updatecli.d/go.yaml</summary>

```yaml
name: Update Golang version
pipelineid: golang/version

sources:
  go:
    name: Get latest Golang version
    kind: golang

conditions:
  docker:
    name: Check Docker image tag
    kind: dockerimage
    sourceid: go
    spec:
      image: golang

targets:
  gomod:
    name: 'deps(go): update Go version to {{ source "go" }}'
    sourceid: go
    kind: golang/gomod
    scmid: default
    spec:
      file: go.mod

  dockerfile:
    name: "deps(go): update Docker image tag"
    kind: dockerfile
    sourceid: go
    scmid: default
    spec:
      files:
        - Dockerfile.controller
        - Dockerfile.storage
        - Dockerfile.worker
      instruction:
        keyword: FROM
        matcher: golang

actions:
  default:
    title: 'deps(go): update Go to {{ source "go" }} version'
    kind: github/pullrequest
    scmid: default
    spec:
      automerge: false
      labels:
        - "chore"
        - "dependencies"

scms:
  default:
    kind: github
    spec:
      user: "myGitHubHandle"
      email: "email to sign commit"
      owner: "repoowner"
      repository: "myrepo"
      branch: "main"
      commitmessage:
        squash: true
        type: "chore"
        scope: deps
        title: "bump Golang version"

```

</details>

This Updatecli manifest automates the process of updating the Go version across your project. It fetches the latest Golang release, checks that a matching Docker image exists, and updates both your go.mod file and relevant Dockerfiles. When changes are detected, it opens a pull request on GitHub with clear labels and commit messages. This workflow saves time, reduces manual errors, and keeps your build environments consistent—making it especially useful for teams managing multiple services or wanting to streamline dependency upgrades.

We could now combine this manifest with the previous autodiscovery manifest to have a single Updatecli configuration that handles both generic module updates and specific Go version bumps.

One manifest, one purpose. You can create multiple manifests for different dependencies or update strategies. Reusing the same `pipelineid` across manifests helps group related updates into one update pipeline.
The declarative approach is ideal when you need to combine different kind of update. For example based on a single information, we can update Dockerfile, CI config, in one atomic operation. Or we can groups information from multiple sources (GitHub releases, DockerHub tags, etc.) to drive a single update. The possibilities are endless!

TIP: To make the writing of manifests easier, you can use an IDE that supports json schema store, such as nvim, intellij or vscode. All you need to do is using file name `updatecli.yaml` or any yaml file in a folder named `updatecli.d` and the IDE will automatically fetch the json schema and provide auto-completion, documentation and validation.

---

### 3. Shared Updatecli Policies from a Registry: Scale and Standardize

Updatecli shared policies are the final piece of the puzzle. They encapsulate and common update patterns into reusable, versioned bundles that can be shared across teams and projects.

**Policies** are reusable, parameterized Updatecli bundles published to a registry. They let teams standardize updates across many repositories with minimal config per repo.

Any autodiscovery or declarative manifest can be converted into a shared policy. Policies are versioned and stored in a registry (like DockerHub or ghcr.io).
Teams can then reference these policies in an Updatecli compose file such as `updatecli-compose.yaml`, passing only the parameters they need to customize.

**When to use policies:**

- You manage many projects with similar update needs.
- You want centralized governance (allowed sources, validations).
- You prefer a “bring parameters only” model over maintaining per-repo YAML.

#### Example: Using a Policy with SCM and PR Action

<details open><summary>updatecli/updatecli-compose.yaml</summary>

```yaml
policies:
  - name: Patch Golang Module update
    policy: ghcr.io/updatecli/policies/autodiscovery/golang:0.11.1
    values:
      - updatecli/values.d/scm.yaml
      - updatecli/values.d/golang_patch.yaml
  - name: Minor Golang Module update
    policy: ghcr.io/updatecli/policies/autodiscovery/golang:0.11.1
    values:
      - updatecli/values.d/scm.yaml
      - updatecli/values.d/golang_minor.yaml
```

</details>

<details open><summary>updatecli/values.d/scm.yaml</summary>

```yaml
scm:
  commitusingapi: true
  enabled: true
  user: updatecli
  email: bot@updatecli.io
  owner: updatecli
  repository: updatecli
  username: "updatecli-bot"
  branch: main
```

</details>

<details open><summary>updatecli/values.d/golang_patch.yaml</summary>

```
name: "deps: bump patch version for Golang module"
pipelineid: "golang/gomod/patch"
groupby: individual
automerge: true

spec:
  versionfilter:
    kind: semver
    pattern: patch
  ignore:
    - modules:
        # Ignoring the following modules as they do not publish release
        github.com/ProtonMail/go-crypto: ""

  only:
    # This repository contains other go.sum file used for testing.
    # So we want to be sure that we only update the one at the root of the repository
    - path: "go.mod"
```

</details>

You can then run the command:

```sh
# Login to GitHub Container Registry
docker login ghcr.io
export UPDATECLI_GITHUB_TOKEN="your_github_token"
# To show a diff
updatecli compose diff --file ./updatecli-compose.yaml
# To apply changes
updatecli compose apply --file ./updatecli-compose.yaml
# To show the generated manifest
updatecli compose show --file ./updatecli-compose.yaml
```

This setup uses the official Updatecli Golang autodiscovery policy to manage Go module updates. By referencing the policy from GitHub Container Registry, you leverage a tested and maintained update strategy without reinventing the wheel.

TIP: To make the writing of policies manifests easier, you can use an IDE that supports json schema store, such as nvim, intellij or vscode. All you need to do is using file name `updatecli-compose.yaml` and the IDE will automatically fetch the json schema and provide auto-completion and validation.

---

You can learn more about Updatecli policies in the [Policies documentation](https://www.updatecli.io/blog/shareable-policies/), with a list of policies we use on the Updatecli project in [updatecli/policies](https://github.com/updatecli/policies).

### Putting it Together in CI

Updatecli is a command line tool designed to run the same way both from your local machine and in CI/CD pipelines. This makes it easy to test changes locally before automating them in your workflow. Starting from there you can build whatever workflow you need.

A pragmatic path:

- Start with autodiscovery to identify low-risk updates.
- Introduce declarative manifests for custom rules where autodiscovery falls short.
- Migrate mature, shared practices into policies for scale.

**Typical CI steps (GitHub Actions, GitLab CI, Jenkins):**

1. Install Updatecli binary.
2. Provide authentication via environment variables:

    ```sh
    export UPDATECLI_GITHUB_TOKEN="..."
    # or GitHub App:
    export UPDATECLI_GITHUB_APP_CLIENT_ID="123456"
    export UPDATECLI_GITHUB_APP_PRIVATE_KEY_PATH="/path/to/key.pem"
    export UPDATECLI_GITHUB_APP_INSTALLATION_ID="789012"
    ```

3. Run Updatecli in check or apply mode:

    ```sh
    updatecli apply --config ./updatecli.d/
    ```

## Going Further

You can go deeper within the Updatecli integration with Golang project by looking specifically at:

- [Golang Autodiscovery documentation](http://updatecli.io/docs/plugins/autodiscovery/golang/)
- [Golang Plugin](http://updatecli.io/docs/plugins/resource/golang/)
- [Go.mod Plugin](http://updatecli.io/docs/plugins/resource/gomod/)
- [Golang module](http://updatecli.io/docs/plugins/resource/gomodule/)

### Feedback

We welcome your feedback on this guide and your experiences with Updatecli. Feel free to reach out through our [GitHub Discussions](https://github.com/updatecli/updatecli/discussions) or [Issues](https://github.com/updatecli/updatecli/issues) to share your thoughts, suggestions, or any challenges you encounter.

### Conclusion

In this post, we explored how to manage Go module updates using Updatecli's autodiscovery policies. By leveraging these policies, you can streamline your update process, reduce manual effort, and ensure consistency across your projects. Remember to take advantage of the feedback channels available to you as you implement these strategies.

---
