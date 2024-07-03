---
title: "Downloading Video Using A Bat Script"
---
One may need to download a video from a website in certain purposes. 
While there are online platforms that facilitate the task, there are also specialized libraries developed by groups or individual developers.
One of them is the `yt-dlp` library offers a comprehensive tool for video downloading from YouTube. In this document we will explore the process of downloading videos using `yt-dlp` and `a batch file with .bat extension` in a `Windows` operating system.

Please keep in mind there could be copyright issues if you monetize or use this commercially.
 
<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/yt-dlp-post.png" class="img-fluid" alt="ytdlp post">


## Overview

yt-dlp is an enhanced fork of the widely-used youtube-dl tool, extending its functionality with new features and improvements. It supports a broad array of websites, offering versatility for different video sources. 
With yt-dlp, users can download videos in various formats and qualities, and it also provides options for downloading subtitles and playlists. 
This guide will cover the installation process, basic commands, and advanced usage tips to fully leverage this powerful tool.

* It can be made by online tools but a strong alternative is using an executable.
* I created scripts and bin directory in my D: disk. In scripts I got a file named yt.bat.

```
@echo off
echo Batch Script to take input.
set /p input=Type YouTube URL: 
set message=yt-dlp -f "bv+ba/b" "%input%"
echo Running: %message%
%message%
echo Done.
pause
```



We used the yt-dlp executable and also needed ffmpeg. It was important to set the appropriate environment variables. 
The executables can be placed in the Windows32 directory, where the actual binary file is located. 
Alternatively, we could have created an executable ourselves using C++ or a Windows Console Program. 
I was using a Windows machine for this task. Some people also try using a list, although I didn't do that. 

## Details



## 


