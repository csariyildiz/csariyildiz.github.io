---
layout: post
header: "Veri Bilimi ve Modeller"
title: "Makina Öğrenmesi Modelleri"
category: tutorial
tags:
    - Data Science And Models
---


Veri setleri kimi zaman anlaşılmasını zorlaştıracak şekilde çok şekilde değer barındırabilir. 
Bu durum verilerin daha rahat anlaşılacak şekilde parçalanarak incelenmesini önemli hale getirir.
Veriler manuel seçilebilir ya da önceliklendirme için istatistiksel teknikler kullanılabilir.

Değişkenlerin manuel olarak seçilmesi için veri setindeki tüm sütunların bir listesinin görülmesi gerekir. 
Bir `pandas` `DataFrame`i içerisinde `columns` adlı `property` ile sütunların listesi görüntülenebilir.

```
import pandas as pd

data_file_path = '../input/my_data.csv'
df = pd.read_csv(data_file_path) 
df.columns
```
Çıktı: 
```
Index(['Adres', 'Odalar', 'Tür', 'Fiyat', 'Yöntem', 'SatıcıG',
        "Tarih", "Mesafe", "PostaKodu", "YatakOdası", "Banyo", "Araba",
        'AlanBuyuklugu', 'InsaYili', 'Enlem', 'Boylam', 'BolgeAd'"],
      dtype='object')
```

Kimi zaman verisetleri kayıp değerler`missing values` içerebilir. Kayıp değerler kolonlar üzerinde kimi değerlerin tanımlı olmadığı anlamına gelir.
Böyle bir durumda yaklaşımlardan biri değerlerin silinmesidir. 

```
df = df.dropna(axis=0)
```

Verisetinin bir alt kümesini seçmek için yine bir çok yaklaşım uygulanabilir.

Fakat burada bir decision-tree modelinin yanı sıra modelin oluşturulmasında kullanılacak olan yöntem aşağıdaki gibi olacaktır.
1. Nokta notasyonu `(dot-notation)` kullanılarak tahmin için bir hedef `(prediction target)` oluşturulur.
2. Kullanılacak değerlerin listesi ile seçim yapılır. Böylece verinin özellikleri `features` belirlenir.

## Tek Bir Tahmin Hedefi Oluşturulması

Nokta notasyonu kullanılarak tek bir değeri seçebiliriz. Bu değer `Series` içerisinde tutulan tek bir kolondur.
Series için kabaca tek bir data kolonu barındıran bir `DataFrame` denilebilir.

Aşağıdaki gibi bir satırla tahmin etmek istenilen tek bir kolon seçilebilir. Bu kolon tahmin hedefi `(prediction target)` olacaktır.
Genellikle `y` ile gösterilir.

```
y = df.Fiyat
```

Yukarıdaki satır ile `y` tahmin hedefi olarak `Series` tipinde tanımlanmış olacaktır.

## Birden Fazla Hedef Değer (Feature) Tanımlamak

Modelin içerisine tahmin yapılmak üzere yüklenecek kolonlara `feature` adı verilir.
Bu durumda `Fiyatı` ve belirlemek üzere bu kolonlar kullanılacaktır. 

Bazen bir grup kolonu feature olarak kullanmak yerine hedef hariç tüm kolonlar feature olarak kullanılabilir.
Kimi zamanlarda ise daha az feature kullanımı daha iyi sonuçlar verebilmektedir.

Burada birkaç feature kullanarak tahmin yapılacaktır. Daha sonra süreç tekrarlanabilir ve modellerin karşılaştırılması yapılabilir.

Aşağıdaki gibi liste tipinde feature'lar tanımlanabilir.

```
features = ['Odalar', 'YatakOdasi', 'AlanBuyuklugu', 'Enlem', 'Boylam']
```

Özellikler (`features`) geleneksel olarak `X` ile gösterilir.

Daha sonra bu değerler yeni bir `DataFrame` olarak alınır.

```
X = df[features]
```

`describe` ve `head` metodunu kullanarak özet bilgilerini ve en üstteki verinin bir kısmı görülebilir.


```
X.describe()
```
Çıktı:
```
|       | Odalar      | YatakOdasi  | AlanBuyuklugu | Enlem       | Boylam      |
|-------|-------------|-------------|---------------|-------------|-------------|
| count | 6196.000000 | 6196.000000 | 6196.000000   | 6196.000000 | 6196.000000 |
| mean  | 2.931407    | 1.576340    | 471.006940    | -37.807904  | 144.990201  |
| std   | 0.971079    | 0.711362    | 897.449881    | 0.075850    | 0.099165    |
| min   | 1.000000    | 1.000000    | 0.000000      | -38.164920  | 144.542370  |
| 25%   | 2.000000    | 1.000000    | 152.000000    | -37.855438  | 144.926198  |
| 50%   | 3.000000    | 1.000000    | 373.000000    | -37.802250  | 144.995800  |
| 75%   | 4.000000    | 2.000000    | 628.000000    | -37.758200  | 145.052700  |
| max   | 8.000000    | 8.000000    | 37000.000000  | -37.457090  | 145.526350  |
```

`head` ile üstteki verinin bir kısmını görüntülenir.

```
X.head()
```
Çıktı:
```
|   | Odalar | YatakOdasi | AlanBuyuklugu | Enlem     | Boylam     |
|---|--------|------------|---------------|-----------|------------|
| 1 | 2      | 1.0        | 156.0         | -37.8079  | 144.9934   |
| 2 | 3      | 2.0        | 134.0         | -37.8093  | 144.9944   |
| 4 | 4      | 1.0        | 120.0         | -37.8072  | 144.9941   |
| 6 | 3      | 2.0        | 245.0         | -37.8024  | 144.9993   |
| 7 | 2      | 1.0        | 256.0         | -37.8060  | 144.9954   |
```


Verilerin bu komutlarla görsel olarak kontrol edilmesi, işlemlerin önemli bir parçasını oluşturur. 
Veri kümesinde sık sık inceleme yapıldıkça daha fazla incelemeyi hak eden sürprizler bulunabilir.

## Modeli Oluşturmak

Python ile makine öğrenimi kütüphanelerinden biri olan `scikit-learn` modeller oluşturmak için sıklıkla kullanılmaktadır.
Kodlama yapılırken örnek kodda görüldüğü gibi kütüphane `sklearn` olarak yazılmıştır. 
`scikit-learn`, genel olarak `DataFrame` olarak depolanan veri türlerini modellemek için kullanılan en popüler kütüphanedir.

Modeli oluşturmakta takip edilecek aşamalar aşağıdaki gibidir:
1) Tanımlama (Definition): Ne tür bir model olacak? Bir karar ağacı (decision-tree) mi? Başka bir model türü mü? Model tipinin diğer bazı parametreleri ne olacak?
2) Yerleştirme (Fitting): Verilerdeki örüntülerin yakalanması. Bu modelleme işleminin en önemli kısmıdır.
3) Tahmin (Prediction): Değerlerin tahmin edilmesi işlemi.
4) Değerlendirme (Evaluation): Model tahminlerinin ne kadar isabetli olduğunun ölçülmesi.

Aşağıda `scikit-learn` ile bir karar ağacı modeli (`decision-tree`) tanımlanmasının ve onun özellikler (`features`) ve hedef değişkenle (`target-variable`) uydurmanın bir örneği verilmiştir.

```
from sklearn.tree import DecisionTreeRegressor

# Modelin tanımlanması. Her çalıştırmada aynı sonuçların gelmesini sağlamak için bir random_state belirtilir.
model = DecisionTreeRegressor(random_state=1)

# Modelin Yerleştirilmesi
model.fit(X, y)
```
Çıktı:
```
DecisionTreeRegressor(random_state=1)
```

Bir çok makine öğrenmesi modeli eğitim esnasında rastlantısallığa izin verir. 
`random_state` için bir değer belirtilmesi her bir çalıştırmada aynı sonucun alınmasına yardımcı olur.
Bu iyi bir pratik kabul edilir. 

Gerçekleştirilen `fitting` aşamasından sonra tahminlerde bulunmak için kullanılabilecek uygun bir model oluşturulmuş olur.
Uygulamada, zaten fiyatlarına sahip olunan daireler yerine piyasaya çıkan yeni daireler için tahminler yapmak istenecektir. 
Ancak, `predict` fonksiyonunun nasıl çalıştığını görmek için eğitim verilerinin ilk birkaç satırı için tahminler yapılabilir.

```
print("Takip eden 5 apartman için tahmin yapılıyor:")
print(X.head())
print("Tahminler aşağıdaki gibidir:")
print(model.predict(X.head()))
```
Çıktı aşağıdaki gibi olacaktır.

```
Takip eden 5 apartman için tahmin yapılıyor:
     Odalar   YatakOdasi  AlanBuyuklugu   Enlem       Boylam
1      2       1.0        156.0          -37.8079    144.9934
2      3       2.0        134.0          -37.8093    144.9944
4      4       1.0        120.0          -37.8072    144.9941
6      3       2.0        245.0          -37.8024    144.9993
7      2       1.0        256.0          -37.8060    144.9954
Tahminler aşağıdaki gibidir:
[1035000. 1465000. 1600000. 1876000. 1636000.]
```
