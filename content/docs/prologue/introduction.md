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

1. **Source**, which describes where a piece of information is coming from.
2. **Target**, which describes what we want to update based on a *source* output.
3. **Condition**, which defined a condition required to update the target.

## Why?

Deciding **how**, **when**, **where** to update information is hard.

Nowadays they are countless tools that can apply continuous delivery or continuous deployment. 
To configure our infrastructure, we write ansible playbooks, puppet manifest, helm chart, etc. We heavily rely 
on configuration files to specify the version we need to install. Unfortunately too often those files are manually updated. 

Because it's hard to automatically detect what information must be updated and when.

The logic that manipulates information from a configuration file is defined outside that configuration file. Information comes from different sources like maven, docker, files, git repository, etc.
Before modifying information, we probably want to validate some assumptions.

Updatecli allows combining blocks, aka plugins, to specify what information needs to be updated, when, and where. So we easily implement the workflow that suits our needs.

## Get started

### Quick Start

{{< alert icon="👉" text="The Quick Start is intended for users new to updatecli." >}}

One page summary of how to use updatecli [Quick Start →]({{< ref "quick-start" >}})

## Go further

### Core

Understand how updatecli core concept works. [Core →](/docs/core/)

### Plugins

Understand how to combine the different plugins to define an update pipeline that suits your need. [Plugins →](/docs/plugins/)

### Continuously Update Everything

Understand how to use updatecli from your CI environment to apply updates. [CI →](/docs/automate/)

## Contributing

Find out how to contribute to Updatecli. [Contributing →](/docs/help/contributing/)

## Help

Get some help. [Help →]({{< ref "help" >}})
