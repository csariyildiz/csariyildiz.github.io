---
layout: post4
page_name: "Man Pages"
title: "Man Pages"
---

Lorem ipsum dolor sit amet, consecteur adipiscing elit. Maecenas hendrerit a odio et mattis. Sed ultricies dui ut sem ultrices tempus. Aenean sed nisi ac ipsum viverra lacinia at eget mi. Integer at mass.

## Table Of Contents

1. Command List
2. Walkthrough
3. Details

## 1. Command List

* `whereis gshadow` : Locates the binary, source, and manual page files for the gshadow file, which typically stores group password information.
* `locate gshadow` : Finds the pathnames of files containing gshadow.
* `locate -c gshadow` : Finds count for the pathnames of files containing gshadow.
* `locate -c -b gshadow` : Counts entries where gshadow is the basename.
* `locate -b \passwd` : This ensures that the locate command searches for the exact basename passwd.
* `man ls` : Opens manual page for ls.
* `man man` : Opens manual page for man command itself.

-------------------------------------------

* `ls /usr/share/doc` : Lists wc for directory contains documentation for installed packages and software. You will find README files, changelogs, examples, and other documentation files provided by the packages installed on the system. When you install a package using a package manager (like yum, dnf, or apt), it often installs its documentation in `/usr/share/doc/[package-name]`.

* `ls /usr/share/man` : Lists wc for directory contains manual pages (man pages) for various commands and programs. Manual pages are organized into sections, such as: man1, User commands; man2, System calls; man3, Library functions; man4: Special files (usually found in dev). man5, File formats and conventions; man6, Games and screensavers. man7 Miscellaneous. man8 System administration commands. When you use the man command to view a manual page, it retrieves the relevant page from this directory.

* `ls /usr/share/man/man1` : Subdirectories under `/usr/share/man` for different sections of manual pages. Manual pages categorized by their section numbers (1 through 8). To locate specific man pages, use the section directories, e.g., `/usr/share/man/man1` for user commands.

* `ls /usr/share/info` : This directory contains info pages, which are another form of documentation similar to man pages but often more detailed.  Documentation files that can be read using the info command.Use `info [command]` to read the info documentation for a specific command or program.

* `ls /usr/share/licenses` : Subdirectories under `/usr/share/doc` specifically for each package installed.  Package-specific documentation such as README files, licenses, and configuration examples. To read package-specific documentation, navigate to `/usr/share/doc/[package-name]`.

* `date --help` : Displays help for the date command.
* `info ls` : Displays the info documentation for ls. Its similar to less.

---------------------------------

* `H ya da h` : Info help.
* `L` : close page.
* `Q or q` : Quit info.
* `Enter ya da Down Arrow` : Down.
* `Up Ok`: Up.
* `Spacebar` : Next.
* `f ya da PageDown` : Next page.
* `b ya da PageUp` : Previous Page.
* `/ test` : Search next.
* `? text`: Search previous.
* `n` : Find next.
* `N` : Find previous.
