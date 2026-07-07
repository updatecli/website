---
title: updatecli compose apply
description: Documentation for the command `updatecli compose apply`
lead: Documentation for the command `updatecli compose apply`
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
      --clean                            Remove updatecli working directory like '--clean=true'
      --clean-git-branches               Remove git branches created by updatecli like '--clean-git-branches=true'
      --commit                           Record changes to the repository, '--commit=false' (default true)
      --disable-changelog                Disable changelog retrieval to avoid unnecessary requests (env: UPDATECLI_DISABLE_CHANGELOG)
      --disable-tls                      Disable TLS verification like '--disable-tls=true'
      --existing-only                    Skip targets when pipeline has no existing remote branch '--existing-only=true'
  -f, --file string                      Define the update-compose file (default "updatecli-compose.yaml")
  -h, --help                             help for apply
      --ignored-policy-ids stringArray   Filter policies to ignore by their policy IDs, accepted as a comma separated list
      --labels stringArray               Filter pipelines to apply by their labels, accepted as a comma separated list (key:value)
      --only-policy-ids stringArray      Filter policies to apply by their policy IDs, accepted as a comma separated list
      --pipeline-ids stringArray         Filter pipelines to apply by their pipeline IDs, accepted as a comma separated list
      --push                             Update remote refs '--push=false' (default true)
      --reportAPI string                 Set the report API URL where to publish pipeline reports
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

