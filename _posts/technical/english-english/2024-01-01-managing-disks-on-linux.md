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

```
[acs@rhel9-4 /]$ lsblk
NAME          MAJ:MIN RM SIZE RO TYPE MOUNTPOINTS
sda             8:0    0  20G  0 disk 
├─sda1          8:1    0   1G  0 part /boot
└─sda2          8:2    0  19G  0 part 
  ├─rhel-root 253:0    0  17G  0 lvm  /
  └─rhel-swap 253:1    0   2G  0 lvm  [SWAP]
sdb             8:16   0   2G  0 disk 
└─sdb1          8:17   0   1G  0 part 
sr0            11:0    1  51M  0 rom
```

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

#### 1. Add a new disk to virtual machine. (2GB) 

<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/blog15_1.png" class="img-fluid" alt="">

```
We are using rhel9-4 on Oracle VM VirtualBox.
Controller Sata VdI
```

#### 2. Take snapshot.

<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/blog15_2.png" class="img-fluid" alt="">

```
Its important the take snapshot since its easy to broke partitions etc.
```

#### 3. Display the amount of disk space used and available on filesystems.

```
acs@rhel9-4 /]$ sudo df -h
[sudo] password for acs: 
Filesystem             Size  Used Avail Use% Mounted on
devtmpfs               4.0M     0  4.0M   0% /dev
tmpfs                  1.8G     0  1.8G   0% /dev/shm
tmpfs                  732M  8.9M  724M   2% /run
/dev/mapper/rhel-root   17G  4.8G   13G  28% /
/dev/sda1              960M  412M  549M  43% /boot
tmpfs                  1.0M     0  1.0M   0% /run/stratisd/ns_mounts
tmpfs                  366M   40K  366M   1% /run/user/1000
```

```
- First three devtmpfs tmpfs tmpfs are all swap space. (2 gig carved)
- First filesystem is /dev/mapper/rhel_10-root filesystem.
- Second is /dev/sda1 1 gig. Reserved files for boot. We boot our system there are certain files located the boot. Operating system uses hem to boot up the system.
- 98 97 percent means file system is full which is critical.
```

#### 5. Space of files and directories.

<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/blog15_4.png" class="img-fluid" alt="">

```
df -h
```
