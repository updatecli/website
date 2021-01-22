---
title: "Introduction"
description: "Doks is a Hugo theme helping you build modern documentation websites that are secure, fast, and SEO-ready — by default."
lead: "Doks is a Hugo theme helping you build modern documentation websites that are secure, fast, and SEO-ready — by default."
date: 2020-10-06T08:48:57+00:00
lastmod: 2020-10-06T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "prologue"
weight: 100
toc: true
---

Updatecli is a tool uses to apply file update strategies.
It reads a yaml or a go template configuration file, then works into three stages:

1. Source: Based on a rule fetch a value from a third location that will be injected in later stages.
2. Conditions: Ensure that conditions are met based on the value retrieved during the source stage.
3. Target: Update and publish the target files based on a value retrieved from the source stage.

## Why?

In today's word, we are at one api close to be able to automate everything, we write infra as code, we script everywher

## Get started

There are two main ways to get started with Updatecli:

### Quick Start

{{< alert icon="👉" text="The Quick Start is intended for intermediate to advanced users." >}}

One page summary of how to use updatecli [Quick Start →]({{< ref "quick-start" >}})

## Go further

Resources, SCM, Stages, CI

### Stages

Understand on how the different stages work. [Stages →](/docs/stages/)

### Resources

Understand on how to parametrize resources. [Resources →](/docs/resources/)

### Scm

Learn how to use updatecli with scm repository. [SCM →](/docs/scm/)

### Continously Update Everything

Learn how to continuously run updatecli to apply updates. [CI →](/docs/automate/)

## Contributing

Find out how to contribute to Updatecli. [Contributing →](https://getdoks.org/docs/contributing/how-to-contribute/)

## Help

Get some help. [Help →]({{< ref "help" >}})
