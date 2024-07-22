---
layout: post4
page_name: "Network Configuration"
title: "Network Configuration"
---

Lorem ipsum dolor sit amet, consecteur adipiscing elit. Maecenas hendrerit a odio et mattis. Sed ultricies dui ut sem ultrices tempus. Aenean sed nisi ac ipsum viverra lacinia at eget mi. Integer at mass.

## Table Of Contents

1. Command List
2. Walkthrough
3. Details

## 1. Command List


* List information about the operating system, such as the name, version, and distribution.

```
cat /etc/os-release
```

* List information about the operating system, such as the name, version, and distribution.

```
cat /etc/redhat-release
```

* List information about the kernel, including the name, version, hostname, and architecture.

```
uname -a
```

* List a subset of uname -a command, including the hostname, operating system name, and kernel release.

```
uname -nsro
```

Displays the hostname of the system.

```
hostname
```

Sets the hostname of the system.

```
hostname-ctl set-hostname pparker.oscorp.com
```

Displays information about network devices managed by NetworkManager.

```
ip addr
```

Displays information about network devices managed by NetworkManager.

```
nmcli device
```

Sets ipv4 address with prefix.

```
nmcli connection modify enp0s3 ipv4.address 10.253.121/24
```

Sets gateway.

```
nmcli connection modify enp0s3 ipv4.gateway 10.253.1.1
```

Sets static. This method can be set to either manual or dhcp.

```
nmcli connection modify enp0s3 ipv4.method manual
```

Sets primary DNS.

```
nmcli connection modify enp0s3 ipv4.dns 8.8.8.8
```

Restarts the interface enp0s3.

```
nmcli connection down enp0s3 && nmcli connection enp0s3 up
```

Similar to the ip addr command, but it only displays information for the network interface named enp0s3.

```
ip address show enps3
```

Edits conf for a specific network interface. Give line each, IPADDR,PREFIX,GATEWAY,DNS1.

```
vi etc/sys/config/network-scripts/ifcfg-<interface>
```

Displays the default route for the system. 

```
ip route show default
```

Restarts the NetworkManager service. 

```
systemctl restart NetworkManager
```

Sends a ping request to the host with the IP address 8.8.8.8, which is a public DNS server operated by Google.

```
ping 8.8.8.8
```

Attempts telnet connection to the host with the IP address 10.55.3.100 on port 2022. 

```
telnet 10.55.3.100 -p 2022
```

Attempts SSH connection to the host with the IP address 10.253.1.55 and as the user.

```
ssh spiderman@10.253.1.55
```

Displays information about active network connections on the system. Relies on the live state of the system.

```
netstat -antp | grep ':80/tcp
```

Searches the file /etc/services for lines that contain the string 80/tcp. Doesn't show any live connection details.

```
grep -w '80/tcp' /etc/services
```

## Walktrough

Bu bölümde temel network konfigürasyonu ve sunucunun temel kontrollerine değineceğiz.

## Table Of Contents
1. İşletim Sistemini Kontrol Etmek
2. Hostname Verilmesi
3. Hızlı Kontroller
3. Sunucunun Network Kontrolü
4. Problemlerin Troubleshoot Edilmesi
5. Sunucuya IP Verilmesi
6. Ek
   * Aynı Interface'e İkinci Bir IP
   * Bonding ve Teaming
   * DHCP Konfigürasyonu
   * Ek Network Komutları
   * Network Dosyaları
   * Paket Akış Kontrolü
   * Konsol, Telnet ve SSH
   * Network Scripts Dizini
   * VirtualBox Detayları
   

## 1. İşletim Sistemini Kontrol Etmek

İşletim sisteminin versiyonunu kontrol edelim.

Bunun için aşağıdaki dört komutu kullanabiliriz.

```
cat /etc/os-release

cat /etc/redhad-release

uname -a

uname -nsro
```

Çıktılar:

```
[acs@rhel-9-3 ~]$ cat /etc/os-release
NAME="Red Hat Enterprise Linux"
VERSION="9.3 (Plow)"
ID="rhel"
ID_LIKE="fedora"
VERSION_ID="9.3"
PLATFORM_ID="platform:el9"
PRETTY_NAME="Red Hat Enterprise Linux 9.3 (Plow)"
ANSI_COLOR="0;31"
LOGO="fedora-logo-icon"
CPE_NAME="cpe:/o:redhat:enterprise_linux:9::baseos"
HOME_URL="https://www.redhat.com/"
DOCUMENTATION_URL="https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9"
BUG_REPORT_URL="https://bugzilla.redhat.com/"

REDHAT_BUGZILLA_PRODUCT="Red Hat Enterprise Linux 9"
REDHAT_BUGZILLA_PRODUCT_VERSION=9.3
REDHAT_SUPPORT_PRODUCT="Red Hat Enterprise Linux"
REDHAT_SUPPORT_PRODUCT_VERSION="9.3"
```

```
[acs@rhel-9-3 ~]$ cat /etc/redhat-release
Red Hat Enterprise Linux release 9.3 (Plow)

[acs@rhel-9-3 ~]$ uname -a
Linux rhel-9-3.cagri.sh 5.14.0-362.24.1.el9_3.x86_64 #1 SMP PREEMPT_DYNAMIC Thu Feb 15 07:18:13 EST 2024 x86_64 x86_64 x86_64 GNU/Linux

[acs@rhel-9-3 ~]$ uname -nsro
Linux rhel-9-3.cagri.sh 5.14.0-362.24.1.el9_3.x86_64 GNU/Linux
```

Burada özellikle kernel versiyonumu görmemşz önemli.

## 2. Hostname Verilmesi

```
[acs@rhel-9-3 ~]$ hostname
rhel-9-3.cagri.sh

[acs@rhel-9-3 ~]$ hostname-ctl set-hostname pparker.oscorp.com
```

Hostname'i bilgisayar ismi domain ve domain uzantısı şeklinde verebiliriz. Burda spiderman referansları kullandık.
Peter Parker Oscorp'da çalışıyor olsun.

## 3. Hızlı Kontroller

Cihazın sistem tarihini öğrenelim.

```
acs@rhel-9-3 ~]$ date
Thu Jul 18 01:12:07 AM +03 2024

acs@rhel-9-3 ~]$ timedatectl
               Local time: Thu 2024-07-18 01:25:27 +03
           Universal time: Wed 2024-07-17 22:25:27 UTC
                 RTC time: Wed 2024-07-17 22:25:27
                Time zone: Europe/Istanbul (+03, +0300)
System clock synchronized: yes
              NTP service: active
          RTC in local TZ: no

[acs@rhel-9-3 ~]$ chronyc tracking
Reference ID    : A29FC87B (time.cloudflare.com)
Stratum         : 4
Ref time (UTC)  : Wed Jul 17 22:25:33 2024
System time     : 0.000310557 seconds slow of NTP time
Last offset     : -0.000047714 seconds
RMS offset      : 0.000635247 seconds
Frequency       : 20.474 ppm slow
Residual freq   : +0.003 ppm
Skew            : 0.139 ppm
Root delay      : 0.061825566 seconds
Root dispersion : 0.000690955 seconds
Update interval : 1044.2 seconds
Leap status     : Normal
```

Güncel değilse değiştirmeyi düşünebiliriz. Güncel ve NTP'nin aktif olduğunu görüyoruz.

Ne kadar süredir açık olduğuna bakmak için uptime komutuna bakalım.

```
[acs@rhel-9-3 ~]$ uptime
 01:18:46 up  1:21,  3 users,  load average: 0.04, 0.01, 0.00
```

Gördüğümüz üzere sistem 1 saat, 17 dakika, 46 saniyedir açık. 3 kullanıcı bağlı.
Bağlantıları görmek için w komutunu kullanabiliriz.

```
[acs@rhel-9-3 ~]$ w
 01:18:13 up  1:20,  3 users,  load average: 0.07, 0.02, 0.00
USER     TTY        LOGIN@   IDLE   JCPU   PCPU WHAT
acs      seat0     23:57    0.00s  0.00s  0.03s /usr/libexec/gdm-wayland-session --register-session gnome-session
acs      tty2      23:57    1:20m  0.18s  0.15s /usr/libexec/gnome-session-binary
acs      pts/0     23:59    4.00s  0.24s  0.00s w
```

Gördüğümüz üzere gnome haricinde yalnızca bir kullanıcımız var.
Cihazın kaynak kullanımında herhangi bir problem yaşayıp yaşamadığına bakalım.

```
[root@rhel-9-3 home]# du -sh * | sort -hr
107M    acs
16K     tom
```


```

[acs@rhel-9-3 ~]$ sudo fdisk -l
Disk /dev/sda: 20 GiB, 21474836480 bytes, 41943040 sectors
Disk model: VBOX HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x298e76cb

Device     Boot   Start      End  Sectors Size Id Type
/dev/sda1  *       2048  2099199  2097152   1G 83 Linux
/dev/sda2       2099200 41943039 39843840  19G 8e Linux LVM


Disk /dev/sdb: 2 GiB, 2147483648 bytes, 4194304 sectors
Disk model: VBOX HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x27fad86c

Device     Boot Start     End Sectors Size Id Type
/dev/sdb1        2048 4194303 4192256   2G 8e Linux LVM


Disk /dev/mapper/rhel_10-root: 17 GiB, 18249416704 bytes, 35643392 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


Disk /dev/mapper/rhel_10-swap: 2 GiB, 2147483648 bytes, 4194304 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


Disk /dev/mapper/test_vg-test_lv: 1.86 GiB, 1992294400 bytes, 3891200 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
```

Yine df -al ile disk kullanımını dosya sistemleri ile görebilirim.

```
[acs@rhel-9-3 ~]$ df -al
Filesystem               1K-blocks    Used Available Use% Mounted on
proc                             0       0         0    - /proc
sysfs                            0       0         0    - /sys
devtmpfs                      4096       0      4096   0% /dev
securityfs                       0       0         0    - /sys/kernel/security
tmpfs                      1873884       0   1873884   0% /dev/shm
devpts                           0       0         0    - /dev/pts
tmpfs                       749556    9364    740192   2% /run
cgroup2                          0       0         0    - /sys/fs/cgroup
pstore                           0       0         0    - /sys/fs/pstore
bpf                              0       0         0    - /sys/fs/bpf
/dev/mapper/rhel_10-root  17756160 6187948  11568212  35% /
selinuxfs                        0       0         0    - /sys/fs/selinux
systemd-1                        -       -         -    - /proc/sys/fs/binfmt_misc
hugetlbfs                        0       0         0    - /dev/hugepages
mqueue                           0       0         0    - /dev/mqueue
debugfs                          0       0         0    - /sys/kernel/debug
tracefs                          0       0         0    - /sys/kernel/tracing
fusectl                          0       0         0    - /sys/fs/fuse/connections
configfs                         0       0         0    - /sys/kernel/config
none                             0       0         0    - /run/credentials/systemd-tmpfiles-setup-dev.service
none                             0       0         0    - /run/credentials/systemd-sysctl.service
/dev/sda1                   983040  413088    569952  43% /boot
none                             0       0         0    - /run/credentials/systemd-tmpfiles-setup.service
binfmt_misc                      0       0         0    - /proc/sys/fs/binfmt_misc
tmpfs                       374776     108    374668   1% /run/user/1000
gvfsd-fuse                       0       0         0    - /run/user/1000/gvfs
```

CPU ve memory kullanımına bakalım.

```
[acs@rhel-9-3 ~]$ top
top - 01:23:36 up  1:26,  3 users,  load average: 0.00, 0.00, 0.00
Tasks: 204 total,   1 running, 203 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   3659.9 total,    219.0 free,   1538.8 used,   2152.6 buff/cache
MiB Swap:   2048.0 total,   2046.2 free,      1.8 used.   2121.1 avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
   2841 root      20   0  225728    728    516 S   0.3   0.0   0:00.27 gpg-agent
      1 root      20   0  172564  16840  10988 S   0.0   0.4   0:03.25 systemd
      2 root      20   0       0      0      0 S   0.0   0.0   0:00.05 kthreadd
      3 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 rcu_gp
      4 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 rcu_par_gp
      5 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 slub_flushwq
      6 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 netns
      8 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kworker/0:0H-events_highpri
     10 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 mm_percpu_wq
     11 root      20   0       0      0      0 I   0.0   0.0   0:02.28 kworker/u4:1-events_unbound
     12 root      20   0       0      0      0 I   0.0   0.0   0:00.00 rcu_tasks_kthre
     13 root      20   0       0      0      0 I   0.0   0.0   0:00.00 rcu_tasks_rude_
...
```

Bağlantıları kontrol ediyorum.

```
[acs@rhel-9-3 ~]$ netstat -tunapl
(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 127.0.0.1:631           0.0.0.0:*               LISTEN      -
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      -
tcp        0    260 10.55.3.100:22          10.55.3.2:51207         ESTABLISHED -
tcp6       0      0 ::1:631                 :::*                    LISTEN      -
tcp6       0      0 :::22                   :::*                    LISTEN      -
tcp6       0      0 :::80                   :::*                    LISTEN      -
udp        0      0 127.0.0.1:323           0.0.0.0:*                           -
udp        0      0 0.0.0.0:56256           0.0.0.0:*                           -
udp        0      0 0.0.0.0:5353            0.0.0.0:*                           -
udp6       0      0 ::1:323                 :::*                                -
udp6       0      0 :::60581                :::*                                -
udp6       0      0 :::5353                 :::*                                -
```

Açık portları ve aktif bağlantıları başka komutlarla da takip edebiliriz.

## 3. Cihazın Network Kontrolü

Cihaza bağlantı gerçekleştirmişim. Bu SSH aracılığıyla uzaktan ya da konsol, ui terminali üzerinden olmuş olabilir.
Fakat cihaz ilk bağlandığımda konsol ile erişilebilir olacak ve IP adresi olmayacaktır.

Network işlemleri NetworkManager servisi tarafından yönetildiği için açdurumunu kontrol edelim.

```
[acs@rhel-9-3 ~]$ sudo systemctl status NetworkManager
[sudo] password for acs:
● NetworkManager.service - Network Manager
     Loaded: loaded (/usr/lib/systemd/system/NetworkManager.service; enabled; preset: enabled)
     Active: active (running) since Wed 2024-07-17 23:57:42 +03; 1h 13min ago
       Docs: man:NetworkManager(8)
   Main PID: 944 (NetworkManager)
      Tasks: 3 (limit: 23036)
     Memory: 9.4M
        CPU: 773ms
     CGroup: /system.slice/NetworkManager.service
             └─944 /usr/sbin/NetworkManager --no-daemon
```

Gördüğümüz üzere servis aktif. Enable durumda. Aynı zamanda kullandığımız preset tarafından da enable edilmiş.

```
[acs@rhel-9-3 ~]$ ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 08:00:27:e3:0b:3b brd ff:ff:ff:ff:ff:ff
    inet 10.55.3.100/8 brd 10.255.255.255 scope global noprefixroute enp0s3
       valid_lft forever preferred_lft forever
    inet6 fe80::a00:27ff:fee3:b3b/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
```

Cihaza erişmek için Windowsta .\connect.bat adında bir script kullandık.

connect.bat adında,

```
@echo off
echo SSH to RHEL 9.3 Virtual Machine
ssh acs@127.0.0.1 -p 8022
```

Gördüğümüz üzere 8022 portundan bir SSH bağlantısı yapıyor. 

Bu bağlantıyı sağlamak için bazı detayları olan işlemler yaptık.

Internete çıktığını aşağıdaki gibi görebilirim.

```
[acs@rhel-9-3 ~]$ ping 8.8.8.8
PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=55 time=22.5 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=55 time=22.4 ms
```

Burada tek bir interface'e enp0s3 10.55.3.100/8 IP adresini vermişiz. Interface ismi eth-0 gibi de olabilirdi.

Show route ile gateway'ini kontrol edebiliriz ip addr çıktısında yer almıyor.

```
[acs@rhel-9-3 ~]$ ip route show default
default via 10.55.3.1 dev enp0s3 proto static metric 100
```

nmcli device ile interfaceleri kontrol edebiliriz.

```
[acs@rhel-9-3 ~]$ nmcli device
DEVICE  TYPE      STATE                   CONNECTION
enp0s3  ethernet  connected               enp0s3
lo      loopback  connected (externally)  lo
```


```
[acs@rhel-9-3 ~]$ nmcli connection show -active
NAME    UUID                                  TYPE      DEVICE
enp0s3  5b45a5c7-e6a0-3072-91b5-557c6bd38737  ethernet  enp0s3
lo      0bbdf0f0-7dec-4a0b-93b6-5f83c9f21c8d  loopback  lo
```

```
[acs@rhel-9-3 ~]$ ifconfig
enp0s3: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.55.3.100  netmask 255.0.0.0  broadcast 10.255.255.255
        inet6 fe80::a00:27ff:fee3:b3b  prefixlen 64  scopeid 0x20<link>
        ether 08:00:27:e3:0b:3b  txqueuelen 1000  (Ethernet)
        RX packets 229066  bytes 341975597 (326.1 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 23876  bytes 1940718 (1.8 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 17  bytes 2057 (2.0 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 17  bytes 2057 (2.0 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

```
[acs@rhel-9-3 ~]$ ip addr show enp0s3
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 08:00:27:e3:0b:3b brd ff:ff:ff:ff:ff:ff
    inet 10.55.3.100/8 brd 10.255.255.255 scope global noprefixroute enp0s3
       valid_lft forever preferred_lft forever
    inet6 fe80::a00:27ff:fee3:b3b/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
```

DNS'i aşağıdaki gibi kontrol edelim.

```
[acs@rhel-9-3 ~]$ nslookup www.google.com
Server:         8.8.8.8
Address:        8.8.8.8#53

Non-authoritative answer:
Name:   www.google.com
Address: 142.250.187.100
Name:   www.google.com
Address: 2a00:1450:4017:80c::2004
```

Rooting tablosuna bakabiliriz.

```
[acs@rhel-9-3 ~]$ netstat -rnv
Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
0.0.0.0         10.55.3.1       0.0.0.0         UG        0 0          0 enp0s3
10.0.0.0        0.0.0.0         255.0.0.0       U         0 0          0 enp0s3
```

MAC adreslerini tutan ARP tablosuna da bakalım.

```
[acs@rhel-9-3 ~]$ ip neigh show
10.55.3.1 dev enp0s3 lladdr 52:54:00:XX:XX:00 STALE
10.55.3.2 dev enp0s3 lladdr 52:54:00:XX:XX:00 DELAY

[acs@rhel-9-3 ~]$ arp -a
_gateway (10.55.3.1) at 52:54:00:XX:XX:XX [ether] on enp0s3
? (10.55.3.2) at 52:54:00:XX:XX:XX [ether] on enp0s3
```

## 4. Problemlerin Troubleshoot Edilmesi

Aşağıdaki gibi baktığımızda status'un degraded olduğunu görüyoruz.

```
[acs@rhel-9-3 ~]$ systemctl status
rhel-9-3.cagri.sh
    State: degraded
    Units: 373 loaded (incl. loaded aliases)
     Jobs: 0 queued
   Failed: 2 units
    Since: Wed 2024-07-17 23:57:31 +03; 1h 36min ago
  systemd: 252-18.el9
   CGroup: /
           ├─init.scope
           │ └─1 /usr/lib/systemd/systemd rhgb --switched-root --system --deserialize 31
           ├─system.slice
           │ ├─ModemManager.service
...
```

Soruna sebep olan unit'lere bakalım:

```
[acs@rhel-9-3 ~]$ systemctl list-units --failed
  UNIT                    LOAD   ACTIVE SUB    DESCRIPTION
● vboxadd-service.service loaded failed failed vboxadd-service.service
● vboxadd.service         loaded failed failed vboxadd.service

LOAD   = Reflects whether the unit definition was properly loaded.
ACTIVE = The high-level unit activation state, i.e. generalization of SUB.
SUB    = The low-level unit activation state, values depend on unit type.
2 loaded units listed.
```

Sorunun virtualbox kaynaklı olduğu anlaşıldı.

İki servisten birini kontrol edelim:

```
[acs@rhel-9-3 ~]$ systemctl status vboxadd.service
× vboxadd.service
     Loaded: loaded (/opt/VBoxGuestAdditions-7.0.14/init/vboxadd; enabled; preset: disabled)
     Active: failed (Result: exit-code) since Wed 2024-07-17 23:57:49 +03; 1h 38min ago
    Process: 776 ExecStart=/opt/VBoxGuestAdditions-7.0.14/init/vboxadd start (code=exited, status=1/FAILURE)
   Main PID: 776 (code=exited, status=1/FAILURE)
        CPU: 6.970s

Jul 17 23:57:39 rhel-9-3.cagri.sh useradd[914]: failed adding user 'vboxadd', exit code: 9
Jul 17 23:57:46 rhel-9-3.cagri.sh vboxadd[942]: ValueError: File context for /opt/VBoxGuestAdditions-7.0.14/other/mount>
Jul 17 23:57:48 rhel-9-3.cagri.sh vboxadd[776]: VirtualBox Guest Additions: reloading kernel modules and services
Jul 17 23:57:49 rhel-9-3.cagri.sh vboxadd[1985]: VirtualBox Guest Additions: unable to load vboxguest kernel module, se>
Jul 17 23:57:49 rhel-9-3.cagri.sh vboxadd[776]: VirtualBox Guest Additions: kernel modules and services were not reload>
Jul 17 23:57:49 rhel-9-3.cagri.sh vboxadd[776]: The log file /var/log/vboxadd-setup.log may contain further information.
Jul 17 23:57:49 rhel-9-3.cagri.sh systemd[1]: vboxadd.service: Main process exited, code=exited, status=1/FAILURE
Jul 17 23:57:49 rhel-9-3.cagri.sh systemd[1]: vboxadd.service: Failed with result 'exit-code'.
Jul 17 23:57:49 rhel-9-3.cagri.sh systemd[1]: Failed to start vboxadd.service.
Jul 17 23:57:49 rhel-9-3.cagri.sh systemd[1]: vboxadd.service: Consumed 6.970s CPU time.
```

Gördüğümüz üzere Virtualbox Guest Additions kurulumunda problem yaşamışız.
Bu iki servis tetiklenmelerine rağmen açılmamışlar. 

```
systemctl status vboxadd.service
journalctl -u vboxadd.service
sudo systemctl start vboxadd.service
systemctl status vboxadd.service
```

Bİzi yönlendirdiği log sayfasında bir bilgi yok.

```
[acs@rhel-9-3 ~]$ cat  /var/log/vboxadd-setup.log
kernel modules and services were not reloaded
```

Journalctlddeki detaylı loglara baktığımızda yönerge görebiliyoruz:

```
 VirtualBox Guest Additions: Starting.
Jul 17 23:57:39 rhel-9-3.cagri.sh vboxadd[874]: VirtualBox Guest Additions: Setting up modules
Jul 17 23:57:39 rhel-9-3.cagri.sh vboxadd[892]: VirtualBox Guest Additions: Building the VirtualBox Guest Additions ker>
Jul 17 23:57:39 rhel-9-3.cagri.sh vboxadd[892]: modules.  This may take a while.
Jul 17 23:57:39 rhel-9-3.cagri.sh vboxadd[899]: VirtualBox Guest Additions: To build modules for other installed kernel>
Jul 17 23:57:39 rhel-9-3.cagri.sh vboxadd[901]: VirtualBox Guest Additions:   /sbin/rcvboxadd quicksetup <version>
Jul 17 23:57:39 rhel-9-3.cagri.sh vboxadd[905]: VirtualBox Guest Additions: or
Jul 17 23:57:39 rhel-9-3.cagri.sh vboxadd[907]: VirtualBox Guest Additions:   /sbin/rcvboxadd quicksetup all
Jul 17 23:57:39 rhel-9-3.cagri.sh vboxadd[910]: VirtualBox Guest Additions: Kernel headers not found for target kernel
Jul 17 23:57:39 rhel-9-3.cagri.sh vboxadd[910]: 5.14.0-362.24.1.el9_3.x86_64. Please install them and execute
Jul 17 23:57:39 rhel-9-3.cagri.sh vboxadd[910]:   /sbin/rcvboxadd setup
Jul 17 23:57:39 rhel-9-3.cagri.sh useradd[911]: failed adding user 'vboxadd', exit code: 9
Jul 17 23:57:39 rhel-9-3.cagri.sh useradd[914]: failed adding user 'vboxadd', exit code: 
```

Gördüğümüz üzer VirtualBox Guest Additions kernel versiyonumuz için bir versiyon derlemeye çalışıp fail oluyor.

```
Kernel headers not found for target kernel 5.14.0-362.24.1.el9_3.x86_64
```

Versiyonun kernel headerlarına bakalım.


```
[acs@rhel-9-3 ~]$ sudo dnf install kernel-headers-$(uname -r)
kernel-headers          x86_64          5.14.0-362.24.1.el9_3          rhel-9-for-x86_64-appstream-rpms          6.5 M
```

Paket yöneticisinden update deneyebiliriz.

Bu özellikle production sunucularda beklenmeyen sonuçlara yol açabilir.

```
sudo dnf check-update
sudo dnf update httpd
sudo dnf update
sudo dnf clean all
```

Daha sonra guest-additions kurulumunun detaylarına bakabiliriz. Hata ciddi olmadığından incelemeyi sonlandıralım.

Hataların aşağıdaki gibi sebepleri olabilir:

* Configuration errors: Incorrect settings in the service's configuration file.
* Missing dependencies: Required services or files are not available.
* Permission issues: The service does not have the necessary permissions to perform its tasks.
* Resource limits: The service is unable to start due to resource constraints.


## 5. IP Verilmesi

Aşağıdaki gibi ip verebiliriz:

```
nmcli con mod enp0s3 ipv4.addresses 10.253.1.211/24
nmcli con mod enp0s3 ipv4.gateway 10.253.1.1
nmcli con mod enp0s3 ipv4.method manual
nmcli con mod enp0s3 ipv4.dns 8.8.8.8
nmcli con down enp0s3 && nmcli con up enp0s3
ip address show enp0s3
```

Aşağıdaki komut interface'i kapatıp açmak için kullanılabilir.

```
nmcli connection reload
```

systemctl'yi kullanarak reboot edebiliriz.

```
sudo systemctl restart NetworkManager
sudo systemctl status NetworkManager

```

Son olarak aşağıdaki gibi sistemi reboot edebiliriz.

```
sudo systemctl reboot
```


## Details


## Aynı Interface'e İkinci Bir IP

Aşağıdaki gibi interface 'e İkinci bir static ip ekleyebiliriz.

```
nmcli connection modify enp0s3 +ipv4.addresses 10.253.1.212/24
```

## Network Scripts Dizini ve ifcfg Dosyaları

Ama bu özellik artık kullanılmıyor..
nmcli ile network bilgisi girebiliriz fakat NetworkManager ifcfg dosyalarını da kullanabilir. 
Bunlar sayesinde önceden tanımlı network bilgileri girebiliriz. Önemli tanımlar yapabiliriz (MAC adresi girmek gibi.)

```
[acs@rhel-9-3 ~]$ locate network-scripts
/etc/sysconfig/network-scripts
/etc/sysconfig/network-scripts/readme-ifcfg-rh.txt
```

## 6.3 VirtualBox Detayları

* Oracle VM VirtualBox Manager üzerinden aşağıdaki ayarlar yapıldı:
* Wİndows cihazdan ncpa.cpl ile baktığımda 10.55.3.104/24 adresini almış bir Ethernet bağlantısı var. 10.55.3.1 de gateway'i. DNS'i ise 8.8.8.8 verilmiş.
* Windows bilgisayarım wifi'den 192.168.1.103/24 ile wifi ye bağlı. 192.168.1.1 de gateway'i.
* Sanal adater oluşturmuşuz 10.55.3.104/24 ip adresine sahip DHCP'si aktif değil. 
* NatNetwork adında bir NatNetwork'ü var. 10.55.3.0/24'den dağıtıyor ve DHCP'si aktif.
* Son olarak Port FOrwarding yapıyoruz. Mesela 127.0.0.1 adresinden 8022 host portunu 10.55.3.100 22'ye yönlendirmişiz. Cihazla bu şekilde iletişim kuruyoruz.
* Cihazın ayarlarından NAT Network seçip Allow All ve Cable Connected seçtik.
* Böylece cihaz hem internete çıkabiliyor hem de SSH yapılabiliyor.