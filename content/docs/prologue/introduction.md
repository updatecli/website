---
title: "Introduction"
description: "Updatecli is a tool uses to apply file update strategies."
lead: "Updatecli is a tool uses to apply file update strategies."
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

Deciding how, when, where to update information is hard.

Nowadays they are countless tools that can apply continuous delivery or continuous deployment. 
To configure our infrastructure, we write ansible playbooks, puppet manifest, helm chart, etc. We heavily rely 
on configuration files to specify the version we need to install. But too often those files are manually updated. 

Because it's hard to automatically detect what information must be updated and when.

The logic that manipulates information from a configuration file is defined outside that configuration file. Information comes from many different sources like maven, docker, files, git repository, etc..
Before modifying information, we probably want to validate some assumptions.

Updatecli allows combining blocks, aka resources, to specify what information needs to be updated, when, and where. So we easily implement the workflow that suits our needs.

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
