* Spacy doğal dil işlemesinde kullanılan popüler bir Python kütüphanesi.
* Spacy'nin merkezinde processing pipeline'ı içeren NLP objesi yer alıyor.
* Genellikle nlp adı verilen bu objeyi aşağıdaki gibi oluşturabiliyoruz.

from spacy.lang.en import English
nlp = English();

* İngilizce dil sınıfı dile özgü tokenization kurallarını içeriyor. Böylece text kelimeler ve noktalama işaretleri gibi tokenlere ayrılabiliyor.
* İngilizce harici dilleri de destekliyor.
* NLP objesine text gönderdiğimizde aşağıdaki gibi bir doc objesi oluşuyor.
* Doc text'e yapılandırılmış bir biçimde erişmemizi sağlıyor.
* Tokene indexi ile erişebiliyor. Ya da döngü içerisinde çağırabiliyoruz.

doc = nlp ("Hello Word!")
for token in doc:
  print(token.text)

*  .text ile içerisindeki metne erişebiliyoruz.
* Bunların haricinde span objesi document içerisindeki tokenleri temsil etmek için oluşturulabiliyor.
* Yalnızca bir view olarak oluşuyor. Kendi data taşımıyor.
* Tokenlerin kendi içinde lexical attributeleri bulunuyor.

## Statistical Models
