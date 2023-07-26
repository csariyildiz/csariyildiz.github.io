---
layout: post3
title: "Bir Bilgisayar Seçerken Nelere Dikkat Ediyoruz?"
category: gonderiler
tags:
  - Hardware
  - Donanım
---


Benchmark testleri. Bİlgisayar tipleri. Bİlgisayarların parçaları. 

## Bilgisayar Tipleri

Bilgisayar seçerken genellikle ilk dikkat çeken hangi amaca yönelik üretilmiş olduğudur. Bu bilgisayarların parçaları ayrı ayrı alınabileceği gibi bir ürün üreticisinden alınabilir.
Bilgisayarın tipi hangi amaca yönelik üretilmiş olduğu hakkında bilgi verse de örneğin bir laptop bir masaüstü bilgisayardan daha gelişmiş olabilir. Yani donanım hakkında net olarak pek bilgi vermez.
Bilgisayarların tiplerine bakacak olursak aşağıdaki gibi sıralandıklarını görürüz:

```
Laptop, Masaüstü Bilgisayar, Akıllı Telefon ve Tablet, Rack Sunucu, Bir işlemci barındıran her şey
```

Daha ufak ve alt sistem özelliklerine sahip Netbook'ları Laptop kategorisi içerisinde değerlendirebiliriz.

Masaüstü bilgisayarın All In One, MiniPC gibi tipleri vardır.

Bir işlemci barındıran her şey gömülü cihaz, geliştirme kartı gibi şeyler olabilleceği gibi evde kullandığımız tartı buzdolabı televizyon da olabilir. (IoT)
Cloud kullanımdan ayrıca bahsetmek gerekir ki bu sanal makinelerin uzaktan kullanılması anlamına gelir. Bilgisayarlar iş ağırlıklarını ve fonksiyonlarını bu şekilde paylaşıp devredebilirler.
Sunucularda ise rack tipi sistemler kullanılır. Eğer bir sanallaştırma ortamı kurulacaksa bunun için hepsini beraber sağlayan sistemler bulunur ve bunlar beraber satılır.

### Bilgisayarın Bileşenleri

Bir laptop'u ele alacak olursak bileşenleri en temelde dışından ayırt edebileceklerimizle başlayabiliriz. Bunlar aşağıdaki gibidir:

```
Ekran, Klavye, TouchPad, Güç Adaptörü, Batarya, Güç besleme Ünitesi, Portları, Güç Butonu, Fan Çıkışı, Mikrofon, Kamera
```

Bataryası kimisinde içeridedir. Portlar çeşitlilik gösterebilir. USP portları, HDMI veya VGA çıkışı, kart okuyucu, CD-DVD okuyucu görebiliriz.
Klavye altında bulunan anakartın üzerinde ve çevresinde ise aşağıdaki birimler bulunur.

```
Anakart, CPU, RAM, Hard Disk, GPU, Network Kartı, Wireless Kartı, Bluetooth Kartı, Hoparlör
```

Bu bileşenler RAM, GPU gibi bir kısmı anakart üzerindeki slotlara (PCI, PCIe, AGP) yerleşmiş olarak bulunur. Wireless kartı gibi kısmı yine kablolarla ilgili bağlanmıştır.
CPU'nun ise kendi soketi bulunur.

Aslında bir bilgisayar sisteminin çalışır duruma gelmesi için CPU ve RAM yeterlidir. CPU matematiksel işlemleri talimatlar (instruction) ları RAM'den yükleyerek çalıştırır.
Bunlar işlemcinin modeline göre düzenlenmiş makina kodlarıdır (assembler) ve aritmetik işlemler olarak CPU çipine tanımlanmışlardır.
Bir sonraki bölümde bilgisayarların nasıl hesaplama yaptığını daha derinden inceleyebiliriz.

## Bilgisayarla Hesaplama Nasıl Yapılır?

Bilgisayarın beyni diyebileceğimiz CPU ve hafızası diyebileceğimiz RAM daha ufak elektronik parçalardan oluşurlar.

CPU temelinde transistörler ile mantık kapılarının (AND, OR, XOR) belirli bir mimaride birleştirilmesiyle oluşur. Mantık kapıları ile basit aritmatik işlemleri yapacak bileşenler üretilir. (half adder, full adder) 
Bu bileşenlerle ALU, Flag'ler ve kontrol ünitesi ile CPU meydana gelmiş olur. RAM'den yüklediği değişkenlerle tanımlı işlemleri yapar.
Bu işlem setiyle makina dilinde programlar talimatlar halinde yazılabilir hale gelir.
C gibi daha üst seviye programlama dilleri derlenerek talimatlara dönüştürülür. Bu programlama dilleri ile geliştirilen işletim sistemleri ve yazılımlar derlendiğinde işlemci tarafından okunabilir hale gelir.

```
Elektrik Akımı
Transistör
Logic Gate
ALU, Flag'ler, Register'lar ve Control Unit
CPU ve RAM
Makina Dili Talimatları
Programlama Dilleri
İşletim Sistemleri ve Yazılımlar
```

## Transistörler ve Öncesi

İlk bilgisayarlar tamamen mekaniktir. Bilgisayarlı hesaplamanın ilk örneklerine bakıldığında örneğin 1944 yılında IBM tarafından üretilen Harward Mark I fiziksel anahtarlar (switch), dönen mil (rotating shaft), milleri birbirine bağlayan mekanizma (cluch)
ve mekanik röle (relay) yardımıyla çalıştığını görürüz. Röle bir telden akım geçip geçmeyeceğini başka bir telle kontrol edebildiğiniz basit bir devredir. 
Kontrol teli bir bobin içerir ve bu bobin üzerinden elektrik geçtiğinde elektromanyetik alan oluşarak öteki telin içerisindeki parçayı çeker. Böylece o telden de akım geçerek devreyi tamamlar. Muslukla çalışma şekli aynıdır.
Bu devre başka bir devreye bağlanabilir ya da mekanik bir işlemi tetiklemek için kullanılabilir. Bu  flip-flops ya da latche denilen devre elemanıdır.

Burada rölenin içerisindeki mekanik kolun kütlesi açıp kapama işleminin hızını etkilemektedir. 1940 larda iyi performanslı bir röle saniyede 50 kere açılıp kapanabilmektedir.
Matematiksel işlemleri çözme konusunda pek çok kısıt barındırıyordu. Harward Mark I bir saniyede 3 toplama ve çıkarma işlemi yapabiliyordu. 

The Mark I had 60 sets of 24 switches for manual data entry and could store 72 numbers, each 23 decimal digits long.[10] 
It could do 3 additions or subtractions in a second. A multiplication took 6 seconds, a division took 15.3 seconds, and a logarithm or a trigonometric function took over one minute.[11

Mekanik parçalar kolay yıpranıyor ve bozuluyorlardı. Rölelere gelince Harward Mark I 3500 kadar röle barındırıyordu ve devamlı değişmesi gerekiyordu.
Mekanik röleler için alternatif 1904'de John Ambrose Fleming tarafından geliştirilen (thermionic valve) oldu. Ampüle benzeyen bu tüpler vakum ortamında cam içerisinde iki tel barındırıyordu. 
İlk vakum tüpü olan bu icat elektrot olarak kullanılan tellerden biri ısıtılınca iletim sağlanıyordu. Isıtılan tel tarafından saçılan elektronlar diğer tel tarafından çekiliyor böylece devre tamamlanmış oluyordu.
Fakat yalnızca pozitif olarak yüklenmiş olması gerekiyordu. Eğer negatif veya nötr yüklenmişse iletim olmuyordu. 
Bu tasarıma Lee De Forest 1906'da üçüncü bir kontrol elektrodu ekledi. Bu kontrol elektroduna negatif yük verilirse akım önleniyor. Pozitif yük verilirse akım sağlanıyordu.
Bu aslında relay ile aynı işi yapıyordu fakat önemli bir farkla hareket eden bir mekanizmaları yoktu. Bu da hız (saniyede binlerce) ve daha geç yıpranma anlamına geliyordu.
Aynı zamanda elektro-mekanikten elektroniğe geçişi sembolize diyordu.

1947 yılında ise devrimsel nitelik taşıyan bir gelişme olan transistörlerin keşfi yaşandı. Transistörlerin ardındaki fizik son derece kompleks ve quantum mekaniğine dayanmaktadır.
Transistörler genellikle iki elektrodun bir materyal tarafından ayrılması ile çalışır. Bu madde de bir yarıiletkendir. Germanium ve Silicon kullanılır. (Burada bahsedilen element Türkçe'de silisyum'dur. Polimer olan silikonla (silicone) karıştırılmamalıdır. )

Vakum tüpleri gibi kırılgan yapılar yerine transistörler solid state'dir. 
Transistörler çok daha küçülmüş maliyeti de ucuzlamıştır. IBM 607 1957 yılında ilk transistör bazlı makina olmasından itibaren vakum tüpü teknolojisi yerini transistöre bırakmıştır.

Transistör ve yarıiletken teknolojisinin Santa Clara vadisinde gerçekleşmesi bölgeye silikon vadisi ismini verdi.

Bugün işlemcilerde kullanılan transistörler 50 nanometreden küçüktür. Onlarca yıl çalışabilirler ve saniyede milyonlarca kez açılıp kapanabilirler. 
Daha küçük ve etkili transistör yapma çabası bugün 0.1 ile 0.5 nanometre arasında olan atomun sınırına dayansa da ardında yatan mantık röle ile aynı.

### Boolean Logic ve Mantıksal Kapılar
Elektriğin olup olmadığı ya da belirli bir voltaj değerinin üstünde olup olmadığı ile 0 ya da 1'i temsil edebiliriz. Örneğin 10 sayısını binary ile 1010 olarak gösterebiliriz.
Eğer büyük A harfini ASCII gibi bir tablo kullanarak 01000001 olarak göstermemiz yine mümkün. Binary değerler için 'true' ya da 'false' diyebiliriz.

Bilgisayarların ilk örneleri ikili sistem yerine üçlü ya da dörtlü sistemler kullanabiliyordu. Bariz bir problem ne kadar state varsa elektrik voltajını bölüştürmenin o kadar zorlaşmasıdır.
Elektrik sinyalleri çevredeki elektromanyetik dalgalardan etkilenecektir. Aynı zamanda voltaj tam isabetli değerlerle verilemeyebilir. Örneğin telefonun şarjı azsa farklı voltaj 
vereceğinden işlemcisi bundan etkilenir. Transistörler milyonlarca kez durum değiştirdiğinden bu problem daha da artacaktır.

Bildiğimiz algebra'da değişkenlerin değerleri numaraladır. Bu numaralar üzerinden toplama ve çıkarma gibi işlemler yaparız.
Fakat boolean algebra da yalnızca True ve False değişkenleri vardır. Operasyonlar da yine mantıksaldır. AND, OR ve NOT.
Tablolayla kolayca gösterebileceğimiz bu işlemler fiziksel olarak transistörle de uygulayabiliriz. 
Telin bir tarafından akımliyorsa elimizdeki transistör için input ve output aşağıdaki gibi olacaktır. 

```
| Input | Output |
| 0     |  0     | 
| 1     |  1     | 
```

Böylece verdiğimiz inputa göre devreden akım geçmesini sağladık. Akım gelen kısmı bir pilin artı ucuna bağlar output kısmını da eksi ucuna bağlarsak. Kontrol telinden gönderdiğimiz ikinci bir akımla devreden
elektrik geçip geçmeyeceğini kontrol edebiliriz.
Transistörün bağlantılarını biraz değiştirilerek NOT işlemini gerçekleştirebiliriz. Eğer output yaptığımız bacağı topraklarsak gelen akım direkt topraklanacaktır. 
Bu gelen akımdan geçeceğimiz yeni bir tel ise input'un tam tersini verecektir. Böylece NOT işlemini kolayca gerçekleştirdik.
Pilin artı ve eksi uçlarına bağlarsak kontrol telimizde akım yokken devreden akım geçecek. Kontrol telimize akım geldiğinde ise devredeki akım duracaktır.

```
| Input | Output |
| 0     |  1     | 
| 1     |  0     | 
```

AND işlemini yine iki transistörü birbirine seri bağlayarak gerçekleştirebiliriz. Paralel bağlarsak da OR işlemini gerçekleştirmiş oluruz.

```
AND Kapısı
| Input A | Input  B | Output |
| 1       |  1       |    1   |
| 1       |  0       |    0   |
| 0       |  1       |    0   |
| 0       |  0       |    0   |
```

```
OR Kapısı
| Input A | Input  B | Output |
| 1       |  1       |    1   |
| 1       |  0       |    1   |
| 0       |  1       |    1   |
| 0       |  0       |    0   |
```

Bunları aynı zamanda semboller ile gösterebiliriz. XOR ise OR ile aynıdır ama iki 1 için 0 verir.

```
XOR Kapısı
| Input A | Input  B | Output |
| 1       |  1       |    0   |
| 1       |  0       |    1   |
| 0       |  1       |    1   |
| 0       |  0       |    0   |
```
XOR'u iki AND bir OR ve NOT kullanarak üretebiliriz.
XOR çok elverişlidir. Fakat elektronik değişkenler tasarlanırken XOR gibi bir kapının nasıl oluştuğu ile endişelenmemize gerek kalmaz.
Yine kapıyı oluşturan transistörlerle de ilgilenmeyiz. Ya da elektronların bu yarıiletkenler içerisinde nasıl aktığıyla da. 

Burada işlemler katmanlardan soyutlanarak (abstraction) ele alınır. Örneğin transistörler yerine aslında yalnızca onların birleşimi olan kapılardan bahsederiz.
Özellikle gerekmedikçe (neredeyse hiç bir zaman) bu soyulamaların yapısını değiştirmekle uğraşmayız.

Devreler tasarlanırken transistörlerden ziyade mantıksal kapılar onlardan oluşan az sonra bahsedeceğimiz bileşenler kullanılır.

### Aritmetik ve Mantıksal Birim

Sayısal değerleri tutmak ve onlara erişim sağlamak bir bilgisayar için önemlidir. Ama hesas hedef her zaman hesaplama yapmak olmuştur.
Bu da toplama işlemi örneğinde olduğu gibi, sayılar ile tutulan verinin belirli bir amaç doğrultusunda yorumlanması ve değiştirilmesidir. 

Bu işlemler bilgisayarın aritmetik ve mantıksal birim ALU (aritmethic logic unit) adı verilen kısmında yapılır. CPU için bilgisayarın beyni diyecek olursak
ALU da CPU'nun beynidir aslında. 

Intel 74181 en ünlü ALU'lardan bir tanesidir. 1970'de ilk defa tek bir çip içerisine sığabilen tam bir ALU olarak piyasaya çıkmıştır.
ALU'nun çalışmasını anlamak zahmetli olsa da sıfırdan bir bilgisayar inşa etmek gibi müthiş bir şeyi göstermesi açısından ilgi çekicidir.

ALU'yu parçalara ayırmakla başlayalım. Adını aldığı gibi bir kısmı aritmetik bir kısmı ise mantıksal kısmı bulunmaktadır.
Aritmetik birim bir bilgisayardaki tüm numerik işlemleri yapmaktan sorumludur. Bu işlemler toplama ve çıkarma, numarayı arttırmak gibi basit işlemlerdir aslında.

Toplama işleminden başlayacak olursak  XOR kapısını kullanabiliriz. 

Burada sorun `1+1=2` iken `1 XOR 1 = 0` etmektedir. Binary sistemde 2 yok. 2 binary olarak 10 bu da demek oluyor ki aslında XOR doğru çalışıyor sadece
ekstra biti koyacak bir yere ihtiyacımız var. Bu da demek oluyor ki elde (carry) olarak yeni bir outputumuz olacak.

```
Toplama
| Input A | Input  B | Carry  |  Sum   | 
| 0       |  1       |    0   |    0   |
| 0       |  0       |    0   |    1   |
| 1       |  0       |    0   |    1   |
| 1       |  1       |    1   |    0   |
```

XOR üstteki işlemleri tamamlıyor. Yalnızca son satır için bir de AND kapısını A ve B ye bağlıyoruz. O da eldeyi (carry) tutacak.
Böylece half adder adı verilen devreyi tamamlamış olduk. Karmaşık olmayan bu devre yalnızca iki mantıksal kapıdan oluşuyor.

```
       ┌──────────────────────┐                                               
 [A] ──┤  Half - Adder        ├── [C] 
 [B] ──┤                      ├── [S] 
       └──────────────────────┘        

```

Half adder'a yalnızca input olarak yalnızca 0 ve 1 verebiliyoruz. Output olarak ise sayıların toplamı olarak 0, 1 veya 2 alıyoruz.
Aşağıdaki gibi full adder kullanacak olursak 

```
       ┌──────────────────────┐                                               ┌────┐
 [A] ──┤  Half - Adder    [C] ├───────────────────────────────────────────────┤    |
 [B] ──┤                  [S] ├─────────┐    ┌──────────────────────┐         | OR ├── [C]
       └──────────────────────┘         └────┤ [A]              [C] ├─────────┤    |
                                             |    Half - Adder      |         └────┘
 [C] ────────────────────────────────────────┤ [B]              [S] ├───────────────── [S]
                                             └──────────────────────┘  
```

Bunları kullanarak iki 8-bit numarayı toplayan bir toplayıcı yapabiliriz. (8-bit adder)

### Register'lar ve RAM



### Merkezi İşlem Birimi (CPU)


### Talimatlar ve Programlar


### Bir Laptop'u İnceleyelim

Laptop'lar taşınılması kolay olması ile dikkat çeker.  Örneğin bir laptop'u inceleyecek olursak. Elimdeki bir laptop'u dışardan incelemeye başlayayım.

```
Marka/Model : Asus S510U Notebook PC
Input : +19V 3.42A, 65W
Üretim Yılı : 2017-12
```

Seri numarası envanter amaçlı kullanılabilir. Güvenlik sebebiyle paylaşamasam da üretim yılından 2017 yılının 12. ayında üretildiğini görüyoruz.
Üzerinde aynı zamanda wireless ve bluetooth bilgileri yer almakta. Wireless'ın modeli 8265NGW imiş ve MAC adresi de verilmiş.
Bilgisayar içerisinden Windows'ta başlata dxdiag yazarak çeşitli bilgileri görebiliriz. Başka yollarla bakılması mümkün olsa da dxdiag yani DIRECTX tool'u bize detaylı bilgi veriyor.
Şimdi cihazın işlemci ve GPU'sunu inceleyelim.

```
CPU : Intel(R) Core(TM) i7-8550U CPU @ 1.80GHz (1) 64-bit AES
      L2:1.0 MB L3:8.0 MB 4C/8T NUMA:1

GPU : NVIDIA GeForce MX150
```

i7-8550U modelinin detaylarını Intel'in sitesinden detaylarını görüntüleyelim.
Biraz eski olan bu işlemcinin satışı durdurulmuş. 4 core olduğunu ve 1.80 GHz ve 4 GHz değerlerini görüyoruz.

```
CPU Specifications 
  Total Cores :4
  Total Threads : 8
  Max Turbo Frequency : 4.00 GHz
  Intel® Turbo Boost Technology 2.0 Frequency : 4.00 GHz
  Processor Base Frequency : 1.80 GHz
  Cache : 8 MB Intel® Smart Cache
  Bus Speed :4 GT/s
  TDP : 15 W
  Configurable TDP-up Base Frequency :2.00 GHz
  Configurable TDP-up :25 W
  Configurable TDP-down Base Frequency :800 MHz
  Configurable TDP-down :10 W
```




## Referanslar

* https://www.intel.com/content/www/us/en/products/sku/122589/intel-core-i78550u-processor-8m-cache-up-to-4-00-ghz/specifications.html
* https://academo.org/physics/
* https://www.youtube.com/watch?v=FZGugFqdr60&list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo&index=8&ab_channel=CrashCourse
