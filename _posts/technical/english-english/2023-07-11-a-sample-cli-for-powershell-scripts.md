---
layout: post3
title: "A Sample CLI For Powershell Scripts"
category: main
cat: SysAdmin
tags:
  - PowerShell
  - CLI
  - ChatGPT
---

If you're seeking a convenient and user-friendly solution to manage your PowerShell commands, this script provides an alternative command line interface.
It offers a user-friendly menu system that simplifies the execution of functions and makes PowerShell tasks easy to manage.

As an alternative to complexities of command syntax this type of approach might usefull to enhance PowerShell user experience.
We know from various examples that such interfaces in NodeJS apps.[^1][^2] And despite their modest appearance, they can be extremely effective and successful in some cases.

Tested on `Windows 10 Enterprise` with `PSVersion 5.1.19041.3031`, this script provides a reliable and efficient solution for managing your commands. 

<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/powershell_menu.png" class="img-fluid" alt="Sample Email Enron">

I also used ChatGPT to improve the original script[^3]. Since I think this is also important for practice of using chatgpt I also wanted to share improvements it made.

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

## ChatGPT Improvements

* Renamed functions to follow PowerShell's verb-noun naming convention for consistency and clarity.
* Consolidated the menu display code into separate functions for better organization.
* Added a new function, Execute-Task, to handle task execution based on user input, with better error handling for invalid selections.
* Utilized a switch statement instead of multiple if statements for better readability and maintainability.
* Incorporated a do-while loop to continuously display the main menu and allow the user to navigate through submenus until they choose to exit.
* Added validation to display an error message for invalid selections.
* Implemented parameterization for the Execute-Task function to pass the user's selection as a parameter.

## References
[^1]: [Nodeschool](https://nodeschool.io/) has an interactive tool works like that. This application, which is also a NodeJs package, aims to teach nodejs.
[^2]: [This](https://www.youtube.com/watch?v=sJdqdGxRbXY&ab_channel=Codevolution) example shows a basic NodeJS app with this features.
[^3]: [Powershell Multi-choice Menu and Sub menu - Stack Overflow](https://stackoverflow.com/questions/38924659/powershell-multi-choice-menu-and-sub-menu)



