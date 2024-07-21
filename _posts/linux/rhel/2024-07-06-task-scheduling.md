---
layout: post4
page_name: "Task Scheduling"
title: "Task Scheduling"
---

In this section, we will discuss date configuration in Linux and creating scheduled tasks with crontab and at tools.

## Table Of Contents

1. Command List
2. Walkthrough
  2.1 chrony and chronyd
  2.2 crond and crontab
3. Details

## 1. Command List

## 2. Walkthrough

## chrony ve chronyd


chrony works as NTP client. chronyd is defined as a daemon, so it has no interface.

```
[root@rhel-9-3 home]# ps aux | grep /usr/sbin/chronyd
chrony     45192  0.0  0.0  84596  2548 ?        S    02:11   0:00 /usr/sbin/chronyd -F 2

root@rhel-9-3 home]# systemctl status chronyd
● chronyd.service - NTP client/server
     Loaded: loaded (/usr/lib/systemd/system/chronyd.service; enabled; preset: enabled)
     Active: active (running) since Thu 2024-07-18 02:11:33 +03; 3h 4min ago
       Docs: man:chronyd(8)
```

As a deamon it has configuration file under /etc/chrony.conf. And service unit file for systemd under /usr/lib/systemd/system/chronyd.service


```
cat /etc/chrony.conf
```


chrony uses chronyc as the interface:


```
root@rhel-9-3 home]# whatis chronyc
chronyc (1)          - command-line interface for chrony daemon
```


Aşağıdaki gibi tarihi görüntüleyebiliyoruz:

```
date
```

Aşağıdaki gibi tarih girebiliriz:

```
date -s "12 Mar 23 12:19"
```

## crond ve crontab

Benzer şekilde bir de crond daemonumuz var. Bu direkt cron joblarını çalıştırmaktan sorumlu.


```
[root@rhel-9-3 home]# ps aux | grep cron
root       45144  0.0  0.0 223924  3724 ?        Ss   02:11   0:00 /usr/sbin/crond -n
```

```
systemctl status crond
```


Lists detailed information about the /etc/crontab file, including permissions, owner, group, size, and modification time.


```
[root@rhel-9-3 home]# ls -ltr /etc/crontab
-rw-r--r--. 1 root root 451 Mar 23  2022 /etc/crontab
```


```
ls -l /etc/crontab
```

Lists detailed information about all files in the /etc/cron.d/ directory, which contains additional cron job definitions.

```
ls -l /etc/cron.d/
```

Displays the contents of the /etc/crontab file, showing the system-wide cron jobs.

```
cat /etc/crontab
```

```
cat /etc/cron.daily/
cat /etc/cron.hourly/
cat /etc/cron.weekly/
cat /etc/cron.monthly/
```

Lists the cron jobs for the current user.

```
crontab -l
```

Opens the current users cron table for editing in the default text editor.

```
crontab -e
```

A cron job added to the users crontab that runs at 13:22 (1:22 PM) every day in March, and writes the text "This is my first crontab entry" to a file named crontab-entry.

```
22 13 * 3 * echo "This is my first crontab entry" > crontab-entry
```

```
0 1 * * * - Run the command at 1:00 AM every day.
*/15 * * * * - Run the command every 15 minutes.
```



```
 Example of job definition:
 .---------------- minute (0 - 59)
 |  .------------- hour (0 - 23)
 |  |  .---------- day of month (1 - 31)
 |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
 |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
 |  |  |  |  |
 *  *  *  *  * user-name  command to be executed
```

Removes the current user's crontab, deleting all scheduled cron jobs for the user.

```
crontab -r
```

At the at> prompt, enter the command you want to run (e.g., echo "Hello, World!"), then press Ctrl+D.

```
at 14:30 
at> echo "Hello, World!"
at> <Ctrl+D>
```

```
systemctl status atd
```

Use the atq command to list scheduled jobs

```
atq
```

If you need to remove a scheduled job, use the atrm command followed by the job ID.

```
atrm <job_id>
```

## 3. Details