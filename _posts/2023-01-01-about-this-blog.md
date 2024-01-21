Hi! Since every good project needs a good documentation I write this post to provide information about the blog itself. 
In this post, usage of the blog, technical deails licensing and copyright information provided.

The website based on Jekyll developed using custom theme developed with Bootstrap 5. Its hosted using github pages using csariyildiz.github.io domain also provided by Github.
Main website, seperates vcard and blog. Main website is like a basic vcard. Has following pages: home, about, contact, blog and their Turkish versions tr, hakkinda, iletisim, blog-tr.

Blog is intented to split technical and other writings and their turkish and english versions. It causes some complexity in implentation but not usage. It seperates articles within a group to each other in terms of their language, text lists or posts and technical or not. Which makes 8 pages of listing content. Posts and t which is technical posts. And b and c for posts are not technical. Also text series a and d for technical and e and f for non technical. Archieve and arsiv for posts and all for all with time and tags and etiketler for posts again. Archieve and tags for 8 categories will make 16 additional pages which currently not implemented since there is no practical need.

In this document information provided about website in terms of usage of Jekyll and Github Pages, licensing of website, structure of blog pages. Some guidelines provided for prefered usage and similar to markdown documentation also writing style. Future work and conclusion with additional references section.


# Tablo Of Contents
1. Jekyll, Github Pages and Licensing
2. Blog Pages Structure
3. Prefered Usage
  * File Naming
  * Front Matter
  * Content of Posts
  * Images
  * Code Blocks
  * Links
  * References And Footnotes
4. Writing Style
5. Future Work & Notes
6. Conclusion


## 1. Jekyll, Github Pages and Licensing

Jekyll folders _includes, _posts. I use data, img and assets folders. Main folder has README.html .gitignore _config.yml LICENCE. Currently I have a overload of html pages layouts and includes waiting to be reevaluated soon. Respontiveness is also couldnt achieved yet.

Blog posts and other texts written as markdown pages.

Some of layouts are:

```
page, post, post-tr, default2, default-tr
```

Some of includes are:

```
head, head-tr
```


## 2. Blog Pages Structure

Layout is post3 for posts. "page4" for listings.

```
---
layout: post3
title: "Importing Enron Mail Dataset To MongoDB"
category: main
tags:
  - NLP
  - MongoDB
---
```
* Posts
``
* Posts
  * Tech
    * Turkish
      * Text-List
        * [Text Lists](/d) - Post has "category: d" line. (tec, list, turkish)
      * Post
        * [Posts - T](/t) - Post has "category: gonderiler" line. (tec, post, turkish)
    * English
      * Text-List
        * [Text Lists](/a)  - Post has "category: a" line - (tec, list, english)
      * Post
        * [Posts](/posts) - Post has "category: main" line - (tec, post, english)
  * Non-Tech
    * Turkish
      * Text-List
        * [Text Lists2 - T](/f)  - Post has "category: f" line.  (non-t,list, turkish)
      * Post
        * [Posts-2 - T](/c) - Post has "category: c" line. (non-t, post, turkish)
    * English
      * Text-List
        * [Text Lists2](/e)  - Post has "category: e" line.  (non-t, list, english)
      * Post
        * [Posts2](/b) - Post has "category: b" line. (non-t, post, english)
 
* [Arşiv](/arsiv) - Post has "category: main" line.
* [Archieve](/archieve) - Post has "category: gonderiler" line.
* [Tags](/tags) - Post has "category: main" line.
* [Etiketler](/etiketler) - Post has "category: gonderiler" line.
* [Tum Arsiv](/all) - All posts.


Main site is a different site is from the blog. But when you click blog you get to blog.

```
Home : Vcard  (\)
About : Page that informs user about my personal experience. (\about)
Contact : My contact information. Current city I live.  (\contact)
Blog : My blog. (\blog)
```

While preparing this blog, I thought that I would create content in Turkish and English. 

I also separated the technical and non-technical part (calling non technical cultural), except for the archive part.

In addition, I separated the tutorials section, which has a more systematic explanation and documents, from the posts. It is also divided into Turkish and English, as well as technical and non-technical.


I list some example here with posts, turkish posts, and tutorials.

### Samlple Posts
* A Sample CLI For Powershell Scripts
* PowerShell Remoting With WinRM
* Good Repositories
* Computer Engineering Textbooks
* Editing Fields On MongoDB
* Importing Enron Mail Dataset To MongoDB
* Booklist
* Links

### Sample Posts Turkish
* XMRig ve Madenclik Üzerine Bir İnceleme


Care has been taken to keep the design of the site as simple as possible. In particular, it is based on emulating Github's own markdown design.
Bootstrap 5 is used with the fonts used by github.

There is also a bar and footer on the left.

Unlike the main site, there is a bar on the left and the name of the articles in the blog section.
The similar template has been preserved throughout the site.
Frcst

* CSS
* Javascript


## 3. Preferred Usage

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


## 4. Writing Style


### 4.1 First Paragraph: Excerpt

There is an excerpt section for each article. An example excerpt is as follows. It is `276` characters long. This excerpt is not for front matter but written in post itself.

```
MongoDB is a very popular no-sql database with JSON-like documents. I find it very robust usefull for many use cases including application development and data pipelines.
In this document we will explore its features and commands which can be useful when we dealing with data.
```

First sentence is a definition:

```
MongoDB is a very popular no-sql database with JSON-like documents. 
```

Second one emphatises its importance.

```
I find it very robust usefull for many use cases including application development and data pipelines. 
```

Lastly third sentence explains the content of the document as well as the objective.

```
In this document we will explore its features and commands which can be useful when we dealing with data.
```

### 4.2 Photo


After the excerpt part, the photo is shared as follows. It is a `PNG` file with dimensions `716 x 410`.

```
<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/mongo2.png" class="img-fluid" alt="MongoDB Compass Interface">
```

## 4.3 Second Pharagraph

Then a second paragraph is written as follows. It is `536` characters long.

```
MongoDB has versions like Cloud (Named Atlas), Enterprise and Community. Community version is free to use. It also has a GUI named MongoDB Compass.
Because MongoDB is no-sql its data stored as unstructured or semi-structured. Contrasting from relational databases such as MSSQL, MySQL or Oracle with its collections and documents instead of structured tables columns and rows.
MongoDB has many features like indexing, replication, load-balancing. And its queries are formed in a JSON-like manner which makes flexible and it easy to use.
```

## 4.4 Table Of Contents

Then the table Of Contents part is shared as follows:

```
## Table Of Contents
1. [Databases And Collections](#1-databases-and-collections)
2. [Editing Fields](#2-editing-fields)
3. [Snippet 1 : Sorting](#3-snippet-1--sorting)
4. [Snippet 2 : Batch Updating Documents](#4-snippet-2--batch-updating-documents)
5. [Snippet 3 : Batch Updating Again](#5-snippet-3--batch-updating-again)
```

## 4.5 Article Sections

Then the article starts with the title.

```
## 1. Databases And Collections

MongoDB organizes its "documents" as "databases" and "collections". Each document has a collection and a database.
```

Then, usage continues in a similar manner.

##  4.6 Questions

Optionally, there is a questions section for the articles.
Here, questions that need to be addressed in the posts  or in future posts are noted.



## 5. Future Work & Notes

* Özellikle istatistik vermek iyi bir kullanım şeklidir.
* Sorular kısmı çıkarmak etkili bir pratiktir.
* Sitemap
* Image Gallery
* Future plans for domain, Turn domain name to something like short like cagri.sh.
* Config File
* Package Json
* License
* 404 Page
* RSS FEED
* Layouts
* Includes
* Comments
* Datatables
* Maybe it could be usefull to actually research writing style.
* Watchlist removed.

## 6. Conclusion

Hope it is useful!

## References

* https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll
