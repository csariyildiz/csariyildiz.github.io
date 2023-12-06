---
layout: post3
date: "2023-10-05"
title: "Remote Server Configuration Tools: iLO and System Management HomePage"
category: a
tags:
  - Server
  - Hardware
---

Older remote server configuration tools like iLO and HP System Management Homepage pose security risks to physical servers on the network. 
Securing iLO involves keeping it updated; iLO 5, for instance, embeds a risk tool within itself, providing health check alerts. 
Mitigating these risks involves sections like addressing SNMPv1 vulnerabilities, ensuring robust password complexity, utilizing non-default SSL certificates, managing RBSU login access, enabling secure boot, and addressing potential security concerns with IPMI/DCMI Over LAN.

As we now the general term for server management controllers is baseboard management controllers (BMCs). BMCs are embedded processors on server motherboards that provide out-of-band management and monitoring capabilities. They can be used to access and manage the server even if the server is turned off or the operating system is not working. This allows administrators to perform tasks such as power on and off the server, monitor its health, and troubleshoot problems.

BMCs are typically implemented using industry-standard specifications such as the Intelligent Platform Management Interface (IPMI) or the Redfish API. This allows BMCs from different vendors to be managed using the same tools and software.

BMCs are an important part of modern server management infrastructure. They provide a number of benefits for administrators, allowing remote access. BMCs allow administrators to access and manage servers remotely, even if the server is turned off or the operating system is not working. When its configured and updated properly BMC's provide a secure way to manage servers, with features such as encryption and role-based access control.
They can also monitor the health and status of servers, and can alert administrators to any problems also help administrators to troubleshoot problems with servers by providing alternative login method, even if the server is not working.

BMC can be used remotely power on, power off, or restart a server, monitor the server's temperature, fan speed, and other vital signs, install or update the server's firmware and troubleshoot problems with the server's hardware or software.

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

Since they are administration tools, users and services that use them have administrator roles. These tools have many powers and capabilities over the system they are in. As a result, secure usage of management tools and software is also of great importance in terms of server security and application security. For example, there are many security vulnerabilities in terms of iLO update. When scanning is performed via IP and DNS, observations can be made on systems that contain security vulnerabilities in the management software installed on the specified servers and their portals. 

HP System Management is another management tool like iLO. Idrac is a remote management tool for Dell PowerEdge servers. Like iLO and HP System Management, iDRAC is a powerful tool that can be used to manage and configure Dell PowerEdge servers. However, iDRAC also has a number of security vulnerabilities that can be exploited to gain unauthorized access to a server. 

It is important to be aware of the security vulnerabilities of these tools and to take steps to mitigate them. This includes using strong passwords, keeping the software up to date, and restricting access to the tools to authorized users. It is also important to scan your systems regularly for vulnerabilities and to take corrective action promptly.

## HP Server Family

The HP server family is a broad range of servers designed to meet the needs of a wide variety of businesses and organizations. The family includes servers of all sizes and form factors, from small tower servers to large rack-mounted servers and blade systems.

The HP server family can be divided into several main categories:

* ProLiant servers: (ML350 Gen10, DL380 Gen10, DL580 Gen10) ProLiant servers are the most popular and versatile category of HP servers. They are available in a wide range of sizes and form factors, and they can be used for a variety of workloads, including general-purpose computing, virtualization, and high-performance computing.
* Synergy servers: ( SY6600, SY4800, SY2800) Synergy servers are a modular infrastructure platform that allows businesses to quickly and easily deploy and manage their IT resources. Synergy servers are ideal for businesses that need a flexible and scalable IT infrastructure.
* BladeSystem servers: (BL460c Gen10, BL660c Gen10, BL860c Gen10) BladeSystem servers are a high-density server platform that allows businesses to consolidate multiple servers into a single enclosure. BladeSystem servers are ideal for businesses that need to save space and reduce their energy costs.
* Superdome servers: (Flex 2800, Flex 2200i) Superdome servers are HP's most powerful and scalable servers. They are designed for the most demanding workloads, such as mission-critical applications and large-scale databases.

ProLiant server family is divided into generations, each of which offers new features and improvements over the previous generation. Based on the date of this post; the current generation is Gen11, which released in June 2023 and HPE is focused on developing its new line of servers, the HPE ProLiant Gen12 servers, which are expected to be released in 2024.

Version history of ILO:

| Release Date    | Generation         | ILO Model | ILO Latest Version | Notes                                                         |
|-----------------|--------------------|-----------|--------------------|---------------------------------------------------------------|
| 1999 (November) | HP ProLiant Gen 1  | ILO       | 1.94               | ILO was introduced with Gen 1 servers.                        |
| 2001 (November) | HP ProLiant Gen 2  | ILO E     | 2.55               | ILO E was a dedicated iLO card separate from the motherboard. |
| 2003 (November) | HP ProLiant Gen 3  | ILO 2     | 2.30               | ILO 2 was integrated into the motherboard.                    |
| 2005 (November) | HP ProLiant Gen 4  | ILO 2     | 2.30               | ILO 2 continued to be used for Gen 4.                         |
| 2007 (November) | HP ProLiant Gen 5  | ILO 2     | 2.30               | ILO 2 still remained for Gen 5.                               |
| 2009 (November) | HP ProLiant Gen 6  | ILO 3     | 1.89               | ILO 3 was introduced with Gen 6.                              |
| 2010 (November) | HP ProLiant Gen 7  | ILO 3     | 1.89               | Gen 7 continued using ILO 3.                                  |
| 2012 (February) | HP ProLiant Gen 8  | ILO 4     | 2.78               | ILO 4 debuted with Gen 8 servers.                             |
| July 2015       | HP ProLiant Gen 9  | ILO 4     | 2.78               | Gen 9 retained the use of ILO 4.                              |
| June 2017       | HP ProLiant Gen 10 | ILO 5     | 2.44               | ILO 5 was introduced with Gen 10.                             |
| June 2023       | HP ProLiant Gen 11 | ILO 6     | 1.22               | ILO 6 is the current generation for Gen 11 servers.           |


iLO, iLO E and 2 are based on a different architecture than iLO 3 and later. iLO E released in 2001 and iLO 2 released in 2003. iLO, ILO E and 2 are no longer supported by HPE, and they are not compatible with Gen8 and later servers.

Processor memory, storage and networking ProLiant server generations incluing Gen8 and Gen9 and Gen10:

* Gen8 (February 2012). Its processors are "Intel Xeon E5-2600 v2 and v3 processors"
its memory: DDR3 up to 2 TB. Its storage supports SAS, SATA, and SSD drives. Finally its networking supports 10 GbE and 40 GbE Ethernet cards.
* Gen9 (July 2015) Processors: Intel Xeon E5-2600 v4 and v5 processors . Memory: DDR4 up to 4 TB. Storage: SAS, SATA, and SSD drives. Networking: 10 GbE, 25 GbE, and 40 GbE Ethernet
* Gen10 (June 2017) Processors: Intel Xeon Scalable processors. Memory: DDR4 up to 6 TB. Storage: SAS, SATA, SSD, and NVMe drives. Networking: 10 GbE, 25 GbE, 40 GbE, and 100 GbE Ethernet

* We can also give an example to blade servers. HPE BladeSystem c7000 Enclosure has blade servers in each bay. It has 16 bays and has ILO for each.

## Updating The ILO On Servers

Typically for the HP Proliant series we can simply download the related ILO packages from HP's website and install the packages from ILO GUI.

Currently there is a very usefull website for updating ILO's:
* https://pingtool.org/latest-hp-ilo-firmwares/

This website shares links to latest bin files. Its secure since it gaves related links from HP's website. Files need to be unextracted twice. Before they installed to system.

There are different versions of iLO listed below:
```
ILO1 ilo196.bin (30-Apr-2014)
ILO2 ilo2_233.bin (30-Mar-2018)
ILO3 ilo3_194.bin (iLO3 v 1.94.2 06-Dec-2020)
ILO4 ilo4_282.bin (iLO4 v 2.82.5 06-Feb-2023)
ILO5 ilo5_297.bin (15-Sep-2023)
ILO6 ilo6_152.bin (15 Sep 2023)
```

Sometimes we need to extract it from the rar file again and again and upload it as a extracted file. At the same time, uploading within the server is an another option.

## How To Solve Embedded Flash/SD-CARD Error?

There was an issue with early revisions of the ILO firmware that was later corrected, and part of the procedure was to reformat the NAND.  
The following error may sometimes cause the following warning to appear after the update:

```
Embedded Flash/SD-CARD: Embedded media initialization failed due to media write-verify test failure.
```

* You click "degraded" button. And "Format Embedded Flash and reset iLO ".
* It gives the warning but resetting NAND won't affect the server.

```
WARNING: Formatting the Embedded Flash erases all data on the iLO partition and cannot be undone. External providers (like BIOS, Intelligent Provisioning, OneView and FLM) will need to be re-configured. 
```
* [https://community.spiceworks.com/topic/2295331-hpe-ilo4-embedded-flash-error](https://community.spiceworks.com/topic/2295331-hpe-ilo4-embedded-flash-error)

## Compatibility Issues In iLO 5 versions 

Updating older versions of iLO 5 can be tricky due to compatibility issues. While some versions support direct updates to the latest version, others in ILO5 require an intermediate step of updating to version 1.40 first.
Since some versions support direcly update to latest, we can try switching to the latest version first.

For example, to update an older ILO 5 to the `iLO 5 - 2.97 Sep 12 2023` version, we must first switch to `1.40` first.

To upgrade to version 1.40 or later for iLO 5, we need to install the following update:

```
Online ROM Flash Component for Windows x64 - HPE Integrated Lights-Out 5 
```

We can download this update from the [HP Support Center](https://support.hpe.com/hpesc/public/docDisplay?docId=c00719376&docLocale=en_US).

## Degraded iLO

Degraded iLO refers to a condition where the integrated Lights-Out (iLO) management processor on an HP ProLiant server is experiencing issues and is not functioning at its full capacity. 

This can manifest in various ways, such as inability to access the iLO web interface, error messages indicating iLO problems, reduced functionality of iLO features.

Degraded iLO can be caused by various factors, including firmware issues, Outdated or corrupted iLO firmware can lead to stability problems and degraded performance.
Hardware failures: Physical damage to the iLO components or other hardware-related issues can cause iLO degradation. Configuration errors: Incorrect iLO settings or misconfigurations can also contribute to degraded iLO.

If we encounter a degraded iLO situation, it is recommended to check the iLO firmware version by verifying that its running the latest iLO firmware version. If not, update the firmware to the latest version available for the server model. Reviewing the iLO logs for any error messages or warnings that may provide clues about the cause of the degradation. Also inspecting the iLO components for any physical damage or signs of malfunction. Verify iLO configuration ensure that the iLO settings are correct and that there are no misconfigurations that could be causing the issue.

We can verify iLO is in a healty state since all issues are addressed properly.

## Naming The ILO

Choosing a descriptive name for your iLO is crucial for easy identification and organization. Ideally, your chosen name should be related to the server's own name for clarity and consistency.

Traditionally, iLOs are assigned names like ILOCZ3210DE4.yourdomainaddr.com. While this format works, it lacks descriptive power.

A more meaningful naming convention will be:

```
SERVERNAME-ILO.yourdomainaddr.com
```

This format clearly indicates the iLO's association with the specific server it manages. It replaces the generic "ILOCZ" prefix with the actual server name, making identification and troubleshooting much easier.

For example:

* WEBSERVER01-ilo.yourdomainaddr.com
* DATABASESERVER05-ilo.yourdomainaddr.com
* MAILSERVER03-ilo.yourdomainaddr.com

## HP System Management Homepage

HP System Management Homepage (HMS) is a remote server management tool, similar to iLO, that provides a centralized interface for monitoring and managing servers. 

Like iLO, outdated versions of HMS can pose security vulnerabilities. However, HMS also offers additional management and reporting capabilities.

Examples:

|  Server  |      Server Model      |            IP            | HP System Management Homepage |     Port     |
|:--------:|:----------------------:|:------------------------:|:-----------------------------:|:------------:|
| SRVNAME  | HP Proliant DL360 Gen9 | As an example 10.10.4.23 | v7.6.8.3   (05-04-2023)       |    2381      |
| SRVNAME2 | HP Proliant DL360 Gen9 | As an example 10.10.4.23 | v7.6.8.3   (05-04-2023)       |    2381      |


### Prerequisites
* Download the latest HMS firmware from the [HP Support Center](https://buy.hpe.com/us/en/software/infrastructure-management-software/insight-foundation-software/insight-foundation-server-management-standalone-software/hpe-system-management-homepage-software/p/344313).
* Verify that your server meets the minimum system requirements for the HMS firmware update. Ensure that you have administrative privileges on the server.
* It is also recommended to back up the HMS configuration if there is one before performing an update. If you encounter any issues during the update process, refer to the HP HMS documentation for troubleshooting steps.

### Steps

1. Stop the HMS service: Open a command prompt with administrative privileges. Navigate to the HMS installation directory, typically C:/Program Files (x86)/HP/hpsim/bin. Run the command hpsim -s stop.
2. Uninstall the current HMS version: Run the command msiexec /x {GUID} /qn, where {GUID} is the GUID of the currently installed HMS version. You can find the GUID in the Add/Remove Programs applet in the Control Panel.
3. Install the new HMS firmware: Run the downloaded HMS firmware installer. Follow the on-screen instructions to complete the installation process.
4. Start the HMS service: Run the command hpsim -s start in the command prompt.
5. Verify the HMS version: Open a web browser and navigate to https://<server_ip_address>:2381. Log in using your administrative credentials. The HMS version will be displayed on the homepage.


## References For HP SMH
*	[support.hpe.com/hpesc/public/swd/detail?swItemId=MTX_7e09c85426b64f16a78f4d](https://support.hpe.com/hpesc/public/swd/detail?swItemId=MTX_7e09c85426b64f16a78f4d)
*	[https://support.hpe.com/connect/s/softwaredetails?language=en_US&softwareId=MTX_746462c7435141708321e85968](https://support.hpe.com/connect/s/softwaredetails?language=en_US&softwareId=MTX_746462c7435141708321e85968)
*	[HP System Management Homepage : Security vulnerabilities, CVEs (cvedetails.com)](https://www.cvedetails.com/vulnerability-list/vendor_id-10/product_id-7244/HP-System-Management-Homepage.html)


