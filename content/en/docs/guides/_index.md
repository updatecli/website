---
title: "Guides"
description: "End to end Updatecli examples, from a single docker image tag to a multi-target pull request"
lead: ""
date: 2021-08-01T08:48:45+00:00
lastmod: 2026-07-31T10:00:00+02:00
draft: false
images: []
sidebar:
  collapsed: true
---

Each guide walks through one complete update pipeline, with the manifest it runs and an
explanation of every section. They are ordered from the simplest to the most involved.

- [Docker Compose](/docs/guides/docker-compose/) - keep a `docker-compose.yaml` on the
  latest image tag or digest, then push the change through GitHub.
- [npm](/docs/guides/npm/) - track an npm dependency and refresh both `package.json` and
  `package-lock.json` with a `shell` target.
- [Helm chart](/docs/guides/helm-chart/) - gate a chart bump behind two conditions before
  opening a pull request.
- [Dockerfile](/docs/guides/dockerfile/) - how the Jenkins project keeps six targets across
  Dockerfiles, YAML, and HCL on the same JDK version.

If you are looking for a specific resource rather than a worked example, the
[Plugins](/docs/plugins/) section documents every source, condition, target, scm, and action.
