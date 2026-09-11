---
title: updatecli udash login
description: Documentation for the command `updatecli udash login`
lead: Documentation for the command `updatecli udash login`
draft: false
images: []
menu:
  docs:
    parent: "commands"
weight: 130
toc: true
---

## updatecli udash login

[Experimental] login authenticates with the Udash.

```
updatecli udash login url [flags]
```

### Examples

```
updatecli udash login app.updatecli.io
```

### Options

```
      --api-url string   api-url defines the udash API URL
  -h, --help             help for login
      --token string     token defines the Udash API token. Without it, Updatecli prompts for one
```

### Options inherited from parent commands

```
      --debug                   Debug Output
      --disable-version-check   Disable version check (env: UPDATECLI_DISABLE_VERSION_CHECK)
      --experimental            Enable Experimental mode
      --unique-tmp-dir          Use a unique temporary directory to allow running multiple Updatecli instances in parallel
```

### SEE ALSO

* [updatecli udash](/docs/commands/updatecli_udash)	 - udash provides various Udash service integration.

