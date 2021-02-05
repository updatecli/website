---
title: "Quick Start"
description: "One page summary of how to apply a strategy update."
lead: "One page summary of how to apply a strategy update."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu: 
  docs:
    parent: "prologue"
weight: 110
toc: true
---

## Requirements

Make sure you downloaded the latest updatecli binary [Installation →]({{< ref "installation/#_packages" >}}):

### Linux

{{< btn-copy text="curl -sSfL -o updatecli https://github.com/updatecli/updatecli/releases/latest/download/updatecli.linux.amd64 && chmod +x ./updatecl" >}}

```
  curl -sSfL -o updatecli https://github.com/updatecli/updatecli/releases/latest/download/updatecli.linux.amd64
  chmod +x ./updatecl
```

## Init the updatecli project

Create a new directory that will hold your updatecli configuration.

{{< btn-copy text="mkdir -p ./updatecli/updatecli.d" >}}
```
  mkdir -p ./updatecli/updatecli.d
```
updatecli is the root of you project and updatecli.d will contains your updatecli configuration

## Create an example file

For this quickstart, we'll generate an example file that we are going to update.
So let's imagine the following YAML file, it could be your puppet hieradata file, your helm value file, or whatever you want.
For us, it's a YAML file that contains a Docker image tag referencing the latest Jenkins version running in our infrastructure.

Let's update it

config.yaml
```
image:
  tag: 2.275
```


### Create your first configuration

Let's create our first updatecli configuration to update our jenkins version running in our infrastructure.

{{< btn-copy text="touch ./updatecli/updatecli.d/jenkins.yaml" >}}

```bash
touch ./updatecli/updatecli.d/jenkins.yaml
```

#### Source

The first stage in an updatecli pipeline is to define how we know where we retrieve a value.
A new Jenkins version is first published on a maven repository located on repo.jenkins-ci.org, in the repository releases
inside the groupID 'org.jenkins-ci.main' using the artifactID 'jenkins-war'.

So our updatecli config start as follows.

.updatecli/updatecli.d/jenkins.yaml
```
source:
  name: Get Jenkins Version
  kind: maven
  spec:
    owner: "maven"
    url: "repo.jenkins-ci.org"
    repository: "releases"
    groupID: "org.jenkins-ci.main"
    artifactID: "jenkins-war"
```

What's important to notice here is: the key "kind: maven" specifies which type of resource we are using here and directly affect the parameters that we use under spec:

At this stage, updatecli knows the latest version and can now use it in later stages.

#### Conditions

In the source stage, we identify how to retrieve information from a third location, a maven repository.
But before updating our config.yaml, we want to test at least one assumption.

. Is there a docker image tag for that specific version published on a docker registry?

To test that, we append the following snippet to our updatecli configuration file.

.updatecli/updatecli.d/jenkins.yaml
```
conditions:
  conditionID:
    name: "Docker Image Published on Registry"
    kind: "dockerImage"
    spec:
      image: "jenkins/jenkins"
```

Same as the source stage, a  condition needs at least a name, a kind, and a spec. The "kind" value defines parameters needed in the spec block.

In this example, we could have added more conditions, like do we have the key "image.name" set to "jenkins/jenkins" so we validate that we use the right docker image but let keep it simple for now

#### Target

Finally, we know the value that we want which is, the latest Jenkins version. We validated our assumption that a docker image exists. So let update our example file with the following snippet

.updatecli/updatecli.d/jenkins.yaml
```
targets:
  targetID:
    name: "Update jenkins/jenkins docker tag"
    kind: yaml
    spec:
      file: "config.yaml"
      key: "image.tag"
```

The targets block is similar to the conditions, we can have multiple targets, each identified with their unique targetID

### Diff

At this stage, we know which file we want to update, and the strategy that we are going to apply, so let see if any change 
would be applied by running

```
updatecli diff --config .updatecli/updatecli.d/jenkins.yaml
```

Which should show you

```
###########
# JENKINS #
###########



SOURCE:
=======

✔ Latest version is 2.276 on Maven Repository


CHANGELOG:
==========
We couldn't identify a way to automatically retrieve changelog information


CONDITIONS:
===========

✔ jenkins/jenkins:2.276 available on the Docker Registry


TARGETS:
========

**Dry Run enabled**

✔ Key 'image.tag', from file '/tmp/updatecli_example/config.yaml', was updated from '2.273' to '2.276'

=============================

REPORTS:


⚠ JENKINS
	Source:
		✔  Get Jenkins Version(maven)
	Condition:
		✔  Docker Image Published on Registry(dockerImage)
	Target:
		⚠  Update jenkins/jenkins docker tag(yaml)




Run Summary
===========

1 job run
0 job succeed
0 job failed
1 job applied changes
```

### Apply 

So let our command from "diff" to "apply" to update the file.

```
updatecli diff --config .updatecli/updatecli.d/jenkins.yaml
```

## Go further

Through this example, we saw a very simple update strategy. An amelioration of this pipeline would be to automatically publish modified files to a git repository. They are more resources that can be used as Source, Condition, or Target.


### Stages

Understand on how the different stages work. [Stages →](/docs/stages/)

### Resources

Understand on how to parametrize resources. [Resources →](/docs/resources/)

### Scm

Learn how to use updatecli with scm repository. [SCM →](/docs/scm/)

### Continously Update Everything

Learn how to continuously run updatecli to apply updates. [CI →](/docs/automate/)

## Contributing

Find out how to contribute to Updatecli. [Contributing →](/docs/help/contributing/)

## Help

Get some help. [Help →]({{< ref "help" >}})

