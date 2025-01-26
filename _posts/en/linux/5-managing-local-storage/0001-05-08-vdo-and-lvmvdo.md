---
layout: post3
title: "VDO And LVMVDO"
category: linux
cat: System
tags:
  - Linux
  - Disk
---

* VDO - Virtual Data Optimizer

## Lecture Notes

* `What are vda devices instead of sda?` : Note that vdb is used here. In a Red Hat operating system, /dev/vdb refers to a virtual block device, typically used in virtualized environments such as KVM, Xen, or OpenStack. These devices are often provided by the hypervisor (the software layer that manages the virtual machines) and are usually connected to a virtual machine (VM) as additional storage.
* `What Is VDO?`: VDO (Virtual Data Optimizer) is a tool for optimizing disk space. It is preferred for its features Zero-Block Filtering,Deduplication and Compression on disk space.
* `What Is The Difference Between VDO And LVMVDO?` :  Using VDO direcly is an older method instead LVMVDO is used in RHEL9. LVMVDO integrates VDO functionality into LVM (Logical Volume Manager). This means you can create logical volumes (LVs) with built-in VDO features like deduplication and compression.
* `What Is Stratis?`: Stratis is a local storage management solution in Linux designed to simplify complex storage setups. It provides a user-friendly interface for managing storage pools, volumes, and snapshots without needing in-depth knowledge of technologies like LVM and specific filesystems.

### 1. VDO - Virtual Data Optimizer

#### Install VDO and Dependencies

* `sudo dnf install vdo kmod-kvdo`: Ensure that the `vdo` and `kmod-kvdo` packages are installed. These might already be installed in RHEL 9.4, but if not, install them using `dnf`.

#### Enable and Start the VDO Service

* `sudo systemctl enable --now vdo.service`: Enable and start the VDO service immediately.

#### Create a VDO Volume
* `sudo vdo create --name=vdo_storage --device=/dev/vdb --vdoLogicalSize=10G`: Create a VDO storage device on `/dev/vdb` with a logical size of 10GB.

#### Check Initial VDO Statistics

* `sudo vdostats --human-readable`: Check the VDO statistics. The VDO device is created, but space savings will show as `N/A` since no filesystem has been added yet.

#### Format the VDO Volume with XFS

* `sudo mkfs.xfs -K /dev/mapper/vdo_storage`: Format the VDO device with the XFS filesystem. The `-K` option prevents XFS from sending discard requests during filesystem creation, speeding up the process.

#### Ensure Device Nodes Are Updated

* `sudo udevadm settle`: Make sure all device nodes have been updated and created before proceeding.

#### Check VDO Statistics Again

* `sudo vdostats --human-readable`: Check the VDO statistics again to verify the setup.

#### Mount the VDO Volume

* `sudo mkdir /mnt/myvdo`: Create a mount point for the VDO volume.
* `vi /etc/fstab`: Add the following line to ensure the VDO volume is mounted at boot: `/dev/mapper/vdo_storage /mnt/myvdo xfs _netdev,x-systemd.device-timeout=0,x-systemd.requires=vdo.service 0 0`
* `sudo mount -a`: Mount all filesystems mentioned in `/etc/fstab`, including the new VDO volume.
* `df -h /mnt/myvdo`: Check the disk space usage of the mounted VDO volume.

#### Test the VDO Volume

* `head -c 50MB /dev/urandom > mydata.txt`: Create a 50MB file filled with random data.
* `mkdir /mnt/myvdo/dir{1..10}`: Create 10 directories inside the VDO volume.
* `for i in $(seq 1 10); do sudo cp /home/bob/mydata.txt /mnt/myvdo/dir$i; done`: Copy the 50MB file into each of the 10 directories.
* `df -h /mnt/myvdo`: Check the disk space usage again to see how much space is consumed.

#### Final VDO Statistics Check

 * `sudo vdostats --human-readable`: Check the VDO statistics to observe space savings and other metrics after writing data.

## Lecture Notes

### 2. LVMVDO

* `sudo pvcreate /dev/vdb`: Initializes a physical volume (PV) on the specified block device (`/dev/vdb`). This is the first step in creating a Volume Group (VG) in LVM, preparing the disk for use by LVM.
* `sudo vgcreate vdo_volume /dev/vdb`: Creates a Volume Group (VG) named `vdo_volume` using the previously initialized physical volume (`/dev/vdb`). A volume group is a pool of storage from which logical volumes can be allocated.
* `sudo lvcreate --type vdo -n vdo_storage -L 100%FREE -V 10G vdo_volume/vdo_pool1`: Creates a Logical Volume (LV) of type VDO named `vdo_storage` in the `vdo_volume` volume group, with a size of `10G`. The `-L 100%FREE` option allocates all available space in the VG for this LV, and `-V 10G` specifies the logical size of the VDO volume, which can be larger than the physical size due to data optimization features like compression and deduplication.
* `sudo mkfs.xfs -K /dev/vdo_volume/vdo_storage`: Formats the newly created VDO logical volume (`/dev/vdo_volume/vdo_storage`) with the XFS filesystem. The `-K` option prevents XFS from sending discard requests during formatting, speeding up the process.
* `sudo mkdir /mnt/myvdo`: Creates a directory named `myvdo` under `/mnt`. This directory will serve as the mount point for the VDO volume.
* `vi /etc/fstab`: Opens the `/etc/fstab` file in the `vi` text editor. This file is used to configure filesystems to be automatically mounted at boot time. `/dev/vdo_volume/vdo_storage /mnt/myvdo xfs defaults 0 0` This line instructs the system to mount the VDO volume (`/dev/vdo_volume/vdo_storage`) to the mount point `/mnt/myvdo` using the XFS filesystem. The `defaults` option specifies default mount options, and `0 0` are fields for dump and fsck options (typically set to `0` for no dump and no fsck).
* `sudo mount -a`: Mounts all filesystems listed in `/etc/fstab` that are not already mounted. This applies the new entry added to `/etc/fstab`, mounting the VDO volume to `/mnt/myvdo` without requiring a reboot.
* `df -h /mnt/myvdo`: Displays disk space usage for the mount point `/mnt/myvdo`. The `-h` option makes the output human-readable by showing sizes in a more readable format (e.g., GB instead of bytes). This command verifies that the volume is correctly mounted and checks available disk space.

