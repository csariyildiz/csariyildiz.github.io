---
layout: post3
title: "XMRig ve Madencilik Üzerine Bir İnceleme"
category: "gonderiler"
cat: System
tags:
  - XMRig
  - Monero
  - Mining
latest_update: "2023-07-10"
---

Kripto paraların popülerlik kazanmaya başladığı 2010'lu yılların ortalarından itibaren insanların hayatında çok şey değişti.
Kişilerin bakış açısına göre kelimenin yaptığı çağrışım olumlu. Kripto para dünyasında görece küçük yatırımlarla yer alanlar, hisse senedi piyasasında olduğu gibi yatırım yapma, alım-satım gerçekleştirme gibi faaliyetlerde bulunuyorlar. Temkinli olanlar ise spekülatif ortamlardan ve ortaya çıkan dolandırıcılık faaliyetlerinden dolayı oluşan yeni ekosisteme şüphe ile yaklaşıyor.

Öte yandan bir teknoloji olarak blockchain kendi gerçekleriyle modern hayatın içinde yer almaya devam ediyor. Blockchain sisteminin madencilik ve Etherium ile hızlanan merkezi olmayan (decenteralized) uygulamalar gibi pek çok alanı var. Kripto para birimlerinin teknik altyapısı ve uygulama pratiği, özellikle bilgisayarlarla içli dışlı olanlar için de oldukça ilginç detaylar sunuyor. Kriptografi, network, programlama, donanım ve siber güvenlik gibi birçok alana yakınlığı onu dikkate değer hale getiriyor.

Bu yazıda, XMRig adlı yazılım aracılığıyla nasıl madencilik yapıldığından bahsedeceğiz. 
Madencilik için standart bir son kullanıcı bilgisayarı, uygulama olarak MoneroOcean'un XMRig versiyonunu ve MoneroOcean Mining havuzunu kullanıyoruz. 
Ayrıca, CPU ve NVIDIA ekran kartı gibi bileşenler de kullanarak madenciliğin nasıl yapıldığına ve kripto para birimlerinin teknik detaylarına göz atacağız.

<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/monero_ocean1.png" class="img-fluid" alt="Monero Ocean">


Aşağıdaki sorulara cevap arayacağız:
* Kripto para birimlerinin ve madencilik ortamının mevcut durumu nedir?
* Teknik detaylarda madencilik nasıl gerçekleşir?
* XMRig miner yazılımının özellikleri nelerdir?
* Mining işlemi için yapılan tercihler nelerdir?


## İçindekiler:

1. Kripto Para Birimleri ve Mining
   
2. XMRig Miner Yazılımı

3. Monero Mining Kurulum Adımları

4. Sonuçlar ve Performans Arttırımı

5. Değerlendirme ve Notlar

6. Sorular & Gelecek Çalışma


## 1. Kripto Para Birimleri ve Mining

Kriptopara madenciliği kısa tarihinde pek çok değişim geçirdiği görülüyor. Son yıllarda geçirdiği büyük değişimin devamlı bir dönüşüm hali söz konusu. Madenciliğin pratiği kullanılan cihazların yapısı ile yakından ilişkili. Endüstriyel seviyedeki pratiklerin yanı sıra kişiler ve daha küçük organizasyonlar farklılık gösteriyor. 

Bu cihazların en yaygın olarak bilinenleri internet komunitelerinde kullanımlarına rastladığımız tipleri CPU, GPU, ASIC ve FPGA.
CPU ve GPU kişisel bilgisayarlarda kullanılıyor. ASIC cihazlar ise madenciliğe özgü gömülü çipler içeriyorlar. Bu nedenle başka amaçla kullanılamıyorlar.
FPGA da tıpkı CPU ve GPU'lar gibi madencilik haricinde finansal programlama, makina öğrenmesi ve yapay zeka gibi madencilik dışı alanlarda kullanılabiliyor.

Madencilik pek çok coin ile yapılsa da önceliği Etherium ve Bitcoin ile yapılan kriptopara madenciliği oluşturuyordu. 
Bitcoin madenciliği sanal parabiriminin 2020 yılında yükselişe geçmesi ile popülerlik kazandı.
Başlarda görece mütevazi kaynaklarla CPU ve GPU ile yapılan Bitcoin madenciliği yerini ASIC makinelere ve büyük tesislere bıraktı. 
Bunun yanında ekran kartlarıyla rigler ile yapılan madencilik bu alanda alternatif oluşturdu. İnsanlar ekran kartlarıyla rigler kurmaya başladı.
Etherium madenciliği bir süre öncesine kadar ekran kartlarıyla yapılabiliyordu. Aynı zamanda çok sayıda alt coin de sisteme dahil oldu.
Ekran kartlarında fiyat artışına sebep olan bu rüzgar 2022 yılının Eylül ayında Etherium 2.0'a geçmesiyle beraber sona erdi.
Pek çok kişi diğer coinlere geçiş yaptı. Bu geçiş zorlukları arttırdı. Kripto para piyasasında da çalkantılara 
sebebiyet verdi. En bariz sonucu da ekran kartlarından oluşan riglerin zarar yapması anlamına geliyordu. 
Elektrik fiyatlarının artışıyla kartlar ve rigler zarar etmeye başladı.
Pek çok kişi fişleri çekti. Bu durumda ekran kartı madenciliği bitti. Öte yandan madencilik ASIC'e kaydı.

Kripto madenciliği için pek çok parametre olsa da ROI (return of invesment) yani bir cihazın mevcut koşullarda maliyetini ne kadar sürede çıkardığı önemli bir veri.
Aynı zamanda profitability olarak da bulunabilecek bu değer [https://hashrate.no/](https://hashrate.no/) adresinden görüntülenebilir.

En yüksek ROI değeri alındığında aşağıdaki bilgiler görülüyor. (hashrate.no sitesinden alınan bu veri başka platformlardan da tasdik edilebilir) 
Elektrik maliyeti `0.10 $/kWh` olarak alındı aslında Türkiye için mesken ve düşük kademede `0.056 $/kWh`.

```
Tarih: 22.07.2023
Elektrik Maliyeti : 0.10 $/kWh

Tipi      Cihaz Modeli         ROI Değeri  (hashrate.no'ya göre)       Fiyat (Üretici Önerisi)                 Coin                   
------    --------------       ---------------------------------       -------------------------------         --------
GPU       NVIDIA RTX 4090      3646 gün (10 yıl)                       $1599                                   SKYDOGE
CPU       AMD RYZEN 9 7900     937 gün (2.5 yıl)                       $429                                    Zephyr
ASIC      BITMAIN ANTMINER E9  4 gün                                                                           Etherium Classic
ASIC      ICERIVER KS3L        19 gün                                  $24800                                  Kaspa
FPGA      XILINX U50C          4 yıl                                   $1299                                   Kaspa
```

Bu değerlerin farklılık gösterebileceğini unutmamak gerek. Şu an için ASIC'ler avantajlı görünüyor. ASIC, CPU, FPGA, GPU şeklinde bir sıralama yapmak mümkün.
Küçük yatırımcılar bu yazının yazıldığı dönemde ICERIVER KAS KS0 gibi ASIC cihazlara yöneliyorlar. Bu da yaklaşık 1000$ ya da 30.000 TL'lik bir maliyet anlamına geliyor. Bunun yanı sıra AMD RYZEN 9 7900 gibi işlemciler de mining'e uygun gözüküyor.

Kripto para birimleri, finansal dünyada bir dönüm noktası olarak kabul edilmekte ve gittikçe daha fazla kişi tarafından keşfediliyor. 
Blockchain teknolojisinin sağladığı güvenlik ve şeffaflık ise endüstriye büyük bir potansiyel sunuyor.

Türkiye dünyada kriptopara'ya en sahip olan ülkelerden biri olarak öne çıkıyor. Gelecekte, kripto paraların finansal sisteme daha da entegre olması bekleniyor ve bu da yatırımcıların stratejilerini yeniden gözden geçirmesine neden oluyor.  Bu da hızla gelişen ve dönüşen bu alanda güncel kalmanın ve riskleri yönetmenin önemini arttırıyor.

Bilindiği üzere Bitcoin Ocak 2009'da, kimliğini gizleyen bir geliştirici veya geliştirici grubu tarafından Satoshi Nakamoto adı altında dünyaya tanıtıldı. 
Bu dijital para birimi, kriptografik bir hashlama işlevi olan SHA-256'yı kullanarak "Proof Of Work" sistemiyle çalışıyordu. 

Nisan 2011'de, merkezi olmayan bir alan adı sistemi olan Namecoin hayata geçirildi. 
Amacı, geleneksel DNS sistemine bağımlılığı ortadan kaldırmaktı. 
Namecoin, güvenli ve sansürsüz bir alan adı kaydı sağlamak için blockchain teknolojisini kullandı.

Zaman içerisinde Bitcoin'e alternatifler ortaya çıktı. Ekim 2011'de Litecoin piyasaya sürüldü ve Bitcoin'in SHA-256 algoritmasına alternatif olarak scrypt adlı hash fonksiyonunu kullandı. 
Litecoin, daha hızlı işlem onaylamaları ve daha düşük işlem ücretleri sunarak kripto para dünyasında dikkatleri üzerine çekti.

Ağustos 2012'de ise Peercoin sahneye çıktı ve hem çalışma kanıtı (proof-of-work) hem de katılım kanıtı (proof-of-stake) yöntemlerini birleştirerek bir melez sistem sundu. 
Bu melez yaklaşım, enerji verimliliğini artırarak ve ağ güvenliğini sağlayarak kripto para dünyasında önemli bir adım olarak kabul edildi.

Bu tarihlerde ortaya çıkan bu dijital para birimleri, kripto para ekosisteminin genişlemesine ve gelişmesine katkıda bulundu. 
İlerleyen yıllarda daha birçok farklı kripto para ortaya çıktı ve finansal dünyada büyük bir çığır açtı. 
Teknolojilerin her geçen gün daha fazla kişi tarafından benimsenmesi gelecekte finansal işlemlerin yapısı üzerinde derin etkileri olacağına dair umudu da arttırdı.

2015 yılında piyasaya sürülen Etherium merkezi olmayan ve dagıtık çalışan uygulamaların yazılması icin bir altyapi olarak ortaya çıktı.

Kripto para birimleri, 2011, 2013-2014-2015, 2017-2018 ve 2021-2023 gibi birkaç büyüme ve daralma dönemi geçirdi. 
Bu dönemlerde birkaç balon ve piyasa çöküşü yaşandı. 

Özellikle kimi dolandırıcılık faliyetleri ülkemizde de görüldü. Ponzi şemalarının yanı sıra kripto borsası adı altında kullanıcılara farklı bilgi gösteren kimi şirketler mevcut. 
Kullanıcılar paralarını çekmek istediğinde red cevabı alıyorlar. Şirket gerçekten o parayı bulundurmamış sizin ödediğiniz parayla başka bir işlem yapmış ve kaybetmiş oluyor.
Öte yandan insanların cihazlarının (bilgisayarlar, akıllı telefonlar, tabletler ve hatta sunucular) siber suçlular tarafından kripto para madenciliği yapmak üzere yetkisiz kullanımı ile de karşılaşmak mümkün. 
Bir siber suç türü olarak bu yönteme Cryptojacking adı veriliyor. Açık kaynak bahsedeceğimiz XMRig gibi madencilik uygulamaları bu alanda takibi zorlaştırıyor. 
Bir başka olumsuz gelişme ise kripto para yatırımlarının itibarının, özellikle 11 Kasım 2022'deki FTX iflası sonrasında bir miktar sarsılması. 
Kripto paraların ve blok zinciri teknolojisi zaman zaman olan bu çalkantılardan bağımsız olarak varlığını devam ettirecektir.

### Mining

Mining (madencilik) süreci hem kriptoparaların temelini oluşturmasının yanı sıra algoritmik bir arka plana da sahip. 
Mining, yeni blokların oluşturulması ve işlemlerin doğrulanması için bilgisayarların karmaşık matematiksel problemleri çözmesini gerektiren bir süreç. 
Bu işlem, kripto para birimlerinin arzının kontrol edilmesini ve ağın güvenliğinin sağlanmasını amaçlıyor.

Mining'in ilginç yanlarından biri, bu işlemin algoritmik karmaşıklığını kullanması aslında. 
Daha önce de bahsettiğimiz gibi Kripto para birimlerinin çoğunda kullanılan Proof-of-Work (PoW) algoritması, madencilere belirli bir karmaşık hesaplama problemini çözmelerini gerektiriyor. 
Bu problemin çözülmesi, zaman ve enerji gerektiren bir süreç. Algoritmanın zorluk seviyesi, madencilerin rekabet etmesini sağlayacak şekilde düzenli olarak ayarlanıyor.

Bunun yanı sıra, kripto para birimlerinin toplumsal ve teknolojik sonuçları da dikkate değer. Özellikle çevre açısından da sakıncalı bulunuyor. 
Çünkü elektrik tüketimine sebep olan bu işlem fiziksel olarak hiçbir üretimi yok. Kripto para birimlerinin ortaya çıkmasıyla birlikte, finansal sistemin dışında kalan kesimlere finansal erişim ve ödeme yöntemleri sunulmuş oluyor. Bu da finansal katılımı artırma potansiyeline sahip bir gelişme olarak değerlendiriliyor.

Ayrıca, kripto para birimlerinin kullanımıyla ilgili bir ilginç durum, insanların gerçek cüzdanları ile platform arasındaki farkı bilmemesi. 
Kripto para birimleri, merkezi olmayan yapıları ve kullanıcıların doğrudan kontrolü sayesinde, bireylerin kendi paralarını yönetme ve transfer etme imkanını sağlıyor fakat kullanıcı para birimini borsada tuttuğundan bunu sanal cüzdanlarla karıştırabiliyor ve gerçek mülkiyet ve kontrol konusunda eksiklik yaşayabiliyor.

Kripto para birimleri teknik olarak bilgisayar dünyasının pek çok alanıyla ilişkili. Kriptografi, ağ, programlama, donanım ve siber güvenlik gibi alanlarda önemli bir rol oynuyor. 
Kripto para birimlerinin işleyişini ve güvenliğini sağlamak için kullanılan teknolojilerin yanında Blockchain'in farklı kullanımları da dikkat çekici. Örneğin, bu teknoloji, kayıt tutma, izlenebilirlik ve veri güvenliği gibi alanlarda çeşitli uygulamaları buluyor.

Alanda sürekli olarak ortaya çıkan gelişmeler ve yenilikler sosyal, ekonomik ve çevresel değişimlere sebep oluyor ve kripto para birimlerinin gelecekte daha da önemli bir role sahip olabileceğine gösteriyor.

## 2. XMRig Miner Yazılımı

Mining işleminin bileşenlerini aşağıdaki gibi sıralayabiliriz.
* Kullanılan mining cihazlarının seçimi
* Kazılacak coin seçimi
* Kullanılan miner yazılımı seçimi
* Miner yazılımında konfigurasyon seçimi
* Pool seçimi

Mining için çeşitli yazılımlar bulunmakta XMR en yaygın ve güvenli kabul edilen mining yazılımlarından biri.
Github sayfasına baktığımızda aşağıdaki gibi tanımlandığını görüyoruz:

* Yüksek performanslı, açık kaynaklı, cross platform bir yazılım. 
* Windows, Ubuntu, Linux, macOS ve FreeBSD işletim sistemlerinde çalışabiliyor.
* "RandomX, KawPow, CryptoNight ve GhostRider kullanan bütünleşik bir CPU/GPU madencilik yazılımı" olarak tanımlanmış.
* Son olarak RandomX benchmark'ı olarak tanımlanmış.

Detaylı olarak incelenecek olursa,
İlk gözümüze çarpan buradaki bahsedilen RandomX, KawPow, CryptoNight ve GhostRider proof-of-work (PoW) algoritmaları.
Mining dünyasında genelde algoritma ya da mining algoritması diye kısaltılan bu kavram aslında proof-of-work algoritmasına karşılık geliyor.
Kriptografik bir kanıtlama metodu olan PoW bir tarafın diğer taraflara spesifik bir hesaplama eforunun sarf ettiğini kanıtlaması olarak tanımlanıyor.
"kanıtlayıcı" taraf eforu sarf ettiğini belgelerken onaylayıcı ufak bir efor ile onayı gerçekleştiriyor.
Kanıtlayıcı'nın gösterdiği efor da aslında şifrelenmiş bir hexadecimal sayıyı bulmak üzerine.
Günümüzde PoW yerini "Proof Of Stake" e bırakıyor.
Algoritmaların detayına daha sonra değinebiliriz.
Özellikle whitepaper'larına bakmak oldukça açıklayıcı olabilir.
Burada pratikte kullanımlarına rastlamış olduk.

Tekrar XMRig'e dönecek olursak kullandığı algoritma RandomX  Monero için dizayn edilmiş PoW algoritması. 
İşlemler, RandomX (2019) çalıştıran bir madenci ağı aracılığıyla doğrulanıyor. XMRig gibi RandomX'in kendisi de yine açık kaynak
Yine ikisinin de büyük oranda C ve C++ ile yazıldığını kaynak kodundan görebiliyoruz.

Kawpow yine bir başka mining algoritması Ravencoin (RVN, 2018) ile popülerlik kazanmış. 
Mining için gerekli minimum altyapı gerekliliğini azaltması ile öne çıkıyor.
CryptoNight (2012) yine özellikle verimli CPU kullanımı ve ASIC-resistancy amaçlanan bir başka madencilik algoritması. 
ASIC-resistancy özelliği önemli çünkü mining donanımından ziyade son tüketici donanımı ile mining yapabilmenize olanak sağlıyor.

Donanımsal olarak utumlu olduğu CPU ve GPU'lardan bahsedilmiş.
* CPU (x86/x64/ARMv7/ARMv8)
* AMD GPU'lar için OpenCL
* NVIDIA GPU'lar için CUDA. (Dışardan CUDA eklentisi kuruyoruz.)

XMRig'e dışarıdan aldığı bir JSON dosyası ile konfigürasyon yapıyoruz. 
Online sihirbaz kullanarak hızlıca bir başlangıç konfigurasyonunu json dosyası olarak üretebiliriz.
Aynı zamanda bir komut satırı arayüzü mevcut fakat tüm özellikleri (örn mining profilleri gibi) taşımadığı belirtilmiş.
Çalışma zamanında önemli bir ayarı değiştirmek istersek config dosyası değiştiğinde otomatik değişiyor.
Ya da API call yapılarak yine değişiklik yapabiliyoruz.
Aynı zamanda kullanabileceğimiz bir HTTP API mevcut.

* Pool: Havuz seçeneği bağlanmak istediğiniz madencilik havuzu anlamına geliyor. Madencilik havuzu, blok bulma ve ödül kazanma şansını artırmak için işlemci güçlerini birleştiren bir madenci grubudur. XMRig'i yapılandırırken bağlantı kurmak için havuzun adresini (URL) ve port numarasını belirtmek gerekiyor. Madencilik ödüllerinin gönderileceği yer burası oluyor.

Pool mining ve tek başına madencilik (single mining), kripto para birimlerini madencilik yaparken farklı yaklaşımları ifade ediyor.
Seçim yaparken, madencilerin işlem gücü, donanım maliyetleri, gelir istikrarı ve tercihler gibi faktörleri dikkate alınıyor. Pool mining, daha küçük ölçekli madenciler için genellikle daha tercih edilen bir yöntem  çünkü işlem gücünü birleştirerek daha istikrarlı bir kazanç sağlama potansiyeli sunuyor. Tek başına madencilik ise daha büyük ve özel donanıma sahip madenciler tarafından tercih ediliyor, çünkü tam bir kontrol ve tam ödül alma ihtimaline sahip. Pool mining'de bir grup madenci işlem güçlerini birleştirerek aynı madencilik havuzuna katılıyorlar ve blokları birlikte çözüyorlar. Bu yöntemde, madenciler havuza katılarak işlem güçlerini paylaşıyorlar ve blok bulduklarında ödül havuzun üyeleri arasında paylaştırılıyor.

* Proxy: Proxy, gizliliği artırmak ve ağ gecikmesini azaltmak için kullanılabilen isteğe bağlı bir aracı sunucudur. Bir proxy sunucusu kullanarak IP adresinizi gizleyebilir ve madencilik havuzunun makinenizle doğrudan iletişim kurmasını engelleyebilirsiniz. Bu, ekstra bir anonimlik katmanı ekler ve belirli madencilik kurulumları için yararlı olabilir.
  
* Daemon: Arka plan programı seçeneği, arka planda çalışan ve Monero ağı ile iletişim kuran yazılım olan Monero arka plan programına denir.
Arka plan programı, blok zinciri ile senkronizasyon, işlemleri doğrulama ve diğer ağ düğümlerine bilgi aktarma gibi görevleri yerine getirir.
Monerod.exe, bu arka plan proramının çalıştırılabilir dosyasıdır. Monero kripto para birimi ağının tam bir nonde'unun çalıştırılmasından sorumludur.
Monero arka plan programı (monerod) öncelikle cüzdanla ilgili işlevler, blok zinciri senkronizasyonunu yönetme ve Monero ağıyla etkileşim için kullanılır. 
XMRig veya benzeri bir madencilik yazılımı kullanırken doğrudan madencilik sürecine dahil olmaz.

XMRig, yerel veya uzak bir arka plan programına bağlantı gerektirmeden madencilik işlemlerini bağımsız olarak gerçekleştiren bağımsız bir madencilik yazılımıdır.

Düşük kaliteli donanıma sahip XMRig kullanarak Monero (XMR) madenciliği söz konusu olduğunda, yeni başlayanlar için optimize edilmiş ve daha düşük hash oranlarını destekleyen bir madencilik havuzu seçmek önemlidir.
Madenciliğin artan zorluğu nedeniyle önemli karlar sağlamayabileceğini unutmayın.
Madenciliğe dalmadan önce beklentilerinizi yönetmeniz ve elektrik maliyetlerini ve donanım sınırlamalarını göz önünde bulundurmanız önemlidir.
Her zaman uygun madencilik uygulamalarını takip ettiğinizden ve optimum performans için XMRig'i doğru şekilde yapılandırdığınızdan emin olun.

* MineXMR: MineXMR, Monero için en popüler madencilik havuzlarından biri. Yeni başlayanlar için uygun hale getiren basit ve kullanıcı dostu bir arayüz sunar. MineXMR daha düşük hash oranlarını destekler ve düşük bir ödeme eşiğine sahiptir.
* SupportXMR: SupportXMR, Monero için iyi bilinen başka bir madencilik havuzu. Yeni başlayanlar için uygun bir arayüze sahip ve ayrıntılı istatistikler ve gerçek zamanlı izleme sağlar. SupportXMR ayrıca daha düşük ödeme eşikleri sunar ve düşük hash oranlarını destekler
* XMRPool.net: XMRPool.net, düşük kaliteli donanıma sahip yeni başlayanlar için uygun, güvenilir bir madencilik havuzudur. Basit bir kurulum sürecine sahiptir ve düşük ödeme eşikleri sunar. XMRPool.net ayrıca ayrıntılı istatistikler ve izleme özellikleri sağlar.
* MoneroOcean: MoneroOcean, karlılığı en üst düzeye çıkarmak için farklı madencilik algoritmaları arasında otomatik olarak geçiş yapan benzersiz bir madencilik havuzudur. Daha düşük hash oranlarını destekler ve yeni başlayanlar için kullanımı kolay bir arayüz sağlar. MoneroOcean ayrıca düşük ödeme eşikleri sunar.

Spesifik donanım ve koşullarınıza dayalı olarak daha doğru bir tahmin elde etmek için bu faktörleri dikkate alan çevrimiçi madencilik karlılık hesaplayıcılarını araştırmak ve kullanmak önemlidir. Bu hesaplayıcılar, gerçek zamanlı veriler sağlayabilir ve standart bilgisayarınızla madenciliğin potansiyel karlılığına ilişkin bilinçli kararlar vermenize yardımcı olabilir.

XMR gerçekten ne kadar mining yapabileceğimizi deneyerek göreceğiz fakat bir örnek yazıda verilmiş: *thecoinrepublic 

* 2021 yılının ikinci ayında madencide blockchainde yükselttikleri her blok için 1.26 XMR alıyorlar.
* Her 2 dakikada bir yeni bir blok kazılıyor.
* CPU/GPU kuvvetine bağlı olarak kazanımları gün başı her mining sistemi için $0.45'den $1 dolar arası olarak değişiyor. Bendeki değer CPU ile ek konfigürasyon yapmadan günlük $0.04 oldu.

## 3. Monero Mining Kurulum Adımları

### 3.1 Monero Cüzdanı ve Cüzdan Adresi Edinme

* Monero cüzdanını indirerek bir Monero adresi ediniyoruz. 
* `https://www.getmonero.org/downloads/` adresinden WebGUI'yi indirip adımları takip ederek cüzdanı oluşturalım.
* Bu program tamamen güvenli bize cüzdan oluşturmamız için gerekli arayüzü sağlayacak. Cüzdanı aslında bu arayüzden bağımsız olarak da kullanabiliriz. 
* Antivirüs'e çok etkin biçimde takılıyor.
* Adımları takip ettikten sonra.
* `41iu7fTbgQHNJcafjyKqy8NvH2YMqM5kMMhkDF5yZWpOaAHF7kfohF979UwZhHF7kfohF979UwZh3337SkZm6wHk3nyLQ` gibi bir adres olan primary adresimizi alalım. 
* Bu aslında bizim cüzdanımızın adresi çok gizli olmasa da yine de paylaşmamakta fayda var. IBAN'ımız gibi aslında. Örneğin bu adresi moneroocean'a girerek hesabımız görüntüleyeceğiz
* Esas gizli tutmamız gereken hatta mümkünse bir kağıda yazmamız ve dijital ortamda tutmaktan kaçınmamız gereken Mnemonic Seed ve Secret Keylerdir.
* Monero cüzdanı monerod.exe'ye bağlanıyor. Monero deamon olan bu program bizi zincire dahil edecek. Bu yalnızca cüzdan işlemleri için kullanıyor. Miner'ımız tarafından kullanılmayacak.

### 3.2 Cüzdan bilgisini girilmesi yükleme scriptinin üretilmesi

* Daha sonra pooling sitemiz olan moneroocean'a cüzdan bilgimizi girelim.
* Aşağıdaki gibi bir script üretecek.
* Bu scripti cüzdan adresimizle otomatik olarak miner'ı kurmakta kullanacağız.

```
powershell -Command "$wc = New-Object System.Net.WebClient; $tempfile = [System.IO.Path]::GetTempFileName(); $tempfile += '.bat'; $wc.DownloadFile('https://raw.githubusercontent.com/MoneroOcean/xmrig_setup/master/setup_moneroocean_miner.bat', $tempfile); & $tempfile 41iu7fTbgQHNJcafjyKqy8NvH2YMqM5kMMhkDF5yZWp4XaHF7kfohF979UwZhb8FeserrxRD2jMRxE3337SkZm6wHk3nyLQ; Remove-Item -Force $tempfile"
```

### 3.3 Miner'ın Yüklenmesi

* Scripti bilgisayarımızda admin yetkisi olan `cmd` oturumunda çalıştıralım.
* Otomatik olarak kuracak.
* `nssm.exe` kullanarak servis olarak kurduğunu görüyoruz.
* `config_background.json` ve `config.json` dosyasını kullanıyor. Bunlardan `config.json` kullanılan ve öncelikli olanı.

### 3.4 Loglardan Kontrol Gerçekleştirilmesi

`xmrig.log`'u kontrol et.

Bu logları kontol ederek ilk bilgilere erişmenin yanı sıra mining işlemi ile ilgili performansı görüntüleyebiliyoruz.

Böylece kurulum işlemini tamamlamış olduk.

## 4. Sonuçlar ve Performans Arttırımı

Sonuçlar aşağıdaki gibi.  18 saatte toplam 0,000087 XMR yani Monero çıkardığı görülüyor.
Bu değer oldukça düşük yaklaşık 0.5 liraya denk geliyor. Elektrik masrafını hesaplamak için bilgisayarın güç tüketimine bakılması gerekiyor. Böylece kar edip etmediği görülebilir.

```
Zaman aralığı  : [2023-07-14 00:24:42.315] - [2023-07-14 18:49:08.357]
Toplam çalışma : 18 saat 25 dakika
Toplam XMR     : 0,000087 XMR
Worker Sayısı  : 1 Worker
Pay Hashrate   : 1.22 KH/s (ornek bir zamanda)
Hash Sayısı    : 2.210
Günlük XMR     : 0.0002 XMR ($0.04) (1.08 lira)
```

Kullanılan CPU ve GPU detayları aşağıdaki gibi.

```
CPU : Intel(R) Core(TM) i7-8550U CPU @ 1.80GHz (1) 64-bit AES
      L2:1.0 MB L3:8.0 MB 4C/8T NUMA:1

GPU : NVIDIA GeForce MX150
```

Kullandığım `NVIDIA GeForce MX150`, kripto para birimi madenciliği için tipik olarak güçlü bir GPU olarak kabul edilmiyor. Zaten GPU'lar ile madenciliğin etkili olmadığı görülüyor.
Bu zaten dizüstü bilgisayarlar için tasarlanmış mobil bir GPU ve yüksek performanslı madencilik işlemleri için optimize edilmemiş. Yine de internet üzerinden hashratelerini görmek faydalı olabilir.


Aşağıdaki hesapları direkt olarak yapmak da mümkün:

```
Earnings per hour (XMR) ≈ (Hashrate / Network Hashrate) * Block Reward * (1 hour / Block Time)
Earnings per month (XMR) ≈ Hourly Earnings (XMR) * 24 hours * 30 days
```

Kripto para birimi madenciliği için yaygın olarak kullanılan donanım NVIDIA'nın GeForce GTX ve RTX serileriydi. Artık GPU'ların çoğu mining işlemine uygun olmaktan çıkmış durumda.
Örn bir GPU olarak Türkiye için GTX 1660 Ti elektrik 0.084 USD/kwh elektrik ile zarar ediyor. Aynı zamanda daha gelişmiş NVIDIA GeForce RTX 3080, 3090 gibi modeller de zarar etmekte.

Elektrik için Türkiyede mesken ve işyeri için farklılık gösteriyor.

```
Tarih               : 2023 Temmuz
Tüketici Sınıfı     : Mesken (Ev) Tüketicileri

Düşük kademe TL     : 1.5017 TL/kWh
Yüksek Kademe TL    : 2.2525 TL/kWh

Düşük kademe Dolar  : 0.056 USD/kWh
Yüksek kademe Dolar : 0.084 USD/kWh
```

Kademeli tarifede ortalama günlük `7 kWh`'a kadarki kullanımların düşük fiyatlı tarifeden, `7 kWh`'ı aşan kullanımların ise yüksek fiyatlı tarifeden faturalandırılıyor. 
Yine dinamik olarak kademeler gün içinde kullanıma göre değişebiliyor. Detaylarına baılabilir.

Minerstat'a göre günlük 1.86 lira ediyor. Bu da 50 yıl yapıyor ki bildiğimiz üzere ekran kartları için uygulanabilir olmadığını gösteriyor. 
Öte yandan elektrik tüketimine bağlı olarak CPU mining belirli ölçüde karlı olabilir.

## 4. Değerlendirme ve Notlar

Sonuç olarak mining ile hala para kazanılabiliyor. Küçük çapta madencilik yapanları için mining'ih bittiğini söyleyemeyiz ama işlem standart kullanıcı için görece zorlaşmış durumda endüstriyel seviyede de yapılmaya devam ediyor. Yalnızca ASIC cihazlar ile belirli altcoinler kazılarak işlem yapılabiliyor. Bu yazının yazıldığı dönemde GPU mining karsız ve zarar ediyor. İleride kullanılabilme ihtimali olsa da teknoloji ilerledikçe cihazlar eskiyor. Elinde ekran kartları ile bekleyen kişiler için pek iyi olmayan bu durumun GPU mining pratiğinin şimdilik bittiğini gösteriyor. 

Mining işleminin kolay olduğu görülüyor. Bir çok standart bilgisayarda ve hatta browserda kullanılabiliyor olması işlem gücünün ne kadar dağıtılabildiğini gösteriyor. Etherium dağıtık uygulamalar için bir platform olarak ayakta ve Bitcoin değerli bir para birimi olarak varlığını sürdürüyor.

## 5. Sorular & Gelecek Çalışma

Bu yazıda aşağıdaki sorulara cevap aradık. Bir kısmını cevapladım diğer kısmını da ileriki çalışma olarak not ediyorum.

* Solar enerji kullanımının etkisi olur mu?
* Elektrik maliyeti Türkiye için ne sıklıkla değişiyor? Dolar karşısında durumu nedir?
* Cihazlar ne kadar sürede kendi ödemelerini çıkarabilir? (Kısmen cevaplandı.)
* Mining için kullanılan altyapı nedir ve ne kadar karlı? (Kısmen cevaplandı.)
* GPU ve CPU Kullanımı arasındaki farklar nelerdir?
* Algo switching opsiyonu çalışıyor mu?
* XMRig harici kullanılan diğer mining yazılımları nelerdir?
* XMRig'in kodlama altyapısı ve kodu ile ilgili diğer bilgiler nelerdir?
* Etherium ile yazılım nasıl geliştiriliyor?
* Madencilikte merkezi bir yönetim yoksa Vitalik gibi merkezi figürler nasıl oluşuyor?

## Referanslar
* Cryptopia: Bitcoin, Blockchains and the Future of the Internet” (2018)
* Etherium Dökümanları
* Non Fungible Token'ler
* Wikipedia - PoW
* Wikipedia - Monero
* What is the CryptoNight mining algorithm? - Bit2Me Academy - https://academy.bit2me.com/en/que-es-el-algoritmo-de-mineria-cryptonight/#:~:text=CryptoNight%20Mining%20Algorithm%20is%20a,advanced%20privacy%20and%20anonymity%20options.
* Bitcoin Whitepaper
* Etherium Whitepaper
* https://www.allcryptowhitepapers.com/cryptonite-whitepaper/
* https://monerodocs.org/proof-of-work/cryptonight/
* https://komodoplatform.com/en/academy/cryptonight/
* https://www.thecoinrepublic.com/2022/06/28/monero-yet-a-profitable-mine-from-home-cryptocurrency/#:~:text=XMR%20mining%20is%20profitable&text=Depending%20on%20your%20CPU%2FGPU,of%20twenty%20one%20million%20coins.
* https://www.quora.com/How-long-will-it-take-for-a-cryptocurrency-mining-rig-to-pay-for-itself
* https://thehackernews.com/
* https://www.trendyol.com/pd/legend/4u-duvar-tipi-soho-rack-kabinet-w-530mm-d-400mm-siyah-p-674007893?boutiqueId=61&merchantId=129377
* https://www.theguardian.com/technology/2023/apr/26/bitcoin-mining-climate-crisis-environmental-impact#:~:text=A%202022%20report%2C%20titled%20Revisiting,56.6%20megatonnes%20in%202019).%E2%80%9D
* ChatGPT
* https://mineasic.com/cryptocurrency-mining-in-june-2023-is-it-still-profitable/
