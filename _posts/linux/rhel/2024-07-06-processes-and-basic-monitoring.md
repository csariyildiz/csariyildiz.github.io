---
layout: post4
page_name: "Processes And Basic Monitoring"
title: "Processes And Basic Monitoring"
---

In this section we will list commands, details and walkthough for linux processes and monitoring commands on memory, network and disk usage.
We will explain tcpdump and netstat in network details section.

## Table Of Contents

1. Command List
2. Walkthrough
3. Details


## 1. Command List


```
ps -aux

ps -ef
ps -ef | grep top


vmstat 1

pidstat

free

sar


kill [PID]: Sends the default TERM signal to terminate a process with the specified PID.
kill -9 [PID]: Sends the KILL signal to forcefully terminate a process.

killall [process_name]: Sends the default TERM signal to terminate processes with the specified name.
killall -9 [process_name]: Sends the KILL signal to forcefully terminate processes with the specified name.

nice -n [priority] [command]: Starts a command with the specified priority.
nice: Starts a process with a specified priority.
nice -n [priority] [command]: Starts a command with the specified priority.

renice: Changes the priority of an already running process.
renice [priority] -p [PID]: Changes the priority of the process with the specified PID.

nohup: Runs a command immune to hangups and keeps it running after logging out.
nohup [command] &: Runs the command in the background and immune to hangups.

bg: Resumes a suspended job in the background.
bg [job_id]: Resumes the specified job in the background.

fg: Brings a background job to the foreground.
fg [job_id]: Brings the specified job to the foreground.

jobs: Lists current jobs.
jobs: Displays all current jobs with their statuses.

systemctl: Manages systemd services.
systemctl start [service_name]: Starts a service.
systemctl stop [service_name]: Stops a service.
systemctl restart [service_name]: Restarts a service.
systemctl status [service_name]: Checks the status of a service.

systemctl (additional usage):
systemctl enable [service_name]: Enables a service to start at boot.
systemctl disable [service_name]: Disables a service from starting at boot.
systemctl list-units --type=service: Lists all loaded services.

chkconfig: Updates and queries runlevel information for system services.
chkconfig --list: Lists all services and their runlevel settings.
chkconfig [service_name] on: Enables a service.
chkconfig [service_name] off: Disables a service.

service: Controls the system services.
service [service_name] start: Starts a service.
service [service_name] stop: Stops a service.
service [service_name] restart: Restarts a service.
service [service_name] status: Checks the status of a service.

tuned-adm: Tunes system settings for specific workloads.
tuned-adm list: Lists all available profiles.
tuned-adm active: Shows the current active profile.
tuned-adm profile [profile_name]: Activates the specified profile.

yum: Package manager for RHEL.
yum install [package_name]: Installs a package.
yum update [package_name]: Updates a package.
yum remove [package_name]: Removes a package.
yum list installed: Lists all installed packages.

firewall-cmd: Configures the firewall.
firewall-cmd --state: Checks the state of the firewall.
firewall-cmd --add-port=[port]/[protocol] --permanent: Adds a port to the firewall permanently.
firewall-cmd --reload: Reloads the firewall configuration.

setsebool: Manages SELinux booleans.
setsebool -P [boolean] on|off: Sets the specified SELinux boolean.
getsebool: Queries SELinux booleans.
getsebool -a: Lists all SELinux booleans and their current values.

pmap: Reports memory map of a process.
pmap [PID]: Displays the memory map of the process with the specified PID.
pmap -x [PID]: Provides extended information about memory usage.
pidof: Finds the process ID of a running program.
pidof [program_name]: Displays the PID(s) of the running program.

watch: Executes a program periodically and shows the output.
watch [command]: Runs the specified command every 2 seconds by default.
watch -n [seconds] [command]: Runs the specified command at the specified interval.

dstat: Versatile resource statistics.
dstat: Provides a combination of vmstat, iostat, netstat, and ifstat.

nmon: Performance monitor for Linux.
nmon: Interactive interface for performance monitoring.

strace: Traces system calls and signals.
strace [command]: Traces the system calls made by the specified command.
strace -p [PID]: Attaches to the process with the specified PID to trace its system calls.

lsof: Lists open files.
lsof: Lists information about files opened by processes.
lsof -p [PID]: Lists files opened by the specified process.

uptime: Shows how long the system has been running.
uptime: Displays system uptime, number of users, and load averages.

ps: Reports a snapshot of the current processes.
ps aux: Displays all running processes.
ps -ef: Another format to display all running processes.

top: Displays real-time information about running processes, CPU, and memory usage.
top: Opens the interactive top interface.

htop: An interactive process viewer (similar to top) with a more user-friendly interface. 
(May need to install: sudo yum install htop or sudo apt install htop).
htop: Opens the interactive htop interface.
Use arrow keys to navigate, F3 to search, F9 to kill a process, and F10 to quit.

atop: Advanced system and process monitor for Linux.
atop: Opens the interactive atop interface.

vmstat: Reports virtual memory statistics.
vmstat 1: Provides real-time updates every second.

iostat: Reports CPU and I/O statistics.
iostat: Displays average CPU and I/O statistics since the last reboot.
iostat 1: Provides real-time updates every second.

mpstat: Reports CPU statistics.
mpstat: Displays average CPU statistics.
mpstat 1: Provides real-time updates every second.

pidstat: Reports statistics for Linux tasks (processes).
pidstat: Displays CPU usage of processes.

free: Displays memory usage.
free -h: Displays memory usage in human-readable format.

sar: Collects, reports, or saves system activity information.
sar: Displays various system performance information.
```

## 2. Walkthrough

### Monitoring Disk Usage

First we can start by monitoring disk and memory usage with df and du.

### df

As a root we will use df:

```
[root@rhel-9-3 acs]# whatis df
df (1)               - report file system disk space usage
df (1p)              - report free disk space
```

We will use it with -h option : `-h, --human-readable  print sizes in powers of 1024 (e.g., 1023M)`:


```
[root@rhel-9-3 acs]# df -h

Filesystem                Size  Used Avail Use% Mounted on

devtmpfs                  4.0M     0  4.0M   0% /dev
tmpfs                     1.8G     0  1.8G   0% /dev/shm
tmpfs                     732M   10M  723M   2% /run
/dev/mapper/rhel_10-root   17G  6.7G   11G  40% /
/dev/sda1                 960M  480M  481M  50% /boot
tmpfs                     366M  112K  366M   1% /run/user/1000
```


* `Filesystem`: Indicates the name of the filesystem.
* `Size`: Shows the total size of the filesystem or partition.
* `Used`: Displays the amount of space used on the filesystem.
* `Avail`: Represents the available space on the filesystem.
* `Use%`: Shows the percentage of used space relative to the total size.
* `Mounted on`: Specifies the mount point of the filesystem in the directory tree.


From outside we got two disks 20G for first and 2G added as additional disk for virtual machine as vdi files. We got 4G (4096 MB) RAM.

All `tmpfs` filesystems (`/dev/shm, /run, /run/user/1000`) and `devtmpfs` (`/dev`) are in RAM, providing fast access to temporary data. The root filesystem (`/` on `/dev/mapper/rhel_10-root`) and the boot partition (/boot on /dev/sda1) are on disk, providing persistent storage.

`devtmpfs` is a virtual filesystem used to represent the device-specific information in a temporary filesystem (`tmpfs`) mounted on `/dev`. Its also fully resides in RAM.  It provides a dynamic directory structure for device files. Manages device nodes in the /dev directory. It dynamically creates and maintains device files as hardware devices are added or removed.

Swap space information is not avaible df output we can see it with the commands swapon -show and free -h. 

```
[root@rhel-9-3 acs]# swapon --show
NAME      TYPE      SIZE   USED PRIO
/dev/dm-1 partition   2G 357.5M   -2

[root@rhel-9-3 acs]# free -h
               total        used        free      shared  buff/cache   available
Mem:           3.6Gi       1.5Gi       1.0Gi        12Mi       1.4Gi       2.1Gi
Swap:          2.0Gi       357Mi       1.7Gi
```

The reference to /dev in the context of swap space is about the naming and organization of disk partitions or files. For instance, /dev/dm-1 is a device node representing a disk-based swap partition. The /dev directory itself, managed by devtmpfs, does not handle or store swap space directly.

`tmpfs` first occurrence of `tmpfs` is mounted on `/dev/shm`, which is commonly used for shared memory. Shared memory is a segment of memory that is accessible by more than one process. Processes can read from and write to this memory, allowing them to share data efficiently. It is used for exchanging data between processes without the need for more complex IPC mechanisms like message queues or pipes.

`tmfs` second is mounted on `/run`, serving as a temporary filesystem for runtime files.  /run is tmpfs filesystem mounted on /run, typically used for storing temporary runtime files.

First filesystem is `/dev/mapper/rhel_10-root` filesystem. We see our main directory `17G` we used `6.7G` of it. These are actual files we use.
`/dev/mapper/rhel\_10-root` represents the root filesystem mounted on the root directory `/`. The `/dev/mapper/rhel_10-root` is a device-mapper device, often associated with LVM (Logical Volume Manager) setups. It points to the logical volume named "root" in the volume group "rhel\_10."
`/` represents the root filesystem mounted from the device /dev/mapper/rhel_10-root. It has a total size of 17GB, with 6.7GB used and 11GB available, resulting in a usage of 40%.

We can see `/dev/sda1` took `1G` from our disk for booting the system. Reserved files for boot. We boot our system there. It has certain files located the boot. Operating system uses it to boot up the system. /dev/sda1 is a physical partition on the first hard drive (`/dev/sda`). It is mounted on the `/boot` directory, containing essential files for the boot process.

Last `tmpfs` is mounted on `/run/user/1000` directory is a tmpfs filesystem mounted for the user with UID 1000. This can include user-specific temporary files, sockets, and other runtime information that is needed during the user session.

98 97 percent means file system is full which is critical.

When a filesystem is mounted, it means that the storage represented by that filesystem is made accessible. 
Storages are integrated into the overall directory structure of the operating system.

Each entry in the "filesystem" column identifies the type and source of the mounted filesystem. It can include various types such as physical partitions (`/dev/sd*`), device-mapper devices, network file systems (NFS), and more. Understanding these names helps to identify where the storage is coming from and how it is organized on the system.

We can also use df with -T option as df -T it will also show disk filesystem type.

```
[root@rhel-9-3 acs]# df -T
Filesystem               Type     1K-blocks    Used Available Use% Mounted on
devtmpfs                 devtmpfs      4096       0      4096   0% /dev
tmpfs                    tmpfs      1873884       0   1873884   0% /dev/shm
tmpfs                    tmpfs       749556   10152    739404   2% /run
/dev/mapper/rhel_10-root xfs       17756160 6978072  10778088  40% /
/dev/sda1                xfs         983040  490516    492524  50% /boot
tmpfs                    tmpfs       374776     112    374664   1% /run/user/1000
```

As we can see /dev/mapper/rhel_10-root and /dev/sda1 are using xfs file system.

### du

In case of a near full disk, we can use the du command to detect an excessively large file or directory.


We can use du / but it will list a lot of files which are not easy to read. WWe can use du -k /. -k like --block-size=1K (doesnt change anything) Still not erasy to read. 
We can use "du -kh / | sort -nr | more" by ignoring errors at first lines Also can use "du -k / 2>/dev/null | sort -nr | more". It redirects standard error (e.g., permission-denied errors) to /dev/null, so they are not shown in the output.

```
[root@rhel-9-3 acs]# du -k / 2>/dev/null | sort -nr | more
6676664 /
4213752 /usr
1850284 /var
1575432 /usr/share
1545208 /var/cache
1374460 /var/cache/PackageKit/9.3
1374460 /var/cache/PackageKit
1319096 /var/cache/PackageKit/9.3/metadata
1145392 /usr/lib64
1035356 /usr/lib
```


We can use check disk usage of a spesific directory as du -sh /path/to/directory
with -s: Summarize the total usage of the specified directory and -h: Human-readable format (e.g., KB, MB, GB).

```
[root@rhel-9-3 acs]# du -sh /usr/bin
209M    /usr/bin
```


To Check Disk Usage of All Subdirectories du -h /path/to/directory. This will list the disk usage of each subdirectory within /path/to/directory.

```
[root@rhel-9-3 acs]# du -h /home/acs/myscripts
4.0K    /home/acs/myscripts
```


Find Large Directories: we can use du -h /path/to/directory | sort -rh | head -n 10 with argument sort -rh sorting the output by size in human-readable format, in reverse order. head -n 10 showing the top 10 largest entries.

```
[root@rhel-9-3 acs]# du -h /var/log
0       /var/log/private
0       /var/log/samba/old
0       /var/log/samba
3.2M    /var/log/audit
12K     /var/log/sssd
0       /var/log/speech-dispatcher
12K     /var/log/cups
20K     /var/log/insights-client
268K    /var/log/rhsm
0       /var/log/gdm
32K     /var/log/tuned
0       /var/log/chrony
0       /var/log/qemu-ga
5.6M    /var/log/anaconda
28K     /var/log/httpd
14M     /var/log
```



```
[root@rhel-9-3 acs]# du -h / | sort -rh | head -n 10
du: cannot access '/proc/82632/task/82632/fd/4': No such file or directory
du: cannot access '/proc/82632/task/82632/fdinfo/4': No such file or directory
du: cannot access '/proc/82632/fd/3': No such file or directory
du: cannot access '/proc/82632/fdinfo/3': No such file or directory
du: cannot access '/run/user/1000/gvfs': Permission denied
6.4G    /
4.1G    /usr
1.8G    /var
1.6G    /usr/share
1.5G    /var/cache
1.4G    /var/cache/PackageKit/9.3
1.4G    /var/cache/PackageKit
1.3G    /var/cache/PackageKit/9.3/metadata
1.1G    /usr/lib64
1012M   /usr/lib
```

```
[root@rhel-9-3 acs]# du -h /var/log | sort -rh | head -n 10
14M     /var/log
5.6M    /var/log/anaconda
3.2M    /var/log/audit
268K    /var/log/rhsm
32K     /var/log/tuned
28K     /var/log/httpd
20K     /var/log/insights-client
12K     /var/log/sssd
12K     /var/log/cups
0       /var/log/speech-dispatcher
```


### Finding Large Files

To find large files specifically, we use the find command in combination with du.

To find Large Files (e.g., larger than 1 GB) we can use find /path/to/search -type f -size +1G Arguments -type f: Searches for files, -size +1G: Finds files larger than 1 GB.

```
[root@rhel-9-3 acs]# sudo find / -type f -size +1G
/proc/kcore
find: ‘/proc/82650/task/82650/fdinfo/6’: No such file or directory
find: ‘/proc/82650/fdinfo/5’: No such file or directory
find: ‘/run/user/1000/gvfs’: Permission denied
```



Find Large Directories in /var: sudo du -sh /var/* | sort -rh | head -n 10

```
[root@rhel-9-3 acs]#  sudo du -sh /var/* | sort -rh | head -n 10
1.5G    /var/cache
268M    /var/lib
18M     /var/tmp
14M     /var/log
20K     /var/spool
0       /var/yp
0       /var/www
0       /var/run
0       /var/preserve
0       /var/opt
```


```
[root@rhel-9-3 acs]# sudo find / -type f -size +100M 2>/dev/null
/boot/initramfs-0-rescue-8a1a5965061f45f38aa1d4c3d9847b01.img
/proc/kcore
/var/lib/rpm/rpmdb.sqlite
/var/cache/PackageKit/9.3/metadata/rhel-9-for-x86_64-appstream-rpms-9-x86_64/packages/firefox-115.13.0-3.el9_4.x86_64.rpm
/var/cache/PackageKit/9.3/metadata/rhel-9-for-x86_64-appstream-rpms-9-x86_64/packages/google-noto-serif-cjk-ttc-fonts-20230817-2.el9.noarch.rpm
/var/cache/PackageKit/9.3/metadata/rhel-9-for-x86_64-baseos-rpms-9-x86_64/packages/linux-firmware-20240219-143.el9.noarch.rpm
/usr/lib/locale/locale-archive
/usr/lib/locale/locale-archive.real
/usr/lib64/firefox/libxul.so
/usr/lib64/libLLVM-17.so
```

Using these commands, you can identify large files and directories and take action to free up disk space or manage storage more effectively.


### uptime and load average

```

[root@rhel-9-3 acs]# whatis uptime
uptime (1)           - Tell how long the system has been running.


[root@rhel-9-3 acs]# uptime
01:25:07 up  1:19,  3 users,  load average: 0.03, 0.03, 0.00

```

The information you provided indicates the system's uptime, which is the duration for which the system has been running since its last reboot. In this case the system has been up for 1 hour, 19 minutes. There are currently 3 users logged in. The load average values indicate the system's average workload over the last 1, 5, and 15 minutes, respectively. 

In this case, the load averages are 0.03, 0.03, and 0.00. These values represent a relatively low system load, suggesting that the system is not heavily loaded.
The load average, as displayed in the output you provided (0.03, 0.03, 0.00), represents the average number of processes in a runnable or uninterruptible state over a certain period of time. In Unix-like operating systems, including Linux, the load average is a measure of system activity.

The load average values are typically displayed for three different time intervals 1 minute, 5 minutes, and 15 minutes. Each value represents the average number of processes in the system's run queue over the specified time interval.

The load average is calculated as:

* 1-Minute Load Average: Represents the average number of processes in the system's run queue over the last 1 minute.
* 5-Minute Load Average: Represents the average number of processes in the run queue over the last 5 minutes.
* 15-Minute Load Average: Represents the average number of processes in the run queue over the last 15 minutes.

The "run queue" consists of processes that are ready to run or are currently executing. A high load average indicates that there are more processes competing for the CPU, potentially suggesting a higher workload on the system.

The load average is a useful metric for administrators to gauge the overall system activity and identify potential performance issues. It's important to note that the interpretation of load average values may vary based on the specific characteristics and capacity of the system. In general, a load average close to the number of available CPU cores is considered reasonable, while consistently high values may indicate a need for system optimization or additional resources.

If a system has slow response time. We can check it by using uptime. If load is high High Load Average (exceeding the number of CPU cores) zuggests that the system is under stress, and processes may be queuing up, waiting for available resources.

### top

```
[root@rhel-9-3 acs]# whatis top
top (1)              - display Linux processes
```

Again we see uptime and load average. We see systemd with its PID 1.

```
[root@rhel-9-3 acs]# top
top - 10:22:59 up 10:25,  3 users,  load average: 0.07, 0.03, 0.00
Tasks: 206 total,   1 running, 205 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   3659.9 total,    691.0 free,   1620.4 used,   1640.8 buff/cache
MiB Swap:   2048.0 total,   1692.8 free,    355.2 used.   2039.5 avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
   1137 apache    20   0 1439996  11092   3264 S   0.3   0.3   0:31.10 httpd
      1 root      20   0  175636  19388  10792 S   0.0   0.5   0:10.37 systemd
      2 root      20   0       0      0      0 S   0.0   0.0   0:00.08 kthreadd
      3 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 rcu_gp
      4 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 rcu_par_gp
      5 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 slub_flushwq
      6 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 netns
      8 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kworker/0:0H-
```


`top` lists the total number of tasks (processes and threads) currently being managed by the system.
Running tasks are tasks that currently being executed by the CPU. Sleeping tasks are in a sleep state, waiting for an event or a resource.
Stopped tasks are have been stopped (paused) by a signal or because they are being debugged. Zombie tasks are have completed execution but still have an entry in the process table because their parent process has not yet read their exit status.

`top` sorts processes by CPU usage. The process or thread using the most CPU time appears at the top of the list. `top -o %MEM`
We can see only `threads` when we open it with `-H` option or press `H` when its open. Multiple threads of the same process will have single `SHR` value because they share SHR (shared memory) are the same for threads within the same process because they share the same memory space.

```
[root@rhel-9-3 acs]# top -H
top - 11:14:49 up 11:17,  3 users,  load average: 0.00, 0.01, 0.00
Threads: 590 total,   1 running, 589 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.0 us,  0.2 sy,  0.0 ni, 99.8 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   3659.9 total,    687.1 free,   1624.3 used,   1640.7 buff/cache
MiB Swap:   2048.0 total,   1692.8 free,    355.2 used.   2035.6 avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
  83254 root      20   0  226472   4744   3596 R   1.0   0.1   0:00.07 top
   1144 apache    20   0 1571132   7960   3256 S   0.3   0.2   0:33.62 httpd
  82014 acs       20   0   19600   7424   5464 S   0.3   0.2   0:02.10 sshd
      1 root      20   0  175636  19388  10792 S   0.0   0.5   0:10.58 systemd
      2 root      20   0       0      0      0 S   0.0   0.0   0:00.08 kthreadd
      3 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 rcu_gp
      4 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 rcu_par_gp
      5 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 slub_flushwq
      6 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 netns
      8 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kworker/0:0H-events_highpri
     10 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 mm_percpu_wq
     12 root      20   0       0      0      0 I   0.0   0.0   0:00.00 rcu_tasks_kthre
     13 root      20   0       0      0      0 I   0.0   0.0   0:00.00 rcu_tasks_rude_
     14 root      20   0       0      0      0 I   0.0   0.0   0:00.00 rcu_tasks_trace
     15 root      20   0       0      0      0 S   0.0   0.0   0:26.54 ksoftirqd/0
     16 root      20   0       0      0      0 S   0.0   0.0   0:00.10 pr/tty0
     17 root      20   0       0      0      0 I   0.0   0.0   0:07.08 rcu_preempt
```

With `top -p 1144` we can only display apache process with its `PID 1144`. And there is only `1` process.

```
[root@rhel-9-3 acs]# top -p 1144
top - 11:24:58 up 11:27,  3 users,  load average: 0.01, 0.04, 0.01
Tasks:   1 total,   0 running,   1 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.0 us,  0.2 sy,  0.0 ni, 99.8 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   3659.9 total,    688.9 free,   1622.6 used,   1640.7 buff/cache
MiB Swap:   2048.0 total,   1692.8 free,    355.2 used.   2037.3 avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
   1144 apache    20   0 1571132   7960   3256 S   0.0   0.2   0:34.04 httpd
```

If we open its threads it has `69 threads`. Top displays them as PID's but they are actually TID's.

```
[root@rhel-9-3 acs]# top -p 1144 -H
top - 11:25:09 up 11:27,  3 users,  load average: 0.01, 0.04, 0.00
Threads:  69 total,   0 running,  69 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.0 us,  0.2 sy,  0.0 ni, 99.8 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   3659.9 total,    688.9 free,   1622.6 used,   1640.7 buff/cache
MiB Swap:   2048.0 total,   1692.8 free,    355.2 used.   2037.3 avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
   1138 apache    20   0 1571132   7960   3256 S   0.0   0.2   0:00.01 httpd
   1144 apache    20   0 1571132   7960   3256 S   0.0   0.2   0:34.00 httpd
   1145 apache    20   0 1571132   7960   3256 S   0.0   0.2   0:00.00 httpd
   1146 apache    20   0 1571132   7960   3256 S   0.0   0.2   0:00.00 httpd
   1147 apache    20   0 1571132   7960   3256 S   0.0   0.2   0:00.00 httpd
      ...

```

```
[root@rhel-9-3 acs]# pstree 1138
httpd───68*[{httpd}]

[root@rhel-9-3 acs]# pstree 1144
{httpd}
```

### ps

* Process status
* Just like top but top not shows all the processes only highest running.

```
man ps
ps
ps -ef
ps -ef | grep top
# open another terminal and run top
ps -ef | grep top
# it also grabs its running process.
```

### proc

`/proc` is a virtual filesystem that provides a view into kernel and process information. It does not actually store data on disk but rather provides real-time access to kernel data structures. Since /proc is a virtual filesystem, it exists `entirely in RAM`. The data presented in `/proc` is generated by the kernel on-the-fly and reflects the current state of the system.


We can list threads as below:

```
[root@rhel-9-3 acs]# ls /proc/1138/task/
1138  1147  1151  1155  1159  1163  1167  1172  1176  1180  1184  1215  1219  1223  1227  1231  1235  1239
1144  1148  1152  1156  1160  1164  1168  1173  1177  1181  1185  1216  1220  1224  1228  1232  1236
1145  1149  1153  1157  1161  1165  1169  1174  1178  1182  1186  1217  1221  1225  1229  1233  1237
1146  1150  1154  1158  1162  1166  1171  1175  1179  1183  1214  1218  1222  1226  1230  1234  1238
```

In Linux, the term `task` is used to represent both processes and threads. The kernel uses the term "task" to unify the concept of processes and threads because both are essentially units of execution within the system. In the Linux kernel, a task refers to an entity that can be scheduled for execution. This includes both processes and threads. A task encompasses all the attributes needed for scheduling and managing execution, such as CPU state, memory allocation, and scheduling information.
In the Linux kernel, the task structure (struct task_struct) is used to represent both processes and threads. This structure contains all necessary information to manage a task, whether it's a standalone process or a thread within a process. The scheduler in the kernel treats processes and threads as tasks, which simplifies the scheduling algorithms and resource management. 


We can use ps with -e -L and -f options and grep processid 1138.

```
[root@rhel-9-3 acs]# ps -eLf | grep 1138
apache      1138    1042    1138  0   69 Jul17 ?        00:00:00 /usr/sbin/httpd -DFOREGROUND
apache      1138    1042    1144  0   69 Jul17 ?        00:00:34 /usr/sbin/httpd -DFOREGROUND
apache      1138    1042    1145  0   69 Jul17 ?        00:00:00 /usr/sbin/httpd -DFOREGROUND
apache      1138    1042    1146  0   69 Jul17 ?        00:00:00 /usr/sbin/httpd -DFOREGROUND
apache      1138    1042    1147  0   69 Jul17 ?        00:00:00 /usr/sbin/httpd -DFOREGROUND
```


We can use proc as `cat /proc/<PID>/task/<TID>/status` to display detailed information about thread.

```
[root@rhel-9-3 acs]# cat /proc/1138/task/1147/status
Name:   httpd
Umask:  0022
State:  S (sleeping)
Tgid:   1138
Ngid:   0
Pid:    1147
PPid:   1042
TracerPid:      0
Uid:    48      48      48      48
Gid:    48      48      48      48
FDSize: 64
Groups: 48
NStgid: 1138
...
```

### free


```
free displays the total amount of free and used physical and swap memory in the system, as well as the buffers
and caches used by the kernel. The information is gathered by parsing  /proc/meminfo.
```

```
[acs@rhel-9-3 ~]$ whatis free
free (3)             - allocate and free dynamic memory
free (1)             - Display amount of free and used memory in the system
free (3p)            - free allocated memory
```

```
[acs@rhel-9-3 ~]$ free
               total        used        free      shared  buff/cache   available
Mem:         3747536     1364364     1641468       20352      997852     2383172
Swap:        2097148           0     2097148
```

-m, --mebi displays the amount of memory in mebibytes.

```
[acs@rhel-9-3 ~]$ free -mh
               total        used        free      shared  buff/cache   available
Mem:           3.6Gi       1.3Gi       1.6Gi        19Mi       976Mi       2.3Gi
Swap:          2.0Gi          0B       2.0Gi
```

* In oracle virualbox we gave 4096 MB = 4G memory. "Mem:" . 3.6GB close to 4GB.  The difference in allocated memory on a virtual machine is indeed more likely to be influenced by virtualization mechanisms, hypervisor overhead, guest operating system requirements, and other factors specific to the virtualization environment.

### lsof


### kill

* If a process is not stopping gracefully.

```
kill 34440
# gone.
# not getting killed force kill
kill -9 34440
```




## 3. Details

When an operating system boots up many programs get loaded into system memory. These programs need to be managed and monitored because they consume mainly three system resources like CPU, memory and disk space. Generally a monitoring system such as PRTG used for creating alerts for servers.

### Processes

Processes are general instances of programs running on the system. Processes are any running instances of code. Processes are programs from the perspective of operating system.
Each process has its own memory space and CPU time along with its process id. There could be one process for a service or program or there could be many.

* All daemons are processes, but not all processes are daemons.
* Services are a specific way to manage well-defined daemons within systemd.

A daemon is a background process that runs continuously, usually providing specific services. 
Daemons often start during the system boot and operate independently of user interactions. Daemons exist in disk as executable files in /usr/sbin/, configuration in /etc. They are resident in memory as long-running processes.

Systemd is a daemon process with PID 1. During system startup, the Linux kernel launches systemd as the first process. This gives it special privileges and allows it to control the boot process and manage other processes. Systemd has a process identifier (PID) of 1, signifying its fundamental role. Systemd is responsible for starting, stopping, and monitoring other processes on the system. It uses configuration files (systemd units) to manage services.

Systemd doesn't have a single, standalone binary file like most user-space programs. Its functionality is implemented in a collection of libraries and kernel modules. These modules are loaded by the kernel during boot, and they work together to manage services, processes, and the system state. 

systemd (Init system) also another units than services such as sockets and targets. Unit files are plain text files written in an INI-style format with sections and directives. They provide a standardized way to define how systemd should handle various system resources. Essentially, systemd units act as a blueprint for systemd to manage processes and resources. While the unit files themselves aren't processes, they orchestrate the creation and management of processes needed to fulfill their defined functionalities. systemd units can be services, sockets, targets, mount points, swap files, startup targets., and are configured with files in /etc/systemd/system/ or /usr/lib/systemd/system/.

For each service service management and logs are managed by journalctl and systemctl. Their unit file is  /etc/systemd/system/<service-name>.service. Their binary and config file locations may vary but executable commonly under /usr/sbin/<service-name>  and their config file is /etc/<service-name>/<service>_config.

```
For service sshd:
Service unit file: /etc/systemd/system/sshd.service
Service binary file: /usr/sbin/sshd
Service configuration file: /etc/ssh/sshd_config
Service log : journalctl (also journalctl)
Service management : systemctl
```

We see config files are under /etc short for et cetera since it is the main folder contains system-wide configuration files. /etc typically stores configuration files for system daemons, network configurations, and other system settings. System wide configuration files such as passwd,shadow,fstab or sysctl.conf are directly under etc.  Binaries are under /usr. /usr stands for "Unix System Resources." Historically, it held user-accessible programs, utilities, and libraries that are not essential for the system to boot or run. This directory holds most of the user programs and utilities used on a daily basis. We can think of it as the "main library" for user-land applications. bin meaning binary contains essential executable programs for user tasks. sbin is system binary folder for executable programs for system administration tasks, often requiring root privileges (e.g., mount, fdisk). Lib Stores libraries used by user applications. And shared contains resources like documentation, icons, and fonts. /var directory stores variable data that changes during system operation. /var/log may hold critical system and application logs.

The vast majority of daemons in RHEL 9 are managed by systemd and regarded as services. We can use the systemctl command to start, stop, enable, or disable these services. Services will typically have unit files located in the /etc/systemd/system directory. (e.g. /etc/systemd/system/sshd.service)

Many modern Linux distributions use the systemd journal for service logs. We can view the SSH logs using the journalctl command with appropriate filters such as journalctl -u sshd . Some older distributions or custom configurations might store the SSH logs in a separate file. The typical location for this type of files is under /var.

Generally services have their own dedicated configuration directories located within the /etc directory structure. For example:
/etc/apache2/ for Apache web server configuration. /etc/mysql/ for MySQL database server configuration. /etc/php/ for PHP configuration (depending on the installation method).

Additionally /usr/lib/systemd/system/  directory might contain pre-installed unit files for system services provided by various packages.
/etc/systemd/user/ (For user-specific services)  directory can hold unit files for services specific to a particular user. These have higher priority than system-wide unit files for the same service name. Systemd might create temporary unit files under  /run/systemd/system/ (Temporary/runtime)  at runtime to override service behavior for the current boot session.

You can use the systemctl list-unit-files command to view all systemd unit files.  To find a specific service file, you can use the grep command along with the service name (e.g., systemctl list-unit-files | grep sshd).


As less Common (Legacy) way a small number of daemons might still use SysVinit scripts. We can usually interact with these using the /etc/init.d/<daemon_name> script (e.g., /etc/init.d/httpd for the Apache web server).

A very small number of daemons might be standalone and launch themselves without relying on an init system. While systemd is the dominant init system in RHEL 9, there are a few rare cases where daemons might be standalone and launch themselves at boot without relying on systemd or SysVinit scripts. 

A service can be seen as a specific type of process with controlled behavior. In RHEL9 services are special category of daemons which managed as services by the init system (systemd). Proceses more of an their instance or implementation on current running system.  These are special types of daemons (background processes) that are managed by systemd. They have specific startup/shutdown behavior and can be controlled (start, stop, restart) using tools like systemctl.

For example sshd executable is typically located at /usr/sbin/sshd. sshd daemon handles the core functionality of secure shell access. During the boot systemd locates the unit file for sshd, typically located at /etc/systemd/system/sshd.service. This file defines how to manage the sshd service. It is managed by systemd. We can use the systemctl command to start, stop, enable, or disable the ssh service. The main configuration file for sshd is located at /etc/ssh/sshd_config. This file allows us to customize various aspects of the ssh server, such as allowed authentication methods, port number, and logging options.

Another example could be Crony, which is the default NTP (Network Time Protocol) client in RHEL 9, is also managed by systemd.
During boot, systemd starts essential services, including locating the unit file for chrony. systemd finds the unit file for chrony, typically at /etc/systemd/system/chrony.service. This file defines how to manage the chrony service. Based on the unit file configuration, systemd initiates the chrony service. 
Allocates resources (memory, CPU) for the chrony process and starts the /usr/sbin/chrony executable, which is the actual chrony daemon program.
We can configure chrony's behavior and time servers through the /etc/chrony.conf file.

We can categorize processes whether they are short lived or long lived.  Commands such as cat command and utilities we use could be considered as short-lived processes. Their executables initiated by shell.

The executables for command line utilities in RHEL 9 are typically located in various directories depending on the package that provides the utility. Typical locations are:

* /bin: This directory contains essential command line utilities used for basic system administration and functionality. Examples include cat, ls, cp, mv, grep, etc.

* /sbin: This directory contains utilities with administrative privileges typically used by root users for system management tasks. Examples include fdisk, mount, umount, reboot, etc.

* /usr/bin: This directory houses a vast collection of command line utilities for various purposes. These could be utilities included in core system packages or those installed through additional packages.  Examples include ping, ssh, tcpdump, tar, wget, etc.

* /usr/sbin: Similar to /sbin, this directory contains administrative utilities but often associated with specific packages rather than core system functionality.  Examples include utilities for managing web servers (e.g., /usr/sbin/apachectl), databases (e.g., /usr/sbin/mysqld), or other services.

* Package-Specific Directories: Some packages install their utilities in their own directories within the /usr hierarchy.  For instance, the vim text editor might have its executable located at /usr/bin/vim. We can often find the location of an executable by using the which command followed by the utility name (e.g., which vim).


We can use the which or locate command followed by the utility name (e.g., which ls). Documentation for the specific utility such as man or info pages often mentions the installation location.

The primary purpose of a shell process is providing an interactive environment for users to execute commands. Some limited scenarios might involve shell scripts or daemon interaction, but these are not the primary use cases. Shell as a program doesn't manage sessions either operating system kernel, login process, and tools like systemd (init system) are responsible for creating sessions, assigning process groups, and managing overall session lifecycles.  Shells can contribute to session management by offering job control features (managing child processes) and recording command history within the session. Also a system administrators might use shell scripts to interact with system along with interacting session management tools in specific ways.

Shell we use (like bash or zsh) has its own binary executable file. This binary file contains the compiled code that defines the shell's functionality.
systemd (the init system in RHEL 9) doesn't directly manage the shell itself, it might be involved in launching the login process that ultimately starts the shell binary. Each shell has its own binary executable (e.g., /bin/bash for bash). When we log in to system through a graphical login manager (like GDM) or a virtual terminal (text-based console), the login process typically launches a specific shell binary. The default shell for your user account is defined in system configuration files (usually /etc/passwd). For example, if our default shell is bash, the login process might execute /bin/bash to start our interactive shell session.

The login process or the sh command (or specific shell binary name) initiates shell sessions.
New shell sessions subshells are instances launched within an existing shell session.  For example, typing bash in our terminal starts a new subshell instance of the bash shell. This subshell inherits the environment variables and settings from the parent shell.

The terminal program acts as a user interface, displaying the shell prompt and any output from the commands we run. Common terminal emulators like gnome-terminal, xterm, etc. It provides a way for us to interact with the shell process. shells like bash, zsh, etc. In the case of sshd (secure shell daemon), it establishes a secure connection with a remote user. This user interacts with a shell process spawned by sshd, similar to a local terminal. However, the communication and output travel over the network connection established by sshd. On the remote machine, the sshd daemon listens for incoming connections on port 22 (default SSH port). Once a connection is established, sshd creates a new child process to handle that specific session.


```
[spiderman@rhel-9-3 ~]$ w
 01:18:13 up  1:20,  3 users,  load average: 0.07, 0.02, 0.00
USER           TTY       LOGIN@   IDLE   JCPU   PCPU WHAT
spiderman      seat0     23:57    0.00s  0.00s  0.03s /usr/libexec/gdm-wayland-session --register-session gnome-session
spiderman      tty2      23:57    1:20m  0.18s  0.15s /usr/libexec/gnome-session-binary
spiderman      pts/0     23:59    4.00s  0.24s  0.00s w
```

In the output above TTY is the Teletype (terminal) identifier where the user is logged in. seat0 likely refers to a graphical session using Wayland (a display server protocol). tty2 is a virtual terminal (text-based console). pts/0 is a pseudo-terminal, often used for remote logins through SSH.
WHAT is the process the user is currently running.
 
When we type a command in our terminal (e.g., ls).
Shell as a process running in the background captures our command. The shell parses the command, identifying the command name (e.g., ls) and any arguments (e.g., -l for detailed listing). The shell searches its search path (directories like /bin, /usr/bin) for the executable associated with the command name (e.g., /bin/ls). After that the shell performs a critical operation called "fork and exec".
It creates a copy (fork) of itself, resulting in two processes: parent shell and child process.
Parent Shell is the original shell process continues to wait for further user input.
Child Process is the new process takes ownership of the command execution.
In Exec (Execute) phase the child process replaces its own code with the code of the executable it found (e.g., /bin/ls). Essentially, the child process "transforms" into the program we want to run.

The child process now has the code and resources to execute the program (e.g., list directory contents for ls).
The program performs its task and generates any output (e.g., list of files for ls). The program's output is sent back to the parent shell process (the original shell we interacted with). Once the program finishes its task, the child process exits. The parent shell process receives the program's output (if any) and displays it on the terminal window. The parent shell process is now back in the foreground, waiting for our next command. It hasn't "turned itself again" but has remained active, ready to accept further input.


```
Executable Code (binary files)
   |
   +-- Processes
         |
         +-- Short-lived Processes (e.g., cat command, utilities, shell commands)
         +-- Long-running Processes
               |
               +-- Daemons (Background Processes thet run continiously)
               |     |
                     +-- Services (managed by init system (systemd))  (e.g., sshd (secure shell server))
                     +-- ... (other daemons) crond
               +-- Non-daemon Long-running Processes
                     |                        
                     +-- User-launched Background Jobs (e.g., compiling code)
                     +-- Automatically Launched Applications (e.g., GUI apps)
                     +-- Interactive Applications (e.g., text editors like Vim)
                     +-- Batch Processing (e.g., video encoding)
                     +-- Server-Side Applications (e.g., Apache)
                     +-- User-Initiated Long Tasks (e.g., large file download)
                     +-- Cron Jobs (e.g., scheduled backups)

```


The kernel is a core program that manages hardware resources and provides an interface for user-space processes.
Kernel doesnt have traditional sense of user-space processes that we can manage and interact with.
However, the kernel does have components that behave similarly to processes. Such as:
* Kernel Threads: Lightweight threads that execute within the kernel space. They are not directly user-managed but handle tasks like memory management (kswapd).
* Device Drivers: Programs that interact with hardware devices and can be seen as handling specific hardware-related tasks.
* Interrupt Handlers: Respond to hardware events (e.g., timer interrupts) and trigger necessary actions within the kernel.
* System Calls : Interface for user-space processes.

### Threads

Threads and processes are both essential constructs in modern operating systems, and they serve different purposes
Process is an independent program in execution with its own memory space, file descriptors, and resources.
Processes are isolated from each other, meaning they do not share memory or resources directly.
Creating and managing processes involves more overhead compared to threads, due to the need for separate memory space and resources.

A thread is a lightweight unit of execution within a process. Threads within the same process share the same memory space but have their own execution contexts.
Threads share resources like memory and file descriptors with other threads in the same process, making them more efficient in terms of memory and resource usage. Creating and managing threads is generally less resource-intensive compared to processes.
Using threads, the web server can handle multiple requests simultaneously within a single process, sharing resources like memory and file descriptors, and achieving better performance.

In a single-core processor system, the CPU can only execute one thread at a time. However, modern operating systems use multitasking techniques to manage multiple threads, even on a single-core processor. Such as time slicing and context switching. In case of time slicing the operating system uses a technique called time slicing to switch between threads. The CPU allocates a small time slice to each thread or process, rapidly switching between them to create the illusion of simultaneous execution.
Context Switching: When switching from one thread to another, the operating system performs context switching. This involves saving the state of the current thread and loading the state of the next thread.

A thread, which is the smallest unit of execution within a process, contains several components:

* `Thread ID`: A unique identifier for the thread.
* `Program Counter (PC)`: Keeps track of the next instruction to execute for the thread.
* `Stack`: Each thread has its own stack, which contains local variables, function calls, and return addresses.
* `Registers`: Includes general-purpose registers and other CPU registers specific to the thread’s execution.
* `Thread-Specific Data`: Information that is unique to the thread, such as thread-local storage or thread-specific variables.
* `State`: The current state of the thread, such as running, ready, blocked, or terminated.
* `Priority`: The priority of the thread, which can influence its scheduling and execution order relative to other threads.

### Executing Context

Execution Context is the state of a thread or process, including its registers, stack, program counter, and memory management information, that is needed to resume execution.

Operating system uses execution context to keep track of a thread’s or process's state during execution. It includes everything needed to resume execution later.
Execution context has:

* `Registers`: The values stored in CPU registers, including general-purpose registers, program counter (PC), and stack pointer (SP). These registers hold intermediate data and execution instructions.
* `Program Counter (PC)`: The address of the next instruction to execute.
* `Stack Pointer (SP)`: Points to the top of the current stack, which holds local variables, function parameters, and return addresses.
* `Thread Local Storage`: Data that is specific to the thread and not shared with other threads.
* `Memory Management Information`: Information about the memory allocated to the thread, including base and limit registers or page tables.
* `File Descriptors and I/O Information`: Open files and input/output operations associated with the thread.
* `Thread-Specific Data`: Any other data specific to the thread, such as its state (running, blocked, etc.) and priority.

When a context switch occurs (i.e., switching from one thread to another) The operating system saves the current execution context of the running thread, including register values, program counter, and stack pointer.Then the operating system loads the execution context of the new thread, restoring its register values, program counter, and stack pointer. The CPU resumes execution from the point where the new thread left off.

### Asembly Code

Assembly code operates at a low level and interacts directly with the hardware. Assembly language instructions often operate directly on CPU registers. For example, an instruction might move data into or out of a register, perform arithmetic operations, or compare values using registers.
egisters are part of the execution context. When the system performs a context switch between threads, it saves and restores the values in these registers. Assembly instructions work with the data stored in these registers.

The program counter holds the address of the next instruction to execute. Assembly instructions are executed sequentially unless altered by branching instructions (e.g., jmp, call, ret). The program counter is a critical component of the execution context. During a context switch, the current program counter value is saved so that execution can resume from the correct point later.

The stack is used for storing local variables, function parameters, return addresses, and managing function calls and returns. Assembly code frequently uses stack-related instructions (e.g., push, pop, call, ret) to manage stack data. Each thread has its own stack, which is part of the execution context. The stack pointer is used to keep track of the top of the stack, and its value is saved and restored during context switches.

Assembly instructions can directly address and manipulate memory. Instructions like mov can read from or write to specific memory addresses.
The memory management information in the execution context includes details about the memory space allocated for the thread. This includes page tables and memory addresses relevant to the thread's execution.

Assembly code can use thread-local storage and other thread-specific data if supported by the operating system and processor.
Thread-specific data is part of the execution context, ensuring that each thread’s unique data is preserved across context switches.


```
section .data
    var db 0       ; Define a byte of data

section .bss
    buffer resb 64 ; Reserve 64 bytes of uninitialized data

section .text
    global _start
_start:
    mov eax, 1     ; System call number for exit
    mov ebx, 0     ; Exit code 0
    int 0x80       ; Call kernel
```

In this code snippet registers eax and ebx are used to pass arguments to the system call.
Program counter advances through instructions in the .text section.
Function calls (if present) would involve pushing and popping values to/from the stack. And var and buffer are memory locations defined in different sections.

Programs are typically written in high-level languages like C, C++, or Python. The source code is designed to be understandable by humans. A compiler translates the high-level source code into assembly code or machine code, depending on its stage.  Often, the compiler first translates the source code into an intermediate representation (e.g., LLVM IR for LLVM-based compilers) or directly into assembly code. 

An assembler translates assembly code into machine code. Assembly code is a human-readable representation of machine instructions. This is the binary representation of the instructions that the CPU executes. It consists of a series of binary digits (0s and 1s) that the CPU can decode and execute.

The linker combines object files (machine code) and libraries into a single executable file. It resolves references between different code modules and libraries, linking them into a cohesive program. The output of the linking process is an executable file (e.g., .exe on Windows, or ELF on Linux) that can be run by the operating system.

Execution of Binary Code. The operating system loader loads the executable file into memory. It sets up the process’s memory space and prepares the binary code for execution.
The CPU executes the binary code directly. The binary code is not read as assembly code by the CPU; instead, it is interpreted as machine instructions.
The CPU uses its ISA (Instruction Set Architecture) to decode and execute the machine code instructions.

On Linux, there are several tools that allow you to view and analyze the instructions and memory of basic C programs. These tools help us understand how your code is translated into machine instructions and how it interacts with memory. 

There are  objdump is used to display information about binary files. You can use it to disassemble a binary file and view the machine instructions.
This command disassembles the executable file your_program and displays the machine instructions.

```
objdump -d ./your_program
```

gdb is a powerful debugger that allows you to inspect the execution of a program, including viewing instructions and memory.


```
gdb ./your_program
```

Withing gdb Disassemble: To view the assembly instructions for a function or code segment. 

```
(gdb) disassemble /m
```

Within gdb Examine Memory To view memory contents.

```
(gdb) x/16x 0xaddress
```

hexdump provides a way to view the binary contents of files in hexadecimal and ASCII formats.

```
hexdump -C ./your_program
```

This command displays the hexadecimal and ASCII representation of the file your_program.

readelf is used to display information about ELF (Executable and Linkable Format) files. It can be used to inspect various sections of the executable.

```
readelf -a ./your_program
```

This command displays detailed information about the ELF file, including sections, symbols, and more.

`strace` traces system calls made by a program and can be useful for understanding how a program interacts with the system.

```
strace ./your_program
```

This command shows the system calls and signals used by your_program.


Compile Your C Program: Compile with debugging information enabled:

```
gcc -g -o your_program your_program.c
```

Disassemble the Program: Use objdump to view the assembly instructions:

```
objdump -d ./your_program
```

Debug and Inspect: Start gdb to set breakpoints, step through the code, and inspect memory:

```
gdb ./your_program
```

Inside gdb, you can disassemble code and examine memory:

```
(gdb) disassemble /m
(gdb) x/16x 0xaddress
```

Examine Binary Content: Use hexdump to view raw binary data:

```
hexdump -C ./your_program
```
