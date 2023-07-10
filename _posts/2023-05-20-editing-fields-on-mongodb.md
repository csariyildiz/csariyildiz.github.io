---
layout: post3
title: "Editing Fields On MongoDB"
category: main

thumb: "mongo2"
tags:
  - Database
  - MongoDB
---

MongoDB is a very popular no-sql database with JSON-like documents. I find it very robust usefull for many use cases including apps and data pipelines.
In this document we will explore its features and commands which can be useful when we dealing with data.

<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/mongo2.png" class="img-fluid" alt="MongoDB Compass Interface">

MongoDB has versions like Cloud (Named Atlas), Enterprise and Community. Community version is free to use. It also has a GUI named MongoDB Compass.
Because MongoDB is no-sql its data stored as unstructured or semi-structured. Contrasting from relational databases such as MSSQL, MySQL or Oracle with its collections and documents instead of structured tables columns and rows.
MongoDB has many features like indexing, replication, load-balancing. And its queries are formed in a JSON-like manner which makes flexible and it easy to use.

## Databases And Collections

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

db = client["mydb"]
minimized2 = db["minimized2"]

# Find all documents in the collection
documents = minimized2.find({})

# Extract tokens from documents and insert into another collection
new_collection  = db["minimized_new"]

i = 0
x = 0

for doc in documents:
    tokens = doc["tokens"]
    file_name = doc["file"]
    x =  x+1
    for token in tokens:
        new_doc = {
            "id": i,
            "doc" : x,
            "file_name": file_name,
            "tokens": tokens
        }
        i = i + 1
        new_collection.insert_one(new_doc)
```        

## Editing Fields

Lets say dont need unparsed "message" field since we have the "body" field. I delete it using  query on MongoDB compass interface.

<code>db.nmails.updateMany({},{$unset: {message:""}})</code>

I change the name of filename field to directory. 

<code>db.mails.updateMany({},{$rename: {"file":"directory"}})</code>

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
----------------------------------------------------------------
Querying the collection minimized3 in the database using the find() method:

<code>db.minimized3.find( { To: ""} ).count()</code>

* It searches for documents where the value of the To field is an empty string. 
* The count() method is then applied to get the count of matching documents.

----------------------------------------------------------------

Aggregation operation on the minimized3 collection:

<code>db.minimized3.aggregate( [{ $count: "Subject" }])</code>

 * The aggregation pipeline consists of a single stage where the $count operator is used to count the number of documents in the collection. 
 * The resulting count is assigned the label "Subject".

----------------------------------------------------------------

Executing the remove() method on the collection:

<code>db.minimized3.remove( { match_count:0 } )</code>

* It removes documents from the collection that have a match_count field with a value of 0.

----------------------------------------------------------------

Retrieving the first document from the collection that has a token field with the spesific value:

<code>db.minimized3.findOne({'token': "onsite"})</code>

* The findOne() method is used to perform this query.

----------------------------------------------------------------

Using aggregate() method with an aggregation pipeline containing a single stage to copy collection.

<code>db.minimized3.aggregate([{ $out : "mails" }])</code>

* The $out operator is used to output the result of the aggregation to a new collection named "mails". 
* This effectively replaces the contents of the "mails" collection with the result of the aggregation.

----------------------------------------------------------------
## Snippet 1 : Sorting

The code below retrieves the documents from a source_collection sorted by the id field in ascending order. 

Then inserts the documents one by one into a target_collection in the sorted order. 

This effectively creates a new collection with the documents ordered by the id field.

```
from pymongo import MongoClient

client = MongoClient()
db = client["database_name"]

source_collection = db["source_collection"]
target_collection = db["target_collection"]

documents = source_collection.find().sort("id", 1)
for document in documents:
    target_collection.insert_one(document)

client.close()
```

----------------------------------------------------------------


## Snippet 2 : Batch Updating Documents

Using batches with a batch size might be useful when dealing large amount of data (ex. 510000 documents).

We also might be to see progress by printing each batch.

```
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient()
db = client.mails

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
## Snippet 3

```

from pymongo import MongoClient


client = MongoClient()
db = client["mails"]
collection = db["mails_pass1"]


batch_size = 10000
total_documents = collection.count_documents({})
total_batches = (total_documents // batch_size) + 1

for batch_number in range(total_batches):
    documents = collection.find().skip(batch_number * batch_size).limit(batch_size)

    processed_documents = 0
    for document in documents:

        document["message"] = document["message"].lower()
        db["mails_pass2"].insert_one(document)

        processed_documents += 1
    print(f"Processed document {processed_documents} of batch {batch_number + 1}")


client.close()

```
