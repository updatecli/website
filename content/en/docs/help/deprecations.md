---
title: "Deprecations"
description: "Versioned deprecation notices and migration examples."
lead: "Versioned deprecation notices and migration examples."
date: 2026-04-11T13:37:00+00:00
draft: false
images: []
menu:
  docs:
    parent: "help"
weight: 650
toc: true
---

This page tracks deprecation notices for Updatecli and related projects, with
migration guidance when relevant.

## updatecli-action

### Deprecated branches `v1` and `v2`

The `v1` and `v2` branches of `updatecli/updatecli-action` are deprecated and
will be removed soon.

Use a released GitHub Action version instead, or track the `main` branch if you
explicitly want the branch tip.

You can migrate repositories to the latest GitHub Action version with the
following Updatecli policy:

#### `.updatecli-compose.yaml`

```yaml
# export UPDATECLI_GITHUB_TOKEN=<insert PAT>
# export UPDATECLI_GITHUB_USERNAME=<insert username>
# updatecli compose diff --file updatecli-compose.yaml
# updatecli compose apply --file updatecli-compose.yaml

valuesinline:
  scm:
    enabled: true
    kind: githubsearch
    search: |
      org:<replace with your GitHub organization>
      archived:false
    branch: "^main$|^master$" # branch accepts regular expressions
    email: <email associated with the git commits>
    limit: 0 # zero means no repository limit

policies:
  - name: Update Updatecli GitHub action version
    policy: ghcr.io/updatecli/policies/updatecli/githubaction:0.8.1
```

## Updatecli

### v0.116.0

#### `github/pullrequest`: `spec.automerge`

In Updatecli `v0.116.0`, the parameter `spec.automerge` for the action kind
`github/pullrequest` is deprecated in favor of `spec.merge.strategy: auto`.

<table class="table">
  <thead>
    <tr>
      <th>Before</th>
      <th>After</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre><code class="language-yaml">actions:
  default:
    kind: github/pullrequest
    spec:
      automerge: true</code></pre>
      </td>
      <td>
        <pre><code class="language-yaml">actions:
  default:
    kind: github/pullrequest
    spec:
      merge:
        strategy: auto</code></pre>
      </td>
    </tr>
  </tbody>
</table>
