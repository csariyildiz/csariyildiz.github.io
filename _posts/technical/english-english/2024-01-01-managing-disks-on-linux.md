---
forms: blog15
layout: post5
title: "Managing Disks On Linux"
category: main
cat: Linux
tags:
  - Operating Systems
  - Linux
  - Disk Management
---

## Table Of Contents

* Block Device Concepts
  
1. Add a new disk to virtual machine. (2GB)
2. Take snapshot.
3. Display the amount of disk space used and available on filesystems.
4. Space of files and directories.

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

#### Mounting

Mounting is the process of making a filesystem accessible at a specific directory (called a mount point) in the Linux directory tree. 
Linux attaches storage devices (like hard drives, USBs, or network shares) to the system so users can access their data.
Mount Point could be any directory where the filesystem will be accessible (e.g., /mnt, /home, /media/usb).

Unlike some operating systems that automatically assign drive letters to new devices, Linux integrates everything into a single directory tree. 
This approach requires devices to be manually or automatically mounted before their contents can be accessed.
Fstab file automatically mount filesystems at boot, add entries in /etc/fstab.

```
/dev/sdX1  /mnt/mydisk  ext4  defaults  0  0
```

#### Why we need partitions?

For example 2TB SSD can divided two different partitions. With this configuration both Windows Linux operating systems can use their NTFS and ext4 file system by logical seperation provided by the partitions. 

Partition informations is the first data written on the disk. This data is crucial because it defines the layout and structure of the storage space of the disk.

####  What are MBR And GPT?

MBR (Master Boot Record) and GPT (GUID Partition Table) partition standarts for partitioning. MBR is the legacy option supports up to 4 primary partitions. Can use extended partitions to create more than 4 partitions. Limited to disks up to 2TB. GPT (GUID Partition Table) supports a large number of partitions (typically up to 128). Allows disks larger than 2TB. Includes redundancy with a backup table at the end of the disk.

####  What is LVM?

LVM is a another layer of abstraction over traditional partitioning, allowing flexible management of disk space. It has components such as PVs, VGs and LVs.

####  Further Concepts

* Boot Process In Linux
* 

## Steps

#### 1. Add a new disk to virtual machine. (2GB) 

<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/blog15_1.png" class="img-fluid" alt="">

* We are using rhel9-4 on Oracle VM VirtualBox.
* Settings for the disk could be Controller Sata VdI.
  
#### 2. Take snapshot.

<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/blog15_2.png" class="img-fluid" alt="">

* Its important the take snapshot since its easy to broke partitions.

#### 3. Display the amount of disk space used and available on filesystem.

```
acs@rhel9-4 /]$ sudo df -h
Filesystem             Size  Used Avail Use% Mounted on
devtmpfs               4.0M     0  4.0M   0% /dev
tmpfs                  1.8G     0  1.8G   0% /dev/shm
tmpfs                  732M  8.9M  724M   2% /run
/dev/mapper/rhel-root   17G  4.8G   13G  28% /
/dev/sda1              960M  412M  549M  43% /boot
tmpfs                  1.0M     0  1.0M   0% /run/stratisd/ns_mounts
tmpfs                  366M   40K  366M   1% /run/user/1000
```

* First three devtmpfs tmpfs tmpfs are all swap space. (2 gig carved)
* First filesystem is /dev/mapper/rhel_10-root filesystem.
* Second is /dev/sda1 1 G. Reserved files for boot. System is booted using certain files located the boot. Operating system uses this files to boot up the system.
* 98 97 percent means file system is full which is critical.

#### 4. Display size of a spesific directory. (/bin)

* We may also want to list usage for certain files and directories.
* We can see disk usage of `/bin/` using the command `du -sh /bin/`.

```
[acs@rhel9-4 ~]$ sudo du -sh /bin/
208M    /bin/
```

#### 5. Display size of files in a directory. (/var/log and /)

* The sort -nr option sorts numerically and in reverse order, so the largest sizes appear at the top.

```
[acs@rhel9-4 ~]$ sudo du -kh /var/log | sort -nr | more
232K    /var/log/rhsm
28K     /var/log/tuned
12M     /var/log
12K     /var/log/cups
...
```

* `du -kh / 2>/dev/null | sort -nr | more` will search all the file system for biggest files.
* Errors are send to /dev/null.

```
[acs@rhel9-4 ~]$ sudo du -kh / 2>/dev/null | sort -nr | more
1012K   /usr/share/microcode_ctl/ucode_with_caveats/intel-06-8e-9e-0x-0xca
1012K   /usr/lib/modules/5.14.0-427.31.1.el9_4.x86_64/kernel/drivers/net/wireless/realtek/rtlwifi
1008K   /usr/lib/modules/5.14.0-427.13.1.el9_4.x86_64/kernel/drivers/net/wireless/realtek/rtlwifi
1000K   /usr/lib64/spa-0.2/bluez5
1000K   /usr/lib64/python3.9/multiprocessing
996K    /usr/share/microcode_ctl/ucode_with_caveats/intel-06-8e-9e-0x-0xca/intel-ucode
996K    /usr/lib/python3.9/site-packages/orca/scripts/apps
...
 ```

#### 7. Show all mounted filesystems and their mount points.

* `df -h` will show filesystems mount points.

```
[acs@rhel9-4 ~]$ df -h
Filesystem             Size  Used Avail Use% Mounted on
devtmpfs               4.0M     0  4.0M   0% /dev
tmpfs                  1.8G     0  1.8G   0% /dev/shm
tmpfs                  732M  8.9M  724M   2% /run
/dev/mapper/rhel-root   17G  4.8G   13G  28% /
/dev/sda1              960M  412M  549M  43% /boot
tmpfs                  1.0M     0  1.0M   0% /run/stratisd/ns_mounts
tmpfs                  366M   40K  366M   1% /run/user/1000
```

* `mount | column -t` will show all mount points.

```
[acs@rhel9-4 ~]$ mount | column -t
proc        on  /proc                   type  proc         (rw,nosuid,nodev,noexec,relatime)
sysfs       on  /sys                    type  sysfs        (rw,nosuid,nodev,noexec,relatime,seclabel)
devtmpfs    on  /dev                    type  devtmpfs     (rw,nosuid,seclabel,size=4096k,nr_inodes=460757,mode=755,inode64)
securityfs  on  /sys/kernel/security    type  securityfs   (rw,nosuid,nodev,noexec,relatime)
tmpfs       on  /dev/shm                type  tmpfs        (rw,nosuid,nodev,seclabel,inode64)
devpts      on  /dev/pts                type  devpts       (rw,nosuid,noexec,relatime,seclabel,gid=5,mode=620,ptmxmode=000)
tmpfs       on  /run                    type  tmpfs        (rw,nosuid,nodev,seclabel,size=749508k,nr_inodes=819200,mode=755,inode64)
cgroup2     on  /sys/fs/cgroup          type  cgroup2      (rw,nosuid,nodev,noexec,relatime,seclabel,nsdelegate,memory_recursiveprot)
pstore      on  /sys/fs/pstore          type  pstore       (rw,nosuid,nodev,noe...
...
```

#### 8. Show filesystems.

* `df -T` will show filesystems.
  
```
[acs@rhel9-4 ~]$ df -T
Filesystem            Type     1K-blocks    Used Available Use% Mounted on
devtmpfs              devtmpfs      4096       0      4096   0% /dev
tmpfs                 tmpfs      1873768       0   1873768   0% /dev/shm
tmpfs                 tmpfs       749508    9068    740440   2% /run
/dev/mapper/rhel-root xfs       17756160 4929928  12826232  28% /
/dev/sda1             xfs         983040  421020    562020  43% /boot
tmpfs                 tmpfs         1024       0      1024   0% /run/stratisd/ns_mounts
tmpfs                 tmpfs       374752      40    374712   1% /run/user/1000
 ```



