
    // =========================================================================
    // 1. CONFIG UTAMA (Semua pengaturan cukup diubah dari objek ini)
    // =========================================================================
    const CONFIG = {
      identity: { clientName: "Arga", partnerName: "Nara", pageTitle: "Happy Anniversary — Arga & Nara" },
      gate: {
        unlockAt: "2026-10-23T00:00:00+10:00", // Ubah ke 2027 jika ingin tes Countdown
        passwordDate: "000000",              // PIN demo
        greetingText: "Hi Nara, ayo tebak passwordnya~",
        clueText: "Untuk mencoba demo, masukkan PIN 000000",
        wrongMessage: "",
        hintAfter: 2,
        hintText: "Petunjuk: Masukkan enam angka nol (000000)",
        helpAfter: Infinity, // Bantuan WhatsApp dinonaktifkan untuk demo
        helpWhatsapp: "", // Isi nomor bisnis dan ubah helpAfter untuk mengaktifkan bantuan
        helpMessage: "aku lupa tanggal anniversary kita"
      },
      storySlides: [
        { emoji: "🕰️", label: "Perjalanan Kita", text: "Dari satu pertemuan sederhana, kita mulai menulis cerita yang begitu berarti." },
        { emoji: "🥂", label: "Hari Istimewa", text: "Siap melihat kembali kepingan perjalanan kita dari awal sampai hari ini?" }
      ],
      relationship: { startDate: "2023-10-27T19:30:00+11:30" },
      hero: { title: "Happy 3rd Anniversary, To Us", subtitle: "27 Oktober 2023 — Selamanya" },
      timeline: [
        { date: "19 September 2023", title: "Sapaan Pertama", story: "Satu pesan singkat menjadi awal percakapan panjang. Tanpa terasa, berbagi cerita denganmu menjadi bagian yang paling kutunggu setiap hari.", photo: "jejakwaktu/1.jpg" },
        { date: "28 September 2023", title: "Pertemuan Pertama", story: "Ada sedikit gugup dan banyak senyum hari itu. Pertemuan sederhana yang ternyata menjadi awal dari begitu banyak kenangan.", photo: "jejakwaktu/2.jpg" },
        { date: "02 Oktober 2023", title: "Foto Pertama Kita", story: "Mungkin posenya masih canggung, tetapi senyumnya begitu jujur. Foto pertama yang selalu membuat kita tersenyum saat melihatnya kembali.", photo: "jejakwaktu/3.jpg" },
        { date: "06 Oktober 2023", title: "Jalan Pulang Bersamamu", story: "Perjalanan terasa terlalu singkat saat bersamamu. Rasanya selalu ada cerita yang ingin dilanjutkan dan waktu yang ingin diperlambat.", photo: "jejakwaktu/4.jpg" },
        { date: "19 Oktober 2023", title: "Senyum dalam Satu Bingkai", story: "Beberapa pose lucu, tawa yang tak berhenti, dan satu lembar foto. Hal kecil yang menjadi kenangan besar untuk kita.", photo: "jejakwaktu/5.jpg" },
        { date: "21 Oktober 2023", title: "Sore yang Berkesan", story: "Tidak perlu rencana istimewa. Duduk bersama, berbagi makanan, dan bercerita sudah cukup membuat hari itu terasa berbeda.", photo: "jejakwaktu/6.jpg" },
        { date: "27 Oktober 2023", title: "Awal Cerita Kita", story: "Hari ketika aku memberanikan diri mengungkapkan perasaan, dan kamu memilih untuk berjalan bersamaku. Sejak saat itu, ada kita dalam setiap rencana.", photo: "jejakwaktu/7.jpg" },
        { date: "04 November 2023", title: "Kencan Pertama", story: "Kita menghabiskan hari dengan obrolan ringan dan tawa sederhana. Pulang dengan hati hangat dan keinginan untuk segera bertemu lagi.", photo: "jejakwaktu/8.jpg" },
        { date: "25 November 2023", title: "Semakin Dekat", story: "Perlahan kita mengenal dunia satu sama lain. Tentang keluarga, kebiasaan kecil, dan mimpi yang ingin kita wujudkan bersama.", photo: "jejakwaktu/9.jpg" },
        { date: "Selamanya", title: "Cerita yang Terus Berlanjut", story: "Kita sudah melewati banyak musim bersama. Masih ada begitu banyak tempat untuk dikunjungi dan kenangan untuk ditulis, berdua.", photo: "jejakwaktu/10.jpg" }
      ],
      gallery: [
        { src: "album/1.jpg", caption: "Satu hari, seribu kenangan." },
        { src: "album/2.jpg", caption: "Bersamamu, hal sederhana terasa istimewa." },
        { src: "album/3.jpg", caption: "Tempat favoritku adalah di dekatmu." },
        { src: "album/4.jpg", caption: "Merayakan kebahagiaan kecil bersama." },
        { src: "album/1.mp4", caption: "Potongan kecil dari cerita kita." },
        { src: "album/2.mp4", caption: "Tawa yang ingin selalu kuingat." },
        { src: "album/3.mp4", caption: "Selalu ada cara untuk bahagia bersama." },
        { src: "album/4.mp4", caption: "Mencoba hal baru, berdua." },
        { src: "album/5.mp4", caption: "Sisi lucu yang membuatku jatuh cinta." },
        { src: "album/6.mp4", caption: "Membuat kenangan dengan cara kita." },
        { src: "album/7.mp4", caption: "Sampai jumpa di cerita berikutnya." },
      ],
      reasons: [
        "Kamu selalu punya cara membuat hari biasa terasa istimewa.",
        "Senyummu adalah hal sederhana yang paling mudah membuatku bahagia.",
        "Kebaikan hatimu membuatku jatuh cinta berkali-kali.",
        "Kamu mengingat hal kecil yang bahkan sering kulupakan tentang diriku sendiri.",
        "Bersamamu, aku bisa menjadi diriku sendiri dan merasa diterima.",
      ],
      letter: {
        body: "Happy 3rd Anniversary, Nara!\n\nTiga tahun lalu, kita memulai cerita ini dengan perasaan yang sederhana. Hari ini, saat melihat kembali semua yang sudah kita lewati, aku bersyukur karena kamulah orang yang berjalan di sampingku.\n\nTerima kasih untuk setiap tawa, setiap percakapan panjang, dan setiap dukungan di hari yang tidak mudah. Bersamamu, aku belajar bahwa cinta tumbuh lewat perhatian kecil dan kemauan untuk saling memahami.\n\nSemoga kita terus memberi ruang untuk tumbuh, saling menguatkan, dan menemukan alasan baru untuk tersenyum bersama. Masih banyak cerita yang ingin kutulis denganmu.\n\nSelamat hari jadi, sayang. Untuk kita, dan semua hari indah yang menanti. ❤️",
        signature: "Dengan kasih sayang,\nArga"
      },
      music: {
        src: "aboutyou.mp3",
        volume: 0.2
      },
      dev: { enablePreview: true, previewCode: "demo2026" }
    };
