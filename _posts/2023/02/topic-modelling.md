## LDA ve Başlık Modelleme

Removes stopwords using ntlk, tokenizes using gensim. Builds bigram and trigram models. Implements lemmatization. Builds a LDA model with gensim.  Discusses. perplexity and coherence score. Uses mallet model as an alternative to Gensim.


EMaillerden topikler oluşturmak için birden fazla yöntem var.
Bir bag-of-words algoritması  olan LDA bu yöntemlerden biri.
Kelimelerin görülme sayılarına kümelendiren bir uygulama.
K-Means algoritması gibi ama bir kümeye ait olması diğer kümeye ait olmasını engellemiyor.
LDA ise bunu bir yüzde hesabı olarak yaptığından bir kelime birden fazla küme içerisinde olabiliyor.

Kendi LDA algoritmamızı kodlamak yerine Gensim ve Mallet'in gerçekleştirdiği API leri kullanabiliriz.
Spacy ve NTLK ile preprocessing yapacağız.

İlk olarak birbiri ile beraber olan kelimeleri ayırt etmek gerekiyor. Bu kelimeleri ayrı olarak algılamamız gerekiyor.
Örneğin `windows 10` ise `windows 10` olarak gelmeli. Windows ve 10 gelirse bir anlam kaybı oluşuyor.
Bı işleme bigram ve trigram modelleri oluşturacağız.

İkinci adım lemmatization kelimelerin temellini bulacağız. Stop wordlerden kurtulacağız.
```
# Remove Stop Words
data_words_nostops = remove_stopwords(data_words)
# Form Bigrams
data_words_bigrams = make_bigrams(data_words_nostops)
# Do lemmatization keeping only noun, adj, vb, adv
data_lemmatized = lemmatization(data_words_bigrams, allowed_postags=['NOUN', 'ADJ', 'VERB', 'ADV'])
```
Bu işlemler sonucunda tokanization, bigram ve trigram gruplaması, lemmatization ile benzer kelimeleri tek kelime haline getirdik, stop wordleri kaldırdık.

Şimdi matematiksel olarak text'i gösterebilmek için bir mapping yapmamız gerekiyor. Her bir kelimeyi bir index ile göstereceğiz böylece 
numaraya dönüşecek.

Gensim corpora dictionary ile bu yapılabilir. Aşağıdaki gibi dictionary i oluşturduk.
```
# Create Dictionary
id2word = corpora.Dictionary(data_lemmatized)
```
Şimdi doc2bow ile her text i bag-of-words formatına çeviriyoruz.
Her bir token id'si ve kaç kere gözükdüğü ile işaretlenecek.
```
# Create Corpus
texts = data_lemmatized
# Term Document Frequency
corpus = [id2word.doc2bow(text) for text in texts]
```
Artık gensim ile topic modelling'e başlayabiliriz.

Aşağıdaki gibi LDA modelini oluşturuyoruz.
```
# Build LDA model
lda_model = gensim.models.ldamodel.LdaModel(corpus=corpus,
                                           id2word=id2word,
                                           num_topics=20,
                                           random_state=100,
                                           update_every=1,
                                           chunksize=100,
                                           passes=10,
                                           alpha='auto',
                                           per_word_topics=True)

```


```
print(lda_model.print_topics())
```

```
# Visualize the topics
pyLDAvis.enable_notebook(sort=True)
vis = pyLDAvis.gensim.prepare(lda_model, corpus, id2word)
pyLDAvis.display(vis)
```

Model Perplexity And Coherence

Mallet LDA Model

Determining the Optimal Number of Topics

Dominant Topics and Relevant Keywords

Best Example Document (Email) For a Given Topic

## Notes

There are some lessons learned & future work.

* It is possible to lose some of the data during preprocessing.
* Annotation seems to be needed Annotation tools like Prodigy can be useful.
* It stands out that there can be many different approaches. I create different articles to make these a little clearer.
* It may be necessary to create a knowledge base, especially on the application side. Databases such as neo4j can be used for this purposes.
* It will be beneficial to research sample studies in academic journals.
