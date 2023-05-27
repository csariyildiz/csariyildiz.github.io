---
layout: post
header: "Veri Bilimi ve Modeller"
title: "Modelin Doğrulanması"
category: tutorial

---
Bir model oluşturulduktan sonra modelin kalitesi doğrulanma "validation" aşamasında belirlenir.
Model kalitesini ölçmek, modellerin yinelemeli olarak iyileştirilmesi açısından önemlidir.

Oluşturulan modellerin neredeyse tamamı için doğrulama bir gerekliliktir. Hepsi için olmasa da çoğu uygulamada tahminlerindeki isabetlilik modelin kalitesinin ölçütüdür.
Modelin tahminlerinin gerçekte olanlarla tutarlı olması beklenir.

Doğrulama esnasında yapılan en büyük hata eğitim verisinin doğrulama verisi ile direkt olarak karşılaştırılmasıdır. Bunun yerine mean_absolute_error gibi bir metriğin hesaplanması tercih edilebilir.
Fakat hesaplanan yine de bir "in-sample" skordur. Daha doğru olan verinin eğitim ve doğrulama verisi olarak bölünmesi ve doğrulama verisi üzerindeki isabetliliğin ölçülmesidir.
Yine de mean_absolute_error hesaplanması tahminler üzerine fikir vermektedir.
Aşağıda mean_absolute_error'un hesaplanması gösterilmektedir.

## Mean Absolute Error

Model kalitesini özetlemek için birçok ölçüm vardır. Ortalama Mutlak Hata (MAE - Mean Absolute Error) olarak adlandırılan bir ölçüm bunlardan biridir.
10.000 daire için tahmin edilen ve gerçek daire fiyatlarını karşılaştrıldığında,  iyi ve kötü tahminlerin bir karışımı ile karşılaşılır. 
10.000 tahmini ve gerçek değerden oluşan bir listeye bakılması anlamsız olacaktır. Çözüm sonucun `mean_absolute_error` gibi bir metrikte özetlenmesi daha doğrudur.

Daha öncesinde modeli aşağıdaki gibi oluşturulmuştu.

```
import pandas as pd
from sklearn.tree import DecisionTreeRegressor

data_file_path = '../input/my_data.csv'
df = pd.read_csv(data_file_path) 

df = df.dropna(axis=0)

y = df.Fiyat
features = ['Odalar', 'YatakOdasi', 'AlanBuyuklugu', 'Enlem', 'Boylam']
X = df[features]

model = DecisionTreeRegressor(random_state=1)

model.fit(X, y)
```
Çıktı:
```
DecisionTreeRegressor()
```

Her bir daire fiyatlandırması için tahmininde görülen hatas aşağıdaki gibi hesaplanabilir.

```
error=actual−predicted
```

Örneğin dairenin fiyatı 150.000 ve tahmin edilen değer 100.000 ise hata 50.000 olacaktır.
MAE metriğini kullanarak her bir hata için net değer üretmiş oluruz.
Ortalama olarak, tahminlerimiz hesaplanan mean_absolute_error değeri kadar yanlıştır.

```
from sklearn.metrics import mean_absolute_error

prediced = model.predict(X)
mean_absolute_error(y, predicted)
```
Çıktı:
```
434.71594577146544
```

### Train ve Test Ayrışması

Az önce hesapladığımız mean_absolute_error değeri, in-sample (örnek içi) puan olarak adlandırılabilir. 
Hem modeli oluşturmak hem de değerlendirmek için tek bir veri seti "sample" kullanılmıştır.

Ancak, modeli oluşturmak için kullandığınız veri örneğinde, yeşil kapılı tüm evler çok pahalıydı. 
Modelin işi, ev fiyatlarını tahmin eden kalıplar bulmaktır, 
dolayısıyla bu kalıbı görecek ve yeşil kapılı evler için her zaman yüksek fiyatları tahmin edecektir.

Bu model, eğitim verilerinden türetildiği için, model, eğitim verilerinde doğru görünecektir.

Ancak, model yeni verileri gördüğünde bu kalıp tutmazsa, model pratikte kullanıldığında çok yanlış olacaktır.

Modellerin pratik değeri yeni veriler üzerinde tahminler yapmaktan geldiğinden, performansı modeli oluşturmak için kullanılmayan veriler üzerinde ölçeriz. 
Bunu yapmanın en basit yolu, bazı verileri model oluşturma sürecinden çıkarmak ve ardından bunları, modelin daha önce görmediği veriler üzerindeki doğruluğunu test etmek için kullanmaktır. 
Bu verilere doğrulama verileri denir.


scikit-learn kitaplığı, verileri iki parçaya bölmek için train_test_split işlevine sahiptir. 
Bu verilerin bir kısmını modele uyması için eğitim verileri olarak kullanacağız ve diğer verileri, ortalama_mutlak_hata'yı hesaplamak için doğrulama verileri olarak kullanacağız.

İşte kod:

```
from sklearn.model_selection import train_test_split

# split data into training and validation data, for both features and target
# The split is based on a random number generator. Supplying a numeric value to
# the random_state argument guarantees we get the same split every time we
# run this script.
train_X, val_X, train_y, val_y = train_test_split(X, y, random_state = 0)
# Define model
model = DecisionTreeRegressor()
# Fit model
model.fit(train_X, train_y)

# get predicted prices on validation data
val_predictions = model.predict(val_X)
print(mean_absolute_error(val_y, val_predictions)
```
Çıktı:
```

```


Örnek içi veriler için ortalama mutlak hatanız yaklaşık 500 dolardı. Numune dışı 250.000 dolardan fazladır.

Bu, neredeyse tamamen doğru olan bir model ile çoğu pratik amaç için kullanılamayan bir model arasındaki farktır. 
Referans noktası olarak, doğrulama verilerindeki ortalama ev değeri 1,1 milyon dolar. 
Yani yeni verilerdeki hata, ortalama ev değerinin yaklaşık dörtte biri kadar.

Bu modeli geliştirmenin, daha iyi özellikler veya farklı model türleri bulmak için deney yapmak gibi birçok yolu vardır.
