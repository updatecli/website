---
title: "Highlight of the week"
date: 2024-07-29T00:00:00+00:00
draft: false
weight: 50
images: [""]
contributors: ["olblak"]
---

<p align="center">
  <img src="/images/gopher_coffee.png" width="250"/>
</p>

What a great way to start the week by not discovering one but two blog posts about Updatecli.

The first one I discovered, was written by Sean Rigby on **[blog.devgenius.io](https://blog.devgenius.io/automating-updates-of-third-party-kubernetes-services-with-updatecli-c1eab9c56948)**

It highlights the **[Autodiscovery](https://www.updatecli.io/docs/core/autodiscovery/)** feature of Updatecli, and how flexible it can be to discover updates in GitOps repositories automatically.
In the blogpost Sean covers **[ArgoCD](https://www.updatecli.io/docs/plugins/autodiscovery/argocd/)**, but Updatecli also takes care of **[FluxCD](https://www.updatecli.io/docs/plugins/autodiscovery/flux/)** or **[Rancher Fleet](https://www.updatecli.io/docs/plugins/autodiscovery/fleet/)** GitOps repositories.

The second one on **[write.in0rdr.ch](https://write.in0rdr.ch/bump-npm-dependencies-with-updatecli)**

Show how easy it is to run Updatecli from a Jenkins pipeline to automate NPM dependencies update.

Fun facts, Updatecli started from my time on the Jenkins project and where it is still heavily used today.

It is great to see Updatecli evolving to become a universal tool that not only benefits infrastructure projects, like how everything started on **[github.com/jenkins-infra/jenkins-infra](https://github.com/jenkins-infra/jenkins-infra/tree/production/updatecli)**, but now, it also benefits more dev oriented projects such as Javascript, Golang, Java, Rust.

There are still many problems to tackle but we are getting there one problem at a time and one ecosystem at a time.
