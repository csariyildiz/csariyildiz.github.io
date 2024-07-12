---
layout: default6
page_name: "Network Configuration Commands"
title: "Network Configuration Commands"
---

* `cat /etc/os-release` :  Contains information about the operating system, such as the name, version, and distribution.
* `cat /etc/redhat-release` :  Contains information about the operating system, such as the name, version, and distribution.
* `uname -a` :  Displays information about the kernel, including the name, version, hostname, and architecture.
* `uname -nsro` displays a subset of information that is provided by the uname -a command, including the hostname, operating system name, and kernel release.
* `hostname`  :  This command displays the hostname of the system.
* `hostname-ctl set-hostname pparker.oscorp.com` : Sets hostname
* `ip addr` :  This command displays information about network devices managed by NetworkManager.
* `nmcli device` : displays information about network devices managed by NetworkManager.
* `nmcli connection modify enp0s3 ipv4.address 10.253.1211/24` : Set ipv4.
* `nmcli connection modify enp0s3 ipv4.gateway 10.253.1.1` : Sets gateway.
* `nmcli connection modify enp0s3 ipv4.method manual` : Sets static. This method can be set to either manual or dhcp.
* `nmcli connection modify enp0s3 ipv4.dns 8.8.8.8` : Sets primary dns.
* `nmcli connection down enp0s3 && nmcli connection enp0s3 up` : Restarts.
* `ip address show enps3` : similar to the ip addr command, but it only displays information for the network interface named enp0s3.
* `vi etc/sys/config/network-scripts/ifcfg-<interface>` : edits the configuration file for a specific network interface Details should be given line each, IPADDR,PREFIX,GATEWAY,DNS1.
* `ip route show default` : This command displays the default route for the system. 
* `systemctl restart NetworkManager` : estarts the NetworkManager service. 
* `ping 8.8.8.8` : sends a ping request to the host with the IP address 8.8.8.8, which is a public DNS server operated by Google.
* `telnet 10.55.3.100 -p 2022` : attempts to establish a telnet connection to the host with the IP address 10.55.3.100 on port 2022. 
* `ssh spiderman@10.253.1.55` : (SSH) connection to the host with the IP address 10.253.1.55 as the user spiderman. SSH is a secure alternative to telnet.
* `netstat -antp | grep ':80/tcp` : Displays information about active network connections on the system. This relies on the live state of the system.
* `grep -w '80/tcp' /etc/services` : Searches the file /etc/services for lines that contain the string 80/tcp. doesn't show any live connection details.
