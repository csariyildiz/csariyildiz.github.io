---
forms: blog15
layout: post5
title: "5-1 Managing Disks On Linux"
category: linux
cat: Linux
tags:
  - Operating Systems
  - Linux
  - Disk Management
---

In this post, we’ll explore practical steps and best practices to manage disks effectively.
We will focus on partitions and swap space. Managing disks is a crucial aspect of operating system administration, playing a key role in optimizing performance, storage efficiency, and system reliability. However, it's not without its challenges.  Disk management in linux is mildly complex, requires a good understanding of tools and commands.  Sometimes it could became dangerous, as a single mistake could cause data loss or system instability. 

Notes are organized in concepts, command overview and lab steps.

## Table Of Contents

* Concepts
  * Block Devices
  * Mounting
  * Why we need partitions?
  * What are MBR And GPT?
  * What is LVM?
  * Boot Process And Grub
  * Boot Directory Of Linux
  * Boot Errors
  * Finding Large Files
  * Creating Physical Storage Partitions
  * Defining Partitions As Swap
  * Using A File As A Device
  * Configuring File As A Swap
* Command Overview
  * Devices Partitions
  * Define Partitions As A Swap
  * Use File As A Swap
* Steps (38 steps)


## Concepts

### Block Devices

* We can use the command `lsblk` to list block devices. We can also use fdisk -l for same purpose.

```
$ lsblk
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

* Are items on the list are block devices. Block devices are accessible under /dev/ directory such as /dev/sdb1 we will mount them to a mount point.
* `Block Devices` : Block devices are places where linux store data and retrieve data from.
* Not all `lsblk` output are partitions. Only the ones type column is `part` for partitions.
* `sda, sdb` : These are sda is virtual disk. Contains two partitions sda1 and sda2. Virtual machine block devices typically begin with letter v.
* `Naming s` : s means serial. Its similar an physical SSD disk connected to sata port (serial ata). If we use NVME devices start using nvme.
* `Naming sda1` : If we have 3 disks we have names like SDA, SDB, SDC. Partitions will be named as sda1,sda2,sdb1,sdb2. sda first disk sda1 first partition.
* `sda1, sda2, sdb1` : These are martitions managed bay partition table on the disk. Partitions can be mounted on folder on a filesytem similar to disks.
* In a operating system, disks like `/dev/vdb` refers to a virtual block device, typically used in virtualized environments such as KVM, Xen, or OpenStack. These devices are often provided by the hypervisor (the software layer that manages the virtual machines) and are usually connected to a virtual machine (VM) as additional storage.

### Mounting

* Mounting is the process of making a filesystem accessible at a specific directory (called a mount point) in the Linux directory tree.
* Run lsblk or fdisk -l to confirm that /dev/sda1 is available.
* Linux attaches storage devices (like hard drives, USBs, or network shares) to the system so users can access their data.
* Mount Point could be any directory where the filesystem will be accessible (e.g., /mnt, /home, /media/usb).

```
mkdir /mnt/mydisk
mount /dev/sda1  /mnt/mydisk
```

* Unlike some operating systems that automatically assign drive letters to new devices, Linux integrates everything into a single directory tree. 
* This approach requires devices to be manually or automatically mounted before their contents can be accessed.
* Fstab file automatically mount filesystems at boot, add entries in /etc/fstab.

```
/dev/sdX1  /mnt/mydisk  ext4  defaults  0  0
```

### Why we need partitions?

* For example 2TB SSD can divided two different partitions.
* With this configuration both Windows Linux operating systems can use their NTFS and ext4 file system by logical seperation provided by the partitions. 
* Partition informations is the first data written on the disk. (Written in MBR or GPT standarts.)
* This data is crucial because it defines the layout and structure of the storage space of the disk.

###  What are MBR And GPT?

* MBR (Master Boot Record) and GPT (GUID Partition Table) partition standarts for partitioning. 
* MBR is the legacy option supports up to 4 primary partitions. 
* Can use extended partitions to create more than 4 partitions. Limited to disks up to 2TB.
* GPT (GUID Partition Table) supports a large number of partitions (typically up to 128). 
* Allows disks larger than 2TB. Includes redundancy with a backup table at the end of the disk.

###  What is LVM?

LVM is a another layer of abstraction over traditional partitioning, allowing flexible management of disk space. It has components such as PVs, VGs and LVs.

###  Boot Process And Grub

During boot, a system typically uses firmware such as UEFI (or BIOS in older devices). This firmware provides a visual interface for managing boot processes and configuring system settings. It is embedded in the motherboard chip and generally remains unaltered except during updates.

The firmware establishes the initial connection to the disk based on its configuration. Beyond this, the boot process depends on the disk's bootloader configuration. For instance, if a system is running Windows on a single disk, the firmware connects directly to Windows' bootloader. However, in a dual-boot setup with both Windows and Linux installed, GRUB (GNU GRand Unified Bootloader) often serves as the intermediary. GRUB provides a menu to select between operating systems during boot.

GRUB is an open-source tool designed for managing multi-boot environments. On an installed system, GRUB loads its configuration from the /boot/grub/grub.cfg file during each boot.

We can check that by sudo `fdisk -l`:

Omitted output:

```
Device         Start       End   Sectors   Size Type
/dev/sdb1       2048    206847    204800   100M EFI System
/dev/sdb2     206848    239615     32768    16M Microsoft reserved
/dev/sdb3     239616 309118975 308879360 147.3G Microsoft basic data
/dev/sdb4  498432000 500115455   1683456   822M Windows recovery environment
/dev/sdb5  309118976 498431999 189313024  90.3G Linux filesystem
```

Disk /dev/sdb:

  This disk uses a GPT partition table and contains the following relevant partitions:
* /dev/sdb1: EFI System Partition (ESP) (100 MiB): Contains the bootloader for systems using UEFI.
* /dev/sdb2: Microsoft Reserved Partition (16 MiB): Used internally by Windows.
* /dev/sdb3: Microsoft Basic Data Partition (147.3 GiB): This is the primary partition containing our Windows operating system.
* /dev/sdb4: Windows Recovery Environment (822 MiB): Used for recovery purposes.
* /dev/sdb5: Linux Filesystem Partition (90.3 GiB): Likely contains our Linux installation.

#### Where is Windows in our dual boot?

* The Windows operating system is installed on /dev/sdb3 (Microsoft Basic Data partition). 
* The bootloader for Windows resides in /dev/sdb1 (EFI System Partition).
* The Windows Recovery tools are located in /dev/sdb4.

* The firmware uses the EFI System Partition (/dev/sdb1) to locate the bootloader.
* GRUB is managing the dual-boot setup and pointing to the appropriate operating system:
* For Windows, it loads the bootloader from /dev/sdb1 which eventually points to /dev/sdb3.
* For Linux, it directly boots from /dev/sdb5.

```
$ mount | grep sdb | column -t
/dev/sdb5  on  /              type  ext4   (rw,relatime)
/dev/sdb1  on  /boot/efi      type  vfat   (rw,relatime,fmask=0022,dmask=0022,codepage=437,iocharset=iso8859-1,shortname=mixed,errors=remount-ro)
/dev/sdb3  on  /media/acs/OS  type  ntfs3  (rw,nosuid,nodev,relatime,uid=1000,gid=1000,iocharset=utf8,uhelper=udisks2)
```

### Boot Directory Of Linux

* The /boot directory typically contains GRUB configuration files (e.g., /boot/grub/grub.cfg). Kernel files (e.g., vmlinuz and initrd.img). Other boot-related files, such as device maps.

* In our disk setup The /boot directory resides on the Linux partition, which is /dev/sdb5. 
* It is part of the Linux filesystem, so all /boot contents are stored there unless a separate /boot partition is explicitly created during installation. 
* Since no dedicated /boot partition is listed in your partition table, it's integrated into /dev/sdb5.

* How /boot Interacts with GRUB and Dual-Boot?

* GRUB Location: GRUB is likely installed in the EFI System Partition (/dev/sdb1), as you are using a UEFI system. 
* GRUB's configuration file (grub.cfg) is located in the /boot/grub directory of your Ubuntu system on /dev/sdb5.

* Bootloader Workflow: When we power on the system, the firmware loads the GRUB bootloader from the EFI partition (/dev/sdb1).
* GRUB then uses its configuration file (/boot/grub/grub.cfg) to determine the boot options.
* It points to either the kernel files in /boot (for Ubuntu) or the Windows bootloader in /dev/sdb1 (for Windows).
  
### Boot Errors

When virtual machine boots into emergency mode, it usually indicates a critical issue, such as a corrupted filesystem, missing boot files, or incorrect configuration.
Emergency mode typically happens due to:

* Corrupted or unmounted filesystems.
* Incorrect entries in /etc/fstab.
* Missing kernel modules or bootloader configuration issues

```
journalctl -xb
```

* Check and repair filesystems.
* Identify the root cause: Run:

```
blkid
lsblk
```

* This shows the partitions and their UUIDs.
* Match UUIDs with /etc/fstab: Open /etc/fstab:

```
nano /etc/fstab
```

* Ensure all UUIDs and mount points in /etc/fstab are correct.
* Repair Filesystems: If a filesystem is corrupted, repair it with fsck:

```
fsck /dev/sdX
```

* Replace /dev/sdX with the correct partition, e.g., /dev/sda1.
* If prompted, select y to fix errors.

* Recreate Initramfs
* If the issue relates to boot files or kernel modules:
* Remount the root filesystem as read-write:

```
mount -o remount,rw /
```

* Rebuild the initramfs:

```
dracut --force
```

* Reboot:

```
reboot
```

* Check SELinux Contexts
* If SELinux is misconfigured, you may encounter issues.
* Relabel files:

```
touch /.autorelabel
reboot
```

### Finding Large Files

* When it comes to disks one of the main concern is disk space. This makes these tasks necessarry.
* Finding the reason why the disk is full. (This could be unwanted log files such as journals etc.)
* Limiting disk usage for this scenarios so low priority operations doesnt fill the disk space unecessarly.
* When we opened a full disk we can check the disk usage with df.

```
$ sudo df -h
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
du -h --max-depth=1 / 2>/dev/null | sort -hr
4.9G    /
4.0G    /usr
481M    /var
362M    /boot
29M     /etc
14M     /opt
7.7M    /home
5.4M    /run
4.0K    /tmp
4.0K    /root
0       /sys
...
```

Then we can get the individual directory.

```
cd /var
du -h --max-depth=1 | sort -hr
481M    .
275M    ./cache
197M    ./lib
10M     ./log
12K     ./spool
4.0K    ./tmp
0       ./yp
...
```

We can also use find to locate files larger than a specific size:

```
find / -type f -size +100M 2>/dev/null
```

Log files:

```
du -h /var/log | sort -hr
```

### Creating Physical Storage Partitions 

* fdisk : Fdisk is a preinstalled partition utility shows the partitions on disk block device.
* sectors : Just like a meter devided in milimeters storage devices devided into sectors. We can see the sector size.
* start sector : Also start sector 2048. 2048 x 512 exact 1 MB. So it places 1 MB not partitioned space as standart procedure. Reason is bootloader
* `cfdisk` : Another utility with easier usage. (whatis cfdisk shows definition as; display or manipulate a disk partition table)
* `sudo cfdisk /dev/sdb` : We see select label type. Disk is just 0 and 1s. Operating system needs to know where partition begins and ends. This is the job of partition table. We pick `gpt`. dos is actually MBR master boot record here is older format for partition tables used for decades. New format is GPT guid partition tables. gpt is less likely to get corrupted and many more primary partitions and much larger partition sizes. Only very old hardware uses MBR. We continue with gpt.
* `Free space > New` : 2 partitions on 10 GB drive. 8 GB for operating system and 2 GB for swap. Write 8G enter. Down and add 2G. sdb1 and sdb2. We can resize. Sort when order is mixed up with deleting. 
* `Type Partition Button` : Select swap. By default partitions created by cfdisk have linux filesystem type is good for storing generic data operating systems programs personal files etc. We rarely need to change partition type and one situation is the swap. Other case is boot partition. We select EFI. 
* `Alter the partition Table` : Its just a plan in that stage.  It will activate when we press write button. Write yes. It will gives message the partition table has been altered.
* `lsblk` : Now we can quit and check with lsblk
* We can also define a filesystem and mount it to a mount point to start using.
* mkfs.xfs /dev/sdb1
* mkfs.ext4 /dev/sdb2
* (File system details later.)
* Also update /etc/fstab to persist.

### Defining Partitions As Swap

* `Swap` : If we got. 4 GB RAm, 2 GB video editor, 2GB audio editor. Chrome. Moves to swap partition now memory is stored in the disk.
* `sudo swapon --show` : To see swap space we can use swapon with show parameter. One partition as used as swap */dev/dm-1* partition 2G. 0 bytes used. We can add more partitions if we want.
* `lsblk` : lsblk is used for identifying the Partition. lsblk list all available block devices and their partitions. The output should show the vdb3 partition, which will be used as swap space.
* `sudo mkswap /dev/vdb3`: Creating a Swap Space by formatting the vdb3 partition and marking it as swap space. This is an essential step as it prepares the partition to be used as swap by the system.
* `swapon --show --verbose /dev/vdb3` : Enabling the Swap Space. Enables the swap space on vdb3 and shows detailed information about the swap space being activated due to the --verbose option.
* `swapon --show` : Verifying Swap Space. This command checks the currently active swap spaces. It will list all the active swap spaces, including the newly added vdb3 partition.But it doesnt enabled by boot.
* `/etc/fstab` : Persistence Across Reboots. The swap is not enabled on boot by default. To make it persistent across reboots, you would need to add an entry to /etc/fstab like so entry such as. */dev/vdb3    none    swap    sw    0   0*. This ensures that the swap space on vdb3 is automatically enabled every time the system boots.
* `sudo swapoff /dev/vdb3` : Disabling the Swap Space. This command disables the swap space on vdb3, effectively stopping the system from using it as swap.
* `free -h or swapon --show` : We can monitor swap usage using free -h or swapon --show to check how much swap space is being used at any given time.

#### Using A File As A Device

* `Why we are using a file?` : If a partition is mounted it can Boot from a live USB to resize the partition. Resizing a root partition without booting from a live USB is more complex and carries risks, but it can be done using tools such as resize2fs by interrupting the boot sequence. It can be done under ssh since it requires console access. 
* `sudo dd if=/dev/zero of=/swap bs=1M count=128` : We can create a file and filled with zeros. */dev/zero* parameter use it as input file. This is a special device file creates generates infinate  number of zeros when an application reads from it. It will copy input file to output file. bs iz block size. count is 1B block 128 times. So 128 mb. Very small for actual usage.  
  * `dd Command`: This command is used to convert and copy files. 
  * `if=/dev/zero`: Specifies the input file as */dev/zero*, a special file that produces a continuous stream of null bytes (zeros). This is useful for creating a file filled with zeros. 
  * `of=/swap`: Specifies the output file as /swap. This is the file that will be created and filled with zeros, and later used as swap space.
bs=1M: Sets the block size to 1 megabyte. count=128: Specifies that 128 blocks of 1 megabyte each should be written, resulting in a 128 MB file. (Note: 128 MB is small for actual usage; typically, swap files are larger, depending on system requirements.)
* `sudo dd if=/dev/zero of=/swap bs=1M count=128 status=progress` :  Additional parameter *status=progress* displays the progress of the dd command while it's running. This is particularly useful for larger files, as creating them can take time, and this option provides feedback during the process. 
* `sudo chmod 600 /swap` : Only root user reads and writes. Regular users shouldn access this swap file it gives access to memory contents of programs. Other users might be using. This command changes the file permissions so that only the root user has read and write access to the swap file. This is crucial because swap files can contain sensitive information (like memory contents of programs), and you don't want regular users to have access to this data.

### Configuring File As A Swap

* `sudo mkswap /swap` : Same with partition but Instead of partition we can use it as a regular file like this. Marking the File as Swap: This command sets up the file */swap* as swap space, making it ready for use by the system. Unlike creating a swap partition, this command is used to create swap space from a regular file.
* `sudo swapon --verbose /swap` : We enable it similar to a partition. Enabling the Swap File: This command enables the newly created swap file, allowing the system to start using it as additional virtual memory. The *--verbose option* provides detailed information about the swap space being activated.
* `swapon --show`  : Now we can see its used for swap. Verifying the Swap Space: This command lists all active swap spaces on the system, including the newly added swap file. It allows you to verify that the swap file is being used.
* `Entry on /etc/fstab` Persistence Across Reboots: To ensure that the swap file is enabled every time the system boots, you need to add it to the /etc/fstab file: */swap    none    swap    sw    0   0* This entry makes the swap file persistent, ensuring that it is automatically used as swap space after every reboot.

## Command Overview

### Devices Partitions
* lsblk
* fdisk -l
* mount /dev/sda1  /mnt/mydisk
* df -h
* du -h --max-depth=1 / 2>/dev/null | sort -hr
* find / -type f -size +100M 2>/dev/null
* df -T
* fdisk /dev/sdb
* cfdisk /dev/sdb
* mkfs.xfs /dev/sdb1
* mkfs.ext4 /dev/sdb2
* (Details of filesystems later)

### Define Partitions As A Swap

* `swapon --show`
* `mkswap /dev/vdb3`
* `swapon --show --verbose /dev/vdb3`
* `swapon --show` 
* `swapoff /dev/vdb3` 
* `Entry on /etc/fstab` : "/dev/vdb3    none    swap    sw    0   0".
 
### Use File As A Swap

* `dd if=/dev/zero of=/swap bs=1M count=128 status=progress`
* `chmod 600 /swap` 
* `mkswap /swap` 
* `swapon --show`
* `Entry on /etc/fstab` : Persist at boot. "/swap    none    swap    sw    0   0" sudo.

## Steps

#### 1. Add a new disk to virtual machine. (2GB) 

<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/blog15_1.png" class="img-fluid" alt="">

* We are using rhel9-4 on Oracle VM VirtualBox.
* Settings for the disk could be Controller Sata VdI.
  
#### 2. Take snapshot.

<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/blog15_2.png" class="img-fluid" alt="">

* Its important the take snapshot since its easy to broke partitions.
* Also consider taking backup of a vdi file which serves as a disk.
  
#### 3. Display the amount of disk space used and available on filesystem.

```
$ sudo df -h
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
du -sh /bin/
208M    /bin/

du -h --max-depth=1 /bin/ 2>/dev/null | sort -hr

```

#### 5. Display size of files in a directory. (/var/log and /)

* The sort -nr option sorts numerically and in reverse order, so the largest sizes appear at the top.

```
du -kh /var/log | sort -nr | more
232K    /var/log/rhsm
28K     /var/log/tuned
12M     /var/log
12K     /var/log/cups
...

find /var/log -type f -size +100M 2>/dev/null
```

* `du -kh / 2>/dev/null | sort -nr | more` will search all the file system for biggest files.
* Errors are send to /dev/null.

```
du -kh / 2>/dev/null | sort -nr | more
1012K   /usr/share/microcode_ctl/ucode_with_caveats/intel-06-8e-9e-0x-0xca
1012K   /usr/lib/modules/5.14.0-427.31.1.el9_4.x86_64/kernel/drivers/net/wireless/realtek/rtlwifi
1008K   /usr/lib/modules/5.14.0-427.13.1.el9_4.x86_64/kernel/drivers/net/wireless/realtek/rtlwifi
1000K   /usr/lib64/spa-0.2/bluez5
1000K   /usr/lib64/python3.9/multiprocessing
996K    /usr/share/microcode_ctl/ucode_with_caveats/intel-06-8e-9e-0x-0xca/intel-ucode
996K    /usr/lib/python3.9/site-packages/orca/scripts/apps
...
 ```

#### 6. Show all mounted filesystems and their mount points.

* `df -h` will show filesystems mount points.

```
$ df -h
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
$ mount | column -t
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

#### 7. Show filesystems.

* `df -T` will show filesystems.
  
```
$ df -T
Filesystem            Type     1K-blocks    Used Available Use% Mounted on
devtmpfs              devtmpfs      4096       0      4096   0% /dev
tmpfs                 tmpfs      1873768       0   1873768   0% /dev/shm
tmpfs                 tmpfs       749508    9068    740440   2% /run
/dev/mapper/rhel-root xfs       17756160 4929928  12826232  28% /
/dev/sda1             xfs         983040  421020    562020  43% /boot
tmpfs                 tmpfs         1024       0      1024   0% /run/stratisd/ns_mounts
tmpfs                 tmpfs       374752      40    374712   1% /run/user/1000
 ```

#### 8. List block devices

* `lsblk` lists block devices.
  
```
$ lsblk
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

#### 9. List block files representing devices.

* We can list `/dev/` directory for files of block devices.

```
$ sudo ls -ltr /dev/ | grep sda
brw-rw----. 1 root disk      8,   0 Nov  7 23:28 sda
brw-rw----. 1 root disk      8,   1 Nov  7 23:28 sda1
brw-rw----. 1 root disk      8,   2 Nov  7 23:28 sda2
```

* These files do not contain stored content in the traditional sense. Instead, their content is the interface they provide to the underlying hardware or kernel feature.
* b means they are block devices. There are also pipes sockets and speacial interfaces like `/dev/null` `/dev/zero` and `/dev/random`.

```
$ sudo hexdump /dev/sda | head -n 10
0000000 63eb 1090 d08e 00bc b8b0 0000 d88e c08e
0000010 befb 7c00 00bf b906 0200 a4f3 21ea 0006
0000020 be00 07be 0438 0b75 c683 8110 fefe 7507
0000030 ebf3 b416 b002 bb01 7c00 80b2 748a 8b01
0000040 024c 13cd 00ea 007c eb00 00fe 0000 0000
0000050 0000 0000 0000 0000 0000 8000 0001 0000
0000060 0000 0000 faff 9090 c2f6 7480 f605 70c2
0000070 0274 80b2 79ea 007c 3100 8ec0 8ed8 bcd0
0000080 2000 a0fb 7c64 ff3c 0274 c288 be52 7d80
0000090 17e8 be01 7c05 41b4 aabb cd55 5a13 7252
```

* This is the raw disk data. `63eb, 1090, d08e` are bootloader instructions.
* `7c00`: The memory address where the BIOS loads the bootloader.
* This is typical in MBR-based boot systems.
* `13cd`: A BIOS interrupt call to perform disk operations.
* `0000 0000`: Unused or reserved space in the MBR. Etc.


#### 10. List partition details.

* `sudo fdisk -l | more`

```
$ sudo fdisk -l | more
Disk /dev/sda: 20 GiB, 21474836480 bytes, 41943040 sectors
Disk model: VBOX HARDDISK   
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0xd69fb96d

Device     Boot   Start      End  Sectors Size Id Type
/dev/sda1  *       2048  2099199  2097152   1G 83 Linux
/dev/sda2       2099200 41943039 39843840  19G 8e Linux LVM

Disk /dev/sdb: 2 GiB, 2147483648 bytes, 4194304 sectors
Disk model: VBOX HARDDISK   
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: E5AC1884-65BC-9149-9D23-BE472C69F870

Device     Start     End Sectors Size Type
/dev/sdb1   2048 2099199 2097152   1G Linux filesystem

Disk /dev/mapper/rhel-root: 17 GiB, 18249416704 bytes, 35643392 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes

Disk /dev/mapper/rhel-swap: 2 GiB, 2147483648 bytes, 4194304 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
```

* `fdisk` : Fdisk is a preinstalled partition utility shows the partitions on disk block device. 
* `sectors` : Just like a meter devided in milimeters storage devices devided into sectors. We can see the sector size. 
* `start sector` : Also start sector 2048. 2048 x 512 exact 1 MB. So it places 1 MB not partitioned space as standart procedure. Reason is bootloader might needs to be installed in that area.
  
#### 11. Format disk without ui by manipulating disk partition table.

* `sudo fdisk /dev/sdb` (Note that disk is 2G total. )

```
- Press d to delete existing partitions (if any).
- Press n to create a new partition.
	  - Choose default options for the new partition.
      - Partition number (1-128, default 1):  (Press enter.)
      - First sector (2048-4194270, default 2048): (Press enter.)
      - Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-4194270, default 4194270):
              - (Default will be single partition of 2G. Write +1G will be 1G first partition. Add rest as second partition. )
              - Note that second became 1023MB not 1G.
- Press w to write changes and exit.
```

* Verify with `sudo fdisk -l` or `lsblk`.

```
sdb             8:16   0    2G  0 disk
├─sdb1          8:17   0    1G  0 part
└─sdb2          8:18   0 1023M  0 part
```

#### 12. Create xfs filesystem on sdb1 partition.

```
$ sudo mkfs.xfs /dev/sdb1
meta-data=/dev/sdb1              isize=512    agcount=4, agsize=65536 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=1        finobt=1, sparse=1, rmapbt=0
         =                       reflink=1    bigtime=1 inobtcount=1 nrext64=0
data     =                       bsize=4096   blocks=262144, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0, ftype=1
log      =internal log           bsize=4096   blocks=16384, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0
```

#### 13. Create mount directory and mount filesystem.

* Create a directory named data under root directory.

```
$ sudo mkdir /data/
```

* Mount the file system to a directory.


```
$ sudo mount /dev/sdb1 /data2
```

#### 14. Check mounted filesystems to verify mount.

```
$ df -h
Filesystem             Size  Used Avail Use% Mounted on
devtmpfs               4.0M     0  4.0M   0% /dev
tmpfs                  1.8G     0  1.8G   0% /dev/shm
tmpfs                  732M  8.9M  724M   2% /run
/dev/mapper/rhel-root   17G  4.8G   13G  28% /
/dev/sda1              960M  412M  549M  43% /boot
tmpfs                  1.0M     0  1.0M   0% /run/stratisd/ns_mounts
tmpfs                  366M   40K  366M   1% /run/user/1000
/dev/sdb1              960M   39M  922M   5% /data
```

#### 15. Make mount persistent at boot.

* Edit `/etc/fstab`file with vim.

* `sudo vim /etc/fstab`
  
```
- Press o to add line.
  - Add the line.
  - <mount-dev-file>   <mount-point>    <file-system-type> defaults 0 0
  - Add the line below.
  - /dev/sdb1   /data       xfs defaults 0 0
    - Two tabs and rest is space.
- Press :wq! write and quit.
```

* Details can be checked using `man fstab`.
* Man page gives sample entry `LABEL=t-home2   /home      ext4    defaults,auto_da_alloc      0  2`.
* `0` : This field is used by dump(8) to determine which filesystems need to be dumped.
* `2` : This field is used by fsck(8) to determine the order in which filesystem checks are done at boot time.

#### 16. Reboot gracefully and check mounting.

```
sudo systemctl reboot
```

* Wait system to reboot.
* `df -h` will show if mounting is made.

```
$ df -h
Filesystem             Size  Used Avail Use% Mounted on
devtmpfs               4.0M     0  4.0M   0% /dev
tmpfs                  1.8G     0  1.8G   0% /dev/shm
tmpfs                  732M  8.9M  724M   2% /run
/dev/mapper/rhel-root   17G  4.8G   13G  28% /
/dev/sda1              960M  412M  549M  43% /boot
/dev/sdb1              960M   39M  922M   5% /data
tmpfs                  1.0M     0  1.0M   0% /run/stratisd/ns_mounts
tmpfs                  366M   40K  366M   1% /run/user/1000
```

#### 17. Unmount /dev/sdb1

* Unmount by using mount point.
 
```
sudo umount /data
```

* Verify.
 
```
$ df -h
Filesystem             Size  Used Avail Use% Mounted on
devtmpfs               4.0M     0  4.0M   0% /dev
tmpfs                  1.8G     0  1.8G   0% /dev/shm
tmpfs                  732M  8.9M  724M   2% /run
/dev/mapper/rhel-root   17G  4.8G   13G  28% /
/dev/sda1              960M  412M  549M  43% /boot
tmpfs                  1.0M     0  1.0M   0% /run/stratisd/ns_mounts
tmpfs                  366M   40K  366M   1% /run/user/1000
```

#### 18. Mount all using fstab File.

* Mount all by using fstab file.

```
$ sudo mount -a
```

* Verify.
  
```
$ df -h
Filesystem             Size  Used Avail Use% Mounted on
devtmpfs               4.0M     0  4.0M   0% /dev
tmpfs                  1.8G     0  1.8G   0% /dev/shm
tmpfs                  732M  8.9M  724M   2% /run
/dev/mapper/rhel-root   17G  4.8G   13G  28% /
/dev/sda1              960M  412M  549M  43% /boot
tmpfs                  1.0M     0  1.0M   0% /run/stratisd/ns_mounts
tmpfs                  366M   40K  366M   1% /run/user/1000
/dev/sdb1              960M   39M  922M   5% /data
```

#### 19. Format disk with ui by manipulating disk partition table.

```
sudo cfdisk /dev/sdb
```

```
1 GB Disk
1023 MB Swap
```

* We see select label type. 

* Disk is just 0 and 1s. Operating system needs to know where partition begins and ends. 
This is the job of partition table. 

* We pick `gpt`. dos is actually MBR master boot record here is older format for partition tables used for decades. 

* New format is GPT guid partition tables. 

* gpt is less likely to get corrupted and many more primary partitions and much larger partition sizes. 

Only very old hardware uses MBR. We continue with gpt.

* `Free space > New` : 2 partitions on 10 GB drive. 8 GB for operating system and 2 GB for swap. 
Write 8G enter. Down and add 2G. sdb1 and sdb2. 
We can resize. Sort when order is mixed up with deleting. 

* `Type Partition Button` : Select swap. By default partitions created by cfdisk have linux filesystem type is good for storing generic data 
operating systems programs personal files etc. 
We rarely need to change partition type and one situation is the swap. 
Other case is boot partition. 
We select EFI. 

* `Alter the partition Table` : Its just a plan in that stage.  

It will activate when we press write button. Write yes. 
It will gives message the partition table has been altered.

* `lsblk` : Now we can quit and check with lsblk.

* gdisk is similar but uses legacy MBR instead of GPT.

```
$ lsblk
NAME          MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
sda             8:0    0    2G  0 disk 
├─sda1          8:1    0    1G  0 part 
└─sda2          8:2    0 1023M  0 part 
sdb             8:16   0   20G  0 disk 
├─sdb1          8:17   0    1G  0 part /data2
│                                      /boot
└─sdb2          8:18   0   19G  0 part 
  ├─rhel-root 253:0    0   17G  0 lvm  /
  └─rhel-swap 253:1    0    2G  0 lvm  [SWAP]
sr0            11:0    1 1024M  0 rom  
```


#### 20. Show swap space on the computer

```
sudo swapon --show

NAME      TYPE      SIZE USED PRIO
/dev/dm-1 partition   2G   0B   -2
```

#### 21. format partition and mark it as swap space

```
sudo mkswap /dev/sda1

mkswap: /dev/sda1: warning: wiping old xfs signature.
Setting up swapspace version 1, size = 1024 MiB (1073737728 bytes)
no label, UUID=28d4d10e-ceda-4606-accf-ab686afa2dbf
```

#### 22. Enable the swap space.

```
sudo swapon /dev/sdb1

```

#### 23. Verify the swap space.

```

swapon --show

NAME      TYPE      SIZE USED PRIO
/dev/dm-1 partition   2G   0B   -2
/dev/sdb1 partition   2G   0B   -3

free -h
               total        used        free      shared  buff/cache   available
Mem:           3.6Gi       473Mi       2.8Gi       8.0Mi       526Mi       3.1Gi
Swap:          4.0Gi          0B       4.0Gi


```

#### 24. Persistence Across Reboots. Edit file.

```
sudo vi /etc/fstab
/dev/sdb1 none swap sw 0 0
```

Verify.

```
sudo reboot
swapon --show
free -h


lsblk -f
blkid
```


#### 25. Disabling the Swap Space.	

```
sudo swapoff /dev/sdb1
```

#### 26. Monitor swap space.	

```
$ swapon --show
NAME      TYPE      SIZE USED PRIO
/dev/dm-1 partition   2G   0B   -2
$ free -h 
               total        used        free      shared  buff/cache   available
Mem:           3.6Gi       477Mi       2.8Gi       8.0Mi       526Mi       3.1Gi
Swap:          2.0Gi          0B       2.0Gi
```

#### 27. Create /swap file filled with zeros.	

```
$ sudo dd if=/dev/zero of=/swap bs=1M count=128
128+0 records in
128+0 records out
134217728 bytes (134 MB, 128 MiB) copied, 0.0531297 s, 2.5 GB/s

```

#### 28. Only root user reads and writes.	

```
sudo chmod 600 /swap
```

#### 29. Configure file as a swap.	

```
$ sudo mkswap /swap
Setting up swapspace version 1, size = 128 MiB (134213632 bytes)
no label, UUID=62d39b37-4d9e-46b7-94c9-afa667fde03b
```

#### 30. Enable the swap space.	

```
$ sudo swapon --verbose /swap
swapon: /swap: found signature [pagesize=4096, signature=swap]
swapon: /swap: pagesize=4096, swapsize=134217728, devsize=134217728
swapon /swap
```

#### 31. Verify the swap space.	

```
$ swapon --show
NAME      TYPE      SIZE USED PRIO
/dev/dm-1 partition   2G   0B   -2
/swap     file      128M   0B   -3
```


#### 32. Persistence Across Reboots. Edit file.	

```
sudo vi /etc/fstab
```

#### 33. Add line.	

* Key `o` will add line in vim.

```
/swap    none    swap    sw    0   0
```

#### 34. reboot	

```
sudo systemctl reboot
```

#### 35. check the partition table	 

```
$ swapon --show
NAME      TYPE      SIZE USED PRIO
/dev/dm-1 partition   2G   0B   -2
/swap     file      128M   0B   -3
```

* Revert changes by disabling the swap file.


#### 36. Disable swap space	

```
sudo swapoff /swap
```

#### 37. Remove the file used for swap.	

```
sudo rm /swap
```

#### 38. Remove fstab entry.	

* Key `dd` will remove line in vim.


```
sudo vi /etc/fstab
```

End.
