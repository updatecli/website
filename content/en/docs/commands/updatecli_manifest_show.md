---
title: updatecli manifest show
description: Documentation for the command `updatecli manifest show`
lead: Documentation for the command `updatecli manifest show`
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
updatecli manifest show NAME[:TAG|@DIGEST] [flags]
```

### Options

```
      --clean                       Remove updatecli working directory like '--clean=true'
  -c, --config stringArray          Sets config file or directory. By default, Updatecli looks for a file named 'updatecli.yaml' or a directory named 'updatecli.d'
      --disable-prepare             --disable-prepare skip the Updatecli 'prepare' stage
      --disable-templating          Disable manifest templating
      --disable-tls                 Disable TLS verification like '--disable-tls=true'
      --graph                       Output in graph format
      --graph-flavor string         Flavor of graph format, accepted values are 'dot' for graphviz or 'mermaid' (default "dot")
  -h, --help                        help for show
      --labels stringArray          Filter pipelines to apply by their labels, accepted as a comma separated list (key:value)
      --pipeline-ids stringArray    Filter pipelines to apply by their IDs, accepted a comma separated list
      --secrets stringArray         Sets secrets file uses for templating
  -v, --values stringArray          Sets values file uses for templating
  -i, --values-inline stringArray   Sets inline values uses for templating, accepted valid json/yaml string
```

### Options inherited from parent commands

```
      --debug            Debug Output
      --experimental     Enable Experimental mode
      --unique-tmp-dir   Use a unique temporary directory to allow running multiple Updatecli instances in parallel
```

### SEE ALSO

* [updatecli manifest](/docs/commands/updatecli_manifest)	 - manifest executes specific manifest task such as upgrade

