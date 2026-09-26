---
title: "Udash"
description: "Publish your Updatecli pipeline reports to Udash, the Updatecli dashboard, and follow update activity across every repository."
lead: ""
date: 2026-08-07T10:00:00+02:00
lastmod: 2026-09-24T10:00:00+02:00
draft: false
images: []
sidebar:
  collapsed: true
---

Updatecli tells you what changed on one run, in one repository. [Udash](https://github.com/updatecli/udash)
keeps those runs, so you can see the same information across every repository and over time.

To see it in use, browse [updatecli.uda.sh](https://updatecli.uda.sh), the public instance the
Updatecli project publishes its own pipeline reports to.

{{< alert icon="⚠️" text="Udash is experimental, and so is the Updatecli side of it. Publishing reports requires the <code>--experimental</code> flag, and both the API and the interface can change without going through the usual deprecation cycle." >}}

- [Introduction](/docs/udash/introduction/) - what Udash is and how Updatecli feeds it.
- [Quick start](/docs/udash/quick-start/) - run Udash locally with Docker Compose and publish your
  first report.
- [Sending reports](/docs/udash/sending-reports/) - connect Updatecli to an instance, locally or
  from CI.
- [Dashboards](/docs/udash/dashboards/) - find your pipelines, filter them with labels, and share a
  view.

Deploying, configuring, and securing a Udash instance, the agent, and the API are documented in the
[updatecli/udash](https://github.com/updatecli/udash) repository.
