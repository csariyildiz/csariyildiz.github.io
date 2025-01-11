---
layout: post3
title: "MongoDB Usefull Queries And Aggregations"
category: main
cat: System
tags:
  - CLI
  - bat
---

* To sort with one field:

```
db.keywords.aggregate(

   [{ $sort : { score : 1 } }]

);

```

* -1 for reverse sort.


```
db.keywords.aggregate(

 [ { $match : { author : "dave" } } ]

);

```
