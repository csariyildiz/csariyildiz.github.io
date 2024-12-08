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



<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/mainboard.png" class="img-fluid" alt="Managing Disk On Linux">


## Table Of Contents

* Block Device Concepts
* Steps 
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

####  Boot Process And Grub

During boot, a system typically uses firmware such as UEFI (or BIOS in older devices). This firmware provides a visual interface for managing boot processes and configuring system settings. It is embedded in the motherboard chip and generally remains unaltered except during updates.

The firmware establishes the initial connection to the disk based on its configuration. Beyond this, the boot process depends on the disk's bootloader configuration. For instance, if a system is running Windows on a single disk, the firmware connects directly to Windows' bootloader. However, in a dual-boot setup with both Windows and Linux installed, GRUB (GNU GRand Unified Bootloader) often serves as the intermediary. GRUB provides a menu to select between operating systems during boot.

GRUB is an open-source tool designed for managing multi-boot environments. On an installed system, GRUB loads its configuration from the /boot/grub/grub.cfg file during each boot.


The firmware uses the EFI System Partition (/dev/sdb1) to locate the bootloader.
GRUB is managing the dual-boot setup and pointing to the appropriate operating system:
For Windows, it loads the bootloader from /dev/sdb1 which eventually points to /dev/sdb3.
For Linux, it directly boots from /dev/sdb5.

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

#### 9. List block devices

* `lsblk` lists block devices.
  
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

#### 10. List block files representing devices.

* We can list `/dev/` directory for files of block devices.

```
[acs@rhel9-4 ~]$ sudo ls -ltr /dev/ | grep sda
brw-rw----. 1 root disk      8,   0 Nov  7 23:28 sda
brw-rw----. 1 root disk      8,   1 Nov  7 23:28 sda1
brw-rw----. 1 root disk      8,   2 Nov  7 23:28 sda2
```

* These files do not contain stored content in the traditional sense. Instead, their content is the interface they provide to the underlying hardware or kernel feature.
* b means they are block devices. There are also pipes sockets and speacial interfaces like `/dev/null` `/dev/zero` and `/dev/random`.

```
[acs@rhel9-4 ~]$ sudo hexdump /dev/sda | head -n 10
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
[acs@rhel9-4 ~]$ sudo fdisk -l | more
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
  
#### 10. Format disk without ui by manipulating disk partition table.

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

#### 11. Create xfs filesystem on sdb1 partition.

```
[acs@rhel9-4 ~]$ sudo mkfs.xfs /dev/sdb1
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

#### 12. Create mount directory and mount filesystem.

* Create a directory named data under root directory.

```
[acs@rhel9-4 ~]$ sudo mkdir /data/
```

* Mount the file system to a directory.


```
[acs@rhel9-4 ~]$ sudo mount /dev/sdb1 /data2
```

#### 13. Check mounted filesystems to verify mount.

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
/dev/sdb1              960M   39M  922M   5% /data
```

#### 14. Make mount persistent at boot.

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

#### 15. Reboot gracefully and check mounting.

```
sudo systemctl reboot
```

* Wait system to reboot.
* `df -h` will show if mounting is made.

```
[acs@rhel9-4 ~]$ df -h
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

#### 16. Unmount /dev/sdb1

* Unmount by using mount point.
 
```
sudo umount /data
```

* Verify.
 
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

#### 17. Mount all using fstab File.

* Mount all by using fstab file.

```
[acs@rhel9-4 ~]$ sudo mount -a
```

* Verify.
  
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
/dev/sdb1              960M   39M  922M   5% /data
```

#### 18. Format disk with ui by manipulating disk partition table.

```
sudo cfdisk /dev/sdb
```

