---
title: updatecli compose diff
description: Documentation for the command `updatecli compose diff`
lead: Documentation for the command `updatecli compose diff`
draft: false
images: []
menu:
  docs:
    parent: "commands"
weight: 130
toc: true
---

## updatecli compose diff

diff show changes defined by the compose file

```
updatecli compose diff [flags]
```

### Options

```
      --clean                            Remove updatecli working directory like '--clean=true'
      --disable-tls                      Disable TLS verification like '--disable-tls=true'
  -f, --file string                      Define the Updatecli compose file name (default "updatecli-compose.yaml")
  -h, --help                             help for diff
      --ignored-policy-ids stringArray   Filter policies to ignore by their policy IDs, accepted as a comma separated list
      --labels stringArray               Filter pipelines to apply by their labels, accepted as a comma separated list (key:value)
      --only-policy-ids stringArray      Filter policies to apply by their policy IDs, accepted as a comma separated list
      --pipeline-ids stringArray         Filter pipelines to apply by their IDs, accepted a comma separated list
      --reportAPI string                 Set the report API URL where to publish pipeline reports
```

### Options inherited from parent commands

```
      --debug            Debug Output
      --experimental     Enable Experimental mode
      --unique-tmp-dir   Use a unique temporary directory to allow running multiple Updatecli instances in parallel
```

### SEE ALSO

* [updatecli compose](/docs/commands/updatecli_compose)	 - compose executes specific Updatecli compose tasks such as diff or apply

