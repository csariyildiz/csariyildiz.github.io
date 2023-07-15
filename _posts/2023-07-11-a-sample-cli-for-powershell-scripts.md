---
layout: post3
title: "A Sample CLI For Powershell Scripts"
category: main
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

<script src="https://gist.github.com/csariyildiz/cf248ff832d98d81ad8e643650c2edf4.js"></script>

Its noted that,

* Script allows nesting as many menus deep as we need and we can put `our code` to execute at any level. 
* `pause` is put when the code executes waiting for a user to press any key. 
* If you don't have that in there, the script will clear the console and go back to the menu after your code executes. 
* So that we can review the output before returning to the menu system.
* Script work well but switching to `WinForms` might be also an option.

## Reference
* [Powershell Multi-choice Menu and Sub menu - Stack Overflow](https://stackoverflow.com/questions/38924659/powershell-multi-choice-menu-and-sub-menu)
