---
layout: post
title: Linux İşletim Sistemlerinde Aygıt İncelemesi
tags: [Linux, Boot]
---

## Donanım Cihazları

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

## Aygıt İnceleme Komutları: `lspci` ve `lsusb`

Linux’ta sistemde bulunan donanımları incelemek için kullanılan temel komutlardan ikisi:

- `lspci`
- `lsusb`

Bu komutlar, kernel’in tanıdığı aygıtları ilgili bus (veriyolu) üzerinden listeler.

---

## lspci – PCI Aygıtlarını Listeleme

`lspci` komutu, sistemdeki PCI ve PCIe cihazlarını gösterir.

PCI üzerinden bağlanan tipik cihazlara şunlar örnek verilebilir:

- Ekran kartı (GPU)
- Ethernet kartı
- NVMe kontrolcüsü
- SATA kontrolcüsü
- Ses kartı

Basit kullanım:

```bash
lspci
```

Örnek çıktı:

```text
00:02.0 VGA compatible controller: Intel Corporation UHD Graphics 620
00:14.0 USB controller: Intel Corporation USB 3.0 Controller
00:1f.2 SATA controller: Intel Corporation SATA Controller
```

---

### Daha Detaylı Bilgi

Detaylı bilgi için:

```bash
lspci -v
```

Kullanılan driver bilgisini görmek için:

```bash
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

```bash
lspci -s 04:02.0 -v
```

Örnek çıktı:

```text
04:02.0 Network controller: Ralink corp. RT2561/RT61 802.11g PCI
    Subsystem: Linksys WMP54G v4.1
    Flags: bus master, slow devsel, latency 32, IRQ 21
    Memory at e3100000 (32-bit, non-prefetchable) [size=32K]
    Capabilities: [40] Power Management version 2
    kernel driver in use: rt61pci
```

Buradaki önemli satır:

```text
kernel driver in use: rt61pci
```

Bu, cihazın şu anda aktif olarak hangi driver tarafından yönetildiğini gösterir.

---

### Birden Fazla Modül Durumu

Aşağıdaki örnekte bir NVIDIA GPU için driver bilgisi görülmektedir:

```bash
lspci -s 01:00.0 -k
```

```text
01:00.0 VGA compatible controller: NVIDIA Corporation GM107 [GeForce GTX 750 Ti] (rev a2)
    kernel driver in use: nvidia
    kernel modules: nouveau, nvidia_drm, nvidia
```

Burada:

- `kernel driver in use: nvidia`  Aktif olarak kullanılan driver.
- `kernel modules:`  Bu cihaz için uygun olabilecek diğer modüller.

Bu durum özellikle açık kaynak (`nouveau`) ve kapalı kaynak (`nvidia`) driver’lar arasında geçiş yaparken önemlidir.

---

