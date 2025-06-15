---
title: "Docker Hub rate limit"
description: "How to work with docker hub query rate limiting."
lead: "How to work with docker hub query rate limiting."
date: 2025-06-12T17:00:00+00:00
lastmod: 2025-06-12T17:00:00+00:00
draft: false
images: []
menu:
  docs:
    parent: "help"
weight: 640
toc: true
---
## Scope

This page explains the rate limit consequences and actions one can do when fetching data from Docker Hub; it might also apply to other registries. Feel free to expand the documentation.

## Resources

The content of this page is a collection of information from discussion with peers, tests and public documentation pages & blog posts, here are some of these resources:

- [Docker Hub usage & limits](https://docs.docker.com/docker-hub/usage/)
- [Docker hub pull definitions, usage & limits](https://docs.docker.com/docker-hub/usage/pulls/) also explains how to fetch the information using curl.
- [GitLab blog post](https://about.gitlab.com/blog/2025/03/24/prepare-now-docker-hub-rate-limits-will-impact-gitlab-ci-cd/) on the topic and introduction to registry caching service.

## Rate limit

Docker Hub introduced a few years ago a rate limiting system for the consumers of their registry.

| User type | Pull rate limit per hour |
|-----------|--------------------------|
| Anonymous | 100 **get** per 6 hour rolling window |
| Authenticated (free account) | 200 **get** per 6 hour rolling window |
| Authenticated (paying account) | Unlimited (fair use) |

Note that for anonymous users, the rolling window takes into account the IPv4 or the IPv6/64 subnet of the consumer.

## Consequence for UpdateCli

As the [definition](https://docs.docker.com/docker-hub/usage/pulls/#pull-definition) puts it: a **head** request doesn't count in the pull quota, but a **get** request does. UpdateCli uses both, the first one to know if something has changed, the second type to fetch updated information.

Therefore, UpdateCli doesn't 'pull' the whole image binary but does consume the quota when retrieving the manifests & other metadata.

## How to make best use of it

### Create an account

By [creating an account](https://docs.docker.com/accounts/create-account/) you extend the quota allocated to you from 100 to 200 per 6 hours rolling window.

Enable the use of this account by logging in locally (using [docker login](https://docs.docker.com/reference/cli/docker/login/)), on your server or providing the credentials to updatecli. Eg: [auths](https://www.updatecli.io/docs/plugins/autodiscovery/dockerfile/#_parameters) object in some manifests files.

### Use a caching service

[GitLab's blogpost](https://about.gitlab.com/blog/2025/03/24/prepare-now-docker-hub-rate-limits-will-impact-gitlab-ci-cd/) describes of a setup using their dependency proxy; the setup & configuration is left as an exercise to the user.

### kubernetes: limit fail & retry

When running as a kubernetes cronjob, you *may* want to limit retries after failure by configuring:

- `restartPolicy` to `Never`
- `backoffLimit` to `0`

Therefore when failing, it won't retry and burn your quota by running multiple times.

## View your current situation

The [documentation](https://docs.docker.com/docker-hub/usage/pulls/#view-pull-rate-and-limit) explains how to retrieve the rate limit state of your identity (either logged in user or based on your IP when anonymous).

Here is an example (based on their documentation) to evaluate the state of an *anonymous* user's consumption over *IPv4*:

```bash
# Retrieve an authentication token for the API.
TOKEN=$(curl "https://auth.docker.io/token?service=registry.docker.io&scope=repository:ratelimitpreview/test:pull" | jq -r .token)
```

```bash
# Retrieve the quota value using the above token.
curl -4 --head -H "Authorization: Bearer $TOKEN" https://registry-1.docker.io/v2/ratelimitpreview/test/manifests/latest
```

Examine the headers and the `ratelimit-limit`, `ratelimit-remaining` and `docker-ratelimit-source` to know your state in the current rolling window of 6 hours.

You might want to modify the `curl` command above to fetch over *IPv6* as the values are treated independently.

If you are logged in view `docker login` when executing `UpdateCli`, see their documentation to retrieve the consumption for your account.
