---
layout: post3
title: "Red Hat Enterprise Linux (RHEL) Nedir?"
category: linux
number: 1
desc: "Red Hat Enterprise Linux (RHEL) Nedir?"
---

Red Hat Enterprise Linux (RHEL), Red Hat tarafından geliştirilen ticari, UNIX ve GNU\Linux tabanlı bir işletim sistemidir. 
Sağlamlık ve güvenlik konusunda RedHat firmasının yaptığı ek geliştirmeler ve bir çok araç ile kurumsal düzeyde kullanıma odaklanır. 
Red Hat işletim sisteminin 4, 5, 6, 7, 8 ve 9 olmak üzere çeşitli versiyonları bulunuyor.
Bu yazının yazıldığı tarih itibarıyla en son sürüm olan RHEL 9, Mayıs 2022'de piyasaya sürüldü.  
RHEL 9'un saban anlamına gelen "Plow" lakabı, RHEL'in kurucularından biri olan ve RHEL mühendislik ekibinin eski lideri Tim Burke'ün Appalachian Trail (Appalachian doğa yürüyüşü) takma adından geliyor.

### CPU Mimarileri

RHEL, x86-64, Power ISA, ARM64 ve IBM Z dahil olmak üzere birden fazla CPU mimarisini destekliyor. 
x86-64 bildiğimiz üzere genellikle hepimizin kullandığı masaüstü - laptop bilgisayarlarda, sunucularda ve sunucu clusterlarında kullanıyor. 
Power ISA kurumsal sunucularda kullanılan IBM mimarisi. 
ARM64 bildiğimiz üzere ARM işlemci mimarisine sahip sistemlerde kullanılıyor, mobil cihazların yanı sıra hem sunucularda hem de gömülü sistemlerde giderek daha popüler hale geliyor. 
IBM Z IBM'in ana bilgisayar sistemlerinde kullanılıyor. 

### Kernel ve Gnome

RHEL 9'u komut satırı arayüzü ile yükleyebileceğimiz gibi x86-64 için bir masaüstü sürümü ile de yükleyebiliyoruz. 
RHEL 9 sürümü, Linux Kernel 5.14.0 ve Gnome 40 ile beraber kullanılıyor.
Bash komut satırı arayüzüne (CLI) ek olarak GUI arayüzü olarak Gnome Shell'i kullanıyor.
Diğer Linux dağıtımlarının çoğunun ve çekirdek Unix yardımcı programlarının yeteneklerine sahip.

### Paket Yönetimi

RHEL, paket yönetimi için DNF ve YUM adında iki ana aracı var. Hem DNF (Dandified YUM) hem de YUM (Yellowdog Updater, Modified), RPM tabanlı paketlerle çalışıyorlar.
Her ikisi de işletim sisteminde yüklü olarak geliyor. RHEL için favori olan DNF'in zamanla YUM'un yerini alması amaçlanıyor. (DNF bağımlılık çözümlemesini daha verimli bir şekilde gerçekleştirmek için tasarlanmış. )

DNF ve YUM'a ek olarak RPM (Red Hat Paket Yöneticisi) rpm komutu ile RPM formatındaki yazılım paketlerini kurmak, güncellemek, sorgulamak, doğrulamak ve kaldırmak için kullanılıyor.

İşlevlerin tamamını göstermese de örnek olarak aşağıdaki komutlar verilebilir:

```
# Yüklü paketlerin rpm ile sorgulanması
rpm -qa
# Yum ile paket kurulumu
yum install nfs-utils
# Dnf ile paket kurulumu
dnf install podman -y
# Manuel olarak (wget) indirilen paketin rpm ile kurulması
rpm -ihv ksh-1.0.0~beta.1-3.el9.x86_64.rpm
```

### Erişim ve Güvenlik

İşletim sistemine en basit olarak SSH ile key veya parola ile erişim sağlanıyor. Diğer linux dağıtımlarından aşina olunan standart kullanıcı yapısı ve izinleri dosya, proses ve servisler için geçerli.
İşletim sisteminin içerisinde lisans kontrolü yapan araçlar mevcut.

Temelde güvenlik için SELinux, ACL (setfacl) ve Firewalld (Iptables kullanılmıyor.) ile detaylı olarak policy oluşturulabiliyor.

Kurumsal bir yapıda işletim sisteminin kendisi haricinde güvenlik amaçlı PAM (Privileged Access Management), ağ üzerinde sınırlandırmalar, firewall cihazları, VPN gibi farklı sistemler bulunacaktır.
Red Hat'in de Red Hat Single Sign-On (SSO), 

Bunların dışında temel olarak bazı işlevleri aşağıdaki gibi listeleyebiliriz:

* Cockpit adında sunucuları yönetebileceğimiz araç. sos gibi raporlama toolları.
* Disk Management: LVM ve Stratis ile sanallaştırma yapılabiliyor. Dosya sistemi  olarak ext4. 
* Task Scheduling: contab ve at.
* Performance Tuning:
* Network Tools:
* File Compression And Archiving:
* Process Monitoring:

### Sistem Gereksinimleri

RHEL işletim sisteminin yazılımsal gereksinimleri bootloader (sistem UEFI veya BIOS bootloader desteklemesi gerekiyor.), Network bağlantısı NIC (Network Interface Card) arayüzünü gerektiriyor. 
RHEL 9 çeşitli ext4 default olmak üzere XFS ve Btrfs gibi çeşitli dosya sistemlerini destekliyor.

Temel donanım gereksinimleri işlemci (CPU), bellek (RAM), depolama birimi (storage) ve ekran (display). 

Farklı kurulum türlerinin spesifik gereksinimleri oluyor. Örneğin yoğun hesaplama yapılan bir bilgisayarda ek bir GPU kullanımı gerekebilir.

Minimumda x86_64 (64 bit) mimarisinde, 2 GHz hıza sahip ve çok çekirdekli (multi-core) işlemci, minimum 2 GB RAM, grafik arayüz içeren kurulumlar veya daha iyi performans için 4 GB RAM ve 20GB ek veri ve 20GB işletim sistemi için 40GB disk alanı öneriliyor. Sunucu için uzaktan erişilebilir bir arayüze sahip ILO veya BMC kart kullanılabilir. Ekran için 1024x768 veya daha üstü çözünürlük bekleniyor.

VMware vSphere, VirtualBox, KVM/QEMU, Hyper-V gibi sanallaştırma ortamları için örnek bir host sistemin minimumda yine 64-bit x86 işlemcinin Sanallaştırma uzantılarına (Intel VT-x veya AMD-V) ve en az 2 CPU çekirdeğine ihtiyacı var. 
A virtual network adapter is required, with the choice of bridged, NAT, or host-only mode depending on your configuration; bridged mode is preferred for direct network access.. A virtual network adapter is required, with the choice of bridged, NAT, or host-only mode depending on your configuration; bridged mode is preferred for direct network access.


### Açık Kaynak ve Ticari Sürüm

RHEL 9 ticari bir sürüm ama açık kaynak olma iddiasında, şirket gizlilik koşullarına uygun bir biçimde talep edildiğinde dağıtılmaması şartıyla kullanıcılarla kaynak kodu paylaşabiliyor.

2022 öncesine kadar CentOS, RHEL'in neredeyse direkt bir kopyası iken şirketin aldığı kararla farklılaşmaya gidildi. CentOS'un bu RHEL ile aynı olan fakat ücretsiz sürüm olma özelliği ortadan kalktı.
İlerleyen süreçte üçüncü taraflar, Red Hat'in ticari ve ücretsiz olmayan bileşenlerini çıkararak versiyonlar oluşturulup yeniden dağıtılabildi. 
Örnekler arasında Rocky Linux ve AlmaLinux gibi kendi toplulukları tarafından desteklenen dağıtımlar yer alıyor.

CentOS Stream, Red Hat gelişimini takip eden, sürekli güncellenen, sürekli yayınlanan bir dağıtım olarak tanıtıldı.
Gelecekteki RHEL sürümlerine sonradan dahil edilebilecek teknolojiler için bir deneme alanı görevi görüyor. Ama bu sürüm önceki CentOS sürümleri gibi RHEL'in yeniden build edilmiş hali değil.

### Pazar Payı


### RHEL'in Ürün Yaşam Döngüsü

RHEL versiyonları da her yazılım ürünü gibi bir Yaşam Döngüsüne (Product Life Cycle) ve yazılım geliştirme döngüsüne (Software Development Lifecycle - SDLC) sahip.
RHEL in her major versiyonu 3-5 yıl içerisinde çıkıyor. Major versiyon önceki versiyondan farklı bir lisansa sahip ve ana değişiklikleri içerirken minör versiyonlar ufak güncellemeleri, yamaları (patches) ve güvenlik yamalarını (security patches) içeriyor.

Tablodan görebileceğimiz üzere RHEL6 2010 yılında sürülmüş 

(Tablo)

Her bir versiyon için production (üretim) ve uzatılmış destek (extended support) süreçleri bulunuyor.


### RHEL Kaynakları


### RHEL'in BT Mimarisindeki Yeri

Bir işletim sistemi BT mimarisinde aşağıdaki gibi pek çok işleve sahip olabilir.

```
Active Directory Server (Windows sunucular için)
File Server
Mail Server
Remote Desktop Server
Application Server
Database server
Backup server
DFS server
PKI Server
Systems Management Server
```

* Azure ve AWS (Amazon Web Services) üzerinden RedHat imajları sanal makineler olarak yüklenebiliyor.

* Uygulama sunucusu olarak JBoss EAP, Nginx ve Apache Tomcat'i örnek olarak verebiliriz.
JBoss EAP: Java tabanlı uygulamalar için bir uygulama sunucusudur ve RHEL9 üzerinde kurumsal uygulamaları çalıştırmak için kullanılabilir.
Nginx: Yük dengeleyici ve web sunucusudur ve RHEL9 üzerinde yüksek performanslı web hizmetleri sağlamak için kullanılabilir.
Apache Tomcat: Java tabanlı web uygulama sunucusudur ve RHEL9 üzerinde Java servlet ve JSP tabanlı uygulamaları çalıştırmak için kullanılabilir.

* Veritabanı sunucusu olarak MongoDB, MySQL ve PostgreSQL örnek olarak verilebilir.

### RHEL ve Diğer Araçlar
* Podman: Docker'a benzer bir konteyner yönetim aracı. RHEL9 üzerinde konteynerleri yönetmek için kullanılır.
* Satellite: RHEL sistemlerini yönetmek ve güncellemek için kullanılan araç.
* OpenStack: Bulut altyapısı oluşturma ve yönetme platformu. RHEL9 üzerinde bulut çözümleri geliştirmek için kullanılıyor.
* Puppet: IT altyapı yönetim aracı. RHEL9 üzerinde konfigürasyon yönetimi için kullanılabilir.
* Terraform: Infrastructure as Code (IaC) aracı. RHEL9 üzerinde altyapıyı kod olarak tanımlamak için kullanılır.
* Ansible: Otomasyon aracı. RHEL9 üzerinde yazılım kurulumlarını ve yapılandırmalarını otomatikleştirmek için kullanılır.
* Kubernetes: Konteyner orkestrasyon aracı. RHEL9 üzerinde konteyner uygulamalarını yönetmek için kullanılır.
* OpenShift: Kubernetes tabanlı bir konteyner platformu. RHEL9 üzerinde bulut yerel uygulamaları dağıtmak için kullanılır.
* GitLab: DevOps platformu. RHEL9 üzerinde kod yönetimi ve CI/CD süreçlerinde kullanılır.
* Jenkins: Sürekli entegrasyon ve sürekli teslimat (CI/CD) aracı. RHEL9 üzerinde yazılım geliştirme süreçlerini otomatikleştirmek için kullanılabilir.




### Kaynaklar
