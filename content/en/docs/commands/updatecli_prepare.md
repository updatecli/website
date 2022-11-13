---
title: updatecli prepare
description: Documentation for the command `updatecli prepare`
lead: Documentation for the command `updatecli prepare`
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

## updatecli prepare

prepare run tasks needed for a run like `git clone`

```
updatecli prepare [flags]
```

### Options

```
      --clean                 Remove updatecli working directory like '--clean=true
  -c, --config string         Sets config file or directory. By default, Updatecli looks for a file named 'updatecli.yaml' or a directory named 'updatecli.d'
  -h, --help                  help for prepare
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

