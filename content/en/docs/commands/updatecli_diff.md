---
title: updatecli diff
description: Documentation for the command `updatecli diff`
lead: Documentation for the command `updatecli diff`
date: 2023-03-04T08:15:30+01:00
lastmod: 2023-03-04T08:15:30+01:00
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
      --clean                 Remove updatecli working directory like '--clean=true'
  -c, --config string         Sets config file or directory. By default, Updatecli looks for a file named 'updatecli.yaml' or a directory named 'updatecli.d'
  -h, --help                  help for diff
      --secrets stringArray   Sets Sops secrets file uses for templating
  -v, --values stringArray    Sets values file uses for templating
```

### Options inherited from parent commands

```
      --debug          Debug Output
      --experimental   Enable Experimental mode
```

### SEE ALSO

* [updatecli](/docs/commands/updatecli)	 - Updatecli is a declarative dependency manager command line tool

