---
title: updatecli completion zsh
description: Documentation for the command `updatecli completion zsh`
lead: Documentation for the command `updatecli completion zsh`
date: 2023-03-04T08:15:30+01:00
lastmod: 2023-03-04T08:15:30+01:00
draft: false
images: []
menu:
  docs:
    parent: "commands"
weight: 130
toc: true
---

## updatecli completion zsh

Generate the autocompletion script for zsh

### Synopsis

Generate the autocompletion script for the zsh shell.

If shell completion is not already enabled in your environment you will need
to enable it.  You can execute the following once:

	echo "autoload -U compinit; compinit" >> ~/.zshrc

To load completions in your current shell session:

	source <(updatecli completion zsh); compdef _updatecli updatecli

To load completions for every new session, execute once:

#### Linux:

	updatecli completion zsh > "${fpath[1]}/_updatecli"

#### macOS:

	updatecli completion zsh > $(brew --prefix)/share/zsh/site-functions/_updatecli

You will need to start a new shell for this setup to take effect.


```
updatecli completion zsh [flags]
```

### Options

```
  -h, --help              help for zsh
      --no-descriptions   disable completion descriptions
```

### Options inherited from parent commands

```
      --debug          Debug Output
      --experimental   Enable Experimental mode
```

### SEE ALSO

* [updatecli completion](/docs/commands/updatecli_completion)	 - Generate the autocompletion script for the specified shell

