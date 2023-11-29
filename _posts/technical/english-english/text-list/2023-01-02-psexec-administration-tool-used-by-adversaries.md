---
layout: post3
date: "2023-01-02"
title: "PsExec : Administration Tool Used By Adversaries"
category: a
tags:
  - "Administration"
---


`PsExec`, a command-line tool (utiliy) developed by `sysinternals` (company now a part of Microsoft), enables users to execute commands remotely on Windows systems. `PsExec` typically uses the `Server Message Block (SMB)` protocol. It establishes communication with remote systems over TCP ports `445 (SMB)` and `135 (RPC)` to perform tasks like running processes, transferring files, and executing commands on remote machines.

`SMB (Server Message Block)` is a network file sharing protocol that allows applications to read and write to files and request services from server programs in a computer network.  `PsExec` works by establishing a connection with the target system using the SMB protocol. Once connected, `PsExec` interestingly creates a temporary service on the remote machine, known as `PSEXESVC.exe`. This service acts as an agent for the `PsExec client`, receiving commands and executing them on the remote system. The output of the remote process is then streamed back to the `PsExec client`, allowing the user to interact with the remote application as if it were running locally.

While PsExec serves as a powerful administrative tool, its misuse can lead to security risks. Responsible usage, explicit authorization, and adherence to security best practices are imperative to prevent unauthorized access and potential breaches when employing remote execution tools like PsExec. `SMB (445)` is always activated on Windows unless it is explicitly disabled. 

`SMB` usage, expecially lower versions like `SMBv1`, pose a lot of vulnerabilities systems. [SMB](https://attack.mitre.org/techniques/T1021/002/) and `PsExec` is widely used for [adverse purposes](https://attack.mitre.org/software/S0029/)  for `lateral-movement`. [1](https://attack.mitre.org/techniques/T1569/002/) [2](https://www.sans.org/blog/protecting-privileged-domain-accounts-psexec-deep-dive/) [3](https://blog.ropnop.com/using-credentials-to-own-windows-boxes-part-2-psexec-and-services/#psexec)

`PsExec` it has to be installed on the source system. To use we can simply download it from Microsoft's page. Download folder has many executables inside it.
We can use `PsExec64.exe` since we use it ot Windows 64-Bit computers.

Accessing a target machine involves logging in with a username and password in plaintext, as demonstrated below:
  
```
./PsExec64.exe \\192.168.2.109 -u Administrator -p Passw00rd! ipconfig 
```

```
./PsExec64.exe \\192.168.2.109 -u Administrator -p Passw00rd! cmd.exe 
```

These commands grant access to the target machine for remote execution.


```
# Define the list of servers
$servers = 'Server1', 'Server2', 'Server3', 'Server4'

# Retrieve credentials for remote access
$creds = Get-Credential

# Initialize an array to store remote execution results
$remoteResults = @()

# Create a temporary directory to store intermediate files
$tempDir = New-TemporaryDirectory

# Generate a PowerShell script for remote execution
$scriptPath = Join-Path $tempDir 'remoteScript.ps1'
New-Item -ItemType File -Path $scriptPath -Force

# Write the PowerShell script to the temporary file
$scriptContent = @"
$obj = [PSCustomObject]@{
    Name = $env:COMPUTERNAME
    CPUs = "-------"
}

$obj.CPUs = (Get-WmiObject Win32_ComputerSystem).NumberOfLogicalProcessors
return $obj
"@

Set-Content -Path $scriptPath -Value $scriptContent

# Copy the PowerShell script to remote servers using PsExec
foreach ($server in $servers) {
    $command = "PsExec -s -u $creds.Username,$creds.Password \\\\$server -c powershell -ExecutionPolicy Bypass -File $tempDir\remoteScript.ps1"
    Start-Process -FilePath 'C:\Windows\System32\cmd.exe' -ArgumentList '/k' $command -Wait
}

# Remove the temporary directory and the script file
Remove-Item -Path $tempDir -Recurse -Force

# Collect and process the remote execution results
$remoteResults = Get-Content -Path $tempDir\remoteResults.txt
$remoteResults | Select-Object Name, CPUs -OutFile 'remoteCPUInfo.txt'
```
