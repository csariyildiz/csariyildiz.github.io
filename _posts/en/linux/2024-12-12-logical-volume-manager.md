---
layout: post3
title: "Logical Volume Manager"
category: main
cat: System
tags:
  - Linux
  - Disk
---

LVM (Logical Volume Manager) is a device management technology used in Linux for flexible disk storage management. It abstracts physical storage devices (like hard drives or partitions) and presents them as logical volumes, making it easier to manage and resize storage without being constrained by physical disk sizes.


## Concepts



## Command Overview


## Creating Volume Groups And Physical Volumes

* `PV, VG, LV` :Define PV, Add to VG, Create LV. Physical Volumes (PVs): Physical partitions or disks added to the LVM.
Volume Groups (VGs): A collection of PVs that form a single storage pool. Logical Volumes (LVs): Slices of a VG that act like partitions and can be resized or moved more easily.
* `lvmdiskcan`: Scans for LVM physical volumes.
* `pvs`: Lists physical volumes.
* `pvcreate /dev/sde`: Creates a new physical volume on `/dev/sde`. (needs to be run as sudo)
* `vgcreate my_volume /dev/sdc /dev/sdd`: Creates a volume group called `my_volume` using the physical volumes `/dev/sdc` and `/dev/sdd`. This setup is customizable and can be extended anytime. The volume group is not yet partitioned into LVs. (needs to be run as sudo)
* `vgextend my_volume /dev/sde`: Adds the physical volume `/dev/sde` to the volume group `my_volume`. (needs to be run as sudo)
* `vgs`: Checks volume groups. (needs to be run as sudo)
* `vgreduce my_volume /dev/sde`: Removes `/dev/sde` from the volume group `my_volume`. (needs to be run as sudo)
* `pvremove /dev/sde`: Removes the physical volume `/dev/sde` from LVM entirely. (needs to be run as sudo)


## Creating Logical Volumes

* `lvcreate -L <size> -n <name> <VG>`
  * `lvcreate --size 2G --name partition1 my_volume`: Creates a logical volume named `partition1` with a size of 2GB in the volume group `my_volume`. (needs to be run as sudo)
  * `lvcreate --size 6G --name partition2 my_volume`: Adds a second logical volume named `partition2` with a size of 6GB. (needs to be run as sudo)

* `lvs`: Lists logical volumes.

  * `lvresize --extents 100%VG my_volume/partition1`: Resizes `partition1` to use 100% of the free space in the volume group `my_volume`. (needs to be run as sudo)
  * `lvresize --size 2G my_volume/partition1`: Resizes `partition1` to 2GB. (needs to be run as sudo)

* `lvdisplay`: Displays information about logical volumes, including the LV path (e.g., `/dev/my_volume/partition1`). (needs to be run as sudo)

## Creating And Resizing With Filesystem

* `mkfs.xfs /dev/my_volume/partition1`: Creates an XFS filesystem on the logical volume `/dev/my_volume/partition1`. (needs to be run as sudo)
* `lvresize --resizefs --size 3G my_volume/partition1`: Resizes `partition1` to 3GB and resizes the filesystem along with it. (needs to be run as sudo)


## Steps

#### 1. Adding Disks And Partitions To LVM

##### Initial State

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

```
sudo pvs

  PV         VG   Fmt  Attr PSize   PFree
  /dev/sda2  rhel lvm2 a--  <19.00g    0 
```

##### Wipe Disk

Clear filesystem signature:

```
sudo wipefs -a /dev/sdb
/dev/sdb: 8 bytes were erased at offset 0x00000200 (gpt): 45 46 49 20 50 41 52 54
/dev/sdb: 8 bytes were erased at offset 0x7ffffe00 (gpt): 45 46 49 20 50 41 52 54
/dev/sdb: 2 bytes were erased at offset 0x000001fe (PMBR): 55 aa
/dev/sdb: calling ioctl to re-read partition table: Success
```

Clear the Disk (Optional)

```
sudo dd if=/dev/zero of=/dev/sdb bs=1024M count=2
2+0 records in
2+0 records out
2147483648 bytes (2.1 GB, 2.0 GiB) copied, 1.64357 s, 1.3 GB/s
```

##### Format Disk

 Partition the Disk (Optional)

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


#### 2. Create Physical Volume

```
sudo pvcreate /dev/sdb
  Cannot use /dev/sdb: device is partitioned
```

Note: We cant use /dev/sdb directly since we partitioned it before. We can use its partition. Or wipe it out and add it as a pv.

```
sudo pvcreate /dev/sdb1
  Physical volume "/dev/sdb1" successfully created.

```


```
sudo pvs
  PV         VG   Fmt  Attr PSize   PFree 
  /dev/sda2  rhel lvm2 a--  <19.00g     0 
  /dev/sdb1       lvm2 ---   <2.00g <2.00g
```


#### 3. Add PV to a Volume Group (VG)

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

```
sudo vgs

  VG    #PV #LV #SN Attr   VSize   VFree 
  my_vg   1   0   0 wz--n-  <2.00g <2.00g
  rhel    1   2   0 wz--n- <19.00g     0 
```

Note: We can also extend an existing group with sudo vgextend my_vg /dev/sdb1
Ensure the disk is not in use (check with mount or lsblk).
Use vgremove and pvremove to free the disk if it was previously used with LVM.


#### 4. Create Two Logical Volumes

Create the First Logical Volume (lv_one)

Allocate 1GB to the first LV:


```
sudo lvcreate -L 1G -n lv_one my_vg
  Logical volume "lv_one" created.
```

```
 sudo lvcreate -L 1000MB -n lv_two my_vg
  Logical volume "lv_two" created.
```

```
  [acs@rhel9-4 ~]$ sudo lvs
  LV     VG    Attr       LSize    Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  lv_one my_vg -wi-a-----    1.00g                                                    
  lv_two my_vg -wi-a----- 1000.00m                                                    
  root   rhel  -wi-ao----  <17.00g                                                    
  swap   rhel  -wi-ao----    2.00g                                                    
```

```
[acs@rhel9-4 ~]$ sudo lvremove lv_two
  Volume group "lv_two" not found
  Cannot process volume group lv_two
```

```
[acs@rhel9-4 ~]$ sudo lvremove /dev/my_vg/lv_two
Do you really want to remove active logical volume my_vg/lv_two? [y/n]: y
  Logical volume "lv_two" successfully removed.
```

```
[acs@rhel9-4 ~]$ lsblk
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

```
[acs@rhel9-4 ~]$ sudo lvcreate -L 1020MB -n lv_two my_vg
  Logical volume "lv_two" created.
```

```
[acs@rhel9-4 ~]$ sudo lvs
  LV     VG    Attr       LSize    Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  lv_one my_vg -wi-a-----    1.00g                                                    
  lv_two my_vg -wi-a----- 1020.00m                                                    
  root   rhel  -wi-ao----  <17.00g                                                    
  swap   rhel  -wi-ao----    2.00g                                                    
```

```
[acs@rhel9-4 ~]$ pvs
  WARNING: Running as a non-root user. Functionality may be unavailable.
  /run/lock/lvm/P_global:aux: open failed: Permission denied
```

```
[acs@rhel9-4 ~]$ sudo pvs
  PV         VG    Fmt  Attr PSize   PFree
  /dev/sda2  rhel  lvm2 a--  <19.00g    0 
  /dev/sdb1  my_vg lvm2 a--   <2.00g    0 
[acs@rhel9-4 ~]$ lsblk
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

```
sudo lvreduce -L 500M /dev/my_vg/lv_two
  No file system found on /dev/my_vg/lv_two.
  Size of logical volume my_vg/lv_two changed from 1020.00 MiB (255 extents) to 500.00 MiB (125 extents).
  Logical volume my_vg/lv_two successfully resized.
```

Add 500MB to lv_one:

```
sudo lvextend -L +500M /dev/my_vg/lv_one
```

Format LVs with the XFS Filesystem:

```
sudo mkfs.xfs /dev/my_vg/lv_one
sudo mkfs.xfs /dev/my_vg/lv_two
```

Create mount points:

```
sudo mkdir /mnt/lv_one /mnt/lv_two
```

Mount the LVs:

```
sudo mount /dev/my_vg/lv_one /mnt/lv_one
sudo mount /dev/my_vg/lv_two /mnt/lv_two
```

Verify with df:

```
sudo df -h | grep /mnt
/dev/mapper/my_vg-lv_one  1.5G   43M  1.4G   3% /mnt/lv_one
/dev/mapper/my_vg-lv_two  436M   29M  408M   7% /mnt/lv_two
```

Persist the Mounts : To make the mounts persistent across reboots, add entries to /etc/fstab:

```
echo "/dev/my_vg/lv_one /mnt/lv_one xfs defaults 0 0" | sudo tee -a /etc/fstab
echo "/dev/my_vg/lv_two /mnt/lv_two xfs defaults 0 0" | sudo tee -a /etc/fstab
```


Remove a Logical Volume

Unmount the LV:

```
sudo umount /mnt/lv_one
```

Remove the LV:

```
sudo lvremove /dev/my_vg/lv_one
```

Remove tge VG:

```
sudo vgremove my_vg
```


Remove the PV:

```
sudo pvremove /dev/sdb1
```

Clear filesystem signature:

```
sudo wipefs -a /dev/sdb1
```

End.
