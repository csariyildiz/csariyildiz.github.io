---
layout: post3
title: "Logical Volume Manager"
category: linux
cat: System
tags:
  - Linux
  - Disk
---

LVM (Logical Volume Manager) is a device management technology used in Linux for flexible disk storage management. It abstracts physical storage devices (like hard drives or partitions) and presents them as logical volumes, making it easier to manage and resize storage without being constrained by physical disk sizes.

Notes are organized in concepts, command overview and lab steps.

## Command Overview

### Disk Wipe And Format

```
fdisk -l
lsblk
wipefs -a /dev/sdb
sudo dd if=/dev/zero of=/dev/sdb bs=1024M count=2
fdisk /dev/sdb
```

### Volume Groups And Physical Volumes

```
lvm version
rpm -qa | grep lvm2

lvmdiskscan

pvs
pvdisplay
pvcreate /dev/sde
pvremove /dev/sde

vgs
vgdisplay
vgcreate my_vg /dev/sdc /dev/sdd
vgextend my_vg /dev/sde
vgreduce my_vg /dev/sde
vgreduce my_vg /dev/sde
vgremove my_vg
```

### Logical Volumes

```
lvs
lvdisplay

lvcreate --size 2G --name partition1 my_vg
lvcreate --size 6G --name partition2 my_vg

lvresize --extents 100%VG my_vg/partition1
lvresize --size 2G my_vg/partition1

lvextend -L +500M /dev/my_vg/lv_one
lvremove /dev/my_vg/lv_two
```

### File System And Mounting

```
mkfs.xfs /dev/my_volume/partition1
lvresize --resizefs --size 3G my_volume/partition1

mkfs.xfs /dev/my_vg/lv_one
mkdir /mnt/lv_one /mnt/lv_two
mount /dev/my_vg/lv_one /mnt/lv_one
mount
df -h | grep /mnt
echo "/dev/my_vg/lv_one /mnt/lv_one xfs defaults 0 0" | sudo tee -a /etc/fstab
umount /mnt/lv_one
lvremove /dev/my_vg/lv_one
vgremove my_vg
pvremove /dev/sdb1
wipefs -a /dev/sdb1
```



## Concepts


### What is LVM?

* LVM (Logical Volume Manager) is a disk virtualization tool. It is particularly useful in environments where storage requirements often change dynamically.
* LVM makes storage management flexible by resizing logical volumes without affecting the underlying physical storage. Sizes are dynamic making adding more storage by adding new physical volumes to the volume group. Resizing volumes on the fly (grow or shrink).
* LVM has a snapshots feature. Snapshots of a logical volume can be created for backups or testing.
* LVM can distribute data across multiple physical volumes (striping) for better performance and mirror data (mirroring) for redundancy.
* LVM combines multiple disks into a single volume group, enabling better disk utilization, providing efficient disk usage.

* Main components of LVM are PVs, VGs, LVs and PEs.
* PVs are the raw storage devices or partitions that are initialized for LVM. Examples: /dev/sda1, /dev/sdb.
* Volume Group (VG) is a collection of one or more physical volumes pooled together to create a storage group. Acts as a container for logical volumes. Example: vg_data.
* Logical Volumes (LV) are the "virtual partitions" created from a volume group. They act like traditional partitions but can be resized, moved, or modified easily. Example: /dev/vg_data/lv_home.
* Physical Extents (PE): Physical volumes are divided into small, fixed-size chunks called physical extents. Logical volumes are built by allocating these extents from the volume group.

* Some use cases might be:
  * Dynamic Resizing: Expand storage for /home or /var when space runs low.
  * Snapshots: Create a snapshot before performing system upgrades.
  * Striping for Performance: Improve performance by striping data across multiple drives.

### Creating Volume Groups And Physical Volumes

* Again `PV, VG, LV` are our basic components. We first define PV, then add to a new or existing VG, then create LVs on that VG.
  * Physical Volumes (PVs): Physical partitions or disks added to the LVM.
  * Volume Groups (VGs): A collection of PVs that form a single storage pool.
  * Logical Volumes (LVs): Slices of a VG that act like partitions and can be resized or moved more easily.

* `lvmdiskscan` command scans all disks and reports their suitability for LVM.
  
```
sudo lvmdiskscan
  /dev/sda2 [     <19.00 GiB] LVM physical volume
  0 disks
  0 partitions
  0 LVM physical volume whole disks
  1 LVM physical volume
```

* `pvs` lists physical volumes.

```
sudo pvs
  PV         VG   Fmt  Attr PSize   PFree
  /dev/sda2  rhel lvm2 a--  <19.00g    0
```

* `vgs` checks volume groups.

```
sudo vgs
  VG   #PV #LV #SN Attr   VSize   VFree
  rhel   1   2   0 wz--n- <19.00g    0
```

* `lvs` lists logical volumes.

```
sudo lvs
  LV   VG   Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  root rhel -wi-ao---- <17.00g
  swap rhel -wi-ao----   2.00g
```
  
* `pvcreate /dev/sde`: Creates a new physical volume on `/dev/sde`. (needs to be run as sudo)
* `vgcreate my_volume /dev/sdc /dev/sdd`: Creates a volume group called `my_volume` using the physical volumes `/dev/sdc` and `/dev/sdd`. This setup is customizable and can be extended anytime. The volume group is not yet partitioned into LVs. (needs to be run as sudo)
* `vgextend my_volume /dev/sde`: Adds the physical volume `/dev/sde` to the volume group `my_volume`. (needs to be run as sudo)
* `vgreduce my_volume /dev/sde`: Removes `/dev/sde` from the volume group `my_volume`. (needs to be run as sudo)
* `pvremove /dev/sde`: Removes the physical volume `/dev/sde` from LVM entirely. (needs to be run as sudo)


### Creating Logical Volumes

* `lvcreate -L <size> -n <name> <VG>`
  * `lvcreate --size 2G --name partition1 my_volume`: Creates a logical volume named `partition1` with a size of 2GB in the volume group `my_volume`. (needs to be run as sudo)
  * `lvcreate --size 6G --name partition2 my_volume`: Adds a second logical volume named `partition2` with a size of 6GB. (needs to be run as sudo)

* `lvs`: Lists logical volumes.
  
* `lvresize`: Resizes logical volumes.
  * `lvresize --extents 100%VG my_volume/partition1`: Resizes `partition1` to use 100% of the free space in the volume group `my_volume`. (needs to be run as sudo)
  * `lvresize --size 2G my_volume/partition1`: Resizes `partition1` to 2GB. (needs to be run as sudo)

* `lvdisplay`: Displays information about logical volumes, including the LV path (e.g., `/dev/my_volume/partition1`). (needs to be run as sudo)

### Creating And Resizing With Filesystem

* `mkfs.xfs /dev/my_volume/partition1`: Creates an XFS filesystem on the logical volume `/dev/my_volume/partition1`. (needs to be run as sudo)
* `lvresize --resizefs --size 3G my_volume/partition1`: Resizes `partition1` to 3GB and resizes the filesystem along with it. (needs to be run as sudo)


## Steps

#### 1. Show disks and look for pvs.

*  As we can see operating system itself is configured using LVM.
*  Its partition /sda2 configured as a PV.
  
```
lsblk

NAME          MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
sda             8:0    0   20G  0 disk 
├─sda1          8:1    0    1G  0 part /boot
└─sda2          8:2    0   19G  0 part 
  ├─rhel-root 253:0    0   17G  0 lvm  /
  └─rhel-swap 253:1    0    2G  0 lvm  [SWAP]
sdb             8:16   0    2G  0 disk 
└─sdb1          8:17   0    2G  0 part 
sr0            11:0    1 1024M  0 rom  
```

*  It also have a volume group.
  
```
sudo pvs

  PV         VG   Fmt  Attr PSize   PFree
  /dev/sda2  rhel lvm2 a--  <19.00g    0 
```

*  We will use sdb partition but we need to remove existing configuration first.
  
#### 2. Wipe Disk

*  First we clear the filesystem signature.

```
sudo wipefs -a /dev/sdb
/dev/sdb: 8 bytes were erased at offset 0x00000200 (gpt): 45 46 49 20 50 41 52 54
/dev/sdb: 8 bytes were erased at offset 0x7ffffe00 (gpt): 45 46 49 20 50 41 52 54
/dev/sdb: 2 bytes were erased at offset 0x000001fe (PMBR): 55 aa
/dev/sdb: calling ioctl to re-read partition table: Success
```

*  Then we clear the disk with zero bytes.

```
sudo dd if=/dev/zero of=/dev/sdb bs=1024M count=2
2+0 records in
2+0 records out
2147483648 bytes (2.1 GB, 2.0 GiB) copied, 1.64357 s, 1.3 GB/s
```

#### 3. Format Disk

*  We format and also partition the disk as a single volume. Partition type will be Linux LVM.

```
sudo fdisk /dev/sdb

Welcome to fdisk (util-linux 2.37.4).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table.
Created a new DOS disklabel with disk identifier 0xa1de0483.

Command (m for help): n ///////// Press n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): e //////// Press e
Partition number (1-4, default 1): 1 //////////// Press 1
First sector (2048-4194303, default 2048):  //////// Press Enter
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-4194303, default 4194303):  /// Press Enter

Created a new partition 1 of type 'Extended' and of size 2 GiB.

Command (m for help): t ///// Press t
Selected partition 1
Hex code or alias (type L to list all): 8e ////// Press 8e
Changed type of partition 'Extended' to 'Linux LVM'.

Command (m for help): w ///////// Press w.
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
```

*  Verify the partition.

```

lsblk

NAME          MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
sda             8:0    0   20G  0 disk 
├─sda1          8:1    0    1G  0 part /boot
└─sda2          8:2    0   19G  0 part 
  ├─rhel-root 253:0    0   17G  0 lvm  /
  └─rhel-swap 253:1    0    2G  0 lvm  [SWAP]
sdb             8:16   0    2G  0 disk 
└─sdb1          8:17   0    2G  0 part 
sr0            11:0    1 1024M  0 rom  

```


#### 4. Create Physical Volume

* We cant create PV using /dev/sdb directly since we partitioned it before.
* We can use its partition. Or wipe it out and add it as a pv.

```
sudo pvcreate /dev/sdb
  Cannot use /dev/sdb: device is partitioned
```

*  Lets use its partition.

```
sudo pvcreate /dev/sdb1
  Physical volume "/dev/sdb1" successfully created.

```

*  PV is successfully created.
  
```
sudo pvs
  PV         VG   Fmt  Attr PSize   PFree 
  /dev/sda2  rhel lvm2 a--  <19.00g     0 
  /dev/sdb1       lvm2 ---   <2.00g <2.00g
```


#### 5. Add PV to a Volume Group (VG)

*  Now we can create the volume group using our physical volume.
  
```
sudo vgs
  VG   #PV #LV #SN Attr   VSize   VFree
  rhel   1   2   0 wz--n- <19.00g    0 
```


```
sudo vgcreate my_vg /dev/sdb1
  Volume group "my_vg" successfully created
```

```
sudo vgcreate my_vg /dev/sdb1
```

*  Now we can see our volume group.
  
```
sudo vgs

  VG    #PV #LV #SN Attr   VSize   VFree 
  my_vg   1   0   0 wz--n-  <2.00g <2.00g
  rhel    1   2   0 wz--n- <19.00g     0 
```

* Note: We can also extend an existing group with sudo vgextend my_vg /dev/sdb1
* Ensure the disk is not in use (check with mount or lsblk).
* Use vgremove and pvremove to free the disk if it was previously used with LVM.


#### 6. Create Two Logical Volumes

* Create the First Logical Volume (lv_one)

* Allocate 1GB to the first LV

```
sudo lvcreate -L 1G -n lv_one my_vg
  Logical volume "lv_one" created.
```

* Allocate 1000MB to the second LV
* 
```
 sudo lvcreate -L 1000MB -n lv_two my_vg
  Logical volume "lv_two" created.
```

#### 7. Show logical volumes.

```
sudo lvs
  LV     VG    Attr       LSize    Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  lv_one my_vg -wi-a-----    1.00g                                                    
  lv_two my_vg -wi-a----- 1000.00m                                                    
  root   rhel  -wi-ao----  <17.00g                                                    
  swap   rhel  -wi-ao----    2.00g                                                    
```

#### 8. Delete lv_two

```
sudo lvremove lv_two
  Volume group "lv_two" not found
  Cannot process volume group lv_two
```

```
sudo lvremove /dev/my_vg/lv_two
Do you really want to remove active logical volume my_vg/lv_two? [y/n]: y
  Logical volume "lv_two" successfully removed.
```

```
lsblk
NAME             MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
sda                8:0    0   20G  0 disk 
├─sda1             8:1    0    1G  0 part /boot
└─sda2             8:2    0   19G  0 part 
  ├─rhel-root    253:0    0   17G  0 lvm  /
  └─rhel-swap    253:1    0    2G  0 lvm  [SWAP]
sdb                8:16   0    2G  0 disk 
└─sdb1             8:17   0    2G  0 part 
  └─my_vg-lv_one 253:2    0    1G  0 lvm  
sr0               11:0    1 1024M  0 rom  
```

#### 9. Create lv_two again

```
sudo lvcreate -L 1020MB -n lv_two my_vg
  Logical volume "lv_two" created.
```

```
 sudo lvs
  LV     VG    Attr       LSize    Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  lv_one my_vg -wi-a-----    1.00g                                                    
  lv_two my_vg -wi-a----- 1020.00m                                                    
  root   rhel  -wi-ao----  <17.00g                                                    
  swap   rhel  -wi-ao----    2.00g                                                    
```


```
pvs
  PV         VG    Fmt  Attr PSize   PFree
  /dev/sda2  rhel  lvm2 a--  <19.00g    0 
  /dev/sdb1  my_vg lvm2 a--   <2.00g    0
```

```
lsblk
NAME             MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
sda                8:0    0   20G  0 disk 
├─sda1             8:1    0    1G  0 part /boot
└─sda2             8:2    0   19G  0 part 
  ├─rhel-root    253:0    0   17G  0 lvm  /
  └─rhel-swap    253:1    0    2G  0 lvm  [SWAP]
sdb                8:16   0    2G  0 disk 
└─sdb1             8:17   0    2G  0 part 
  ├─my_vg-lv_one 253:2    0    1G  0 lvm  
  └─my_vg-lv_two 253:3    0 1020M  0 lvm  
sr0               11:0    1 1024M  0 rom  
```

#### 10. Reduce lv_two

```
lvreduce -L 500M /dev/my_vg/lv_two
  No file system found on /dev/my_vg/lv_two.
  Size of logical volume my_vg/lv_two changed from 1020.00 MiB (255 extents) to 500.00 MiB (125 extents).
  Logical volume my_vg/lv_two successfully resized.
```

#### 11. Add 500MB to lv_one

```
lvextend -L +500M /dev/my_vg/lv_one
```

#### 12. Format LVs with the XFS Filesystem

```
mkfs.xfs /dev/my_vg/lv_one
mkfs.xfs /dev/my_vg/lv_two
```

#### 13. Create mount points

```
 mkdir /mnt/lv_one /mnt/lv_two
```


#### 14. Mount the LVs

```
mount /dev/my_vg/lv_one /mnt/lv_one
mount /dev/my_vg/lv_two /mnt/lv_two
```

#### 15. Verify with df

```
df -h | grep /mnt
/dev/mapper/my_vg-lv_one  1.5G   43M  1.4G   3% /mnt/lv_one
/dev/mapper/my_vg-lv_two  436M   29M  408M   7% /mnt/lv_two
```


#### 16. Persist the Mounts

To make the mounts persistent across reboots, add entries to /etc/fstab:

```
echo "/dev/my_vg/lv_one /mnt/lv_one xfs defaults 0 0" | sudo tee -a /etc/fstab
echo "/dev/my_vg/lv_two /mnt/lv_two xfs defaults 0 0" | sudo tee -a /etc/fstab
```


#### 17. Remove a Logical Volume And Volume Group

Unmount the LV:

```
umount /mnt/lv_one
```

Remove the LV:

```
lvremove /dev/my_vg/lv_one
```

Remove tge VG:

```
vgremove my_vg
```


#### 18. Remove the Physical Volume

```
pvremove /dev/sdb1
```

Clear filesystem signature:

```
wipefs -a /dev/sdb1
```

End.
