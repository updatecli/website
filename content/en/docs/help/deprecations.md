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

This page tracks deprecation notices for Updatecli and shows the supported
replacement syntax for each version.

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
