---
title: updatecli jsonschema
description: Documentation for the command `updatecli jsonschema`
lead: Documentation for the command `updatecli jsonschema`
draft: false
images: []
menu:
  docs:
    parent: "commands"
weight: 130
toc: true
---

## updatecli jsonschema

**Experimental** Export JsonSchema to file

```
updatecli jsonschema [flags]
```

### Options

```
  -b, --baseid string      Define schema baseid (default "https://www.updatecli.io/schema/latest")
  -d, --directory string   Export schema to directory (default "./")
  -h, --help               help for jsonschema
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

