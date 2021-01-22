---
title: "Quick Start"
description: "One page summary of how to apply a strategy update."
lead: "One page summary of how to apply a strategy update."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu: 
  docs:
    parent: "prologue"
weight: 110
toc: true
---

## Requirements

Make sure you downloaded the latest updatecli binary [Installation →]({{< ref "installation/#_packages" >}}):

### Linux

{{< btn-copy text="curl -sSfL -o updatecli https://github.com/olblak/updatecli/releases/latest/download/updatecli.linux.amd64 && chmod +x ./updatecl" >}}

```
  curl -sSfL -o updatecli https://github.com/olblak/updatecli/releases/latest/download/updatecli.linux.amd64
  chmod +x ./updatecl
```

## Init the updatecli project

Create a new directory that will hold your updatecli configuration.

{{< btn-copy text="mkdir -p ./updatecli/updatecli.d" >}}
```
  mkdir -p ./updatecli/updatecli.d
```
updatecli is the root of you project and updatecli.d will contains your updatecli configuration

## Create a docker-compose.yaml

### Create your first configuration

{{< btn-copy text="touch ./updatecli/updatecli.d && vim ./udpatecli/updatecli.d" >}}

```bash
touch ./updatecli/updatecli.d
vim ./udpatecli/updatecli.d"
```

#### Source

Work in Progress

#### Condition

Work in Progress

#### Target

Work in Progress
