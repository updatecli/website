---
title: updatecli show
description: Documentation for the command `updatecli show`
lead: Documentation for the command `updatecli show`
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
      --clean                       Remove updatecli working directory like '--clean=true'
  -c, --config stringArray          Sets config file or directory. By default, Updatecli looks for a file named 'updatecli.yaml' or a directory named 'updatecli.d'
      --disable-prepare             --disable-prepare skip the Updatecli 'prepare' stage'--disable-prepare=true'
      --disable-tls                 Disable TLS verification like '--disable-tls=true'
  -h, --help                        help for show
      --labels stringArray          Filter pipelines to apply by their labels, accepted as a comma separated list (key:value)
      --pipeline-ids stringArray    Filter pipelines to apply by their IDs, accepted a comma separated list
      --secrets stringArray         Sets secrets file uses for templating
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

* [updatecli](/docs/commands/updatecli)	 - Updatecli is a declarative dependency manager command line tool

