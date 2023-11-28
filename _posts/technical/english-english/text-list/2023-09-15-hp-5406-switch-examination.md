---
layout: post3
date: "2023-09-29"
title: "Examination Of HP 5406 Switches"
category: a
tags:
  - Network
  - Switch
---


The `HP 5406`, part of the `HP ProCurve switch` lineup, continues to be utilized in networking solutions. Alongside models like the 5900 and 5510, the 5406, although slightly dated, is still widely deployed. Typically serving as branch or edge switches, they also function as backbone switches. The `HP E5406zl` switch was introduced in the `mid-2000s`. It was part of the HP ProCurve line of network switches and offered various modular configurations to suit different network requirements. The exact release date was around `2006-2007`, but specific launch dates for networking hardware can sometimes vary by region or market availability.

Such a switch is typically connected to the center via fiber cables if it is on the one floor. 
The cables go with one fiber pair for all floors. `Ethernet` cables are used on the same floor. 
The `patch-panel` where each wall connection goes is connected to these switches via Ethernet.

Accessing these switches involves using their `IP` address via `SSH` or a web interface, requiring a valid username and password for authentication.

## Overview

A sample setup includes an HP Switch `E5406zl (J8697A)` operating on `ROM` version `K.15.06.0017`, complemented by an additional `ROM`, `K.15.30`, identified as `SW-HP_5406-MYBRANCH1`.

This switch is comprised of two modules, A and B, housing 24 ports each, labeled A1-24 and B1-24. The majority of these ports default to VLAN 1 and remain untagged, while some may be dedicated to other VLANs for specific phone communication purposes.

The graphical user interface (GUI) is neatly organized with a left sidebar has folders such as Home, System, Interface, VLAN, Traffic Mgmt, Spanning Tree, Multicast, Security, and Troubleshooting. 

These folders lead to specific pages and windows:

* Home: Offers Quick Setup and Status information.
* System: Includes Logging, SNMP, and Updates/Downloads.
* Interface: Provides access to Port Info/Config and POE settings.
* VLAN: Offers VLAN Management, Traffic Management, and QOS configurations.
* Spanning Tree: Manages tree configurations.
* Multicast: Includes IGMP settings.
* Security: Encompasses Device Passwords, Security Wizard, IP Authorization, Port Security, Intrusion Log, and SSL settings.
* Troubleshooting: Provides options for Ping/Link Test, Configuration Report, Core Dump, and Port Mirroring.

The "Configuration Report" section allows for quick access to review the current configuration details. For a more in-depth examination, a detailed version of the configuration settings is available within the configuration menu.

## Case Example: Connectivity Issue Investigation

I've got ILO access to this server, and despite providing the correct IP and router gateway (a branch firewall in this scenario), there's still no connection. This raises concerns about potential network issues, perhaps a block on the switch port.

Firstly, I need to inspect the server's port. I'm equipped with an HP5406 switch and administrator privileges for the device. To retrieve the MAC addresses of devices connected to each port through the Command Line Interface (CLI), here's what I do:

1. Enter Privileged EXEC Mode by typing "enable."
2. Access Configuration Mode by entering "configure terminal."
3. Now in the global configuration mode, I use "show mac-address" to display all MAC addresses for every port.

By matching the server's MAC address, I can identify its connected port, often labeled something like "A20." To retrieve detailed information, I enter "show mac-address A20," which provides both the MAC address and VLAN of that specific port. Additionally, I can gather factory-assigned MAC addresses for all Ethernet interfaces using "show interfaces A24."

Considering potential blockages, the switch might employ Port Security or Spanning Tree Protocol (STP). To examine this:

* To check if port security is active and triggered (e.g., a violation occurred), I utilize the command: `show port-security <port-number>` on an HP ProCurve switch like the HP 5406.
* Regarding STP, ports can temporarily be in a "blocking" state as part of the convergence process to prevent loops. To assess the STP status on a port, I use: "show spanning-tree <port-number>."

After verification, it appears that the port is not blocked by either Port Security or Spanning Tree Protocol.

## Examination Of Configuration

Running configuration:

```
; J8697A Configuration Editor; Created on release #K.15.06.0017
; Ver #02:10.0d:1f

hostname "SW-HP_5406-MYBRANCH" 
time timezone 180 
qos dscp-map 101110 priority 6 
module 1 type J9534A 
module 2 type J9534A 

interface A1 
   name "MYBRANCHSRV ILO" 
exit
interface A2 
   name "MYBRANCH LAN" 
exit
interface A4 
   name "MYBRANCHSERV1" 
....
```
