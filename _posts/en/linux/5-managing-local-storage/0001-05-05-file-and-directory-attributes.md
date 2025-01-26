
---
layout: post3
title: "File And Directory Attributes"
category: lonux
cat: System
tags:
  - Linux
  - Disk
---

In this chapter we will focus on advanced permissions on linux including File And Directory Attributes and special bits like SUID, SGID, and sticky bit. 

These features offer granular control over file and directory access, going beyond the basic rwx permissions. Similar to other security mechanisms we focus on later. Such as ACL.

## Command Overview

```
man chattr

lsattr newfile
chattr +a newfile
chattr -a newfile
chattr +i newfile
chattr -i newfile
lsattr -aR /var/log | grep '----i'
lsattr -aR /var/log | grep '---ia'
lsattr -aR /var/log | grep '----i' | awk '{print $2}'

ls -ltr

chmod u+s examplefile
chmod u-s examplefile
chmod g+s examplefile
chmod g-s examplefile

chmod +t /stickydir/
chmod -t /stickydir/

```

## Concepts

### File And Directory Attributes

* File and directory attributes are a feature of the filesystem in Linux. These attributes provide additional control over how files and directories behave, beyond the standard rwx (read, write, execute) permissions.
* By using specialized tools like lsattr and chattr, administrators can set attributes that enforce restrictions, such as preventing deletion or allowing only appends to a file. 
* Idea is even root cant bypass the restrictions provided by attributes. In that case as root we first need to change the attribute using chattr.
* These attributes act as on/off switches that modify file behavior.

### Append Only And Immutable

* There are 14 attributes but key attributes are +i and +a.

* Append Only (+a)
    * Files with the append-only attribute can only have data added to them. Modifying or deleting existing data is not allowed.
    * Use Case: Ideal for log files to ensure logs cannot be overwritten.
    * Only the root user can enable or disable this attribute.
* Immutable (+i)
    * Files with the immutable attribute cannot be changed in any way. They cannot be modified, deleted, renamed, or even linked.
    * Use Case: Useful for protecting critical configuration files from accidental or malicious changes.
    * Even the root user cannot modify the file until the attribute is removed.


* Sample use case could be not giving users rights on OS disk. So they only edit data on the storage disk.

### Creating Reading Updating And Deleting Attributes

* We can use lstattr command to see attributes of a directory or a file.

```
lsattr newfile
```

* Add the append-only attribute.

```
chattr +a newfile
```

* Verify

```
lsattr newfile
```

* Remove the append-only attribute

```
chattr -a newfile
```

* Verify

```
lsattr newfile
```

* To learn more about chattr and its options, refer to the manual.

```
man chattr
```

### Search for Attributes

Find Immutable Files (+i) Recursively

```
lsattr -aR /var/log | grep '----i'
```

Files with both +i and +a attributes:

```
lsattr -aR /var/log | grep '---ia'
```

To display only filenames (and not their attributes), use awk:

```
lsattr -aR /var/log | grep '----i' | awk '{print $2}'
```

### List Of File And Directory Attributes

* Full list of file and directory attributes in Linux, as managed by the chattr command. Each attribute controls specific behaviors of files and directories:
    * Append Only (a) : File can only be opened for appending. Useful for log files.
    * Immutable (i) : File cannot be modified, deleted, renamed, or linked.
    * No Dump (d) : File is excluded from dump backups.
    * Secure Deletion (s) : File contents are securely deleted when the file is removed.
    * Undeletable (u) : File contents are preserved (for possible recovery) when the file is deleted.
    * Compressed (c) : File is automatically compressed on disk. Accessing it decompresses the file.
    * Synchronous Updates (S) : Updates to the file are written synchronously (directly to disk).
    * Synchronous Directory Updates (D) : Changes to directory contents are written synchronously.
    * No Tail-Merging (t) : Disables tail-merging for files in ext4. Useful for compatibility with certain applications.
    * Immutable for Lower Layers (e) : Enables inline data (specific to ext4).
    * Data Journaling (j) : All file data is written to the journal before being written to the file.
    * Project Hierarchy (P) : File is associated with a project ID for quota management (ext4-specific).
    * Compression Raw Access (X) : Direct access to compressed file data.
    * Index Directory (T) : Marks the directory as having indexed structure (ext3/ext4-specific).

### SUID SGID Bits

* When the SUID bit is set on a file, it allows the file to be executed with the permissions of the file owner, rather than the permissions of the user running the file. 
* This can provide additional privileges to the user executing the file.

* Set SUID on a file:

```
chmod u+s examplefile
```

* This sets the SUID bit, making the file execute with the owner’s permissions, regardless of who runs the file.
* File permissions are:

```
-rwsr-xr-x 1 root root 12345 Jan 1 12:00 examplefile
```

* Remove SUID from a file:

```
chmod u-s examplefile
```

```
-rwSr-xr-x 1 root root 12345 Jan 1 12:00 examplefile
```

* The S indicates the SUID bit is set, but the user doesn't have execute permissions
* SGID (Set Group ID) is similar. When the SGID bit is set on a file, it causes the file to be executed with the permissions of the file's group, rather than the group of the user executing the file.
* Lets give no execute permissions for the group:

```
chmod 2664 spiders.jpg
```

* This command sets the SGID bit and removes execute permissions for the group.
* Lets give execute permissions for the group:

```
chmod 2674 spiders.jpg
```

* This command sets the SGID bit and allows the group to execute the file with the file's group permissions.

### Sticky Bit

* The Sticky Bit is typically set on directories that are shared between multiple users. 
* When set, even if other users have write or execute permissions on the directory, only the owner of a file or directory (or root) can delete or rename it.
* With execute permission (t):

```
chmod +t /stickydir/
```

* This command adds the sticky bit to a directory, making it a "sticky" directory, where only the owner of a file can delete or rename it.
* With symbolic permissions `(1777)`:

```
chmod 1777 /stickydir/
```

* This command sets the sticky bit along with the typical directory permissions (rwx for the owner, group, and others).
* The `t` indicates that the sticky bit is active. For example, when viewing directory permissions:
* `drwxrwxrwt` indicates that the directory has the sticky bit set, while drwxrwxrwT would indicate that the sticky bit is set but not for all users to execute.

### Steps

#### 1. List file and directory attributes.

```
sudo lsattr /home
---------------------- /home/acs
---------------------- /home/jack

sudo lsattr test.txt 
---------------------- test.txt
```

#### 2. Make file append only.

```
chattr +a test.txt 
```

#### 3. Verify

```
sudo lsattr test.txt
-----a---------------- test.txt
```

* Cant delete lines. Even root.
