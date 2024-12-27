---
title: Disks And Partitions
layout: doc_page
---


### Block Device

* We can use the command `lsblk` to list block devices. 

```
[$ lsblk
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

####  Boot Process And Grub

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
        /dev/sdb1: EFI System Partition (ESP) (100 MiB): Contains the bootloader for systems using UEFI.
        /dev/sdb2: Microsoft Reserved Partition (16 MiB): Used internally by Windows.
        /dev/sdb3: Microsoft Basic Data Partition (147.3 GiB): This is the primary partition containing our Windows operating system.
        /dev/sdb4: Windows Recovery Environment (822 MiB): Used for recovery purposes.
        /dev/sdb5: Linux Filesystem Partition (90.3 GiB): Likely contains our Linux installation.


Where is Windows?

The Windows operating system is installed on /dev/sdb3 (Microsoft Basic Data partition).
The bootloader for Windows resides in /dev/sdb1 (EFI System Partition).
The Windows Recovery tools are located in /dev/sdb4.

The firmware uses the EFI System Partition (/dev/sdb1) to locate the bootloader.
GRUB is managing the dual-boot setup and pointing to the appropriate operating system:
For Windows, it loads the bootloader from /dev/sdb1 which eventually points to /dev/sdb3.
For Linux, it directly boots from /dev/sdb5.

```
$ mount | grep sdb | column -t
/dev/sdb5  on  /              type  ext4   (rw,relatime)
/dev/sdb1  on  /boot/efi      type  vfat   (rw,relatime,fmask=0022,dmask=0022,codepage=437,iocharset=iso8859-1,shortname=mixed,errors=remount-ro)
/dev/sdb3  on  /media/acs/OS  type  ntfs3  (rw,nosuid,nodev,relatime,uid=1000,gid=1000,iocharset=utf8,uhelper=udisks2)
```

#### Boot Directory Of Linux

The /boot directory typically contains GRUB configuration files (e.g., /boot/grub/grub.cfg). Kernel files (e.g., vmlinuz and initrd.img). Other boot-related files, such as device maps.

In our disk setup The /boot directory resides on the Linux partition, which is /dev/sdb5. 
It is part of the Linux filesystem, so all /boot contents are stored there unless a separate /boot partition is explicitly created during installation. 
Since no dedicated /boot partition is listed in your partition table, it's integrated into /dev/sdb5.

How /boot Interacts with GRUB and Dual-Boot?

GRUB Location: GRUB is likely installed in the EFI System Partition (/dev/sdb1), as you are using a UEFI system. 
GRUB's configuration file (grub.cfg) is located in the /boot/grub directory of your Ubuntu system on /dev/sdb5.

Bootloader Workflow: When we power on the system, the firmware loads the GRUB bootloader from the EFI partition (/dev/sdb1).
GRUB then uses its configuration file (/boot/grub/grub.cfg) to determine the boot options.
It points to either the kernel files in /boot (for Ubuntu) or the Windows bootloader in /dev/sdb1 (for Windows).


#### Defining Partitions As Swap

* `Swap` : If we got. 4 GB RAm, 2 GB video editor, 2GB audio editor. CHrome. Mover to swap partition now memory
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

#### Configuring File As A Swap

* `sudo mkswap /swap` : Same with partition but Instead of partition we can use it as a regular file like this. Marking the File as Swap: This command sets up the file */swap* as swap space, making it ready for use by the system. Unlike creating a swap partition, this command is used to create swap space from a regular file.
* `sudo swapon --verbose /swap` : We enable it similar to a partition. Enabling the Swap File: This command enables the newly created swap file, allowing the system to start using it as additional virtual memory. The *--verbose option* provides detailed information about the swap space being activated.
* `swapon --show`  : Now we can see its used for swap. Verifying the Swap Space: This command lists all active swap spaces on the system, including the newly added swap file. It allows you to verify that the swap file is being used.
* `Entry on /etc/fstab` Persistence Across Reboots: To ensure that the swap file is enabled every time the system boots, you need to add it to the /etc/fstab file: */swap    none    swap    sw    0   0* This entry makes the swap file persistent, ensuring that it is automatically used as swap space after every reboot.
