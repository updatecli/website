---
title: updatecli completion bash
description: Documentation for the command `updatecli completion bash`
lead: Documentation for the command `updatecli completion bash`
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

## updatecli completion bash

Generate the autocompletion script for bash

### Synopsis

Generate the autocompletion script for the bash shell.

This script depends on the 'bash-completion' package.
If it is not installed already, you can install it via your OS's package manager.

To load completions in your current shell session:

	source <(updatecli completion bash)

To load completions for every new session, execute once:

#### Linux:

	updatecli completion bash > /etc/bash_completion.d/updatecli

#### macOS:

	updatecli completion bash > $(brew --prefix)/etc/bash_completion.d/updatecli

You will need to start a new shell for this setup to take effect.


```
updatecli completion bash
```

### Options

```
  -h, --help              help for bash
      --no-descriptions   disable completion descriptions
```

### Options inherited from parent commands

```
      --debug          Debug Output
      --experimental   Enable Experimental mode
```

### SEE ALSO

* [updatecli completion](/docs/commands/updatecli_completion)	 - Generate the autocompletion script for the specified shell

