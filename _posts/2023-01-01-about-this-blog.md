---
layout: post3
title: "❄️ About This Blog"
category: main
tags:
  - Blog
  - Jekyll
---

Hi! I write this post to provide information about the blog itself. 
In this post, I will explain how I use the blog, while at the same time I will provide information about technical details, main site posts and tutorials, and licensing and copyrights.

The blog seperates technical and other writings. And it seperates articles within a group to each other also.

It has special pages like watchlist, booklists (technical, non-technical, turkish and english.)

Sometimes I use different layouts if I thing it makes easier to use.

Main website, and blog is seperate. Main website is like a basic vcard. Has following pages:

```
English pages:
/home
/about
/contact
/blog

Turkish pages:
/anasayfa
/hakkinda
/iletisim
/gunce
```

For blog each post is classified with language and whether its technical or not technical (cultural). 
So we get 8 pages. 4 more for tags and archives.

```
Posts 
  Technical
    English : "\posts" (category is main)
    Turkish : "\t" (category is turkish)
  Non-Technical
    English : "\cen" (category is cultural)
    Turkish : "\c"  (category is cultural)
  Archive : \posts-archive

Tutorial
  Technical
    English "\tutorials-en" : Will be static.
    Turkish "\tutorials-tr" : Will be static
  Non-Technical
    English "\notes-en" : Will be static.
    Turkish "\notes-tr" : Will be static.
  Archive "tutorials-archive"

Tags (\tags)
Archive (\archive)
```

We also archive for posts, archive for tutorials and overall archive and tag pages.


Non-technical tutorials are for things like music, health, economics, history, they are often from one or more sources.
This format is used if the articles are too long or require too much continuity and technicality.
The style of these articles, unlike the others, is somewhat objective.
They just give the facts without adding comments.

## For Jekyll

Layouts are:

```
page
post
post-tr

default2
default-tr
```
Includes are:

```
head
head-tr
```


## 1. Preferred usage


In the recommended usage section, respectively, file naming, front matter, content of posts, image usage, code blog usage, link usage, Reference and Footnote Usage, style and additional notes will be discussed.

### File Naming

Posts are located in the root of the site under the `_posts` folder. The naming is done as follows, as was done for Jekyll. Here it will not affect the partitioning operation to folders.
The listing is based on the category variable.


```
2023-02-04-importing-enron-mail-dataset-to-mongodb.md
```

Apart from these, there are incomplete posts in `_drafts`. If a post is not completed, a phrase like the one below is placed in front of it.
This phrase should not be kept too long and it is intended to be removed as soon as possible.

```
This is a work in progress. So please consider it might contain some errors :)
```

Attention should be paid to the completion of the published articles.

### Front Matter


Example front matter for the articles on the site is as follows. The main category is used for English articles.

```
---
layout: post3
title: "Editing Fields On MongoDB"
category: main
tags:
  - Database
  - MongoDB
---
```

### Content of Posts

There is an excerpt section for each article. An example excerpt is as follows:

```
MongoDB is a very popular no-sql database with JSON-like documents. I find it very robust usefull for many use cases including application development and data pipelines.
In this document we will explore its features and commands which can be useful when we dealing with data.
```

After the excerpt part, the photo is shared as follows.

```
<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/mongo2.png" class="img-fluid" alt="MongoDB Compass Interface">
```

Then a second paragraph is written as follows.


```
MongoDB has versions like Cloud (Named Atlas), Enterprise and Community. Community version is free to use. It also has a GUI named MongoDB Compass.
Because MongoDB is no-sql its data stored as unstructured or semi-structured. Contrasting from relational databases such as MSSQL, MySQL or Oracle with its collections and documents instead of structured tables columns and rows.
MongoDB has many features like indexing, replication, load-balancing. And its queries are formed in a JSON-like manner which makes flexible and it easy to use.
```

Then the table Of Contents part is shared as follows:

```
## Table Of Contents
1. [Databases And Collections](#1-databases-and-collections)
2. [Editing Fields](#2-editing-fields)
3. [Snippet 1 : Sorting](#3-snippet-1--sorting)
4. [Snippet 2 : Batch Updating Documents](#4-snippet-2--batch-updating-documents)
5. [Snippet 3 : Batch Updating Again](#5-snippet-3--batch-updating-again)
```


Then the article starts with the title.

```
## 1. Databases And Collections

MongoDB organizes its "documents" as "databases" and "collections". Each document has a collection and a database.
```

Daha sonra benzer şekilde kullanıma devam edilir.

### Images

```
![The San Juan Mountains are beautiful!](/assets/images/san-juan-mountains.jpg "San Juan Mountains")
```

Fotograflar assets kısmında bulunmaktadır. Fotograflar için görüntüleme ölçütü genişlik 756 px'dir.


### Code Blocks

Kod blogu için aşağıdaki backtick işareti kullanılmaktadır. `\``

```
\```
```


### Links

Link paylaşımı aşağıdaki gibidir:

```
My favorite search engine is [Duck Duck Go](https://duckduckgo.com).
```

### References And Footnotes

Dipnotlar `Footnote` aşağıdaki gibi kullanılır.
```
Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.

[^bignote]: Here's one with multiple paragraphs and code.

    Indent paragraphs to include them in the footnote.

    `{ my code }`

    Add as many paragraphs as you like.
```

Aşağıda bu kullanımın örneği verilmiştir:

Here's a simple footnote,[^1] and here's a longer one.[^2]

[^1]: This is the first footnote.

[^2]: Here's one with multiple paragraphs and code.

    Indent paragraphs to include them in the footnote.

    `{ my code }`

    Add as many paragraphs as you like.

Footnote'da yalnızca sayı kullanılır.
Referanslar da benzer şekilde kullanılır.

```
Here's a simple another footnote,[^3]

[^3]: This is the second footnote.
```

Here's a simple another footnote,[^3]

[^3]: This is the second footnote.


Kaynaklar kısmı referanslardan bağımsız olarak listelenir.
Referans öncesi kaynaklar, sorular, future work bölümleri bulunmaktadır. Kaynaklar bölümü referanslardaki siteleri içerir. Ama referanslar direkt makaleye link verir.
Kaynaklar ayrıca referansda bulunmayanları da içerir.

### Writing Style


### Additional Notes
* Özellikle istatistik vermek iyi bir kullanım şeklidir.
* Sorular kısmı çıkarmak etkili bir pratiktir.


## 2. Technnical Details

Site is hosted on Github Pages and used Jekyll. It still has some tasks to do. I plan to complete these over time. Some to dos are listed below.

### To Do's And Future Plans

* Bootstrap 5 as whole.
* Favicon.
* Code view.
* SEO eklenmesi.
* Yorum modülü eklenmesi
* Google sayfa hit takibi.
* Ads : Not possible with github pages.
  
Future plans for domain,

* Turn domain name to something like short like cagri.sh.
* Planning to use domain to connect to my personal VPN aswell. It will be accessible from internet with a port forwarding. I will connect it with two factor auth .
* Planing to use domain to connect my home laptop with RDP. (I want to change this laptop with something like an HP Elitedesk. )
* Make developments and host applications within that client. It will also be a host for virtualization to my other servers. Such as Ubuntu one Kali etc.

### Config File

_config.yml

### Package Json

Not written yet!

### License

Not written yet!

### 404 Page

Not written yet!
### RSS FEED
Not written yet!
### Layouts
Not written yet!
### Includes
Not written yet!
### Comments
Not written yet!

### Datatables
Not written yet!

### Image Gallery
Not written yet!


## 3. Design And Implementation

Care has been taken to keep the design of the site as simple as possible. In particular, it is based on emulating Github's own markdown design.
Bootstrap 5 is used with the fonts used by github.

There is also a bar and footer on the left.

Unlike the main site, there is a bar on the left and the name of the articles in the blog section.
The similar template has been preserved throughout the site.


### CSS
Not written yet!

### Javascript

Not written yet!

### Removing Extra
Not written yet!


## 4. Organization

## Main Site

Main site is a different site is from the blog. But when you click blog you get to blog.

```
Home : Vcard  (\)
About : Page that informs user about my personal experience. (\about)
Contact : My contact information. Current city I live.  (\contact)
Blog : My blog. (\blog)
```

## Posts and Tutorials

While preparing this blog, I thought that I would create content in Turkish and English. I also separated the technical and non-technical part (calling non technical cultural), except for the archive part.
In addition, I separated the tutorials section, which has a more systematic explanation and documents, from the posts. It is also divided into Turkish and English, as well as technical and non-technical.

So table of contents (our sitemap) is like that:

```
Posts 
  Technical
    English : "\posts" (category is main)
    Turkish : "\t" (category is turkish)
  Non-Technical
    English : "\cen" (category is cultural)
    Turkish : "\c"  (category is cultural)
  Archive : \posts-archive

Tutorials ()
  Technical
    English "\tutorials" : Will be static.
    Turkish "\notlar" : Will be static
  Non-Technical
    English "tutorials-c" : Will be static.
    Turkish "notlar-c" : Will be static.
  Archive "tutorials-archive"

Tags (\tags)
Archive (\archive)
```


## Post Details And Some Current Examples

I list some example here with posts, turkish posts, and tutorials.

### Posts
* A Sample CLI For Powershell Scripts
* PowerShell Remoting With WinRM
* Good Repositories
* Computer Engineering Textbooks
* Editing Fields On MongoDB
* Importing Enron Mail Dataset To MongoDB
* Booklist
* Links

### Posts Turkish
* XMRig ve Madenclik Üzerine Bir İnceleme
* Bir Bilgisayar Seçerken Nelere Dikkat Ediyoruz? (Tamamlanmadı.)

### Posts English Cultural


* Watchlist
* Post About My Work And Travel Experience
* Post About Bienal.

### Posts Turkish Cultural
* Yoga Metinleri Üzerine

### Tutorials
* Network
* System
* Programming

#### English

Henüz yazı yok.

#### Turkish
* Veri Bilimi Ve Modeller
  * Modeller Nasıl Çalışır?
  * Temel Veri İncelemesi
  * Makina Öğrenmesi Modelleri
  * Modelin Doğrulanması

#### English Cultural
* Workout
* Music
* Economics

#### Turkish Cultural
* Antreman
* Muzik
* Ekonomi
  
## Conclusion

Hope it is useful!

* https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll

