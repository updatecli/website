---
title: updatecli
description: Documentation for the command `updatecli`
lead: Documentation for the command `updatecli`
draft: false
images: []
menu:
  docs:
    parent: "commands"
weight: 130
toc: true
---

## updatecli

Updatecli is a declarative dependency manager command line tool

### Synopsis


Updatecli is a declarative dependency manager command line tool.
Based on Updatecli manifest(s), It ensures that target files are up to date.
Updatecli  works into three stages:

1. Source: Retrieve a value from a third location like file, api, etc..
2. Condition: Ensure conditions are met based on the value retrieved during the source stage.
3. Target: Update the target based on the value retrieved from the source stage.


### Options

```
      --debug            Debug Output
      --experimental     Enable Experimental mode
  -h, --help             help for updatecli
      --unique-tmp-dir   Use a unique temporary directory to allow running multiple Updatecli instances in parallel
```

### SEE ALSO

* [updatecli apply](/docs/commands/updatecli_apply)	 - **Deprecated in favor of updatecli pipeline apply** apply checks if an update is needed then apply the changes
* [updatecli completion](/docs/commands/updatecli_completion)	 - Generate the autocompletion script for the specified shell
* [updatecli compose](/docs/commands/updatecli_compose)	 - compose executes specific Updatecli compose tasks such as diff or apply
* [updatecli diff](/docs/commands/updatecli_diff)	 - **Deprecated in favor of updatecli pipeline diff** diff shows changes
* [updatecli jsonschema](/docs/commands/updatecli_jsonschema)	 - **Experimental** Export JsonSchema to file
* [updatecli manifest](/docs/commands/updatecli_manifest)	 - manifest executes specific manifest task such as upgrade
* [updatecli pipeline](/docs/commands/updatecli_pipeline)	 - pipeline executes specific pipeline tasks such as diff or apply
* [updatecli prepare](/docs/commands/updatecli_prepare)	 - prepare run tasks needed for a run like `git clone`
* [updatecli show](/docs/commands/updatecli_show)	 - **Deprecated in favor of updatecli manifest show** Print the configuration that will be executed
* [updatecli udash](/docs/commands/updatecli_udash)	 - udash provides various Udash service integration.
* [updatecli version](/docs/commands/updatecli_version)	 - Print current application version

