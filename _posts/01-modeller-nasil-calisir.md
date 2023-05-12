## Modeller Nasıl Çalışır?

Örnek bir senaryo düşününelim. Kuzeniniz gayrimenkul spekülasyonu yaparak milyonlarca dolar kazandı. Veri bilimine olan ilginizden dolayı sizinle iş ortağı olmayı teklif etti. 
O size parayı sağlayacak ve siz de çeşitli evlerin değerini tahmin eden modeller sağlayacaksınız.

Kuzeninize geçmişte gayrimenkul değerlerini nasıl tahmin ettiğini soruyorsunuz ve o bunun sadece bir sezgi olduğunu söylüyor. 
Ancak daha fazla sorgulama yaptığınızda görüyorsunuz ki geçmişte gördüğü apartman dairelerinin fiyat kalıpları belirlemiş ve bu kalıpları, düşündüğü yeni evler için tahminlerde bulunmak için kullanmış.

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

## Karar Ağacının Geliştirilmesi

Aşağıdaki iki karar ağacından üsttekinin gayrimenkul eğitim verilerinden kaynaklanıyor gibi görünmektedir. 
Çünkü daha çok yatak odasına sahip apartman dairelerinin fiyatlarının daha az yatak odasına sahip apartman dairelerinden fazla olması mantıklıdır.   

```
## Karar Ağacı - 1
 Apartman Dairesi 2'den fazla yatak odasına sahip mi?
 ├──  Evet -> Tahmini Fiyat: $188.000
 └──  Hayır -> Tahmini Fiyat: $178.000

## Karar Ağacı - 2
 Apartman Dairesi 2'den fazla yatak odasına sahip mi?
 ├──  Evet -> Tahmini Fiyat: $188.000
 └──  Hayır -> Tahmini Fiyat: $178.000

```

Bu modelin en büyük eksikliği, apartman dairesinin fiyatını etkileyen banyo sayısı, kaç metrekare olduğu, konum vb. faktörlerin çoğunu kapsamamasıdır.


