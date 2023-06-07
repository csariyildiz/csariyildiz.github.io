
* In server management and monitoring remote access is important to improve server availability, reducing downtime, and simplifying management tasks.
* iLO stands for Integrated Lights-Out, which is a management processor that is embedded on certain models of HPE (formerly HP) servers. 
* The iLO provides a way to manage and monitor the server hardware, even when the server is powered off or unresponsive.

## Versions Of iLO

* There are several versions of iLO, including: iLO, iLO2, iLO3, iLO4, iLO5.
* Each new version of iLO adds new features and improvements over the previous version.
* It is recommended to use the latest version whenever possible for better security and performance.

|    Name   |                         Servers                        |           Latest Firmware          |
|:---------:|:------------------------------------------------------:|:----------------------------------:|
| iLO       | ProLiant G2, G3, G4, and G6 (model numbers under 300)  | 1.96 released 30 April 2014        |
| iLO 2     | ProLiant G4, G5, and G6 (model numbers 300 and higher) | 2.33 released 30 March 2018        |
| iLO 3     | ProLiant G7                                            | 1.94 released 17 December 2020     |
| iLO 4     | ProLiant Gen8 and Gen9                                 | 2.82 released 2 March 2023         |
| iLO 5     | ProLiant Gen10                                         | 2.81 released 30 March 2023        |
| iLO 6     | ProLiant Gen11                                         | 1.20 released 15 February 2023     |


## iLO's Correspoinding Counterpart's: BMC and iBMC
* BMC stands for Baseboard Management Controller.
* Similar to iLO hardware component found on many servers that provides out-of-band management capabilities.
* The BMC is responsible for monitoring the server's hardware, and can provide remote access to the server's console, power control, and other management features. 
* The BMC is typically accessed through a dedicated network port on the server, and is independent of the server's operating system.
* Dell iBMC (Integrated Dell Remote Access Controller) is Dell's implementation of a BMC, and provides similar features and capabilities to iLO and other BMCs. 
* Like iLO, iBMC can provide remote access to the server's console, power control, and hardware monitoring features.
* Through this interface, you can perform operations such as having a backup access to the server and installing an operating system.
* A corresponding counterpart of iLO is iBMC for Dell servers and is actually a BMC (A baseboard management controller).

## Accessing The iLO

* There are several ways to access the iLO interface on an HPE server, including Web Interface, CLI and SNMP interface.
* Web Interface: This is the most common method of accessing iLO, which allows you to access the iLO interface using a web browser.
* Command Line Interface (CLI): The iLO CLI provides a way to access iLO from the command line, using tools such as Telnet, SSH, or remote console access.
* SNMP Interface: iLO also supports the Simple Network Management Protocol (SNMP), which allows you to monitor and manage iLO using standard SNMP tools.
* When dealing with older iLO versions errors like "ERR_SSL_VERSION_OR_CIPHER_MISMATCH" can be seen.
When accessing iLO through the web interface this error occurs when the web browser is unable to establish a secure connection with the iLO server, 
* This errors can be seen typically due to a mismatch in the SSL/TLS version or cipher used by the browser and the iLO server.
* To resolve this issue,
1. Update the browser to the latest version, which may support the required SSL/TLS version or cipher.
2. Update the iLO firmware to the latest version, which may include support for newer SSL/TLS versions or ciphers.
3. Try accessing iLO from a different web browser, which may support the required SSL/TLS version or cipher.
4. If none of these steps work, you may need to contact HPE support for further assistance.

## Redfish

* Redfish is an open, industry-standard specification for remote management of modern data center equipment. It is developed and maintained by the Distributed Management Task Force (DMTF), which is a standards organization that works to develop interoperable IT management standards.
* Redfish is designed to replace traditional management protocols, such as Intelligent Platform Management Interface (IPMI), Simple Network Management Protocol (SNMP), and others. It is based on modern web technologies, such as Representational State Transfer (RESTful) APIs and JavaScript Object Notation (JSON) data format, which provide a more efficient and flexible way to manage data center equipment.
* Redfish defines a standard data model for hardware components, such as servers, storage devices, and networking equipment, and provides a set of APIs for managing these components remotely. Redfish can be used to perform a wide range of management tasks, such as system configuration, firmware updates, event logging, and hardware monitoring.
* Redfish is supported by many hardware vendors, including Dell, HPE, Lenovo, and others, and is rapidly gaining popularity as a modern, efficient, and secure way to manage data center equipment.



References
--------------------------------------------------
* https://www.gigabyte.com/Glossary/bmc
* https://supertekboy.com/2021/11/19/accessing-hpe-ilo-3-fails-with-err-ssl-version-or-cipher-mismatch/
