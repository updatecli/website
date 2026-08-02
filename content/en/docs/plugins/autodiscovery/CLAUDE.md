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

# Writing autodiscovery plugin documentation

Instructions for creating or updating a page in this directory, for example `pyproject.adoc`.
Each page documents one autodiscovery crawler.

## Rule zero: the Go plugin is the source of truth

Never write these pages from the existing prose, from an older page, or from the crawler name.
Pages here go stale silently (a behaviour change upstream does not touch the website repo).
`pyproject.adoc` claimed the crawler ran `uv add` and updated `pyproject.toml` for months after the
command had been changed to `uv lock --upgrade-package`, which deliberately does the opposite.

The plugin lives in the updatecli repo, normally a sibling checkout: `../updatecli`. The crawler
source is `../updatecli/pkg/plugins/autodiscovery/<crawler>/`.

Before writing, check whether the page is already behind:

```sh
git log --oneline -5 -- content/en/docs/plugins/autodiscovery/<crawler>.adoc
git -C ../updatecli log --oneline -15 -- pkg/plugins/autodiscovery/<crawler>/
```

A code history longer than the doc history means claims need re-checking, not just extending.

## What to read, and what each file tells you

| File | What to extract |
|---|---|
| `main.go` | The `Spec` struct: every parameter. `New()`: defaults applied when a field is unset (e.g. the fallback versionfilter kind), external CLI probes, validation errors. |
| `manifestTemplate.go` | Exactly what gets generated: source kind, target kind, the literal command, `changedif`, `workdir`, `disablesourceinput`, and which blocks are conditional. Conditional blocks are the interesting part (they are the cases where the crawler produces something degraded). |
| `<crawler>.go` / `dependencies.go` | The discovery loop: which files are opened, which sections/fields are read, what is silently skipped. The struct used to unmarshal the config file is the definitive list of what is supported. |
| `utils.go` | Filename patterns searched, directories skipped during the walk, parsing rules, and any "skip this file entirely" branches. |
| `matchingRule.go` | `only`/`ignore` semantics: which fields match, AND/OR behaviour, how versions are compared. |
| `main_test.go` + `testdata/` | Golden expected manifests. The best check that an example you write is realistic. |
| `../updatecli/pkg/core/pipeline/autodiscovery/main.go` | The registration entry: any `alias`, and whether `ignoreDefault: true` is set. No `ignoreDefault` means the crawler runs by default under `updatecli diff`, which the page must say. |

## Verify against a real run (do not ship a read-only review)

Reading the template tells you what *should* be generated; running the crawler tells you what *is*.
Build from the local source, not the installed binary, which may predate the change you are
documenting:

```sh
cd ../updatecli && go build -o /tmp/uc . 
mkdir -p /tmp/fixture && cd /tmp/fixture   # write a small project the crawler should match
/tmp/uc manifest show --clean
```

Point a crawler config at it to check parameters individually:

```sh
/tmp/uc manifest show --config ./crawler.yaml --clean
```

Autodiscovery does **not** require `--experimental`, with or without a manifest. The only
experimental gate in the crawler registry is for `.wasm` plugin crawlers. Do not add the flag to
these pages.

Copy generated manifests into the page from this output, not from the Go template (the template
uses placeholders and the serialized field order differs).

Exercise the failure paths too, since they are what users hit first and what pages usually omit:
required CLI missing from `PATH`, lock file absent, config file in a nested directory. If a
required external tool is not installed, a stub on `PATH` answering `--version` is usually enough to
reach manifest generation.

## Page structure

Front matter, matching the sibling pages:

```yaml
---
title: "Pyproject"                    # crawler name, title case
description: "..."                    # one line, under 160 chars
lead: "kind: pyproject"               # the crawler key
draft: false
images: []
menu:
  docs:
    parent: "plugin-autodiscovery"
weight: 130                           # always 130; the sidebar sorts by title within a weight
toc: true
plugins:
  - autodiscovery
---
// <!-- Required for asciidoctor -->
:toc:
// Set toclevels to be at least your hugo [markup.tableOfContents.endLevel] config key
:toclevels: 4
```

`toc: true` alone does nothing for AsciiDoc pages - Hugo builds its TOC from asciidoctor's output,
so the `:toc:` attribute is what actually produces the "On this page" nav. Most pages here omit it
and therefore have no TOC; include it for anything longer than a couple of screens.

Then, in order:

- `== Description` - what is scanned, which sections of those files are read, and the
  enabled-by-default sentence with a `link:/docs/core/autodiscovery/#_parameters["Autodiscovery" page]`
  reference for tuning.
- `== Requirements` - only when an external CLI or a companion file is needed. State what happens
  when it is missing; a table of detection outcomes works well when there is more than one.
- `== Generated manifests` - the real manifest, in a `[source,yaml]` block, plus anything
  surprising about it (what the target does *not* modify, which environment variables reach it).
- `== Version filtering` - only when the crawler's default differs from a plain global filter, or
  when patterns are rewritten per discovered item.
- `== Limitations` - config sections not parsed, entries skipped, information dropped. Users
  otherwise read silence as support.
- `== Manifest` / `=== Parameters` - the shortcode, nothing else (see below).
- `=== Example` with `==== <name>` subsections.

Keep the examples as `=== Example` at the same level as `=== Parameters`, not nested under it.

## The parameters table is generated (never hand-write it)

```
{{< autodiscoveryparameters "pyproject" >}}
```

It reads `content/en/schema/latest/policy/manifest/config.json`, at
`.properties.autodiscovery.properties.crawlers.properties.<key>`, and renders name/type/description
two levels deep. Consequences:

- The argument must be a key present in that JSON. Crawler **aliases are not in it**, so
  `{{< autodiscoveryparameters "python/uv" >}}` renders an empty table. Mention an alias in prose.
- Descriptions come from the Go doc comments on the `Spec` fields. **A wrong or missing description
  is fixed in `../updatecli/pkg/plugins/autodiscovery/<crawler>/main.go`, not here.** The JSON is
  regenerated by the `chore: update Updatecli jsonschema` bot after the Go change merges, so the
  table lags the fix.
- Never restate the table in prose; it drifts. Prose should cover behaviour the table cannot express.

Check a key exists before using it:

```sh
jq -r '.properties.autodiscovery.properties.crawlers.properties | keys[]' \
  content/en/schema/latest/policy/manifest/config.json
```

## AsciiDoc conventions used here

- Cross-page links: `link:/docs/core/versionfilter/["Version Filtering" page]`. Use `xref:` only
  for anchors within the same page.
- Admonitions: `NOTE:`, `TIP:`, `IMPORTANT:` on a single line, or `[NOTE]` + `====` for blocks.
- Code: `[source,yaml]` followed by `----` fences.
- Longer examples may live in `assets/code_example/docs/plugins/autodiscovery/<crawler>/` and be
  pulled in with
  `{{<include "assets/code_example/docs/plugins/autodiscovery/<crawler>/updatecli.d/default.yaml">}}`.
  Inline blocks are fine and more common for short examples.

## Building and previewing

`npm run dev` (Hugo server) or `npm run build`. Hugo shells out to `asciidoctor` for every `.adoc`
file, so the build fails wholesale without it.

If `asciidoctor` is not on `PATH`, the repo vendors one under `vendor/bundle/ruby/<version>/bin/`.
Exporting `GEM_HOME` is not enough: `config/_default/config.toml` sets
`security.exec.osEnv = ['(?i)^(PATH|PATHEXT|APPDATA|TMP|TEMP|TERM)$']`, so Hugo strips every other
variable before spawning the binary. Use a wrapper on `PATH`:

```sh
cat > /tmp/bin/asciidoctor <<'EOF'
#!/bin/sh
export GEM_HOME=/path/to/website/vendor/bundle/ruby/4.0.0
exec "$GEM_HOME/bin/asciidoctor" "$@"
EOF
chmod +x /tmp/bin/asciidoctor
PATH=/tmp/bin:$PATH npm run build
```

A clean build prints no `ERROR` lines. After building, confirm on the rendered page that the
parameters table has a row per `Spec` field, the headings appear in the TOC, and the page sorts
among its siblings in the sidebar.

## Writing style

The repository-wide rule in the root [CLAUDE.md](/CLAUDE.md) applies to every page you
write here: **no em dashes (`—`) and no en dashes (`–`)**. Use a comma, parentheses,
or a standard hyphen (`-`) instead. The only exception is Updatecli output quoted
verbatim inside a `[source,text]` block, which must match what the binary prints.

## Checklist before finishing

- [ ] Every behavioural claim traced to a specific file and line in the plugin, or observed in a run.
- [ ] Generated-manifest example copied from real `manifest show` output.
- [ ] Required external tooling stated, along with what happens when it is absent.
- [ ] Degraded modes documented (the crawler generating nothing, or a source with no target, is
      the single most common gap in these pages).
- [ ] Default version filter stated when it is not the generic one.
- [ ] Unsupported config sections and skipped entries listed under Limitations.
- [ ] Any alias mentioned in prose, and not passed to the shortcode.
- [ ] `weight: 130`, correct `menu.parent`, `plugins: [autodiscovery]`.
- [ ] `typos` run from the repository root, with no findings (CI enforces it).
- [ ] Full Hugo build passes with no errors.
