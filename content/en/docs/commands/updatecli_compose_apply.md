---
title: updatecli compose apply
description: Documentation for the command `updatecli compose apply`
lead: Documentation for the command `updatecli compose apply`
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

## updatecli compose apply

apply checks and apply changes defined by the compose file

```
updatecli compose apply [flags]
```

### Options

```
      --clean         Remove updatecli working directory like '--clean=true'
      --commit        Record changes to the repository, '--commit=false' (default true)
      --disable-tls   Disable TLS verification like '--disable-tls=true'
  -f, --file string   Define the update-compose file (default "update-compose.yaml")
  -h, --help          help for apply
      --push          Update remote refs '--push=false' (default true)
```

### Options inherited from parent commands

```
      --debug          Debug Output
      --experimental   Enable Experimental mode
```

### SEE ALSO

* [updatecli compose](/docs/commands/updatecli_compose)	 - compose executes specific Updatecli compose tasks such as diff or apply

