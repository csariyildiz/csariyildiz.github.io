---
layout: post3
title: "Notes On Linux System Administration"
category: main
cat: System
tags:
  - Linux
  - Disk
---

I recently began organizing my notes on Linux system administration. Some might wonder if this is necessary in an era where chatbots are readily available, but I see it as a valuable habit. My initial resources were online courses and books, but rather than copying them directly, I refined and expanded the content over time with the help of chatbots. Since GitHub Pages doesn't seem to be raising any issues so far, I’ll continue using it to serve my Jekyll platform.

I prefer to create each topic into three sections: command overview, concepts, and steps. The command overview provides a summary of the relevant commands for each chapter. The concepts section offers an in-depth explanation of the topic. Finally, the steps section outlines basic lab exercises to practice the concepts. I mainly used Ubuntu and RHEL 9 with the help of VirtualBox.

The series is organized into eight main chapters:

* [1- Accessing the System](/operating-running-systems)
  * Logging And Switching Users, Connection Methods, SSH And Telnet, User Account Details, Managing User Accounts, Managing User Permissions.
* [2- Using the File System](/operating-running-systems)
  * Files And Directories, Hard And Softlinks, File Permissions, Text Editing And Vim, File And Directory Searching, Filtering Files, IO Redirection.  Acessing System Documentation. File Archives And Compression. Backup And Imaging.
* [3- Shell Scripting](/operating-running-systems)
  * Script files and running, Variables, Control Flow, Processing Script Inputs, Exit Codes, Functions, File Operations, file operations with scripts.
* [4- Operating Running Systems](/operating-running-systems)
  * Rebooting system, Interrupting The Boot Process,  Troubleshooting Botloaders, Grub Settings,  System Targets, Tuning Profiles, Diagnose And Manage Processes, Log Files
* [5- Managing Local Storage](/managing-local-storage)
  * Devices and partitions, configuring swap, LVM (Logical Volume Manager), encrypted storage, RAID devices, file and directory attributes, disk quotas, file systems, VDO and LVMVDO, Stratis.
* [6- Managing Systems](/managing-systems)
  * Network configuration, services and tasks, task scheduling, startup processes and services, installing and maintaining software.
* [7- Security Basics](/security-basics)
  * Basic User Accounts and managing access (authorization and authentication) in linux, SSH hardening and configuration, ACL, Kernel Runtime Parameters, PAM, Managing Access to root, kernel runtime parameters.
* [8- SELinux](/selinux)
  * SELinux Configuration, SELinux Troubleshooting. 
* [9- Containerization](/containerization)
  * Docker Podman Skopeo, using containers as a services, container storage.

* Only chapters 5,6,7,8,9 published for now.

## Remarks

While AI is making significant strides in automating tasks, including system monitoring, troubleshooting, and even some aspects of system administration, it is unlikely to completely "take over" the role of Linux system administrators in the near future.

One of the reasons is complex decision making. AI tools can assist with routine tasks like managing logs, updating systems, and even detecting potential issues. However, complex decisions that require context, understanding of specific business needs, or troubleshooting in real-world environments still require human expertise.

Every system tends to be unique in terms of its configuration, use cases, and performance requirements. A Linux system administrator can adapt to these nuances, while AI, even with machine learning, needs structured data and might struggle with highly customized or non-standard environments.

In terms of security and risk management, system administrators are responsible for making judgment calls on security measures and assessing risks, often based on experience and intuition. While AI can help with automating security scans and threat detection, it is not fully capable of handling the ethical and strategic decision-making involved in securing complex systems.

Another aspect is the human interaction. Many roles in IT, including system administration, also involve communication with other teams, stakeholders, or end users. These human interactions, as well as an understanding of organizational culture and context, are areas where AI still has limitations.

Today linux system administration still a crucial skill. While automation tools, cloud platforms, and container technologies have evolved, Linux continues to be the foundation of many servers, cloud environments, and enterprise systems. The demand for Linux administrators is strong, especially with the growing use of open-source technologies, DevOps practices, and infrastructure-as-code. As businesses rely more on Linux-based systems for scalability, security, and cost efficiency, system administration skills in this area are essential for operation and performance.

## Links

### Interactive Tutorials

* [tldr.inbrowser.app](https://tldr.inbrowser.app/) : Very neat PWA (Progressive Web App) written in Vue.js and typescript. Lists tldr for CLI commands.
* [Vim Adventures](https://vim-adventures.com/) : A game that teaches VIM.
* [learnshell.org](https://www.learnshell.org/) : Interactive shell tutorial.

