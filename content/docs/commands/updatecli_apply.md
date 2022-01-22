---
title: updatecli apply
description: Documentation for the command `updatecli apply`
lead: Documentation for the command `updatecli apply`
date: 2022-01-22T16:28:14+01:00
lastmod: 2022-01-22T16:28:14+01:00
draft: false
images: []
menu:
  docs:
    parent: "commands"
weight: 130
toc: true
---

## updatecli apply

apply checks if an update is needed then apply the changes

```
updatecli apply [flags]
```

### Options

```
      --clean                 Remove updatecli working directory like '--clean=false '(default: true) (default true)
      --commit                Record changes to the repository, '--commit=false' (default: true) (default true)
  -c, --config string         Sets config file or directory. (default: './updatecli.yaml') (default "./updatecli.yaml")
  -h, --help                  help for apply
      --push                  Update remote refs '--push=false' (default: true) (default true)
      --secrets stringArray   Sets Sops secrets file uses for templating
  -v, --values stringArray    Sets values file uses for templating
```

### Options inherited from parent commands

```
      --debug   Debug Output
```

### SEE ALSO

* [updatecli](/docs/commands/updatecli)	 - Updatecli is a tool used to define and apply file update strategies. 

