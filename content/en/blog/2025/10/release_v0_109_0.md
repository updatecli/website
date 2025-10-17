---
title: "Updatecli v0.109.0 Released: GitHub App Auth, Smarter NPM & Cargo Autodiscovery, and More!"
date: 2025-10-13T00:00:00+00:00
draft: false
weight: 50
images: [""]
contributors: ["olblak"]
---

I am excited to announce the release of **Updatecli v0.109.0**, packed with new features and improvements that make dependency automation even more powerful and secure. This release brings major enhancements to GitHub authentication, NPM and Cargo autodiscovery, and overall developer experience.

---

You can find the full release notes on [**updatecli.io**](https://www.updatecli.io/changelogs/updatecli/changelogs/v0.109.0/)
Otherwise, read on for the highlights of this release!

## 🚀 Highlights

### 1. GitHub App Support for GitHub Authentication

**Updatecli now supports GitHub App authentication!**
This is a important feature for teams and organizations that need secure, scalable, and high-rate-limit access to the GitHub API.

#### Why is this important?

- **Higher API rate limits** compared to personal access tokens (PATs)
- **Granular permissions** for improved security
- **Centralized management** for CI/CD and automation workflows

#### How to use GitHub App authentication

You can configure Updatecli to use a GitHub App either via environment variables or directly in your manifest. Here’s how:

**Via Environment Variables:**

```sh
export UPDATECLI_GITHUB_APP_CLIENT_ID="123456"
export UPDATECLI_GITHUB_APP_PRIVATE_KEY="$(cat /path/to/private-key.pem)"
export UPDATECLI_GITHUB_APP_INSTALLATION_ID="789012"
```

Or, using a private key file:

```sh
export UPDATECLI_GITHUB_APP_CLIENT_ID="123456"
export UPDATECLI_GITHUB_APP_PRIVATE_KEY_PATH="/path/to/private-key.pem"
export UPDATECLI_GITHUB_APP_INSTALLATION_ID="789012"
```

**Via Manifest:**

```yaml
scms:
  default:
    kind: github
    spec:
      owner: myorg
      repository: myrepo
      app:
        clientID: "123456"
        privateKey: "{{ requiredEnv `GITHUB_APP_PRIVATE_KEY` }}"
        installationID: "789012"
```

Or with a private key path:

```yaml
scms:
  default:
    kind: github
    spec:
      owner: myorg
      repository: myrepo
      app:
        clientID: "123456"
        privateKeyPath: "/path/to/private-key.pem"
        installationID: "789012"
```

Important: Environment variables override manifest configuration !

> **Tip:** For best security and maintainability, prefer using a GitHub App or environment variables for authentication, and avoid hardcoding secrets in your manifests.

**Learn more:**

- [GitHub App Documentation](https://docs.github.com/en/developers/apps)
- [Updatecli GitHub SCM Plugin Docs](https://www.updatecli.io/docs/plugins/scm/github/#authentication)

---

### 2. NPM Autodiscovery: Ignore Version Constraints

**New!** You can now configure NPM autodiscovery to **ignore version constraints** in your `package.json` files.
This means Updatecli can suggest updates even for dependencies with complex or restrictive constraints, giving you more flexibility in keeping your projects up to date.

**Example configuration:**

```yaml
autodiscovery:
  crawlers:
    npm:
      ignoreversionconstraints: true
```

- **Why use this?**
  - Easily surface updates for all dependencies, regardless of how constraints are defined.
  - Useful for bulk upgrades, security patching, or when constraints are too restrictive.

---

### 3. Cargo Autodiscovery: Build-Dependencies Support

Rust developers rejoice!
Updatecli’s Cargo autodiscovery now supports **build-dependencies**, making it easier to keep your Rust projects and their build tooling up to date.

- Automatically detects and proposes updates for `[build-dependencies]` in your `Cargo.toml`.
- Works alongside regular dependencies for comprehensive coverage.

---

## 🧰 Other Notable Improvements

- **Slim Docker Image:**
  A new lightweight Docker image for Updatecli is now available, perfect for CI/CD pipelines.
- **Better Rate Limit Handling:**
  Updatecli will now pause and resume automatically when hitting GitHub API rate limits, ensuring reliable automation.
- **Dependency Updates:**
  Numerous Go module bumps and toolchain upgrades for improved stability and security.
- **Adopters Update:**
  Welcome SUSE Rancher and RKE2 to the list of Updatecli adopters!

---

## How to Upgrade

Updatecli v0.109.0 is available now on [GitHub Releases](https://github.com/updatecli/updatecli/releases), Docker Hub, and as a Go binary.

```sh
# Upgrade via Homebrew
brew upgrade updatecli

# Or pull the latest Docker image
docker pull updatecli/updatecli:latest
```

More installation options can be found in our [Installation page](https://www.updatecli.io/docs/prologue/installation/).

---

## Feedback & Community

We love hearing from our users!
If you have feedback, or want to share how you use Updatecli, join us on [GitHub Discussions](https://github.com/updatecli/updatecli/discussions) or [Chat](https://app.gitter.im/#/room/#Updatecli_community:gitter.im).
