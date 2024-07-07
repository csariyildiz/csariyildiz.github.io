---
layout: post3
title: "RHEL Hakkında"
category: linux
number: 1
desc: "RHEL Hakkında"
---


## Red Hat Enterprise Linux (RHEL) Nedir?

Red Hat Enterprise Linux (RHEL), Red Hat tarafından geliştirilen ticari bir Linux dağıtımı. 
Sağlamlık ve güvenlik konusunda ek geliştirmeler ve bir çok araç ile kurumsal düzeyde kullanıma odaklanıyor. 
Red Hat işletim sisteminin 4, 5, 6, 7, 8 ve 9 olmak üzere çeşitli versiyonları bulunmakta. 
Bu yazının yazıldığı tarih itibarıyla en son sürüm, Mayıs 2022'de piyasaya sürülen "Plow" lakaplı RHEL 9. 
Saban anlamına gelen"Plow" adı, RHEL'in kurucularından biri olan ve RHEL mühendislik ekibinin eski lideri Tim Burke'ün Appalachian Trail (doğa yürüyüşü) takma adından geliyor.


### CPU Mimarileri

RHEL, x86-64, Power ISA, ARM64 ve IBM Z dahil olmak üzere birden fazla CPU mimarisini destekliyor. 
x86-64 bildiğimiz üzere genellikle masaüstü bilgisayarlarda ve sunucularda kullanılır. 
Power ISA kurumsal sunucularda kullanılan IBM mimarisi. 
ARM64 bildiğimiz üzere ARM tabanlı sistemlerde kullanılıyor, hem sunucularda hem de gömülü sistemlerde giderek daha popüler hale geliyor. 
IBM Z IBM'in ana bilgisayar sistemlerinde kullanılıyor. 

### Kernel ve Gnome

RHEL 9'u komut satırı arayüzü ile yükleyebileceğimiz gibi x86-64 için bir masaüstü sürümü ile de yükleyebiliyoruz. 
RHEL 9 sürümü, Linux Kernel 5.14.0 ve Gnome 40 ile beraber kullanılıyor.
Bash komut satırı arayüzüne (CLI) ek olarak GUI arayüzü olarak Gnome Shell'i kullanıyor.
Diğer Linux dağıtımlarının çoğunun ve çekirdek Unix yardımcı programlarının yeteneklerine sahip.

### Paket Yönetimi

RHEL, paket yönetimi için DNF ve YUM adında iki ana aracı var. Hem DNF (Dandified YUM) hem de YUM (Yellowdog Updater, Modified), RPM tabanlı paketlerle çalışıyorlar.
RHEL için favori olan DNF'in zamanla YUM'un yerini alması amaçlanıyor. (DNF bağımlılık çözümlemesini daha verimli bir şekilde gerçekleştirmek için tasarlanmış. )

DNF ve YUM'a ek olarak RPM (Red Hat Paket Yöneticisi) rpm komutu ile RPM formatındaki yazılım paketlerini kurmak, güncellemek, sorgulamak, doğrulamak ve kaldırmak için kullanılıyor.

### Sistem Gereksinimleri


### Açık Kaynak ve Ticari Sürüm

RHEL 9 ticari bir sürüm ama açık kaynak olma iddiasında, şirket gizlilik koşullarına uygun bir biçimde talep edildiğinde dağıtılmaması şartıyla kullanıcılarla kaynak kodu paylaşabiliyor.

2022 öncesine kadar CentOS, RHEL'in neredeyse direkt bir kopyası iken şirketin aldığı kararla farklılaşmaya gidildi. CentOS'un bu RHEL ile aynı olan fakat ücretsiz sürüm olma özelliği ortadan kalktı.
İlerleyen süreçte üçüncü taraflar, Red Hat'in ticari ve ücretsiz olmayan bileşenlerini çıkararak versiyonlar oluşturulup yeniden dağıtılabildi. 
Örnekler arasında Rocky Linux ve AlmaLinux gibi kendi toplulukları tarafından desteklenen dağıtımlar yer alıyor.

CentOS Stream, Red Hat gelişimini takip eden, sürekli güncellenen, sürekli yayınlanan bir dağıtım olarak tanıtıldı.
Gelecekteki RHEL sürümlerine sonradan dahil edilebilecek teknolojiler için bir deneme alanı görevi görüyor. Ama bu sürüm önceki CentOS sürümleri gibi RHEL'in yeniden build edilmiş hali değil.

### Pazar Payı



### RHEL'in BT Mimarisindeki Yeri


### RHEL ve Diğer Redhat Teknolojileri

### RHEL'in Ürün Yaşam Döngüsü

RHEL versiyonları da her yazılım ürünü gibi bir Yaşam Döngüsüne (Product Life Cycle) ve yazılım geliştirme döngüsüne (Software Development Lifecycle - SDLC) sahip.
RHEL in her major versiyonu 3-5 yıl içerisinde çıkıyor. Major versiyon önceki versiyondan farklı bir lisansa sahip ve ana değişiklikleri içerirken minör versiyonlar ufak güncellemeleri, yamaları (patches) ve güvenlik yamalarını (security patches) içeriyor.

Tablodan görebileceğimiz üzere RHEL6 2010 yılında sürülmüş 

(Tablo)

Her bir versiyon için production (üretim) ve uzatılmış destek (extended support) süreçleri bulunuyor.
