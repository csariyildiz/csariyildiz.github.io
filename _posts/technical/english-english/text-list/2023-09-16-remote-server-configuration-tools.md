---
layout: post3
date: "2023-10-05"
title: "Remote Server Configuration Tools: iLO and System Management HomePage"
category: a
tags:
  - Server
  - Hardware
---

The general term for server management controllers is baseboard management controllers (BMCs). BMCs are embedded processors on server motherboards that provide out-of-band management and monitoring capabilities. They can be used to access and manage the server even if the server is turned off or the operating system is not working. This allows administrators to perform tasks such as power on and off the server, monitor its health, and troubleshoot problems.

BMCs are typically implemented using industry-standard specifications such as the Intelligent Platform Management Interface (IPMI) or the Redfish API. This allows BMCs from different vendors to be managed using the same tools and software.

BMCs are an important part of modern server management infrastructure. They provide a number of benefits for administrators, including:

* Remote access: BMCs allow administrators to access and manage servers remotely, even if the server is turned off or the operating system is not working.
* Security: BMCs provide a secure way to manage servers, with features such as encryption and role-based access control.
* Monitoring: BMCs can monitor the health and status of servers, and can alert administrators to any problems.
* Troubleshooting: BMCs can help administrators to troubleshoot problems with servers, even if the server is not working properly.

remotely power on, power off, or restart a server.
monitor the server's temperature, fan speed, and other vital signs.
install or update the server's firmware.
troubleshoot problems with the server's hardware or software.


Some examples of BMCs include:

```
HP iLO
Dell iDRAC
Lenovo IMM
Cisco UCS Manager
Fujitsu iRMC
IBM IMM
Xenon
Gigabyte
```

BMCs are an important tool for managing servers in data center environments. They provide a number of benefits for administrators, including remote access, security, monitoring, and troubleshooting.


* Not updated bmc/ilo versions are critical. Here this management tool acts like a thread.
* Integrated Lights Out (iLO) is a management tool commonly used on servers.
* Since they are administration tools, users and services that use them have administrator roles. 
* These tools have many powers and capabilities over the system they are in. .
* Secure usage of management tools and software is also of great importance in terms of server security and application security.
* There are many security vulnerabilities in terms of iLO update.
* When scanning is performed via IP and DNS, observations can be made on systems that contain security vulnerabilities.
* in the management software installed on the specified servers and their portals.
* HP System Management is another management tool like iLO.
* Idrac And Their Security


iLO 1 and 2 are based on a different architecture than iLO 3 and later. iLO 1 released in 2004 and iLO 2 released in 2007. iLO 1 and 2 are no longer supported by HPE, and they are not compatible with Gen8 and later servers.

```
Gen8	iLO 3	February 2012
Gen9	iLO 4	July 2015
Gen10	iLO 5	June 2017
Gen11	iLO 6	June 2023
```

## HP Server Family

The HP server family is a broad range of servers designed to meet the needs of a wide variety of businesses and organizations. The family includes servers of all sizes and form factors, from small tower servers to large rack-mounted servers and blade systems.

The HP server family can be divided into several main categories:

* ProLiant servers: ProLiant servers are the most popular and versatile category of HP servers. They are available in a wide range of sizes and form factors, and they can be used for a variety of workloads, including general-purpose computing, virtualization, and high-performance computing.
* Synergy servers: Synergy servers are a modular infrastructure platform that allows businesses to quickly and easily deploy and manage their IT resources. Synergy servers are ideal for businesses that need a flexible and scalable IT infrastructure.
* BladeSystem servers: BladeSystem servers are a high-density server platform that allows businesses to consolidate multiple servers into a single enclosure. BladeSystem servers are ideal for businesses that need to save space and reduce their energy costs.
* Superdome servers: Superdome servers are HP's most powerful and scalable servers. They are designed for the most demanding workloads, such as mission-critical applications and large-scale databases.

In addition to these main categories, the HP server family also includes a number of specialized servers, such as storage servers, networking servers, and application servers.

Here are some examples of specific HP servers from each category:

* ProLiant servers: ML350 Gen10, DL380 Gen10, DL580 Gen10
* Synergy servers: SY6600, SY4800, SY2800
* BladeSystem servers: BL460c Gen10, BL660c Gen10, BL860c Gen10
* Superdome servers: Flex 2800, Flex 2200i

HP servers are known for their reliability, performance, and scalability. They are also backed by HP's extensive support and services organization.

The HP ProLiant server family is divided into generations, each of which offers new features and improvements over the previous generation. The current generation is Gen11, which was released in June 2023. For the date of this post, HPE is currently focused on developing its new line of servers, the HPE ProLiant Gen12 servers, which are expected to be released in 2024.

```
Gen11 : Released in	June     2023
Gen10 : Released in June     2017
Gen9  : Released in July     2015
Gen8  : Released in February 2012
Gen7  : Released in November 2010
Gen6  : Released in November 2009
Gen5  : Released in November 2007
Gen4  : Released in November 2005
Gen3  : Released in November 2003
Gen2  : Released in November 2001
Gen1  : Released in November 1999
```

Here is a brief overview of the processor memory, storage and networking ProLiant server generations includes Gen8 and Gen9 and Gen10.



```
Gen8 (released in February 2012)
- Processors: Intel Xeon E5-2600 v2 and v3 processors
- Memory: DDR3 up to 2 TB
- Storage: SAS, SATA, and SSD drives
- Networking: 10 GbE and 40 GbE Ethernet
```

```
Gen9 (released in July 2015)
- Processors: Intel Xeon E5-2600 v4 and v5 processors
- Memory: DDR4 up to 4 TB
- Storage: SAS, SATA, and SSD drives
- Networking: 10 GbE, 25 GbE, and 40 GbE Ethernet
```

```
Gen10 (released in June 2017)
- Processors: Intel Xeon Scalable processors
- Memory: DDR4 up to 6 TB
- Storage: SAS, SATA, SSD, and NVMe drives
- Networking: 10 GbE, 25 GbE, 40 GbE, and 100 GbE Ethernet
```

## Updating The ILO

HP Servers come in all shapes and formes such as HP Proliant series.

* https://pingtool.org/latest-hp-ilo-firmwares/

It shares links to latest bin files. They have to be unextracted twice. Links are from hp website so they are secure.

There are different versions of iLO listed below.

```
ILO1 : ilo196.bin (30-Apr-2014)
ILO2 : ilo2_233.bin (30-Mar-2018)
ILO3 : ilo3_194.bin (iLO3 v 1.94.2 06-Dec-2020)
ILO4 : ilo4_282.bin (iLO4 v 2.82.5 06-Feb-2023)
ILO5 : ilo5_297.bin (15-Sep-2023)
ILO6 : ilo6_152.bin (15 Sep 2023)

```

Kimi zaman tekrar tekrar rar içerisinden çıkarıp bin olarak yükleyebiliyoruz.
Aynı zamanda sunucunun içerisinden de yükleme yapılıyor.

## How To Solve Embedded Flash/SD-CARD Error?

Aşağıdaki hata kimi zaman güncelleme sonrası aşağıdaki uyarının görülmesine sebep olabiliyor:

```
WARNING: Formatting the Embedded Flash erases all data on the iLO partition and cannot be undone. External providers (like BIOS, Intelligent Provisioning, OneView and FLM) will need to be re-configured. 
```

* Embedded Flash/SD-CARD: Embedded media initialization failed due to media write-verify test failure.

* You click "degraded" button. And "Format Embedded Flash and reset iLO ".

* It gives the warning below.


## The Issue With Updating Old iLO 5 versions 

Eski ilo 5 versiyonlarını Version 1.40 üstüne yükleme esnasında sorunla karşılaşılabiliyor.

Örneğin daha eski bir ilo 5'i aşağıdaki versiyona güncelledim. iLO 5 - 2.97 Sep 12 2023

iLO 5 için 1.40’dan sonrasına geçmek için aşağıdaki güncellemeyi yüklemek gerekiyor.

```
Online ROM Flash Component for Windows x64 - HPE Integrated Lights-Out 5 
```

## Namings In ILO

We define a name to ilo ideal is its related to servers own name. ILO also gets name like ILOCZ3210DME4.yourdomainaddr.com


## HP System Management

Tıpkı ilo gibi serverın içerisinden cihazı görüntüleyip yönetebileceğiniz bir arayüz sunuyor. 


