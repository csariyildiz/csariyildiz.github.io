---
layout: post
title: "Importing Enron Mail Dataset To MongoDB"
category: main
thumb: "enrona_1"
---

Enron dataset is very commonly used by scientific community or any researcher who wants to use it.
One of the popular corpus used in NLP projects. 

Within the scope of this article we will upload this
dataset to Mongodb. 

Overall objective for the project and reveal technological comments and create a insigt to companies technological situation.

MongoDB is not an only option here or not a must but we use it to speed up the process and have a easy acxessible version of data. 

## Summary

1. Getting The Dataset
2. Importing CSV File To MongoDB
3. Parsing Email Data & Editing Fields
4. Exporting A Parsed Data

## 1. Getting The Dataset 

There are versions of dataset. The original one bla bla.
We can use this version in kaggle.
As we can see it is only partially parsed as messages and folder. 
We will import this data to mongodb. 

## 2. Importing CSV File To MongoDB

Instead of editing the CSV file with Python directly or using a pandas dataframe, we can use a database system like MongoDB.
For this purpose I installed mongodb and import rows of csv file.

* First we create "Enron" database and "enrondatabase" collection through MongoDBCompass interface.

After we create the collection I import email data from a CSV file into a MongoDB database by using a Python script.


<script src="https://gist.github.com/csariyildiz/cc6824e6f4ef168808cc685e4bff4c75.js"></script>

When I run the code on my Jupyter notebook instance I can see the inserts from the interface.
It takes 3-4 minutes to get all of it by using the code above.

## 3. Parsing Email Data & Editing Fields

* I use Python's email module to parse headers.

<script src="https://gist.github.com/csariyildiz/05dd402d6deb28d5caf1ae3595794547.js"></script>

### Editing Fields

* We dont need unparsed "message" field since we have the "body" field. I delete it using this MongoDB query.

db.enronmails.updateMany({},{$unset: {message:""}})

* I change the name of filename field to directory. 

db.enronmails.updateMany({},{$rename: {"file":"directory"}})

## 4. Exporting A Parsed Data

Now I export to new parsed data to use it as a resource for later work. Also take it as a backup.
I also sharing it in Kaggle to speed up for anyone working on dataset.

## Lessons Learned
