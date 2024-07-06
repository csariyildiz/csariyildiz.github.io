---
layout: post4
title: "Running Containers"
category: linux
number: 30
cat: "System Administration"
desc: "Using Podman in RHEL9"
tags:
  - Containers
---

Enron dataset is commonly used dataset by scientific community and researchers as a  test or training data for various NLP tasks.
In this article, we will load this dataset into MongoDB for faster parsing.

## Overview

Practical Objectives:
* Explain containers, docker and podman.
* Practical: Verify configurations of podman.
* Practical: Download and run an image in podman.

## Running Containers

### What is a container?

Container technology allows developers or programmers to test and build application on any computer just by putting in a container.

Container is bundled with: Software Code, Libraries, Configuration Files

An operating system can run a single or multiple containers at the same time. 

Containers are better with microservice/modular design rather than monolithic designs.

System administrator task is not to write code for application but install configure and manage containers.

The term container as a concept came from the shipping container.
Containers are standart with same measurements. All docks trucks ships and warehouses easily transport and store them.

In old days, so there was a developer, she would write a code in her laptop and while she's writing a code, the purpose of writing the code is to, she could create an application. 

So once the code is written, the application is billed, she tested it on on her laptop, then she copies that same code or that same software to a production server. 

Then the production server, we will open up that package or install the package. Then we will try to run it and somehow it won't run. 

Then the developer will come back or the program will come back and says, Hey, it runs on my computer perfectly, but it doesn't run on the production. That's why the main reason containers were born. 
