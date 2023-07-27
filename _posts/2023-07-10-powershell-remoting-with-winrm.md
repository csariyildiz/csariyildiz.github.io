---
layout: post3
title: "PowerShell Remoting With WinRM"
category: main
tags:
  - PowerShell
  - CLI
  - WinRM
---

WinRM (Windows Remote Management) is a powerful management protocol in Windows that allows you to remotely execute commands and manage systems. 
It is a protocol that PowerShell uses to establish remote connections inside Windows. It is not enabled by default in Windows, so WinRM needs to be configured to listen for WinRM client calls.

WinRM consists of two components: the client, which establishes outbound calls, and the service, which listens for inbound calls.

To check if WinRM is properly configured on a device, you can use the cmdlet Test-WSMan. If no error is returned, it means WinRM has the basic settings correctly configured. Here's an example of the output:


```
> Test-WSMan
wsmid           : http://schemas.dmtf.org/wbem/wsman/identity/1/wsmanidentity.xsd
ProtocolVersion : http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd
ProductVendor   : Microsoft Corporation
ProductVersion  : OS: 0.0.0 SP: 0.0 Stack: 3.0
```


## 1. WinRM Configuration

### Basic WinRM configuration with default settings

```
winrm quickconfig
```

Running this command in the Command Prompt or PowerShell will perform a quick configuration of WinRM using the default settings. It will enable the WinRM service and create a listener for the HTTP transport on the default port (5985). This basic configuration is suitable for testing and development purposes within a local network.


### Example of making more specific settings with quickconfig

```
winrm quickconfig -transport:https
```

This command is specifically configures WinRM to use the HTTPS transport instead of HTTP. This is a more secure option for production environments or scenarios where data needs to be encrypted during transmission. When using HTTPS, the default port used is 5986.

### Check WinRM settings

To check the current WinRM client and service configurations, you can use the following commands:

To view the WinRM client configuration:

```
winrm get winrm/config/client
```
This command will display the client-specific configurations, such as the default authentication settings and the maximum number of concurrent operations allowed.

To view the WinRM service configuration:

```
winrm get winrm/config/service
```

This command will display the service-specific configurations, including the listeners configured (HTTP or HTTPS), the maximum number of concurrent connections allowed, and the authentication settings accepted by the service.

These commands allow you to verify the current WinRM settings on your system, which can be helpful in troubleshooting and ensuring that the configuration aligns with your specific requirements.

For remote management using WinRM, you may also need to configure firewall rules to allow the necessary traffic to pass through to the target machine. 

Depending on our network setup and security requirements, we might need to set up authentication mechanisms like HTTPS certificates or configure WinRM to use different ports or specific IP addresses for listening. 

Its good to always consider security best practices when configuring WinRM for remote management.


### Check Client Configuration

```
PS C:\> winrm get winrm/config/client

```

We see that the configuration shown below is defined.

```
Client Configuration:
    Network Delay (ms) = 5000
    URL Prefix = wsman
    Allow Unencrypted = false
    Authentication:
        - Basic = enabled
        - Digest = enabled
        - Kerberos = enabled
        - Negotiate = enabled
        - Certificate = enabled
        - CredSSP = disabled
    Default Ports:
        - HTTP = 5985
        - HTTPS = 5986
    Trusted Hosts = MyServer

```

The network delay, set to 5000 milliseconds (5 seconds), determines the maximum time the client waits for a response from the server during a WinRM operation. If a response is not received within this time, the operation might be terminated.

The setting "Allow Unencrypted" is set to false, which means that WinRM is configured to reject unencrypted traffic. This enhances security by ensuring that communications are encrypted when using WinRM.

The client configuration shows that it supports various authentication protocols, such as Basic, Digest, Kerberos, Negotiate, and Certificate.

The client is configured to use the default ports (HTTP: 5985 and HTTPS: 5986) when establishing outbound connections to other devices.
These ports are the standard ports for WinRM communication.

It is important to note that WinRM is typically intended for use within trusted networks (e.g., domain to domain traffic) and not exposed directly to the internet.

It is likely that HTTPS is the preferred and secure method for communication.

The client is enabled for various authentication protocols, making it capable of authenticating using the following methods:

* Basic: Basic authentication is enabled, which sends credentials in plain text. It is recommended to use this over a secure channel like HTTPS.
* Digest: Digest authentication is enabled, providing a more secure alternative to Basic authentication.
* Kerberos: Kerberos authentication is enabled, typically used in domain environments for secure authentication between computers.
* Negotiate: This refers to the SPNEGO (Simple and Protected GSSAPI Negotiation Mechanism) authentication, which negotiates the best authentication method supported by both client and server.
* Certificate: Certificate-based authentication is enabled, allowing for secure authentication using X.509 certificates.
* CredSSP: CredSSP (Credential Security Support Provider) is disabled, which is generally preferred for security reasons, as it can expose user credentials to remote servers.

### Checking Service Configuration

This is for listening inbound communications.


```
PS C:\GroupMembers\other\newfolder> winrm get winrm/config/service
```


```
Service Configuration:
    RootSDDL = O:NSG:BAD:P(A;;GA;;;BA)(A;;GR;;;IU)S:P(AU;FA;GA;;;WD)(AU;SA;GXGW;;;WD)
    MaxConcurrentOperations = 4294967295
    MaxConcurrentOperationsPerUser = 1500
    EnumerationTimeoutms = 240000
    MaxConnections = 300
    MaxPacketRetrievalTimeSeconds = 120
    AllowUnencrypted = false
    Authentication:
        Basic = false
        Kerberos = true
        Negotiate = true
        Certificate = false
        CredSSP = false
        CbtHardeningLevel = Relaxed
    DefaultPorts
        HTTP = 5985
        HTTPS = 5986
    IPv4Filter = *
    IPv6Filter = *
    EnableCompatibilityHttpListener = false
    EnableCompatibilityHttpsListener = false
    CertificateThumbprint
    AllowRemoteAccess = true
```

* The "RootSDDL" (Security Descriptor Definition Language) setting specifies the security descriptor for the WinRM service's root resource. It defines access control settings for different users and groups. The provided SDDL grants specific access rights to certain groups, such as "BA" (Built-in Administrators) and "IU" (Interactive Users), while also granting more limited access to "WD" (Everyone) with read, execute, and read/execute permissions. It's essential to ensure that these permissions are appropriately configured to maintain the security and integrity of the WinRM service.

* The "MaxConcurrentOperations" setting is set to the maximum value of 4294967295, indicating that the WinRM service can handle an extremely high number of concurrent operations. This can be advantageous for scenarios with high demand for simultaneous operations, but it also requires sufficient system resources to accommodate the increased workload.

* The "MaxConcurrentOperationsPerUser" specifies that a single user can have up to 1500 concurrent operations at a time. Limiting the number of concurrent operations per user helps prevent resource abuse and ensures fair usage across multiple clients.

* The "EnumerationTimeoutms" defines the timeout period in milliseconds for enumerating resources. With a value of 240,000 milliseconds (240 seconds or 4 minutes), WinRM allows sufficient time to retrieve enumeration results, which can be particularly useful when querying large sets of data or resources.

* The "MaxConnections" setting is set to 300, which limits the maximum number of simultaneous connections to the WinRM service. This restriction helps manage resource utilization and prevents potential service degradation due to an excessive number of connections.

* The "MaxPacketRetrievalTimeSeconds" specifies the maximum time in seconds that the service will spend retrieving a packet. Setting it to 120 seconds ensures that the service promptly processes and delivers packets, avoiding unnecessary delays during data retrieval.

* The "AllowUnencrypted" setting is set to false, indicating that the service does not allow unencrypted traffic. By enforcing encrypted connections, WinRM ensures the confidentiality and integrity of data transmitted between clients and the service.
  
* The "Auth" section specifies the authentication methods allowed by the service. It is only accepts Kerberos and Negotiate.
  * Basic = false: Basic authentication is disabled, which is generally a secure configuration, as it involves transmitting credentials in plain text.
  * Kerberos = true: Kerberos authentication is enabled, providing a secure and efficient authentication mechanism, especially in domain environments.
  * Negotiate = true: SPNEGO (Negotiate) authentication is enabled, allowing negotiation of the best authentication mechanism supported by both client and server. This can enhance compatibility and security when multiple authentication methods are available.

* The "DefaultPorts" setting specifies the default ports used by the WinRM service:

  * HTTP = 5985: WinRM listens for HTTP connections on port 5985, commonly used for non-encrypted communication.
  * HTTPS = 5986: WinRM listens for HTTPS connections on port 5986, offering encrypted and secure communication.

* The "IPv4Filter" is set to "", which means that the service accepts connections from any IPv4 address. This configuration allows communication from any IPv4-enabled device on the network.

* The "IPv6Filter" is set to "", indicating that the service accepts connections from any IPv6 address. This allows communication from any IPv6-enabled device on the network.

* The "EnableCompatibilityHttpListener" is set to false, indicating that the service does not use the compatibility HTTP listener. Compatibility listeners are older, deprecated components, and disabling them ensures that the service adheres to modern security standards.

* The "EnableCompatibilityHttpsListener" is set to false, indicating that the service does not use the compatibility HTTPS listener. As with the HTTP listener, this configuration maintains modern security standards by avoiding the use of deprecated components.

* The "CertificateThumbprint" is not specified, meaning that no specific certificate thumbprint is associated with the service. In scenarios where the service requires client authentication using certificates, this field would contain the appropriate certificate thumbprint.



* The "AllowRemoteAccess" setting is set to true, which means that the service is currently allowing remote access. Allowing remote access is common for administrative purposes, as it enables managing the machine from other systems on the network. However, it's crucial to apply proper access controls and firewall rules to restrict remote access to authorized administrators only and prevent unauthorized access to the WinRM service.

The WinRM service currently alowing remote access. The configuration appears to be well-optimized for security and performance. It enforces encrypted communication, allows for efficient authentication with Kerberos and Negotiate methods, and provides high concurrency capabilities. The allowance of remote access can be beneficial for remote management but should be coupled with strong access controls to maintain the service's security posture. Regular audits and monitoring of the service's access logs can help identify and respond to potential security concerns.


## 1.3 Listener

To inspect the current WinRM listener configuration, execute the following command in PowerShell or Command Prompt:

```
PS C:\GroupMembers\other\newfolder>  winrm enumerate winrm/config/listener
```

```
Listener
    Address = *
    Transport = HTTP
    Port = 5985
    Hostname
    Enabled = true
    URLPrefix = wsman
    CertificateThumbprint
    ListeningOn = 127.0.0.1, 172.16.1.193, ::1
```

* The "Address" setting specifies that the WinRM listener is bound to all available IP addresses, represented by the asterisk (). This means that the listener accepts inbound connections from any IP address, including multiple NICs (Network Interface Cards) if present.

* The "ListeningOn" field displays the IP addresses on which the WinRM listener is actively listening for incoming connections. In this example, the listener is listening on three IP addresses: 127.0.0.1 (localhost), 172.16.1.193 (an IPv4 address), and ::1 (IPv6 localhost address).

* The "Transport" is set to HTTP, indicating that the WinRM listener is currently configured to use the HTTP protocol. This means that communication with the WinRM service occurs over unencrypted HTTP connections, which might not be suitable for sensitive data transmission.

* The "Port" is set to 5985, which is the default port for HTTP-based WinRM communication. It specifies the port number on which the WinRM service listens for incoming HTTP connections.

* The "Hostname" field is empty, indicating that the WinRM listener is not bound to a specific hostname. In this configuration, it listens on all available hostnames.

* The "Enabled" setting is set to true, indicating that the WinRM listener is active and ready to accept incoming connections.

* The "URLPrefix" specifies the URL prefix used for WinRM connections, and it is set to "wsman," which is the default prefix for WinRM communication.

* The "CertificateThumbprint" field is empty, indicating that no specific certificate thumbprint is associated with the listener. When using HTTPS (secure communication), this field would contain the thumbprint of the SSL certificate used for encryption.

* We see currently listening ip addresses. (multiple NIC's.) We can configure listener ip address.
* It is HTTP only. Listens any address ip address inbound.
* It can be very granular and very secured. (only from certain addresses, over certain protocols, using cetain authentication mechanisms.)



The current WinRM listener configuration reveals that it is listening on all available IP addresses and is configured to use the HTTP protocol. This setup allows inbound connections from any IP address, which may not always be the most secure option, especially when dealing with sensitive data or in production environments.

WinRM listeners can be customized to be more granular and secure by configuring them to accept connections from specific IP addresses or subnets, limiting the allowed protocols (e.g., HTTPS only), and enforcing specific authentication mechanisms (e.g., Kerberos, HTTPS with certificates). Such configurations are often employed to ensure better security, compliance, and network control when using WinRM for remote management.

To enhance the security of WinRM communications, it is recommended to consider switching to HTTPS (encrypted communication) and restrict listener access to specific trusted IP addresses or subnets. This can be achieved by modifying the listener settings and firewall rules to align with the organization's security policies and requirements. Additionally, using SSL certificates for encryption can further protect sensitive data during transmission.




## 2. Windows To Windows Remote Connection

* In our scenario both devices on the same domain. (Common scenario with Enterprise Environment)
* They will use WinRM HTTP by default.

* We will verify WinRM connection on the remote device.
* We must specft the authentication type.
* If not sure then set it to Negotiate.

We are getting credentials using Get-Credential cmdlet. 
Loading results to credential variable.

```
$credential = Get-Credential
```

* Enter domain credentials.
* Password is stored securely.

```
$RemoteDeviceName = 'remotewindows01'
Test-WSMan $RemoteDeviceName -Authentication Negotiate -Credential $credential
```

Same as local results. Indicating credentials, authentication methods, remote machine has WinRM and its configuration successfull. 

We can also verify local device is listening on WinRM port

```
Get-NetTCPConnection -LocalPort 5985
```

We need powershell 5.1 for this command. Powershell 6 vs 5.1 has difference not all commands are avaible.

```
$PSVersionTable
```

Open powershell 5 and write command there.
```

#verify a remote device is listening on WinRM port
Test-NetConnection -Computername 192.168.34.13 -Port 5985
```

## Establishing Remote Session

Similar to ssh in Linux world.
Enter a Powershell session on remote device.

```
# Open a Powershell session to remote device.
$credential = Get-Credential
Enter-PSSession -ComputerName RemoteDeviceName -Credential $credential
```

Better than rdp.

We can get out by exit.


## Remote Configuration

We will use New-PSSession to affect many devices.

```
# Basic session opened to remote device
$session = New-PSSession -ComputerName RemoteDeviceName -Credential domain\user
```
```
$session
```
We can use this session with Invoke-Command to perform various tasks.

```
Invoke-Command -Session $session -ScriptBlock {hostname}
```

```
#establish session to an entire list of devices
$devices = Get-Content -Path C:\listOfServers.txt
$credential = Get-Credential
$multiSession = New-PSSession -ComputerName $devices -Credential $credential
```

## Questions:
* How to use WinRM?
* Can WinRM 


## References

* https://www.youtube.com/watch?v=qvJRaYlxI1w&t=199s
* [Running Remote Commands](https://docs.microsoft.com/en-us/powershell/scripting/learn/remoting/running-remote-commands?view=powershell-6)
* [Windows Remote Management](https://docs.microsoft.com/en-us/windows/win32/winrm/portal)
* [Installation and Configuration for Windows Remote Management](https://docs.microsoft.com/en-us/windows/win32/winrm/installation-and-configuration-for-windows-remote-management)
* [Making the second hop in PowerShell Remoting](https://docs.microsoft.com/en-us/powershell/scripting/learn/remoting/ps-remoting-second-hop?view=powershell-6)
* [PowerShell remoting over SSH](https://docs.microsoft.com/en-us/powershell/scripting/learn/remoting/ssh-remoting-in-powershell-core?view=powershell-6)
* [How to configure WinRM for HTTPS manually](https://www.visualstudiogeeks.com/devops/how-to-configure-winrm-for-https-manually)
* hostname, #PSVersionTable
