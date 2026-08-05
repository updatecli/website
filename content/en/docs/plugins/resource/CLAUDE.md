---
# Instructions for AI coding assistants, not website content.
# The build directives keep Hugo from publishing this file as a page.
headless: true
private: true
build:
  render: never
  list: never
  publishResources: false
---

# Writing resource plugin documentation

Instructions for creating or updating a page in this directory, for example `yaml.adoc`.
Each page documents one resource plugin, a `kind` usable in a manifest's `sources`, `conditions`
or `targets` block.

## Rule zero: the Go plugin is the source of truth

Never write these pages from the existing prose, from a sibling page, or from the plugin name.
Pages here go stale silently, and the support matrix at the top is the part that rots worst:
`http.adoc` advertised target support for years while `Target()` returned
`Target not supported for the plugin http`, and `dockerfile.adoc` denied source support while
`Source()` was fully implemented.

The plugin lives in the updatecli repo, normally a sibling checkout: `../updatecli`. The resource
source is `../updatecli/pkg/plugins/resources/<plugin>/`.

Before writing, check whether the page is already behind:

```sh
git log --oneline -5 -- content/en/docs/plugins/resource/<page>.adoc
git -C ../updatecli log --oneline -15 -- pkg/plugins/resources/<plugin>/
```

A code history longer than the doc history means claims need re-checking, not just extending.

## What to read, and what each file tells you

| File | What to extract |
|---|---|
| `main.go` / `spec.go` | The `Spec` struct: every parameter, plus the `[s][c][t]` or `compatible:` comments saying which stage each one applies to. `New()`: defaults, deprecation warnings, and validation. |
| `source.go` | Whether a source is real or a stub, and which attributes it *rejects* versus silently ignores. Both matter; only the first produces an error. |
| `condition.go` | The same, plus **what happens to an `scm`** (see below). Also whether a missing thing is a failure or an error. |
| `target.go` | Whether a target is real, whether it refuses `http://` paths, and what "unchanged" reports. A stale `// Target is not supported` comment above a working implementation is common - read the body, not the comment. |
| `Validate()` | The mutually exclusive combinations. These are the most useful thing on the page and are almost never documented. |
| `*_test.go` + `testdata/` | Realistic specs to base examples on. |
| `../updatecli/pkg/core/pipeline/resource/main.go` | The registry: the authoritative `kind` string, and any alias (`terraform/file` is `hcl`; `golang` is `go/language`). |

### The support matrix is derived, not declared

Nothing in the Go code states "this plugin supports conditions". Work it out per stage:

- **supported** - the method has a real body.
- **not supported** - the method's whole body is `return fmt.Errorf("... not supported ...")`.

Quote the exact error string on the page when a stage is unsupported. Users search for it.

### `scm` on a condition behaves four different ways

Check which one applies and say so; the table cannot express it:

| Behaviour | Example |
|---|---|
| Hard error, condition aborts | `gitlab/branch`, `aws/ami` |
| Warning, scm ignored | `dockerdigest`, `npm`, `maven`, `stash/*`, `gitea/*` |
| Debug log only, invisible in a normal run | `golang`, `terraform/registry` |
| Honoured - the scm's directory is the working directory | `yaml`, `json`, `file`, `hcl` |

### URL schemes stop working at target

Most file-manipulating plugins accept `https://`, `http://` and `file://` for a source and a
condition, then refuse them in a target with `URL scheme is not supported for <X> target`. Say so, because
pages that mention the URL trick without the limit send people down a dead end.

## Verify against a real run (do not ship a read-only review)

Reading the spec tells you what *should* happen; running it tells you what does. Build from the
local source, not the installed binary:

```sh
cd ../updatecli && go build -o /tmp/uc .
mkdir -p /tmp/fixture && cd /tmp/fixture   # write the file the plugin manipulates
/tmp/uc pipeline diff --config ./manifest.yaml
```

`pipeline diff` is read-only; `pipeline apply` shows what a target actually writes, which is the
only way to check claims like "every document in a multi-document YAML file is updated". Note that
the bare `updatecli diff` form is deprecated in favour of `updatecli pipeline diff`.

Things worth probing, because they are where the docs were wrong before:

- Defaults that are not what the field name suggests (`dasel/v1` is still the default engine and
  warns as deprecated on every run).
- Whether an attribute is rejected or silently ignored. `template` on a `file` source is ignored;
  the page claimed it errored.
- Non-obvious types. `csv`'s `comma` is a Go rune, so YAML must carry the decimal code point,
  `comma: 59`, not `comma: ";"`.
- **Unknown `spec` keys are silently ignored**, so a misspelled field never errors. This is how
  `aws_ami.adoc` documented `access_key` (no such field) for years.

## Page structure

Front matter, matching the sibling pages:

```yaml
---
title: "Yaml"                         # plugin name, title case, no trailing space
description: "..."                    # one line, 50-160 chars (Hugo warns outside that range)
lead: "kind: yaml"                    # the registry kind string, lowercase
date: 2021-01-09T15:21:01+02:00       # leave the original
lastmod: 2026-07-29T10:00:00+02:00    # update when you edit
draft: false
images: []
menu:
  docs:
    parent: "plugin-resource"
toc: true
plugins:
  - source
  - condition
  - target
---
// <!-- Required for asciidoctor -->
:toc:
// Set toclevels to be at least your hugo [markup.tableOfContents.endLevel] config key
:toclevels: 4
```

`plugins` is a **Hugo taxonomy**, not decoration: it populates `/plugins/source/`,
`/plugins/condition/` and `/plugins/target/`. It must agree with the support matrix, or the page
goes missing from those listings. `menu.docs.parent` is dead frontmatter (the sidebar is built
from the content tree), but keep it for consistency.

If the title collides with a page in another plugin directory (`Dockerfile`, `Golang` and `NPM` all
exist under `autodiscovery/` too), add `identifier: "resource-<name>"` under `menu.docs`, or Hugo
warns about a duplicate menu entry.

Then, in order:

- The support matrix table, `source | condition | target`, with `&#10004;` / `&#10007;`.
- `== Description` - one sentence on what the resource does, then a labelled list with one entry
  per stage. Name the error string for unsupported stages, and point at the resource that does the
  job instead.
- `== Parameters` - the shortcode, then prose for what the generated table cannot express:
  mandatory fields and their error messages, stage-only attributes, and defaults.
- Behaviour sections as needed (engines, authentication, remote files, version filtering).
- `== Limitations` - dropped comments, unsupported combinations, things a target does not do.
- `== Example` - ideally an `include` of a file under `assets/code_example/`.
- `== Links` - upstream references and sibling resources.

## The parameters table is generated (never hand-write it)

```
{{< resourceparameters "sources" "yaml" >}}
```

It reads `content/en/schema/latest/policy/manifest/config.json`, matching the second argument
against `properties.<stage>.additionalProperties.oneOf[].properties.kind.enum[0]`. Consequences:

- A kind absent from that JSON renders an **empty table, silently** (no build error). New plugins
  (`gitcommit` at the time of writing) are absent until the `chore: update Updatecli jsonschema`
  bot regenerates it. When that happens, say so on the page and add a hand-written table as a
  stopgap.
- The first argument is `"sources"` on every page, including condition-only and target-only ones.
  The three schemas are identical, so this is harmless; leave it alone.
- Descriptions come from the Go doc comments on the `Spec` fields. **A wrong description is fixed
  in `../updatecli/pkg/plugins/resources/<plugin>/`, not here**, and the table lags until the
  schema is regenerated. Do not regenerate `config.json` by hand (it is a 2.6 MB bot-owned file).
- Never restate the table in prose; it drifts.

Check a kind exists before using it:

```sh
jq -r '[.properties.sources.additionalProperties.oneOf[].properties.kind.enum[]?] | sort | .[]' \
  content/en/schema/latest/policy/manifest/config.json
```

And to find kinds with no page at all, compare that list against the shortcode arguments used
across this directory.

## AsciiDoc conventions used here

- Cross-page links: `link:/docs/core/versionfilter/["Version Filtering" page]`. Inside
  `terraform/`, sibling pages use `link:{{< ref "registry" >}}[...]`.
- Shared fragments are pulled in with asciidoctor's own include, path from the repo root:
  `include::content/en/docs/plugins/_versionFilter.adoc[]`, `_githubAuth.adoc`.
- Examples live in `assets/code_example/docs/plugins/resources/<plugin>/` (note **`resources`
  plural**, while this content directory is `resource` singular) and are pulled in with
  `{{<include "assets/code_example/...">}}`. A missing path **fails the build**, unlike a bad
  shortcode argument.
- Admonitions: `NOTE:`, `TIP:`, `IMPORTANT:`, `WARNING:` on one line, or `[WARNING]` + `====` for
  blocks. Do not nest a `----` listing inside a `----` listing; use `====` for the outer block.
- Tables: the `[cols=...]` attribute goes **before** the opening `|===`. Reversed, the attribute
  line renders as a table row (`aws_ami.adoc` had this bug).

## Building and previewing

`npm run dev` or `npm run build`. Hugo shells out to `asciidoctor` for every `.adoc` file, so the
build fails wholesale without it. If it is not on `PATH`, wrap it - `config/_default/config.toml`
sets `security.exec.osEnv`, so Hugo strips most environment variables before spawning it:

```sh
printf '#!/bin/sh\nexec /path/to/asciidoctor "$@"\n' > /tmp/bin/asciidoctor
chmod +x /tmp/bin/asciidoctor
PATH=/tmp/bin:$PATH npm run build
```

A clean build prints no `ERROR` lines. Check the warnings too - `unterminated listing block`,
`duplicate menu entry` and `Description too short` all point at real mistakes in these pages.

## Writing style

The repository-wide rule in the root [CLAUDE.md](/CLAUDE.md) applies to every page you
write here: **no em dashes (`—`) and no en dashes (`–`)**. Use a comma, parentheses,
or a standard hyphen (`-`) instead. The only exception is Updatecli output quoted
verbatim inside a `[source,text]` block, which must match what the binary prints.

## Checklist before finishing

- [ ] Support matrix derived from the Go methods, not copied from the old page.
- [ ] `plugins:` frontmatter agrees with the matrix.
- [ ] Exact error string quoted for every unsupported stage.
- [ ] `scm`-on-condition behaviour stated when it is anything other than "honoured".
- [ ] URL-scheme support stated per stage for file-manipulating plugins.
- [ ] Mandatory fields and mutually exclusive combinations listed, with their messages.
- [ ] Stage-only attributes flagged (target-only, condition-only).
- [ ] Deprecated and `jsonschema:"-"` fields mentioned in prose (they are invisible in the table).
- [ ] Every behavioural claim traced to a file and line, or observed in a real run.
- [ ] Description between 50 and 160 characters; no trailing space in the title.
- [ ] `typos` run from the repository root, with no findings (CI enforces it).
- [ ] Full Hugo build passes with no errors and no new warnings.
