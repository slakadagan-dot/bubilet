export const mockEvents = [
  // İSTANBUL - KONSERLER
  {
    id: 1,
    title: 'Mabel Matiz - Canlı Performans',
    date: '15 Haziran 2026, 21:00',
    venue: 'KüçükÇiftlik Park',
    price: 1850,
    category: 'Konser',
    city: 'İstanbul',
    isSeated: false,
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80',
    description: 'Mabel Matiz, yeni albümünün turnesi kapsamında KüçükÇiftlik Park\'ta müzikseverlerle buluşuyor. Unutulmaz bir gece için biletlerinizi şimdiden alın!\n\nTürkiye pop müziğinin en sevilen isimlerinden Mabel Matiz, 2026 yaz turnesi kapsamında İstanbul\'da sahne alacak. "Bir Hadise Var" ve "Gök Nerede" gibi hit şarkılarıyla dinleyicileri büyüleyecek olan sanatçı, özel sahne tasarımı ve görsel şovlarıyla da unutulmaz bir deneyim sunacak. Konserde, sanatçının yeni albümünden şarkılar ile klasik parçaları bir arada dinleme imkanı bulacaksınız.',
    ticketTypes: [
      { id: 'sahne-onu', name: 'Sahne Önü Ayakta', price: 2850 },
      { id: 'saha-ici', name: 'Saha İçi Ayakta', price: 1850 },
      { id: 'arka', name: 'Arka Alan Ayakta', price: 1250 }
    ],
    rules: [
      "Etkinlik alanına profesyonel fotoğraf makinesi ve kayıt cihazları alınmayacaktır.",
      "18 yaş sınırı vardır. 18 yaş altı katılımcılar ebeveyn eşliğinde girebilir.",
      "Etkinlik alanına dışarıdan yiyecek ve içecek getirmek yasaktır.",
      "Katılımcıların kimlik kontrolü yapılacaktır.",
      "Alkol satışı ve tüketimi 18 yaş sınırına tabidir."
    ]
  },
  {
    id: 2,
    title: 'Duman - 25. Yıl Özel Konser',
    date: '27 Temmuz 2026, 20:30',
    venue: 'Harbiye Cemil Topuzlu',
    price: 1650,
    category: 'Konser',
    city: 'İstanbul',
    isSeated: false,
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
    description: 'Türkiye rock müziğinin efsanesi Duman, 25. yılını Harbiye Cemil Topuzlu\'da özel bir konserle kutluyor. Tüm hit şarkıları ve sürprizler sizi bekliyor!\n\nKuruldukları günden bu yana Türk rock müziğinin en önemli gruplarından biri olan Duman, çeyrek asrı deviren konseriyle sevenleriyle buluşacak. "Hayvan", "Köprüaltı", "Seni Kendime Yaptım" gibi klasikleşen şarkıları, "Oyladığım Şarkı" ve "Helal Olsun" gibi yeni eserlerle birlikte dinleyicilere sunulacak.',
    ticketTypes: [
      { id: 'sahne-onu', name: 'Sahne Önü Ayakta', price: 2450 },
      { id: 'saha-ici', name: 'Saha İçi Ayakta', price: 1650 }
    ],
    rules: [
      "Etkinlik 18+ yaş sınırına sahiptir.",
      "Alkol satışı ve tüketimi 18 yaş sınırına tabidir.",
      "Etkinlik alanına dışarıdan yiyecek/içecek sokmak yasaktır.",
      "Organizatör programda değişiklik yapma hakkını saklı tutar.",
      "Profesyonel kayıt cihazları yasaktır."
    ]
  },
  {
    id: 3,
    title: 'Cem Adrian - Sen Uyurken Akustik',
    date: '8 Ağustos 2026, 20:00',
    venue: 'Maximum Uniq Açık Hava',
    price: 1450,
    category: 'Konser',
    city: 'İstanbul',
    isSeated: false,
    imageUrl: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=900&q=80',
    description: 'Cem Adrian, en sevilen şarkılarının akustik versiyonlarıyla Maximum Uniq Açık Hava\'da. Doğa ve müziğin buluştuğu bu özel gecede yerinizi alın!\n\nTürkiye müziğinin en özgün seslerinden Cem Adrian, "Beni Öldüreceksin", "Yorgun Savaşçı" gibi şarkılarını akustik formatta sevenleriyle buluşturacak. Sanatçının derin sesi ve şiirsel sözleri, açık havanın doğal atmosferiyle birleşerek dinleyicilere unutulmaz bir müzik deneyimi sunacak.',
    ticketTypes: [
      { id: 'sahne-onu', name: 'Sahne Önü Ayakta', price: 2150 },
      { id: 'saha-ici', name: 'Saha İçi Ayakta', price: 1450 }
    ],
    rules: [
      "Etkinlik alanına girişte bilet kontrolü yapılacaktır.",
      "18 yaş altı katılımcılar ebeveyn eşliğinde girebilir.",
      "Profesyonel fotoğraf ve video çekimi yasaktır.",
      "Etkinlik alanı kapasitesi sınırlıdır.",
      "Yağmurlu havada gerçekleşir."
    ]
  },
  {
    id: 4,
    title: 'Manga - 20. Yıl Konseri',
    date: '18 Eylül 2026, 21:00',
    venue: 'IF Performance Hall',
    price: 1250,
    category: 'Konser',
    city: 'İstanbul',
    isSeated: false,
    imageUrl: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=900&q=80',
    description: 'Türkiye rock müziğinin öncülerinden Manga, 20. yılını İstanbul IF Performance Hall\'da özel bir konserle kutluyor. Tüm klasikleri ve yeni şarkılar sizi bekliyor!\n\nTürkiye\'nin en önemli rock gruplarından Manga, 20. kuruluş yılını özel bir konserle kutluyor. "Bir Kadın Çizeceksin", "Dursun Zaman", "Kalan Gerçekler" gibi hit şarkıları, yeni albümlerinden parçalarla birlikte sevenleriyle buluşacak.',
    ticketTypes: [
      { id: 'sahne-onu', name: 'Sahne Önü', price: 1850 },
      { id: 'saha-ici', name: 'Saha İçi', price: 1250 }
    ],
    rules: [
      "Etkinlik 18+ yaş sınırına sahiptir.",
      "Güvenlik kontrolü zorunludur.",
      "Yasaklı maddeler alınmayacaktır.",
      "Organizatör programda değişiklik yapma hakkını saklı tutar."
    ]
  },

  // İSTANBUL - TİYATROLAR
  {
    id: 5,
    title: 'Beckett - Godot\'yu Beklerken',
    date: '20 Haziran 2026, 20:30',
    venue: 'İstanbul Şehir Tiyatroları',
    price: 450,
    category: 'Tiyatro',
    city: 'İstanbul',
    isSeated: true,
    imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=80',
    description: 'Samuel Beckett\'in absürt tiyatro klasiği "Godot\'yu Beklerken", İstanbul Şehir Tiyatroları sahnesinde. Modern tiyatron en önemli eserlerinden biri.\n\n20. yüzyıl tiyatrosunun en önemli eserlerinden olan "Godot\'yu Beklerken", absürt tiyatronun başyapıtı Samuel Beckett tarafından yazılmıştır. İki adamın, Asla Gelmeyen Godot\'yu bekleyişini konu alan oyun, varoluşçu felsefenin tiyatrodaki en güçlü örneklerinden biridir.',
    ticketTypes: [
      { id: 'balkon', name: 'Balkon', price: 350 },
      { id: 'orchestra', name: 'Orkestra', price: 450 },
      { id: 'vip-loj', name: 'VIP Loj', price: 650 }
    ],
    rules: [
      "Tiyatro salonuna giriş gösterim başlamadan 15 dakika önce kapanır.",
      "6 yaş altı çocukların girişine izin verilmez.",
      "Kayıt cihazları ve fotoğraf makineleri yasaktır.",
      "Oyun süresince salon dışına çıkış yapılamaz."
    ]
  },
  {
    id: 6,
    title: 'Cem Yılmaz - Diamond',
    date: '15 Temmuz 2026, 21:00',
    venue: 'Zorlu PSM Turkcell Sahnesi',
    price: 1250,
    category: 'Stand Up',
    city: 'İstanbul',
    isSeated: true,
    imageUrl: 'https://images.unsplash.com/photo-1521334726092-b509a19597b9?auto=format&fit=crop&w=900&q=80',
    description: 'Cem Yılmaz\'ın yeni stand up gösterisi "Diamond", Zorlu PSM Turkcell Sahnesi\'nde! Türkiye\'nin en çok beklenen komedi gösterisi.\n\nTürkiye\'nin en sevilen komedyenlerinden Cem Yılmaz, yeni stand up gösterisi "Diamond" ile sevenleriyle buluşuyor. Yıllardır izleyicileri kahkahaya boğan Sanatçı, bu yeni gösterisinde güncel konuları, sosyal gözlemleri ve özgün mizah anlayışını bir araya getiriyor.',
    ticketTypes: [
      { id: 'arka', name: 'Arka Koltuklar', price: 850 },
      { id: 'orta', name: 'Orta Koltuklar', price: 1250 },
      { id: 'on', name: 'Ön Koltuklar', price: 1850 }
    ],
    rules: [
      "Etkinlik 16+ yaş sınırına sahiptir.",
      "Kayıt cihazları ve fotoğraf makineleri kesinlikle yasaktır.",
      "Gösteri sırasında salon dışına çıkış yapılamaz.",
      "Girişte kimlik kontrolü yapılacaktır."
    ]
  },
  {
    id: 7,
    title: 'Shakespeare - Romeo ve Juliet',
    date: '8 Ağustos 2026, 19:00',
    venue: 'Kadıköy Haldun Taner Sahnesi',
    price: 380,
    category: 'Tiyatro',
    city: 'İstanbul',
    isSeated: true,
    imageUrl: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=900&q=80',
    description: 'William Shakespeare\'in efsanevi eseri "Romeo ve Juliet", Kadıköy Haldun Taner Sahnesi\'nde. Aşkın ve trajedinin en güzel hikayesi.\n\nİngiliz tiyatrosunun en büyük yazarlarından William Shakespeare\'in "Romeo ve Juliet" trajedisi, dünya edebiyatının en bilinen eserlerinden biridir. İki rakip ailenin çocukları olan Romeo ve Juliet\'nin yasak aşkları, trajik sonuçlarıyla tiyatro sahnesinde canlandırılıyor.',
    ticketTypes: [
      { id: 'balkon', name: 'Balkon', price: 280 },
      { id: 'orchestra', name: 'Orkestra', price: 380 },
      { id: 'ilk-sira', name: 'İlk Sıra', price: 550 }
    ],
    rules: [
      "Tiyatro salonuna geç giriş yapılmaz.",
      "10 yaş altı çocukların girişine izin verilmez.",
      "Kayıt ve fotoğraf çekimi yasaktır.",
      "Etkinlik süresince sessizlik rica edilir."
    ]
  },

  // ANKARA - KONSERLER
  {
    id: 8,
    title: 'Sezen Aksu - 50. Yıl Konseri',
    date: '22 Temmuz 2026, 21:00',
    venue: 'Ankara Congresium',
    price: 1950,
    category: 'Konser',
    city: 'Ankara',
    isSeated: false,
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80',
    description: 'Türk pop müziğinin divası Sezen Aksu, 50. sanat yılını Ankara Congresium\'da özel bir konserle kutluyor. Yılların birikimi şarkılar sizi bekliyor!\n\nTürkiye\'nin en sevilen sanatçılarından Sezen Aksu, 50. sanat yılını özel bir konserle kutluyor. "Gülümse", "İstanbul İstanbul Olalı", "Şarkı Söylemek Lazım" gibi klasikleşen şarkıları, yeni besteleriyle birlikte sevenleriyle buluşacak.',
    ticketTypes: [
      { id: 'sahne-onu', name: 'Sahne Önü Ayakta', price: 2950 },
      { id: 'saha-ici', name: 'Saha İçi Ayakta', price: 1950 },
      { id: 'arka', name: 'Arka Alan Ayakta', price: 1350 }
    ],
    rules: [
      "Etkinlik alanına girişte güvenlik kontrolü yapılacaktır.",
      "18 yaş sınırı vardır. Kimlik kontrolü zorunludur.",
      "Yasaklı maddeler ve kesici aletler alınmayacaktır.",
      "Profesyonel kayıt cihazları yasaktır."
    ]
  },
  {
    id: 9,
    title: 'Tarkan - 30. Yıl Konseri',
    date: '5 Ağustos 2026, 21:30',
    venue: 'Jolly Joker Ankara',
    price: 1750,
    category: 'Konser',
    city: 'Ankara',
    isSeated: false,
    imageUrl: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=900&q=80',
    description: 'Megastar Tarkan, 30. sanat yılını Jolly Joker Ankara\'da özel bir konserle kutluyor. "Şımarık", "Kuzu Kuzu", "Hüp" gibi hit şarkılar sizi bekliyor!\n\nTürkiye pop müziğinin megastarı Tarkan, 30. sanat yılını özel bir konserle kutluyor. Yıllardır listelerde zirveye oturan Sanatçı, bu özel gecede tüm hit şarkılarını sevenleriyle buluşturacak.',
    ticketTypes: [
      { id: 'sahne-onu', name: 'Sahne Önü', price: 2750 },
      { id: 'saha-ici', name: 'Saha İçi', price: 1750 }
    ],
    rules: [
      "Etkinlik 18+ yaş sınırına sahiptir.",
      "Güvenlik kontrolü zorunludur.",
      "Yasaklı maddeler alınmayacaktır.",
      "Organizatör programda değişiklik yapma hakkını saklı tutar."
    ]
  },
  {
    id: 10,
    title: 'Ata Demirer - Tek Kişilik Show',
    date: '25 Eylül 2026, 20:30',
    venue: 'Bostancı Gösteri Merkezi',
    price: 750,
    category: 'Stand Up',
    city: 'Ankara',
    isSeated: true,
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
    description: 'Ata Demirer\'in yeni tek kişilik gösterisi Bostancı Gösteri Merkezi\'nde! Mizahın ve eleştirinin buluştuğu unutulmaz bir gece.\n\nTürkiye\'nin en sevilen komedyenlerinden Ata Demirer, yeni tek kişilik gösterisiyle sevenleriyle buluşuyor. Güncel politik konular, sosyal gözlemler ve özgün mizah Anlayışıyla dolu gösteride izleyicileri kahkahaya boğacak.',
    ticketTypes: [
      { id: 'arka', name: 'Arka Koltuklar', price: 550 },
      { id: 'orta', name: 'Orta Koltuklar', price: 750 },
      { id: 'on', name: 'Ön Koltuklar', price: 950 }
    ],
    rules: [
      "Etkinlik 16+ yaş sınırına sahiptir.",
      "Kayıt cihazları yasaktır.",
      "Gösteri sırasında salon dışına çıkış yapılamaz.",
      "Girişte bilet kontrolü yapılacaktır."
    ]
  },

  // ANKARA - TİYATROLAR
  {
    id: 11,
    title: 'Anton Çehov - Vanya Dayı',
    date: '10 Ekim 2026, 19:30',
    venue: 'Ankara Devlet Tiyatrosu',
    price: 420,
    category: 'Tiyatro',
    city: 'Ankara',
    isSeated: true,
    imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=80',
    description: 'Rus tiyatrosunun büyük ustadı Anton Çehov\'un "Vanya Dayı" oyunu, Ankara Devlet Tiyatrosu\'nda. İnsan doğasının en derin analizlerinden biri.\n\nRus tiyatrosunun en önemli yazarlarından Anton Çehov\'un "Vanya Dayı" oyunu, 19. yüzyıl sonu Rus toplumunun keskin bir portresini sunuyor. Üç perdelik oyunda, Vanya Dayı ve çevresindeki karakterlerin dramları, mizahi ve trajik unsurlarla bir arada işleniyor.',
    ticketTypes: [
      { id: 'balkon', name: 'Balkon', price: 320 },
      { id: 'orchestra', name: 'Orkestra', price: 420 },
      { id: 'vip', name: 'VIP', price: 650 }
    ],
    rules: [
      "Oyun başlamadan 15 dakika önce kapılar kapanır.",
      "8 yaş altı çocukların girişine izin verilmez.",
      "Kayıt cihazları ve fotoğraf makineleri yasaktır.",
      "Oyun süresince sessizlik rica edilir."
    ]
  },
  {
    id: 12,
    title: 'Yılmaz Erdoğan - Devrim Aşıkları',
    date: '15 Kasım 2026, 20:00',
    venue: 'Ankara Sanat Tiyatrosu',
    price: 890,
    category: 'Tiyatro',
    city: 'Ankara',
    isSeated: true,
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80',
    description: 'Yılmaz Erdoğan\'ın yeni oyunu "Devrim Aşıkları", Ankara Sanat Tiyatrosu\'nda. Modern Türkiye\'nin en önemli oyun yazarlarından unutulmaz bir eser.\n\nModern Türkiye tiyatrosunun en önemli isimlerinden Yılmaz Erdoğan, yeni oyunu "Devrim Aşıkları" ile Ankara\'da sevenleriyle buluşuyor. 1970\'li yılların politik atmosferini mizahi bir dille anlatan oyun, Dönemin gençlik ideallerini ve hayallerini konu alıyor.',
    ticketTypes: [
      { id: 'arka', name: 'Arka Koltuklar', price: 650 },
      { id: 'orta', name: 'Orta Koltuklar', price: 890 },
      { id: 'on', name: 'Ön Koltuklar', price: 1250 }
    ],
    rules: [
      "Oyun başlamadan 15 dakika önce kapılar kapanır.",
      "12 yaş altı çocukların girişine izin verilmez.",
      "Kayıt cihazları ve fotoğraf makineleri yasaktır.",
      "Oyun süresince sessizlik rica edilir."
    ]
  },

  // İZMİR - KONSERLER
  {
    id: 13,
    title: 'Mor ve Ötesi - 40. Yıl Konseri',
    date: '12 Haziran 2026, 21:00',
    venue: 'İzmir Arena',
    price: 1550,
    category: 'Konser',
    city: 'İzmir',
    isSeated: false,
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80',
    description: 'Türk rock müziğinin efsanesi Mor ve Ötesi, 40. yılını İzmir Arena\'da özel bir konserle kutluyor. "Bir Derdim Var", "Yardım Et", "Uyan" gibi hit şarkılar sizi bekliyor!\n\nTürkiye rock müziğinin en önemli gruplarından Mor ve Ötesi, 40. kuruluş yılını özel bir konserle kutluyor. 1980\'li yıllardan bu yana müzik hayatına devam eden grup, bu özel gecede tüm klasikleşen şarkılarını sevenleriyle buluşturacak.',
    ticketTypes: [
      { id: 'sahne-onu', name: 'Sahne Önü Ayakta', price: 2350 },
      { id: 'saha-ici', name: 'Saha İçi Ayakta', price: 1550 }
    ],
    rules: [
      "Etkinlik alanına profesyonel fotoğraf makinesi alınmayacaktır.",
      "18 yaş sınırı vardır. Kimlik kontrolü yapılacaktır.",
      "Etkinlik alanına dışarıdan yiyecek ve içecek getirmek yasaktır.",
      "Alkol satışı ve tüketimi 18 yaş sınırına tabidir."
    ]
  },
  {
    id: 14,
    title: 'Gülşen - Aynalı Odam Konseri',
    date: '28 Temmuz 2026, 20:30',
    venue: 'İzmir Kültür Merkezi',
    price: 1350,
    category: 'Konser',
    city: 'İzmir',
    isSeated: false,
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80',
    description: 'Gülşen, yeni albümü "Aynalı Odam" turnesi kapsamında İzmir Kültür Merkezi\'nde! Türk sanat müziğinin en sevilen sesi sizi bekliyor.\n\nTürk sanat müziğinin en önemli isimlerinden Gülşen, yeni albümü "Aynalı Odam" turnesi kapsamında sevenleriyle buluşuyor. "Yarım Kalbim", "Sözümü Geri Aldım", "Deli Deli" gibi hit şarkıları, yeni albümden parçalarla birlikte dinleyicilere sunulacak.',
    ticketTypes: [
      { id: 'sahne-onu', name: 'Sahne Önü', price: 1950 },
      { id: 'saha-ici', name: 'Saha İçi', price: 1350 }
    ],
    rules: [
      "Etkinlik 18+ yaş sınırına sahiptir.",
      "Alkol satışı ve tüketimi 18 yaş sınırına tabidir.",
      "Etkinlik alanına dışarıdan yiyecek/içecek sokmak yasaktır.",
      "Organizatör programda değişiklik yapma hakkını saklı tutar."
    ]
  },

  // İZMİR - TİYATROLAR
  {
    id: 15,
    title: 'Moliere - Cimri',
    date: '20 Aralık 2026, 20:00',
    venue: 'İzmir Devlet Tiyatrosu',
    price: 350,
    category: 'Tiyatro',
    city: 'İzmir',
    isSeated: true,
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80',
    description: 'Fransız komedi tiyatrosunun ustası Moliere\'in "Cimri" oyunu, İzmir Devlet Tiyatrosu\'nda. Komedinin klasiği.\n\n17. yüzyıl Fransız komedi tiyatrosunun en önemli yazarlarından Moliere\'in "Cimri" oyunu, tiyatro tarihinde bir klasiktir. Para tutkunu Harpagon\'un komik trajedisi, aile ilişkileri ve toplumsal yozlaşma üzerine keskin bir eleştiri sunar.',
    ticketTypes: [
      { id: 'balkon', name: 'Balkon', price: 250 },
      { id: 'orchestra', name: 'Orkestra', price: 350 },
      { id: 'ilk-sira', name: 'İlk Sıra', price: 500 }
    ],
    rules: [
      "Tiyatro salonuna geç giriş yapılmaz.",
      "6 yaş altı çocukların girişine izin verilmez.",
      "Kayıt ve fotoğraf çekimi yasaktır.",
      "Etkinlik süresince sessizlik rica edilir."
    ]
  },
  {
    id: 16,
    title: 'Sahan Gökbakar - Kandemir Konfet',
    date: '5 Kasım 2026, 21:00',
    venue: 'İzmir Kültür Merkezi',
    price: 680,
    category: 'Stand Up',
    city: 'İzmir',
    isSeated: true,
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
    description: 'Sahan Gökbakar\'ın yeni karakteri "Kandemir Konfet" ile İzmir\'de! Türkiye\'nin en çok sevilen komedyenlerinden unutulmaz bir gösteri.\n\nTürkiye\'nin en sevilen komedyenlerinden Sahan Gökbakar, yeni karakteri "Kandemir Konfet" ile İzmir\'de sevenleriyle buluşuyor. Popüler kültür karakterlerinin ötesinde, güncel konuları mizahi bir dille işleyen gösteride izleyicileri kahkahaya boğacak.',
    ticketTypes: [
      { id: 'arka', name: 'Arka Koltuklar', price: 480 },
      { id: 'orta', name: 'Orta Koltuklar', price: 680 },
      { id: 'on', name: 'Ön Koltuklar', price: 880 }
    ],
    rules: [
      "Etkinlik 16+ yaş sınırına sahiptir.",
      "Kayıt cihazları kesinlikle yasaktır.",
      "Gösteri sırasında salon dışına çıkış yapılamaz.",
      "Girişte kimlik kontrolü yapılacaktır."
    ]
  },

  // BURSA - KONSERLER
  {
    id: 17,
    title: 'Teoman - 25. Yıl Konseri',
    date: '18 Haziran 2026, 21:00',
    venue: 'Bursa Merkez Atatürk Stadyumu',
    price: 1450,
    category: 'Konser',
    city: 'Bursa',
    isSeated: false,
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80',
    description: 'Türk rock müziğinin efsanesi Teoman, 25. sanat yılını Bursa\'da özel bir konserle kutluyor. "Param Papilla", "İstanbul\'da Sonbahar", "Gönüllü İsyankar" gibi hit şarkılar sizi bekliyor!\n\nTürkiye rock müziğinin en önemli isimlerinden Teoman, 25. sanat yılını özel bir konserle kutluyor. 1990\'lı yıllardan bu yana müzik hayatına devam eden Sanatçı, bu özel gecede tüm klasikleşen şarkılarını sevenleriyle buluşturacak.',
    ticketTypes: [
      { id: 'sahne-onu', name: 'Sahne Önü', price: 2150 },
      { id: 'saha-ici', name: 'Saha İçi', price: 1450 }
    ],
    rules: [
      "Etkinlik alanına profesyonel fotoğraf makinesi alınmayacaktır.",
      "18 yaş sınırı vardır. Kimlik kontrolü yapılacaktır.",
      "Etkinlik alanına dışarıdan yiyecek ve içecek getirmek yasaktır.",
      "Alkol satışı ve tüketimi 18 yaş sınırına tabidir."
    ]
  },
  {
    id: 18,
    title: 'Yalın - Yaz Turnesi',
    date: '25 Temmuz 2026, 20:30',
    venue: 'Bursa Kültür Parkı',
    price: 1250,
    category: 'Konser',
    city: 'Bursa',
    isSeated: false,
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80',
    description: 'Yalın, yeni albümü Turnesi kapsamında Bursa Kültür Parkı\'nda! Türk pop müziğinin en sevilen sesi sizi bekliyor.\n\nTürk pop müziğinin en sevilen isimlerinden Yalın, yeni albümü Turnesi kapsamında sevenleriyle buluşuyor. "Zalim", "Keske", "Her Şey Seninle Güzel" gibi hit şarkıları, yeni albümden parçalarla birlikte dinleyicilere Sunulacak.',
    ticketTypes: [
      { id: 'sahne-onu', name: 'Sahne Önü', price: 1850 },
      { id: 'saha-ici', name: 'Saha İçi', price: 1250 }
    ],
    rules: [
      "Etkinlik 18+ yaş sınırına sahiptir.",
      "Alkol satışı ve tüketimi 18 yaş sınırına tabidir.",
      "Etkinlik alanına dışarıdan yiyecek/içecek sokmak yasaktır.",
      "Organizatör programda değişiklik yapma hakkını saklı tutar."
    ]
  },

  // BURSA - TİYATROLAR
  {
    id: 19,
    title: 'Nâzım Hikmet - Kral Oyunu',
    date: '8 Ağustos 2026, 19:30',
    venue: 'Bursa Devlet Tiyatrosu',
    price: 420,
    category: 'Tiyatro',
    city: 'Bursa',
    isSeated: true,
    imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=80',
    description: 'Türk tiyatrosunun ustadı Nâzım Hikmet\'in "Kral Oyunu", Bursa Devlet Tiyatrosu\'nda. Türk tiyatrosunun klasiği.\n\nTürk tiyatrosunun en önemli yazarlarından Nâzım Hikmet\'in "Kral Oyunu", Türk tiyatrosunun klasikleri olarak kabul edilir. Bir kralın ve çevresindeki karakterlerin trajikomik hikayesi, toplumsal eleştiri ve mizahi bir dille işleniyor.',
    ticketTypes: [
      { id: 'balkon', name: 'Balkon', price: 320 },
      { id: 'orchestra', name: 'Orkestra', price: 420 },
      { id: 'ilk-sira', name: 'İlk Sıra', price: 650 }
    ],
    rules: [
      "Tiyatro salonuna geç giriş yapılmaz.",
      "10 yaş altı çocukların girişine izin verilmez.",
      "Kayıt ve fotoğraf çekimi yasaktır.",
      "Etkinlik süresince sessizlik rica edilir."
    ]
  },
  {
    id: 20,
    title: 'Bülent Emin Yıldız - Tek Kişilik Gösteri',
    date: '15 Eylül 2026, 20:00',
    venue: 'Bursa Kültür Merkezi',
    price: 750,
    category: 'Stand Up',
    city: 'Bursa',
    isSeated: true,
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
    description: 'Bülent Emin Yıldız\'ın yeni tek kişilik gösterisi Bursa Kültür Merkezi\'nde! Mizahın ve eleştirinin buluştuğu unutulmaz bir gece.\n\nTürkiye\'nin en sevilen komedyenlerinden Bülent Emin Yıldız, yeni tek kişilik gösterisiyle sevenleriyle buluşuyor. Güncel politik konular, sosyal gözlemler ve özgün mizah Anlayışıyla dolu gösteride izleyicileri kahkahaya boğacak.',
    ticketTypes: [
      { id: 'arka', name: 'Arka Koltuklar', price: 550 },
      { id: 'orta', name: 'Orta Koltuklar', price: 750 },
      { id: 'on', name: 'Ön Koltuklar', price: 950 }
    ],
    rules: [
      "Etkinlik 16+ yaş sınırına sahiptir.",
      "Kayıt cihazları yasaktır.",
      "Gösteri sırasında salon dışına çıkış yapılamaz.",
      "Girişte bilet kontrolü yapılacaktır."
    ]
  },

  // ESKİŞEHİR - KONSERLER
  {
    id: 21,
    title: 'Pinhani - 30. Yıl Konseri',
    date: '22 Haziran 2026, 21:00',
    venue: 'Eskişehir Atatürk Stadyumu',
    price: 1150,
    category: 'Konser',
    city: 'Eskişehir',
    isSeated: false,
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80',
    description: 'Pinhani, 30. sanat yılını Eskişehir\'de özel bir konserle kutluyor. "Hele Meşel", "Yıldızlar", "İnsanlar Ne Zaman" gibi hit şarkılar sizi bekliyor!\n\nTürk sanat müziğinin en sevilen isimlerinden Pinhani, 30. sanat yılını özel bir konserle Kutluyor. 1990\'lı yıllardan bu yana müzik hayatına devam eden Sanatçı, bu özel gecede tüm klasikleşen şarkılarını sevenleriyle buluşturacak.',
    ticketTypes: [
      { id: 'sahne-onu', name: 'Sahne Önü', price: 1750 },
      { id: 'saha-ici', name: 'Saha İçi', price: 1150 }
    ],
    rules: [
      "Etkinlik alanına profesyonel fotoğraf makinesi alınmayacaktır.",
      "18 yaş sınırı vardır. Kimlik kontrolü yapılacaktır.",
      "Etkinlik alanına dışarıdan yiyecek ve içecek getirmek yasaktır.",
      "Alkol satışı ve tüketimi 18 yaş sınırına tabidir."
    ]
  },
  {
    id: 22,
    title: 'Ceylan Ertem - Canlı Performans',
    date: '25 Temmuz 2026, 20:30',
    venue: 'Eskişehir Kültür Merkezi',
    price: 950,
    category: 'Konser',
    city: 'Eskişehir',
    isSeated: false,
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80',
    description: 'Ceylan Ertem, yeni albümü Turnesi kapsamında Eskişehir Kültür Merkezi\'nde! Türk caz müziğinin en sevilen sesi sizi bekliyor.\n\nTürk caz müziğinin en önemli isimlerinden Ceylan Ertem, yeni albümü Turnesi kapsamında sevenleriyle buluşuyor. "Kim Korkar Kim Kaçar", "Beni Vururlar", "Aşk" gibi hit şarkıları, yeni albümden parçalarla birlikte dinleyicilere Sunulacak.',
    ticketTypes: [
      { id: 'sahne-onu', name: 'Sahne Önü', price: 1450 },
      { id: 'saha-ici', name: 'Saha İçi', price: 950 }
    ],
    rules: [
      "Etkinlik 18+ yaş sınırına sahiptir.",
      "Alkol satışı ve tüketimi 18 yaş sınırına tabidir.",
      "Etkinlik alanına dışarıdan yiyecek/içecek sokmak yasaktır.",
      "Organizatör programda değişiklik yapma hakkını saklı tutar."
    ]
  },

  // ESKİŞEHİR - TİYATROLAR
  {
    id: 23,
    title: 'Orhan Veli - Bir Deli Rüya Gördüm',
    date: '8 Ağustos 2026, 19:30',
    venue: 'Eskişehir Devlet Tiyatrosu',
    price: 380,
    category: 'Tiyatro',
    city: 'Eskişehir',
    isSeated: true,
    imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=80',
    description: 'Orhan Veli\'in klasik "Bir Deli Rüya Gördüm", Eskişehir Devlet Tiyatrosu\'nda. Türk tiyatrosunun en önemli eserlerinden biri.\n\nTürk tiyatrosunun en önemli yazarlarından Orhan Veli\'in "Bir Deli Rüya Gördüm", Türk tiyatrosunun klasikleri olarak kabul edilir. Bir babanın ve oğlunun trajikomik hikayesi, toplumsal eleştiri ve mizahi bir dille işleniyor.',
    ticketTypes: [
      { id: 'balkon', name: 'Balkon', price: 280 },
      { id: 'orchestra', name: 'Orkestra', price: 380 },
      { id: 'ilk-sira', name: 'İlk Sıra', price: 550 }
    ],
    rules: [
      "Tiyatro salonuna geç giriş yapılmaz.",
      "10 yaş altı çocukların girişine izin verilmez.",
      "Kayıt ve fotoğraf çekimi yasaktır.",
      "Etkinlik süresince sessizlik rica edilir."
    ]
  },
  {
    id: 24,
    title: 'Gülse Birsel - Tek Kişilik Gösteri',
    date: '15 Eylül 2026, 20:00',
    venue: 'Eskişehir Kültür Merkezi',
    price: 650,
    category: 'Stand Up',
    city: 'Eskişehir',
    isSeated: true,
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
    description: 'Gülse Birsel\'in yeni tek kişilik gösterisi Eskişehir Kültür Merkezi\'nde! Mizahın ve eleştirinin buluştuğu unutulmaz bir gece.\n\nTürkiye\'nin en sevilen komedyenlerinden Gülse Birsel, yeni tek kişilik gösterisiyle sevenleriyle buluşuyor. Güncel politik konular, sosyal gözlemler ve özgün mizah Anlayışıyla dolu gösteride izleyicileri kahkahaya boğacak.',
    ticketTypes: [
      { id: 'arka', name: 'Arka Koltuklar', price: 480 },
      { id: 'orta', name: 'Orta Koltuklar', price: 650 },
      { id: 'on', name: 'Ön Koltuklar', price: 850 }
    ],
    rules: [
      "Etkinlik 16+ yaş sınırına sahiptir.",
      "Kayıt cihazları yasaktır.",
      "Gösteri sırasında salon dışına çıkış yapılamaz.",
      "Girişte bilet kontrolü yapılacaktır."
    ]
  },

  // KÜTAHYA - KONSERLER
  {
    id: 25,
    title: 'Kubat - 20. Yıl Konseri',
    date: '18 Haziran 2026, 21:00',
    venue: 'Kütahya Belediye Konservatuarı',
    price: 850,
    category: 'Konser',
    city: 'Kütahya',
    isSeated: false,
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80',
    description: 'Kubat, 20. sanat yılını Kütahya\'da özel bir konserle kutluyor. "Telli Telli", "Gözümün Nuru", "Beni Vururlar" gibi hit şarkılar sizi bekliyor!\n\nTürk sanat müziğinin en sevilen isimlerinden Kubat, 20. sanat yılını özel bir konserle Kutluyor. 1990\'lı yıllardan bu yana müzik hayatına devam eden Sanatçı, bu özel gecede tüm klasikleşen şarkılarını sevenleriyle buluşturacak.',
    ticketTypes: [
      { id: 'sahne-onu', name: 'Sahne Önü', price: 1350 },
      { id: 'saha-ici', name: 'Saha İçi', price: 850 }
    ],
    rules: [
      "Etkinlik alanına profesyonel fotoğraf makinesi alınmayacaktır.",
      "18 yaş sınırı vardır. Kimlik kontrolü yapılacaktır.",
      "Etkinlik alanına dışarıdan yiyecek ve içecek getirmek yasaktır.",
      "Alkol satışı ve tüketimi 18 yaş sınırına tabidir."
    ]
  },
  {
    id: 26,
    title: 'Sertab Erener - Canlı Performans',
    date: '25 Temmuz 2026, 20:30',
    venue: 'Kütahya Kültür Merkezi',
    price: 750,
    category: 'Konser',
    city: 'Kütahya',
    isSeated: false,
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80',
    description: 'Sertab Erener, yeni albümü Turnesi kapsamında Kütahya Kültür Merkezi\'nde! Türk halk müziğinin en sevilen sesi sizi bekliyor.\n\nTürk halk müziğinin en önemli isimlerinden Sertab Erener, yeni albümü Turnesi kapsamında sevenleriyle buluşuyor. "Deli Deli", "Kara Çadır", "Hani Geleceksen" gibi hit şarkıları, yeni albümden parçalarla birlikte dinleyicilere Sunulacak.',
    ticketTypes: [
      { id: 'sahne-onu', name: 'Sahne Önü', price: 1150 },
      { id: 'saha-ici', name: 'Saha İçi', price: 750 }
    ],
    rules: [
      "Etkinlik 18+ yaş sınırına sahiptir.",
      "Alkol satışı ve tüketimi 18 yaş sınırına tabidir.",
      "Etkinlik alanına dışarıdan yiyecek/içecek sokmak yasaktır.",
      "Organizatör programda değişiklik yapma hakkını saklı tutar."
    ]
  },

  // KÜTAHYA - TİYATROLAR
  {
    id: 27,
    title: 'Aziz Nesin - Tosuncuk',
    date: '8 Ağustos 2026, 19:30',
    venue: 'Kütahya Devlet Tiyatrosu',
    price: 320,
    category: 'Tiyatro',
    city: 'Kütahya',
    isSeated: true,
    imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=80',
    description: 'Aziz Nesin\'in klasik "Tosuncuk", Kütahya Devlet Tiyatrosu\'nda. Türk tiyatrosunun en önemli eserlerinden biri.\n\nTürk tiyatrosunun en önemli yazarlarından Aziz Nesin\'in "Tosuncuk", Türk tiyatrosunun klasikleri olarak kabul edilir. Bir köy muhtarının ve çevresindeki karakterlerin trajikomik hikayesi, toplumsal eleştiri ve mizahi bir dille işleniyor.',
    ticketTypes: [
      { id: 'balkon', name: 'Balkon', price: 250 },
      { id: 'orchestra', name: 'Orkestra', price: 320 },
      { id: 'ilk-sira', name: 'İlk Sıra', price: 480 }
    ],
    rules: [
      "Tiyatro salonuna geç giriş yapılmaz.",
      "10 yaş altı çocukların girişine izin verilmez.",
      "Kayıt ve fotoğraf çekimi yasaktır.",
      "Etkinlik süresince sessizlik rica edilir."
    ]
  },

  // BÜYÜK FESTİVALLER
  {
    id: 28,
    title: 'Ultra Türkiye Festival 2026',
    date: '22 Temmuz 2026, 14:00',
    venue: 'KüçükÇiftlik Park',
    price: 2250,
    category: 'Festival',
    city: 'İstanbul',
    isSeated: false,
    imageUrl: 'https://images.unsplash.com/photo-1571266028243-d220c9d32e3f?auto=format&fit=crop&w=900&q=80',
    description: 'Dünyanın en büyük EDM festivali Ultra Türkiye, 2026 yılında KüçükÇiftlik Park\'ta! David Guetta, Martin Garrix ve daha birçok DJ performansıyla unutulmaz bir gün sizi bekliyor.\n\nDünyanın en büyük elektronik müzik festivali Ultra Türkiye, 2026 yılında İstanbul\'da gerçekleşecek. David Guetta, Martin Garrix, Armin van Buuren gibi dünyaca ünlü DJ\'lerin yanı sıra Türkiye\'nin en iyi DJ\'leri de sahne alacak. 8 saat boyunca devam edecek olan festivalde, farklı sahnelerde birçok müzik türünü dinleme imkanı bulacaksınız.',
    ticketTypes: [
      { id: 'vip', name: 'VIP Lounge', price: 4500 },
      { id: 'general', name: 'General Admission', price: 2250 },
      { id: 'early', name: 'Early Bird', price: 1750 }
    ],
    rules: [
      "Festival alanına girişte güvenlik kontrolü yapılacaktır.",
      "18 yaş sınırı vardır. Kimlik kontrolü zorunludur.",
      "Yasaklı maddeler ve kesici aletler alınmayacaktır.",
      "Profesyonel kayıt cihazları yasaktır.",
      "Festival süresince alan dışına çıkış yapılamaz."
    ]
  },
  {
    id: 29,
    title: 'İstanbul Caz Festivali 2026',
    date: '12 Eylül 2026, 19:00',
    venue: 'Kültürpark Amfi Tiyatro',
    price: 980,
    category: 'Festival',
    city: 'İzmir',
    isSeated: false,
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80',
    description: '30. İstanbul Caz Festivali, İzmir Kültürpark\'ta! Dünya çapında caz Sanatçılarının performanslarıyla unutulmaz bir müzik ziyafeti sizi bekliyor.\n\nTürkiye\'nin en önemli müzik festivallerinden İstanbul Caz Festivali, 30. yılında İzmir\'de gerçekleşecek. Dünya çapında caz Sanatçılarının performanslarıyla unutulmaz bir müzik ziyafeti sunacak olan festivalde, farklı sahnelerde birçok caz alt türünü dinleme imkanı bulacaksınız.',
    ticketTypes: [
      { id: 'vip', name: 'VIP Paket', price: 1950 },
      { id: 'general', name: 'Genel Giriş', price: 980 }
    ],
    rules: [
      "Festival alanına girişte bilet ve kimlik kontrolü yapılacaktır.",
      "Tüm katılımcıların güvenlik kontrolünden geçmesi zorunludur.",
      "Profesyonel kayıt ekipmanları yasaktır.",
      "Etkinlik yağmurlu havada gerçekleşir."
    ]
  },
  {
    id: 30,
    title: 'Ankara Uluslararası Film Müzikleri Festivali',
    date: '20 Ekim 2026, 20:30',
    venue: 'Ankara Congresium',
    price: 690,
    category: 'Festival',
    city: 'Ankara',
    isSeated: false,
    imageUrl: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=900&q=80',
    description: 'Ankara Uluslararası Film Müzikleri Festivali, 2026 yılında Ankara Congresium\'da! Film müziklerinin en güzel örnekleriyle unutulmaz bir gece sizi bekliyor.\n\nTürkiye\'nin en önemli müzik festivallerinden Ankara Uluslararası Film Müzikleri Festivali, 2026 yılında Ankara\'da gerçekleşecek. Film müziklerinin en güzel örnekleriyle unutulmaz bir gece Sunacak olan festivalde, farklı sahnelerde birçok film müziği türünü dinleme imkanı bulacaksınız.',
    ticketTypes: [
      { id: 'vip', name: 'VIP Paket', price: 1250 },
      { id: 'general', name: 'Genel Giriş', price: 690 }
    ],
    rules: [
      "Festival alanına girişte bilet ve kimlik kontrolü yapılacaktır.",
      "Tüm katılımcıların güvenlik kontrolünden geçmesi zorunludur.",
      "Profesyonel kayıt ekipmanları yasaktır.",
      "Etkinlik süresince alan dışına çıkış yapılmaz."
    ]
  }
]
