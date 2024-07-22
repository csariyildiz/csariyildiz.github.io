---
layout: post4
page_name: "File Operations"
title: "File Operations"
---

Lorem ipsum dolor sit amet, consecteur adipiscing elit. Maecenas hendrerit a odio et mattis. Sed ultricies dui ut sem ultrices tempus. Aenean sed nisi ac ipsum viverra lacinia at eget mi. Integer at mass.

## Table Of Contents

1. Command List
2. Walkthrough
3. Details

## 1. Command List

* `mkdir spiders` : Creates a directory named spiders.
* `touch spidertxt` : Creates an empty file named spidertxt.
* `ln -s spiders spidersoftlink` : Creates a symbolic (soft) link named spidersoftlink that points to spiders.
* `ln spiders spiderhardlink` : Creates a hard link named spiderhardlink that points to spiders.
* `ln -s /file/directory spidersoftlink` : Creates a symbolic (soft) link named spidersoftlink that points to /file/directory.
* `ln /file/directory spiderhardlink` : Creates a hard link named spiderhardlink that points to /file/directory. note that the hard link retains the original content even after the original file is removed.

--------------------------------------------

* `rm spiderlink` : Removes a link (symbolic or hard) named spiderlink.
* `rm spiderfile` : Removes the file spiderfile.
* `rmdir spiders` : Removes an empty directory named spiders.
* `rm -r spiders` : Recursively removes the directory spiders and its contents.
* `rm -rf spiders` : Recursively and forcefully removes the directory spiders and its contents.
  
--------------------------------------------

* `ls -ltr` : Lists files and directories in the current directory in long format, sorted by modification time, newest last.
* `ls -ltri` : Lists files and directories with detailed information including inode numbers, sorted by modification time, newest last.
* `vi spidertxt` : Opens the file spidertxt in the vi editor.
* `wq!` : In vi, writes changes to the file and quits the editor, forcefully if necessary.
* `cd /etc` : Changes the current directory to /etc. We can't write to etc directory unless we are root.
* `mv spidertxt renamedtxt` : Renames the file spidertxt to renamedtxt.
* `echo hi` : Prints hi to the terminal.
* `echo "hello whats up" > batmantxt` : Writes "hello whats up" to batmantxt, overwriting its contents if it exists.
* `echo "hello whats up" >> batmantxt` : Appends "hello whats up" to batmantxt.
* `cp spidertxt copytxt` : Copies spidertxt to copytxt.

--------------------------------------------
  
* `ls -l /root 0< inputfile ` : To redirect a file as the standard input to a command. Same as <.
* `ls -l /root 1>outputfile` : Lists files in /root, redirecting any errors to outputfile. Same as >.
* `ls -l /root 2>errorfile` : Lists files in /root, redirecting any errors to errorfile.  
* `ls -l /root 1> outputfile 2> errorfile ` : Multiple redirect
* `ls -l /root > outputfile 2>&1 ` : Redirect both. Same as ls -l /root &> outputfile.

--------------------------------------------

* `telnet localhost 2>errorfile` : Attempts to start a telnet session to localhost, redirecting any errors to errorfile.
* `cat < listings` : Reads the contents of listings and displays them on the terminal.
* `mail -s "Office memo" allusers@abc.com < memoletter` : Sends an email with the subject "Office memo" to allusers@abc.com with the contents of memoletter.
  
--------------------------------------------

* `ls -l | tail -n 10` : Lists files in long format and shows the last 10 lines of the output.
* `ls -ltr | more` : Lists files in long format, sorted by modification time, newest last, and paginates the output using more.
* `ls -l | grep ".conf"` : Combine the ls command with grepto filter results.
* `ps aux | grep "sshd"` : Use the ps command with grepto find specific processes.
* `ls -l | wc -l` : Count the number of lines in the output of the ls command using wc.
* `du -sh * | sort -hr   ` : Display disk usage information and sort the output by size.
  
--------------------------------------------

* `ls *.txt` : List all files with a .txtextension in the current directory.
* `ls a*` : List all files that start with ain the current directory.
* `ls ?log` : List all files that start with any character followed by log.
* `ls [ab]*` : List all files that start with either a or bin the current directory.
* `ls [!ab]*` : List all files that do not start with a or bin the current directory.
* `ls ?` : List all files with a single character name in the current directory.
* `ls [a-c]*` : List all files with a specific range of characters (e.g., a to c).
