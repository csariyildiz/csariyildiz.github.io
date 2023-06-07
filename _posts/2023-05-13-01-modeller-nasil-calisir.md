---
layout: post
header: "Veri Bilimi ve Modeller"
title: "Modeller Nasıl Çalışır?"
category: tutorial
tags:
    - Data Science And Models
---

Örnek bir senaryo düşününelim. Kuzeniniz gayrimenkul spekülasyonu yaparak milyonlarca dolar kazandı. Veri bilimine olan ilginizden dolayı sizinle iş ortağı olmayı teklif etti. 
O size parayı sağlayacak ve siz de çeşitli evlerin değerini tahmin eden modeller sağlayacaksınız.

Kuzeninize geçmişte gayrimenkul değerlerini nasıl tahmin ettiğini soruyorsunuz ve o bunun sadece bir sezgi olduğunu söylüyor. 
Ancak daha fazla sorgulama yaptığınızda görüyorsunuz ki geçmişte işlem yaptığı apartman daireleri için fiyat kalıpları belirlemiş ve bu kalıpları, düşündüğü yeni evler için tahminlerde bulunmak için kullanmış.

Makine öğrenimi de aynı şekilde çalışır. 
Karar Ağacı (Decision Tree) adı verilen basit bir model makine öğrenimine örnektir. 
Daha isabetli tahminler veren daha süslü modeller de bulunmaktadır. 
Ancak karar ağaçlarının (Decision Tree) anlaşılması kolaydır ve veri bilimindeki en iyi modellerden bazıları için temel yapı taşıdırlar.

Örnek bir karar ağacı aşağıdaki şekilde olabilir:

```
 Apartman Dairesi 2'den fazla yatak odasına sahip mi?
 ├──  Evet -> Tahmini Fiyat: $188.000
 └──  Hayır -> Tahmini Fiyat: $178.000
```

Gördüğümüz gibi yukarıdaki basit sınıflandırma apartman dairelerini iki kategoriye böldü. Bu kategorilerdeki fiyatlandırma aynı kategorideki evlerin tarihsel olarak ortalaması ile belirlenmiş.

Apartman dairelerinin nasıl iki gruba ayıracağına karar vermek için veri (yatak odası sayısı) kullanılmış ve ardından her grup için tahmini fiyat belirlenmiş.

Veriden örüntülerin bu şekilde çıkarılması işlemine "fitting" ya da "training" denir. Modeli "fit" etmek içi kullanılan data eğitim "training" datasıdır.

Aşağıdaki iki karar ağacından üsttekinin gayrimenkul eğitim verilerinden kaynaklanıyor gibi görünmektedir.
Çünkü daha çok yatak odasına sahip apartman dairelerinin fiyatlarının daha az yatak odasına sahip apartman dairelerinden fazla olması mantıklıdır.   
Bu nedenle karar ağacı 1'i karar ağacı 2 ye tercih edilmesi yerinde olacaktır.

```
## Karar Ağacı - 1
 Apartman Dairesi 2'den fazla yatak odasına sahip mi?
 ├──  Evet --> Tahmini Fiyat: $188.000
 └──  Hayır -> Tahmini Fiyat: $178.000

## Karar Ağacı - 2
 Apartman Dairesi 2'den fazla yatak odasına sahip mi?
 ├──  Evet --> Tahmini Fiyat: $188.000
 └──  Hayır -> Tahmini Fiyat: $178.000
```

Bu modelin en büyük eksikliği, apartman dairesinin fiyatını etkileyen banyo sayısı, kaç metrekare olduğu, konum vb. faktörlerin çoğunu kapsamamasıdır.

Ağacı daha çok "split" (bölünme) içerecek şekilde daha derin hale getirebiliriz.  Örneğin dairenin kaç metrekare olduğuna göre aşağıdaki gibi karar verilebilir.

```
### Karar Ağacı - 3
 Apartman Dairesi 2'den fazla yatak odasına sahip mi?
 ├──  Evet -> Apartman Dairesin 11500 metrekareden büyük mü?
 │    ├── Evet --> Tahmini Fiyat: $146.000
 │    └── Hayır -> Tahmini Fiyat: $188.000
 │
 └──  Hayır -> Apartman Dairesin 11500 metrekareden büyük mü?
      ├── Evet --> Tahmini Fiyat: $170.000
      └── Hayır -> Tahmini Fiyat: $223.000
 ```

Karar ağacını takip ederek, her zaman o evin özelliklerine karşılık gelen path seçilerek herhangi bir evin fiyatını tahmin edilir.
Daire için tahmin edilen fiyat ağacın en altındadır. Altta tahminde bulunan bu noktaya noktaya "leaf" (yaprak) denir.
Split ve leaf'lerdeki değerler data tarafından belirlenir. Bu nedenle data üzerinde yapılacak kontroller önemlidir.





