---
title: "Support"
description: "Where to ask a question, how to report a bug maintainers can act on, and how to disclose a security issue privately."
lead: "Where to ask, and how to report a bug"
date: 2020-10-06T08:49:15+00:00
lastmod: 2026-09-25T15:00:00+02:00
draft: false
images: []
menu:
  docs:
    parent: "help"
weight: 625
toc: true
aliases: ["/support/"]
---

## Something failing?

Most problems have a known answer. Start here:

- [Troubleshooting](/docs/help/troubleshooting/) explains the error messages Updatecli prints, from authentication to git push and manifest validation.
- The [FAQ](/docs/help/faq/) covers the common questions, such as [why a run seems to hang](/docs/help/faq/#_why_does_updatecli_seem_to_hang) or [why no pull request was opened](/docs/help/faq/#_why_did_the_run_finish_cleanly_but_open_no_pull_request).
- [Docker Hub rate limit](/docs/help/docker_hub_rate_limit/) explains the most frequent failure in CI.
- Rerun with `--debug`. Several decisions, such as which token was used or why a target was skipped, are only logged at debug level.

## Ask a question

- [GitHub Discussions](https://github.com/updatecli/updatecli/discussions) for questions, ideas, and anything others might search for later.
- [Matrix](https://matrix.to/#/#Updatecli_community:gitter.im) for a quick chat. The same room is also reachable through [Gitter](https://gitter.im/Updatecli/community).

Please be respectful and follow the [Code of Conduct](/code-of-conduct/).

## Report a bug

Search the [existing issues](https://github.com/updatecli/updatecli/issues) first. If nothing matches, open a [bug report](https://github.com/updatecli/updatecli/issues/new?template=1-bug-report.yml) and include:

- The output of `updatecli version`.
- The smallest manifest, and values file if you use one, that reproduces the problem.
- The full output of the failing run, with `--debug`.
- The pipeline graph, from:

  ```shell
  updatecli manifest show --graph --graph-flavor mermaid --experimental --config <manifest>
  ```

- Where it runs: locally, or in which CI system. If it fails in CI, say whether `updatecli pipeline diff` reproduces it locally.

Remove tokens and other secrets, such as `UPDATECLI_GITHUB_TOKEN`, from anything you paste.

## Request a feature

Open a [feature request](https://github.com/updatecli/updatecli/issues/new?template=2-feature-request.yml) and describe the update you are trying to automate. The use case matters more than a proposed implementation.

## Report a security issue

Do not report security vulnerabilities through public GitHub issues. Disclose them privately:

- through a [GitHub security advisory](https://github.com/updatecli/updatecli/security/advisories/new)
- or by email to [security@updatecli.io](mailto:security@updatecli.io)

## Commercial support

Contact the maintainers at [consulting@updatecli.io](mailto:consulting@updatecli.io) for commercial help, such as integration work, migration, or training.

For anything else, see the [Contact](/contact/) page. To help the project, by answering questions, triaging issues, or sponsoring it, see [Contributing](/docs/help/contributing/).
