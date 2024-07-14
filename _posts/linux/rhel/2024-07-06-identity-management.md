---
layout: post4
page_name: "Identity Management"
title: "Identity Management"
---

* `whoami`: Displays the current logged-in username.
* `su spiderman` : Switches to the user spiderman.
* `passwd` : Changes the password for a user. If run as root, it can set or change the password for any user.
* `su -` : Switches to the root user and loads the root users environment.
* `ls -ltr` : Lists files and directories with detailed information, sorted by modification time, newest last.
----------------------------------------------
* `cat /etc/group` : Displays the contents of the /etc/group file, which contains group information and user-group associations. (Ref: how to read output)
* `useradd spiderman` : Creates a new user account named spiderman with default settings.
* `groupadd superheroes` : Creates a new group named superheroes.
----------------------------------------------
* `useradd -s /sbin/nologin spiderman` : Creates a user named spiderman but restricts login by setting the login shell to /sbin/nologin `. This can be seen in the /etc/passwd file.
* `useradd -g superheroes spiderman` : Creates a user named spiderman and assigns them to the superheroes group.
* `useradd -g superheroes -s /bin/bash -c "my description" -m -d /home/batman batman` : Creates a user named batman with specific details.
----------------------------------------------
* `id spiderman`: Displays user information, such as UID, GID, and group memberships for spiderman.  (Ref: how to read output)
----------------------------------------------
* `usermod -l newusername oldusername`: Changes the login name of the user from oldusername to newusername.
* `usermod -s /usr/sbin/nologin spiderman`: Disables login for spiderman by setting their shell to /usr/s
* `usermod -G superheroes spiderman`: Replaces group.
* `usermod -aG superheroes spiderman`: Adds the user spiderman to the superheroes group without removing them from other groups.
* `usermod -G spiderman spiderman`: Spiderman only has itself.
* `usermod -aG wheel spiderman`: Adds the user spiderman to the wheel group, which often has sudo privileges.
* `usermod -aG group1 group2` : Groups can be member of eachother.
* `usermod -e 2024-12-31 spiderman`: Sets the account expiration date for spiderman.
* `usermod -f 30 spiderman`: Sets the number of days after a password expires until the account is permanently disabled for spiderman.
----------------------------------------------
* `chmod 755 spiderfile`: Sets the permissions of spiderfile to rwxr-xr-x (read, write, and execute for the owner, read and execute for the group and others).
* `chmod -R 755 spiders`: Recursively sets the permissions of spiders and its contents to rwxr-xr-x.
* `chmod u+r spiderfile`: Adds read permission for the owner of spiderfile. Can be used with permissions u,o,g, permissions r,w,x and - and +.
* `chgrp root spiderfile`: Changes the group of spiderfile to root.
* `chown root spiderfile`: Changes the owner of spiderfile to root.
* `chown spiderman:superheroes spiderfile`: Changes the owner of spiderfile to spiderman and the group to superheroes.
----------------------------------------------
* `chgrp -R superheroes /path/to/files`: Changes the group ownership of files and directories recursively to superheroes.
* `chown -R spiderman  /path/to/files`:  Changes the group ownership of files and directories recursively to superheroes. 
* `chown -R spiderman:superheroes  /path/to/files`:  Changes user and group ownership of files and directories recursively to superheroes and spiderman. 
* `chage -m 5 -M 90 -W 10 -I 3 spiderman`: Changes user password aging information for spiderman. (Ref: how to write and man help)
----------------------------------------------
* `cat /etc/shadow`: Displays the contents of the /etc/shadow file, which stores encrypted password information and other account data.
* `cat /etc/passwd`: Displays the contents of the /etc/passwd file, which contains user account information.
----------------------------------------------
* `userdel -r spiderman`: Deletes the user spiderman and their home directory and mail spool.
* `groupdel superheroes`: Deletes the superheroes group.
* `userdel spiderma`n: Deletes the user spiderman.
----------------------------------------------
* `passwd -l spiderman`: Locks the user account spiderman.
* `passwd -u spiderman`: Unlocks the user account spiderman.
----------------------------------------------
* `groups spiderman`: Displays the groups spiderman belongs to.
----------------------------------------------
* `visudo`: Edits the sudoers file securely. The command opens the /etc/sudoers file in the system's default text editor, typically vi or nano.
----------------------------------------------
* `cat /etc/login.defs`: Displays the contents of the /etc/login.defs file, which contains configuration settings for user account management, including password aging, UID/GID ranges, and default paths. (Ref: how to read output)
* `cat /etc/sudoers`: Displays the contents of the /etc/sudoers file, which configures which users have administrative (sudo) privileges and which commands they can run. (Ref: how to read output)
----------------------------------------------
* `whereis sudoers` : Locates the sudoers file and any associated binaries and source files.
* `man usermod` : Displays the manual page for the usermod command, detailing its usage and options.
* `usermod --help` : Displays help information for the usermod command, listing its options and usage.
* `groupmod --help` : Displays help information for the usermod command, listing its options and usage.bin/nologin.
* `dmidecode` : Displays detailed system hardware information. Typically requires root or sudo privileges.
* `fdisk -l` : Lists disk partitions. Typically requires root or sudo privileges.
* `grep spiderman /etc/group` : Searches for the user spiderman in the /etc/group file to check group memberships.
* cat /home/spiderman/.bash_history` : Lists spiderman's bash history.
* `lastlog` : Displays the last login times of all users.
* `last` : Displays recent login history.
