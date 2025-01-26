---
layout: post3
title: "Disk Quotas In Linux"
category: linux
cat: System
tags:
  - Linux
  - Disk
---

In this chapter we will focus on how to setup user and group disk quotas for filesystems.

## Command Overview

```
vim /etc/fstab
systemctl reboot
quotacheck --create-files --user --group /dev/vdb2
quotaon /mnt`
mkdir /mybackups/spiderman/
chown spiderman:spiderman /mybackups/spiderman
fallocate --length 100M /mybackups/spiderman/100Mfile
edquota --user spiderman`
blocks in quota
soft and hard values in quota`
fallocate --length 60M /mybackups/spiderman/60Mfile
quota --user spiderma
inode
quota --edit-period
edquota --group adm
quota --group ad

```

## Concepts

Quotas in Linux file systems are mechanisms used to restrict and monitor the usage of disk space and the number of files (inodes) by users or groups. This is particularly useful in multi-user environments to prevent a single user or group from consuming excessive disk resources, ensuring fair resource allocation.

There are two types of quotas first is the Disk Space and Inode. 
Disk Space Quota: Limits the amount of disk space a user or group can use. Inode Quota: Limits the number of files (inodes) a user or group can create.


Components for quotas are hard limit, soft limin and grace period.
Hard Limit: The absolute maximum usage. Users cannot exceed this limit.
Soft Limit: A threshold users can exceed temporarily. A grace period allows users to reduce their usage before the hard limit is enforced.
Grace Period: The time duration for which users can exceed the soft limit before hitting the hard limit.


### Enabling Quotas

Prepare the Filesystem.

Ensure the filesystem supports quotas (e.g., ext4, xfs).
Quotas are typically enabled during mount time or via /etc/fstab.
Modify /etc/fstab: Add the usrquota and/or grpquota options to the target partition:

```
/dev/sda1   /   ext4   defaults,usrquota,grpquota   1 1
```


Remount the Filesystem

Apply changes by remounting the filesystem:  

```
mount -o remount /
```

Generate quota files to store user and group quota information:  

```
quotacheck -cug /
```

- `-c`: Create new quota files.  
- `-u`: Enable user quotas.  
- `-g`: Enable group quotas.


Activate Quotas

Enable quotas on the filesystem:  

```
quotaon -ug /
```
---

### Managing Quotas

### **1. Set User Quotas**
Use the `edquota` command to configure quotas for a specific user:  
`edquota username`

Modify the soft and hard limits for both block and inode usage.

### **2. Check Quota Usage**
- To view quota usage for a user:  
  `quota -u username`
- To view quota usage for a group:  
  `quota -g groupname`

### **3. Report Quotas**
Generate a report for all users and groups:  
`repquota /`

### **4. Modify Grace Period**
Adjust the grace period for exceeding soft limits:  
`edquota -t`

---

## **Example Configuration**

### **Enable User Quota on `/home`**
1. Edit `/etc/fstab` to add the `usrquota` option:  
   `/dev/sda1   /home   ext4   defaults,usrquota   1 2`

2. Remount and enable quotas:  
   `mount -o remount /home`  
   `quotacheck -cu /home`  
   `quotaon -u /home`

### **Set Quota for User `john`**
1. Open `edquota` for the user:  
   `edquota john`

2. Edit the limits in the file:  
   Disk quotas for user john (uid 1001):  
   Filesystem blocks soft hard inodes soft hard  
   `/dev/sda1 5000 4000 6000 0 0 0`

---

## **Key Commands**
- **Enable Quotas**: `quotaon`  
- **Disable Quotas**: `quotaoff`  
- **Check Quotas**: `quota`, `repquota`  
- **Set Quotas**: `edquota`  
- **Validate Filesystem**: `quotacheck`

---

## **Benefits of Quotas**
- Prevent excessive resource usage by individual users or groups.
- Ensure equitable distribution of disk space in multi-u


#### User and Group Filesystem Quotas

* Quotas: 100 Tb for each user.
* dnf install quota : To install quota on the system if its not already installed.

#### Install xfs Filesystem

* `vim /etc/fstab` : Select quotas. After reboot quotas are enabled. `/dev/vdb1 /mybackups xfs ro,noexec 0 2` Default mount options change this. `/dev/vdb1 /mybackups xfs defaults,usrquota,grpquota 0 2` to this. (we add two)
* `systemctl reboot` : reboot the machine

#### Install ext4 Filesystem

* Ext needs 2 commands more on partition like /dev/vdb1
* `quotacheck --create-files --user --group /dev/vdb2` : This wiil create two files. aquota.group aquota.user.
* `quotaon /mnt`/ : If filesystem is located location such as /mnt/ we can turn quota limits.

#### Quotas On xfs Filesystem

* `mkdir /mybackups/spiderman/` : Create directory.
* `chown spiderman:spiderman /mybackups/spiderman` : Permissions.
* `fallocate --length 100M /mybackups/spiderman/100Mfile` : Create 100M file.
* `edquota --user spiderman` : List quotas for user. Opens with default text editor vi.
* `blocks in quota` : usage 102400 blocks 1 block is usually 1KB. Matches 100MB.  
* `soft and hard values in quota`  : 0 is no limits. 150 soft hard 200M. We can write M instead of blocks. G for gigabytes.
* `fallocate --length 60M /mybackups/spiderman/60Mfile` : Create 60M file. Exceds soft limit.
* `quota --user spiderman` : aads "*" and gives 6 days grace limit. Cant write data. Hard limit cant create.
* `inodes` : Each directory or file uses inode's we can limit limit inodes with soft and hard limits. 
* `quota --edit-period` : Change grace pediod.
* `edquota --group adm` : Same for groups.
* `quota --group adm`  : Same for groups

## Steps
