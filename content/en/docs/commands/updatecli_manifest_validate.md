---
title: updatecli manifest validate
description: Documentation for the command `updatecli manifest validate`
lead: Documentation for the command `updatecli manifest validate`
draft: false
images: []
menu:
  docs:
    parent: "commands"
weight: 130
toc: true
---

## updatecli manifest validate

**Experimental** validate manifest(s) against the Updatecli schema

### Synopsis

**Experimental** validate reports the manifest keys that do not match the
Updatecli schema, such as a misspelled one, which Updatecli would otherwise silently
ignore.

A deprecated keyword, or a key Updatecli cannot check reliably, is reported as a warning
and does not fail the command unless '--strict' is specified.

```
updatecli manifest validate [flags]
```

### Options

```
  -c, --config stringArray          Sets config file or directory. By default, Updatecli looks for a file named 'updatecli.yaml' or a directory named 'updatecli.d'
      --disable-templating          Disable manifest templating
  -h, --help                        help for validate
      --secrets stringArray         Sets secrets file uses for templating
      --strict                      Report warnings as errors
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

* [updatecli manifest](/docs/commands/updatecli_manifest)	 - manifest executes specific manifest task such as upgrade

