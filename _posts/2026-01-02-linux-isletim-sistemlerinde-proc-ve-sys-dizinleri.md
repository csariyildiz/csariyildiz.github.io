---
layout: post
title: Linux İşletim Sistemlerinde Proc ve Sys Dizinleri
tags: [Linux, Dosya Sistemleri]
---

Linux işlerim sistemlerinde /proc ve /sys adında özel dizinler bulunur.
Dizinler dosya sistemi gibi görünseler de aslında sistem hakkında bilgi barındıran özel dizinlerdir.
Bu nedenle sözde dosya sistemleri (Pseudo-filesystems) olarak adlandırılırlar.

Sistem üzerinde inceleme yapmakta kullanılan `lspci`, `lsusb` ve `lsmod` komutları aslında `/proc` ve `/sys` gibi sözde dosya sistemlerine bir arayüz olarak işlev görürler.

Sözde dosya sistemleri:
- Boot esnasında mount edilir.
- Bir fiziksel disk partition'u üzerinde bulunmazlar.
- Yalnızca RAM'de barınırlar.
- Kernel tarafından doğrudan yönetilirler.
- Çalışan processler ve donanım hakkında runtime konfigurasyonunu tutarlar 
- Yalnızca sistem çalışır durumdayken var olurlar.

### /proc

`/proc` dizini çalışan aşağıdakiler üzerinde bilgi tutar:
- Çalışan process'ler
- Kernel Veri Yapıları
- Donanım Kaynakları


* Aşağıdaki örnekte sayılar process idlerdir. Her PID klasörü içinde, o sürecin: Açık dosyaları (fd/) Bellek bilgileri (maps, mem) Komut satırı (cmdline) Çalışma durumu (status) gibi bilgiler bulunur.

* Sayılar dışında kalan dosya ve klasörler (cpuinfo, meminfo, ioports, interrupts) sistem bilgisi ve kaynakları dır.


```
[acs@archlinux ~]$ ls /proc
1     123     190588  196218  21758  358    441  53     69   82          buddyinfo      keys          swaps
10    1240    190882  196219  21760  36     442  54     7    85          bus            key-users     sys
100   1252    190886  196220  22     37     445  55     70   86          cgroups        kmsg          sysrq-trigger
101   1274    190887  196227  23     38     447  55616  71   860         cmdline        kpagecgroup   sysvipc
102   13      191239  196446  24     4      448  56     72   862         config.gz      kpagecount    thread-self
103   1300    191243  196447  25     40     449  58     726  863         consoles       kpageflags    timer_list
1035  148501  191244  196470  26     401    46   59     728  864         cpuinfo        loadavg       tty
1036  15      191955  196627  262    405    461  6      735  87          crypto         locks         uptime
104   154151  192044  197     263    406    47   60     736  871         devices        meminfo       version
105   154301  192132  198     2772   407    48   61     738  879         diskstats      misc          vmallocinfo
106   16      192133  2       28     408    486  62     74   88          dma            modules       vmstat
1080  17      192983  20      29     409    49   634    741  880         driver         mounts        zoneinfo
1082  170     193036  205     3      41     5    635    742  90          dynamic_debug  mtrr
109   172     193050  206     30     42     50   637    75   91          execdomains    net
110   173080  193054  207     309    426    503  638    76   92          fb             pagetypeinfo
111   176070  193055  208     31     43     504  64     77   94          filesystems    partitions
1111  179328  193060  209     32     434    506  64245  78   95          fs             pressure
1118  18      195     21      339    437    507  64583  782  96          interrupts     schedstat
112   186989  195236  21743   34     438    508  65     79   97          iomem          scsi
1130  187595  195529  21747   343    43928  509  66     8    98          ioports        self
1138  188357  195532  21755   345    43939  510  6613   80   acpi        irq            slabinfo
118   19      195996  21756   35     44     519  67     812  asound      kallsyms       softirqs
1195  190528  196216  21757   351    440    52   68     813  bootconfig  kcore          stat
```

Önemli dosyalar:

- `/proc/cpuinfo` –  İşletim sistemi tarafından algılanan ayrıntılı CPU bilgisi.
- `/proc/interrupts` – Her CPU için G/Ç aygıtı başına kesme sayıları. Bu sayılar hata tespitinde kritik. Interrupt cihazın  CPU’yu durdurup “benimle ilgilen” dediği anlamına gelir.
- `/proc/ioports` – Kayıtlı ve kullanımda olan G/Ç port bölgeleri. CPU port erişimlerini hangi cihazın kullandığını gösterir. Çakışma veya sürücü problemi olursa buradan takip edilebilir. Normal bir modern sistemde portlar çoğunlukla PCI cihazları ve ACPI ile sınırlıdır.
- `/proc/dma` –  Kayıtlı DMA (Doğrudan Bellek Erişimi) kanalları. DMA, CPU’yu araya sokmadan cihazların belleğe doğrudan veri yazıp okumasını sağlayan mekanizmadır. Modern PCI cihazlar çoğunlukla bus-mastering ile DMA yapıyor, /proc/dma yerine MMIO üzerinden çalışıyor.

```bash
[acs@archlinux ~]$ cat /proc/dma 
4: cascade
```


---

### /sys (SysFS)

```bash
[acs@archlinux ~]$ ls /sys
block  bus  class  dev  devices  firmware  fs  hypervisor  kernel  module  power
```

* The `/sys` dizini aşağıdakileri tutar:
- Cihaz bilgisi
- Hardware ile ilişkili kernel bilgisi
- Bus ve driver ilişkisi

* Proc ve Sys Arasındaki Farklar aşağıdaki gibi açıklanabilir:

- `/proc` : Genel kernel ve process bilgisini tutarken  
- `/sys` : Donanım ve cihaz modellerini yapısal biçimde tutar.  

* Örneğin bağlı bulunan bus'ları incelemek için:

```bash
[acs@archlinux ~]$ ls /sys/bus/
ac97         clocksource  event_source  i2c           memory          pci          serial       spi         workqueue
acpi         container    faux          isa           memory_tiering  pci_express  serial-base  usb         xen
auxiliary    cpu          gpio          machinecheck  mipi-dsi        platform     serio        usb-serial  xen-backend
cec          dax          hdaudio       media         node            pnp          snd_seq      virtio
clockevents  edac         hid           mei           nvmem           scsi         soc          wmi
```

---

### udev Sistemi

* `udev` sistemi cihaz dosyalarını `/dev` altında listeleyen yapıya verilen isimdir.
* Linux kullanıcısı disk alanı ve diğer cihazlara bu şekilde erişim sağladığından önemlidir.

Bir donanım parçası için süreç aşağıdaki gibi işler:

1. Kernel bir donanımı görür.
2. Bir donanım event'i `udev` e yollanır.
3. `udev` öntanımlı kuralları uygular.
4. Cihaz dosyaları dinamik olarak `/dev` altında oluşturulur.

Burada iki tip tespit vardır:
- Coldplug : Cihaz boot sırasında görülebilirdir.  
- Hotplug : Cihaz sistem çalışır durumdayken görülebilirdir.  

- `udev` arka planda SysFS (`/sys`) e dayanır.
- Kurallar `/etc/udev/rules.d/` dosyalarında tutulur.
- Default kurallar distribution tarafından sağlanır.
- Özelleştirilmiş Kurallar Eklenebilir

---

### Diskler

Örnek bir disk çıktısı aşağıdaki gibidir:

```bash
$ lsblk -f
NAME        FSTYPE    LABEL   UUID                                     MOUNTPOINT
sda
├─sda1      vfat      BOOT    1A2B-3C4D                                 /boot
├─sda2      ext4              e3a6b92a-7a50-4a61-bd3e-7fba3b4e1f80       /
└─sda3      ext4              6f2f8b29-117f-40cf-b3ad-2b0982c21b44       /home
nvme0n1p1   ext4              8a77d8ac-34b7-4e92-a3f3-d9c7e928fa02       /mnt/ssd
mmcblk0p1   vfat      BOOT    5B6C-7D8E                                  /media/boot
```

Çıktıda dosya sistemlerinin yanında ilgili UID'ler görülebilir.

### Cihazların İsimlendirilmesi

| Cihaz Tipi         | Örnek Cihaz      | Örnek Partitionlar              | Notla                                   |
|--------------------|------------------|---------------------------------|-----------------------------------------|
| SATA / IDE / USB   | /dev/sda         | /dev/sda1, /dev/sda2            | Genel diskler, sd başa prefix olarak    |
| SD Card            | /dev/mmcblk0     | /dev/mmcblk0p1, /dev/mmcblk0p2  | Partition numarasından önce "p"         |
| NVMe SSD           | /dev/nvme0n1     | /dev/nvme0n1p1, /dev/nvme0n1p2  | PCIe-tabanlı hızlı SSD                  |

* Linux kernel 2.4+'den sonra çoğu disk cihazı SCSI-stili ilk isimlendirmeyi kullanmaya başlamıştır. (`sdX`).

* Örneğin bir harici USB disk bağlandığında:
- Eğer başka bir block cihazı yoksa `/dev/sda` olarak görülebilir.
- Eğer `/dev/sda` halihazırda mevcutsa, cihaz `/dev/sdb` olur ve böyle gider.

Mount için farklı opsiyonlar vardır:

- `/etc/fstab` dosyasına ekleme yapılabilir.
- Özelleştirilmiş bir `udev` kuralı ve script kullanılabilir.
- Block-mount sistemler (örn OpenWrt) kullanılabilir.


---

## BIOS ve Boot Sırasında Karşılaşılan Sorunlu Durumlar

#### İkinci Bir SATA disk Eklendiğinde Sistemin Başlatılamaması

* Bir boot öncesinde ikinci bir disk eklendiğindikten sonra sisteme hiç erişilemiyor olsun. 
* Bunun için akla gelen ilk sebep BIOS içerisindeki sıralamanın hatalı olmasıdır.
* Böyle bir durumda BIOS ayarlarından ilgili sıralamanın düzeltilmesi gerekir.


#### Sistemin Başlamak İçin Klavyeye İhtiyaç Duyması (Eski x86 Sunucularda)

* Bazı daha eski BIOS firmware eğer klavye bulamazsa başlamayabilir.
* Bu klavye bulunamadı gibi bir hata ile karşılaşılır.
* Bu durumda bios seçeneklerinden "Halt on keyboard error" disable edilerek sorun çözülebilir.


#### ARM Sistemler ve SoC

* Örneğin ARM sistemlerde (örn Raspberry Pi) `lspci` komutunu bulamayabiliriz.
* Bunun sebebi geleneksel anlamda bir PCI bus'unun olmayışıdır.
* Bu cihazlarda donanım direkt olarak System on Chip (SoC)'e bağlıdır.
* SoC sistemlerde, CPU, GPU, USB, Ethernet ve memory controller gibi tüm bileşenler tek çip üzerindedir. 
* Hardware bilgisine /sys dizini aracılığıyla ulaşılır.

```bash
acs@acs-raspi1:~ $ ls /sys
block  bus  class  dev  devices  firmware  fs  kernel  module  power
```

---

### CPU Zafiyetlerini Görüntülenmesi (Meltdown & Spectre)

Modern linux kernellerinin bir özelliği de kimi zaafiyetlere yönelik bilgiyi göstermesidir.

Örneğin `/sys` gibi sözde dosya sistemi aracılığıla meltdown için zaafiyet bilgisini görebiliriz.

```bash
cat /sys/devices/system/cpu/vulnerabilities/meltdown
Mitigation: PTI
```

Bu çıktıya göre sistem Meltdown açığına karşı korunuyor. Koruma yöntemi ise PTI (Page Table Isolation).

Başka zafiyet dosyalarını da görmek istersek:

```
[acs@archlinux ~]$ ls /sys/devices/system/cpu/vulnerabilities/
gather_data_sampling       itlb_multihit  meltdown         reg_file_data_sampling  spec_store_bypass  srbds            vmscape
ghostwrite                 l1tf           mmio_stale_data  retbleed                spectre_v1         tsa
indirect_target_selection  mds            old_microcode    spec_rstack_overflow    spectre_v2         tsx_async_abort
```

Burada aşağıdaki gibi farklı zafiyet türlerine yönelik bilgiler de bulunmakta:

- spectre_v1
- spectre_v2
- l1tf
- mds
- tsx_async_abort

Benzer bir bilgiye `/proc` aracılığıyla da ulaşılabilir:

```bash
cat /proc/cpuinfo
```

---

### PCI Cihazlarını İnceleme

Örneğin bir harici PCI video kartını inceliyor olalım:

```bash
lspci
```

Daha detaylı bilgi için listedeki id kullanılabilir:

```bash
lspci -s <id> -k
lspci -s <id> -v
```

Bu çıktılar bize: 

- Hangi kernel driver'ının kullanımda olduğunu.
- Kullanılabilecek kernel modüllerini gösterir.

---

### Kernel Modullerini Kaldırırken Hata Vermesi Durumu

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

### Örnek Bir Sistem Üzerinden İnceleme

* CPU Bilgileri:

```
[acs@archlinux ~]$ cat /proc/cpuinfo
processor       : 0
vendor_id       : GenuineIntel
cpu family      : 6
model           : 142
model name      : Intel(R) Core(TM) i7-8550U CPU @ 1.80GHz
stepping        : 10
microcode       : 0xf6
cpu MHz         : 900.148
cache size      : 8192 KB
physical id     : 0
siblings        : 8
core id         : 0
cpu cores       : 4
apicid          : 0
initial apicid  : 0
fpu             : yes
fpu_exception   : yes
cpuid level     : 22
wp              : yes
flags           : fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx pdpe1gb rdtscp lm constant_tsc art arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc cpuid aperfmperf pni pclmulqdq dtes64 monitor ds_cpl vmx est tm2 ssse3 sdbg fma cx16 xtpr pdcm pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand lahf_lm abm 3dnowprefetch cpuid_fault epb pti ssbd ibrs ibpb stibp tpr_shadow flexpriority ept vpid ept_ad fsgsbase tsc_adjust bmi1 avx2 smep bmi2 erms invpcid mpx rdseed adx smap clflushopt intel_pt xsaveopt xsavec xgetbv1 xsaves dtherm ida arat pln pts hwp hwp_notify hwp_act_window hwp_epp vnmi md_clear flush_l1d arch_capabilities
vmx flags       : vnmi preemption_timer invvpid ept_x_only ept_ad ept_1gb flexpriority tsc_offset vtpr mtf vapic ept vpid unrestricted_guest ple pml ept_violation_ve ept_mode_based_exec
bugs            : cpu_meltdown spectre_v1 spectre_v2 spec_store_bypass l1tf mds swapgs itlb_multihit srbds mmio_stale_data retbleed gds spectre_v2_user vmscape
bogomips        : 3999.93
clflush size    : 64
cache_alignment : 64
address sizes   : 39 bits physical, 48 bits virtual
power management:
...
```

* Yukarıda çekirdeklerden ilki için bilgiler görülüyor. Toplamda 8 tane var. 
* Interruptlar için aşağıdaki çıktıda:
    * Sütunlar (CPU0 … CPU7) sisteminde toplam 8 çekirdek olduğunu gösteriyor ve her çekirdek için ayrı sayım var.
    * Satırlarda her satır bir interrupt kaynağı veya özel interrupt türünü temsil ediyor.
    * Son sütun interrupt ile ilişkili sürücü veya cihaz ismini gösteriyor (örn. i8042, xhci_hcd, iwlwifi).

```
[acs@archlinux ~]$ sudo cat /proc/interrupts
            CPU0       CPU1       CPU2       CPU3       CPU4       CPU5       CPU6       CPU7
   1:          0          0          0          0          6          0          0          0 IR-IO-APIC    1-edge      i8042
   8:          0          0          0          0          0          0          0          0 IR-IO-APIC    8-edge      rtc0
   9:         19          0          0          0          0          0          0          0 IR-IO-APIC    9-fasteoi   acpi
  16:          0          0          0          0          0          0         12          0 IR-IO-APIC   16-fasteoi   idma64.0, i2c_designware.0, i801_smbus
  17:          0          0          0          0          0          0          0        789 IR-IO-APIC   17-fasteoi   idma64.1, i2c_designware.1
  20:          0          0          0          0          0          0          0          0 IR-IO-APIC   20-fasteoi   idma64.2
  22:          0          0          0          0          0          0          0          0 IR-IO-APIC   22-fasteoi   idma64.3, pxa2xx-spi.3
 109:          0          0          0          1          0          0          0          0 IR-IO-APIC  109-fasteoi   ELAN1300:00
 120:          0         67          0          0          0          0          0          0 IR-PCI-MSI-0000:00:1c.0    0-edge      PCIe PME, aerdrv, PCIe bwctrl
 121:          0          0          1          0          0          0          0          0 IR-PCI-MSI-0000:00:1c.5    0-edge      PCIe PME, aerdrv, PCIe bwctrl
 122:          0          0          0     339743          0          0          0          0 IR-PCI-MSI-0000:00:17.0    0-edge      ahci[0000:00:17.0]
 123:          0          0          0          0       4858          0          0          0 IR-PCI-MSI-0000:00:14.0    0-edge      xhci_hcd
 131:          0          0         62          0          0          0          0          0 IR-PCI-MSI-0000:00:02.0    0-edge      i915
 132:          0          0          0          0         45          0          0          0 IR-PCI-MSI-0000:00:16.0    0-edge      mei_me
 133:          0          0          0          0          0    5168208          0          0 IR-PCI-MSI-0000:02:00.0    0-edge      iwlwifi
 134:          0          0          0          0          0          0     826512          0 IR-PCI-MSI-0000:01:00.0    0-edge      nvidia
 135:          0          0          0          0          0          0          0        590 IR-PCI-MSI-0000:00:1f.3    0-edge      snd_hda_intel:card0
 NMI:        150        159        160        160        138        173        151        148   Non-maskable interrupts
 LOC:   12667159   13952546   14383327   14520986   14381033   17764572   12738398   13342592   Local timer interrupts
 SPU:          0          0          0          0          0          0          0          0   Spurious interrupts
 PMI:        150        159        160        160        138        173        151        148   Performance monitoring interrupts
 IWI:        268         75        136        142        116         24        129        119   IRQ work interrupts
 RTR:          0          0          0          0          0          0          0          0   APIC ICR read retries
 RES:      52921      28674      30596      30576      39887      27372      26902      28909   Rescheduling interrupts
 CAL:     524260     483506     497101     492641     428670     391466     443461     427501   Function call interrupts

```

* Örnek bir satır:

```
133:          0          0          0          0          0    5168208          0          0 IR-PCI-MSI-0000:02:00.0 0-edge iwlwifi
```

* Satırlar için:
    * 133 → Interrupt numarası.
    * 5168208 → CPU5 bu interrupt’ı 5.168.208 kez işlemiş.
    * iwlwifi → Bu kesme Wi-Fi kartın tarafından tetikleniyor.
    * NMI → Non-maskable interrupts, yani kritik kesmeler, CPU tarafından asla maskelenemez.
    * LOC → Local timer interrupt, çekirdek zamanlayıcısından gelen kesmeler.
    * RES, CAL, TLB → Çekirdekler arası sistemsel işlemler veya performans izleme interruptları.
    * IWI → “IRQ work interrupt”, kernel’in iş parçacığı bazlı interruptları.
    * MCE, MCP → Donanım hataları (Machine Check).


* Burada aslında wifi ile ilgili bir problem olduğunu görebiliriz. 

```
133: … CPU5 … 5168208 … iwlwifi
```

* Donanım hataları bazen yüksek veya beklenmeyen interrupt üretir (örn. iwlwifi bug).
* Wi-Fi (iwlwifi) → CPU5 üzerinde 5.168.208 kesme.
* Bu oldukça yüksek bir sayı, yani Wi-Fi sürücüsü CPU5’i ciddi şekilde meşgul etmiş.
* Normal bir sistemde Wi-Fi genellikle çok yüksek kesme üretmez, bu yüzden burada yoğun kullanım veya bir sürücü/tetikleme durumu olabilir.
* NVIDIA GPU (nvidia) → CPU6 üzerinde 826.512 kesme.
* GPU da kesme üretmiş, ama Wi-Fi kadar yoğun değil.
* USB (xhci_hcd) → CPU4 üzerinde 4.858 kesme.
* Normal seviyede.

* Burada bir müdahale olarak `11n_disable=1` gibi modül parametreleri ile bazı yoğun operasyonlar kapatılabilir:

```
sudo modprobe -r iwlwifi
sudo modprobe iwlwifi 11n_disable=1
```

* Portlar için:
* /proc/ioports → I/O port tahsisi tablosu.


```
[acs@archlinux ~]$ cat /proc/ioports
0000-0000 : PCI Bus 0000:00
  0000-0000 : dma1
  0000-0000 : pic1
  0000-0000 : timer0
  0000-0000 : timer1
  0000-0000 : keyboard
  0000-0000 : PNP0C09:01
    0000-0000 : EC data
  0000-0000 : keyboard
  0000-0000 : PNP0C09:01
    0000-0000 : EC cmd
  0000-0000 : rtc0
  0000-0000 : dma page reg
  0000-0000 : pic2
  0000-0000 : dma2
  0000-0000 : fpu
  0000-0000 : iTCO_wdt
    0000-0000 : iTCO_wdt
  0000-0000 : pnp 00:00
0000-0000 : PCI conf1
0000-0000 : PCI Bus 0000:00
  0000-0000 : pnp 00:00
  0000-0000 : ACPI PM1a_EVT_BLK
  0000-0000 : ACPI PM1a_CNT_BLK
  0000-0000 : ACPI PM_TMR
  0000-0000 : ACPI PM2_CNT_BLK
  0000-0000 : INT3F0D:00
    0000-0000 : INT3F0D:00
  0000-0000 : ACPI GPE0_BLK
  0000-0000 : PCI Bus 0000:01
    0000-0000 : 0000:01:00.0
  0000-0000 : 0000:00:02.0
  0000-0000 : 0000:00:1f.4
  0000-0000 : 0000:00:17.0
    0000-0000 : ahci
  0000-0000 : 0000:00:17.0
    0000-0000 : ahci
  0000-0000 : 0000:00:17.0
    0000-0000 : ahci
  0000-0000 : pnp 00:05
  0000-0000 : pnp 00:00
    0000-0000 : pnp 00:00
      0000-0000 : pnp 00:00
```

* `ioports`: CPU port erişimlerini hangi cihazın kullandığını gösterir.
* Çakışma veya sürücü problemleri buradan görülebilir.
* Normal bir modern sistemde portlar çoğunlukla PCI cihazları ve ACPI ile sınırlıdır. 
* Çıktıda hem klasik aygıtlar (keyboard, timer) hem de modern PCI aygıtları (ahci, 0000:00:17.0) var.

