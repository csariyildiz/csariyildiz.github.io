---
title: "Downloading Video Using A Bat Script"
---
`yt-dlp` is the command-line tool used to download videos from YouTube and other supported sites. It's an extended version of youtube-dl with additional features and improvements.

While there are online platforms that facilitate the task, there are also specialized libraries developed by groups or individual developers.
[yt-dlp](https://github.com/yt-dlp/yt-dlp) library offers a comprehensive tool for video downloading from YouTube. In this document we will explore the process of downloading videos using `yt-dlp` and `a batch file with .bat extension` in a `Windows` operating system.

Please keep in mind there could be copyright issues if you monetize or use this commercially.
 
<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/yt-dlp-post.png" class="img-fluid" alt="ytdlp post">

Although the development team tries to keep the software up to date, it should be noted that what matters is how YouTube reacts to it. In libraries that provide such unofficial APIs, loss of functions due to changes over time is common.

## Overview

`yt-dlp` is an enhanced fork of the widely-used `youtube-dl` tool, extending its functionality with new features and improvements. It supports a broad array of websites, offering versatility for different video sources. 
With yt-dlp, users can download videos in various formats and qualities, and it also provides options for downloading subtitles and playlists. 

* It can be made by online tools but a strong alternative is using an executable.
* I created `scripts` and `bin` directory in my `D:\` disk.
* In `scripts` folder I got a file named `yt.bat`.
* In `bin` folder i got four files named `ffmpeg.exe`, `ffplay.exe`, `ffprobe.exe` and `yt-dlp.exe`.
* Content of my `yt.bat` file is:
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
* When its run the bat file asks for a `YouTube URL` of the video such as `https://www.youtube.com/watch?v=dQw4w9WgXcQ`. 
* It runs `yt-dlp` with parameter `-f bv+ba/b`. And passes video URL as also a parameter `%input%`.
* It runs the command like below:
```
yt-dlp -f "bv+ba/b" "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

* My `bin` folder is defined in `Path` in `environment variables` of Windows so I can run `yt-dlp` directly from command line.
* The executables can be placed in the Windows32 directory, where the actual binary file is located. 
But its not necessary to alter operating systems folder.
* Alternatively, we could have also created an executable ourselves using `C` or `C++` with `GCC` or a `.NET console application` using `Visual Studio`.
* Some also using a list, although I didn't find it necessarry.

Thats it! This is what meets our need. However, we will examine the inner workings of `yt-dlp` in more detail in the following sections.

## File Details

We can look the version of executable I have (.exe file) with:

```
yt-dlp --version
2024.05.27
```

This is one of the recommended [binaries](https://github.com/yt-dlp/yt-dlp?tab=readme-ov-file#recommended) listed in documentation.

```
yt-dlp.exe	- Windows (Win7 SP1+) standalone x64 binary (recommended for Windows)
```

There is 2 other for recommended Linux/BSD and MacOS.
```
yt-dlp	Platform-independent zipimport binary. Needs Python (recommended for Linux/BSD)
yt-dlp_macos	Universal MacOS (10.15+) standalone executable (recommended for MacOS)
```
There are other release files aswell.
Keep in mind this one has the auto-update feature.

## Format Specifiers

The -f flag allows you to specify the format of the media file(s) you want to download. Formats can include different qualities of video and audio, as well as options for merging them together.
* -f "bv+ba/b": This option specifies the format or formats in which the video and audio should be downloaded. Formats are specified using a string format specifier.

* bv: the video stream should be downloaded in its best available quality.
* ba: the audio stream should also be downloaded in its best available quality.
* /b: merge the downloaded video and audio streams into a single file after downloading.
  
When we run this command, yt-dlp will fetch the video from the YouTube URL https://www.youtube.com/watch?v=dQw4w9WgXcQ, download the best video and audio streams available, and merge them into a single file (/b) for you to watch or use offline.
This flexibility allows users to tailor their downloads based on their preferences for quality, file size, or specific use cases.

### Binary Files ffmpeg ffplay and ffprobe

ffmpeg.exe: Purpose: ffmpeg is a powerful command-line tool for handling multimedia files. It can convert audio and video formats, resize videos, apply filters, and perform many other operations.
When it's needed: You would use ffmpeg.exe whenever you need to manipulate multimedia files—such as converting formats, cutting or joining videos, adding subtitles, or applying effects.

ffplay.exe: Purpose: ffplay is a simple media player based on FFmpeg libraries. It can play audio and video files from the command line without the need for a graphical interface.
When it's needed: You might use ffplay.exe to quickly preview multimedia files, check encoding results, or debug issues related to multimedia playback.

ffprobe.exe: Purpose: ffprobe is a tool to analyze multimedia streams. It provides detailed information about the multimedia content of a file, such as codec details, bitrates, stream information, and metadata.
When it's needed: Use ffprobe.exe when you need to inspect the characteristics and properties of audio or video files programmatically or to gather detailed technical information about multimedia streams.
