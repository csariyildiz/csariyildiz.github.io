---
layout: post3
title: "MongoDB Usefull Queries And Aggregations"
category: main
cat: System
tags:
  - CLI
  - bat
---

### Remove Field

```
db.keywords_base.updateMany({},{$unset: {wordCount:""}})
```

### Rename Field

```
db.keywords_base.updateMany({},{ $rename: { "old": "new" } });
```


### Sort By Field

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
  { $out: "w3" }
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
  { $out: "w3" }   
]
```

### Rename Collection


```
db.w2.renameCollection("w3")
```

### Give Id

* Add a unique integer id
  
```
[
  {
    $addFields: { id: { $literal: 1 } }
  },
  { 
    $out: "w3" 
  }
]

```

### Join

```
db.w2.aggregate([
  {
    $lookup: {
      from: "w3",             // The collection to join (w3)
      localField: "keyword",  // The field in w2 to match with w3
      foreignField: "item",   // The field in w3 to match with w2's keyword
      as: "w3_scores"         // The name of the new array field to store matched results
    }
  },
  {
    $unwind: "$w3_scores"     // Unwind the array to get a flat structure
  },
  {
    $project: {
      _id: 0,                 // Optionally exclude the original _id field from the result
      keyword: 1,             // Include the keyword field
      count: 1,               // Include the count field
      score: "$w3_scores.score"  // Include the score field from the w3 collection
    }
  },
  {
    $out: "w4" 
  }
]);
```
