---
layout: post
title: Linux İşletim Sistemlerinde Boot Süreci
tags: [Linux, Boot]
---

Linux tabanlı işletim sistemlerini anlatırken sıkça araba benzetmesi kullanılır. `Kernel` (çekirdek), arabanın motoru gibidir. Motorun işlevi temeldir ve çeşitliliği sınırlıdır; asıl görevi aracı çalıştırmaktır. Ancak motorun üzerine, markaya ve hatta modele göre değişen pek çok ek özellik eklenir.

Aynı şekilde Linux dünyasında da farklı dağıtımlar bulunur. Aslında “Linux” adı yalnızca çekirdeği ifade eder. Tam teşekküllü bir işletim sistemi ise Linux çekirdeği ile birlikte GNU araçlarının bir araya gelmesiyle oluşur ve bu yapı `GNU/Linux` olarak adlandırılır.

Nasıl ki bir arabanın kontağı kapalıyken çalışır duruma geçmesi belirli bir süreci izliyorsa, bilgisayarların da açılış sırasında benzer bir başlangıç (boot) süreci yürütülür.

### Boot Sürecinin Özeti

Boot süreci içerisinde tarihsel olarak gelen ve sistem çeşitliliğinden kaynaklanan farklar bulunur. 
Bu farklara rağmen genel bir Linux için boot sürecini aşağıdaki gibi özetleyebiliriz:

~~~
1. Firmware (BIOS / UEFI)
  Donanımı başlatır ve temel kontrolleri (POST) yapar
  Boot edilebilir aygıtı bulur
  Bootloader’ı belleğe yükler

2. Bootloader (örn. GRUB)
  Kernel’i ve initramfs’i yükler
  Kernel parametrelerini belirler ve kernel’e iletir
  Hangi işletim sisteminin başlatılacağını seçer

3. Kernel’in Yüklenmesi
  Belleğe yerleşir ve çalışmaya başlar
  CPU, bellek ve temel donanım yönetimini devralır
  Kernel parametrelerini işler

4. initramfs
  Geçici kök dosya sistemi olarak kullanılır
  Gerekli sürücüleri (disk, dosya sistemi vb.) yükler
  Asıl root dosya sistemine geçişi sağlar

5. Root Dosya Sisteminin Bağlanması
  Kalıcı root filesystem mount edilir
  initramfs devreden çıkarılır

6. Init Sistemi (örn. systemd)
  PID 1 olarak çalışır
  Servisleri, hedefleri (targets) ve bağımlılıkları başlatır
  Sistemi çok kullanıcılı ortama hazırlar

7. Kullanıcı Ortamı
  Giriş ekranı (CLI veya GUI) başlatılır
  Sistem tam olarak kullanılabilir hale gelir
~~~

Sistemin yüklenmesine kadar olan aşamalar. dmesg ile kernel mesajları systemd logları için journalctl ile görüntülenebilir. Oluşabilecek hataların incelenmesinde bu loglar kullanılır.

### Başlangıç Aşamaları, Kernel Parametleri ve Boot Mesajlarının Okunması

Bu başlangıç süreci üç temel başlık altında incelenebilir: başlangıç aşamaları, kernel parametreleri ve boot mesajlarının okunması. Bu başlıklar birlikte değerlendirildiğinde, sistemin açılış mantığını kavramak ve karşılaşılabilecek sorunları teşhis etmek çok daha kolay hale gelir.

Başlangıç aşamalarında, bir makinenin kullanılabilir duruma gelmesi için işletim sisteminin temel bileşeni olan kernel’in devreye alınması gerekir. Bu işlem, bootloader tarafından gerçekleştirilir. Bootloader ise BIOS veya UEFI gibi sistem firmware’i tarafından yüklenir. Her iki firmware türü aynı amaca hizmet etse de çalışma yöntemleri farklıdır. 

Kernel'in devreye alınmasında iki kritik nokta öne çıkar: 
* Kök dosya sisteminin (root filesystem) konumunun belirlenmesi.
* Kernel’in doğru parametrelerle başlatılması.

Açılış sürecinde hangi bileşenin hangi sırayla devreye girdiği, sistemin sağlıklı bir şekilde çalışması açısından belirleyicidir.

Kernel parametreleri, bootloader tarafından kernel’e aktarılan ve sistemin nasıl başlatılacağını belirleyen ayarlardır. Bu parametreler kullanıcı tarafından değiştirilebilir ve işletim sisteminin davranışını doğrudan etkiler. Örneğin root dosya sisteminin hangi disk ya da partition üzerinde bulunduğu veya sistemin hangi çalışma modunda açılacağı bu parametreler aracılığıyla tanımlanır. Bu nedenle temel kernel parametrelerinin bilinmesi, hem yapılandırma hem de sorun giderme süreçlerinde önemli bir rol oynar.

Kernel yüklendikten sonra, açılış süreci donanım bileşenlerinin tanınması ve yapılandırılmasıyla devam eder. Bu aşamanın ilk adımı, geçici bir kök dosya sistemi görevi gören initramfs’in yüklenmesidir. Ardından kernel, sistem servislerinin başlatılmasından ve yönetilmesinden sorumlu olan init programını çalıştırır. Sistemin tam anlamıyla kullanılabilir hale gelmesini sağlayan işlemler bu aşamada gerçekleştirilir. Günümüzde birçok Linux dağıtımında bu görevi systemd üstlenmektedir.

Son aşamada ise boot mesajlarının incelenmesi, sistem açılışı sırasında meydana gelen olayların anlaşılması ve olası hataların tespit edilmesi açısından büyük önem taşır. Bu amaçla dmesg ve journalctl araçları kullanılır. Donanım tanıma süreci, sürücülerin yüklenmesi ve hata mesajları gibi kritik bilgiler bu araçlar aracılığıyla görüntülenebilir. Bu nedenle her iki aracın temel kullanımının ve önemli parametrelerinin bilinmesi, sistem yönetimi açısından vazgeçilmezdir.


### Firmware ve Bootloader

x86 makinelerde bootloader'ı çalıştıran prosedürler BIOS mu UEFI mı kullanıldığına göre değişir. Gerçekte modern bir laptop ele alındığında laptopun çipte yer alan UEFI bir firmware'i bulunur. Bu UEFI programı değiştirilmez yalnızca güncellenir. Bu UEFI programı diskler üzerinde tarama yapabilir. EFI programlarını çalıştırır.

<div class="smallbox">
<p><b>x86 Bilgisayarlar Hakkinda Not:</b></p>
  
<p>Modern bilgisayarın çoğu x86 işlemci mimarisini kullanır. "x86" adı, Intel tarafından piyasaya sürülen ilk işlemcilerden biri olan 8086'dan türetilmiştir. x86 CPU'lar, karmaşık komut seti bilgisayar (CISC) tasarımını kullanır. x86 işlemci komutlarının (instruction, assembler) özelliklerini belirleyen standarttır. İşlemci yalnızca aslında kendi fiziksel özelliklerine tanımlı bu dilin komutlarını tanir.</p>

<code>
    B8 05 00 00 00  →  mov eax, 5
    01 D8           →  add eax, ebx
</code>

<p>x86 mimarisinde yazılan <code>mov eax, 5</code> gibi komutlar, derleme aşamasında Intel’in x86 standartlarında tanımlanmış özel opcode formatlarına dönüştürülür ve bu binary komutlar işletim sistemi tarafından RAM’e yüklenir. CPU da bu komutları yürütürken RAM’den ziyade, çoğunlukla L1/L2 cache’lerden çekerek çok daha hızlı şekilde çalıştırır. x86 haricinde örneğin ARM gibi farkli işlemci mimarileri bulunabilir; ARM günümüzde özellikle mobil cihazlarda baskınken, x86 uzun yıllardır masaüstü ve dizüstü bilgisayarların temel standardı olmuştur. Tüm programlar—işletim sistemi dahil—sonuçta RAM’de bulunur ve CPU bu binary komutları yürütür. Basitleştirmek amaçlı tek çekirdekli bir işlemcide birim zamanda tek bir programın ve yalnızca bir komut akışının işlediğini kabul edebiliriz. Modern işlemcilerin pipeline ve out-of-order execution gibi teknikler sayesinde tek çekirdek bile aynı anda farklı aşamalarda birden fazla komutu paralel olarak işleyebilir.</p>
</div>
  
#### BIOS

İlk olarak her ikisi de legacy sistem olan BIOS ve MBR ikilisini ele alalım.

![Thinkpad BIOS](https://csariyildiz.github.io/images/thinkpad-bios.png)

**_BIOS (Basic Input/Output System)._** BIOS (Basic Input/Output System) anakarta takılmış bir memory chip içerisinde bulunur. Bu çip bilgisayar her açıldığında devreye girer. Bu program'a firmware denir. Firmware in amacı temel bir kontrol sonrası bootloader'ı çalıştırmaktır. Tutulduğu alan cihazın diğer disk cihazlarından farklı olması tercih edilir. 

_**Bootstrap.**_ Bootstrap özellikle BIOS için önemlidir. BIOS firmware ile çalışan bir makinede, bootstrap binary dosyası, (BIOS aracında nasıl tanımlandıysa ) ilk depolama aygıtının `MBR` kısmında bulunur. Bu disk üzerinden okunan ilk kod olur ve yine MBR üzerinden partition tablosunu okur. Bootstrap ve tablo kullanılarak diskin içinde işletim sistemini yükleyen esas başlangıç yazılımı diyebileceğimiz bootloaderın ikinci kısmı yüklenir.

BIOS işletim sistemini başlatabilmek için bir cihaz arar. BIOS konfigurasyonundaki boot sıralamasına göre başka diskler seçebilir. Ek bir konfigurasyon yoksa ilk disk cihazının ilk 440 byte ını bootloaderın ilk aşaması (bootstrap) olarak kabul eder. Birini boot edemezse diğerine atlar.

BIOS standart DOS partition şemasına göre diskin İlk 512 byte MBR (Master Boot Record) olmasını bekler. Bootstrap bilgisi buradan çekilir. Bu bölge partition table ı barındırır. Eğer MBR doğru veriyi içermiyorsa ve farklı bir metod kullanılmıyorsa sistem başlayamaz.

Genel olarak BIOS ile beraber sistemi başlatmak için kullanılan ön operasyon adımları aşağıdaki gibi sıralanabilir:

1.  POST (power on self-test) temel bir donanım taraması yapar.
2.  Video çıktısı klavye ve diskler gibi sistemi yüklemek için gerekli temel bileşenler aktive edilir.
3.  BIOS bootloader ın ilk aşamasını (bootstrap)'ı MBR içerisinden yükler.
4.  Bootloader ın ilk aşaması ikinci aşamasını çağırır. Bu ikinci kısım boot seçeneklerini sunar ve kerneli çalıştırır.

Bootloaderın ikinci kısmına kadar olan süreçte hem BIOS'da hem de MBR kısmında yapılandırma bulunur ve burada değişiklikler yapılabilir.

#### UEFI

**_UEFI (Unified Extensible Firmware Interface)._** UEFI (Unified Extensible Firmware Interface) BIOS dan bazı alanlarda farklılaşır. UEFI da BIOS gibi firmware'dir fakat ek özellikler taşır. UEFI partition ları tanımlayabilir, onlar üzerindeki birden farklı dosya sistemini okuyabilir. UEFI BIOS gibi MBR a dayanmaz. Bunun yerine anakartın içerisinde bulunan kendi NVRAM'ı (non-volatile memory) üzerindeki ayarları kullanılır. Bu tanımlar UEFI ile uyumlu programların yerini gösterir. Bu programlara EFI denir. Bunlar otomatik olarak çağrılır ya da menüden düzenlenebilir. EFI uygulamaları bootloader olabilir. İşletim sistemi seçmeye yarayan araçlar olabilir ya da sistem bilgi ve kurtarma yazılımları olabilirler.

EFI barındıran bir partitionunun bilinen bir cihaz partition yapısı içerisinde ve bilinen bir dosya sistemine sahip olması yeterlidir. Bu standart dosya sistemleri disk cihazlar (block devices) için FAT12, FAT32 ve optik medya için ISO-9660'dır. Sonuç olarak BIOS'a göre çok daha elverişli yaklaşım sayesinde daha esnek sofistike araçlar çalıştırılabilir.

EFI uygulamalarını barındıran partition'a ESP (EFI System Partition) adı verilir. Bu partition root dosya sistemi ya da user data dosya sistemi gibi başka dosya sistemleriyle paylaşılmamalıdır. ESP partitionu içerisinde EFI dizini bulunur. Bu dizin içerisindeki uygulamalar NVRAM içerisindeki girdiler tarafından çağrılır.

Genel olarak UEFI ile beraber sistemi başlatmak için kullanılan ön operasyon adımları:

1.  POST (power on self-test) temel bir donanım taraması yapar.
2.  Video çıktısı klavye ve diskler gibi sistemi yüklemek için gerekli temel bileşenler aktive edilir.
3.  UEFI'ın firmware'i NVRAM'da tutulan bilgiyi kullanarak ESP içerisinde tanımlı EFI uygulamasını çağırır. Genellikle bu EFI uygulaması bootloader'dır.
4.  Eğer bu uygulama bir bootloader ise kernel i yükleyecek ve işletim sistemini başlatacaktır.

UEFI standardı Secure Boot adı verilen bir özelliği de barındırır. Bu özellik ile sadece imzalanmış EFI uygulamaları çağrılabilir. Bu imzalanmış EFI uygulamaları donanım sağlayıcısı tarafından yetkilendirilmiştir. Bu özellik sayesinde zararlı yazılım içerebilecek işletim sistemlerini yüklemeyi zorlaştırarak güvenlik sağlar. Kimi zararlı yazılımlar sistemlerde kalıcılık sağlamak (persistance) için yüklenme adımlarını etkilemeyi hedefler. Böyle bir durumda işletim sistemi tekrar yüklense bile zararlı yazılım etkisini sürdürebilir.

#### Bootloader

GRUB (Grand Unified Bootloader) x86 mimarisindeki Linux cihazlar için en popüler bootloader'dır. UEFI ve BIOS tarafından çağrılan GRUB boot için elverişli işletim sistemlerinin bir listesini ekrana getirir. Kimi zaman liste otomatik olarak gösterilmeyecek şekilde konfigüre edilmiş olabilir. Böyle bir durumda GRUB çağrılırken BIOS için Shift UEFI için Esc tuşuna basılabilir.

#### Kernel Parametreleri

GRUB menüsü içerisinden hangi kernelin hangi konfigürasyonla yükleneceğine dair ayarlarının yapılması mümkündür. Çoğu kernel parametresi `option=value` olarak tanımlanır.

Sık karşılaşılan kullanışlı kernel parametrelerinden bazıları aşağıdaki gibidir:

*  `acpi` : ACPI desteğini aktive eder veya kaldırır.
*  `init` : Alternatif bir sistem başlangıç uygulaması/başlatıcı (initiator) tanımlar. Örneğin, `init=/bin/bash` Bash'i başlatıcı olarak tanımlandığında shell oturumu kernel boot process sonrasında açılır.
*  `systemd.unit` : systemd target'i aktif eder. Örneğin, `systemd.unit=graphical.target`.

* ACPI, işletim sisteminin donanımını yönetebilmesi, güç tüketimini kontrol edebilmesi, uyku/hazırda bekletme gibi modları çalıştırabilmesi için kullanılan standart bir arayüzdür. `acpi=off` ACPI desteğini kaldıracaktır. Kaldırmak genelde sadece çok eski donanımlar için kullanılır. Modern sistemlerde kullanılırsa wifi, pil, usb, tuşlar, suspend gibi birçok fonksiyon bozulur. Yine de ACPI bazen sorun çıkarır. Bu nedenle kernel parametreleri ile davranışının değiştirilmesi ve loglarda kontrolü önemlidir.


#### Numerik Değerler

Aşağıda örnek bir grub konfigurasyonu linux satırında 1 parametresi verilmiş:

~~~
linux /boot/vmlinuz-linux root=/dev/sda1 ro 1
~~~

Systemd aynı zamanda numerik runlevel değerlerini de SysV'de tanımlandığı şekliyle aktive eder. Bu şekilde kullanım da olabilir. Örneğin runlevel 1 i aktive etmek için To activate the runlevel 1, örneğin 1 sayısı ya da S harfi (“single” ın kısaltılmışı) kernel parametresi olarak gönderilir. Örnek runlevel'lar:

~~~
Runlevel   Anlamı    systemd karşılığı
1 Single-user mode `rescue.target`
3 Multi-user (text mode) `multi-user.target`
5 Graphical `graphical.target`
~~~

Eskiden (SysV init zamanında) single-user mode'a girmek için kullanılan bu numerik değerler kullanılmaya devam etmiştir. 
systemd verilen numerik değeri target sistemine çevirerek açar. SysV init tarafından kullanılan 1, 3, 5 gibi runlevel değerleri parametre olarak kullanılır. 

*  `mem` : Sistemin RAM kullanımını sınırlar. Sanal makineler için kullanışlıdır. Çünkü RAM her bir sanal makine için RAM kullanımını sınırlandırmakta kullanılabilir. Örneğin `mem=512M` RAM kullanımını 512 megabyte olarak sınırlar.
* `maxcpus` : Sistemde görülen işlemci ya da işlemci core sayısını symmetric multi processor makinelerde sınırlandırır. Sanal makineler için kullanışlıdır. Değer olarak 0 verildiğinde multi-processor makinelerde destek sonlandırılır. Kernel parametresi olan nosmp ile aynı etkiye sahip olur. Örneğin `maxcpus=2` verildiğinde CPU core sayısını 2 core işlemci olarak sınırlar.
*  `quiet` : Ekrana gelecek boot mesajlarının çoğunu gizler.
*  `vga` : Video modunu seçmeye olanak tanır. Parametre `vga=ask` verildiğinde seçim yapılabilecek modların listesi görünür.
*  `root` : Root partition'u belirler. Bu bootloader içerisinde önceden tanımlı olandan farklı bir tanımlamaya olanak sağlar. Örneğin `root=/dev/sda3` olarak verildiğinde sistemin `/` (root) dizini `/dev/sda3` üzerinde olduğu, buranın kök dosya sistemi olarak mount edileceği tanımlanır. Kurtarma veya debug modunda farklı bir root denemek istediğinde kullanılır.
    
*  `rootflags` : Root dosya sistemi için ek tanımlanmış özellikleri tanımlamaya olanak sağlar. Özellikler dosya sisteminin (ext4,xfs,brfs) türüne göre değişir. Örneğin ext4 için aşağıdaki gibi olabilir:

~~~
root=/dev/sda1 rootfstype=ext4 rootflags=errors=remount-ro,data=ordered
~~~

* `ro` : Root dosya sisteminin başlangıçtaki yüklemesini (initial mount) read-only yapar.
* `rw` : Root dosya sisteminin başlangıçtaki yüklemesini (initial mount) writable yapar.

Grub konfigurasyonunun detayları başka bir yazının konusu fakat aşağıda örnek bir grub konfigurasyonunu inceleyebiliriz.

~~~
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR="Red Hat Enterprise Linux"
GRUB_DEFAULT=saved
GRUB_DISABLE_SUBMENU=true
GRUB_CMDLINE_LINUX_DEFAULT="quiet"
GRUB_CMDLINE_LINUX="crashkernel=auto rd.lvm.lv=rhel/root rd.lvm.lv=rhel/swap resume=/dev/mapper/rhel-swap"
~~~

* Kernel parametrelerini değiştirmek genellikle gerekli değildir, ancak işletim sistemiyle ilgili sorunları tespit etmek ve çözmek için kullanılırlar. Parametrelerinin yeniden başlatmalar arası kalıcı olması için `/etc/default/grub` dosyasındaki `GRUB_CMDLINE_LINUX` satırına eklenmesi gerekir.

* `/etc/default/grub` her değiştiğinde bootloader için yeni bir yapılandırma dosyası (grub.cfg) üretilmelidir; bu işlem `grub-mkconfig -o /boot/grub/grub.cfg` komutuyla gerçekleştirilir.
* Yeni bir grub konfigurasyonu yazmadan değerlere GRUB ekranından tek seferlik müdahale etmemiz de mümkündür.
* Çalışan bir işletim sisteminde, mevcut oturumu yüklemek için kullanılmış olan kernel parametreleri `/proc/cmdline` dosyasından okunabilir.

### Kernel ve İşletim Sisteminin Başlangıç Süreci

Linux yalnızca process ve donanım aygıtlarının yönetimi yapan kernel'den oluşmaz. Kullanılabilir bir ortam oluşturmak için başka bileşenlere de ihtiyaç duyar. Bu bileşenlerin büyük bir kısmı sistemin başlatılma süreci esnasında yüklenir.

Bu bileşenler çeşitli script ve servislerden (daemon) oluşur. Scriptler başlangıç esnasında bir kere çalıştırılıp sonlandırılırlar. Hızlı kısa süreli yükleme işlemlerini gerçekleştirirler. Servisler ise daha kompleks her zaman açık kalmayı gerektiren işlemler için kullanılır. Genellikle network bağlantılarını yönetmek loglama gibi sistemin hayati iç işlevlerini yerine getirirler.

Tarihsel olarak Ubuntu Fedora gibi linux dağıtımları başlangıç scriptleri ve servisleri için çeşitli yollar kullanmıştır. Bu çeşitlilik bugüne kadar standart tek bir araç ve yöntem oluşmasını zorlaştırmıştır. Ancak bir dağıtım hangi aracı kullanıyor olursa olsun, en azından bu sistem servislerini başlatabilmeli, durdurabilmeli ve yeniden başlatabilmelidir.

Sistem servislerinin yönetimi sistemin kendisi ve nihayetinde onu yöneten kişinin ortaklaşa yürütttüğü bir süreçtir.  Bu süreçte sistem otomatik olarak servisleri başlatma ve güncellemeleri yansıtmaya çalışır. Sistem yöneticisi ise neredeyse her zaman bu süreci takip eder. Konfigurasyon değişiklerinde sistemi manual olarak resetlemesi gerekir.

Sistem yönetici aynı zamanda hangi servislerin çalışacağını seçebilmesi gerekir. Yöneticinin hangi hizmetlerin çalıştırılacağını seçebilmesi ve esnek bir biçimde çalıştırabilmesi de hayati önem taşır. Örneğin, bakım yapılması veya bir sorunun giderilmesi gerektiğinde yalnızca minimum düzeyde servisleri çalıştırmak gerekebilir.

Strictly Speaking, the Operating System (OS) is only the kernel and the parts that control the hardware and manage processes. However the common use has a looser definition. People usually use the term "Operating System" more broadly to mean the entire collection of programs (the kernel, scripts, daemons, and user interface) that allows a person to use the computer for basic tasks.

#### Kernel'in RAM'e Yüklenmesi ve Initfram'lar

İşletim sistemini başlatan süreç bootloader'ın kernel'i RAM e yüklemesidir. Kernel bu noktadan sonra CPU'yu devralır ve memory adreslemesi donanım konfigürasyonu gibi işletin sisteminin temel bileşenlerini tespit edip yüklemeye başlar.

Kernel initramfs (initial RAM filesystem) adı verilen arşivi yükler. Bu dosya üzerinde tutulan özel dosya sistemi geçici olarak root dosyasistemi olarak çalışır. Initframs dosyasının temel amacı kernel'e gerekli modülleri sağlamaktır. Böylece kernel işletim sisteminin gerçek root dosyasistemine erişmesi mümkün olur. Root filesystem erişilebilir hale geldikten sonra kernel /etc/fstab içerisinde önceden tanımlı tüm dosya sistemlerini mount eder ve ardından init adındaki ilk programını çalıştırır.

#### init Programı

Bir yardımcı program (utility) olan Init işletim sisteminin çalıştırdığı ilk programdır. init tüm başlangıç scriptlerini çalıştırıp sistem servislerini başlatmakla yükümlüdür. Geleneksel init haricinde farklı sistem başlatıcılar systemd ve upstart gibi kullanılır.

Init programı yüklendikten sonra initfram'lar RAM'den kaldırılır.

SysV standardı : SysVinit standardına dayalı bir servis yöneticisi, çalışma seviyeleri kavramını kullanarak hangi daemon'ların ve kaynakların kullanılabilir olacağını kontrol eder. Çalışma seviyeleri 0'dan 6'ya kadar numaralandırılır ve dağıtım yöneticileri tarafından belirli amaçları karşılamak üzere tasarlanır. Tüm dağıtımlar arasında ortak olan tek çalışma seviyesi tanımları 0, 1 ve 6'dır.

Systemd, Linux işletim sistemlerinde kullanılan standart sistem ve servis yöneticisidir. Linux'un açılış sürecini yönetmek, servisleri başlatıp durdurmak ve sistemin genelini izlemek için tasarlanmıştır.

systemd, kendisinden önceki eski SysVinit sistemlerinin (SysV komutları ve çalışma seviyeleri - runlevels) komutlarını kabul eden bir uyumluluk katmanına sahiptir. systemd servisleri paralel (eş zamanlı) ve asenkron (birinin bitmesini beklemeden) başlatır. Bu, sistem açılış süresini (boot time) geleneksel init sistemlerine göre çok daha hızlı hale getirir. Servisleri başlatırken katı bir sıraya uymak yerine, servislerin birbirine olan bağımlılıklarını (dependency) dikkate alır. Örneğin, Ağ (Network) servisi başlamadan Web Sunucusu'nun başlamasına izin vermeyerek dependency tabanlı bir servis kontrolü gerçekleştirir.

systemd, bu işlevleri yerine getirmek için çeşitli Linux çekirdeği özellikleri ve teknolojilerini kullanır. Sistemin başlatılması sırasında (boot anında) veya bir istek üzerine (on-demand) servisleri başlatır ve bunların durumunu (çalışıyor, durdu, hata verdi vb.) sürekli izler. İstek Üzerine Daemon Çalıştırma (Socket ve D-Bus Aktivasyonu) ile systemd bir servisin çalışmaya başlaması için gerçekten bir isteğin gelmesini bekleyebilir.

Bir program bir Socket (ağ veya yerel iletişim noktası) aracılığıyla istekte bulunduğunda veya D-Bus (sistemler arası mesajlaşma mekanizması) üzerinden bir mesaj gönderdiğinde, systemd ilgili daemon'u o anda çalıştırır. Bu, gereksiz yere kaynak tüketen servislerin sistem açılışında çalışmasını önler.

systemd, bir servise ait tüm alt süreçleri (child processes) doğru ve güvenilir bir şekilde izlemek için Linux çekirdeğinin Control Groups (cgroups) özelliğini kullanır. Bir servis durdurulacağı zaman, cgroups sayesinde o servise ait hiçbir sürecin sistemde kalmadığından emin olunur.

*   Durum Yönetimi:
    *   Snapshot Özelliği: Sistemin mevcut çalışma durumunun (hangi servislerin aktif olduğu, nerede mount edildiği vb.) anlık görüntüsünü (snapshot) alabilir ve daha sonra bu duruma geri dönebilir.
    *   Sistem Oturumu Kurtarma: Daha çok kullanıcı oturumu (user session) ile ilgili olsa da, genel olarak sistemin kararlı bir durumda kalmasına yardımcı olur.
    *   Mount Point Denetimi: Sistemin dosya sistemlerinin düzgün bir şekilde bağlanıp (mount edilip) bağlanmadığını ve bunlara bağımlı servislerin doğru zamanda başlatılıp başlatılmadığını kontrol eder.
*   Son yıllarda çoğu büyük Linux dağıtımı, varsayılan sistem yöneticisi olarak systemd'yi kademeli olarak benimsedi.
    

Upstart : systemd, gibi Upstart da init alternatifidir. Upstart'ın amacı sisetm servislerini paralel olarak yükleyerek boot sürecini hızlandırmaktır. Upstart Ubuntu tabanlı dağıtımlarda kullanılmıştı fakat bugün yerini systemd'ye bırakmıştır.

### Loglar ve Başlangıç Süreçlerinin Kontrolü

Boot sırasında ekrana akan mesajlar, önce kernel logları ardından da systemd loglarıdır. quiet parametresi girilmediyse bu logların bir kısmı konsola yazdırılır. Tüm mesajları ring buffer’a yazar ama hangilerinin ekrana yazılacağı, log level (severity) ile belirlenir. quiet parametresi ile sadece kritik 2 ve altı hatalar ekrana basılır. Logların büyük kısmı renkli olanlar systemd service status mesajlarıdır. Kernel logları renkli değildir (düz beyaz metindir).

Önyükleme sırasında bazı hatalar meydana gelebilir; bu hatalar işletim sistemini tamamen durdurmayabilir, ancak sistemin beklenen şekilde çalışmasını etkileyebilir. Her hata, ne zaman ve nasıl oluştuğuna dair değerli bilgiler içerir; bu bilgiler ilerideki analiz ve araştırmalarda kullanılabilir. Hata mesajı oluşmasa bile, önyükleme sırasında toplanan bilgiler sistemin yapılandırılması ve ayarlanması için faydalıdır.

#### Kernel Ring Buffer

Kernel boot ettiğinde bir takım log mesajları üretir fakat bunların yazılabileceği bir dosyaya erişimi henüz yoktur. Bu nedenle kernel, önyükleme mesajları dahil tüm mesajlarını kernel ring buffer adı verilen özel bir bellek alanında depolar.

Linux kernel, loglarını RAM üzerinde tutulan dairesel (ring) bir buffer içine yazar. Buffer dolunca eski mesajlar silinir, yeniler eklenir. dmesg komutu doğrudan bu buffer’ı okur. Kernel kendi başına diske yazmaz, ama journald / syslog gibi userspace servisleri bunu yapabilir. Kernel ring buffer’daki loglar /proc/kmsg ile systemd-journald tarafından okunur. Diskte kalıcı olup olmaması, journald’ın Storage ayarına bağlıdır. Kalıcı değilse mevcut loglar journalctl -k ile görüntülenebilir.

Bu mesajlar, önyükleme sırasında ekranda animasyon yokken görünür. Ancak sistem kapatıldığında dmesg --clear komutu ile silinebilir.

~~~
dmesg --clear
~~~

dmesg --clear komutu kernel ring buffer içindeki tüm mesajlar siler.

Mevcut mesajları görmek için dmesg komutu kullanılabilir.

~~~
dmesg
~~~

Çıktı genellikle yüzlerce satır olabilir; örnek olarak yalnızca çekirdeğin systemd hizmet yöneticisini çağırdığı bölümü inceleyebiliriz:

~~~
[5.262389] EXT4-fs (sda1): mounted filesystem with ordered data mode. Opts: (null)
[5.460286] systemd[1]: systemd 237 running in system mode.
[5.480138] systemd[1]: Detected architecture x86-64.
[5.481767] systemd[1]: Set hostname to <torre>.
[5.636607] systemd[1]: Reached target User and Group Name Lookups.
[5.637000] systemd[1]: Listening on Journal Socket.
[5.641661] systemd[1]: Starting Load Kernel Modules...
~~~

Satırların başındaki sayılar, çekirdeğin yüklenmeye başlamasından itibaren geçen saniyeyi gösterir.

#### systemd ve journalctl

Systemd tabanlı sistemlerde, önyükleme mesajları journalctl komutu ile görüntülenebilir:

Systemd tabanlı sistemlerde journalctl komutu yükleme mesajlarını aşağıdaki seçenekler girildiğinde gösterir.

~~~
journalctl -b        # Mevcut önyüklemeyi
journalctl --boot     # Mevcut önyüklemeyi
journalctl -k         # Sadece kernel mesajları
journalctl --dmesg    # dmesg ile benzer mesajlar
~~~

Mevcut ve önceki önyüklemeleri listelemek için:

~~~
journalctl --list-boots
~~~

Bu komut, önyüklemelere ait numaraları, id hash değerlerini, zaman damgalarını ve son mesajları gösterir:

~~~
-1 55c0d9439bfb4e85a20a62776d0dbb4d Thu 2019-10-03 19:27:53 -03—Fri 2019-10-04 00:28:47 -03
0 08fbbebd9f964a74b8a02bb27b200622 Fri 2019-10-04 00:31:01 -03—Fri 2019-10-04 10:17:01 -03
~~~

Önceki başlatma kayıtları da systemd tabanlı sistemlerde tutulur, böylece önceki işletim sistemi oturumlarından gelen iletiler hala incelenebilir.

*   `-b 0` veya `--boot=0` : geçerli önyükleme
*   `-b -1` veya `--boot=-1` : bir önceki önyükleme
*   `-b -2` veya `--boot=-2` : iki önceki önyükleme

Örnek olarak, geçerli önyükleme (`journalctl -b 0`) sırasında çekirdeğin systemd hizmetlerini çağırması:

~~~
oct 04 00:31:01 ubuntu-host kernel: EXT4-fs (sda1): mounted filesystem with ordered data mode. Opts: (null)
oct 04 00:31:01 ubuntu-host systemd[1]: systemd 237 running in system mode.
oct 04 00:31:01 ubuntu-host systemd[1]: Detected architecture x86-64.
oct 04 00:31:01 ubuntu-host systemd[1]: Starting Load Kernel Modules...
oct 04 00:31:01 ubuntu-host systemd-modules-load[335]: Inserted module 'lp'
~~~

#### Önyükleme Mesajlarının Kaydı

İşletim sistemi tarafından gönderilen önyükleme ve diğer mesajlar `/var/log/` dizininde tutulur. Bunun için journald'nin persistent olarak /etc/systemd/journald.conf altında belirtilmesi ve ilgili dizin /var/log/journal 2755 önerilen izniyle oluşturulmuş olması gerekir. Kritik bir hata nedeniyle sistem başlatılamazsa, alternatif bir önyükleme medyası ile sistemi başlatıp ilgili dosya sistemine erişmek gerekir.

Systemd log mesajları düz metin olarak saklanmadığından, bunları okumak için `journalctl` kullanılır:

~~~
journalctl -D /var/log/journal/
~~~

Bu dizin, systemd loglarının temel deposudur. Başka dizinlerdeki loglar da aynı şekilde `-D` veya `--directory` seçeneği ile okunabilir.

~~~
journalctl -D /mnt/backup/journal/ -b -1
~~~

* -k : Sadece kernel (çekirdek) mesajlarını gösterir. 
* -f : Yeni gelen mesajları anlık olarak gösterir. (tail -f gibi) 
* -p : Belirtilen öncelikteki mesajları gösterir. (2 crit, 3 err, 4 warn, 5 notice, 6 info, 7 debug)

~~~
journalctl -k -f
~~~
