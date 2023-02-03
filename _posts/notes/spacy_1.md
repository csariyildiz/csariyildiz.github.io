* NLP is a dynamic area and constantly changing. 
* spaCy is a popular open-source library for natural language processing (NLP) in Python. 
* It is designed specifically for production use and helps developers to perform common NLP tasks such as tokenization, stemming, and named entity recognition. 
* spaCy is fast and efficient, and it is optimized for performance, which makes it well-suited for large-scale NLP projects.

Some of the key features of spaCy include:
* Tokenization: spaCy can split text into individual words and punctuation marks, called tokens.
* Part-of-speech tagging: spaCy can identify the grammatical role of each token in a sentence, such as verb, noun, adjective, etc.
* Named entity recognition: spaCy can identify and label named entities such as people, organizations, and locations in text.
* Sentence segmentation: spaCy can identify where one sentence ends and another begins.
* Dependency parsing: spaCy can identify the grammatical relationships between words in a sentence, such as subject and object.

* spaCy also provides a wide range of pre-trained models for several languages, as well as utilities to train models on custom data. 
* It is widely used in many NLP applications, including text classification, information extraction, text summarization, and more. 
* spaCy is also compatible with other NLP libraries such as NLTK, CoreNLP, and Gensim, making it easy to integrate with other NLP tools.

* Version 3, new config system, a workflow system to structure a project and much more.

## Transformers

* They are a type of a deep learning model which very successfull in NLP.
* They are effective when they used with language model pretraining.
* They scale up better, with adding more parameters they keep improving they dont pletaue. Like earlier alternatives like CNN and LSTM.
* They use GPU hardware efficiently. GPU's keep getting better CPU's are more stagnant. 
* Huge transformer models are more practical. Good models will be used in production.

## Trained Pipelines of sPacy

* Trained Pipelines are based on Transformer architecture.
* Pipelines work best on GPU you want GPU for training.
* Also can deploy on CPU.
* Under the hood transformer-based pipelines use the HuggingFace Transformers library and Pytorch.
* You can use any Py-Torch based model that huggingface published. 
* For english transformer pipeline roberta based model Devlin et al. 

* Dependency parsing
* NER
* POS

Tradeoffs:
* Mode dependenciess.
* GPU are more expensive less reliable, latency.
* %30 fever errors.
* Transformer sport is flexible.

* Ypu can put transformer weights into their own component. Other components will connect to. Multitask learning is easy.
* 


------------------------------

