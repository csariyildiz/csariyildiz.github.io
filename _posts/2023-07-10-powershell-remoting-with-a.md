---
layout: post3
title: "PowerShell Remoting With WinRM"
category: main
thumb: "enrona_1"
tags:
  - PowerShell
  - CLI
  - WinRM
---



* WinRM is the protocol that PowerShell uses for establishing remote connection inside of Windows.
* WinRM is not natively set up inside of Windows. 
* We need to configure it to listen for winrm calls.
* WinRM has to components client and service.
* Client establishes outbound calls, service is listening for inbound calls.
* We use cmdlet, Test-WSMan to see the device is configured for WinRM.
* This doesn't get error. So it has configuration.


```
> Test-WSMan
wsmid           : http://schemas.dmtf.org/wbem/wsman/identity/1/wsmanidentity.xsd
ProtocolVersion : http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd
ProductVendor   : Microsoft Corporation
ProductVersion  : OS: 0.0.0 SP: 0.0 Stack: 3.0

```

## 1. WinRM Configuration


* Basic WinRM configuration with default settings.


```
winrm quickconfig

```
* An example is showing how to make more spesific settings with quickconfig.

```
winrm quickconfig -transport:https

```
* Check winrm settings.

```
winrm get winrm/config/client
winrm get winrm/config/service

```
### 1.1 Client


```
PS C:\> winrm get winrm/config/client

Client
    NetworkDelayms = 5000
    URLPrefix = wsman
    AllowUnencrypted = false
    Auth
        Basic = true
        Digest = true
        Kerberos = true
        Negotiate = true
        Certificate = true
        CredSSP = false
    DefaultPorts
        HTTP = 5985
        HTTPS = 5986
    TrustedHosts = MyServer

```

* This shows client is able to following authentication protocols. (Basic,Digest...)
* It is configured to use default ports when connectiong outbound to other devices.
* For domain to domain traffic, it supposed to be inside the confines of your "trusted network". So not for the internet.
* Jumping to HTTPS is likely.

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







* https://www.youtube.com/watch?v=qvJRaYlxI1w&t=199s
* [Running Remote Commands](https://docs.microsoft.com/en-us/powershell/scripting/learn/remoting/running-remote-commands?view=powershell-6)
* [Windows Remote Management](https://docs.microsoft.com/en-us/windows/win32/winrm/portal)
* [Installation and Configuration for Windows Remote Management](https://docs.microsoft.com/en-us/windows/win32/winrm/installation-and-configuration-for-windows-remote-management)
* [Making the second hop in PowerShell Remoting](https://docs.microsoft.com/en-us/powershell/scripting/learn/remoting/ps-remoting-second-hop?view=powershell-6)
* [PowerShell remoting over SSH](https://docs.microsoft.com/en-us/powershell/scripting/learn/remoting/ssh-remoting-in-powershell-core?view=powershell-6)
* [How to configure WinRM for HTTPS manually](https://www.visualstudiogeeks.com/devops/how-to-configure-winrm-for-https-manually)
* hostname, #PSVersionTable