---
layout: post3
title: "Linux ve Kernel"
category: linux
number: 1
desc: "Linux ve Kernel"
---

Linux modern işletim sistemi teknolojisinde önemli bir yere sahiptir. Dolaylı ve doğrudan bugün milyonlarca insan iş ve kişisel yaşamlarının büyük kısmında linux tabanlı bilgisayar sistemlerini kullanmaktadır. Linux işletim sistemleri siber güvenlik, bulut bilişim, yazılım geliştirme, oyunlar, sanatsal üretim ve yapay zeka gibi alanlarda kullanıcıların karşına çıkar.

Linux tabanlı işletim sistemleri standart kullanıcı tipi bilgisayarlar haricinde sunucularda, endüstriyel sistemler ve gömülü cihazlarda gibi pek çok farklı elektronik cihazda kullanılır.

İşletim sistemi ele alınırken göze ilk çarpan özellikle linux işletim sisteminde bulunan çekirdek ve kabuk ayrımıdır.

Kernel adı verilen işletim sisteminin çekirdeği kabuktan ve diğer fonksiyonaliteden ayrılır. Kimi zaman birbirleri yerine kullanılsalar da linux aslında çekirdeğin ismidir. Çekirdek bir yazılım olarak GNU yazılımına ek bir parçadır. İkisi beraber kullanıldıklarında aslında linux olarak tanımlanan yapıyı oluştururlar. Yani işletim sistemini çekirdeği ancak ona ek olarak gelen GNU araçları işletim sistemini meydana getirir. Bu nedenle doğru kullanım aslında yazılımların kümesi olan GNU ve Linux'un beraber kullanımı olan GNU/Linux'tur.

Linux'un kökeni 1970'lerde AT&T Bell Laboratuarlarından kaynaklanan UNIX'e dayanmaktadır. UNIX C dilinde yazılmış bir işletim sistemidir. Taşınabilir ve donanımdan bağımsız olması ile öne çıkar. Sertifikalı UNIX'in aksine Linux, Open Group sertifikasına sahip değildir, bu da onu UNIX benzeri yapar, ancak belirli sebeplerden tam olarak UNIX değildir.

Linux'un ilk geliştirilmesi MINIX lisanslamasından rahatsız olan Linus Torwards Unix-benzeri bir işletim sistemini eğitim amacıyla tasarlamasıyla başlar.

Linus bugün kendi adıyla anılan işletim sisteminin ilk halini 1991'de hayata geçirir. Bu işletim sistemi diğer işletim sistemlerinden farklı olarak açık kaynaklıdır. Bu sebeple linux seneler içerisinde büyüyen bir komuniteye sahip olur. Yıllar içerisinde pek çok farklı linux versiyonu türer. Bu sürümler linux dağıtımları (distribution) olarak adlandırırlar. 

Linux dağıtımları lisanslama ve amaçları doğrultusunda farklılık gösterebilirler. Hem açık kaynaklı hem de ticari pek çok sürüm yıllar içerisinde kullanıcı karşısına çıkmıştır. Ticari marketteki büyük firmalar Red Hat, Oracle Linux sayılabilir. Öte yandan Debian, Slackware, Rocky Linux ve Ubuntu gibi örnekler ücretsiz dağıtılmaktadır.

Bu sistemler disk alanı yönetimi, çekirdek kurulumu, yazılımın diğer bileşenlerinin kurulumu gibi işlemleri kolaylaştıran araçlar içermektedir. Tüm özellikleri sağlanmış bir linux sürümü genellikle paket yöneticisi ve sistemin yönetimini sağlayan pek çok ek yazılımla beraber gelir. Paket yöneticisi belirli yöntemler kullanarak sistem üzerindeki yazılımların kurulumunu ve güncellemesini sağlar.

Açık kaynaklı linux dağıtımlarında kernel herkese açık olarak yayınlandığından kullanıcılar, geliştiriciler ve sistem yöneticileri kendi sürümlerini özelleştirebilir. Hatta gerek duyarlarsa kendi kernellerini üretebilirler. (kernel compile) Bu spesifik donanıma uyumluluk sağlamak, kimi özellikleri açmak ya da kapatmak ya da özelleştirilmiş değişiklikler yapmak amacıyla yapılabilir. Kernel compile işlemi aynı zamanda kernel seçeneklerinin (kernel options) konfigüre edilmesi gerkeli driverların seçilmesi ve "make" gibi bir komut kullanılarak kaynak konunun binary kernel imajına compile edilmesini içerir.

## İşletim Sisteminin Katmanları

İşletim sistemini açıklamak için kimi zaman farklı katmanlar ve terimler kullanılabilmektedir. Kullanılan linux dağıtımına özgü güncel kaynaklar (Örneğin [Ubuntu dokümantasyonu](https://ubuntu.com/core/docs/uc20/inside) veya RedHat gibi) ilgili sürümde çekirdeğin iç işleyişine dair kimi zaman daha gerçekçi bir manzara ortaya koyabilir.

En bariz olarak üç ana seviyeden (Hardware, Kernel ve User) ayrımından söz etmek mümkündür.

```
3- Kullanıcı Katmanı (User Space Layer)
2- Kernel Katmanı (Kernel Space Layer)
1- Donanım Katmanı (Hardware Layer)
```

Hardware tabanda yer alır. Donanım, belleğin (memory) yanı sıra hesaplamayı gerçekleştirmek ve bellekten okumak ve belleğe yazmak için bir veya daha fazla merkezi işlem birimini (CPU) içerir.
Diskler ve ağ arayüzleri (netwok interface) de pek çok çevresel donanım ve cihazlar gibi donanımların bir parçasıdır.

Donanımın özellikle de RAM, Disk ve CPU'nun elektronik olarak yönetilmesi kernelin temel işlevidir.
Kernel, çalışan bir bilgisayarda RAM'de yüklü biçimde bulunur. Temelde yalnızca bir yazılım olarak CPU'ya bir sonraki görevi nerede arayacağını söyler.
Donanım ve çalışan program arasında bir aracı görevi gören kernel, donanımı (özellikle ana belleği) yönetir.

Kernel aynı zamanda donanım ile çalışan herhangi bir program arasındaki birincil arayüz (primary inteface) işlevi görür.
Prosesler - kernel'in yönettiği çalışır durumdaki programlardır. Toplu olarak sistemin bir üst katmanı olan kullanıcı katmanını (user space) oluştururlar. 
Kernelin kendisi de processlere çok benzeyen ancak çekirdek alanına erişimi olan çekirdek iş parçacıklarını (thread) çalıştırabilir. Bunlara örnek olarak kthreadd ve kblockd verilebilir.

User space prosesin kullanıcı prosesi olduğu durumlar için kullanılan özel bir terimdir. Kullanıcı user process le etkileşime girse veya girmese de örn. web sunucu process yine user process olarak adlandırılır.

Çekirdek ve kullanıcı işlemlerinin çalışma şekli arasında kritik bir fark vardır: çekirdek bellek ve işlemcinin çekirdek modunda çalışır ve kullanıcı işlemleri kullanıcı modunda çalışır.
Çekirdek modunda çalışan kodun işlemciye ve ana belleğe sınırsız erişimi vardır.
Bu, çekirdeğin kolayca bozulmasına ve tüm sistemi çökertmesine olanak tanıyan güçlü ve tehlikeli bir ayrıcalık sağlar. 

Kullanıcı modu, buna kıyasla, genellikle oldukça küçük bir bellek alt kümesine ve güvenli CPU işlemlerine erişim sağlar.
Kullanıcı alanı (user space), ana belleğin kullanıcı işlemlerinin erişebildiği bölümlerini ifade eder.
Bir process hata yapar ve çökerse, sonuçları sınırlıdır ve çekirdek tarafından temizlenebilir.
Örneğin web tarayıcınının çökmesi durumunda, arka planda günlerdir çalışan başka bir hesaplamanın büyük olasılıkla devre dışı kalmaz.

Teorik olarak, kontrolden çıkan bir user process sistemin geri kalanına ciddi zarar veremez.
Ama gerçekte bu, sürecin belirli ayrıcalıklara ve neyi "ciddi hasar" olarak değerlendirdiğinize de bağlıdır, çünkü bazı süreçlerin diğerlerinden daha fazlasını yapmasına izin verilir.
Örneğin, bir kullanıcı işlemi diskteki verileri tamamen bozabilir mi? Doğru izinlerle bu tehlikeli işlemi gerçekleştirebilir.
Ancak bunu önleyecek önlemler mevcuttur ve çoğu processin bu şekilde hasara yol açmasına izin verilmez.

## test_executable Örneği

Kernel de her yazılım ve bilgisayar programı gibi CPU ve RAM  ve Disk aracılıyla çalışır. Basitçe bilgisayarın bellek biriminde tutulan işlemci setine uygun olarak düzenlenmiş talimatların (instruction) CPU üzerinde çalıştırılması Kernel için de geçerli olacaktır.

Bir CPU'nun yalnızca bir çekirdeğe (single core) sahip olduğunu düşünelim. Bu durumda fiziksel olarak birim zamanda yalnızca bir işlemci talimatı (instruction) uygulayabilir.
CPU context-switching ve time-sharing süreçlerini uygulayarak aslında birden fazla uygulamayı aynı anda çalıştırıyor izlenimi verir.
Time-sharing için CPU, zamanını küçük dilimlere böler (quanta) ve bu dilimleri farklı görevler için kullanır. Her görev  (task), CPU başka bir göreve geçmeden önce çok kısa bir süre çalışır.

Örneğin böyle tek bir çekirdek üzerinde test_executable programımız 10 dakika boyunca çalışıyor olsun. Aslında program 10 dakikadan daha az süre ile çalışacaktır. Çünkü işlemciyi bu sürede kernel ve başka programlarla dönüşümlü kullanmak zorunda kalır.

test_executable başlatıldığında, belleğe (aslında sanal bellek) yüklenir. Zamanlayıcı (scheduler) ona bir zaman dilimi ayırır.
Zaman dilimi boyunca test_executable talimatlarını çalıştırır. Daha sonra yeni zaman dilimleri geldikçe onlarda da çalıştırmaya devam eder.
Bu sürede başka process varsa onun zaman dilimleri zamanlayıcı yardımı ile araya girer. System Call yaparsa ya da Exception veya Interrupt gerçekleşirse kernel araya girer.

test_executable çalışırken, o zaman dilimi içerisinde CPU'nun tek sahibidir. Fakat hem kullandığı bellek (Virtual Memory, Page Tables, Segmentation ve Paging aracılığıla) hem de CPU yetkileri (Privileged Instructions ve Mode Switching aracılığıyla) kısıtlanmıştır. Aynı zamanda Kernel öncelik sıralamasına göre daha az zaman dilimi verebilir.

* Exception Durumu: text_executable bir hataya yol açarsa (örn gecersiz bellek erişimi), CPU exception verip kernel moduna döner. İşletim sistemi exception'u ele alarak sistemi stabil tutar.
* Interrupt: Donanım cihazları CPU'ya sinyal göndererek işleyişi kesebilir. (örn timer interrupt zaman diliminin bitimini gösterir). Bu durumda CPU kernel moduna geçerek interrupt a cevap verir.
* System Call: text_executable aynı zamanda bir user mode process olduğundan system call aracılığıyla kernelden servis talep edebilir. The system call interface ensures that the process cannot perform privileged operations directly. When a system call is made, the CPU switches from user mode to kernel mode, performs the requested operation, and then switches back to user mode. This ensures that user processes cannot execute privileged instructions.

* System Call or Interrupt: A context switch from user space to kernel space is typically triggered by a system call (e.g., file I/O, memory allocation) or a hardware interrupt (e.g., a timer interrupt).
* Saving User Context: The CPU saves the current state of the user application (registers, program counter, etc.) to the process control block (PCB) of the process.
* Switching to Kernel Stack: The CPU switches to the kernel's stack, which is separate from the user application's stack.
* Executing Kernel Code: The CPU begins executing the appropriate kernel function to handle the system call or interrupt.
* Returning to User Space: Once the kernel has completed the operation, it prepares to return to user space. This involves:
* Restoring the user context from the PCB.
* Switching back to the user stack.
* Returning control to the user application, either to the point where it left off or a different point if an interrupt was handled.

Örnek bir system call:

* User Application: A program requests to read a file by calling the read() function.
* System Call Entry: The read() function triggers a system call, causing a context switch to kernel space.
* Kernel Processing: The kernel handles the read request, accessing the file system and reading the data.
* System Call Exit: The kernel returns the read data to the user application and performs a context switch back to user space.


* To optimize performance the kernel takes some precautions. Context switches are relatively expensive due to saving and restoring state, changing stacks, and CPU cache invalidation.
* The Linux kernel employs various optimization techniques to minimize context switch overhead, such as reducing the frequency of interrupts and batching system calls.

## İşletim Sisteminin Katmanları (Tekrar)

```
1- Donanım Katmanı (Hardware Layer)
2- Kernel Modülleri Katmanı (Kernel Modules Layer)
3- Kernel Çekirdek Katmanı (Kernel Core Layer)
4- Sistem Kütüphaneleri Katmanı (System Libraries Layer)
5- Kullanıcı Alanı Katmanı (User Space Layer)
6- Kullanıcı Uygulamaları Katmanı (User Applications Layer)
```

* Donanım Katmanı : Fiziksel bileşenler, donanım içindeki CPU, bellek, depolama (HDD'ler, SSD'ler), giriş/çıkış araçları (klavye) ve ağ kartlarını kapsar.

* Çekirdek Katmanı : Linux çekirdeği, önyükleme ve kaynak ayırma sırasında yorulmadan sistem işlevlerini yönetir. İşletim sistemi beyni olarak hizmet eder. Kullanıcılar, donanıma özgü işlemlerin, hizmetlerin ve güvenliğin izolasyonu ile karmaşık ayrıntılarıyla uğraşmadan donanım kullanımını gerçekleştirirler.

* Bu esnada çekirdeğin modüler alt sistemleri, işlem, bellek, dosya sistemi, ağ ve aygıt sürücülerini yönetir.

* Sistem Kütüphaneleri Katmanı:  Bu, kullanıcı uygulamaları ve çekirdek arasında köprü oluşturan GNU C Kitaplığı (glibc) ve ilgili kitaplıkları içerir. Standart işlevler ve soyutlamalar sunarak, kernel fonksiyonlarına erişimde kolaylık sağlarlar. Örnekler glibc ve POSIX'i içerir. Yine bu katmanda yer alan Bash (kabuk,shell), ls ve ps gibi sistem yardımcı programlar, süreç ve dosya yönetimi gibi fonksiyonları çalıştırarak çekirdekle etkileşimi girmeyi sağlar.

* Kullanıcı Alanı Katmanı: Çekirdek ve sistem kütüphaneleri katmanının üstünde ise kullanıcı uygulamaları, utility'ler, yönetim araçları bulunur. Bunlar hem komut satırı hem de arayüz üzerinden erişilebilirlerdir. 
Her bilgisayarda bir kernel ve user space ayrımı bulunur. Böylelikle kernel kullanıcıya kaynakları sunarken kendini güvenceye alır.

* Kullanıcı Uygulamaları Katmanı: Bu katman, web tarayıcıları, ofis paketleri, medya oynatıcılar ve metin düzenleyiciler gibi kullanıcı merkezli uygulamaları ve araçları kapsar.

## Kaynak Yönetimi

## Heap ve Stack

## Swap

## Kabuk (Shell)

* Komut satırı arayüzü (CLI) ya da kabuk GNU projesinin Bash (Bourne-Again SHell) ya da diğer uyumlu kabularının (örn. Zsh, Fish) kullanıcılar ve uygulamalarla etkileşimini sağlar.

* Shell aslında kullanıcı seviyesinde bir programdır fakat diğer kullanıcı seviyesi programlardan farklı olarak işletim sisteminin fonksiyonlarını dışarıya kullanıcılarin görebileceği ve etkileşime girebileceği şekilde açar. Shell bu özelliği ile kernel'i kullanıcıya ifşa etmesi bakımından kritiktir. Shell ile kullanıcılar uygulamalara kütüphanelere ve çekirdeğe erişim sağlayabilirler. Böylece kullanıcı sistemin kaynakları ve fonksiyonları hakkında bilgi edinebilir ve değişiklik yapabilir duruma gelirler. 

* Bash için bazı işlemleri aşağıdaki gibi özetleyebiliriz: Linux sistemlerde yaygın olarak kullanılan Bash örneğin kullanıcı dizinini değiştirmek için chdir isminde bir system call çalıştırır. Bu system call ile kernel tarafında çağrılan processin çalıştırıldığı dizini değiştirir. Çalışma dizini alt (çocuk) processler tarafından miras alınır.

* Bir program çalıştırmak için ise Bash bir fork ya da örneğin vfork ya da bir benzerini çağırır. Bu komut da yine bir çocuk (child) proses oluşturur. Bu proses orjinalin (parent) bir kopyasıdır. Ardından bu proses execve isminde bir system call çağırır. Bu da kendi programını çalıştırılmak istenen programla değiştirir. Daha sonra bash bir system call olan wait'in bir versiyonunun çağırarak çocuk process terminate olana kadar bekler.

* Yukarıdaki anlatımdan da anlayabileceğimiz gibi sistem çağrıları (system calls), kullanıcı alanından (user space) çekirdekle etkileşim kurmanın önerilen yoludur.
  
* Kullanıcı uygulamaları ve çekirdek işlevleri arasındaki etkileşimleri izlemek ve hata ayıklamak için strace ve gdb gibi hata ayıklama araçları kullanılabilir.

* Pek alışılmadık ve ciddi güvenlik sorunları oluşturma riski barındırsa da doğrudan kernell'e doğrudan erişmek mümkündür.

