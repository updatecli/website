---
title: "Securing GitHub Actions Workflows with Zizmor, Scaling Using Updatecli"
date: 2026-03-13T00:00:00+00:00
draft: false
weight: 50
images: [""]
contributors: ["olblak"]
---

Recent [**incidents**](https://awesomeagents.ai/news/hackerbot-claw-trivy-github-actions-compromise/) have shown that weak GitHub Actions workflows can lead to repository compromise.  
A great tool to prevent this is [**Zizmor**](https://github.com/zizmorcore/zizmor), a static analysis tool for GitHub Actions.

As the Zizmor project states:

---
Zizmor can find many common security issues in typical GitHub Actions CI/CD setups, including:

- Template injection vulnerabilities, leading to attacker-controlled code execution
- Accidental credential persistence and leakage
- Excessive permission scopes and credential grants to runners
- Impostor commits and confusable `git` references
- ...[**and much more**](https://docs.zizmor.sh/audits/)!

---

After testing it for a few days, I found it very easy to adopt: add a workflow, run it, and quickly get actionable findings.  
Like most security tools, it can produce some noise (findings with low exploitability), but the overall value is excellent.

The next challenge is scale: enabling Zizmor across all repositories in a GitHub organization.

To solve that, I created an [**Updatecli policy**](https://www.updatecli.io/docs/core/shareandreuse/) that detects repositories without a Zizmor workflow and automatically opens a pull request.

In short, an Updatecli policy is a collection of manifests distributed via an OCI registry (for example, `ghcr.io`).  
When Updatecli runs a policy, it downloads those manifests to a temporary local directory and applies them.

To test it, create a `values.yaml` file with parameters targeting your GitHub organization:

```yaml
scm:
  enabled: true
  kind: githubsearch
  # search accepts an advanced GitHub search query
  # Use https://github.com/search/advanced to craft one
  search: |
    org:updatecli
    fork:true
    is:public
    archived:false
  # branch accepts a regex to filter detected branches
  branch: "^main$"
  email: <email used to create commits>
  # 0 means no limit
  limit: 1
```

```bash
export UPDATECLI_GITHUB_TOKEN=xxxx
export UPDATECLI_GITHUB_USERNAME=yyy

# Show a diff of the policy
updatecli pipeline diff --values values.yaml ghcr.io/updatecli/policies/zizmor/githubaction/scaffold:0.5.3

# Apply the policy
updatecli pipeline apply --values values.yaml ghcr.io/updatecli/policies/zizmor/githubaction/scaffold:0.5.3

# Show the policy
updatecli manifest show --values values.yaml ghcr.io/updatecli/policies/zizmor/githubaction/scaffold:0.5.3
```

Updatecli then opens pull requests, such as this one:  
[**kubewarden/sbomscanner#927**](https://github.com/kubewarden/sbomscanner/pull/927)

The source code for this policy is available at:  
[**updatecli/policies**](https://github.com/updatecli/policies/tree/main/updatecli/policies/zizmor/githubaction/scaffold)

This approach is flexible enough for different repository types and can be run in CI to ensure every new repository gets a PR enabling Zizmor.  
That is what we do [**here**](https://github.com/updatecli/.github/blob/main/updatecli-compose.yaml).

Now it is time to review all my GitHub repositories.

## Links

- [**Hackerbot Claw trivy github actions compromise**](https://awesomeagents.ai/news/hackerbot-claw-trivy-github-actions-compromise/)
- [**Zizmor**](https://github.com/zizmorcore/zizmor)
- [**kubewarden/sbomscanner pull request**](https://github.com/kubewarden/sbomscanner/pull/927)
- [**updatecli/policies** source](https://github.com/updatecli/policies/tree/main/updatecli/policies/zizmor/githubaction/scaffold)
- [**Zizmor audits** documentation](https://docs.zizmor.sh/audits/)
- [**Updatecli policy** documentation](https://www.updatecli.io/docs/core/shareandreuse/)
