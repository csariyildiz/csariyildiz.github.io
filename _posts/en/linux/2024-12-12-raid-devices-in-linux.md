---
layout: post3
title: "RAID Devices In Linux"
category: main
cat: System
tags:
  - Linux
  - Disk
---

Configuring RAID (Redundant Array of Independent Disks) involves setting up multiple storage devices to work as a single logical unit to improve performance and redundancy. In Linux, RAID configurations are typically managed using mdadm, a tool that allows to create, manage, and monitor RAID arrays.

We will explore various aspects of RAID device management in Linux, including how to create RAID arrays, add spare disks, and manage existing configurations to suit system needs.

## Command Overview

```
vgremove --force my_volume
pvremove /dev/vdc /dev/vdd /dev/vde
mdadm --create /dev/md0 --level=0 --raid-devices=3  /dev/vdc /dev/vdd /dev/vde
mkfs.ext4 /dev/md0
mdadm --stop  /dev/md0
mdadm ---zero-superblock /dev/vdc /dev/vdd /dev/vde
mdadm --create /dev/md0 --level=1 --raid-devices=2  /dev/vdc /dev/vdd --spare-devices=1 /dev/vde
mdadm --stop  /dev/md0`
mdadm ---zero-superblock /dev/vdc /dev/vdd /dev/vde
mdadm --create /dev/md0 --level=1 --raid-devices=2  /dev/vdc /dev/vdd
mdadm --manage /dev/md0 -add /dev/vde
mdadm --manage /dev/md0 -remove /dev/vde
cat /proc/mdstat
```

## Concepts

### RAID In General

The names of RAID levels (e.g., RAID 0, RAID 1, RAID 5) are based on the numbering scheme introduced when the concept of RAID (Redundant Array of Independent/Inexpensive Disks) was first formalized in the late 1980s by David A. Patterson, Garth A. Gibson, and Randy H. Katz in their seminal paper "A Case for Redundant Arrays of Inexpensive Disks (RAID)".

The RAID levels were initially numbered to distinguish different types of configurations for combining multiple disks.
The numbers represent different methods of organizing data, parity, and redundancy.

* Numbers Aren’t Logical and not always intuitive. RAID 2, 3, and 4 are now mostly obsolete, so you rarely encounter them. The popularity of RAID 5, RAID 6, and hybrid RAID (e.g., RAID 10) means the numbering may seem inconsistent.

* There are different kinds of raid: Level-0 RAID, Level-1 RAID, Level-5 RAID, Level-6 RAID, Level-10 RAID.
    * RAID 0 (Striping): The "0" reflects the lack of redundancy. This level focuses on performance and capacity, with no fault tolerance. Data is split (striped) across all drives, maximizing speed and storage.
    * RAID 1 (Mirroring): The "1" reflects 1:1 redundancy, meaning each drive has a complete mirror copy of the data. Provides full redundancy with high fault tolerance (one drive can fail without data loss).
    * RAID 2 (Bit-Level Striping with ECC): This early design uses bit-level striping and requires dedicated disks for error correction codes (ECC). It is rarely used because modern hard drives have built-in ECC functionality.
    * RAID 3 (Byte-Level Striping with Dedicated Parity): The "3" reflects a setup where data is striped at the byte level, and parity information is stored on a single dedicated disk. Rarely used because RAID 5 (distributed parity) is more efficient.
    * RAID 4 (Block-Level Striping with Dedicated Parity): Similar to RAID 3 but stripes data at the block level, improving performance. Also rarely used because RAID 5 offers better performance by distributing parity.
    * RAID 5 (Block-Level Striping with Distributed Parity): The "5" reflects distributed parity, where parity is spread across all drives. This improves performance and fault tolerance, making it one of the most widely used RAID levels.
    * RAID 6 (RAID 5 with Dual Parity): The "6" indicates two levels of parity, allowing for the failure of two drives instead of one. Common in large storage arrays requiring high fault tolerance.
    * RAID 10 (1+0, Mirroring + Striping): Combines the benefits of RAID 1 (mirroring) and RAID 0 (striping). The name reflects its hybrid nature: "RAID 1 and 0 combined.

### RAID With Baremetal

We will focus on how to configure RAID in linux. However RAID can be configured on a bare metal servers at the hardware or firmware level before installing an operating system. In this approach the RAID configuration is abstracted from the OS and managed directly by the system firmware or a dedicated RAID controller. 

* Products mostly have their RAID tools included in the firmware.
    * Dell: Ctrl+R for PERC RAID.
    * HP: F8 for Smart Array.
    * IBM/Lenovo: Ctrl+C or Ctrl+M for MegaRAID.

### RAID Types In Conclusion

* In conclusion RAID allows to take multiple storage devices and combine them into single storage area. Generally used for redundancy. Data exist multiple devices.
* 1.5TB file. But we got two disks Disk A 1 TB and Disk B 1 TB. 1.5 TB doesnt fit but we can glue them together with raid.
* Such a setup is called array and these arrays can have many these. This is stripe array and Level-0 RAID.
* `Level-0 RAID` : Just merges disks. Usable space is total. But risky since lost.
* `Level-1 RAID` : Mirror data to all disks. We can loose 1 or 2. 
* `Level-5 RAID` : Min 3 disk. Can loose 1 disk. Still works. Parity on each disk. Extra information. If we have 3TB we have 1TB usable space. 0.33 TB on each. 10 disks each 1TB. We got 9TB usable space. (1TB par 1TB par 1TB) gives 1TB usable space.
* `Level-6 RAID` : Similar to RAID-5. Min 4 disks. Can loose 2 disk. Parity data to each disk.
* `Level-10 RAID 1+0` : Combination of 1 and 0. Mirrored and merged. (1TB mirror 1TB) +  (1TB mirror 1TB) gives 2TB usable space.

### Sample RAID Configuration

* To configure RAID in linux we need the mdadm package is installed.
* First we identify available disks. Using lsblk or fdisk -l we can identify the unused disks available for RAID.
* If the disks have existing partitions, we use the following command to wipe them.

```
sudo wipefs -a /dev/sdb
```

* Then we need to select our raid type lets say RAID 5.
    * `/dev/md0`: The name of the RAID device to create.
    * `--level=5`: Specifies RAID 5.
    * `--raid-devices=3`: Number of disks in the array.
    * `/dev/sd[b-d]`: List of disks to include in the array.


```
sudo mdadm --create --verbose /dev/md0 --level=5 --raid-devices=3 /dev/sd[b-d]
```

* Now we save the RAID Configuration to make the RAID configuration persistent across reboots.

```
sudo mdadm --detail --scan >> /etc/mdadm.conf
```

* Now we format and mount the RAID array.

```
sudo mkfs.ext4 /dev/md0
```

* Create a Mount Point

```
sudo mkdir /mnt/raid
```

* Mount the RAID Array:

```
sudo mount /dev/md0 /mnt/raid
```

* Add to /etc/fstab for persistent mounting
* Find the UUID of the RAID device

```
sudo blkid /dev/md0
```

*  Add the following entry to /etc/fstab

```
UUID=<RAID_UUID> /mnt/raid ext4 defaults 0 0
```

* Verify the RAID Status

```
cat /proc/mdstat
```

* View detailed information

```
sudo mdadm --detail /dev/md0
```

* If we want to stop and remove a RAID array.

```
sudo umount /dev/md0
sudo mdadm --stop /dev/md0
sudo mdadm --remove /dev/md0
```

#### Create A RAID Configuration

* First we will create three partitions on disk sdb. In a real environment we might want to use seperate disks.

```
lsblk
sudo wipefs -a /dev/sdb
fdisk /dev/sdb
# n p +1G
```

* We will try to RAID 5 on three disks. It provides fault tolerance (1 disk can fail). It offers good usable capacity (e.g., 2TB with 3 x 1TB disks).
It maintains decent performance, especially for read-heavy workloads.

```
lsblk
NAME          MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
sda             8:0    0   20G  0 disk
├─sda1          8:1    0    1G  0 part /boot
└─sda2          8:2    0   19G  0 part
  ├─rhel-root 253:0    0   17G  0 lvm  /
  └─rhel-swap 253:1    0    2G  0 lvm  [SWAP]
sdb             8:16   0   20G  0 disk
├─sdb1          8:17   0    1G  0 part
├─sdb2          8:18   0    1G  0 part
└─sdb3          8:19   0    1G  0 part
sr0            11:0    1 1024M  0 rom
```

* Create the RAID 5 array.

```
sudo mdadm --create /dev/md0 --level=5 --raid-devices=3 /dev/sdb1 /dev/sdb2 /dev/sdb3
mdadm: Defaulting to version 1.2 metadata
mdadm: array /dev/md0 started.
```

* Verify the RAID Array by Checking the RAID status.

```
cat /proc/mdstat
Personalities : [raid6] [raid5] [raid4] 
md0 : active raid5 sdb3[3] sdb2[1] sdb1[0]
      2093056 blocks super 1.2 level 5, 512k chunk, algorithm 2 [3/3] [UUU]

unused devices: <none>
```
Create a Filesystem: Format the RAID array with a filesystem, e.g., ext4:

```
sudo mkfs.ext4 /dev/md0
```

* Mount the RAID Device: Mount it to a directory, e.g., /mnt/raid:

```
mkdir /mnt/raid
mount /dev/md0 /mnt/raid
```


* Persist Configuration: Save the RAID configuration to /etc/mdadm.conf so it persists across reboots:

```
mdadm --detail --scan >> /etc/mdadm/mdadm.conf
update-initramfs -u
```

* We should add an entry to the /etc/fstab file to ensure that your RAID array is automatically mounted at boot.

```
blkid /dev/md0
    /dev/md0: UUID="abcd1234-5678-90ef-ghij-klmnopqrstuv" TYPE="ext4"
nano /etc/fstab
    UUID=abcd1234-5678-90ef-ghij-klmnopqrstuv /mnt/raid ext4 defaults 0 0
mount -a
```

* We can test the RAID by simulating a disk failure and checking recovery procedures to ensure redundancy works as expected.

* The mdadm --detail --scan >> /etc/mdadm/mdadm.conf command saves the RAID configuration to the mdadm.conf file.
This ensures that the RAID array configuration is persistent across reboots. It allows the system to recognize and assemble the RAID array at boot time.
However, this does not automatically mount the RAID device. It only ensures that the RAID device (e.g., /dev/md0) is available after boot.

* The /etc/fstab file is responsible for defining what filesystems (including RAID arrays) should be automatically mounted and where they should be mounted when the system boots. Without an /etc/fstab entry, even though the RAID device is assembled and available (thanks to mdadm.conf), you would still need to manually mount it after every reboot.

### Removing The RAID Configuration

* To Remove RAID Configuration we need:
    * Unmount RAID: umount /dev/md0
    * Stop RAID: mdadm --stop /dev/md0
    * Clear Superblocks: mdadm --zero-superblock /dev/sdb1 /dev/sdb2 /dev/sdb3
    * Update Configuration: Edit /etc/mdadm/mdadm.conf and run update-initramfs -u
    * Delete Partitions (if needed): Use fdisk /dev/sdb

* If the RAID device is mounted, unmount it first:

```
umount /dev/md0
lsblk
```

* Stop the RAID Array

```
mdadm --stop /dev/md0
cat /proc/mdstat
```

* Remove the RAID Superblocks
* The superblock is metadata stored on the member disks, which defines their participation in a RAID array. 
* Clear the superblock from each disk or partition:

```
mdadm --zero-superblock /dev/sdb1
mdadm --zero-superblock /dev/sdb2
mdadm --zero-superblock /dev/sdb3
```

* Remove the RAID Configuration from /etc/mdadm.conf

```
nano /etc/mdadm/mdadm.conf
    ARRAY /dev/md0 level=5 num-devices=3 UUID=abcd1234:5678:90ef:ghij:klmnopqrstuv

```

* Update initramfs.

```
update-initramfs -u
```

* What is initramfs?
    * The command update-initramfs -u is used to update the initial RAM filesystem (initramfs) in Linux systems. ( Specifically those using initramfs as the initial root filesystem.)
    * initramfs is a compressed cpio archive that contains the necessary files, drivers, and kernel modules required to mount the real root filesystem during the boot process. It’s loaded into memory early in the boot sequence, before the real root filesystem is mounted.
    * The update-initramfs -u command updates the existing initramfs for the currently running kernel.  
    *   It regenerates the initramfs image for the active kernel, reflecting any changes made to the system that might affect the boot process. These changes could include new hardware, kernel modules, or RAID configurations (such as adding or removing disks).
    * After adding a new kernel module (e.g., for a RAID array or new hardware), running this command ensures that the necessary module is included in the initramfs, allowing the system to load it early in the boot process.
    * When making changes to RAID configurations or disk setups that require kernel module adjustments, regenerating the initramfs ensures that these configurations are available during boot.


* Remove fstab entry.

```
nano /etc/fstab
    UUID=abcd1234-5678-90ef-ghij-klmnopqrstuv /mnt/raid ext4 defaults 0 0
```

* Delete Partitions.

```
fdisk /dev/sdb
 d
 w
```

* Verify the RAID Removal.

```
cat /proc/mdstat
lsblk
```

### Adding A Spare Disk To A RAID Array

* If a disk malfunctions, the array becomes risky. Adding a spare disk ensures the array has a backup ready to replace a failed disk automatically.
* Example command to create a RAID 1 array with one spare disk:

```
mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdc /dev/sdd --spare-devices=1 /dev/sde
```

* This creates a RAID 1 (mirrored) array with two active devices (/dev/sdc and /dev/sdd) and one spare disk (/dev/sde).
* If one of the active disks fails, the spare will automatically replace it.

### Adding New Disk To A RAID Array

* Stop the RAID Array.

```
mdadm --stop  /dev/md0
```

* Remove the Superblock (if needed): Clear the RAID superblock metadata from the devices you want to repurpose:

```
mdadm --zero-superblock /dev/sdc /dev/sdd /dev/sde
```

* Recreate a RAID 1 Array: Create a RAID 1 (mirrored) array using two devices:

mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdc /dev/sdd


* Add Another Disk to the Array: Use the --add option to include a new disk in the array (e.g., as a spare):

```
mdadm --manage /dev/md0 --add /dev/sde
```

* Remove a Disk from the Array: Remove a specific disk from the RAID array:

```
mdadm --manage /dev/md0 --remove /dev/sde
```

* Verify the RAID Status: Check the current RAID status.

```
cat /proc/mdstat
```

Configuring RAID on Linux provides an effective way to enhance storage performance and data redundancy. By using tools like mdadm, administrators can create flexible RAID arrays, add spare disks for fault tolerance, and manage existing arrays to ensure continuous system operation. Understanding the various RAID levels and the management commands is crucial to optimizing the reliability and efficiency of your storage setup. By following these best practices and commands, you can effectively maintain and scale your RAID arrays in a Linux environment, ensuring data protection and optimal system performance.