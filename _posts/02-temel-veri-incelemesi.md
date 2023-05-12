Genellikle bir veriseti modelleme için kulanılmadan önce çeşitli araçlarla incelenenir.
Pandas, Python programlama dilinde veri analizi ve işleme için güçlü bir araçtır.
Pandas kütüphanesinin özelliklerinin kullanılması verisetlerine yönelik genel bir izlenim edinmek için faydalıdır.

Pandas çeşitli veri yapıları ve fonksiyonlar ile birlikte gelir. Bu fonksiyonlardan en çok kullanılanları `pandas` ve `DataFrame` objeleridir.
Pandas ile verisetini `csv` dosyasından okuyabilir ve bir `DataFrame` olarak tanımlayabiliriz.
Daha sonra ise `describe()` metodunu kullanılarak bu veriseti üzerinde özet bilgilere erişebiliriz.
Bu özet bilgiler eldeki veri hakkında bir bakış edinilmesine olanak sağlar.

Öte yandan bu özet bilgileri yorumlayabilmek için ne anlama geldikleri bilinmelidir. 
Bu yazıda aşağıdaki sorulara cevap arayacağız.

* Pandas ile özet veriler nasıl görüntülenir?
* Özet bilgide yer alan count mean std max min satırları ne anlama gelmektedir?
* Özet bilgide yer alan std satırı (Standart sapma) nedir? Nasıl yorumlanır?
* Özet bilgide 25%, 50%, 75% değerleri nedir? Nasıl yorumlanır?

## Pandas Kütüphanesi

pandas, veri işleme ve analizi için Python programlama dili için yazılmış bir yazılım kitaplığıdır.
Özellikle sayısal tabloları ve zaman serilerini işlemek için veri yapıları ve işlemler sunar.
Veri üzerinde temel incelemeleri yapmak amacıyla kullanılabilir.

```
import pandas as pd
```

Pandas kütüphanesinin en önemli kısmı DataFrame'dir. 
DataFrame bir tablo olarak düşünülebilecek bir objedir.
Excel'deki bir sayfaya veya SQL veritabanındaki bir tabloya benzer.

```
data_file_path = '../input/my_data.csv'
df = pd.read_csv(data_file_path) 
df.describe()
```

`Describe` metodunu kullandığımızda `csv` dosyası üzerinden yüklediğimiz veri üzerindeki kolonları ve her biri için hesaplanmış aşağıdaki değerleri görürüz:

```
|       | Odalar       | Fiyat        | Mesafe       | Yatakodasi2  | BinaAlani    | MenkulSayisi  |
|-------|--------------|--------------|--------------|--------------|--------------|---------------|
| count | 13580.000000 | 1.358000e+04 | 13580.000000 | 13580.000000 | 7130.000000  | 13580.000000  |
| mean  | 2.937997     | 1.075684e+06 | 10.137776    | 2.914728     | 151.967650   | 7454.417378   |
| std   | 0.955748     | 6.393107e+05 | 5.868725     | 0.965921     | 541.014538   | 4378.581772   |
| min   | 1.000000     | 8.500000e+04 | 0.000000     | 0.000000     | 0.000000     | 249.000000    |
| 25%   | 2.000000     | 6.500000e+05 | 6.100000     | 2.000000     | 93.000000    | 4380.000000   |
| 50%   | 3.000000     | 9.030000e+05 | 9.200000     | 3.000000     | 126.000000   | 6555.000000   |
| 75%   | 3.000000     | 1.330000e+06 | 13.000000    | 3.000000     | 174.000000   | 10331.000000  |
| max   | 10.000000    | 9.000000e+06 | 48.100000    | 20.000000    | 44515.000000 | 21650.000000  |
```

Değerlerin açıklamaları aşağıdaki gibidir.

* `count` : `non-missing` değer barındıran satır sayısıdır. Örn. 1 odalı bir ev için 2. odanın büyüklüğü değeri `missing` olabilir.
* `mean` : Sayıların ortalama değerdir.
* `std` : Standart sapma. Veri grubundaki sayıların aritmetik ortalamaya göre nasıl bir yayılım gösterdiğini belirtir.
* `min` : Veri grubundaki en küçük değer.
* `25%` : (25. percentile) Sayıların %25'inden büyük olan en küçük değer.
* `50%` : (50. percentile) Sayıların %50'inden büyük olan en küçük değer.
* `75%` : (75. percentile) Sayıların %75'inden büyük olan en küçük değer.
* `max` : Veri grubundaki en büyük değer.

## Standart Sapma

Tablodaki std satırı, her kolonun standart sapmasını (standart deviation) göstermektedir. Standart sapma şu şekilde hesaplanır:
* Her bir değer ile ortalama değer arasındaki farkların karesi alınır. Değer sayısına bölünür.
* Varyans'a eşit olan bu değerin karekökü alındığında standart sapma bulunur.

```
import math

values = [1, 2, 3, 4, 5]
 
 # Ortalamayı hesapla
 len = len(values)
 mean = sum(values) / len
    
 # Her bir değerin ortalamadan farkı alınır. Karesi alınır toplanır. Uzunluğa bölünür.
 variance = sum((x - mean) ** 2 for x in values) / len
    
 # Varyansın kökünü alarak standart sapma hesaplanır.
 std_dev = math.sqrt(variance)
```

Standart sapma veri değerlerinin yayılımının özetlenmesi için kullanılır. Sayıların ortalama değere uzaklığını gösterir.
Düşük standart sapma verilerin ortalamaya yakın olarak dağıldığını gösterir.
Yüksek standart sapma ise değerlerin yayıldığını ve daha geniş bir aralığa dağıldıklarını gösterir.

Örneğin, Fiyat kolonu için std değeri `6.393107e+05`, bu da fiyatların `1.075684e+06` ortalama değeri etrafında nispeten geniş bir dağılıma sahip olduğu anlamına gelir. 
Benzer şekilde, Odalar sütununun std değeri `0,955748`dir; bu, her dairedeki oda sayısının ortalama `2,937997` değerine yakın olma eğiliminde olduğu anlamına gelir.

```
|       | Odalar       | Fiyat        | Mesafe       | Yatakodasi   | BinaAlani    | BinaSayisi    |
|-------|--------------|--------------|--------------|--------------|--------------|---------------|
| count | 13580.000000 | 1.358000e+04 | 13580.000000 | 13580.000000 | 7130.000000  | 13580.000000  |
| mean  | 2.937997     | 1.075684e+06 | 10.137776    | 2.914728     | 151.967650   | 7454.417378   |
| std   | 0.955748     | 6.393107e+05 | 5.868725     | 0.965921     | 541.014538   | 4378.581772   |
| min   | 1.000000     | 8.500000e+04 | 0.000000     | 0.000000     | 0.000000     | 249.000000    |
| 25%   | 2.000000     | 6.500000e+05 | 6.100000     | 2.000000     | 93.000000    | 4380.000000   |
| 50%   | 3.000000     | 9.030000e+05 | 9.200000     | 3.000000     | 126.000000   | 6555.000000   |
| 75%   | 3.000000     | 1.330000e+06 | 13.000000    | 3.000000     | 174.000000   | 10331.000000  |
| max   | 10.000000    | 9.000000e+06 | 48.100000    | 20.000000    | 44515.000000 | 21650.000000  |
```

## Minimum, Maksimum ve Yüzdelik Değerler

Tabloda sağlanan verilere göre, veri setinin 13.580 daire hakkında bilgi içerdiği görülmektedir.

* `Fiyat`
  * Bir dairenin ortalama fiyatı `1.075.684`, standart sapması `639.310,7`dir.
  * Minimum fiyat `85.000` ve maksimum fiyat `9.000.000`dir.
* `Odalar`
  * Bir dairedeki ortalama oda sayısı `0,96` standart sapma ile yaklaşık `2,94`tür.
  * Minimum oda sayısı 1, maksimum oda sayısı 10'dur.
* `Mesafe`
  * Merkezi bir iş bölgesine ortalama uzaklık `5,87` standart sapma ile `10,14`tür.
  * Minimum mesafe `0` ve maksimum `48,1`dir.
* `YatakOdasi`
  * Bir dairedeki ortalama yatak odası sayısı `0,97` standart sapma ile yaklaşık `2,91`dir.
  * Minimum yatak odası sayısı `0`, maksimum `20`dir.
* `Bina Alanı`
  * BinaAlani kolonu, diğer kolonlara kıyasla daha az veri noktasına `(7.130)` sahiptir.
  * Bir apartmanın ortalama bina alanı yaklaşık `151,97`dir ve büyük bir standart sapmaya `(541,01)` sahiptir.
  * Minimum bina alanı `0` ve maksimum bina alanı `44.515`tir.
* `BinaSayisi`
  * Ortalama Propertycount değeri, `4.379` standart sapma ile `7.454`tür.
  * Minimum değer `249` ve maksimum değer `21.650`dir.

`%25, %50 ve %75` değerleri fiyat, merkezi iş bölgesine uzaklık, oda ve yatak odası sayısı, bina alanı ve daire sayısı gibi dairelerle ilgili çeşitli değişkenler için özet istatistikler sağlamaktadır.

`%25, %50 ve %75` değerleri, verilerin dağılımını anlamak ve olası aykırı değerleri belirlemek için kullanılabilir.
Sırasıyla her sütunun birinci çeyrek (1. quartile) (Q1), ortanca (median) (Q2) ve üçüncü çeyrek (3. quatrile) (Q3). Bu değerler verileri dört eşit parçaya böler.

* `İlk Çeyrek (%25) :`
  * İlk çeyrek (Q1), verilerin en düşük %25'ini diğerlerinden ayıran değerdir.
  * Örneğin, Fiyat sütununda dairelerin %25'inin fiyatı 650.000 veya daha düşük.
* `İkinci Çeyrek (%50) :`
  * Medyan (Q2), verileri iki eşit parçaya ayıran değerdir.
  * Verilerin %50'si bu değerden küçük veya bu değere eşit, verilerin %50'si bu değerden büyük veya ona eşittir.
  * Örneğin, Fiyat sütununda, dairelerin yarısının fiyatı 903.000 veya daha düşük, yarısının fiyatı ise 903.000 veya daha yüksektir.
* `Üçüncü Çeyrek (%75) :`
  * Üçüncü çeyrek (Q3), verilerin en yüksek %25'ini diğerlerinden ayıran değerdir.
  * Örneğin, Fiyat sütununda dairelerin %25'inin fiyatı 1.330.000 veya daha yüksektir.
