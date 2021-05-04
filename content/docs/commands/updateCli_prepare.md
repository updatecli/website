---
title: updateCli prepare
description: Documentation for the command `updateCli prepare`
lead: Documentation for the command `updateCli prepare`
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

## updateCli prepare

prepare run tasks needed for a run like `git clone`

```
updateCli prepare [flags]
```

### Options

```
      --clean                 Remove updatecli working directory like '--clean=true '(default: false)
  -c, --config string         Sets config file or directory. (default: './updateCli.yaml') (default "./updateCli.yaml")
  -h, --help                  help for prepare
      --secrets stringArray   Sets Sops secrets file uses for templating
  -v, --values stringArray    Sets values file uses for templating
```

### Options inherited from parent commands

```
      --debug   Debug Output
```

### SEE ALSO

* [updateCli](/docs/commands/updatecli)	 - Updatecli is a tool used to define and apply file update strategies. 

