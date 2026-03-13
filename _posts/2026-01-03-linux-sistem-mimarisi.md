---
layout: post
title: Linux Sistem Mimarisi
tags: [Disk layout, Boot manager, Shared libraries, Package management, Virtualization]
resources: [LPIC Books]
---

## Disk Düzeni Tasarımı

### Temel Kavramlar

| Kavram | Açıklama |
|--------|----------|
| **Disk** | Verinin fiziksel olarak depolandığı donanım birimi |
| **Partition** | Diskin mantıksal alt bölümü. MBR veya GPT şemaları ile oluşturulur. Her diskte en az bir partition olmak zorundadır. |
| **Filesystem** | Verinin disk üzerinde nasıl organize edildiğini tanımlar (dizin yapısı, dosya konumları vb.) |
| **LVM** | Birden fazla partition'ı, farklı diskler dahil, tek bir logical volume olarak birleştirmeye yarar |

### Mount Point Nedir?

Bir filesystem'i kullanabilmek için dizin ağacındaki bir noktaya **mount** etmek gerekir. Bu noktaya **mount point** denir.

```bash
mount /dev/sda1 /mnt/mymount
```

### Ayrı Partition Kullanım Nedenleri

| Dizin | Ayrı Partition Nedeni |
|-------|-----------------------|
| `/boot` | Root filesystem bozulsa bile sistem boot edebilsin |
| `/home` | Sistemi yeniden kurarken kullanıcı verisi etkilenmesin |
| `/var` | Kontrolsüz büyüyen bir süreç root filesystem'i doldurmasın |
| `/` (root, SSD) | Performans: root'u hızlı SSD'de, `/var` gibi büyük dizinleri HDD'de tutmak |

---

### `/boot` Partition

Boot loader ile ilgili dosyaları içerir: kernel image'ları, initrd ve GRUB dosyaları.

- Boot loader genellikle **GRUB2**'dir (eski sistemlerde GRUB Legacy).
- Dosyalar `/boot/grub` altında tutulur.
- Ayrı bir `/boot` partition zorunlu değildir; GRUB çoğu durumda root partition'ı mount ederek bu dosyalara ulaşabilir. Ancak güvenlik, encryption veya GRUB'ın desteklemediği bir filesystem kullanılıyorsa ayrı partition önerilir.

**Neden diskin başında?**
Eski IBM PC BIOS'u silindir/kafa/sektör (CHS) adresleme kullandığından maksimum 528 MB'a erişebiliyordu. `/boot` partition'ı silindir 1024'ten (528 MB) önce bitecek şekilde yerleştirilirse eski sistemlerle uyumluluk sağlanır.

> Günümüz için önerilen `/boot` boyutu: **~300 MB**

---

### EFI System Partition (ESP)

UEFI tabanlı sistemlerde boot loader ve kernel image'larını depolar.

| Özellik | Değer |
|---------|-------|
| Filesystem | FAT tabanlı |
| GPT partition ID | `C12A7328-F81F-11D2-BA4B-00A0C93EC93B` |
| MBR partition ID | `0xEF` |
| Mount noktası | `/boot/efi` |

---

### Swap

RAM dolduğunda kernel, bellek sayfalarını diske taşır. Bu alan **swap** olarak adlandırılır.

- Kullanılabilir hale getirmek için `mkswap` komutu çalıştırılmalıdır.
- Normal bir dizin gibi mount edilemez, içeriğe doğrudan erişilemez.
- Partition yerine **swap file** da kullanılabilir (hızlı alan artırımı için pratiktir).

**Red Hat önerilen swap boyutları:**

| RAM | Önerilen Swap | Hibernate ile |
|-----|---------------|---------------|
| < 2 GB | 2× RAM | 3× RAM |
| 2–8 GB | RAM'e eşit | 2× RAM |
| 8–64 GB | Min 4 GB | 1.5× RAM |
| > 64 GB | Min 4 GB | Önerilmez |

**MBR partition ID'leri:**

| Tür | ID |
|-----|----|
| Linux filesystem | `0x83` |
| Linux swap | `0x82` |
| Linux LVM | `0x8E` |

---

### LVM (Logical Volume Manager)

LVM, geleneksel partition'ların sınırlarını aşarak esnek disk yönetimi sağlar.

```
Physical Volume (PV)
    └── Volume Group (VG)
            └── Logical Volume (LV)
```

| Bileşen | Açıklama |
|---------|----------|
| **PV (Physical Volume)** | Temel birim. Bir disk partition'ı veya RAID dizisi. |
| **VG (Volume Group)** | Birden fazla PV'yi tek bir havuzda birleştirir. |
| **Extent** | VG'nin bölündüğü sabit boyutlu parçalar. PV üzerindekiler PE (Physical Extent), LV üzerindekiler LE (Logical Extent). |
| **LV (Logical Volume)** | VG'den ayrılan, partition gibi davranan esnek birim. |

- LV boyutu: `extent boyutu (varsayılan 4 MB) × extent sayısı`
- LV device olarak şurada görünür: `/dev/VGNAME/LVNAME`
- `mkfs.ext4` gibi araçlarla formatlanıp mount edilebilir; `/etc/fstab` üzerinden kalıcı hale getirilebilir.

---

## Boot Manager Kurulumu

### GRUB Nedir?

**GRUB** = Grand Unified Bootloader. Linux'ta en yaygın kullanılan boot loader'dır. İki versiyonu vardır:

| | GRUB Legacy | GRUB 2 |
|-|-------------|--------|
| Son sürüm | 0.97 (2005) | Aktif geliştirme |
| Config dosyası | `/boot/grub/menu.lst` | `/boot/grub/grub.cfg` |
| Disk numaralama | hd0,0 (her ikisi 0'dan) | hd0,1 (disk 0'dan, partition 1'den) |

---

### BIOS ile Boot Akışı (MBR)

```
BIOS → MBR (512 byte) → Core Image (32 KB gap) → GRUB Konfigürasyonu → OS
```

**MBR Kısıtlamaları:**
- Maksimum 4 primary partition
- Maksimum 2 TB disk boyutu
- Çok sınırlı bootloader kod alanı

Bu kısıtlamalar nedeniyle MBR'nin yerini GPT + UEFI almaktadır.

---

### UEFI ile Boot Akışı

```
UEFI Firmware → ESP (FAT32) → grubx64.efi → GRUB → OS
```

UEFI, MBR boot kodunu kullanmaz; doğrudan ESP içindeki `.efi` dosyalarını çalıştırır.

---

### `/boot` Dizini İçeriği

Her dosya adında kernel versiyonu (`-VERSION`) yer alır:

| Dosya | Açıklama |
|-------|----------|
| `config-VERSION` | Kernel derleme parametreleri. Otomatik oluşturulur, elle düzenlenmez. |
| `System.map-VERSION` | Sembol adlarını (değişken/fonksiyon) bellek adreslerine eşleyen tablo |
| `vmlinuz-VERSION` | Sıkıştırılmış kernel image (`vmlinux` = sıkıştırılmamış) |
| `initrd.img-VERSION` | Initial RAM disk — boot sırasında RAM'e yüklenen minimal root filesystem |
| `/boot/grub/grub.cfg` | GRUB 2 konfigürasyon dosyası (elle düzenlenmez) |
| `/boot/grub/menu.lst` | GRUB Legacy konfigürasyon dosyası |

---

### GRUB 2 Konfigürasyonu

`/boot/grub/grub.cfg` otomatik üretilir, **elle düzenlenmemelidir.**

```bash
# Ayarları düzenle
vi /etc/default/grub

# Konfigürasyonu yeniden üret
update-grub
# veya eşdeğeri:
grub-mkconfig -o /boot/grub/grub.cfg
```

**`/etc/default/grub` önemli parametreler:**

| Parametre | Açıklama |
|-----------|----------|
| `GRUB_DEFAULT=` | Varsayılan boot girişi (sayı, isim veya `saved`) |
| `GRUB_SAVEDEFAULT=true` | Son seçilen giriş bir sonrakinde varsayılan olur |
| `GRUB_TIMEOUT=` | Menü bekleme süresi (saniye). `0` = beklemeden boot, `-1` = sonsuza kadar bekle |
| `GRUB_CMDLINE_LINUX=` | Tüm kernel girişlerine eklenen parametreler |
| `GRUB_CMDLINE_LINUX_DEFAULT=` | Yalnızca varsayılan girişe eklenen ekstra parametreler |
| `GRUB_ENABLE_CRYPTODISK=y` | Şifreli disk desteği ekler; otomatik boot'u devre dışı bırakır |

---

### Özel Menü Girişi Ekleme

Özel girişler `/etc/grub.d/40_custom` dosyasına eklenir. `update-grub` çalıştırıldığında bu dosya işlenir.

```bash
menuentry "Default OS" {
    set root=(hd0,1)
    linux /vmlinuz root=/dev/sda1 ro quiet splash
    initrd /initrd.img
}
```

- `set root=(hd0,1)` → birinci disk (`hd0`), birinci partition (GRUB 2'de partition 1'den başlar)
- `linux` → kernel konumu ve parametreleri
- `initrd` → initial RAM disk konumu

**UUID ile root belirleme:**

```bash
# UUID'leri listele
ls -l /dev/disk/by-uuid/

# menuentry içinde kullanım
search --set=root --fs-uuid 5dda0af3-c995-481a-a6f3-46dcd3b6998d
```

---

### GRUB 2 ile Etkileşim

| Eylem | Tuş / Komut |
|-------|-------------|
| Menüyü göster (sayım varsa) | `Shift` |
| Girişi düzenle | `E` |
| Düzenlemeden boot et | `Ctrl+X` veya `F10` |
| Düzenlemeden çık | `Esc` |
| GRUB 2 shell'e gir | `C` |

---

### GRUB 2 Shell'den Manuel Boot

```bash
grub> ls                          # disk ve partition'ları listele
grub> ls (hd0,msdos1)/            # partition içeriğini gör
grub> set root=(hd0,msdos1)       # boot partition'ı seç
grub> linux /vmlinuz root=/dev/sda1
grub> initrd /initrd.img
grub> boot
```

> GPT partitioned disk → `(hd0,gpt1)` | MBR partitioned disk → `(hd0,msdos1)`

---

### GRUB 2 Rescue Shell

Boot başarısız olursa `grub rescue>` prompt'u belirir.

```bash
grub rescue> set prefix=(hd0,msdos1)/boot/grub
grub rescue> insmod normal
grub rescue> insmod linux
# Ardından normal shell adımları uygulanır
```

---

### GRUB 2 Kurulumu

```bash
# Boot partition'ı bul ve mount et
fdisk -l /dev/sda
mkdir /mnt/tmp
mount /dev/sda1 /mnt/tmp

# Ayrı boot partition varsa
grub-install --boot-directory=/mnt/tmp /dev/sda

# Boot partition yoksa (root'ta /boot dizini)
grub-install --boot-directory=/boot /dev/sda
```

---

### GRUB Legacy

**Konfigürasyon:** `/boot/grub/menu.lst`

```
title My Linux Distribution
root (hd0,0)
kernel /vmlinuz root=/dev/hda1
initrd /initrd.img
```

> ⚠️ GRUB Legacy'de **hem disk hem partition numarası 0'dan** başlar.  
> `(hd0,0)` = birinci diskin birinci partition'ı.

**Shell'den kurulum:**

```bash
grub> root (hd0,0)
grub> setup (hd0)
```

**Chainloading (örn. Windows):**

```
title Windows XP
root (hd0,1)
makeactive
chainload +1
boot
```

---

## Shared Library Yönetimi

### Static vs Shared Library

| | Static (`.a`) | Shared (`.so`) |
|-|---------------|----------------|
| Bağlanma zamanı | Derleme sırasında | Çalışma sırasında (runtime) |
| Executable boyutu | Büyük | Küçük |
| Runtime bağımlılık | Yok | Var |
| Paylaşım | Her program kendi kopyasını taşır | Birden fazla program paylaşır |

---

### Soname (Shared Library İsimlendirmesi)

```
lib<NAME>.so.<VERSION>
```

Örnekler: `libpthread.so.0`, `libc.so.6`, `libmysqlclient.so.18.0.0`

Genellikle daha genel isimli symbolic link'ler mevcuttur:

```bash
/lib/x86_64-linux-gnu/libc.so.6 -> libc-2.24.so
```

---

### Shared Library Dizinleri

| Dizin | Kullanım |
|-------|----------|
| `/lib`, `/lib64` | Sistem boot'u için kritik binary'lerin bağımlılıkları (`/bin`, `/sbin`) |
| `/usr/lib`, `/usr/lib64` | Ek yazılımların library'leri (örn. veritabanı sunucuları) |
| `/usr/local/lib` | Kullanıcı tarafından derlenen yazılımlar |

---

### Dynamic Linker Arama Sırası

1. `LD_LIBRARY_PATH` ortam değişkeni
2. `/etc/ld.so.conf.d/*.conf` ve `/etc/ld.so.conf` dosyaları
3. Varsayılan sistem dizinleri (`/lib*`, `/usr/lib*`)

---

### `/etc/ld.so.conf` ve `ldconfig`

```bash
# /etc/ld.so.conf içeriği (tipik)
cat /etc/ld.so.conf
# include /etc/ld.so.conf.d/*.conf

# /etc/ld.so.conf.d/ altında .conf dosyaları
ls /etc/ld.so.conf.d/

# Cache'i güncelle (yeni library eklendiğinde çalıştır)
sudo ldconfig

# Verbose: hangi linkler oluşturuldu
sudo ldconfig -v

# Mevcut cache içeriğini listele
sudo ldconfig -p
```

---

### `LD_LIBRARY_PATH`

Geçici test ortamları için idealdir. Production'a taşıdıktan sonra `/etc/ld.so.conf.d/` yöntemi tercih edilmelidir.

```bash
# Geçici olarak ekle
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/home/devops/library/

# Değeri kontrol et
echo $LD_LIBRARY_PATH

# Kaldır
unset LD_LIBRARY_PATH

# Kalıcı hale getirmek için ~/.bashrc veya /etc/bash.bashrc'ye ekle
export LD_LIBRARY_PATH=/usr/local/mylib
```

> `LD_LIBRARY_PATH` → shared library'ler için  
> `PATH` → executable'lar için

---

### `ldd` Komutu

Bir executable'ın shared library bağımlılıklarını gösterir.

```bash
ldd /usr/bin/git
# linux-vdso.so.1 => ...
# libpcre.so.3 => /lib/x86_64-linux-gnu/libpcre.so.3
# libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6

# Kullanılmayan bağımlılıkları listele
ldd -u /usr/bin/git
```

---

### Yeni Library Ekleme Adımları

```bash
# 1. Library'yi standart bir dizine kopyala (örn. /usr/lib/myapp/)

# 2. /etc/ld.so.conf.d/ altında yeni bir .conf dosyası oluştur
echo "/usr/lib/myapp" > /etc/ld.so.conf.d/myapp.conf

# 3. Cache'i güncelle
sudo ldconfig

# 4. Kontrol et
sudo ldconfig -v 2>/dev/null | grep mylib
```

---

## Debian Paket Yönetimi (dpkg & apt)

### dpkg

Debian tabanlı sistemlerde temel paket aracıdır. Bağımlılıkları **otomatik çözmez**.

```bash
# Kur
dpkg -i package.deb

# Kaldır (config dosyaları kalır)
dpkg -r PACKAGENAME

# Kaldır + config dosyalarını sil (purge)
dpkg -P PACKAGENAME

# Paket dosyası hakkında bilgi al (kurulmadan)
dpkg -I package.deb

# Kurulu tüm paketleri listele
dpkg --get-selections

# Paketin kurduğu dosyaları listele
dpkg -L PACKAGENAME

# Hangi paket bu dosyayı kurdu?
dpkg-query -S /path/to/file

# Paketi yeniden yapılandır (post-install scriptini tekrar çalıştır)
dpkg-reconfigure PACKAGENAME
```

> Bağımlılık sorunu varsa `dpkg -i --force PACKAGENAME` ile zorlanabilir, ancak sistemi bozuk durumda bırakabilir.

---

### apt / apt-get

APT, `dpkg`'nın üzerine inşa edilmiş bir ön yüzdür. Bağımlılıkları otomatik çözer, online repository'lerden paket indirir.

**Temel paket işlemleri:**

```bash
# Paket indeksini güncelle
apt-get update

# Paket kur
apt-get install PACKAGENAME

# Paket kaldır (config dosyaları kalır)
apt-get remove PACKAGENAME

# Paket kaldır + config dosyaları sil
apt-get purge PACKAGENAME
# veya
apt-get remove --purge PACKAGENAME

# Tüm paketleri güncelle
apt-get upgrade

# Bozuk bağımlılıkları düzelt
apt-get install -f

# İndirilen paket cache'ini temizle (/var/cache/apt/archives/)
apt-get clean
```

**Arama ve bilgi:**

```bash
# Paket ara
apt-cache search PATTERN

# Paket hakkında detaylı bilgi
apt-cache show PACKAGENAME
```

---

### `/etc/apt/sources.list`

APT'nin hangi repository'lerden paket alacağını belirler.

```
deb http://us.archive.ubuntu.com/ubuntu/ disco main restricted universe multiverse
```

Satır formatı: `<tip> <URL> <dağıtım> <bileşenler>`

| Tip | Açıklama |
|-----|----------|
| `deb` | Binary paketler |
| `deb-src` | Kaynak paketler |

**Ubuntu bileşenleri:**

| Bileşen | Açıklama |
|---------|----------|
| `main` | Resmi destekli, açık kaynak |
| `restricted` | Resmi destekli, kapalı kaynak (örn. GPU sürücüleri) |
| `universe` | Topluluk destekli, açık kaynak |
| `multiverse` | Desteklenmeyen, kapalı kaynak veya patent kısıtlamalı |

Ek repository dosyaları `/etc/apt/sources.list.d/` dizinine `.list` uzantısıyla eklenebilir.

---

### apt-file

Kurulmayan paketlerdeki dosyalar da dahil arama yapabilir.

```bash
# apt-file kur ve güncelle
apt-get install apt-file
apt-file update

# Paketin içeriğini listele
apt-file list PACKAGENAME

# Hangi paket bu dosyayı içeriyor?
apt-file search /path/to/file
```

> `apt-file search` kurulmayan paketlerde de arar.  
> `dpkg-query -S` yalnızca **kurulu** paketlerde arar.

---

## RPM ve YUM Paket Yönetimi

### rpm

Red Hat tabanlı sistemlerde temel paket aracıdır (RHEL, CentOS, Fedora, openSUSE). Bağımlılıkları otomatik çözmez.

```bash
# Kur (verbose + progress bar)
rpm -ivh package.rpm

# Güncelle (yoksa kur)
rpm -U package.rpm

# Güncelle (yalnızca kuruluysa)
rpm -F package.rpm

# Kaldır
rpm -e PACKAGENAME

# Tüm kurulu paketleri listele
rpm -qa

# Paket bilgisi (kurulu)
rpm -qi PACKAGENAME

# Paket dosyalarını listele (kurulu)
rpm -ql PACKAGENAME

# Paket bilgisi (kurulu değil, .rpm dosyasından)
rpm -qip package.rpm
rpm -qlp package.rpm

# Bu dosya hangi pakete ait?
rpm -qf /path/to/file
```

---

### yum (YellowDog Updater Modified)

RPM tabanlı sistemlerde bağımlılık çözümleyen paket yöneticisidir.

```bash
# Paket ara
yum search PATTERN

# Paket kur
yum install PACKAGENAME

# Paket güncelle
yum update PACKAGENAME

# Tüm paketler için güncelleme var mı kontrol et
yum check-update

# Paket kaldır
yum remove PACKAGENAME

# Hangi paket bu dosyayı sağlıyor?
yum whatprovides FILENAME

# Paket bilgisi
yum info PACKAGENAME
```

**Repository yönetimi:**

```bash
# Tüm repo'ları listele
yum repolist all

# Repo ekle
yum-config-manager --add-repo URL

# Repo etkinleştir / devre dışı bırak
yum-config-manager --enable REPO_ID
yum-config-manager --disable REPO_ID
```

Repo dosyaları: `/etc/yum.repos.d/*.repo`

---

### dnf (Dandified YUM)

Fedora'nın paket yöneticisi; yum'un fork'udur. Komutlar büyük ölçüde yum ile aynıdır.

```bash
dnf search PATTERN
dnf info PACKAGENAME
dnf install PACKAGENAME
dnf remove PACKAGENAME
dnf upgrade PACKAGENAME        # tüm sistem için paket adı olmadan
dnf provides FILENAME          # yum whatprovides karşılığı
dnf list --installed
dnf repoquery -l PACKAGENAME   # paket içeriğini listele
dnf repolist
```

**Repository yönetimi:**

```bash
dnf config-manager --add_repo URL
dnf config-manager --set-enabled REPO_ID
dnf config-manager --set-disabled REPO_ID
```

Repo dosyaları: `/etc/yum.repos.d/` (yum ile aynı dizin)

---

### zypper (SUSE / openSUSE)

```bash
# Index güncelle
zypper refresh

# Paket ara
zypper se PACKAGENAME

# Kurulu paketlerde ara
zypper se -i PACKAGENAME

# Paket kur
zypper in PACKAGENAME

# Paket kaldır
zypper rm PACKAGENAME

# Mevcut güncellemeleri listele (kurmadan)
zypper list-updates

# Bu dosya hangi pakette?
zypper se --provides /path/to/file

# Paket bilgisi
zypper info PACKAGENAME

# Tüm repo'ları listele
zypper repos

# Repo etkinleştir / devre dışı bırak
zypper modifyrepo -e REPO_ALIAS
zypper modifyrepo -d REPO_ALIAS

# Auto-refresh aç / kapat
zypper modifyrepo -f REPO_ALIAS
zypper modifyrepo -F REPO_ALIAS

# Repo ekle
zypper addrepo URL ALIAS

# Repo kaldır
zypper removerepo ALIAS
```

---

## Linux Sanallaştırma

### Temel Kavramlar

**Hypervisor:** Sanal makineleri çalıştıran yazılım platformu. Host donanım kaynaklarını (CPU, RAM, disk) guest'ler arasında paylaştırır.

| Tür | Açıklama | Örnek |
|-----|----------|-------|
| **Type-1 (Bare-metal)** | Doğrudan donanım üzerinde çalışır, altta OS gerekmez | Xen |
| **Type-2** | Bir host OS üzerinde çalışır | VirtualBox |
| **Hibrit** | Her iki modda da çalışabilir | KVM |

---

### Sanallaştırma Türleri

| Tür | Açıklama |
|-----|----------|
| **Fully Virtualized (HardwareVM)** | Guest, VM içinde olduğunu bilmez. x86'da Intel VT-x veya AMD-V gerektirir. |
| **Paravirtualized (PVM)** | Guest, VM içinde olduğunu bilir. Özel guest driver'ları kullanır; performans genellikle daha iyi. |
| **Hybrid** | Full virtualization + paravirtualized driver'lar. Disk ve ağ I/O için neredeyse native performans. |

**Virtualization extension kontrolü:**

```bash
grep --color -E "vmx|svm" /proc/cpuinfo
# vmx = Intel VT-x
# svm = AMD-V
```

---

### KVM ve libvirt

KVM, Linux kernel modülü tabanlı bir hypervisor'dür. Sanal makineler **libvirt** daemon ile yönetilir.

- VM konfigürasyon dosyaları: `/etc/libvirt/qemu/*.xml`
- Network konfigürasyonu: `/etc/libvirt/qemu/networks/`
- Disk image varsayılan konumu: `/var/lib/libvirt/images/`

**Disk image türleri:**

| Tür | Açıklama |
|-----|----------|
| `qcow2` (COW) | Copy-on-write. Disk dosyası yalnızca yazılan veri kadar büyür. KVM varsayılanı. |
| Raw | Tüm alan önceden ayrılır. Daha iyi yazma performansı, ama daha fazla disk kullanımı. |

---

### D-Bus Machine ID

Linux kurulumunda oluşturulan benzersiz makine kimliği. Hypervisor üzerinde kaynak yönlendirmesi için kullanılır.

- Konum: `/var/lib/dbus/machine-id` → `/etc/machine-id` sembolik link

```bash
# ID var mı kontrol et
dbus-uuidgen --ensure

# Mevcut ID'yi göster
dbus-uuidgen --get

# Klonlanan VM'de yeni ID oluştur
sudo rm -f /etc/machine-id
sudo dbus-uuidgen --ensure=/etc/machine-id
```

> Aynı hypervisor üzerindeki iki VM aynı D-Bus machine ID'ye sahip olmamalıdır.

---

### Cloud: SSH Erişimi

```bash
# Key pair oluştur (private key ~/.ssh/ içinde kalır)
ssh-keygen

# Public key'i uzak sunucuya kopyala
ssh-copy-id -i user@cloud_server
# Public key -> ~/.ssh/authorized_keys dosyasına eklenir
```

**SSH key izinleri:**

| Key | İzin |
|-----|------|
| Private key | `0600` |
| Public key | `0644` |

---

### cloud-init

Vendor-neutral bir araç. İlk boot sırasında YAML tabanlı konfigürasyon dosyalarını okuyarak sistemi otomatik yapılandırır.

```yaml
#cloud-config
timezone: Europe/Istanbul
hostname: my-server

# İlk boot'ta sistemi güncelle
apt_update: true
apt_upgrade: true

# Paket kur
packages:
  - nginx
```

> İlk satır `#cloud-config` olmalıdır; `#` ile `cloud-config` arasında boşluk olmamalıdır.

---

### Container'lar

| Özellik | VM | Container |
|---------|----|-----------|
| İzolasyon | Tam donanım emülasyonu | Yalnızca uygulama ortamı |
| Overhead | Yüksek | Düşük |
| Taşıma | Kapatılarak veya live migration | Uygulama çalışırken |
| Kernel mekanizması | Hypervisor | cgroups (control groups) |

Yaygın container teknolojileri: Docker, Kubernetes, LXD/LXC, systemd-nspawn, OpenShift.

**cgroups:** Kernel'in, bir uygulama veya uygulama grubuna ayrılabilen bellek, CPU, disk ve ağ bant genişliğini sınırlandırma mekanizması.

---

## Özet: Komut Referansı

### Disk / LVM

| Komut | Açıklama |
|-------|----------|
| `mount /dev/sda1 /mnt/point` | Filesystem mount et |
| `mkswap /dev/sdaX` | Swap alanı hazırla |

### GRUB

| Komut | Açıklama |
|-------|----------|
| `update-grub` | `grub.cfg`'yi yeniden üret |
| `grub-mkconfig -o /boot/grub/grub.cfg` | `update-grub` eşdeğeri |
| `grub-install --boot-directory=/boot /dev/sda` | GRUB 2 kur |
| `fdisk -l /dev/sda` | Partition'ları listele (boot partition'ı * ile işaretli) |

### Shared Libraries

| Komut | Açıklama |
|-------|----------|
| `ldconfig` | Library cache'ini güncelle |
| `ldconfig -v` | Verbose çıktı |
| `ldconfig -p` | Cache içeriğini listele |
| `ldd /path/to/binary` | Binary'nin bağımlılıklarını göster |

### dpkg / apt

| Komut | Açıklama |
|-------|----------|
| `dpkg -i pkg.deb` | Kur |
| `dpkg -r PKG` | Kaldır |
| `dpkg -P PKG` | Purge (config dahil) |
| `dpkg -I pkg.deb` | Paket bilgisi (kurulmadan) |
| `dpkg --get-selections` | Kurulu paketler |
| `dpkg -L PKG` | Paketin dosyaları |
| `dpkg-query -S /file` | Dosyaya sahip paket |
| `apt-get update` | İndeks güncelle |
| `apt-get install PKG` | Kur |
| `apt-get remove PKG` | Kaldır |
| `apt-get purge PKG` | Purge |
| `apt-get upgrade` | Tümünü güncelle |
| `apt-get install -f` | Bozuk bağımlılıkları düzelt |
| `apt-cache search PATTERN` | Ara |
| `apt-cache show PKG` | Bilgi |
| `apt-file search FILE` | Dosyayı içeren paket (kurulmamış dahil) |

### rpm / yum / dnf / zypper

| Komut | Açıklama |
|-------|----------|
| `rpm -ivh pkg.rpm` | Kur (verbose + progress) |
| `rpm -U pkg.rpm` | Güncelle |
| `rpm -e PKG` | Kaldır |
| `rpm -qa` | Tüm kurulu paketler |
| `rpm -qi PKG` | Paket bilgisi |
| `rpm -ql PKG` | Paket dosyaları |
| `rpm -qf /file` | Dosyaya sahip paket |
| `yum install PKG` | Kur |
| `yum whatprovides FILE` | Dosyayı sağlayan paket |
| `yum check-update` | Güncellemeleri kontrol et |
| `dnf provides FILE` | `yum whatprovides` karşılığı |
| `dnf list --installed` | Kurulu paketler |
| `zypper se PKG` | Ara |
| `zypper in PKG` | Kur |
| `zypper rm PKG` | Kaldır |
| `zypper se --provides FILE` | Dosyayı sağlayan paket |
| `zypper modifyrepo -d ALIAS` | Repo devre dışı |

### Sanallaştırma

| Komut | Açıklama |
|-------|----------|
| `dbus-uuidgen --ensure` | D-Bus ID var mı kontrol et |
| `dbus-uuidgen --get` | Mevcut D-Bus ID'yi göster |
| `ssh-keygen` | SSH key pair oluştur |
| `ssh-copy-id user@host` | Public key'i uzak sunucuya kopyala |
| `grep -E "vmx\|svm" /proc/cpuinfo` | Virtualization extension'ları kontrol et |
