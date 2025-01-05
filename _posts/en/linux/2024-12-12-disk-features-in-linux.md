---
layout: post3
title: "Disk Features In Linux"
category: main
cat: System
tags:
  - Linux
  - Disk
---

In this post, we’ll explore various disk management features in Linux, including encrypted storage, RAID devices, advanced permissions with ACL and file directory attributes, and disk quotas.

Encrypted storage ensures that data is protected by converting it into a secure format, accessible only with a decryption key or passphrase. 
Tools like LUKS and dm-crypt are commonly used in Linux to implement disk encryption, providing security for sensitive data.
We will focus on plain-encription and LUKS using cryptsetup.

RAID (Redundant Array of Independent Disks) combines multiple physical disks into a single logical unit to improve performance, redundancy, or both. 
Linux supports various RAID levels (e.g., RAID 0, 1, 5) through software RAID using tools like mdadm.

Linux advanced permissions include Access Control Lists (ACLs) and special bits like SUID, SGID, and sticky bit. 
These features offer granular control over file and directory access, going beyond the basic rwx permissions.
File and directory attributes in Linux provide additional control over how files and directories behave. 
Using tools like lsattr to view and chattr to modify attributes, you can set features like immutability (+i), which prevents a file from being modified, deleted, or renamed, even by root.

Disk quotas allow administrators to limit the amount of disk space or number of files a user or group can use. 
They help prevent a single user or process from consuming excessive storage, ensuring fair usage and system stability.


Once opened, the mapped device (/dev/mapper/mysecuredisk) must be formatted with a filesystem, e.g., ext4:

```
sudo mkfs.ext4 /dev/mapper/mysecuredisk
```
