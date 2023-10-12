---
title: updatecli completion fish
description: Documentation for the command `updatecli completion fish`
lead: Documentation for the command `updatecli completion fish`
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

## updatecli completion fish

Generate the autocompletion script for fish

### Synopsis

Generate the autocompletion script for the fish shell.

To load completions in your current shell session:

	updatecli completion fish | source

To load completions for every new session, execute once:

	updatecli completion fish > ~/.config/fish/completions/updatecli.fish

You will need to start a new shell for this setup to take effect.


```
updatecli completion fish [flags]
```

### Options

```
  -h, --help              help for fish
      --no-descriptions   disable completion descriptions
```

### Options inherited from parent commands

```
      --debug          Debug Output
      --experimental   Enable Experimental mode
```

### SEE ALSO

* [updatecli completion](/docs/commands/updatecli_completion)	 - Generate the autocompletion script for the specified shell

