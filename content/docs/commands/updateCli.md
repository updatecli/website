---
title: updateCli
description: Documentation for the command `updateCli`
lead: Documentation for the command `updateCli`
date: 2021-02-05T20:03:07+01:00
lastmod: 2021-02-05T20:03:07+01:00
draft: false
images: []
menu:
  docs:
    parent: "commands"
weight: 130
toc: true
---

## updateCli

Updatecli is a tool used to define and apply file update strategies. 

### Synopsis


Updatecli is a tool uses to apply file update strategies.
It reads a yaml or a go template configuration file, then works into three stages:

1. Source: Based on a rule fetch a value that will be injected in later stages.
2. Conditions: Ensure that conditions are met based on the value retrieved during the source stage.
3. Target: Update and publish the target files based on a value retrieved from the source stage.


### Options

```
      --debug   Debug Output
  -h, --help    help for updateCli
```

### SEE ALSO

* [updateCli apply](/docs/commands/updatecli_apply)	 - apply checks if an update is needed then apply the changes
* [updateCli diff](/docs/commands/updatecli_diff)	 - diff shows changes
* [updateCli prepare](/docs/commands/updatecli_prepare)	 - prepare run tasks needed for a run like `git clone`
* [updateCli show](/docs/commands/updatecli_show)	 - Print the configuration that will be executed
* [updateCli version](/docs/commands/updatecli_version)	 - Print current application version

