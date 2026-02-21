---
layout: post
title: Linux İşletim Sistemlerinde Aygıt İncelemesi
tags: [Linux, Boot]
---

### Donanım Cihazları

Bir Linux cihazı kullanmaya başladığında ihtiyaç duyacağı ilk şeylerden biri, sistemde hangi donanımların bulunduğunu ve bunların nasıl çalıştığını öğrenmektir.
Bir bilgisayar temel olarak şu bileşenlerden oluşur:
* İşlemci (CPU) – Komutları çalıştırır.
* Bellek (RAM) – Çalışan programların geçici verilerini tutar.
* Disk (SSD / HDD / NVMe) – Kalıcı veri depolama alanıdır.
* Giriş aygıtları – Klavye, mouse gibi kullanıcı etkileşim araçları.
* Çıkış aygıtları – Ekran (GPU üzerinden), hoparlör vb.
* Ağ arayüzü – Ethernet ya da Wi-Fi kartı.

Uygulamalar donanımları doğrudan kullanmaz; bunun yerine işletim sisteminin sunduğu arayüzleri kullanır. İşletim sistemi, uygulamalar ile donanım arasında bir soyutlama katmanı görevi görür.

Bir uygulama ekrana yazı yazmak, dosya okumak ya da ağ üzerinden veri göndermek istediğinde donanıma doğrudan erişmez. 
Bunun yerine sistem çağrıları (system calls) aracılığıyla çekirdeğe (kernel) başvurur. Kernel, bu isteği alır ve ilgili sürücü (driver) üzerinden donanımla iletişim kurar.

Kernel uygun driver’ı belirler. Driver donanımın teknik seviyesinde işlem yapar. Sonuç tekrar kernel üzerinden uygulamaya döner. Bu yapı sayesinde sistem hem güvenli hem de donanımdan bağımsız çalışabilir.
Eğer ilgili driver kernel’e gömülü değilse ve modül olarak derlenmişse, burada: Gerekirse ilgili driver (kernel modülü) devreye girer. Bu modül zaten yüklüyse kullanılır; değilse sistem modprobe mekanizması ile yükleyebilir.

---

### Kernel Uygun Driver’ı Nasıl Belirler?

Bir donanım sistemde bulunduğunda (örneğin bir PCI aygıtı, USB cihazı ya da disk), kernel bu cihazı tanımlar ve ona bir kimlik atar.

Örneğin:
* PCI cihazları → Vendor ID ve Device ID ile
* USB cihazları → VID / PID ile
* Platform cihazları → ACPI veya Device Tree ile tanımlanır.

Kernel, sistem açılırken veya yeni bir cihaz takıldığında donanımı tarar (enumeration). Her cihaz için bir tanımlayıcı oluşturur ve bunu sistem içi veri yapılarında saklar.

Not: Platform cihazları fiziksel olarak sistemin üzerinde sabit bulunan ve varlığı firmware (ACPI veya Device Tree) tarafından bildirilen donanımdır. Anakartın içindeki bu entegre bileşenler ACPI üzerinden bildirilen güç yönetimi aygıtları, dahili kontrol birimleri, bazı legacy donanımlar olabilir.

Sistem açıldığında veya cihaz takıldığında süreç şu şekilde ilerler:
* Donanım algılanır
* Kernel cihaz kimliğini belirler
* Uygun driver araştırılır
* Gerekirse modprobe ile modül yüklenir
* Driver cihaza bağlanır (bind)
* Donanım kullanılabilir hale gelir

---

### Aygıt İnceleme Komutları: `lspci` ve `lsusb`

Linux’ta sistemde bulunan donanımları incelemek için kullanılan temel komutlardan ikisi:

- `lspci`
- `lsusb`

Bu komutlar, kernel’in tanıdığı aygıtları ilgili bus (veriyolu) üzerinden listeler.

---

### lspci – PCI Aygıtlarını Listeleme

`lspci` komutu, sistemdeki PCI ve PCIe cihazlarını gösterir.

PCI üzerinden bağlanan tipik cihazlara şunlar örnek verilebilir:

- Ekran kartı (GPU)
- Ethernet kartı
- NVMe kontrolcüsü
- SATA kontrolcüsü
- Ses kartı

Basit kullanım:

```
lspci
```

Örnek çıktı:

```
00:02.0 VGA compatible controller: Intel Corporation UHD Graphics 620
00:14.0 USB controller: Intel Corporation USB 3.0 Controller
00:1f.2 SATA controller: Intel Corporation SATA Controller
```

---

### Daha Detaylı Bilgi

Detaylı bilgi için:

```
lspci -v
```

Kullanılan driver bilgisini görmek için:

```
lspci -k
```

Bu çıktı şunları gösterir:

- Cihaz bilgisi
- Kullanılan kernel driver (`kernel driver in use`)
- Yüklenebilir alternatif kernel modülleri (`kernel modules`)

Bu özellikle driver sorunlarını teşhis etmek için kritiktir.

---

### Belirli Bir Cihazı İncelemek

`-s` opsiyonu ile belirli bir PCI adresine sahip cihazı görüntüleyebiliriz:

```
lspci -s 04:02.0 -v

04:02.0 Network controller: Ralink corp. RT2561/RT61 802.11g PCI
    Subsystem: Linksys WMP54G v4.1
    Flags: bus master, slow devsel, latency 32, IRQ 21
    Memory at e3100000 (32-bit, non-prefetchable) [size=32K]
    Capabilities: [40] Power Management version 2
    kernel driver in use: rt61pci
```

Buradaki önemli satır:

```
kernel driver in use: rt61pci
```

Bu, cihazın şu anda aktif olarak hangi driver tarafından yönetildiğini gösterir.

---

### Birden Fazla Modül Durumu

Aşağıdaki örnekte bir NVIDIA GPU için driver bilgisi görülmektedir:

```
lspci -s 01:00.0 -k
```

```
01:00.0 VGA compatible controller: NVIDIA Corporation GM107 [GeForce GTX 750 Ti] (rev a2)
    kernel driver in use: nvidia
    kernel modules: nouveau, nvidia_drm, nvidia
```

Burada:

- `kernel driver in use: nvidia`  Aktif olarak kullanılan driver.
- `kernel modules:`  Bu cihaz için uygun olabilecek diğer modüller.

Bu durum özellikle açık kaynak (`nouveau`) ve kapalı kaynak (`nvidia`) driver’lar arasında geçiş yaparken önemlidir.

---

### lsusb – USB Aygıtlarını Listeleme

`lsusb` komutu, sistemdeki USB bus üzerinde bulunan aygıtları listeler.

USB üzerinden bağlanan tipik cihazlara Klavye, Mouse, USB bellek, Webcam, Harici disk, Bluetooth adaptörü, Wi-Fi adaptörü örnek verilebilir:

- Vendor ID ve Product ID driver eşleşmesi için kritiktir.
- USB cihazlar hotplug destekler.
- Gerekli driver modül olarak yüklenebilir.

Bu komut, özellikle USB aygıtlarının algılanıp algılanmadığını kontrol etmek için temel teşhis aracıdır.

Basit kullanım:

```
lsusb
Bus 001 Device 029: ID 1781:0c9f Multiple Vendors USBtiny
Bus 001 Device 028: ID 093a:2521 Pixart Imaging, Inc. Optical Mouse
Bus 001 Device 020: ID 1131:1001 Integrated System Solution Corp. KY-BT100 Bluetooth Adapter
Bus 001 Device 011: ID 04f2:0402 Chicony Electronics Co., Ltd Genius LuxeMate i200 Keyboard
Bus 001 Device 007: ID 0424:7800 Standard Microsystems Corp.
Bus 001 Device 003: ID 0424:2514 Standard Microsystems Corp. USB 2.0 Hub
Bus 001 Device 002: ID 0424:2514 Standard Microsystems Corp. USB 2.0 Hub
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

Bu çıktıda:

- `Bus 002` → Cihazın bağlı olduğu USB bus numarası
- `Device 003` → Aygıt numarası
- `046d` → Vendor ID (Üretici kimliği)
- `c534` → Product ID (Ürün kimliği)

Vendor ve Product ID bilgileri, hangi driver’ın kullanılacağını belirlemede önemlidir.

---

### Detaylı Bilgi

Daha ayrıntılı bilgi için:

```
lsusb -v
```

Bu komut cihaz sınıfını (Device Class), güç tüketimini, desteklenen protokolleri ve endpoint bilgilerini gösterir.

---

### Belirli Bir Cihazı İncelemek

Belirli bir bus ve device numarasına sahip cihazı incelemek için:

```
$ lsusb -v -d 1781:0c9f
Bus 001 Device 029: ID 1781:0c9f Multiple Vendors USBtiny
Device Descriptor:
  bLength                18
  bDescriptorType         1
  bcdUSB               1.01
  bDeviceClass          255 Vendor Specific Class
  bDeviceSubClass         0
  bDeviceProtocol         0
  bMaxPacketSize0         8
  idVendor           0x1781 Multiple Vendors
  idProduct          0x0c9f USBtiny
  bcdDevice            1.04
  iManufacturer           0
  iProduct                2 USBtiny
  iSerial                 0
  bNumConfigurations      1
```
  
---

### USB Cihazların Farklılığı

USB cihazları dinamik olarak (hotplug) bağlanıp çıkarılabilir. Bir USB aygıt takıldığında süreç şu şekilde işler:
* USB cihaz takılır
* Kernel USB bus üzerinden cihazı algılar
* Vendor ID / Product ID okunur
* Uygun driver aranır
* Gerekirse modül yüklenir (modprobe)
* Cihaz kullanılabilir hale gelir

---

### Driver Kontrolü

USB cihazı için hangi driver’ın kullanıldığını görmek için:

```
dmesg | grep -i usb
```

veya

```
lsmod
```

komutları kullanılabilir.

---


---

### `lsusb -t` Çıktısı

```
$ lsusb -t
/:  Bus 01.Port 1: Dev 1, Class=root_hub, Driver=dwc_otg/1p, 480M
    |__ Port 1: Dev 2, If 0, Class=Hub, Driver=hub/4p, 480M
        |__ Port 1: Dev 3, If 0, Class=Hub, Driver=hub/3p, 480M
            |__ Port 2: Dev 11, If 1, Class=Human Interface Device, Driver=usbhid, 1.5M
            |__ Port 2: Dev 11, If 0, Class=Human Interface Device, Driver=usbhid, 1.5M
            |__ Port 3: Dev 20, If 0, Class=Wireless, Driver=btusb, 12M
            |__ Port 3: Dev 20, If 1, Class=Wireless, Driver=btusb, 12M
            |__ Port 3: Dev 20, If 2, Class=Application Specific Interface, Driver=, 12M
            |__ Port 1: Dev 7, If 0, Class=Vendor Specific Class, Driver=lan78xx, 480M
            |__ Port 2: Dev 28, If 0, Class=Human Interface Device, Driver=usbhid, 1.5M
            |__ Port 3: Dev 29, If 0, Class=Vendor Specific Class, Driver=, 1.5M
```

Bu komut USB aygıtlarını ağaç (tree) yapısında gösterir ve:

- Bağlı olduğu port
- Cihaz sınıfı (Class)
- Kullanılan driver (varsa)

bilgilerini içerir.

Eğer aygıt için eşleşen bir kernel modülü varsa, satırın sonunda şu şekilde görünür:

```
Driver=btusb
```

Buradaki `Driver=` alanı, cihazın hangi kernel modülü tarafından yönetildiğini gösterir.

---

### Device Class Nedir?

`Class` alanı cihazın genel kategorisini belirtir. Örneğin:

- **Human Interface Device (HID)** → Klavye, mouse
- **Wireless** → Kablosuz adaptörler
- **Mass Storage** → USB bellek, harici disk
- **Vendor Specific Class** → Üreticiye özel cihazlar

Bu bilgi, hangi tür driver’ın gerekli olabileceğini anlamaya yardımcı olur.

---

### Belirli Bir Cihazı Kontrol Etme

Örneğin önceki listede `btusb` modülünü kullanan bir cihaz olduğunu varsayalım.

Bu cihazı detaylı görmek için hem **Bus** hem de **Device (Dev)** numarası verilmelidir:

```
lsusb -s 01:20
```

Örnek çıktı:

```
Bus 001 Device 020: ID 1131:1001 Integrated System Solution Corp. KY-BT100 Bluetooth Adapter
```

Burada:

- `01`: Bus numarası
- `20`: Device numarası

Bu bilgiler `lsusb` çıktısından alınır.


### USB Aygıtları ve Modül İlişkisi

Her aygıt için mutlaka ayrı bir kernel modülü bulunması gerekmez.  
Bazı cihazlarla iletişim, özel bir kernel modülü olmadan da gerçekleştirilebilir. Bu durum genellikle:

- Standart USB sınıfları (örneğin HID – klavye/mouse)
- Kullanıcı alanındaki (user space) kütüphaneler aracılığıyla erişilen cihazlar

için geçerlidir. Buna rağmen `lsusb -t` komutu önemli bilgiler sağlar.


---

### Yüklü Kernel Modüllerini Görüntüleme

Standart bir Linux sisteminde genellikle çok sayıda kernel modülü yüklü durumdadır.

Bu modüllerle etkileşim kurmanın en doğru yolu, **kmod** paketinin sağladığı araçları kullanmaktır.

`kmod` araçları şunları yapabilir:

- Modül yükleme
- Modül kaldırma
- Modül listeleme
- Bağımlılık çözme
- Alias kontrolü
- Modül özelliklerini inceleme

Örneğin:

```
lsmod
Module                  Size  Used by
kvm_intel             138528  0
kvm                   421021  1 kvm_intel
iTCO_wdt               13480  0
iTCO_vendor_support    13419  1 iTCO_wdt
snd_usb_audio         149112  2
snd_hda_codec_realtek  51465  1
snd_ice1712            75006  3
snd_hda_intel          44075  7
arc4                   12608  2
snd_cs8427             13978  1 snd_ice1712
snd_i2c                13828  2 snd_ice1712,snd_cs8427
snd_ice17xx_ak4xxx     13128  1 snd_ice1712
snd_ak4xxx_adda        18487  2 snd_ice1712,snd_ice17xx_ak4xxx
microcode              23527  0
snd_usbmidi_lib        24845  1 snd_usb_audio
gspca_pac7302          17481  0
gspca_main             36226  1 gspca_pac7302
videodev              132348  2 gspca_main,gspca_pac7302
```

`lsmod` komutu, o anda kernel içine yüklenmiş tüm modülleri listeler.

Bu çıktı genellikle şu bilgileri içerir:
- **Module**: Modül adı  
- **Size**: Bellekte kapladığı alan  
- **Used by**: Kaç bileşen tarafından kullanıldığı  

---

### Belirli Bir Modülü Arama

```
lsmod | fgrep -i snd_hda_intel
```

Belirtilen modülün yüklü olup olmadığını kontrol eder.

---

### Modülleri Boyutuna Göre Sıralama

```
lsmod | sort -k2,2nr | head
```

Modülleri boyutlarına göre büyükten küçüğe sıralar ve en büyükleri gösterir.

---

### Modül Kaldırma (Canlı Sistemden)

```
sudo modprobe -r snd_hda_intel
```

Belirtilen modülü ve ona bağlı modülleri sistemden kaldırır.  
Bu işlem canlı sistem üzerinde yapılır (live unload).

---

### Modül Hakkında Bilgi Alma

```
modinfo -p nouveau
```

Belirtilen modülün:

- Parametrelerini
- Açıklamalarını
- Versiyon bilgisini
- Lisans bilgisini

gösterir.

---

## Kalıcı Ayarlar (Persistent Configuration)

Geçici olarak yapılan modül ayarları sistem yeniden başlatıldığında kaybolur.  
Kalıcı yapılandırma için `modprobe` konfigürasyon dosyaları kullanılır.

### Konfigürasyon Dizini

```
/etc/modprobe.d/
```

Bu dizin altına `.conf` uzantılı dosyalar eklenir.

Örnek:

```
/etc/modprobe.d/nouveau.conf
```

---

### Modül Parametresi Ekleme

Örneğin `nouveau` modülünde modeset özelliğini kapatmak için:

```
options nouveau modeset=0
```

Bu ayar:

- Kernel modeset özelliğini devre dışı bırakır.
- Özellikle NVIDIA proprietary driver kurulumu öncesinde kullanılır.

---

## Modül Kara Listeye Alma (Blacklist)

Bir modülün otomatik yüklenmesini engellemek için blacklist kullanılabilir.

Genel blacklist dosyası:

```
/etc/modprobe.d/blacklist.conf
```

İçine şu satır eklenebilir:

```
blacklist nouveau
```

Ancak tercih edilen yöntem, ayrı bir dosya oluşturmaktır:

```
/ etc /modprobe.d/nouveau-blacklist.conf
```

İçeriği:

```
blacklist nouveau
```

Bu yöntem daha düzenli ve yönetilebilir olduğu için önerilir.

---
