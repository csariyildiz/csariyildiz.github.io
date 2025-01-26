---
layout: post3
title: "Managing Local Storage"
category: linux
cat: System
tags:
  - Linux
  - Disk
---

This series on Linux system administration explores the essential concepts and practical tools required for managing storage in a Linux environment. Efficient storage management is a critical skill for system administrators, as it ensures the reliability, performance, and scalability of systems while safeguarding critical data.

## Sections

* [Managing Disks In Linux](/managing-disks-in-linux)
* [LVM – Logical Volume Manager](/logical-volume-manager)
* Disk Features
  * [Encrypted Storage](/encrypted-storage-in-linux)
  * [RAID Devices](/raid-devices-in-linux)
  * [File And Directory Attributes](/file-and-directory-attributes)
  * [Disk Quotas](/disk-quotas-in-linux)
* [File Systems](/file-systems-in-linux)
* Optimization And Compression
  * [VDO](/vdo-in-linux)
  * [LVMVDO](/lvmvdo-in-linux)
  * [Stratis](/stratis-in-linux)

### Managing Disks

Block devices are hardware or virtual devices that allow data to be read or written in fixed-size blocks. Examples include hard drives, SSDs, and optical drives. They are represented as special files in the /dev directory, such as /dev/sda.

Partitions divide a disk into separate sections, each functioning as an independent storage unit. Partitions are created using tools like fdisk, gdisk, or parted, and each is assigned a unique identifier, such as /dev/sda1.

Mounting is the process of making a filesystem accessible by attaching it to a directory in the Linux filesystem tree. The mount command is used to achieve this, and unmounting is done with the umount command.

The /etc/fstab file contains information about filesystems to be mounted automatically at boot. It specifies the device, mount point, filesystem type, options, and dump/backup frequency.

The Master Boot Record (MBR) and GUID Partition Table (GPT) are partitioning schemes for disks. MBR supports up to 4 primary partitions and a maximum size of 2TB, while GPT supports larger disks and allows for up to 128 partitions.

The boot process in Linux involves several stages, starting with the BIOS/UEFI firmware, which loads the bootloader, followed by the kernel initialization and systemd process.

GRUB (Grand Unified Bootloader) is the default bootloader in most Linux distributions. It allows users to select the operating system to boot and pass parameters to the kernel.

Identifying large files on a disk helps free up space. Commands like find / -type f -size +1G and du (disk usage) are commonly used to locate such files.

Managing Swap: Swap space is used as virtual memory to supplement physical RAM. Swap can be a dedicated partition or a file, and it is managed using tools like swapon, swapoff, and /etc/fstab for persistent configuration.

### Logical Volume Manager

LVM provides flexible disk management by allowing administrators to create, resize, and manage logical volumes. It uses physical volumes (PVs) to form volume groups (VGs), from which logical volumes (LVs) are created. LVM makes it easier to expand storage without downtime.

### Disk Features

Encrypted storage ensures that data is protected by converting it into a secure format, accessible only with a decryption key or passphrase. Tools like LUKS and dm-crypt are commonly used in Linux to implement disk encryption, providing security for sensitive data. We will focus on plain-encription and LUKS using cryptsetup.

RAID (Redundant Array of Independent Disks) combines multiple physical disks into a single logical unit to improve performance, redundancy, or both. Linux supports various RAID levels (e.g., RAID 0, 1, 5) through software RAID using tools like mdadm.

Linux advanced permissions include Access Control Lists (ACLs) and special bits like SUID, SGID, and sticky bit. These features offer granular control over file and directory access, going beyond the basic rwx permissions. File and directory attributes in Linux provide additional control over how files and directories behave. Using tools like lsattr to view and chattr to modify attributes, you can set features like immutability (+i), which prevents a file from being modified, deleted, or renamed, even by root.

Disk quotas allow administrators to limit the amount of disk space or number of files a user or group can use. They help prevent a single user or process from consuming excessive storage, ensuring fair usage and system stability.

### File Systems

File systems are methods used by operating systems to store, organize, and retrieve data on storage devices. They define how files are named, stored, and accessed, and examples include ext4, XFS, and NTFS.

ext4 (Extended Filesystem 4) is the default filesystem for many Linux distributions. It supports large files, journaling, and features like delayed allocation for improved performance.

XFS is a high-performance journaling filesystem designed for scalability. It is well-suited for systems requiring efficient handling of large files and large storage volumes.

### Optimization And Compression

VDO (Virtual Data Optimizer) is a Linux technology that provides data deduplication and compression for block storage. It reduces disk usage and improves efficiency by eliminating duplicate blocks and compressing data.

LVMVDO integrates VDO with LVM, allowing administrators to use VDO features like compression and deduplication alongside LVM's flexible volume management.

Stratis is a next-generation storage management tool for Linux that simplifies managing and scaling storage. It provides features like pooling, snapshots, and thin provisioning with minimal configuration.
