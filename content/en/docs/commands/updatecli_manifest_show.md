---
title: updatecli manifest show
description: Documentation for the command `updatecli manifest show`
lead: Documentation for the command `updatecli manifest show`
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

## updatecli manifest show

show manifest(s) which will be executed

```
updatecli manifest show [flags]
```

### Options

```
      --clean                 Remove updatecli working directory like '--clean=true'
  -c, --config string         Sets config file or directory. By default, Updatecli looks for a file named 'updatecli.yaml' or a directory named 'updatecli.d'
      --disable-prepare       --disable-prepare skip the Updatecli 'prepare' stage
      --disable-templating    Disable manifest templating
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

* [updatecli manifest](/docs/commands/updatecli_manifest)	 - manifest executes specific manifest task such as upgrade

