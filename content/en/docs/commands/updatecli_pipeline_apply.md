---
title: updatecli pipeline apply
description: Documentation for the command `updatecli pipeline apply`
lead: Documentation for the command `updatecli pipeline apply`
draft: false
images: []
menu:
  docs:
    parent: "commands"
weight: 130
toc: true
---

## updatecli pipeline apply

apply checks if an update is needed then apply the changes

```
updatecli pipeline apply NAME[:TAG|@DIGEST] [flags]
```

### Options

```
      --clean                       Remove updatecli working directory like '--clean=true'
      --clean-git-branches          Remove updatecli working git branches like '--clean-git-branches=true'
      --commit                      Record changes to the repository, '--commit=false' (default true)
  -c, --config stringArray          Sets config file or directory. By default, Updatecli looks for a file named 'updatecli.yaml' or a directory named 'updatecli.d'
      --disable-tls                 Disable TLS verification like '--disable-tls=true'
      --existing-only               Skip targets when pipeline has no existing remote branch '--existing-only=true'
  -h, --help                        help for apply
      --labels stringArray          Filter pipelines to apply by their labels, accepted as a comma separated list (key:value)
      --pipeline-ids stringArray    Filter pipelines to apply by their IDs, accepted as a comma separated list
      --push                        Update remote refs '--push=false' (default true)
      --reportAPI string            Set the report API URL where to publish pipeline reports
      --secrets stringArray         Sets Sops secrets file uses for templating
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

* [updatecli pipeline](/docs/commands/updatecli_pipeline)	 - pipeline executes specific pipeline tasks such as diff or apply

