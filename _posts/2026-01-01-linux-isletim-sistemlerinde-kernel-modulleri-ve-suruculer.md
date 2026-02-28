---
layout: post
title: Linux İşletim Sistemlerinde Kernel Modülleri ve Sürücüler
tags: [Linux, Driver, Kernel]
---


İçindekiler:
* Donanım ve Kernel İlişkisi
* Aygıt İnceleme Komutları: lspci ve lsusb
* Kernel Modüllerinin İncelenmesi

### Donanım ve Kernel İlişkisi

Bir bilgisayar donanımı temel olarak aşağıdaki bileşenlerden oluşur:
* İşlemci (CPU) – Komutları çalıştırır.
* Bellek (RAM) – Çalışan programların geçici verilerini tutar.
* Disk (SSD / HDD / NVMe) – Kalıcı veri depolama alanıdır.
* Giriş aygıtları – Klavye, mouse gibi kullanıcı etkileşim araçları.
* Çıkış aygıtları – Ekran (GPU üzerinden), hoparlör vb.
* Ağ arayüzü – Ethernet ya da Wi-Fi kartı.

* Uygulamaların Donanıma Erişimi : Bir uygulama ekrana yazı yazmak, dosya okumak ya da ağ üzerinden veri göndermek istediğinde sistem çağrıları (system calls) aracılığıyla çekirdeğe (kernel) başvurur. Kernel, bu isteği alır ve ilgili sürücü (driver) üzerinden donanımla iletişim kurar. Kernel uygun driver’ı belirler. Driver donanımın teknik seviyesinde işlem yapar. Sonuç tekrar kernel üzerinden uygulamaya döner. Bu yapı sayesinde sistem hem güvenli hem de donanımdan bağımsız çalışabilir.

* Driver ve Kernel İlişkisi: Linux’ta her sürücü ya kernel içine gömülü olarak derlenmiştir ya da yüklenebilir bir kernel modülü olarak bulunur. Eğer ilgili driver kernel’e gömülü değilse ve modül olarak derlenmişse, burada: Gerekirse ilgili driver (kernel modülü) devreye girer. Bu modül zaten yüklüyse kullanılır; değilse sistem modprobe mekanizması ile yükleyebilir.

* Kernel modülleri çalışan bir sistemde yüklenip kaldırılabileceği gibi kalıcı olarak da yüklenip kaldırılması sağlanabilir. 


#### Kernel Uygun Driver’ı Nasıl Belirler?

Bir donanım sistemi üzerinde bulunduğunda (örneğin PCI aygıtı, USB cihazı veya disk), kernel bu donanımı algılar ve kimliğini belirler. Bu kimlik, aygıtın bağlı olduğu veri yoluna göre farklı şekilde tanımlanır:

* PCI cihazları → Vendor ID ve Device ID ile
* USB cihazları → VID / PID ile
* Platform cihazları → ACPI veya Device Tree ile tanımlanır.

Platform cihazları, fiziksel olarak sistem üzerinde sabit bulunan ve varlığı firmware (ACPI ya da Device Tree) tarafından bildirilen entegre bileşenlerdir. Örneğin güç yönetimi denetleyicileri, dahili kontrol birimleri veya anakart üzerindeki bazı yerleşik donanımlar bu kapsama (ACPI) girer.

Sistem açılışında ya da yeni bir cihaz takıldığında kernel ilgili veri yolunda bir enumeration (tarama) işlemi yapar. Bu süreçte:

1. Donanım algılanır.
2. Aygıtın kimlik bilgileri okunur.
3. Kernel, kendi içinde kayıtlı sürücü listesiyle bu kimliği eşleştirir.

Linux’ta sürücüler (driver), ya doğrudan kernel içine gömülü olabilir ya da yüklenebilir kernel modülü olarak bulunabilir. Eğer eşleşen sürücü kernel içinde yerleşik değilse, userspace tarafında çalışan mekanizma (örneğin udev) gerekli kernel modülünü otomatik olarak yükler (modprobe çağrısı ile).

Uygun sürücü bulunduğunda:

1. Sürücü aygıt ile eşleşir (bind edilir)
2. Sürücü aygıt için gerekli başlatma işlemlerini yapar
3. Donanım sistem tarafından kullanılabilir hale gelir

Özetle kernel, donanımı kimlik bilgilerine göre tanımlar, bu kimliği sürücülerin destek listesiyle eşleştirir ve uygun sürücüyü yükleyip aygıta bağlayarak cihazı aktif hale getirir.

---

### Aygıt İnceleme Komutları: lspci ve lsusb

Linux’ta sistemde bulunan donanımları incelemek için kullanılan temel komutlardan ikisi:

- `lspci`
- `lsusb`

* Bu komular ile PCI ve USB cihazların detay bilgisinin yanında kernel modülleri ile ilişkisini de görüntüleyebiliriz.
* Bu komutlar, kernel’in tanıdığı aygıtları ilgili bus (veriyolu) üzerinden listeler.

---

#### lspci – PCI Aygıtlarını Listeleme

`lspci` komutu, sistemdeki PCI ve PCIe cihazlarını gösterir.

PCI üzerinden bağlanan tipik cihazlara şunlar örnek verilebilir:

- Ekran kartı (GPU)
- Ethernet kartı
- NVMe kontrolcüsü
- SATA kontrolcüsü
- Ses kartı

Örneğin bir harici PCI video kartını inceliyor olalım:


```
lspci
00:02.0 VGA compatible controller: Intel Corporation UHD Graphics 620
00:14.0 USB controller: Intel Corporation USB 3.0 Controller
00:1f.2 SATA controller: Intel Corporation SATA Controller
```

Daha detaylı bilgi için listedeki id kullanılabilir:

```bash
lspci -s <id> -k
lspci -s <id> -v
```

Bu çıktı şunları gösterir:

- Cihaz bilgisi
- Kullanılan kernel driver (`kernel driver in use`)
- Yüklenebilir alternatif kernel modülleri (`kernel modules`)

Bu özellikle driver sorunlarını teşhis etmek için kritiktir.


Aşağıdaki örnekte bir wireless kartı driver bilgisi görülmektedir:

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

```
[acs@archlinux ~]$ lspci -s 02:00.0 -v
02:00.0 Network controller: Intel Corporation Wireless 8265 / 8275 (rev 78)
        Subsystem: Intel Corporation Dual Band Wireless-AC 8265 [Windstorm Peak]
        Flags: bus master, fast devsel, latency 0, IRQ 133
        Memory at ef100000 (64-bit, non-prefetchable) [size=8K]
        Capabilities: <access denied>
        Kernel driver in use: iwlwifi
        Kernel modules: iwlwifi
```

---

#### Birden Fazla Modül Durumu

Aşağıdaki örnekte bir NVIDIA GPU için driver bilgisi görülmektedir:

```
[acs@archlinux ~]$ lspci -s 01:00.0 -k
01:00.0 3D controller: NVIDIA Corporation GP108M [GeForce MX150] (rev a1)
        Subsystem: ASUSTeK Computer Inc. Device 163e
        Kernel driver in use: nvidia
        Kernel modules: nouveau, nvidia_drm, nvidia

[acs@archlinux ~]$ lspci -s 01:00.0 -v
01:00.0 3D controller: NVIDIA Corporation GP108M [GeForce MX150] (rev a1)
        Subsystem: ASUSTeK Computer Inc. Device 163e
        Flags: bus master, fast devsel, latency 0, IRQ 134
        Memory at ee000000 (32-bit, non-prefetchable) [size=16M]
        Memory at d0000000 (64-bit, prefetchable) [size=256M]
        Memory at e0000000 (64-bit, prefetchable) [size=32M]
        I/O ports at e000 [size=128]
        Expansion ROM at ef000000 [virtual] [disabled] [size=512K]
        Capabilities: <access denied>
        Kernel driver in use: nvidia
        Kernel modules: nouveau, nvidia_drm, nvidia
```

Burada:

- `kernel driver in use: nvidia`:  Aktif olarak kullanılan driver.
- `kernel modules:..`:  Bu cihaz için uygun olabilecek diğer modüller.

Bu durum özellikle açık kaynak (`nouveau`) ve kapalı kaynak (`nvidia`) driver’lar arasında geçiş yaparken önemlidir.

---

#### lsusb – USB Aygıtlarını Listeleme

`lsusb` komutu, sistemdeki USB bus üzerinde bulunan aygıtları listeler.

USB üzerinden bağlanan tipik cihazlara şunlar örnek verilebilir: 

- Klavye
- Mouse
- USB bellek
- Webcam
- Harici disk
- Bluetooth adaptörü
- Wi-Fi adaptörü


Örneğin cihaz üzerindeki Bluetooth adaptörü inceliyor olalım:

```
[acs@archlinux ~]$ lsusb
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 002: ID 13d3:5a07 IMC Networks VGA UVC WebCam
Bus 001 Device 003: ID 8087:0a2b Intel Corp. Bluetooth wireless interface
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
```

Bluetooth adaptörü listede görüyoruz.

Tek satırda görüntülemek için `lsusb -s <busid>:<devid>` kullanılır:

```
[acs@archlinux ~]$ lsusb -s 01:03
Bus 001 Device 003: ID 8087:0a2b Intel Corp. Bluetooth wireless interface
```

Bu çıktıda:

- `Bus 001`: Cihazın bağlı olduğu USB bus numarası
- `Device 003`: Aygıt numarası
- `8087`: Vendor ID (Üretici kimliği)
- `0a2b`: Product ID (Ürün kimliği)

Vendor ve Product ID bilgileri, hangi driver’ın kullanılacağını belirlemede önemlidir.

Burada driver veya modül bilgisini henüz göremiyoruz.

Benzer olarak `lsusb -t` komutunu da kullanabilirdik.

```
[acs@archlinux ~]$ lsusb -t
/:  Bus 001.Port 001: Dev 001, Class=root_hub, Driver=xhci_hcd/12p, 480M
    |__ Port 006: Dev 002, If 0, Class=Video, Driver=uvcvideo, 480M
    |__ Port 006: Dev 002, If 1, Class=Video, Driver=uvcvideo, 480M
    |__ Port 008: Dev 003, If 0, Class=Wireless, Driver=btusb, 12M
    |__ Port 008: Dev 003, If 1, Class=Wireless, Driver=btusb, 12M
/:  Bus 002.Port 001: Dev 001, Class=root_hub, Driver=xhci_hcd/6p, 5000M
```

Bu komut USB aygıtlarını ağaç (tree) yapısında gösterir ve:

- Bağlı olduğu port
- Cihaz sınıfı (Class)
- Kullanılan driver (varsa) bilgilerini içerir.

Eğer aygıt için eşleşen bir kernel modülü varsa, satırın sonunda şu şekilde görünür:

```
Driver=btusb
```

Buradaki `Driver=` alanı, cihazın hangi kernel modülü tarafından yönetildiğini gösterir.

Bluetooth adaptörünün kullandığı `btusb` hem bir driver hem de bir kernel modülü olduğunu görüyoruz.

Modinfo komutunu kullanarak ilgili modülün detaylarını görebiliriz:

```
[acs@archlinux ~]$ modinfo btusb
filename:       /lib/modules/6.17.9-arch1-1/kernel/drivers/bluetooth/btusb.ko.zst
license:        GPL
version:        0.8
description:    Generic Bluetooth USB driver ver 0.8
author:         Marcel Holtmann <marcel@holtmann.org>
srcversion:     6A8C48A720E1F879F7AFCAF
alias:          usb:v8087p0A5Ad*dc*dsc*dp*ic*isc*ip*in*
alias:          usb:v0930p*d*dc*dsc*dp*icFFisc01ip01in*
alias:          usb:v413Cp*d*dc*dsc*dp*icFFisc01ip01in*
alias:          usb:v13D3p*d*dc*dsc*dp*icFFisc01ip01in*
alias:          usb:v050Dp*d*dc*dsc*dp*icFFisc01ip01in*
```

Yine daha detaylı bilgi için `lsusb -v -d <busid>:<devid>` komutunu kullanabiliriz:

```
$ lsusb -v -d 8087:0a2b
Bus 001 Device 003: ID 8087:0a2b Intel Corp. Bluetooth wireless interface
Negotiated speed: Full Speed (12Mbps)
Device Descriptor:
  bLength                18
  bDescriptorType         1
  bcdUSB               2.00
  bDeviceClass          224 Wireless
  bDeviceSubClass         1 Radio Frequency
  bDeviceProtocol         1 Bluetooth
  bMaxPacketSize0        64
  idVendor           0x8087 Intel Corp.
  idProduct          0x0a2b Bluetooth wireless interface
  bcdDevice            0.10
  iManufacturer           0
  iProduct                0
  iSerial                 0
  bNumConfigurations      1
  Configuration Descriptor:
    bLength                 9
 ...   
```

`lsusb -v -d <busid>:<devid>` donanım hakkında detaylı bilgi verir, ancak o donanımı hangi modülün (sürücünün) kontrol ettiğini doğrudan söylemez.

Sonuç olarak İlgili modülü görüntülemenin en kolay yolunun `lsusb -t` komutu olduğunu gördük. 

---

#### USB Cihazların Farklılığı

Doğal olarak USB cihazları ve PCI cihazları arasında farklılıklar bulunur. USB cihazları dinamik olarak (hotplug) bağlanıp çıkarılabilir. 

Bir USB aygıt takıldığında süreç şu şekilde işler:
* USB cihaz takılır
* Kernel USB bus üzerinden cihazı algılar
* Vendor ID / Product ID okunur
* Uygun driver aranır
* Gerekirse modül yüklenir (modprobe)
* Cihaz kullanılabilir hale gelir

---

#### Device Class Nedir?


`lsusb` komutlarında gördüğümüz `Class` alanı cihazın genel kategorisini belirtir. 
 
 Örneğin:
- **Human Interface Device (HID)** → Klavye, mouse
- **Wireless** → Kablosuz adaptörler
- **Mass Storage** → USB bellek, harici disk
- **Vendor Specific Class** → Üreticiye özel cihazlar

Bu bilgi usb cihazları sınıflandırmanın yanında hangi tür driver’ın gerekli olabileceğini anlamaya yardımcı olur.

---

## Kernel Modüllerinin İncelenmesi

Kernel modülleri (veya tam adıyla Loadable Kernel Module - LKM), işletim sisteminin çekirdeğine (kernel) özellik ekleyip çıkarmaya yarayan kod parçalarıdır.

Modüller olmasa dünyadaki her türlü fare, klavye, ekran kartı ve Wi-Fi adaptörünün sürücüsünü kernel'ın içine gömmek zorunda kalınırdı. Bu da kernel'ın devasa boyutta olmasına ve sistemin çok yavaş açılmasına neden olurdu.

Her modül bir driver (sürücü) değildir. Sürücüler haricinde sistemde aşağıdaki gibi modüller bulunebilir:
- Dosya Sistemi Modülleri (ext4, xfs, vfat, ntfs3 veya isofs)
- Ağ ve Güvenlik Modülleri (Netfilter / Iptables)
- Kriptografi (Şifreleme) Modülleri
- Sanallaştırma Modülleri

Örnek bir sistemde yüklü modül sayısı:

```
[acs@archlinux ~]$ lsmod | wc -l
195
```

Bir modülün sistemde yüklü olması kullanıldığı anlamına gelmez. Bir sistemde yüklü (RAM'de yer kaplayan) ama o an hiçbir donanım veya yazılım tarafından aktif olarak çağrılmayan modüller bulunabilir.

#### Modüller Üzerinde Temel Komutlar

Sistem üzerinde modülleri yönetmek için temel komutlar aşağıdaki gibidir:

* `lsmod`: Şu an "canlı" olan, yani bellekte yüklü tüm modülleri listeler.
    * Örnek: `lsmod | grep video` (Video ile ilgili modülleri bulur).
* `modprobe`: Bir modülü yükler veya kaldırır.
    * Yüklemek için: `sudo modprobe btusb`
    * Kaldırmak için: `sudo modprobe -r btusb`
* `modinfo`: Bir modülün kim tarafından yazıldığını, hangi lisansa sahip olduğunu ve hangi parametrelerle çalıştığını gösterir.
    * Örnek: `modinfo iwlwifi`

#### Modülü Parametre İle Geri Yükleme

```
sudo modprobe -r btusb              # Önce yüklü modülü kaldır
sudo modprobe btusb enable_autosuspend=N  # Parametreyle geri yükle
```


### lsmod ve kmod Araçları


Standart bir Linux sisteminde genellikle çok sayıda kernel modülü yüklü durumdadır.

`lsmod` komutu ile sistem üzerinde yüklü modülleri ve bağımlılılarını görebiliriz.

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

#### Belirli Bir Modülü Arama

Belirtilen modülün yüklü olup olmadığını kontrol etmek için `fgrep` aracını kullanabiliriz.

```
lsmod | fgrep -i snd_hda_intel
```



#### Modülleri Boyutuna Göre Sıralama

Modülleri boyutlarına göre büyükten küçüğe sıramak için `sort` aracını kullanabiliriz.
Örneğin aşağıdaki komut modülleri büyükten küçüğe sıralar ve en büyükleri gösterir.

```
lsmod | sort -k2,2nr | head
```

---

#### Modül Kaldırma (Canlı Sistemden)

```
sudo modprobe -r snd_hda_intel
```

Belirtilen modülü ve ona bağlı modülleri sistemden kaldırır.  
Bu işlem canlı sistem üzerinde yapılır (live unload).

---

#### Modül Hakkında Bilgi Alma


```
[acs@archlinux ~]$ modinfo nouveau
filename:       /lib/modules/6.17.9-arch1-1/kernel/drivers/gpu/drm/nouveau/nouveau.ko.zst
firmware:       nvidia/gp100/acr/ucode_load.bin
firmware:       nvidia/gp100/acr/bl.bin
firmware:       nvidia/gm206/acr/ucode_load.bin
firmware:       nvidia/gm206/acr/bl.bin
firmware:       nvidia/gm204/acr/ucode_load.bin
firmware:       nvidia/gm204/acr/bl.bin
firmware:       nvidia/gm200/acr/ucode_load.bin
firmware:       nvidia/gm200/acr/bl.bin
```


```
[acs@archlinux ~]$ modinfo -p nouveau
vram_pushbuf:Create DMA push buffers in VRAM (int)
kms_vram_pushbuf:Place EVO/NVD push buffers in VRAM (default: auto) (int)
tv_norm:Default TV norm.
                Supported: PAL, PAL-M, PAL-N, PAL-Nc, NTSC-M, NTSC-J,
                        hd480i, hd480p, hd576i, hd576p, hd720p, hd1080i.
                Default: PAL
                *NOTE* Ignored for cards with external TV encoders. (charp)
mst:Enable DisplayPort multi-stream (default: enabled) (int)
tv_disable:Disable TV-out detection (int)
ignorelid:Ignore ACPI lid status (int)
duallink:Allow dual-link TMDS (default: enabled) (int)
hdmimhz:Force a maximum HDMI pixel clock (in MHz) (int)
config:option string to pass to driver core (charp)
debug:debug string to pass to driver core (charp)
noaccel:disable kernel/abi16 acceleration (int)
modeset:enable driver (default: auto, 0 = disabled, 1 = enabled, 2 = headless) (int)
atomic:Expose atomic ioctl (default: disabled) (int)
runpm:disable (0), force enable (1), optimus only default (-1) (int)
NVreg_RegistryDwords:A semicolon-separated list of key=integer pairs of GSP-RM registry keys (charp)
keep_gsp_logging:Migrate the GSP-RM logging debugfs entries upon exit (bool)
```

Belirtilen modülün:

- Parametrelerini
- Açıklamalarını
- Versiyon bilgisini
- Lisans bilgisini

gösterir.

---

#### Kalıcı Ayarlar (Persistent Configuration)

Geçici olarak yapılan modül ayarları sistem yeniden başlatıldığında kaybolur.  

Kalıcı yapılandırma için `modprobe` konfigürasyon dosyaları kullanılır.

#### Konfigürasyon Dizini

```
/etc/modprobe.d/
```

Bu dizin altına `.conf` uzantılı dosyalar eklenir.

Örnek:

```
/etc/modprobe.d/nouveau.conf
```

---

#### Modül Parametresi Ekleme

Örneğin `nouveau` modülünde modeset özelliğini kapatmak için:

```
options nouveau modeset=0
```

Bu ayar:

- Kernel modeset özelliğini devre dışı bırakır.
- Özellikle NVIDIA proprietary driver kurulumu öncesinde kullanılır.

---

#### Modül Kara Listeye Alma (Blacklist)

Bir modül kaldırıldıktan sonra onun otomatik olarak yüklenmesini engellemek isteyebiliriz.

Bir modülün otomatik yüklenmesini engellemek `modprobe` konfigürasyonuna için `blacklist` komutu kullanılabilir.

Genel bir blacklist konfigürasyon dosyası `blacklist.conf` içerisine `blacklist nouveau` satırı eklenebilir.

```
/etc/modprobe.d/blacklist.conf
```

Ancak tercih edilen yöntem her bir modül için ayrı bir dosya oluşturmaktır:

```
/etc/modprobe.d/nouveau-blacklist.conf
```

Dosya içeriğine `blacklist nouveau` satırını eklememiz yeterlidir.

```
blacklist nouveau
```

Bu yöntem daha düzenli ve yönetilebilir olduğu için önerilir.

---

#### Kernel Modullerini Kaldırırken Hata Vermesi Durumu

Bir modül eğer kullanımdaysa sistem kaldırırken hata verebilir.

Böyle bir durumda:

```bash
modprobe -r bluetooth
```

Komut aşağıdaki gibi bir hata verir:

```
Module bluetooth is in use
```

Bu modülün kullanımda olduğu anlamına gelir. Modülü kullanan çalışan bir process ya da ona bağlı çalışan bir başka modül olabilir.

Böyle bir durumda ilgili servisin durdurulması ya da önce bağlı bulunan modülün kaldırılması gerekir.

---
