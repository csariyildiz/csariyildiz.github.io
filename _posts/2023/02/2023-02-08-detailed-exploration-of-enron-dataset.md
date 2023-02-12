---
layout: post
title: "Detailed Exploration Of Enron Dataset"
thumb: "enrona_1"
---

```
  from pymongo import MongoClient
import json
# Connect to the MongoDB instance
client = MongoClient("mongodb://localhost:27017/")

# Select the database and the collection
db = client["enron"]
collection = db["enronmails10"]

# Define the aggregation pipeline
pipeline = [
    {"$group": {"_id": "$user_folder", "count": {"$sum": 1}}},
    {"$project": {"user_folder": "$_id", "count": "$count", "_id": 0}}
]

# Execute the aggregation
result = list(collection.aggregate(pipeline))

# Print the result
total_count = 0
i = 0
for doc in result:
    total_count += doc['count']
    print(f"<tr><td>{i}</td><td>{doc['user_folder']}</td><td>{doc['count']}</td><tr>")
    i = i + 1

print(f"Total number of documents: {total_count}")
```

* <a href="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/emails_by_user_folder_enron.png">Bar Chart - Emails By User Folder Enron Corpus</a>
* <a href="#">Emails By User Folder Enron Corpus CSV</a>
