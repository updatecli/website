---
title: updateCli apply
description: Documentation for the command `updateCli apply`
lead: Documentation for the command `updateCli apply`
date: 2021-05-04T21:19:16+02:00
lastmod: 2021-05-04T21:19:16+02:00
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

```
updateCli apply [flags]
```

### Options

```
      --clean                 Remove updatecli working directory like '--clean=false '(default: true) (default true)
      --commit                Record changes to the repository, '--commit=false' (default: true) (default true)
  -c, --config string         Sets config file or directory. (default: './updateCli.yaml') (default "./updateCli.yaml")
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

* [updateCli](/docs/commands/updatecli)	 - Updatecli is a tool used to define and apply file update strategies. 

