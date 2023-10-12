---
title: updatecli udash login
description: Documentation for the command `updatecli udash login`
lead: Documentation for the command `updatecli udash login`
date: 2023-10-12T14:48:08+02:00
lastmod: 2023-10-12T14:48:08+02:00
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
  -h, --help                        help for login
      --oauth-access-token string   oauth-access-token defines the Oauth access token
      --oauth-audience string       oauth-audience defines the Oauth audience URL
      --oauth-clientId string       oauth-clientId defines the Oauth client ID
      --oauth-issuer string         oauth-issuer defines the Oauth authentication URL
```

### Options inherited from parent commands

```
      --debug          Debug Output
      --experimental   Enable Experimental mode
```

### SEE ALSO

* [updatecli udash](/docs/commands/updatecli_udash)	 - udash provides various Udash service integration.

