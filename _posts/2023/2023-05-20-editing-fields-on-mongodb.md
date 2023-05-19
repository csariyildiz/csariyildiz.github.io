---
layout: post
title: "Editing Fields On MongoDB"
category: main
thumb: "enrona_1"
---

MongoDB is a very popular no-sql database with JSON-like documents. I find it very robust usefull for many use cases.
It has free and .. versions.
In this document we will explore its features and commands which can be useful when we dealing with data.

* Indexes, 

## Brief Look To MongoDB

MongoDB organizes its "documents" as "databases" and "collections". Each document has a collection and a database.

To see databases we can use this command in MongoDB Compass like that:

<code>show databases</code>

We can see databases with this command. We can switch one of them like that:

<code>use kb2</code>

Now we can see the collections within this database:

<code>show collections</code>

We can also access this interface using programming environments such as Python:

```
import pymongo

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["enron"]
collection = db["enronmails6_tokenized"]

# Find all documents in the collection
documents = collection.find({})

# Extract tokens from documents and insert into another collection
new_collection = db["enron8"]

for doc in documents:
    tokens = doc["tokens"]
    file_name = doc["file"]
    x = x+1
    for token in tokens:
        new_doc = {
            "id": i,
            "doc" : x,
            "file_name": file_name,
            "token": token
        }
        i = i + 1
        new_collection.insert_one(new_doc)
```        

### Editing Fields

Lets say dont need unparsed "message" field since we have the "body" field. I delete it using  query on MongoDB compass interface.

<code>db.enronmails.updateMany({},{$unset: {message:""}})</code>

I change the name of filename field to directory. 

<code>db.enronmails.updateMany({},{$rename: {"file":"directory"}})</code>

Take a copy of 'input_entities' collection.

<code>db.input_entities.aggregate([{$out: "input_entities_cased"}])</code>

Insert one document to a collection.

<code>db.entities.insertOne({"_id" : 1, "entity": "aws"});</code>

Aggregation to list top 1000 documents by c.

<code>[ { '$sort': { 'c': -1    }  },  { '$limit': 1000 }]</code>

To lowercase all name values in the "input_entities_cased" collection, use the following aggregation stages in MongoDB Compass. Change max time ms is 3600000 which 1 hour.

```
[
  {
    $project: {
      _id: 1,
      id: 1,
      name: { $toLower: "$name" },
      res: 1
    }
  },
  {
    $out: "entities"
}
```

## Accessing Via Python With Batches

Using batches with a batch size might be useful when dealing large amount of data (ex. 510000 documents).

We also might be to see progress by printing each batch.

```
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient()
db = client.enron

# Get the "mycollection" and "second_collection" collections
col1 = db.mycollection
col2 = db.second_collection

# Get the total number of documents in the collection
total_documents = col1.count_documents({})

# Set the batch size
batch_size = 10000

# Calculate the number of batches
num_batches = total_documents // batch_size + 1

# Iterate over the batches
for batch_num in range(num_batches):
    # Get the documents for the current batch
    documents = col1.find().skip(batch_num * batch_size).limit(batch_size)

    # Update the corresponding documents in the "second_collection" collection
    for doc in documents:
        doc2 = col2.find_one({"file": doc['file']})
        if  doc['message'] !=  doc2['message']:
            print("Message mismatch!")

    # Print progress
    progress = min((batch_num + 1) * batch_size, total_documents)
    print(f"Processed {progress} documents out of {total_documents}")

# Close the MongoDB connection
client.close()
```
