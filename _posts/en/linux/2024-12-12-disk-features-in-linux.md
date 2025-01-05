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

## Concepts

### cryptsetup - Create And Configure Encrypted Storage

* Encryption prevents unauthorized access to data on a physical device, ensuring security even if the storage is stolen or lost.
* The cryptsetup tool is commonly used for encryption. It supports two modes: plain (a simple, less secure method) and LUKS (more advanced and widely used for robust encryption).
* To explore available commands and options, `run cryptsetup --help` or use tab completion (`cryptsetup <space> <Tab><Tab>`).

#### Using An Encrypted Disk

* To use an priviously encrypted disk we need to open the encrypted device /dev/vde and map it to /dev/mapper/mysecuredisk with following command.

```
cryptsetup open /dev/vde mysecuredisk
```

* This command works for both plain and LUKS encryption modes and naturally requires sudo.
* After entering the passphrase, the device becomes accessible for further operations.

* We can mount the mapped device /dev/mapper/mysecuredisk to the directory /mnt.

```
mount /dev/mapper/mysecuredisk /mnt
```

* This allows you to access the decrypted data stored on the encrypted device.

#### Close Encrypted Disk

* To close it first we unmount the filesystem from `/mnt`, ensuring that the data is no longer accessible.

```
umount /mnt
```

* Then close the encrypted device. When its closed its locked.
* The device `/dev/vde` is no longer accessible.

```
cryptsetup close mysecuredisk
```

#### Configure a Disk with Plain Encryption

* If we want to create encrypted device `/dev/vde` using plain encryption first 

```
cryptsetup --verify-passphrase open --type plain /dev/vde mysecuredisk
```

* The `--verify-passphrase` option ensures that the passphrase is correct before opening the device.
* This step initializes the encryption setup.


* To actually use it we need a filesystem. We configure it with the XFS filesystem.
 
```
mkfs.xfs /dev/mapper/mysecuredisk`
```

* The underlying encrypted device is `/dev/vde`. (needs to be run as sudo)

```
mount /dev/mapper/mysecuredisk /mnt
```

* Mounts the filesystem on `/dev/mapper/mysecuredisk` to the mount point `/mnt`.
* The data is now accessible.

#### Configure a Disk with LUKS Encryption

* Encrypts the disk. Initializes LUKS encryption on `/dev/vde`. You will be prompted to confirm the operation and provide a passphrase. (needs to be run as sudo)

```
cryptsetup luksFormat /dev/vde
```

* Open the encrypted device. Opens the LUKS-encrypted device `/dev/vde` and map it to `/dev/mapper/mysecuredisk`. LUKS uses a header to manage encryption. (needs to be run as sudo) secretdisk is different from

```
cryptsetup open /dev/vde mysecuredisk
```

* Create a filesystem on the encrypted device. Formats the mapped device `/dev/mapper/secretdisk` with the XFS filesystem. (needs to be run as sudo)

```
mkfs.xfs /dev/mapper/mysecuredisk
```

 * Changes the passphrase for the LUKS-encrypted device `/dev/vde`.

```
cryptsetup luksChangeKey /dev/vde
```

#### Configure Partitions Instead of Disk

* Initializes LUKS encryption on a specific partition, `/dev/vde2`. You will be prompted to confirm and provide a passphrase.

```
cryptsetup luksFormat /dev/vde2
```

* Opens the LUKS-encrypted partition `/dev/vde2` and maps it to `/dev/mapper/mysecuredisk`.

```
cryptsetup open /dev/vde2 mysecuredisk
```

* If using plain encryption instead of LUKS on a specific partition, this command opens `/dev/vde2` with plain encryption, using the specified passphrase.

```
cryptsetup open --type plain --verify-passphrase /dev/vde2 mysecuredisk
```

## Steps

#### 1. Check The Partition

Verify that /dev/sdb1 exists and is the correct partition.

```
sudo fdisk -l

Device     Boot Start     End Sectors Size Id Type
/dev/sdb1        2048 4194303 4192256   2G 83 Linux
```

Note: Cant open without formatting first.

```
sudo cryptsetup open /dev/sdb1 secureDiskLuks
Device /dev/sdb1 is not a valid LUKS device.
```

#### 2. Initialize LUKS on the Partition: 

If you are sure /dev/sdb1 is the right partition and doesn’t contain data you want to keep, initialize it as a LUKS device:

```
sudo cryptsetup luksFormat /dev/sdb1
```

```
sudo cryptsetup open /dev/sdb1 secureDiskLuks
```

#### 3. Format the Mapped Device With Filesystem EXT4

Once opened, the mapped device (/dev/mapper/mysecuredisk) must be formatted with a filesystem, e.g., ext4:

```
sudo mkfs.ext4 /dev/mapper/mysecuredisk
```
