---
layout: post4
page_name: "Network Configuration Commands"
title: "Network Configuration Commands"
---

* `cat /etc/os-release` Contains information about the operating system, such as the name, version, and distribution.
* `cat /etc/redhat-release` Contains information about the operating system, such as the name, version, and distribution.
* `uname -a` Displays information about the kernel, including the name, version, hostname, and architecture.
* `uname -nsro` Displays a subset of uname -a command, including the hostname, operating system name, and kernel release.
* `hostname` Displays the hostname of the system.
* `hostname-ctl set-hostname pparker.oscorp.com` Sets the hostname of the system.
* `ip addr` Displays information about network devices managed by NetworkManager.
* `nmcli device` Displays information about network devices managed by NetworkManager.
* `nmcli connection modify enp0s3 ipv4.address 10.253.121/24` Sets ipv4 address with prefix.
* `nmcli connection modify enp0s3 ipv4.gateway 10.253.1.1` Sets gateway.
* `nmcli connection modify enp0s3 ipv4.method manual` Sets static. This method can be set to either manual or dhcp.
* `nmcli connection modify enp0s3 ipv4.dns 8.8.8.8` Sets primary DNS.
* `nmcli connection down enp0s3 && nmcli connection enp0s3 up` Restarts the interface enp0s3.
* `ip address show enps3` Similar to the ip addr command, but it only displays information for the network interface named enp0s3.
* `vi etc/sys/config/network-scripts/ifcfg-<interface>` Edits conf for a specific network interface. Give line each, IPADDR,PREFIX,GATEWAY,DNS1.
* `ip route show default` Displays the default route for the system. 
* `systemctl restart NetworkManager` Restarts the NetworkManager service. 
* `ping 8.8.8.8` Sends a ping request to the host with the IP address 8.8.8.8, which is a public DNS server operated by Google.
* `telnet 10.55.3.100 -p 2022` Attempts telnet connection to the host with the IP address 10.55.3.100 on port 2022. 
* `ssh spiderman@10.253.1.55` Attempts SSH connection to the host with the IP address 10.253.1.55 and as the user.
* `netstat -antp | grep ':80/tcp` Displays information about active network connections on the system. Relies on the live state of the system.
* `grep -w '80/tcp' /etc/services` Searches the file /etc/services for lines that contain the string 80/tcp. Doesn't show any live connection details.
