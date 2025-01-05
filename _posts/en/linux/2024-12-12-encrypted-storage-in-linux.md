---
layout: post3
title: "Encrypted Storage In Linux"
category: main
cat: System
tags:
  - Linux
  - Disk
---

Encrypted storage ensures that data is protected by converting it into a secure format, accessible only with a decryption key or passphrase. 
Tools like LUKS and dm-crypt are commonly used in Linux to implement disk encryption, providing security for sensitive data.
We will focus on plain-encription and LUKS using cryptsetup.

Plain encryption is a simpler encryption method with no metadata stored on the device.
It is faster but it lacks key management, meaning we cannot use multiple passphrases or easily recover if the key is lost.
Both LUKS and plain encryption can use a keyfile. There are encryption algorithm details for both. This will determine how secure is the encryption but we wont get into.

LUKS (Linux Unified Key Setup) is a standardized and widely-used encryption system for Linux. Supports multiple key slots, allowing us to store multiple passphrases for recovery. Includes metadata on the encrypted device, making it easier to manage and recover.

## Concepts

### Encrypted Disk And Cryptsetup

* Encryption prevents unauthorized access to data on a physical device, ensuring security even if the storage is stolen or lost.
* The cryptsetup tool is commonly used for encryption. It supports two modes: plain (a simple, less secure method) and LUKS (more advanced and widely used for robust encryption).
* To explore available commands and options, we can run `cryptsetup --help` or use tab completion (`cryptsetup <space> <Tab><Tab>`).

### Using An Encrypted Disk


* To use an priviously encrypted disk we need to open the encrypted device `/dev/vde` and map it to `/dev/mapper/mysecuredisk` with following command.

```
cryptsetup open /dev/vde mysecuredisk
```

* Now this command works for both plain and LUKS encryption modes and naturally requires sudo.
* After entering the passphrase, the device became accessible for further operations.

* We can mount the mapped device /dev/mapper/mysecuredisk to the directory /mnt/mysecuredisk.
* Of course we need to create the mount dir first.

```
mount /dev/mapper/mysecuredisk /mnt/mysecuredisk
```

* This allows us to access the decrypted data stored on the encrypted device.
* We will unmount and close it when we want to get to the encrypted state again.

### Close Encrypted Disk

* To close it first we unmount the filesystem from `/mnt`, ensuring that the data is no longer accessible.

```
umount /mnt/mysecuredisk
```

* Then close the encrypted device. When its closed its locked.

```
cryptsetup close mysecuredisk
```

* The device `/dev/vde` is no longer accessible.
* It has to be mounted and opened.

### Configure a Disk with Plain Encryption

* If we want to create encrypted device `/dev/vde` we can encrypt it using plain encryption.
* This will only enrypte device using a passphrase.

```
cryptsetup --verify-passphrase open --type plain /dev/vde mysecuredisk
```

* The `--verify-passphrase` option ensures that the passphrase is correct before opening the device.
* After that the encryption setup is initialized.

* To actually use the disk we need a filesystem. We configure it with the XFS filesystem.
* We are using the mapper address. The underlying encrypted device is `/dev/vde` like we configured it before.
   
```
mkfs.xfs /dev/mapper/mysecuredisk`
```

* Now we can mount and start to use it.
* This mounts the filesystem on `/dev/mapper/mysecuredisk` to the mount point `/mnt`.
   
```
mount /dev/mapper/mysecuredisk /mnt/mysecuredisk
```

* The data is now accessible.
* We can unmount and close it if we want to lock the disk.

### Configure a Disk with LUKS Encryption

* To use LUKS encryption on `/dev/vde` we use cryptsetup with luksFormat parameter.
* We do that before opening as an extra step.

```
cryptsetup luksFormat /dev/vde
```

* We will be prompted to confirm the operation and provide a passphrase.
* Than open it typically as we did before.
* The name (mysecuredisk or secretdisk) is arbitrary and user-defined. It simply determines the name of the mapped device under /dev/mapper/.

```
cryptsetup open /dev/vde mysecuredisk
```

* Again we create a filesystem on the encrypted device.
```
mkfs.xfs /dev/mapper/mysecuredisk
```

### Changing the key

* We can change the passphrase for the LUKS-encrypted device `/dev/vde` now.

```
cryptsetup luksChangeKey /dev/vde
```

### Configure Partitions Instead of Disk

* Similarly we can configure paritions instead of a whole disk with both plain and luks encription.
* Again to use LUKS encryption on `/dev/vde` we use cryptsetup with luksFormat parameter.
* We do that before opening as an extra step.

```
cryptsetup luksFormat /dev/vde2
```

* We open the LUKS-encrypted partition `/dev/vde2` with name we gave.
* This will map it to `/dev/mapper/mysecuredisk`.

```
cryptsetup open /dev/vde2 mysecuredisk
```

* If using plain encryption instead of LUKS on a specific partition, this command opens `/dev/vde2` with plain encryption, using the specified passphrase.

```
cryptsetup open --type plain --verify-passphrase /dev/vde2 mysecuredisk
```

### Encrypt Using A Key File

A keyfile is simply a file containing random or specific data used for encryption.

To generate a random keyfile:

```
dd if=/dev/urandom of=/root/keyfile bs=1024 count=4
chmod 600 /root/keyfile
```

* The of=/root/keyfile is path to the keyfile (store it securely). And bs=1024 count=4: creates a 4 KB keyfile.
* Secure the keyfile by restricting access.
* Then we can use the file:

```
cryptsetup luksFormat --key-file /root/keyfile /dev/vde
```

## Steps

#### 1. Check The Partition

* First we need to verify that /dev/sdb1 exists and is the correct partition.

```
sudo fdisk -l

Device     Boot Start     End Sectors Size Id Type
/dev/sdb1        2048 4194303 4192256   2G 83 Linux
```

* Side Note: We cant open without formatting first.

```
sudo cryptsetup open /dev/sdb1 secureDiskLuks
Device /dev/sdb1 is not a valid LUKS device.
```

#### 2. Configure LUKS on the Partition

We are sure /dev/sdb1 is the right partition and doesn’t contain data we want to keep.
Then initialize it as a LUKS device:

```
sudo cryptsetup luksFormat /dev/sdb1
```

```
sudo cryptsetup open /dev/sdb1 secureDiskLuks
```

#### 3. Format With Filesystem EXT4


```
sudo mkfs.ext4 /dev/mapper/mysecuredisk`
```

#### 4. Format With Filesystem EXT4

