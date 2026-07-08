---
title: updatecli manifest push
description: Documentation for the command `updatecli manifest push`
lead: Documentation for the command `updatecli manifest push`
draft: false
images: []
menu:
  docs:
    parent: "commands"
weight: 130
toc: true
---

## updatecli manifest push

push manifest(s) to an OCI registry

```
updatecli manifest push [PATH] [flags]
```

### Options

```
  -c, --config stringArray    Sets config file or directory. By default, Updatecli looks for a file named 'updatecli.yaml' or a directory named 'updatecli.d' (default [updatecli.d])
      --disable-tls           Disable TLS verification like '--disable-tls=true'
  -h, --help                  help for push
      --overwrite             Overwrite existing manifest(s) in the registry like '--overwrite=true'
      --policy string         Sets policy file containing policy metadata information (default "Policy.yaml")
      --secrets stringArray   Sets secrets file uses for templating
  -t, --tag stringArray       Name and optionally a tag (format: "name:tag")
  -v, --values stringArray    Sets values file uses for templating
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

