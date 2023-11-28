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
