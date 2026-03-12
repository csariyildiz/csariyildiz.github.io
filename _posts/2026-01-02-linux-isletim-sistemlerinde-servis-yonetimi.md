---
layout: post
title: Linux İşletim Sistemlerinde Servis Yönetimi
tags: [Linux, Servis Yönetimi]
keywords: [systemd,sysvinit,upstart]
---

## Init Programları ve Genel Systemd Kavramları

Bilgisayar açıldığında çekirdek (kernel) yüklendikten sonra çalışan ilk kullanıcı alanı programı init’tir. Bu programın temel sorumlulukları şunlardır:

* `Runlevel / System State Yönetimi` Sistemin hangi çalışma modunda (runlevel veya systemd target) açılacağını belirler. Tek kullanıcı modu, çok kullanıcılı mod veya grafiksel mod gibi sistem durumlarını başlatır.
* `Servisleri Başlatma ve Durdurma` Sistem için gerekli tüm servisleri (daemonları) başlatır. Sistemin kapanması veya yeniden başlatılması durumunda servisleri düzgün şekilde durdurur.
* `Bağımlılık Yönetimi` Servisler arasında bağımlılıkları kontrol eder. Örneğin network servisi başlamadan bazı servisleri başlatmaz.
* `Süreç Yönetimi` PID 1 olarak çalışır ve sistemin tüm süreçlerini izler. Arka plan servisleri ve kritik sistem süreçlerinin çökmesi durumunda müdahale eder veya yeniden başlatır.
* `Konsol ve Terminal Yönetimi` Kullanıcı girişlerinin (login) yapılacağı terminal veya getty süreçlerini başlatır. Tek kullanıcı modunda root erişimi sağlar.
* `Sistem Olaylarına Tepki` Özel olayları işler, örneğin Ctrl+Alt+Del kombinasyonuna tepki verir. Sistemi yeniden başlatmak veya kapatmak için gereken işlemleri tetikler.
* `Boot Sürecinin Kontrolü` Kernel’den sonra sistemin açılışını tamamen yönetir. Başlatma sırasında gerekli konfigürasyon dosyalarını (ör. /etc/inittab veya systemd unit dosyalarını) okur ve uygular.

### Init Programlarının Çeşitleri

* Linux dağıtımlarında servis yönetimi için kullanılan başlıca üç sistem vardır: **SysVinit (System V)**, **systemd** ve **Upstart**. 
* Günümüzde modern Linux dağıtımlarının büyük çoğunluğu varsayılan servis yöneticisi olarak **systemd** kullanmaktadır.
* systemd öncesinde kullanılan Upstart (Ubuntu'nun eski init sistemidir. Bunun haricinde SysVinit `systemd` yaygınlaşmadan önce Debian, Red Hat, Slackware tarafından kullanılmıştır.

### Init Programını Görüntülemek

Sistem içerisinde komut satırı üzerinden hangi init programını kullandığımızı aşağıdaki komutlarla görebiliriz:

```
[acs@archlinux ~]$ which init /sbin/init
/usr/bin/init
/sbin/init
```

Burada /sbin/init SysVinit sistemlerinde, çalışma seviyelerini ve arka plan işlemlerini yönetmekten sorumlu programın tam yoludur. Fakat sistemimiz systemd kullandığından her ikisi de systemd nin executable ına symbolic linktir (softlink).

```
[acs@archlinux ~]$ ls -l /usr/bin/init
lrwxrwxrwx 1 root root 22 Nov 10 12:11 /usr/bin/init -> ../lib/systemd/systemd

[acs@archlinux ~]$ ls -l /sbin/init
lrwxrwxrwx 1 root root 22 Nov 10 12:11 /sbin/init -> ../lib/systemd/systemd
```


`/sbin/init` dosyasının gerçekte hangi programa işaret ettiğini görmek için üsttekilere ek olarak `readlink` komutunu kullanabiliriz:

```
[acs@archlinux ~]$ readlink -f /sbin/init
/usr/lib/systemd/systemd
```

Bu çıktıya göre sistemin **systemd** kullandığını gördük.

Init programı sistemde **PID 1** ile çalışan süreçtir. Bu nedenle aşağıdaki komut ile görüntülenebilir:

```
[acs@archlinux ~]$ ps -p 1 -o user,pid,cmd
USER         PID CMD
root           1 /sbin/init
```

Burada root kullanıcısı ile çalıştığını görüyoruyoruz. Ancak bu çıktı başlattığı diğer processlerin root kullanıcısı ile çalıştığı anlamına gelmez.

Sistemde çalışan süreçleri ve bunların init programı ile ilişkisini bir ağaç yapısı halinde görmek için `pstree` komutunu kullanabiliriz:

```
[acs@archlinux ~]$ pstree
systemd─┬─NetworkManager───3*[{NetworkManager}]
├─agetty
├─avahi-daemon───avahi-daemon
├─bundle───5*[{bundle}]
├─containerd───12*[{containerd}]
├─containerd-shim─┬─node─┬─node─┬─node─┬─node───10*[{node}]
│ │ │ │ └─10*[{node}]
│ │ │ └─10*[{node}]
│ │ └─10*[{node}]
│ └─10*[{containerd-shim}]
├─containerd-shim─┬─tini───node───10*[{node}]
│ └─10*[{containerd-shim}]
├─crond
├─dbus-broker-lau───dbus-broker
├─dirmngr
├─dockerd─┬─docker-proxy───11*[{docker-proxy}]
│ ├─docker-proxy───5*[{docker-proxy}]
│ ├─docker-proxy───7*[{docker-proxy}]
│ ├─docker-proxy───8*[{docker-proxy}]
│ └─16*[{dockerd}]
...
```


## Systemd Init Programı

### Unit Kavramı

systemd'de servisler ve sistem bileşenleri **unit** adı verilen yapılandırma dosyaları ile yönetilir.

Sistemde yüklü ve aktif unit'leri görmek için `systemctl list-units` komutunu kullanılabiliriz:

```
systemctl list-units
```

systemd için farklı türde unit tipleri bulunmaktadır. Bunlardan bazıları şunlardır:

```
service
target
socket
timer
wants
requires
```

* `service` : Belirli bir servis veya daemon’u temsil eder. Örneğin sshd.service sistemde SSH servisini başlatmak, durdurmak veya yeniden başlatmak için kullanılır.
* `target` : Bir grup unit’i bir araya getirir ve sistemin belli bir durumunu temsil eder. Örneğin multi-user.target, çok kullanıcılı ağ modunu ve gerekli servisleri başlatır. target runlevel’lara benzer bir mantıkla çalışır.
* `socket` : Sistem servisleri için network veya IPC socket’i tanımlar. socket unit’leri sayesinde bir servis ihtiyaç duyulana kadar başlatılmaz; bağlantı gelince otomatik olarak servis çalıştırılır (socket activation).
* `timer` : Cron benzeri zamanlamaları yönetir. Belirli bir zamanda veya belli aralıklarla servisleri çalıştırmak için kullanılır. Örneğin backup.timer her gece yedekleme servisini tetikleyebilir.
* `wants` : Bir unit’in isteğe bağlı bağımlılığını belirtir. Belirtilen unit varsa başlatılır, yoksa hata vermez. Örneğin multi-user.target bir servisi wants= ile isteğe bağlı olarak başlatabilir.
* `requires` : Bir unit’in zorunlu bağımlılığını belirtir. Bu unit çalışmazsa bağımlı unit de başlatılmaz ve sistem hata verir. Örneğin bir web sunucusu servisi için gerekli olan network servisi requires=network.target ile belirtilir.


### Unit Dosyalarının Konumu

systemd unit dosyaları genellikle şu dizinlerde bulunur:

```
/etc/systemd/system/
/run/systemd/system/
/usr/lib/systemd/system/
```


### Örnek Unit Dosyası: default.target

Aşağıda `/etc/systemd/system` dizini altında bulunan `default.target` isimli bir unit dosyasından örnek görebiliriz. Boot target'ler SysVinit için göreceğimiz runlevel'ların systemd karşılıklarıdır.

```
[Unit]
Description=Multi-User System
Documentation=man:systemd.special(7)
Requires=basic.target
Conflicts=rescue.service rescue.target
After=basic.target rescue.service rescue.target
AllowIsolate=yes
```

Bu tür unit dosyaları systemd'nin servisleri nasıl başlatacağını, hangi servislerin birbirine bağımlı olduğunu ve hangi sırayla çalıştırılacağını tanımlar.


### systemctl 

* systemctl, Linux’ta systemd tarafından yönetilen servisleri ve sistem durumunu kontrol etmek için kullanılan komut satırı aracıdır.
* systemd sistemi ve servisleri yöneten altyapı iken, systemctl bu altyapıyı kontrol etmek için kullanılan komut satırı arayüzüdür.

`systemctl` ile aşağıdaki işlemler karşılarındaki komutlarla yapılabılir:

* Servisleri başlatmak: `systemctl start nginx`
* Servisleri durdurmak: `systemctl stop nginx`
* Servisleri yeniden başlatmak: `systemctl restart nginx`
* Servislerin çalışıp çalışmadığını görmek: `systemctl status nginx`
* Servislerin boot sırasında otomatik başlamasını sağlamak : `systemctl enable nginx`
* Sistem runlevel / target değiştirmek : `systemctl isolate multi-user.target`, `systemctl get-default`, `systemctl set-default multi-user.target`
* Daemon reload yapmak : systemd’ye “servis dosyalarını tekrar okumasını sağlamak: `systectl daemon-reload`
* Çalışan servisleri listelemek: `systemctl list-units --type=service`
* Aktiflik (çalışır olma), enable (sistem başlangıcında başlatma) durumunu sorgulama: `systemctl is-active unit.service`, `systemctl is-enabled unit.service`
* Sistemi RAM'deki veriyi tutatak uyku moduna geçirmek (suspend): `systemctl suspend`
* Sistemi RAM'deki veriyi diske kopyalayarak kapatmak. (Açıldığında tekrar yüklenecek şekilde) (hibernate): `systemctl hibernate`

* Örneğin `PasswordAuthentication no` satırı `/etc/ssh/sshd_config` konfigurasyonuna eklendiğindei `systemctl reload sshd` komutu kullanılarak SSH sessionlarının bağlantısı kesilmeden yeni bağlantılar kabul edilir.
* `systemctl daemon-reload` komutu, systemd'nin dizinlerde bulunan tüm service, socket, timer, mount ve target dosyalarını servisleri yeniden başlatmadan tekrar okumasını sağlar.


### Sistem Runlevel ve Target Değiştirmek

* Sistem üzerinde aşağıdaki targetler bulunur.
* `systemctl isolate multi-user.target`, `systemctl get-default`, `systemctl set-default multi-user.target` gibi komutlarla kullanılır.
* Isolate sistemi belirli bir target durumuna geçirir. `systemctl isolate multi-user.target` komutu `init 3` veya `telinit 3` komutuna karşılık gelir.

| Target              | Anlamı                                | Eski Runlevel |
| ------------------- | ------------------------------------- | ------------- |
| `poweroff.target`   | sistemi kapatma                       | **0**         |
| `rescue.target`     | tek kullanıcılı kurtarma modu         | **1**         |
| `multi-user.target` | çok kullanıcılı konsol modu (GUI yok) | **3**         |
| `graphical.target`  | grafik arayüzlü sistem                | **5**         |
| `reboot.target`     | sistemi yeniden başlatma              | **6**         |


### Kendi Servisini Oluşturmak

* Kendi sistemd servisini yazmak için bir unit dosyası (.service) oluşturulur. Daha sonra systemctl ile yönetilir.
* Örnek bir dosya `nano /etc/systemd/system/myapp.service` altında aşağıdaki gibi oluşturulabilir.

```
[Unit]
Description=My Custom App
After=network.target

[Service]
ExecStart=/usr/bin/python3 /home/user/app.py
Restart=always
User=user

[Install]
WantedBy=multi-user.target
```


## SysVinit
 
* `SysVinit` daha açık ismiyle `System V init`, adını System V Unix işletim sisteminden alır. Linux ve Unix benzeri sistemlerde kullanılan en eski ve klasik init ve servis yönetim sistemlerinden biridir.
* Sistemin başlangıç davranışı `/etc/inittab` dosyası tarafından belirlenir. Bu dosya, init programına varsayılan runlevel, hangi servislerin başlatılacağı, hangi terminallerin açılacağı, sistem olaylarında hangi komutların çalıştırılacağı gibi bilgileri sağlar.
* Init programı `/sbin/init` sistem açıldığında dosyayı okuyarak sistemi yapılandırır.
* Init program sistemi başlatıp gerekli servisleri çalıştırırken aynı zamanda sistem durumunu (runlevel) yönetir.
* SysVinit'te init programı başka bir deyişle /sbin/init dosyası bir process olarak PID 1 ile çalışır.

* Runlevellar SysVinit'in en önemli özelliklerinden biridir. Runlevellar ile sistem için çalışma modları tanımlanmış olur. Runlevel, sistemin hangi çalışma modunda olduğunu belirler.

Tanımlı runlevel'lar:

```
Runlevel	| Açıklama
------------------------------------------
0	        Sistemi kapatma
1	        Single user mode (bakım modu)
2	        Çok kullanıcılı mod
3	        Çok kullanıcılı + network
4	        Kullanıcı tanımlı
5	        Grafik arayüzlü çok kullanıcılı
6	        Yeniden başlatma
```

### Runlevel Detayları

* Örneğin sistem `runlevel 3` ile açılırsa network servisleri başlar fakat grafik arayüz açılmaz.
* Runlevel görmek için `runlevel` veya `who -r` komutları kullanılabilir. Archlinux, Raspbian gibi Debian tabanlı olmadığından bu komutlara sahip değildir.

Örneğin Rasbbian üzerinden aşağıdaki gibi görüntüleyebiliriz:

```
acs@acs-raspi1:~ $ runlevel
N 3

acs@acs-raspi1:~ $ who -r
run-level 3  1970-01-02 02:10
```

* Burada sistem `runlevel 3` de iken N harfi runlevel'ın last boottan itibaren değiştirilmediğini ifade ediyor.

* `Runlevel 0`: Sistemin tamamen kapalı olduğu durumdur. Bu runlevel seçildiğinde sistem kapanır ve tekrar açılmaz.
* `Runlevel 1`: Tek kullanıcı modudur (single-user mode). Ağ (network) özellikleri kapalıdır ve genellikle bakım veya kurtarma işlemleri için kullanılır.
* `Runlevel 2, 3, 4`: Çok kullanıcı modlarıdır (multi-user). Kullanıcılar konsol veya ağ üzerinden sisteme giriş yapabilir. Debian ve Raspbian tabanlı sistemlerde runlevel 3, çok kullanıcılı network moduna denk gelir ve genellikle varsayılan mod olarak kullanılır.
* `Runlevel 5`: Grafiksel oturum açma özellikli çok kullanıcı modudur. Temel olarak runlevel 3 ile aynı işlevi görür ancak ek olarak bir grafik arayüz sunar.
* `Runlevel 6`: Sistem yeniden başlatma modudur. Bu runlevel seçildiğinde sistem kapanır ve otomatik olarak yeniden açılır.


### Runlevel'ları Değiştirmek

* `telinit 1` komutu, SysVinit sisteminin mevcut çalışma seviyesini bakım moduna değiştirmek için kullanılır.
* Benzer şekilde `telinit 1` komutu basitçe sistemi reboot edecektir.

### SysVinit Servis Scriptleri

`SysVinit`'te servisler shell scriptleri ile yönetilir. Scriptler genellikle /etc/init.d/ dizininde bulunur. Bu dosyalar bash shell scriptleridir. Daha sonra açıklayacağımız gibi örneğin `/etc/rc3.d/` dizinindeki `S20ssh` gibi isimleri olan sembolik linklerle çalıştırılır. 

```
acs@acs-raspi1:/etc/init.d $ ls
alsa-utils           console-setup.sh  dphys-swapfile     kmod                  paxctld                      rpcbind         sudo
apache2              cron              fake-hwclock       lightdm               plymouth                     rsync           triggerhappy
apache-htcacheclean  cups              fio                mariadb               plymouth-log                 saned           udev
apparmor             cups-browsed      hwclock.sh         netfilter-persistent  procps                       screen-cleanup  x11-common
bluetooth            dbus              keyboard-setup.sh  nfs-common            pulseaudio-enable-autospawn  ssh
```

Örneğin `sshd`, `network` ve `apache2` gibi her bir servis için bir script tanımlanmıştır:

```
/etc/init.d/sshd
/etc/init.d/network
/etc/init.d/apache2
```

Bu scriptler servisleri başlatmak veya durdurmak için kullanılır. Öntanımlı parametrelerle uyumlu şekilde tanımlanmışlardır.

Örneğin:

```
/etc/init.d/sshd start
/etc/init.d/sshd stop
/etc/init.d/sshd restart
```

### SysVinit Runlevel Dizini

Hangi servisin hangi runlevel'da çalışacağını belirleyen sembolik linkler şu dizinlerde bulunur:

```
/etc/rc0.d/
/etc/rc1.d/
/etc/rc2.d/
/etc/rc3.d/
/etc/rc4.d/
/etc/rc5.d/
/etc/rc6.d/
```

Bu dizinlerdeki dosyalar aslında yukarıda belirttiğimiz `/etc/init.d` içindeki scriptlere linktir.

```
acs@acs-raspi1:/etc/rc0.d $ ls -ltr /etc/rc0.d
total 0
lrwxrwxrwx 1 root root 20 Nov 19  2024 K01hwclock.sh -> ../init.d/hwclock.sh
lrwxrwxrwx 1 root root 17 Nov 19  2024 K01paxctld -> ../init.d/paxctld
lrwxrwxrwx 1 root root 14 Nov 19  2024 K01udev -> ../init.d/udev
lrwxrwxrwx 1 root root 22 Nov 19  2024 K01triggerhappy -> ../init.d/triggerhappy
lrwxrwxrwx 1 root root 20 Nov 19  2024 K01alsa-utils -> ../init.d/alsa-utils
lrwxrwxrwx 1 root root 22 Nov 19  2024 K01fake-hwclock -> ../init.d/fake-hwclock
lrwxrwxrwx 1 root root 17 Nov 19  2024 K01rpcbind -> ../init.d/rpcbind
lrwxrwxrwx 1 root root 20 Nov 19  2024 K01nfs-common -> ../init.d/nfs-common
lrwxrwxrwx 1 root root 19 Nov 19  2024 K01bluetooth -> ../init.d/bluetooth
lrwxrwxrwx 1 root root 17 Nov 19  2024 K01lightdm -> ../init.d/lightdm
lrwxrwxrwx 1 root root 18 Nov 19  2024 K01plymouth -> ../init.d/plymouth
lrwxrwxrwx 1 root root 22 Nov 19  2024 K01cups-browsed -> ../init.d/cups-browsed
lrwxrwxrwx 1 root root 37 Nov 19  2024 K01pulseaudio-enable-autospawn -> ../init.d/pulseaudio-enable-autospawn
lrwxrwxrwx 1 root root 15 Nov 19  2024 K01saned -> ../init.d/saned
lrwxrwxrwx 1 root root 13 Nov 19  2024 K01fio -> ../init.d/fio
lrwxrwxrwx 1 root root 30 Dec 14  2024 K01netfilter-persistent -> ../init.d/netfilter-persistent
lrwxrwxrwx 1 root root 17 Dec 22  2024 K01apache2 -> ../init.d/apache2
lrwxrwxrwx 1 root root 29 Dec 22  2024 K01apache-htcacheclean -> ../init.d/apache-htcacheclean
lrwxrwxrwx 1 root root 17 Dec 23  2024 K01mariadb -> ../init.d/mariadb
```

İsimleri için özel adlandırmalar kullanılır:

```
S20ssh
K10network
```

Buradaki harflerin anlamı:

* `S → Start` (servisi başlat)
* `K → Kill` (servisi durdur)

Sayılar ise başlatma sırasını belirlemek mümkün olur.

Örneğin kısayollara aşağıdaki isimler verildiyse:

```
S10network
S20ssh
```

* Yukarıdaki gibi bir isimlendirme ile önce network başlar, sonra ssh servisi başlatılır.

* Örneğin sistem `runlevel 1`e girdiğinde `/etc/rc1.d/K90network` ile ilgili servislere ne olur? Dosya adının başında K harfi bulunduğu için ilgili servisler durdurulacaktır.

### /etc/inittab Dosyası

Daha önce de belirtildiği gibi SysVinit sistemlerinde sistemin başlangıç davranışı `/etc/inittab` dosyası tarafından belirlenir. Bu dosya, init programına varsayılan runlevel, hangi servislerin başlatılacağı, hangi terminallerin açılacağı, sistem olaylarında hangi komutların çalıştırılacağı gibi bilgileri sağlar. Init programı `/sbin/init` sistem açıldığında dosyayı okuyarak sistemi yapılandırır.

Inittab dosyası ne yazık ki Raspbian da da bulunmuyor. Aşağıdaki gibi bir örnek üzerinden ilerleyebiliriz:

```
# /etc/inittab: Sample inittab file for SysVinit
#
# Default runlevel (3=Multi-user, 5=X11 GUI)
id:3:initdefault:

# Not:
# Varsayılan runlevel satırıdır.
# Sistem açıldığında hangi runlevel ile başlayacağını belirler.
# Burada 3 seçilmiş → çok kullanıcılı metin tabanlı mod.
# id → satır kimliği, initdefault → default runlevel’i ayarlayan action.

# System initialization
si::sysinit:/etc/init.d/rcS

# Sistem açılırken ilk çalışacak başlangıç scripti.
# si → satır kimliği, sysinit → init action türü.
# /etc/init.d/rcS → boot sırasında temel sistem servislerini başlatan script.

# Runlevel scripts
l0:0:wait:/etc/init.d/rc 0
l1:1:wait:/etc/init.d/rc 1
l2:2:wait:/etc/init.d/rc 2
l3:3:wait:/etc/init.d/rc 3
l4:4:wait:/etc/init.d/rc 4
l5:5:wait:/etc/init.d/rc 5
l6:6:wait:/etc/init.d/rc 6

# Her runlevel için çalışacak scriptler burada tanımlanır.
# Örnek: l3:3:wait:/etc/init.d/rc 3 → runlevel 3’e geçildiğinde /etc/init.d/rc 3 scriptini çalıştır.
# wait → script çalışıp bitene kadar init’in beklemesini sağlar.

# What to do in single-user mode
~:S:wait:/sbin/sulogin

# Single-user mode (tek kullanıcı modu) için komut.
# ~ → satır kimliği, S → single-user runlevel.
#/sbin/sulogin → root kullanıcı girişini sağlar (bakım modu).

# Terminal lines
c1:12345:respawn:/sbin/getty 38400 tty1
c2:2345:respawn:/sbin/getty 38400 tty2

# TTY (terminal) girişlerini başlatır.
# c1 ve c2 → satır kimlikleri.
# 12345 → runlevel’lar (1,2,3,4,5) için aktif.
# respawn → süreç kapanırsa yeniden başlat.
# /sbin/getty 38400 tty1 → tty1 üzerinden kullanıcı login ekranını başlatır.

# Reboot on Ctrl+Alt+Del
ca:12345:ctrlaltdel:/sbin/shutdown -t1 -h -r now

# Ctrl+Alt+Del kombinasyonuna tepki.
# ca → satır kimliği.
# ctrlaltdel → bu action türü, kullanıcı Ctrl+Alt+Del tuşlarına bastığında tetiklenir.
# /sbin/shutdown -t1 -h -r now → sistemi hemen kapatır ve yeniden başlatır (-r → reboot, -h → halt, -t1 → 1 saniye gecikme).

```

* `/etc/inittab` ve `runlevel` scriptlerinde adımlar belirli bir sıra ile çalışır.
* `wait` action’ı scriptin tamamlanmasını bekler.
* Runlevel scriptleri genellikle numara veya ad sırasına göre çalıştırılır (örneğin /etc/rc3.d/S10network önce, S20sshd sonra).
* Eğer sıralama doğru yapılmazsa, bağımlılıkları olan servisler düzgün çalışmayabilir.
* Örnek: ssh servisi network servisi başlamadan başlarsa hata alır.
* Yani sıralama, servislerin başlama önceliğini ve bağımlılıklarını yönetmek için kritik önemdedir.

* SysVinit, bir script veya servis çalışırken hata alırsa alternatif runlevel’e geçme mekanizmasına sahiptir.
* Örneğin `/etc/init.d/rc 3` sırasında kritik bir servis çalışmazsa, sistem genellikle rescue veya single-user runlevel’e geçer.
* Bu, sistemin tamamen çökmesini önler ve bakım/mod kurtarma moduna geçiş sağlar.


### /etc/inittab Dosyası Satır Formatı

`/etc/inittab` dosyasındaki her satır  init programı `/sbin/init` tarafından okunan özel bir satır formatında yazılır. 

Satır formatı aşağıdaki gibidir:

```
id:runlevels:action:process

| Alan      | Açıklama                     |
| --------- | ---------------------------- |
| id        | işlem kimliği                |
| runlevels | hangi runlevel'da çalışacağı |
| action    | nasıl çalıştırılacağı        |
| process   | çalıştırılacak komut         |
```

Örnekler:

```
id:3:initdefault:
l3:3:wait:/etc/init.d/rc 3
~:S:wait:/sbin/sulogin
c1:12345:respawn:/sbin/getty 38400 tty1
ca:12345:ctrlaltdel:/sbin/shutdown -t1 -h -r now
```

Yaygın action türleri:

```
| Action      | Açıklama                        |
| ----------- | ------------------------------- |
| initdefault | varsayılan runlevel             |
| respawn     | süreç kapanırsa yeniden başlat  |
| wait        | çalıştır ve bitmesini bekle     |
| once        | sadece bir kere çalıştır        |
| ctrlaltdel  | Ctrl+Alt+Del basılınca çalıştır |
```
### Kernel Parametrelerinde Runlevel Değerleri
 
Eğer `SysVinit` sisteminde `/etc/inittab`’da default `runlevel 3` olarak tanımlı olmasına rağmen sistem hep runlevel 1 ile açılıyorsa, muhtemel neden kernel’in boot parametreleridir. Kernel parametrelerinde 1 veya S varsa init, bu parametreyi öncelikli olarak kullanır ve sistem tek kullanıcı modunda başlar.

* Linux çekirdeği (kernel), açılış sırasında parametreler alabilir.
* Örneğin GRUB veya LILO bootloader üzerinden kernel’e özel runlevel belirten parametreler geçilebilir.
* Eğer kernel parametre listesinde 1 veya S varsa:

```
linux /vmlinuz-linux root=/dev/sda1 ro single
//veya
linux /vmlinuz-linux root=/dev/sda1 ro 1
```

* Bu durumda init, kernel’in parametresini öncelikli olarak kabul eder.
* Yani /etc/inittab’daki default runlevel göz ardı edilir ve sistem tek kullanıcı modunda başlar.
* S veya 1 parametresi → init’e “single-user mode’da başla” demektir.
* Bu genellikle bakım veya kurtarma moduna hızlı geçmek için yapılır.
* Normal boot için kernel parametreleri boş bırakılmalı veya runlevel belirtilmemelidir.

SysVinit'in avantajları basit ve anlaşılır yapıya sahip olmasıdır. Tamamen shell scriptlerini kullanır. Unix felsefesine daha yakındır. 
Dezavantajları ise servisler sıralı başlamasıdır. Bu paralel başlatmanın olmadığı anlamına gelir. Bağımlılık yönetimi zayıftır. Sonuç olarak boot süresi de daha yavaştır.

## Upstart

**Upstart**, Linux sistemleri için geliştirilmiş **event-driven (olay tabanlı) bir init sistemi**dir. 
Özellikle Ubuntu tarafından geliştirilmiş ve bir dönem Ubuntu başta olmak üzere bazı Linux dağıtımlarında kullanılmıştır. 
Daha sonra birçok dağıtım **systemd** sistemine geçmiştir.

Upstart’ın amacı, klasik **SysVinit** sistemindeki yavaş ve sıralı servis başlatma problemini çözmek ve sistemi **daha hızlı ve esnek bir şekilde başlatmaktır**.

- **Olay tabanlı (event-driven) çalışma**
  - Servisler belirli olaylara göre başlatılır veya durdurulur.
  - Örneğin: sistem açılması, dosya sistemi mount edilmesi, ağın hazır olması gibi olaylar servisleri tetikleyebilir.

- **Paralel servis başlatma**
  - SysVinit’te servisler sırayla başlatılırken Upstart’ta uygun servisler aynı anda başlatılabilir.
  - Bu da sistem açılış süresini kısaltır.

- **Runlevel uyumluluğu**
  - Eski SysVinit runlevel yapısını destekler.
  - Böylece eski sistemlerle uyumluluk sağlanır.

- **Servislerin otomatik yeniden başlatılması**
  - Bir servis çökerse `respawn` özelliği ile otomatik yeniden başlatılabilir.

- **Basit servis yapılandırması**
  - Servis konfigürasyonları basit metin dosyaları ile tanımlanır.

### Upstart Konfigürasyon Dosyaları

Upstart servis tanımları genellikle şu dizinde bulunur:

```
/etc/init/
```

Dosya uzantıları genellikle `.conf`'dur. Örnek bir servis dosyasının içeriği aşağıdaki gibidir:

```
description "Example Service"

start on filesystem
stop on runlevel [!2345]

respawn
exec /usr/bin/example
```

### Upstart Servis Kontrolü

Upstart servisleri genellikle initctl komutu ile yönetilir.

* Servis başlatma: `initctl start servis_adi`
* Servis durdurma: `initctl stop servis_adi`
* Servis durumunu kontrol etme: `initctl status servis_adi`
* Sistem servislerini ve mevcut durumlarını listeleme: `initctl list`

Özet olarak,
* Upstart, SysVinit’e göre daha modern bir init sistemi olup olay tabanlı servis yönetimi ve paralel başlatma gibi özellikler sunar. 
* Ancak zamanla daha gelişmiş özellikler sunan systemd tarafından büyük ölçüde yerini kaybetmiştir.


## Sistemi Kapatmak ve Yeniden Başlatmak

* What is the primary function of the `shutdown` command besides powering off or rebooting? It notifies all logged-in users with a warning message and prevents new logins.
* If the `shutdown` command is run without the `-h` or `-r` options, what is the default action? The system will change to runlevel 1 (single-user mode)
* What is the syntax for scheduling a shutdown in 15 minutes with a custom message?  shutdown +15 message
* How can a system reboot scheduled with the `shutdown` command be canceled? By using the command `shutdown -c`

* In a `systemd`-based system, what is the command to reboot the machine? systemctl reboot
* In a `systemd`-based system, what is the command to power off the machine? systemctl poweroff

* How could the `telinit` command be used to reboot a SysVinit system? The command `telinit 6` will change to runlevel 6, which reboots the system.

### Reboot

* Reboot system safely. (use systemctl) sudo systemctl reboot
* Shutdown system safely. sudo systemctl poweroff
* Reboot system by force. sudo systemctl reboot --force
* Poweroff system by force. sudo systemctl poweroff --force
* Reboot system immediately. (button effect) sudo systemctl reboot --force --force
* Poweroff system immediately. (button effect) sudo systemctl shutdown --force --force
* Reboot system in spesific time. 02:00 (dont use systemctl) sudo shutdown -r 02:00
* Reboot system after 15 minutes. (dont use systemctl) sudo shutdown -r +15
* Shutdown system after 15 minutes. (dont use systemctl) sudo shutdown +15
* Reboot after 15 minutes with wall message. sudo shutdown -r +15 'Scheduled restart to do offline'

### Wall Komutu

* What command sends a message to the terminal sessions of all logged-in users? wall
* Edit file for message of the day. /etc/motd

### Journalctl İle Logları Görüntülemek

* How to see logs with systemd including kernel messages system boot messages systemd service logs user session logs and application logs if it uses it. journalctl
* With the journals, Follow logs live journalctl -f
* With the journals, View newest entries first: journalctl -r
* With the journals, Show logs of nginx service journalctl -u nginx
* With the journals, Last few logs journalctl -xe
* With the journals, Last 10 minutes journalctl --since "10min ago"
* With the journals, Onlt 10 lines journalctl -n 10
* With the journals, Last 1 day journalctl -S -1d
* With the journals, With process id journalctl _PID=16883

