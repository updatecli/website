---
title: updatecli show
description: Documentation for the command `updatecli show`
lead: Documentation for the command `updatecli show`
date: 2022-07-21T08:40:13+02:00
lastmod: 2022-07-21T08:40:13+02:00
draft: false
images: []
menu:
  docs:
    parent: "commands"
weight: 130
toc: true
---

## updatecli show

Print the configuration that will be executed

```
updatecli show [flags]
```

### Options

```
  -c, --config string         Sets config file or directory. (default: './updatecli.yaml') (default "./updatecli.yaml")
  -h, --help                  help for show
      --secrets stringArray   Sets secrets file uses for templating
  -v, --values stringArray    Sets values file uses for templating
```

### Options inherited from parent commands

```
      --debug   Debug Output
```

### SEE ALSO

* [updatecli](/docs/commands/updatecli)	 - Updatecli is a tool used to define and apply file update strategies. 

