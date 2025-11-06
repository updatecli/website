---
title: "Updatecli v0.110.0 Released: GitHub Search SCM, Git branch cleanup & Dockerfile matching, and More!"
date: 2025-11-05T00:00:00+00:00
draft: false
weight: 50
images: [""]
contributors: ["olblak"]
---

We’re excited to ship v0.110.0 — this release introduces a GitHub search SCM to target multiple repositories, improved Git branch handling (including optional cleanup of working branches), better Dockerfile matching behavior, and a handful of bug fixes and quality-of-life improvements.

## Highlights

- New `githubsearch` SCM kind to discover and operate on repositories matching a GitHub search query.
- New `--clean-git-branches` flag to remove Updatecli working branches that have no divergent changes.
- Git pushes are now collected and executed once (after all targets) to reduce CI noise and enable reliable branch cleanup.
- Improved Dockerfile image matching (exact match instead of prefix).
- Autodiscovery now supports GitHub composite actions.

---

## Git branch improvements

We changed when Updatecli pushes commits and added optional branch cleanup:

- Push behavior
  - Instead of pushing after each target, Updatecli now collects pushes and performs them once after all targets are processed and just before running actions. This reduces CI runs and groups related changes into a single push.
  - Benefits:
    - Only one push per pipeline run (less CI churn).
    - Easier to reason about leftover vs. newly created commits.
    - Enables reliable cleanup of transient working branches.

- Branch cleanup
  - New flag: `--clean-git-branches`
  - When enabled, Updatecli will remove working branches that did not diverge from the target change (useful to keep repositories tidy).
  - Example:

    ```bash
    updatecli apply --clean-git-branches=true
    ```

  - Note: Cleanup only runs if pushing is enabled and not in dry-run mode.

---

## GitHub search SCM: apply manifests to many repositories

We added an SCM kind `githubsearch` that generates SCM configurations from a GitHub search query. That allows running the same Updatecli manifest across many repositories discovered via GitHub's advanced search.

Example updatecli.yaml using `githubsearch`:

.updatecli.yaml
```yaml
name: Update all Golang versions
scms:
  default:
    kind: githubsearch
    spec:
      search: 'org:updatecli language:Go archived:false'
      limit: 0           # 0 = no limit
      branch: '^main$'   # regex to match branch names

sources:
  golang:
    name: Get the latest Golang version
    kind: golang
    spec:
      versionfilter:
        kind: semver
        pattern: 1.23.x

targets:
  gomod:
    name: 'Update Golang version in go.mod to {{ source "golang" }}'
    kind: golang/gomod
    spec:
      file: go.mod

  github-action:
    name: 'deps(github-action): Bump Golang version to {{ source "golang" }}'
    kind: yaml
    spec:
      engine: yamlpath
      files:
        - ".github/workflows/*"
      key: '$.jobs.build.steps[?(@.uses =~ /^actions\/setup-go/)].with.go-version'
      searchpattern: true
```

You can try this pipeline running 

```bash
export UPDATECLI_GITHUB_TOKEN=<your GitHub access token>
updatecli diff --config updatecli.yaml
```

Notes:

- `githubsearch` expands into multiple generated Git SCM entries at runtime. Use it carefully (limit, branch filters) to control scope.
- This concept could be extended to other SCM providers (GitLab, Gitea); please open an issue if you need support for additional providers.
- The branch filter uses regex syntax to match branch names.

---

## Autodiscovery: GitHub composite actions

Autodiscovery now recognizes and can update GitHub composite actions. Thanks to [Lois](https://github.com/loispostula) for this contribution.

If you aren’t familiar with composite actions, see GitHub’s docs:
https://docs.github.com/en/actions/creating-actions/creating-a-composite-action

---

## Bug fixes & small improvements

- Don’t require `query` + `versionFilter` with dasel/v2 in the JSON plugin — thanks [refi64](https://github.com/refi64).
- Dockerfile image matching now uses exact match rather than prefix, preventing accidental updates of similar image names.
- Correct target/condition IDs in missing-source errors — thanks [Shristy Chaudhary](https://github.com/srishtea-22).
- Other small cleanups and stability fixes.

---

## Upgrade notes

- No breaking changes expected for typical manifests.
- To enable branch cleanup, run with `--clean-git-branches=true` and ensure `--push` is enabled (and not in dry-run).

---

## Contributors

Thanks to everyone who contributed to this release:

- Lois (composite action autodiscovery)
- refi64 (dasel v2 fixes)
- Shristy Chaudhary (error message fix)
- and all community contributors

---

If you hit any issue or have feedback, please open an issue on GitHub: https://github.com/updatecli/updatecli/issues

## How to Upgrade

Updatecli v0.109.0 is available now on [GitHub Releases](https://github.com/updatecli/updatecli/releases), Docker Hub, and as a Go binary.

```sh
# Upgrade via Homebrew
brew upgrade updatecli

# Or pull the latest Docker image
docker pull ghcr.io/updatecli/updatecli:v0.110.0-slim
```

More installation options can be found in our [Installation page](https://www.updatecli.io/docs/prologue/installation/).

---

## Feedback & Community

We love hearing from our users!
If you have feedback, or want to share how you use Updatecli, join us on [GitHub Discussions](https://github.com/updatecli/updatecli/discussions) or [Chat](https://app.gitter.im/#/room/#Updatecli_community:gitter.im).
