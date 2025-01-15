---
layout: post3
title: "MongoDB Usefull Queries And Aggregations"
category: main
cat: System
tags:
  - CLI
  - bat
---


### Rename Collection

### Sorting

* To sort with one field:

```
db.keywords.aggregate(

[{ $sort : { score : 1 } }]

);
```

* -1 for reverse sort.

```
db.keywords.aggregate(

[{ $sort : { score : -1 } }]

);
```

* Sort and out.

```
db.sourceCollection.aggregate(

[
  { $sort: { score: 1 } },
  { $out: "targetCollection" }
]

);
```

### Find Matches

* Filter field value.

```
db.keywords.aggregate(

[ { $match : { author : "dave" } } ]

);
```

* Filter documents with score < 30

```
[
  { $match: { score: { $lt: 30 } } },  
  { $sort: { score: 1 } },
  { $out: "targetCollection" }   
]
```

### Rename Collection


```
db.w2.renameCollection("w3")
```

