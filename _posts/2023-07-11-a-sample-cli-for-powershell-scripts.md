---
layout: post3
title: "A Sample CLI For Powershell Scripts"
category: main
thumb: "enrona_1"
tags:
  - PowerShell
  - CLI
---

I needed a simple command line interface for my commands running on Powershell. 
Following script that creates a menu for execution of functions is quite useful. 

* Tested with `Windows 10 Enterprise` and `PSVersion 5.1.19041.3031`

<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/powershell_menu.png" class="img-fluid" alt="Sample Email Enron">

You can save it to a file named like `test.ps1` and run.

-----------------------------------------------------

The content of script content is as follows:

```
function mainMenu {
    $mainMenu = 'X'
    while($mainMenu -ne ''){
        Clear-Host
        Write-Host "`n`t`t My Script`n"
        Write-Host -ForegroundColor Cyan "Main Menu"
        Write-Host -ForegroundColor DarkCyan -NoNewline "`n["; Write-Host -NoNewline "1"; Write-Host -ForegroundColor DarkCyan -NoNewline "]"; `
            Write-Host -ForegroundColor DarkCyan " Submenu1"
        Write-Host -ForegroundColor DarkCyan -NoNewline "`n["; Write-Host -NoNewline "2"; Write-Host -ForegroundColor DarkCyan -NoNewline "]"; `
            Write-Host -ForegroundColor DarkCyan " Submenu2"
        $mainMenu = Read-Host "`nSelection (leave blank to quit)"
        # Launch submenu1
        if($mainMenu -eq 1){
            subMenu1
        }
        # Launch submenu2
        if($mainMenu -eq 2){
            subMenu2
        }
    }
}

function subMenu1 {
    $subMenu1 = 'X'
    while($subMenu1 -ne ''){
        Clear-Host
        Write-Host "`n`t`t My Script`n"
        Write-Host -ForegroundColor Cyan "Sub Menu 1"
        Write-Host -ForegroundColor DarkCyan -NoNewline "`n["; Write-Host -NoNewline "1"; Write-Host -ForegroundColor DarkCyan -NoNewline "]"; `
            Write-Host -ForegroundColor DarkCyan " Say hello"
        Write-Host -ForegroundColor DarkCyan -NoNewline "`n["; Write-Host -NoNewline "2"; Write-Host -ForegroundColor DarkCyan -NoNewline "]"; `
            Write-Host -ForegroundColor DarkCyan " Say goodbye"
        $subMenu1 = Read-Host "`nSelection (leave blank to quit)"
        $timeStamp = Get-Date -Uformat %m%d%y%H%M
        # Option 1
        if($subMenu1 -eq 1){
            Write-Host 'Hello!'
            # Pause and wait for input before going back to the menu
            Write-Host -ForegroundColor DarkCyan "`nScript execution complete."
            Write-Host "`nPress any key to return to the previous menu"
            [void][System.Console]::ReadKey($true)
        }
        # Option 2
        if($subMenu1 -eq 2){
            Write-Host 'Goodbye!'
            # Pause and wait for input before going back to the menu
            Write-Host -ForegroundColor DarkCyan "`nScript execution complete."
            Write-Host "`nPress any key to return to the previous menu"
            [void][System.Console]::ReadKey($true)
        }
    }
}

function subMenu2 {
    $subMenu2 = 'X'
    while($subMenu2 -ne ''){
        Clear-Host
        Write-Host "`n`t`t My Script`n"
        Write-Host -ForegroundColor Cyan "Sub Menu 2"
        Write-Host -ForegroundColor DarkCyan -NoNewline "`n["; Write-Host -NoNewline "1"; Write-Host -ForegroundColor DarkCyan -NoNewline "]"; `
            Write-Host -ForegroundColor DarkCyan " Show processes"
        Write-Host -ForegroundColor DarkCyan -NoNewline "`n["; Write-Host -NoNewline "2"; Write-Host -ForegroundColor DarkCyan -NoNewline "]"; `
            Write-Host -ForegroundColor DarkCyan " Show PS Version"
        $subMenu2 = Read-Host "`nSelection (leave blank to quit)"
        $timeStamp = Get-Date -Uformat %m%d%y%H%M
        # Option 1
        if($subMenu2 -eq 1){
            Get-Process
            # Pause and wait for input before going back to the menu
            Write-Host -ForegroundColor DarkCyan "`nScript execution complete."
            Write-Host "`nPress any key to return to the previous menu"
            [void][System.Console]::ReadKey($true)
        }
        # Option 2
        if($subMenu2 -eq 2){
            $PSVersionTable.PSVersion
            # Pause and wait for input before going back to the menu
            Write-Host -ForegroundColor DarkCyan "`nScript execution complete."
            Write-Host "`nPress any key to return to the previous menu"
            [void][System.Console]::ReadKey($true)
        }
    }
}

mainMenu
```

Its noted that,

* Script allows nesting as many menus deep as we need and we can put `our code` to execute at any level. 
* `pause` is put when the code executes waiting for a user to press any key. 
* If you don't have that in there, the script will clear the console and go back to the menu after your code executes. 
* So that we can review the output before returning to the menu system.
* Script work well but switching to `WinForms` might be also an option.

## Reference
* [stackoverflow.com/questions/38924659/powershell-multi-choice-menu-and-sub-menu - Jon Dechiro](https://stackoverflow.com/questions/38924659/powershell-multi-choice-menu-and-sub-menu)
