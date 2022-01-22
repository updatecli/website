---
title: updatecli completion powershell
description: Documentation for the command `updatecli completion powershell`
lead: Documentation for the command `updatecli completion powershell`
date: 2022-01-22T16:28:14+01:00
lastmod: 2022-01-22T16:28:14+01:00
draft: false
images: []
menu:
  docs:
    parent: "commands"
weight: 130
toc: true
---

## updatecli completion powershell

Generate the autocompletion script for powershell

### Synopsis

Generate the autocompletion script for powershell.

To load completions in your current shell session:

	updatecli completion powershell | Out-String | Invoke-Expression

To load completions for every new session, add the output of the above command
to your powershell profile.


```
updatecli completion powershell [flags]
```

### Options

```
  -h, --help              help for powershell
      --no-descriptions   disable completion descriptions
```

### Options inherited from parent commands

```
      --debug   Debug Output
```

### SEE ALSO

* [updatecli completion](/docs/commands/updatecli_completion)	 - Generate the autocompletion script for the specified shell

