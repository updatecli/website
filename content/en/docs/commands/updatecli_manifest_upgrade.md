---
title: updatecli manifest upgrade
description: Documentation for the command `updatecli manifest upgrade`
lead: Documentation for the command `updatecli manifest upgrade`
draft: false
images: []
menu:
  docs:
    parent: "commands"
weight: 130
toc: true
---

## updatecli manifest upgrade

upgrade executes manifest upgrade task

```
updatecli manifest upgrade [flags]
```

### Options

```
  -c, --config stringArray         Sets config file or directory. By default, Updatecli looks for a file named 'updatecli.yaml' or a directory named 'updatecli.d'
  -h, --help                       help for upgrade
  -i, --in-place                   Write updated Updatecli manifest back to the same file instead of stdout
      --labels stringArray         Filter pipelines to apply by their labels, accepted as a comma separated list (key:value)
      --pipeline-ids stringArray   Filter pipelines to apply by their IDs, accepted a comma separated list
```

### Options inherited from parent commands

```
      --debug            Debug Output
      --experimental     Enable Experimental mode
      --unique-tmp-dir   Use a unique temporary directory to allow running multiple Updatecli instances in parallel
```

### SEE ALSO

* [updatecli manifest](/docs/commands/updatecli_manifest)	 - manifest executes specific manifest task such as upgrade

