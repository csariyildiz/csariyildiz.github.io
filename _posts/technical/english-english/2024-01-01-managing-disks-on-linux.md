---
forms: blog15
layout: post3
title: "Managing Disks On Linux"
category: main
cat: Linux
tags:
  - Operating Systems
  - Linux
  - Disk Management
---


## Block Device Concepts

* We can use the command `lsblk` to list block devices. 

<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/blog15_4.png" class="img-fluid" alt="">


* Are items on the list are block devices.
* `Block Devices` : Block devices are places where linux store data and retrieve data from.
* Not all `lsblk` output are partitions. Only the ones type column is `part` for partitions.
* `sda, sdb` : These are sda is virtual disk. Contains two partitions sda1 and sda2. Virtual machine block devices typically begin with letter v.
* `Naming s` : s means serial. Its similar an physical SSD disk connected to sata port (serial ata). If we use NVME devices start using nvme.
* `Naming sda1` : If we have 3 disks we have names like SDA, SDB, SDC. Partitions will be named as sda1,sda2,sdb1,sdb2. sda first disk sda1 first partition.
* `sda1, sda2, sdb1` : These are martitions managed bay partition table on the disk. Partitions can be mounted on folder on a filesytem similar to disks.
* In a operating system, disks like `/dev/vdb` refers to a virtual block device, typically used in virtualized environments such as KVM, Xen, or OpenStack. These devices are often provided by the hypervisor (the software layer that manages the virtual machines) and are usually connected to a virtual machine (VM) as additional storage.
* `Why we need partitions?`: Assume we got 2TB SSD. Partitions divide disk. For example both Windows Linux operating systems can use their NTFS and ext4 by logical seperation provided by the partitions. Partition informations is the first data written on the disk. This data is crucial because it defines the layout and structure of the storage space on the disk.
* `What are MBR And GPT?`: MBR (Master Boot Record) and GPT (GUID Partition Table) partition standarts MBR is the legacy option supports up to 4 primary partitions. Can use extended partitions to create more than 4 partitions. Limited to disks up to 2TB. GPT (GUID Partition Table) supports a large number of partitions (typically up to 128). Allows disks larger than 2TB. Includes redundancy with a backup table at the end of the disk.
* `What is LVM?`: LVM is a layer of abstraction over traditional partitioning, allowing flexible management of disk space.
It has components such as PVs, VGs and LVs.

## Steps

#### 1. Take snapshot.

<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/blog15_1.png" class="img-fluid" alt="">

```
Its important the take snapshot since its easy to broke partitions etc.
```

#### 2. Add a new disk to virtual machine. (2GB) 

<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/blog15_2.png" class="img-fluid" alt="">

```
We are using rhel9-4 on Oracle VM VirtualBox.
Controller Sata VdI

```

#### 3. Display the amount of disk space used and available on filesystems.

<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/blog15_3.png" class="img-fluid" alt="">

```
df -h
```

#### 5. Space of files and directories.

<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/blog15_4.png" class="img-fluid" alt="">

```
df -h
```
