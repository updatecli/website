---
title: updateCli apply
description: Documentation for the command `updateCli apply`
lead: Documentation for the command `updateCli apply`
date: 2021-01-22T22:28:28+01:00
lastmod: 2021-01-22T22:28:28+01:00
draft: false
images: []
menu:
  docs:
    parent: "commands"
weight: 130
toc: true
---

## updateCli apply

apply checks if an update is needed then apply the changes

### Synopsis

apply checks if an update is needed then apply the changes

```
updateCli apply [flags]
```

### Options

```
      --clean           Remove updatecli working directory like '--clean=false '(default: true) (default true)
      --commit          Record changes to the repository, '--commit=false' (default: true) (default true)
  -c, --config string   Sets config file or directory. (default: './updateCli.yaml') (default "./updateCli.yaml")
  -h, --help            help for apply
      --push            Update remote refs '--push=false' (default: true) (default true)
  -v, --values string   Sets values file uses for templating (required {.tpl,.tmpl} config)
```

### SEE ALSO

* [updateCli](/docs/commands/updatecli)	 - Updatecli is a tool used to define and apply file update strategies. 

