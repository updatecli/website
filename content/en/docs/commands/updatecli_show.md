---
title: updatecli show
description: Documentation for the command `updatecli show`
lead: Documentation for the command `updatecli show`
date: 2023-10-12T14:48:08+02:00
lastmod: 2023-10-12T14:48:08+02:00
draft: false
images: []
menu:
  docs:
    parent: "commands"
weight: 130
toc: true
---

## updatecli show

**Deprecated in favor of updatecli manifest show** Print the configuration that will be executed

```
updatecli show NAME[:TAG|@DIGEST] [flags]
```

### Options

```
      --clean                 Remove updatecli working directory like '--clean=true'
  -c, --config stringArray    Sets config file or directory. By default, Updatecli looks for a file named 'updatecli.yaml' or a directory named 'updatecli.d'
      --disable-prepare       --disable-prepare skip the Updatecli 'prepare' stage'--disable-prepare=true'
      --disable-tls           Disable TLS verification like '--disable-tls=true'
  -h, --help                  help for show
      --secrets stringArray   Sets secrets file uses for templating
  -v, --values stringArray    Sets values file uses for templating
```

### Options inherited from parent commands

```
      --debug          Debug Output
      --experimental   Enable Experimental mode
```

### SEE ALSO

* [updatecli](/docs/commands/updatecli)	 - Updatecli is a declarative dependency manager command line tool

