---
layout: post3
title: "About This Blog"
category: main
tags:
  - Blog
  - Jekyll
---

Hi! I write this post to provide information about the blog itself. 
In this post, I will explain how I use the blog, while at the same time I will provide information about technical details, main site posts and tutorials, and licensing and copyrights.

At the same time, we can think of it as a meta field about the site.

## Table Of Contents
1. [Preferred usage](#1-tavsiye-edilen-kullanim)
    1. File Naming
    2. Front Matter
    3. Content of Posts
    4. Images
    5. Code Blocks
    6. Links
    7. Reference And Footnote
    8. Writing Style
    9. Additional Notes
4. [Blogun Teknik Detayları](#2-editing-fields)
5. [Blogun Dizayn ve Implementasyonu](#3-snippet-1--sorting)
6. [Gönderilerin Organizasyonu](#4-snippet-2--batch-updating-documents)
7. [Sonuç](#sonuc)

## 1. Preferred usage

Tavsiye edilen kullanım kısmında sırasıyla dosya adlandırma, front matter, gönderilerin içeriği, resim kullanımı, kod blogu kullanımı, link kullanımı, Referans ve Dipnot Kullanımı, üslup ve ek notlar ele alınacaktır.

### File Naming

Gönderiler sitenin kök dizini altında `_posts` klasörü altında bulunur. Jekyll için yapıldığı üzere aşağıdaki gibi adlandırma yapılır. Burada klasörlere ayırma işlemi yapılabilir etkilemeyecektir.
Listeleme category değişkenine göre olur. 

```
2023-02-04-importing-enron-mail-dataset-to-mongodb.md
```

Bunların haricinde `_drafts` içerisinde tamamlanmamış postlar bulunmaktadır. Bir post tamamlanmamışsa önüne aşağıdaki gibi bir ibare konulur.
Bu ibare fazla tutulmamalıdır ve bir an önce kaldırılması amaçlanır.

```
This is a work in progress. So please consider it might contain some errors :)
```

Yayınlanan yazıların tamamlanmış olmasına dikkat edilmelidir.

### Front Matter

Sitedeki yazılar için örnek front matter aşağıdaki gibidir. İngilizce yazılar için main kategorisi kullanılmıştır.

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

Her yazı için bir excerpt kısmı bulunmaktadır. Örnek bir excerpt aşağıdaki gibidir:

```
MongoDB is a very popular no-sql database with JSON-like documents. I find it very robust usefull for many use cases including application development and data pipelines.
In this document we will explore its features and commands which can be useful when we dealing with data.
```
Excerpt kısmından sonra fotograf aşağıdaki gibi paylaşılır.

```
<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/mongo2.png" class="img-fluid" alt="MongoDB Compass Interface">
```
Ardından ikinci bir paragraf aşağıdaki gibi paylaşılır.

```
MongoDB has versions like Cloud (Named Atlas), Enterprise and Community. Community version is free to use. It also has a GUI named MongoDB Compass.
Because MongoDB is no-sql its data stored as unstructured or semi-structured. Contrasting from relational databases such as MSSQL, MySQL or Oracle with its collections and documents instead of structured tables columns and rows.
MongoDB has many features like indexing, replication, load-balancing. And its queries are formed in a JSON-like manner which makes flexible and it easy to use.
```

Ardıntan table Of Contents kısmı aşağıdaki gibi paylaşılır.

```
## Table Of Contents
1. [Databases And Collections](#1-databases-and-collections)
2. [Editing Fields](#2-editing-fields)
3. [Snippet 1 : Sorting](#3-snippet-1--sorting)
4. [Snippet 2 : Batch Updating Documents](#4-snippet-2--batch-updating-documents)
5. [Snippet 3 : Batch Updating Again](#5-snippet-3--batch-updating-again)
```

```
```
Ardından başlıkla yazıya başlanır.

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

### Image Gallery

## 3. Design And Implementation

Sitenin tasarımının mümkün olduğunca sade olmasına dikkat edilmiştir. Özellikle Github'un kendi markdown tasarımına benzetmek esas alınmıştır.
Bootstrap 5 yine github'un kullandığı fontlarla kullanılmıştır.

Aynı zamanda solda bir bar ve footer bulunmaktadır.

Main site kısmından farklı olarak blog kısmında solda bir bar ve yazıların ismi yer almaktadır.
Benzer şablon sitenin tamamında korunmuştur.

### CSS


### Javascript

### Removing Extra


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
    English : "\posts"
    Turkish : "\t"
  Non-Technical
    English : "\cen"
    Turkish : "\c"
  Archive : \posts-archive

Tutorials
  Technical
    English "\tutorials" : Will be static.
    Turkish "\notlar"
  Non-Technical
    English "tutorials\cen"
    Turkish "notlar-c"
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

Faydalı olması dileğiyle!


* https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll

