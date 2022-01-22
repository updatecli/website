---
title: updatecli diff
description: Documentation for the command `updatecli diff`
lead: Documentation for the command `updatecli diff`
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

## updatecli diff

diff shows changes

```
updatecli diff [flags]
```

### Options

```
      --clean                 Remove updatecli working directory like '--clean=false '(default: true) (default true)
  -c, --config string         Sets config file or directory. (default: './updatecli.yaml') (default "./updatecli.yaml")
  -h, --help                  help for diff
      --secrets stringArray   Sets Sops secrets file uses for templating
  -v, --values stringArray    Sets values file uses for templating
```

### Options inherited from parent commands

```
      --debug   Debug Output
```

### SEE ALSO

* [updatecli](/docs/commands/updatecli)	 - Updatecli is a tool used to define and apply file update strategies. 

