---
title: updatecli compose show
description: Documentation for the command `updatecli compose show`
lead: Documentation for the command `updatecli compose show`
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
      --clean                            Remove updatecli working directory like '--clean=true'
      --disable-prepare                  --disable-prepare skip the Updatecli 'prepare' stage
      --disable-templating               Disable manifest templating
      --disable-tls                      Disable TLS verification like '--disable-tls=true'
  -f, --file string                      Define the update-compose file (default "updatecli-compose.yaml")
  -h, --help                             help for show
      --ignored-policy-ids stringArray   Filter policies to ignore by their policy IDs, accepted as a comma separated list
      --labels stringArray               Filter pipelines to apply by their labels, accepted as a comma separated list (key:value)
      --only-policy-ids stringArray      Filter policies to apply by their policy IDs, accepted as a comma separated list
      --pipeline-ids stringArray         Filter pipelines to apply by their pipeline IDs, accepted a comma separated list
```

### Options inherited from parent commands

```
      --debug                   Debug Output
      --disable-version-check   Disable version check (env: UPDATECLI_DISABLE_VERSION_CHECK)
      --experimental            Enable Experimental mode
      --unique-tmp-dir          Use a unique temporary directory to allow running multiple Updatecli instances in parallel
```

### SEE ALSO

* [updatecli compose](/docs/commands/updatecli_compose)	 - compose executes specific Updatecli compose tasks such as diff or apply

