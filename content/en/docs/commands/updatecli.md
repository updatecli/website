---
title: updatecli
description: Documentation for the command `updatecli`
lead: Documentation for the command `updatecli`
date: 2022-07-21T08:40:13+02:00
lastmod: 2022-07-21T08:40:13+02:00
draft: false
images: []
menu:
  docs:
    parent: "commands"
weight: 130
toc: true
---

## updatecli

Updatecli is a tool used to define and apply file update strategies. 

### Synopsis


updatecli is a tool uses to apply file update strategies.
It reads a yaml or a go template configuration file, then works into three stages:

1. Source: Based on a rule fetch a value that will be injected in later stages.
2. Conditions: Ensure that conditions are met based on the value retrieved during the source stage.
3. Target: Update and publish the target files based on a value retrieved from the source stage.


### Options

```
      --debug   Debug Output
  -h, --help    help for updatecli
```

### SEE ALSO

* [updatecli apply](/docs/commands/updatecli_apply)	 - apply checks if an update is needed then apply the changes
* [updatecli completion](/docs/commands/updatecli_completion)	 - Generate the autocompletion script for the specified shell
* [updatecli diff](/docs/commands/updatecli_diff)	 - diff shows changes
* [updatecli jsonschema](/docs/commands/updatecli_jsonschema)	 - **Experimental** Export JsonSchema to file
* [updatecli manifest](/docs/commands/updatecli_manifest)	 - manifest executes specific manifest task such as upgrade
* [updatecli prepare](/docs/commands/updatecli_prepare)	 - prepare run tasks needed for a run like `git clone`
* [updatecli show](/docs/commands/updatecli_show)	 - Print the configuration that will be executed
* [updatecli version](/docs/commands/updatecli_version)	 - Print current application version

