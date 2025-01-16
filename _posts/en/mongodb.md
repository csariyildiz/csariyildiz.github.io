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
db.keywords_base.updateMany({},{ $rename: { "Item": "kw" } });
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


### Find Count

db.collection.find( { kw_count} ).count()



### Find Matches

* Filter field value.

```
db.keywords.aggregate(

[ { $match : { id : "91942" } } ]

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
db.keywords_match.aggregate([
  {
    $lookup: {
      from: "keywords_base3",             // The collection to join (w3)
      localField: "kw_match",  // The field in w2 to match with w3
      foreignField: "kw",   // The field in w3 to match with w2's keyword
      as: "kw_counts"         // The name of the new array field to store matched results
    }
  },
  {
    $unwind: "$kw_counts"     // Unwind the array to get a flat structure
  },
  {
    $project: {
      _id: 0,                 // Optionally exclude the original _id field from the result
      kw_match: 1,             // Include the keyword field
      m_count: 1,               // Include the count field
      kw_count: "$kw_counts.kw_count"  // Include the score field from the w3 collection
    }
  },
  {
    $out: "keywords_match2" 
  }
]);
```
