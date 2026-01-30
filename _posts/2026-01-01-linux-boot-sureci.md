---
layout: post
title: Linux İşletim Sistemlerinde Boot Süreci
tags: [test]
---

Linux tabanlı işletim sistemlerini tanımlamak için araba benzetmesi sıkça kullanılır. Kernel yani çekirdek arabanın motoruna benzetilir. Arabanın motoru daha az çeşitlilik barındırır. Daha temel bir işlevi yüklenir. Üstünde ise markalara göre farklılaşan hatta modele göre farklılaşan ek farklı özellikler eklenir. Tıpkı araba markaları gibi Linux da farklı dağıtımlar barındırır. Bilindiği üzere aslında Linux adlandırması aslında sadece kerneli tanımlar. GNU / Linux ise tam bir işletim sistemini yani Linux artı GNU araçlarını tanımlar. Tıpkı arabanın kontak kapalı durumdan çalışır duruma geçişinde işleyen bir süreç olduğu gibi bilgisayarlarda da benzer bir süreç yürür.

Sistem başlangıç sürecini üç temel başlık altında incelemek mümkündür: başlangıç aşamaları, kernel parametreleri ve boot mesajlarının okunması. Bu üç unsur birlikte ele alındığında, bir Linux sisteminin açılış sürecini anlamak ve olası sorunları teşhis etmek çok daha kolay hale gelir.

Başlangıç aşamalarında, bir makinenin kontrol edilebilir hale gelmesi için işletim sisteminin temel bileşeni olan kernel’in, bootloader tarafından çağrılması gerekir. Bootloader ise BIOS veya UEFI gibi sistemin firmware’i tarafından yüklenir. Her iki firmware türü aynı görevi yerine getirse de farklı yöntemlerle çalışır. Bu aşamada iki nokta kritik önem taşır: dosya sisteminin nerede olduğunun belirlenmesi ve kernel’in uygun parametrelerle başlatılması. Açılış süreci boyunca hangi verinin nereden alındığı ve işlemlerin sırası sistemin sorunsuz çalışması için belirleyicidir.

Kernel parametreleri, bootloader tarafından kernel’e iletilen ve sistemin nasıl başlatılacağını belirleyen değerlerdir. Bu parametreler kullanıcı tarafından düzenlenebilir ve işletim sistemi davranışını doğrudan etkiler. Örneğin root dosya sisteminin hangi partition üzerinde bulunduğu veya sistemin hangi modda çalıştırılacağı bu parametrelerle tanımlanır. Dolayısıyla temel kernel parametrelerinin bilinmesi hem yapılandırma hem de sorun giderme süreçleri için önemlidir.

Kernel yüklendikten sonra açılış sürecine devam ederek donanım bileşenlerini tanımlar ve yapılandırır. Bu sürecin ilk adımı, geçici bir kök dosya sistemi görevi gören initramfs’in yüklenmesidir. Daha sonra kernel, sistem servislerinin başlatılmasından ve yönetiminden sorumlu olan init programını çağırır. Sistemin tam olarak kullanılabilir hale gelmesini sağlayan işlemler bu aşamada yürütülür. Günümüzde pek çok Linux dağıtımında bu program systemd’dir

Son aşama olarak boot mesajlarının okunması, başlangıçta meydana gelen olayların anlaşılması ve sorunların tespit edilmesi açısından büyük önem taşır. Bu amaçla dmesg ve journalctl araçları kullanılır. Donanım tanıma, sürücü yükleme veya hata mesajları gibi birçok kritik bilgi bu araçlarla görüntülenebilir. Bu nedenle her iki aracın temel kullanım biçimlerini ve parametrelerini bilmek, sistem yönetimi için vazgeçilmezdir.
