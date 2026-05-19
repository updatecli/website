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
      --api-url string              api-url defines the udash API URL
  -h, --help                        help for login
      --oauth-access-token string   oauth-access-token defines the Oauth access token
      --oauth-audience string       oauth-audience defines the Oauth audience URL
      --oauth-clientId string       oauth-clientId defines the Oauth client ID
      --oauth-issuer string         oauth-issuer defines the Oauth authentication URL
```

### Options inherited from parent commands

```
      --debug            Debug Output
      --experimental     Enable Experimental mode
      --unique-tmp-dir   Use a unique temporary directory to allow running multiple Updatecli instances in parallel
```

### SEE ALSO

* [updatecli udash](/docs/commands/updatecli_udash)	 - udash provides various Udash service integration.

