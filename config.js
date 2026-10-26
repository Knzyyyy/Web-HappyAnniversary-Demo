
    // =========================================================================
    // 1. CONFIG UTAMA (Semua pengaturan cukup diubah dari objek ini)
    // =========================================================================
    const CONFIG = {
      identity: { clientName: "Iqbal", partnerName: "Lifi", pageTitle: "Happy Anniversary" },
      gate: {
        unlockAt: "2026-10-23T00:00:00+10:00", // Ubah ke 2027 jika ingin tes Countdown
        passwordDate: "271023",              // Tanggal Anniversary: 14 / 02 / 2023
        wrongMessage: "",
        hintAfter: 2,
        hintText: "Petunjuk: Hari ketika kita mulai jadi 'kita'",
        helpAfter: 3,
        helpWhatsapp: "6282125492682",
        helpMessage: "aku lupa tanggal anniversary kita"
      },
      storySlides: [
        { emoji: "🕰️", label: "Perjalanan Kita", text: "Terima kasih ya sudah menemani akuu melewati begitu banyak cerita." },
        { emoji: "🥂", label: "Hari Istimewa", text: "Siap melihat kembali kepingan perjalanan kita dari awal sampai hari ini?" }
      ],
      relationship: { startDate: "2023-10-27T19:30:00+11:30" },
      hero: { title: "Happy 3rd Anniversary, To Us", subtitle: "27 Oktober 2023 — Selamanya" },
      timeline: [
        { date: "19 September 2023", title: "Chatingan pertama", story: "Berawal dari kamu yang chat aku yang mau kenalan sama aku yang berlanjut dengan topik pembicaraan yang absurd tetapi sangat menyenangkan dan seru.", photo: "jejakwaktu/1.jpg" },
        { date: "28 September 2023", title: "Pertama kali ketemuan secara langsung", story: "Waktu itu kamu beli dagangan umi disitu aku sangat deg deg an sampai gabisa hitung 50 - 8 HAHAHAHAHA, disitu aku jatuh cinta pada pandangan pertama 😆.", photo: "jejakwaktu/2.jpg" },
        { date: "02 Oktober 2023", title: "Foto bareng pertama", story: "Gak lama dari itu disekolah ada event pakai baju batik disitu aku langsung ajak kamu foto bareng, muka tegang nya sangat terlihat yaa HAHAHA.", photo: "jejakwaktu/3.jpg" },
        { date: "06 Oktober 2o23", title: "Nganterin pulang pertama kali", story: "Disitu aku panik banget mau ngobrolin apa dan pas udah sampai sana aku harus apa.", photo: "jejakwaktu/4.jpg" },
        { date: "19 Oktober 2o23", title: "Fotobooth pertama", story: "Waktu itu kebetulan banget ada acara disekolah ada fotobooth nya kita langsung fotobooth bareng dan foto pake kamera aku jugaa aku sangat senang bisa foto banyak sama kamuu", photo: "jejakwaktu/5.jpg" },
        { date: "21 Oktober 2o23", title: "Main bareng pertama", story: "Pertama kali kita main bareng diluar kita ke McD Pekayon yang sangat dingin ituu, pas kita tidak ada topik kita main ludo sama ular tangga HAHAHA. Foto nya ada watermarknya nya yahhh.", photo: "jejakwaktu/6.jpg" },
        { date: "27 Oktober 2023", title: "Menyatakan Cinta", story: "Waktu perjalanan anterin kamu pulang aku menyatakan cinta ke kamu dan kamu bilang jawab nya nanti tunggu aku pulang 😭, aku kepikiran banget pas solat jum’at kamu nolak aku atau tidak sehabis solat jumat kamu chat aku dan kamu nerima cinta aku YEYYY", photo: "jejakwaktu/7.jpg" },
        { date: "04 November 2023", title: "First date", story: "Waktu sampai rumah kamu aku pertama kali ketemu mamah kamu takut salah kata kata dan kita main sampai malam pas pulang kita kehujanan dan neduh di indomaret HAHAHA", photo: "jejakwaktu/8.jpg" },
        { date: "25 November 2023", title: "First time main kerumah", story: "Dirumah kamu kita buat gelang dari manik manik dan disitu aku kenal mamah kamu ternyata sangat baik dan welcome ke akuu", photo: "jejakwaktu/9.jpg" },
        { date: "Selamanya", title: "Our Now", story: "Banyak masa masa yang sudah kita laluin bareng bareng dan kita masih bersama sampai detik ini.", photo: "jejakwaktu/10.jpg" }
      ],
      gallery: [
        { src: "album/1.jpg", caption: "First time kerumah papah." },
        { src: "album/2.jpg", caption: "Ngerawat kamu waktu sakit." },
        { src: "album/3.jpg", caption: "First time kerumah aku." },
        { src: "album/4.jpg", caption: "Makan Sushi Tei dapat menu ulang tahun." },
        { src: "album/1.mp4", caption: "Ngintip aku main hp." },
        { src: "album/2.mp4", caption: "Ngeledekin gabisa foto." },
        { src: "album/3.mp4", caption: "Main game tiru gambar." },
        { src: "album/4.mp4", caption: "First time makan sushi." },
        { src: "album/5.mp4", caption: "Udah mulai tengil." },
        { src: "album/6.mp4", caption: "Membuat gelang manik manik." },
        { src: "album/7.mp4", caption: "Dadahhhh." },
      ],
      reasons: [
        "aku suka dengar kamu bercerita tentang hari harimu, rasanya tenang dan enggak bosen.",
        "senyuman membuat aku sangat senang dan bisa jadi obat lelah aku.",
        "kebaikan kamu bikin aku kagum dan semakin suka sama kamu.",
        "perhatian hal hal kecil dari kamu membuat aku selalu merasa special.",
        "ekspresi kamu waktu manja dan bercanda itu gemesin.",
      ],
      letter: {
        body: "Happy 3rd Anniversary, Sayang!,\n\nTerimakasih banyak buat semua hal hal indah yang udah kita lewati bareng bareng 🤗. Terimakasih yaa sudah setia sama aku dan sabar ngadepin aku, dan selalu mengusahakan yang terbaik buat hubungan kita. Aku sayang bangett sama kamuu.\n\nUntuk Kedepannya aku akan usahakan yang terbaik buat kamu ❤️,Semoga kita bisa terus bersamaa, dan buat lebih banyak kenangan manis kedepan nyaa,\n\nMakasih udah jadi bagian terbaik di hidup aku. Love you so much, my love! 🥰",
        signature: "Dengan kasih sayang,\nIqbal"
      },
      music: {
        src: "aboutyou.mp3",
        volume: 0.2
      },
      dev: { enablePreview: true, previewCode: "demo2026" }
    };

