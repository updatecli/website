---
title: updatecli apply
description: Documentation for the command `updatecli apply`
lead: Documentation for the command `updatecli apply`
date: 2022-09-20T18:24:41+02:00
lastmod: 2022-09-20T18:24:41+02:00
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
      --clean                 Remove updatecli working directory like '--clean=true'
      --commit                Record changes to the repository, '--commit=false' (default: true) (default true)
  -c, --config string         Sets config file or directory. By default, Updatecli looks for a file named 'updatecli.yaml' or a directory named 'updatecli.d'
  -h, --help                  help for apply
      --local-autodiscovery   Local AutoDiscovery feature enabled
      --push                  Update remote refs '--push=false' (default: true) (default true)
      --secrets stringArray   Sets Sops secrets file uses for templating
  -v, --values stringArray    Sets values file uses for templating
```

### Options inherited from parent commands

```
      --debug          Debug Output
      --experimental   Enable Experimental mode
```

### SEE ALSO

* [updatecli](/docs/commands/updatecli)	 - Updatecli is a tool used to define and apply file update strategies. 

