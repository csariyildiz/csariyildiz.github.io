---
layout: post3
title: "XMRig ve Madenclik Üzerine Bir İnceleme"
category: gonderiler
tags:
  - XMRig
  - Monero
  - Mining
---

Kripto para yatırımlarının itibarının, özellikle 11 Kasım 2022'deki FTX iflası sonrasında bir miktar sarsıldı. 
Ancak, unutmamak gerekir ki kripto paraların ve blok zinciri teknolojisinin varlığı bu tür olaylardan etkilenmez.

Kripto paraların popülerlik kazanmaya başladığı 2010'lu yılların ortalarından itibaren hayatımızda çok şey değişti.
İnsanlar bu yeni gelişmelere farklı tepkiler verdi vermeye de devam ediyorlar. Kimi için kelime olumlu şeyler çağrıştırıyor.
Hatta heyecanla bu yeni düzene adapte oluyorlar. Kimi ise daha temkinli bir yaklaşım sergiliyor.
Genellikle kripto para dünyasında yer alan tanıdıklarımız, hisse senedi piyasasında olduğu gibi yatırım yapma, alım-satım gerçekleştirme gibi faaliyetlerde bulunuyorlar.

<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/powershell_menu.png" class="img-fluid" alt="Sample Email Enron">

Teknolojinin hızlı ilerlediği bu çağda, kripto para birimleriyle ilgili gelişmeleri takip etmenin ve anlamanın önemi aşikar.
Ancak kripto para birimlerinin teknik altyapısı ve uygulama pratiği, özellikle bilgisayarlarla içli dışlı olanlar için de oldukça ilginç detaylar sunuyor. 
Kriptografi, network, programlama, donanım ve siber güvenlik gibi birçok alanda kendine yer bulan bu teknoloji, gerçekten de dikkate değer.

Bu yazıda, XMRig adlı yazılım aracılığıyla nasıl madencilik yapılacağını göreceğiz. 
Madencilik için standart bir son kullanıcı bilgisayarı,  MoneroOcean'un XMRig versiyonu ve MoneroOcean Mining havuzu kullanacağız. 
Ayrıca, CPU ve NVIDIA ekran kartı gibi bileşenler de kullanarak madenciliğin nasıl yapıldığını keşfederken, kripto para birimlerinin teknik detaylarına da göz atacağız.

## İçindekiler:

1. Kripto Para Birimleri ve Mining: Bu bölümde genel olarak miming'in zaman içerisinde nasıl geliştiğini özetleyeceğiz.

2. XMRig Miner Yazılımı: Bu bölümde, XMRig miner yazılımının ne olduğunu ve nasıl kullanıldığını anlatacağız. XMRig, Monero gibi kripto para birimlerini madencilik için optimize edilmiş bir yazılımdır.

3. Monero Mining Başlangıç Adımları: Bu bölümde, Monero mining işlemine başlamak için gereken adımları adım adım göstereceğiz. Bu adımlar arasında XMRig'in kurulumu, MoneroOcean Mining pooluna katılma ve mining işlemini başlatma yer alacak.

4. Değerlendirme ve Notlar: Bu bölümde, yapılan mining işlemiyle ilgili değerlendirme ve notlar paylaşılacak. Örneğin, mining performansı, enerji tüketimi, getiri beklentileri gibi konular ele alacağız.

## 1. Kripto Para Birimleri ve Mining

Kripto para birimleri, finansal dünyada bir dönüm noktası olarak kabul edilmekte ve gittikçe daha fazla kişi tarafından keşfediliyor. 
Blockchain teknolojisinin sağladığı güvenlik ve şeffaflık ise endüstriye büyük bir potansiyel sunuyor.

Gelecekte, kripto paraların finansal sistemimize daha da entegre olması bekleniyor ve bu da yatırımcıların stratejilerini yeniden gözden geçirmesine neden olacaktır. 
Dolayısıyla, bu hızla gelişen ve dönüşen alanda güncel kalmanın ve riskleri yönetmenin önemi artmaktadır.

Ocak 2009'da, gizemli bir geliştirici olan Satoshi Nakamoto tarafından Bitcoin dünyaya tanıtıldı. 
Bu dijital para birimi, kriptografik bir hashlama işlevi olan SHA-256'yı kullanarak "Proof Of Work" sistemiyle çalışıyordu. 

Nisan 2011'de, merkezi olmayan bir alan adı sistemi olan Namecoin hayata geçirildi. 
Amacı, geleneksel DNS sistemine bağımlılığı ortadan kaldırmaktı. 
Namecoin, güvenli ve sansürsüz bir alan adı kaydı sağlamak için blockchain teknolojisini kullandı.

Ancak Bitcoin'e alternatifler de ortaya çıktı. Ekim 2011'de Litecoin piyasaya sürüldü ve Bitcoin'in SHA-256 algoritmasına alternatif olarak scrypt adlı hash fonksiyonunu kullandı. 
Litecoin, daha hızlı işlem onaylamaları ve daha düşük işlem ücretleri sunarak kripto para dünyasında dikkatleri üzerine çekti.

Ağustos 2012'de ise Peercoin sahneye çıktı ve hem çalışma kanıtı (proof-of-work) hem de katılım kanıtı (proof-of-stake) yöntemlerini birleştiren bir melez sistem sunuyordu. 
Bu melez yaklaşım, enerji verimliliğini artırarak ve ağ güvenliğini sağlayarak kripto para dünyasında önemli bir adım olarak kabul edildi.

Bu tarihlerde ortaya çıkan bu dijital para birimleri, kripto para ekosisteminin genişlemesine ve gelişmesine katkıda bulundu. İlerleyen yıllarda daha birçok farklı kripto para ortaya çıktı ve finansal dünyada büyük bir çığır açtı. 
Bu teknolojiler, her geçen gün daha fazla kişi tarafından benimseniyor ve gelecekte finansal işlemlerin yapısı üzerinde derin etkileri olacağına dair umutları artırıyor."

Kripto para birimleri, 2011, 2013-2014-2015, 2017-2018 ve 2021-2023 gibi birkaç büyüme ve daralma dönemi geçirdi. 
Bu dönemlerde birkaç balon ve piyasa çöküşü yaşandı.

Kripto para birimleriyle ilgili olarak, mining (madencilik) süreci hem ilginç bir konu hem de algoritmik bir arka plana sahiptir. 
Mining, yeni blokların oluşturulması ve işlemlerin doğrulanması için bilgisayarların karmaşık matematiksel problemleri çözmesini gerektiren bir süreçtir. 
Bu işlem, kripto para birimlerinin arzının kontrol edilmesini ve ağın güvenliğinin sağlanmasını amaçlar.

Mining'in ilginç yanlarından biri, bu işlemin algoritmik karmaşıklığıdır. Kripto para birimlerinin çoğunda kullanılan Proof-of-Work (PoW) algoritması, madencilere belirli bir karmaşık hesaplama problemini çözmelerini gerektirir. 
Bu problemin çözülmesi, zaman ve enerji gerektiren bir süreçtir. Algoritmanın zorluk seviyesi, madencilerin rekabet etmesini sağlayacak şekilde düzenli olarak ayarlanır.

Bunun yanı sıra, kripto para birimlerinin toplumsal ve teknolojik sonuçları da dikkate değerdir. 
Kripto para birimlerinin ortaya çıkmasıyla birlikte, finansal sistemin dışında kalan kesimlere finansal erişim ve ödeme yöntemleri sunulmuştur. 
Bu, finansal katılımı artırma potansiyeline sahip bir gelişmedir.

Ayrıca, kripto para birimlerinin kullanımıyla ilgili bir ilginç durum, insanların gerçek cüzdanları ile platform arasındaki farkı bilmemesidir. 
Kripto para birimleri, merkezi olmayan yapıları ve kullanıcıların doğrudan kontrolü sayesinde, bireylerin kendi paralarını yönetme ve transfer etme imkanını sağlar. 
Ancak bazı kullanıcılar, kripto para birimlerini borsalarda tuttukları sanal cüzdanlarla karıştırabilir ve gerçek mülkiyet ve kontrol konusunda farkındalık eksikliği yaşayabilir.

Kripto para birimlerinin teknik olarak ilginç yanları, bilgisayar dünyasının pek çok alanıyla ilişkilidir. Kriptografi, ağ, programlama, donanım ve siber güvenlik gibi alanlarda önemli bir rol oynar. 
Bu teknolojiler, kripto para birimlerinin işleyişini ve güvenliğini sağlamak için kullanılır.

Ekonomik açıdan, kripto madenciliğinin etkisi de ilgi çekicidir. Özellikle çevre sorunları bağlamında tartışmaları tetikleyen yüksek enerji tüketimi ve çevresel etkileri vardır. 
Aynı zamanda, blockchain teknolojisinin farklı kullanımları da dikkat çekicidir. Örneğin, bu teknoloji, kayıt tutma, izlenebilirlik ve veri güvenliği gibi alanlarda uygulamalar bulur.

Genel olarak, kripto para birimleri ve mining süreci, hem teknik olarak ilginç bir alana hem de sosyal, ekonomik ve çevresel etkileri olan bir konuya odaklanmaktadır. 
Bu alanda sürekli olarak gelişmeler ve yenilikler yaşanmaktadır, bu da kripto para birimlerinin gelecekte daha da önemli bir role sahip olabileceğine işaret etmektedir.

## 2. XMRig Miner Yazılımı

XMR en yaygın ve güvenli kabul edilen mining yazılımlarından biri.
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
ASIC-resistancy özelliği önemli çünkü mining donanımından ziyade son tüketici donanımı ile mining yapabilmenize olanak sağllıyor.

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


* Pool: The Pool option refers to the mining pool you want to connect to. A mining pool is a collective group of miners who combine their computing power to increase the chances of finding blocks and earning rewards. When configuring XMRig, you need to specify the pool's address (URL) and port number to establish a connection. This is where your mining rewards will be sent.

Pool mining ve tek başına madencilik (single mining), kripto para birimlerini madencilik yaparken farklı yaklaşımları ifade eden terimlerdir.
Pool mining ve tek başına madencilik arasında seçim yaparken, madencilerin işlem gücü, donanım maliyetleri, gelir istikrarı ve tercihler gibi faktörleri dikkate almaları önemlidir. Pool mining, daha küçük ölçekli madenciler için genellikle daha tercih edilen bir yöntemdir, çünkü işlem gücünü birleştirerek daha istikrarlı bir kazanç sağlama potansiyeli sunar. Tek başına madencilik ise daha büyük ve özel donanıma sahip madenciler için tercih edilebilir, çünkü kontrol ve tam ödül alma avantajı sunar.

Pool mining (havuz madenciliği), bir grup madencinin güçlerini birleştirerek aynı madencilik havuzuna katılmalarını ve blokları birlikte çözmelerini sağlayan bir yöntemdir. Bu yöntemde, madenciler havuza katılarak işlem güçlerini paylaşırlar ve blokları bulduklarında ödülü havuzun üyeleri arasında paylaştırılır. Havuz, birçok madencinin işlem gücünü birleştirerek daha düzenli ve istikrarlı bir gelir elde etmelerini sağlar. Ayrıca, blokları tek başına çözmek yerine havuzda çalışarak, blokları daha hızlı bir şekilde bulma şansını artırır.

Tek başına madencilik (single mining) ise bir madencinin kendi başına ve bağımsız olarak madencilik yapmasıdır. Bu yöntemde, madenci kendi donanımını kullanarak blokları çözmeye çalışır ve eğer bir blok bulursa, ödülü tamamen kendisi alır. Tek başına madencilik, madencilerin tam kontrol sahibi olmasını sağlar ve kazançlarını bölüşmek zorunda olmadıkları için daha büyük bir ödül elde etme potansiyeline sahiptir. Ancak, tek başına madencilikte blokları bulma süresi daha uzun olabilir ve gelirler daha dalgalı olabilir.

* Proxy: A Proxy is an optional intermediary server that can be used to enhance privacy and reduce network latency. By using a proxy server, you can obfuscate your IP address and prevent the mining pool from directly communicating with your machine. This adds an extra layer of anonymity and can be useful for certain mining setups.
* Daemon: The Daemon option refers to the Monero daemon, which is the software that runs in the background and communicates with the Monero network. 
The daemon handles tasks such as synchronizing with the blockchain, verifying transactions, and relaying information to other network nodes. 
In the XMRig configuration, you need to specify the daemon's address and port to connect to the Monero network.

Monerod.exe is the executable file for the Monero daemon, which is responsible for running a full node of the Monero cryptocurrency network. 
The Monero daemon (monerod) is primarily used for wallet-related functions, managing blockchain synchronization, and interacting with the Monero network. It is not directly involved in the mining process when using XMRig or similar mining software.
XMRig is a standalone mining software that handles the mining operations independently without requiring a connection to a local or remote daemon.

Düşük kaliteli donanıma sahip XMRig kullanarak Monero (XMR) madenciliği söz konusu olduğunda, yeni başlayanlar için optimize edilmiş ve daha düşük hash oranlarını destekleyen bir madencilik havuzu seçmek önemlidir.
Madenciliğin artan zorluğu nedeniyle önemli karlar sağlamayabileceğini unutmayın.
Madenciliğe dalmadan önce beklentilerinizi yönetmeniz ve elektrik maliyetlerini ve donanım sınırlamalarını göz önünde bulundurmanız önemlidir.
Her zaman uygun madencilik uygulamalarını takip ettiğinizden ve optimum performans için XMRig'i doğru şekilde yapılandırdığınızdan emin olun.

* MineXMR: MineXMR, Monero için en popüler madencilik havuzlarından biridir. Yeni başlayanlar için uygun hale getiren basit ve kullanıcı dostu bir arayüz sunar. MineXMR daha düşük hash oranlarını destekler ve düşük bir ödeme eşiğine sahiptir.
* SupportXMR: SupportXMR, Monero için iyi bilinen başka bir madencilik havuzudur. Yeni başlayanlar için uygun bir arayüze sahiptir ve ayrıntılı istatistikler ve gerçek zamanlı izleme sağlar. SupportXMR ayrıca daha düşük ödeme eşikleri sunar ve düşük hash oranlarını destekler
* XMRPool.net: XMRPool.net, düşük kaliteli donanıma sahip yeni başlayanlar için uygun, güvenilir bir madencilik havuzudur. Basit bir kurulum sürecine sahiptir ve düşük ödeme eşikleri sunar. XMRPool.net ayrıca ayrıntılı istatistikler ve izleme özellikleri sağlar.
* MoneroOcean: MoneroOcean, karlılığı en üst düzeye çıkarmak için farklı madencilik algoritmaları arasında otomatik olarak geçiş yapan benzersiz bir madencilik havuzudur. Daha düşük hash oranlarını destekler ve yeni başlayanlar için kullanımı kolay bir arayüz sağlar. MoneroOcean ayrıca düşük ödeme eşikleri sunar.

Standart bir tüketici sınıfı CPU ile CPU Madenciliği, Monero madenciliği yaparken saniyede 100-500 hash (H/s) aralığında bir hash oranı elde etmeyi bekleyebilirsiniz.
Mevcut ağ zorluğuna ve Monero'nun blok ödülüne bağlı olarak, bu potansiyel olarak günde yaklaşık 0,01-0,05 XMR kazanca dönüşebilir.

GPU Madenciliği, bilgisayarınızda NVIDIA GTX 1060 veya AMD Radeon RX 580 gibi madencilik için uygun orta sınıf bir GPU varsa, Monero için saniyede yaklaşık 400-800 hash (H/s) hash oranı elde edebilirsiniz.
Bu, günde yaklaşık 0,03-0,06 XMR kazançla sonuçlanabilir.

GPU Madenciliği, kullanıcılarda NVIDIA GTX 1060 veya AMD Radeon RX 580 gibi madencilik için uygun orta sınıf bir GPU varsa, Monero için damarları yaklaşık 400-800 hash (H/s) hash oranını elde edebilirsiniz.
Bu, günde yaklaşık 0,03-0,06 XMR kazancıyla sonuçlanabilir.

Spesifik donanım ve koşullarınıza dayalı olarak daha doğru bir tahmin elde etmek için bu faktörleri dikkate alan çevrimiçi madencilik karlılık hesaplayıcılarını araştırmak ve kullanmak önemlidir. Bu hesaplayıcılar, gerçek zamanlı veriler sağlayabilir ve standart bilgisayarınızla madenciliğin potansiyel karlılığına ilişkin bilinçli kararlar vermenize yardımcı olabilir.

XMR gerçekten ne kadar mining yapabileceğimizi deneyerek göreceğiz fakat bir örnek yazıda verilmiş: *thecoinrepublic 

* 2021 yılının ikinci ayında madencide blockchainde yükselttikleri her blok için 1.26 XMR alıyorlar.
* Her 2 dakikada bir yeni bir blok kazılıyor.
* CPU/GPU kuvvetine bağlı olarak kazanımları gün başı her mining sistemi için $0.45'den $1 dolar arası olarak değişiyor.

## 2. Monero Mining Kurulum Adımları

### 1. Monero Cüzdanı ve Cüzdan Adresi Edinme

* Monero cüzdanını indirerek bir Monero adresi ediniyoruz. 
* https://www.getmonero.org/downloads/ adresinden WebGUI'yi indirip adımları takip ederek cüzdanı oluşturalım.
* Bu program tamamen güvenli bize cüzdan oluşturmamız için gerekli arayüzü sağlayacak. Cüzdanı aslında bu arayüzden bağımsız olarak da kullanabiliriz. 
* Antivirüs'e çok etkin biçimde takılıyor.
* Adımları takip ettikten sonra.
* "41iu7fTbgQHNJcafjyKqy8NvH2YMqM5kMMhkDF5yZWpOaAHF7kfohF979UwZhHF7kfohF979UwZh3337SkZm6wHk3nyLQ" gibi bir adres olan primary adresimizi alalım. 
* Bu aslında bizim cüzdanımızın adresi çok gizli olmasa da yine de paylaşmamakta fayda var. IBAN'ımız gibi aslında. Örneğin bu adresi moneroocean'a girerek hesabımız görüntüleyeceğiz
* Esas gizli tutmamız gereken hatta mümkünse bir kağıda yazmamız ve dijital ortamda tutmaktan kaçınmamız gereken Mnemonic Seed ve Secret Keylerdir.
* Monero cüzdanı monerod.exe'ye bağlanıyor. Monero deamon olan bu program bizi zincire dahil edecek. Bu yalnızca cüzdan işlemleri için kullanıyor. Miner'ımız tarafından kullanılmayacak.

### 2. Pooling sitesine cüzdan bilgisini gir yükleme scriptini üret.

* Daha sonra pooling sitemiz olan moneroocean'a cüzdan bilgimizi girelim.
* Aşağıdaki gibi bir script üretecek.
* Bu scripti cüzdan adresimizle otomatik olarak miner'ı kurmakta kullanacağız.

powershell -Command "$wc = New-Object System.Net.WebClient; $tempfile = [System.IO.Path]::GetTempFileName(); $tempfile += '.bat'; $wc.DownloadFile('https://raw.githubusercontent.com/MoneroOcean/xmrig_setup/master/setup_moneroocean_miner.bat', $tempfile); & $tempfile 41iu7fTbgQHNJcafjyKqy8NvH2YMqM5kMMhkDF5yZWp4XaHF7kfohF979UwZhb8FeserrxRD2jMRxE3337SkZm6wHk3nyLQ; Remove-Item -Force $tempfile"

### 3. Miner'ı Yükle

* Scripti bilgisayarımızda admin yetkisi olan cmd oturumunda çalıştıralım.
* Otomatik olarak kuracak.
* nssm.exe kullanarak servis olarak kurduğunu görüyoruz.
* config_background.json ve config.json dosyasını kullanıyor. Bunlardan config.json esas öncelikli olanı.

### 4. Loglardan Kontrol Gerçekleştir

xmrig.log'u kontrol et.

Bu logları kontol ederek ilk bilgilere erişmenin yanı sıra mining işlemi ile ilgili performansı görüntüleyebiliyoruz.

Böylece kurulum işlemini tamamlamış olduk.

## 3. İlk Sonuçlar ve Performans Arttırmak

Sonuçlar aşağıdaki gibi. 
18 saatte toplam 0,000087 XMR yani Monero çıkarmışız.
Bu değer oldukça düşük yaklaşık 0.5 liraya denk geliyor. 
Elektrik masrafını bile karşılamasa dahi uygulamayı çalışır durumda kullanmış olarak ilk madencilik uygulamamızı gerçekleştirdik.

Zaman aralığı  : [2023-07-14 00:24:42.315] - [2023-07-14 18:49:08.357]
Toplam çalışma : 18 saat 25 dakika
Toplam XMR     : 0,000087 XMR
Worker Sayısı  : 1 Worker
Pay Hashrate   : 1.22 KH/s (ornek bir zamanda)
Hash Sayısı    : 2.210
Günlük XMR     : 0.0002 XMR ($0.04)

Kullandığım CPU ve GPU detayları aşağıdaki gibi.


CPU : Intel(R) Core(TM) i7-8550U CPU @ 1.80GHz (1) 64-bit AES
      L2:1.0 MB L3:8.0 MB 4C/8T NUMA:1

GPU : NVIDIA GeForce MX150


The NVIDIA GeForce MX150 is not typically considered a powerful GPU for cryptocurrency mining. 
It is a mobile GPU designed for laptops and is not optimized for high-performance mining operations.



Earnings per hour (XMR) ≈ (Hashrate / Network Hashrate) * Block Reward * (1 hour / Block Time)
Earnings per month (XMR) ≈ Hourly Earnings (XMR) * 24 hours * 30 days




NVIDIA's GeForce GTX and RTX series, which are commonly used for cryptocurrency mining.

NVIDIA GeForce GTX 1660 Ti : A mid-range GPU that offers a good balance between performance and price. It features Turing architecture and has around 1536 CUDA cores. It delivers a decent hash rate for mining cryptocurrencies like Monero while being relatively power-efficient.
NVIDIA GeForce RTX 3060: The RTX 3060 is a more powerful GPU based on NVIDIA's latest Ampere architecture. It offers significantly higher hash rates compared to the GTX 1660 Ti and has around 3584 CUDA cores. The RTX 3060 is known for its mining capabilities, particularly for Ethereum mining.
NVIDIA GeForce RTX 3080: The RTX 3080 is a high-end GPU that provides exceptional mining performance. It boasts a massive number of CUDA cores (8704) and offers significantly higher hash rates compared to mid-range GPUs. However, the availability of the RTX 3080 has been limited and can be challenging to acquire.
NVIDIA GeForce RTX 3090: The RTX 3090 is currently one of the most powerful consumer GPUs available. It has a staggering number of CUDA cores (10496) and offers extremely high hash rates. However, it is more expensive and power-hungry compared to other GPUs, so it may not be as cost-effective for mining unless you have access to cheap electricity.


Peki bu cihazlar ne kadar sürede kendi ödemelerini çıkarabilir?



Öncelikle ne kullanıyor bunu görmeliyiz.
Task managerda CPU %43.5 olarak görüyorum. 
Bu oran aslında bilgisayarı kullanırken iyi fakat kullanmadığımızı gösteriyor. 
Arttırılabilir.

Şimdi GPU konfigürasyonu yapıp çalıştırdık.

NVIDIA GeForce MX150



Algo switching opsiyonu çalışıyor mu?



## Referanslar

* Non Fungible Token'ler
* Wikipedia - PoW
* Wikipedia - Monero
* What is the CryptoNight mining algorithm? - Bit2Me Academy - https://academy.bit2me.com/en/que-es-el-algoritmo-de-mineria-cryptonight/#:~:text=CryptoNight%20Mining%20Algorithm%20is%20a,advanced%20privacy%20and%20anonymity%20options.
* Bitcoin Whitepaper - 
* https://www.allcryptowhitepapers.com/cryptonite-whitepaper/
* https://monerodocs.org/proof-of-work/cryptonight/
* https://komodoplatform.com/en/academy/cryptonight/
* https://www.thecoinrepublic.com/2022/06/28/monero-yet-a-profitable-mine-from-home-cryptocurrency/#:~:text=XMR%20mining%20is%20profitable&text=Depending%20on%20your%20CPU%2FGPU,of%20twenty%20one%20million%20coins.
* https://www.quora.com/How-long-will-it-take-for-a-cryptocurrency-mining-rig-to-pay-for-itself
* https://thehackernews.com/
* https://www.trendyol.com/pd/legend/4u-duvar-tipi-soho-rack-kabinet-w-530mm-d-400mm-siyah-p-674007893?boutiqueId=61&merchantId=129377
