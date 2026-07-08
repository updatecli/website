---
title: updatecli pipeline diff
description: Documentation for the command `updatecli pipeline diff`
lead: Documentation for the command `updatecli pipeline diff`
draft: false
images: []
menu:
  docs:
    parent: "commands"
weight: 130
toc: true
---

## updatecli pipeline diff

diff shows changes

```
updatecli pipeline diff NAME[:TAG|@DIGEST] [flags]
```

### Options

```
      --clean                       Remove updatecli working directory like '--clean=true'
  -c, --config stringArray          Sets config file or directory. By default, Updatecli looks for a file named 'updatecli.yaml' or a directory named 'updatecli.d'
      --disable-changelog           Disable changelog retrieval to avoid unnecessary requests (env: UPDATECLI_DISABLE_CHANGELOG)
      --disable-tls                 Disable TLS verification like '--disable-tls=true'
  -h, --help                        help for diff
      --labels stringArray          Filter pipelines to apply by their labels, accepted as a comma separated list (key:value)
      --pipeline-ids stringArray    Filter pipelines to apply by their pipeline IDs, accepted a comma separated list
      --reportAPI string            Set the report API URL where to publish pipeline reports
      --secrets stringArray         Sets Sops secrets file uses for templating
  -v, --values stringArray          Sets values file uses for templating
  -i, --values-inline stringArray   Sets inline values uses for templating, accepted valid json/yaml string
```

### Options inherited from parent commands

```
      --debug                   Debug Output
      --disable-version-check   Disable version check (env: UPDATECLI_DISABLE_VERSION_CHECK)
      --experimental            Enable Experimental mode
      --unique-tmp-dir          Use a unique temporary directory to allow running multiple Updatecli instances in parallel
```

### SEE ALSO

* [updatecli pipeline](/docs/commands/updatecli_pipeline)	 - pipeline executes specific pipeline tasks such as diff or apply

