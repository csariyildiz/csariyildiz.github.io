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

This command is similar to the previous one, but it specifically configures WinRM to use the HTTPS transport instead of HTTP. This is a more secure option for production environments or scenarios where data needs to be encrypted during transmission. When using HTTPS, the default port used is 5986.

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


### Client Configuration

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

### 1.2 Service

This is for listening inbound communications.


```
PS C:\GroupMembers\other\newfolder> winrm get winrm/config/service
```


```
Service
    RootSDDL = O:NSG:BAD:P(A;;GA;;;BA)(A;;GR;;;IU)S:P(AU;FA;GA;;;WD)(AU;SA;GXGW;;;WD)
    MaxConcurrentOperations = 4294967295
    MaxConcurrentOperationsPerUser = 1500
    EnumerationTimeoutms = 240000
    MaxConnections = 300
    MaxPacketRetrievalTimeSeconds = 120
    AllowUnencrypted = false
    Auth
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

* This is only accepts Kerberos and Negotiate.
* Uses ports 5985,5986.
* Currently alowing remote access.

## 1.3 Listener


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

* We see currently listening ip addresses. (multiple NIC's.) We can configure listener ip address.
* It is HTTP only. Listens any address ip address inbound.
* It can be very granular and very secured. (only from certain addresses, over certain protocols, using cetain authentication mechanisms.)

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

## References









* https://www.youtube.com/watch?v=qvJRaYlxI1w&t=199s
* [Running Remote Commands](https://docs.microsoft.com/en-us/powershell/scripting/learn/remoting/running-remote-commands?view=powershell-6)
* [Windows Remote Management](https://docs.microsoft.com/en-us/windows/win32/winrm/portal)
* [Installation and Configuration for Windows Remote Management](https://docs.microsoft.com/en-us/windows/win32/winrm/installation-and-configuration-for-windows-remote-management)
* [Making the second hop in PowerShell Remoting](https://docs.microsoft.com/en-us/powershell/scripting/learn/remoting/ps-remoting-second-hop?view=powershell-6)
* [PowerShell remoting over SSH](https://docs.microsoft.com/en-us/powershell/scripting/learn/remoting/ssh-remoting-in-powershell-core?view=powershell-6)
* [How to configure WinRM for HTTPS manually](https://www.visualstudiogeeks.com/devops/how-to-configure-winrm-for-https-manually)
* hostname, #PSVersionTable
