---
title: updatecli compose show
description: Documentation for the command `updatecli compose show`
lead: Documentation for the command `updatecli compose show`
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

## updatecli compose show

show manifest(s) defined by the compose file that should be executed

```
updatecli compose show [flags]
```

### Options

```
      --clean                Remove updatecli working directory like '--clean=true'
      --disable-prepare      --disable-prepare skip the Updatecli 'prepare' stage
      --disable-templating   Disable manifest templating
      --disable-tls          Disable TLS verification like '--disable-tls=true'
  -f, --file string          Define the update-compose file (default "update-compose.yaml")
  -h, --help                 help for show
```

### Options inherited from parent commands

```
      --debug          Debug Output
      --experimental   Enable Experimental mode
```

### SEE ALSO

* [updatecli compose](/docs/commands/updatecli_compose)	 - compose executes specific Updatecli compose tasks such as diff or apply

