---
layout: post3
date: "2023-09-29"
title: "Examination Of HP 5406 Switches"
category: a
tags:
  - Network
  - Switch
---

HP 5406 is a HP ProCurve switch which are most commonly used. 
There are other HP switches like 5900 and 5510. 
HP 5406 are a little old still in use.
They generally used as branch or edge switches. Backbone switches their equvailent is.
They have command line and web interface. We access it with its ip through ssh or web interface with using username and password.

## Overview

Mine is HP Switch E5406zl(J8697A) with ROM version K.15.06.0017, ROM K.15.30. Named like SW-HP_5406-MYBRANCH1.

It has two modules A and B. Each has 24 Ports. Port numbers goes A1-24 and B1-24. Most ports are in default VLAN 1 and not tagged.
There might be other VLANS for phone communication.

Details of gui:

Left sidebar has : Home, System, Interface, VLAN, Traffic Mgmt, Spanning Tree, Multicast, Security and Troubleshooting folders.
Each one has their pages and windows beneath. 

Home: Quick Setup, Status
System: Logging, SNMP, Updates/Downloads
Interface: Port Info/Config, POE
VLAN : VLAN Mgmt, Traffic Mgmt, QOS
Spanning Tree : Tree Management
Multicast : IGMP
Security : Device Passwords, Security Wizard, IP Authorization: Port Security, Intrusion Log, SSL
Troubleshooting : Ping/Link Test, Configuration Report, Core Dump, Port Mirroring

I can go configuration report to see the configuration quickly. You can see detailed version in configuration.

## Example Case: Problem Of Access

I have ILO access of this server. Even I gave IP and correct gateway of the router. (in this case its a branch firewall) 
It still doesnt connect. This makes us suspicious about the network and maybe a block on switch port.

First I need to check the port of the server.
Ok. I have HP5406 switch. I have administrator access to device.
I need mac addresses devices connected to each port. How can I do that through CLI?

I can ask chatgpt. I enter Privileged EXEC Mode by writing enable. Access Configuration Mode by writing configure terminal.
Know I accessed global configuration mode. Show MAC Addresses for All Ports I write show mac-address. 
Know I match the mac address of the server and find the port its connected. Its something like A20.
show mac-address A20 which gives MAC address and VLAN of the port.
Like all Ethernet interfaces, every port on a switch has a unique factory-assigned MAC address. 
I can also learn that by writing show interfaces A24.

Switch my be blocked this port with Port-Security or Spanning tree.

I can check if a port has port security enabled and whether it has been triggered (i.e., a violation has occurred). 
I can use the following command on an HP ProCurve switch (such as the HP 5406):
show port-security <port-number>

that use Spanning Tree Protocol (STP), ports can be in a "blocking" state as part of the STP convergence process to prevent loops. To check the status of STP on a port, you can use the following command:
show spanning-tree <port-number>

I see its not blocked.



## Examination Of Configuration

Running configuration:


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



