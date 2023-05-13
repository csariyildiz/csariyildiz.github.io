Bir model oluşturulduktan sonra modelin kalitesi doğrulanma "validation" aşamasında belirlenir.
Model kalitesini ölçmek, modellerin yinelemeli olarak iyileştirilmesi açısından önemlidir.

Oluşturulan modellerin neredeyse tamamı için doğrulama bir gerekliliktir. Hepsi için olmasa da çoğu uygulamada tahminlerindeki isabetlilik modelin kalitesinin ölçütüdür.
Modelin tahminlerinin gerçekte olanlarla tutarlı olması beklenir.

Doğrulama esnasında yapılan en büyük hata eğitim verisinin doğrulama verisi ile direkt olarak karşılaştırılmasıdır
10.000 daire için tahmin edilen ve gerçek daire fiyatlarını karşılaştrıldığında,  iyi ve kötü tahminlerin bir karışımı ile karşılaşılır. 
10.000 tahmini ve gerçek değerden oluşan bir listeye bakılması anlamsız olacaktır. Çözüm sonucun bir metrikte özetmesidir.
Model kalitesini özetlemek için birçok ölçüm vardır. Ortalama Mutlak Hata (MAE - Mean Absolute Error) olarak adlandırılan bir ölçüm bunlardan biridir.
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

Her bir daire fiyatlandırması için tahminin hatası aşağıdaki gibidir.

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
## In-Sample Skorlarda Karşılaşılan Sorunlar


