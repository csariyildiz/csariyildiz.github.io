# File Management Practices

## Table Of Contents
## 1. Creating Files And Directories
## 2. Hard Links And Soft Links
## 3. Standard Streams
## 4. Pipes, Wildcards And Globbing 

## 1. Creating Files And Directories

### Tasks:

1. Creating Files:
* Use the touch command to create empty files.
* Use the cp command to copy files.
* Use the vi editor to create and edit files.

2. Creating Directories:

* Use the mkdir command to create new directories.

3. File and Directory Operations:

* Identify the current user with the whoami command.
* Display the current directory with the pwd command.
* Create multiple files (jerry, kramer, george) using the touch command.
* List files in the directory using the ls -l and ls -ltr commands.
* Copy a file (jerry) to multiple new files (lex, clark, lewis) using the cp command.
* Create and edit a file (homer) using the vi editor and save the changes.
* Create multiple files (bart, lisa, marge) using the touch command.
* Verify the current directory with the pwd command.
* Create multiple directories (seinfeld, superman, simpsons) using the mkdir command.
* Navigate to the /etc directory using the cd command.
* Attempt to create a file (test123) in the /etc directory and understand permission issues (permission denied as root owns it).
* Display the current directory with the pwd command.
* Make your user able to write /etc directory.
* Verify permission.
* Create a file named  example.txt in /etc with user and write into it.
* Delete the file. Remove the permission.

### Answers:

1.  **Creating Files:**
    -   Use the `touch` command to create empty files.
    -   Use the `cp` command to copy files.
    -   Use the `vi` editor to create and edit files.
2.  **Creating Directories:**
    -   Use the `mkdir` command to create new directories.
3.  **File and Directory Operations:**
    -   Identify the current user with the `whoami` command.
    -   Display the current directory with the `pwd` command.
    -   Create multiple files (`jerry`, `kramer`, `george`) using the `touch` command.
    -   List files in the directory using the `ls -l` and `ls -ltr` commands.
    -   Copy a file (`jerry`) to multiple new files (`lex`, `clark`, `lewis`) using the `cp` command.
    -   Create and edit a file (`homer`) using the `vi` editor and save the changes.
    -   Create multiple files (`bart`, `lisa`, `marge`) using the `touch` command.
    -   Verify the current directory with the `pwd` command.
    -   Create multiple directories (`seinfeld`, `superman`, `simpsons`) using the `mkdir` command.
    -   Navigate to the `/etc` directory using the `cd` command.
    -   Attempt to create a file (`test123`) in the `/etc` directory and understand permission issues (permission denied as root owns it).
    -   Display the current directory with the `pwd` command.
    -   chmod o+w /etc
    -   vi example.txt

## 2. Understanding and Creating Links

### Tasks:
1.  **Understanding and Creating Soft Links:**
    -   Create a soft link and observe its behavior when the target file is removed.
    -   Use the `pwd` command to display the current directory.
    -   Create a file named `hulk` using the `touch` command.
    -   Navigate to the `/tmp` directory using the `cd` command.
    -   Create a soft link to the `hulk` file in the `/home/myusername` directory using the `ln -s` command.
    -   List files with detailed information using the `ls -ltr` command.
    -   List files including inodes using the `ls -I` command.
    -   Navigate back to the home directory using the `cd` command.
    -   Verify the current directory with the `pwd` command.
    -   List files in the current directory using the `ls -ltr` command.
    -   Write text to the `hulk` file using the `echo` command.
    -   Display the content of the `hulk` file using the `cat` command.
    -   Navigate to the `/tmp` directory and display the content of the `hulk` file using the `cat` command.
    -   List files including inodes using the `ls -ltri` command.
    -   Remove the `hulk` file using the `rm` command.
    -   List files including inodes and verify the link's behavior.
  
2.  **Understanding and Creating Hard Links:**
    -   Create a hard link and observe its behavior when the target file is removed.
    -   Create a file named `hulk` using the `touch` command.
    -   Write text to the `hulk` file using the `echo` command.
    -   Display the content of the `hulk` file using the `cat` command.
    -   Navigate to the `/tmp` directory using the `cd` command.
    -   Create a hard link to the `hulk` file in the `/home/myusername` directory using the `ln` command.
    -   List files with detailed information using the `ls -ltr` command.
    -   Display the content of the `hulk` file using the `cat` command.
    -   Write additional text to the `hulk` file and verify the content from the linked location.
    -   List files in the home directory and `/tmp` directory using the `ls -ltr` command to verify the existence of the hard link after the original file is removed.

### Answers :
1.  **Understanding and Creating Soft Links:**
    -   Create a soft link and observe its behavior when the target file is removed.
        -   `pwd`
        -   `touch hulk`
        -   `cd /tmp`
        -   `ln -s /home/myusername/hulk`
        -   `ls -ltr`
        -   (use `ls -I` to see inodes)
    -   Verify the behavior of the soft link when modifying and deleting the target file.
        -   `cd`
        -   `pwd`
        -   `ls -ltr`
        -   `echo "hulk is good" > hulk`
        -   `cat hulk`
        -   `cd /tmp`
        -   `cat hulk`
    -   Observe inode numbers for soft links.
        -   `cd`
        -   `ls -ltr`
        -   `ls -ltri` (I stands for inodes)
        -   `cd /tmp`
        -   `ls -ltri` (different inode associated with link)
    -   Remove the original file and observe the behavior of the soft link.
        -   `cd`
        -   `pwd`
        -   `ls -ltr`
        -   `rm hulk`
        -   `la -ltr`
        -   `cd /tmp`
        -   `ls -ltr hulk` (observe the broken link)
        -   `cat hulk` (should not work)
        -   `rm hulk` (remove broken link)
2.  **Understanding and Creating Hard Links:**
    -   Create a hard link and observe its behavior when the target file is removed.
        -   `touch hulk`
        -   `echo "hulk is good" > hulk`
        -   `cat hulk`
        -   `cd /tmp`
        -   `ln /home/myusername/hulk`
        -   `ls -ltr`
        -   `cat hulk`
    -   Verify the behavior of the hard link when modifying the target file.
        -   `cd`
        -   `echo "123" >> hulk`
        -   `cd /tmp`
        -   `cat hulk` (verify additional content)
    -   Observe the persistence of the hard link after deleting the original file.
        -   `cd`
        -   `rm hulk`
        -   `ls -ltr`
        -   `cd /tmp`
        -   `ls -ltr` (verify the hard link still exists)
        -   (note that the hard link retains the original content even after the original file is removed)

## 3. Understand Standard Streams in Linux:
### Tasks:
1.  **Redirect Standard Output to a File:**
    -   Redirect the output of the `ls -l` command to a file named `listing`.
    -   Redirect the output of the `pwd` command to a file named `findpath`.
    -   Make sure you show that using `>` will overwrite the contents of the file.
2.  **Append Standard Output to a File:**
    -   Append the output of the `ls -la` command to a file named `listings`.
    -   Append the text "Hello World" to a file named `findpath`.
    -   Make sure you show that `ls -la` includes hidden files.
3.  **Redirect Standard Input from a File:**
    -   Use the `cat` command to display the contents of the `listings`file.
    -   Use the `mail` command to send an email with the contents of `memoletter`.
4.  **Redirect Standard Error to a File:**
    -   Redirect errors from the `ls -l /root` command to a file named `errorfile`.
    -   Redirect errors from the `telnet localhost` command to a file named `errorfile`.
## Answers:
1.  **Redirect Standard Output to a File:**
        -   `ls -l > listing`
        -   `pwd > findpath`
2.  **Append Standard Output to a File:**
        -   `ls -la >> listings`
        -   `echo "Hello World" >> findpath`

3.  **Redirect Standard Input from a File:**
        -   `cat < listings`
        -   `mail -s "Office memo" allusers@abc.com < memoletter`
4.  **Redirect Standard Error to a File:**
        -   `ls -l /root 2> errorfile`
        -   `telnet localhost 2> errorfile`
## 4. Pipes, Wildcards And Globbing 
### Tasks:
1.  **Navigating Directories:**
    -   Display the current directory using the `pwd` command.
    -   Change to the `/etc` directory using the `cd` command.
2.  **Listing Directory Contents:**
    -   List the contents of the `/etc` directory with detailed information using the `ls -ltr` command.
3.  **Using `more` for Paginated Output:**
    -   List the contents of the `/etc` directory with detailed information and view the output one page at a time using the `more` command.
4.  **Using `ll` for Detailed Listing:**
    -   List the contents of the current directory with detailed information using the `ll` command (note that `ll` is often an alias for `ls -l`).
5.  **Using `tail` to View Last Lines:**
    -   List the contents of the current directory and view only the last lines using the `tail -l` command.
6.  **Understanding and Using Pipes:**
    -   Combine the `ls` command with `grep` to filter results.
    -   Use the `ps` command with `grep` to find specific processes.
    -   Count the number of lines in the output of the `ls` command using `wc`.
    -   Display disk usage information and sort the output by size.
7.  **Using Wildcards and File Globbing:**
    -   List all files with a `.txt` extension in the current directory.
    -   List all files that start with `a` in the current directory.
    -   List all files that start with any character followed by `log`.
    -   List all files that start with either `a` or `b` in the current directory.
    -   List all files that do not start with `a` or `b` in the current directory.
    -   List all files with a single character name in the current directory.
    -   List all files with a specific range of characters (e.g., `a` to `c`).

### Answers:
1.  **Navigating Directories:**
    -   Display the current directory using the `pwd`command:
        `pwd`
    -   Change to the `/etc` directory using the `cd`command:
        `cd /etc`
2.  **Listing Directory Contents:**
    -   List the contents of the `/etc` directory with detailed information using the `ls -ltr`command:
        `ls -ltr`
3.  **Using `more` for Paginated Output:**
    -   List the contents of the `/etc` directory with detailed information and view the output one page at a time using the `more`command:
        `ls -ltr | more   `
4.  **Using `ll` for Detailed Listing:**
    -   List the contents of the current directory with detailed information using the `ll` command (note that `ll` is often an alias for `ls -l`):
        `ll`
    -   If `ll`is not available, use:
        `ls -l`
5.  **Using `tail` to View Last Lines:**
    -   List the contents of the current directory and view only the last lines using the `tail -l`command:
        `ls -l | tail -l   `
6.  **Understanding and Using Pipes:**
    -   Combine the `ls` command with `grep`to filter results:
        `ls -l | grep ".conf"`
    -   Use the `ps` command with `grep`to find specific processes:
        `ps aux | grep "sshd"`
    -   Count the number of lines in the output of the `ls` command using `wc`:
        `ls -l | wc -l`
    -   Display disk usage information and sort the output by size:
        `du -sh * | sort -hr   `
7.  **Using Wildcards and File Globbing:**
    -   List all files with a `.txt`extension in the current directory:
        `ls *.txt`
    -   List all files that start with `a`in the current directory:
        `ls a*`
    -   List all files that start with any character followed by `log`:
        `ls ?log`
    -   List all files that start with either `a` or `b`in the current directory:
        `ls [ab]*`
    -   List all files that do not start with `a` or `b`in the current directory:
        `ls [!ab]*`
    -   List all files with a single character name in the current directory:
        `ls ?`
    -   List all files with a specific range of characters (e.g., `a` to `c`):
        `ls [a-c]*`
