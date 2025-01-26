---
title: "Introduction"
description: "Updatecli is a command-line tool used to apply update pipeline."
lead: "Updatecli is a command-line tool used to apply update pipeline."
date: 2020-10-06T08:48:57+00:00
lastmod: 2022-01-22T08:16:01+02:00
draft: false
images: []
menu:
  docs:
    parent: "prologue"
weight: 100
toc: true
---

Updatecli is a command-line tool used to define and apply update strategies.
It reads a manifest then works into three stages:
1. **Source**, which describes where a piece of information, to be used, is retrieved from.
2. **Target**, which describes what to update using information defined by the _source_.
3. **Condition**, which defines a condition, required to be satisfied, to update the target.

*Manifest* - A manifest is a configuration file that provides metadata about other files or the configuration of a system. In the context of Updatecli, a manifest specifies the rules and parameters for automating updates to dependencies, versions, and other configuration files within a repository.

## Why?

Deciding **how**, **when**, **where** to update information is hard.

There are many tools that can apply continuous delivery or continuous deployment.
We configure our infrastructure with ansible playbooks, puppet manifest, helm chart, and others.
We rely on configuration files to specify the version we need to install.
Unfortunately, too often those files are manually updated.

Because it's hard to automatically detect what information to update, and when.

The logic that manipulates information from a configuration file is defined outside that configuration file.
Information comes from different sources like maven, docker, files, git repository, and elsewhere.
Before modifying information, we should validate our assumptions.

Updatecli allows combining blocks, aka plugins, to specify what information needs to be updated, when, and where.
We can easily implement the workflow that suits our needs.

## Get started

### Quick Start

{{< alert icon="👉" text="The Quick Start is for users new to updatecli." >}}

One page summary of how to use updatecli [Quick Start →]({{< ref "quick-start" >}})

## Go further

### Core

Understand the updatecli core concepts. [Core →](/docs/core/)

### Plugins

Understand how to combine the different plugins to define an update pipeline that suits your need. [Plugins →](/docs/plugins/)

### Continuously Update Everything

Understand how to use updatecli from your CI environment to apply updates. [CI →](/docs/automate/)

## Contributing

Find out how to contribute to updatecli. [Contributing →](/docs/help/contributing/)

## Help

Get some help. [Help →]({{< ref "help" >}})
