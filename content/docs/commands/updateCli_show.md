---
title: updateCli show
description: Documentation for the command `updateCli show`
lead: Documentation for the command `updateCli show`
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

## updateCli show

Print the configuration that will be executed

```
updateCli show [flags]
```

### Options

```
  -c, --config string         Sets config file or directory. (default: './updateCli.yaml') (default "./updateCli.yaml")
  -h, --help                  help for show
      --secrets stringArray   Sets secrets file uses for templating
  -v, --values stringArray    Sets values file uses for templating
```

### Options inherited from parent commands

```
      --debug   Debug Output
```

### SEE ALSO

* [updateCli](/docs/commands/updatecli)	 - Updatecli is a tool used to define and apply file update strategies. 

