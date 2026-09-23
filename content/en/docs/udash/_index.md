---
title: "Udash"
description: "Deploy Udash, the Updatecli dashboard, and publish your pipeline reports to it for a central view of update activity across every repository."
lead: ""
date: 2026-08-07T10:00:00+02:00
lastmod: 2026-08-07T10:00:00+02:00
draft: false
images: []
sidebar:
  collapsed: true
---

Updatecli tells you what changed on one run, in one repository. [Udash](https://github.com/updatecli/udash)
collects those runs and keeps them, so you can see the same information across every repository and
over time.

{{< alert icon="⚠️" text="Udash is experimental, and so is the Updatecli side of it. Publishing reports requires the <code>--experimental</code> flag, and both the API and the interface can change without going through the usual deprecation cycle." >}}

- [Introduction](/docs/udash/introduction/) - what Udash is, what it stores, and how the pieces fit
  together.
- [Quick start](/docs/udash/quick-start/) - run the whole stack locally with Docker Compose and
  publish your first report.
- [Installation](/docs/udash/installation/) - deploy it for real with the Helm chart, including the
  three ingress topologies.
- [Agent](/docs/udash/agent/) - run Updatecli on a schedule inside your cluster instead of from each
  repository's CI.
- [Configuration](/docs/udash/configuration/) - every setting of the server and of the frontend.
- [Authentication](/docs/udash/authentication/) - the authentication modes, API visibility, and how
  to register the application with your provider.
- [Sending reports](/docs/udash/sending-reports/) - the Updatecli side, from `udash login` to what
  ends up in a report.
- [Organising with labels](/docs/udash/labels/) - group pipelines from many repositories into one
  view with Updatecli labels.
- [Dashboards](/docs/udash/dashboards/) - a tour of the interface and its filters.
- [API](/docs/udash/api/) - the endpoints, and the limits an integrator meets first.
- [Troubleshooting](/docs/udash/troubleshooting/) - symptoms, causes, and fixes.
