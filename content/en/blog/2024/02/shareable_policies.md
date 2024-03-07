---
title: "Shareable Policies"
date: 2024-02-13T00:00:00+00:00
draft: false
weight: 50
images: [""]
contributors: ["olblak"]
---

Time flies, and It's time for another successful experiment to go out.

> Shareable Update Policies

A recurring problem over time has been, how to reuse the same Updatecli manifests for different projects.

From the beginning of the Updatecli project, it was possible to parameterize Updatecli manifests using values or secrets files, but still, we had to copy the same Updatecli manifest over and over. This led to duplication, maintenance burden, and ultimately, It didn't scale well.

So what if we could:

1. Write a generic Update policy
2. Publish it to a registry like "[GitHub packages](http://ghcr.io/)" or "[Dockerhub](https://hub.docker.com)"
3. Reuse the same policy over and over
4. Bonus point, having versioned Update policy

Well, it turned out to be amazing

### Requirement

To test the various commands mentioned in this blog post, you'll need:

1. The latest Updatecli version, installed locally. *[Cfr](https://www.updatecli.io/docs/prologue/installation/)*
2. A GitHub Personal Access Token to query the GitHub API. *[Cfr](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)*

```bash
export UPDATECLI_GITHUB_TOKEN=<INSERT YOUR PAT>
```

## Write

The first step is to write a policy.
To make this step a bit easier, we added a new sub-command :

```bash
updatecli manifest init my_policy
```

This command scaffolds a new Updatecli policy in the directory `my_policy` that includes the following files "CHANGELOG.md",  "Policy.yaml", "README.md", "updatecli.d", and  "values.yaml"

where:

1. **Policy.yaml** contains the policy metadata, such as the policy version or a short description.
2. **updatecli.d** is the directory containing Updatecli manifest(s).
3. **values.yaml** contains Updatecli  default values parameters used by Updatecli manifests. Those values can be overridden at runtime execution.
4. **README.md** contains a longer description of the policy and how to use it.
5. **CHANGELOGS.md** contains the policy changelog. Remember, policies are versioned using semantic versioning convention.

### Pipeline

We can add as many files as we need in the directory `updatecli.d`. All of them define different update pipelines specific to this policy.

---

This post is not about how to write Updatecli manifests, instead feel free to look, first, into:

* [**Quick Start**](https://www.updatecli.io/docs/prologue/quick-start/)
* [**Guide: Update YAML files like docker-compose.yaml**](https://www.updatecli.io/docs/guides/docker-compose/)
* [**Guide: Update Helm chart**](https://www.updatecli.io/docs/guides/helm-chart/)

---

To simplify this section, We can update the file `values.yaml` and `updatecli.d/default.yaml` with the following contents:

<details><summary>values.yaml</summary>

```yaml
---
# Values.yaml contains settings used from Updatecli manifest.
scm:
  default:
    user: updatecli-bot
    email: updatecli-bot@updatecli.io
    owner: updatecli-test
    repository: fleet-lab
    username: "updatecli-bot"
    branch: main
```

</details>

<details><summary>updatecli.d/default.yaml</summary>

```yaml
---
name: Update Rancher Fleet projects dependencies

## scms defines the source control management system to interact with.
## Default values are coming from the file values.yaml
scms:
  default:
    kind: github
    spec:
      owner: '{{ .scm.default.owner }}'
      repository: '{{ .scm.default.repository }}'
      branch: '{{ .scm.default.branch }}'
      user: '{{ .scm.default.user }}'
      email: '{{ .scm.default.email }}'
      username: '{{ .scm.default.username }}'
      token: '{{ requiredEnv "UPDATECLI_GITHUB_TOKEN" }}'

## actions defines what to do when a target with the same scmid is modified.
actions:
  default:
    kind: "github/pullrequest"
    scmid: "default"
    spec:
      automerge: false
      labels:
        - "dependencies"

## autodiscovery specifies that we want to update whatever we find
## in the context of helm or rancher/fleet dependencies.
autodiscovery:
  groupby: all
  scmid: default
  actionid: default
  crawlers:
    helm:
      enabled: true
    rancher/fleet:
      enabled: true
```

</details>

We can now test our policy running:

```bash
updatecli diff --config updatecli.d/default.yaml --values values.yaml
```

This works, but remember, we want to publish this policy to a registry so that we can reuse it over and over without having to duplicate the same files.

## Publish

Updatecli policies can be published to any OCI-compliant registries like Dockerhub, ghcr.io, etc.
Updatecli relies on the same technology used to distribute [Docker images](https://docs.docker.com/engine/reference/commandline/image_push/), [Helm charts](https://helm.sh/docs/topics/registries/), [Kubewarden policies](https://docs.kubewarden.io/distributing-policies), etc.

As of today, we need to authenticate with a registry such as [**ghcr.io**](https://github.com/features/packages) by running:

```bash
docker login ghcr.io
```

Then, we can publish our new policy to [ghcr.io](https://github.com/features/packages) by running:

```bash
updatecli manifest push \
    --values values.yaml \
    --config updatecli.d \
    --policy Policy.yaml \
    --tag ghcr.io/updatecli-test/policies/autodiscovery/fleet \
    .
```

A few important pieces of information to consider

* The policy version is retrieved from the file `Policy.yaml` and **must** be semantic versioning compliant.
* The version `latest` has a specific meaning and represents the latest version from a semantic versioning point of view.
* A policy version is mutable information, to ensure we always use the right policy, we can use the policy digest such as `0.3.0@sha256:eff30ebc0dc129ef3b82cfbca1e5c3d9ea1014f360f4c51b04ea4b0f951bae91`

Voila, it's as simple as that. Now we can start using our new policy.

## Reuse

Using Updatecli policies can be done through two approaches. One policy at a time or composing them using the file `update-compose.yaml`.

### One at a time

To manipulate a single policy, we can reuse familiar commands like:

* `updatecli diff ghcr.io/updatecli/policies/updatecli/autodiscovery:0.2.0`
* `updatecli manifest show ghcr.io/updatecli/policies/updatecli/autodiscovery`
* `updatecli apply ghcr.io/updatecli/policies/updatecli/autodiscovery:latest`

### Compose

Quickly, we end up with different policies. This is why we introduced a new file named `update-compose.yaml` with its syntax that allows us to compose our policies.

<details><summary>update-compose.yaml</summary>

```yaml
policies:
  - name: Local Updatecli Website Policies
    config:
      - updatecli/updatecli.d/
  - name: Handle Nodejs version in githubaction
    policy: ghcr.io/updatecli/policies/nodejs/githubaction:0.3.0
    values:
      - updatecli/values.d/scm.yaml
      - updatecli/values.d/nodejs.yaml
  - name: Handle Nodejs version in Netlify
    policy: ghcr.io/updatecli/policies/nodejs/netlify:0.3.0@sha256:41c2af6a10da1f4b4b91717ebaa4659332dd3d7107919c494c71f1f618aeaad8
    values:
      - updatecli/values.d/scm.yaml
      - updatecli/values.d/nodejs.yaml
```

</details>

Now we can use the following commands to achieve the same results as the standalone approach

* `updatecli compose diff`
* `updatecli compose show`
* `updatecli compose apply`

### Important

#### Override Default Values

Additional values can be specified at command execution to override those defined by the policy. It doesn't use deep merge copy.

#### Syntax validation && Auto completion

Similarly to Updatecli manifests, any IDE supporting Jsonschema store like VScode, IntelliJ, etc., automatically validate and provide auto-completion for files named `update-compose.yaml`

![update-compose.yaml auto completion](/images/blog/2024/02/update-compose-autocompletion.png)

#### Updatecli policies updated by Updatecli

The benefits of having versioned Update policies, means we can update the various projects at different speed. We managed the policy in one location and then use a policy like `ghcr.io/updatecli/policies/updatecli/autodiscovery:0.2.0` to automate policy update on all `update-compose.yaml` file.

## Going Further

### Feedback

While we've been using this feature for a few months now on various projects, ~~shareable policies are still in experimental mode~~.
We created the label [**updatecli-policies**](https://github.com/updatecli/updatecli/issues?q=is%3Aopen+is%3Aissue+label%3Aupdatecli-policies) to track related issues, but so far nothing major appear.

~~Our goal is to move that feature out of experimental as soon as we are confident enough that this feature is stable.~~

We are still collecting feedback, so feel free to provide yours on:

* [**github.com/updatecli/updatecli/discussion/1878**](https://github.com/orgs/updatecli/discussions/1878)

### Policies repository

On the projects that we maintain, we shifted from maintaining manifest(s) per project/repository to one central repository with all Updatecli policies defined there.

Updatecli policies used on the Updatecli project are now defined on [**github.com/updatecli/policies**](https://github.com/updatecli/policies).
Adding new policies is as simple as adding a new policy to the directory `updatecli/policies`
Then we have a GitHub workflow that publishes new policies automatically to ghcr.io/updatecli/policies/<the policy path>.

All those policies are available on [**ghcr.io/updatecli/policies**](https://github.com/orgs/updatecli/packages?tab=packages&q=policies)

Another great approach, suggested by [**Mathew Warman**](https://github.com/mcwarman), is to use the following GitHub Action workflow, which offer a similar result:

<details><summary>.github/workflows/policies-release.yaml</summary>

```yaml
name: Policy Release

on:
  push:
    branches:
      - main
    paths:
      - "updatecli/policies/**"

defaults:
  run:
    shell: bash

permissions: {}

jobs:
  changed-policies:
    name: Get changed policies
    runs-on: ubuntu-latest
    permissions:
      contents: read
    outputs:
      matrix: ${{ steps.set-matrix.outputs.matrix }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Get changed files
        id: changed-files
        uses: tj-actions/changed-files@v41
        with:
          json: true
          quotepath: false
          files: "updatecli/policies/**/Policy.yaml"
          dir_names: true

      - name: Set changed files as output
        id: set-matrix
        run: |
          matrix="{\"directory\":${{ steps.changed-files.outputs.all_changed_files }}}"
          echo "$matrix" | jq .
          echo "matrix=$matrix" >> "$GITHUB_OUTPUT"

  release:
    name: Release
    runs-on: ubuntu-latest
    permissions:
      contents: write
      packages: write
    needs:
      - changed-policies
    strategy:
      matrix: ${{ fromJSON(needs.changed-policies.outputs.matrix) }}
      fail-fast: false
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup updatecli
        uses: updatecli/updatecli-action@v2

      - name: Log in to the container registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Set policy details
        id: policy
        env:
          POLICY_DIR: ${{ matrix.directory }}
        run: |
          name=$(realpath --relative-to=./updatecli/policies "${POLICY_DIR}")
          version=$(yq .version "${POLICY_DIR}/Policy.yaml")
          {
            printf "name=$name\n"
            printf "version=$version\n"
            printf "release=$name-$version\n"
          } >>"${GITHUB_OUTPUT}"

      - name: Create github release
        id: github-release
        env:
          GH_TOKEN: ${{ github.token }}
          RELEASE: ${{ steps.policy.outputs.release }}
        run: |
          git tag "${RELEASE}"
          git push origin "${RELEASE}"
          gh release create "${RELEASE}" --verify-tag --latest

      - name: Push updatecli manifest
        working-directory: ${{ matrix.directory }}
        env:
          GITHUB_REPOSITORY_OWNER: ${{ github.repository_owner }}
          GITHUB_REPOSITORY_NAME: ${{ github.event.repository.name }}
          POLICY_NAME: ${{ steps.policy.outputs.name }}
        run: |
          updatecli manifest push \
            --config updatecli.d \
            --policy Policy.yaml \
            --values values.yaml \
            --tag "ghcr.io/${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}/${POLICY_NAME}" \
            .
```

</details>

## Conclusion

We hope you are as excited as we are about this new feature and that it will simplify the maintenance of your project through time, as it does for us.
