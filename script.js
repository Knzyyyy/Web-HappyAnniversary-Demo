    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = typeof Lenis !== "undefined" && !prefersReducedMotion
      ? new Lenis({
        duration: 1.15,
        smoothWheel: true,
        syncTouch: false,
        anchors: true
      })
      : null;

    if (lenis) {
      const rafLenis = time => {
        lenis.raf(time);
        requestAnimationFrame(rafLenis);
      };
      requestAnimationFrame(rafLenis);
    }

    // =========================================================================
    // 2. RENDER KONTEN & LOGIKA INTERAKSI
    // =========================================================================
    document.title = CONFIG.identity.pageTitle;
    document.getElementById("waxSeal").textContent = `${CONFIG.identity.clientName[0]}&${CONFIG.identity.partnerName[0]}`;
    document.getElementById("heroSub").textContent = CONFIG.hero.subtitle;
    document.getElementById("letterSign").textContent = CONFIG.letter.signature;
    document.getElementById("footNames").textContent = `${CONFIG.identity.clientName} & ${CONFIG.identity.partnerName}`;

    // Render Hero Per Kata
    const heroTitle = document.getElementById("heroTitle");
    CONFIG.hero.title.split(" ").forEach(w => {
      const s = document.createElement("span");
      s.className = "hero-word"; s.textContent = w;
      heroTitle.appendChild(s);
    });

    // Render Timeline
    const webPhoto = src => src.replace(/\.jpg$/i, '.webp');
    const videoPoster = src => src.replace(/\.mp4$/i, '-poster.webp');
    const tlList = document.getElementById("tlList");
    CONFIG.timeline.forEach((item, index) => {
      const el = document.createElement("div");
      el.className = "tl-item";
      el.setAttribute("data-aos", index % 2 === 0 ? "fade-right" : "fade-left");
      el.setAttribute("data-aos-once", "true");
      el.setAttribute("data-aos-duration", "750");
      el.innerHTML = `
        <div class="tl-dot" aria-hidden="true"></div>
        <div class="tl-txt">
          <p class="label">${item.date}</p>
          <h3 class="title">${item.title}</h3>
          <p class="story">${item.story}</p>
        </div>
        <div class="tl-img-box"><img src="${webPhoto(item.photo)}" alt="${item.title}" width="800" height="600" loading="lazy" decoding="async"/></div>
      `;
      const photoButton = el.querySelector('.tl-img-box');
      photoButton.tabIndex = 0;
      photoButton.setAttribute('role', 'button');
      photoButton.setAttribute('aria-label', `Buka foto: ${item.title}`);
      photoButton.style.cursor = 'pointer';
      photoButton.onclick = () => openLb(index, timelinePhotos);
      photoButton.onkeydown = event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openLb(index, timelinePhotos);
        }
      };
      tlList.appendChild(el);
    });

    // Render Galeri & Lightbox
    let curGal = 0;
    const timelinePhotos = CONFIG.timeline.map(item => ({
      src: item.photo,
      caption: `${item.date} — ${item.title}`
    }));
    let activePhotos = CONFIG.gallery;
    const galGrid = document.getElementById("galGrid");
    const isVideo = item => /\.(mp4|webm|ogg)(?:$|\?)/i.test(item.src);
    CONFIG.gallery.forEach((g, i) => {
      const d = document.createElement("div");
      d.className = "gal-card";
      d.setAttribute("data-aos", "zoom-in");
      d.setAttribute("data-aos-delay", String((i % 6) * 70));
      d.setAttribute("data-aos-once", "true");
      d.setAttribute("data-aos-duration", "650");
      if (isVideo(g)) {
        const poster = document.createElement('img');
        poster.src = videoPoster(g.src);
        poster.alt = g.caption;
        poster.loading = 'lazy';
        poster.decoding = 'async';
        const play = document.createElement('span');
        play.className = 'gal-play';
        play.textContent = '▶';
        play.setAttribute('aria-hidden', 'true');
        d.append(poster, play);
      } else {
        const image = document.createElement("img");
        image.src = webPhoto(g.src);
        image.alt = g.caption;
        image.loading = "lazy";
        d.appendChild(image);
      }
      d.onclick = () => openLb(i);
      d.tabIndex = 0;
      d.setAttribute('role', 'button');
      d.setAttribute('aria-label', `${isVideo(g) ? 'Putar video' : 'Buka foto'}: ${g.caption}`);
      d.onkeydown = event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openLb(i); }
      };
      galGrid.appendChild(d);
    });

    function openLb(i, photos = CONFIG.gallery) {
      activePhotos = photos;
      curGal = i;
      const item = activePhotos[i];
      const image = document.getElementById("lbImg");
      const video = document.getElementById("lbVideo");
      const request = ++videoRequest;
      video.pause();
      video.removeAttribute("src");
      video.load();
      setVideoStatus('');
      document.getElementById('videoRetry').classList.add('hidden');
      if (isVideo(item)) {
        image.classList.add("hidden");
        video.classList.remove("hidden");
        video.poster = videoPoster(item.src);
        setVideoStatus('Memuat video…');
        video.src = item.src;
        video.load();
        video.play().catch(error => {
          if (request !== videoRequest || error.name === 'AbortError') return;
          if (error.name === 'NotAllowedError') setVideoStatus('Ketuk Play untuk memutar video.');
        });
      } else {
        video.classList.add("hidden");
        image.classList.remove("hidden");
        image.src = webPhoto(item.src);
        image.alt = item.caption;
      }
      document.getElementById("lbCap").textContent = item.caption;
      document.getElementById("lightbox").classList.remove("hidden");
    }
    const galleryVideo = document.getElementById("lbVideo");
    let videoRequest = 0;
    const videoStatus = document.createElement('p');
    videoStatus.id = 'videoStatus';
    videoStatus.setAttribute('role', 'status');
    const videoRetry = document.createElement('button');
    videoRetry.id = 'videoRetry';
    videoRetry.className = 'btn hidden';
    videoRetry.textContent = 'Coba lagi';
    videoRetry.onclick = () => openLb(curGal, activePhotos);
    galleryVideo.after(videoStatus, videoRetry);
    galleryVideo.preload = 'none';
    function setVideoStatus(message) { videoStatus.textContent = message; }
    galleryVideo.addEventListener('waiting', () => {
      if (galleryVideo.hasAttribute('src')) setVideoStatus('Memuat video…');
    });
    galleryVideo.addEventListener('playing', () => setVideoStatus(''));
    galleryVideo.addEventListener('error', () => {
      if (!galleryVideo.hasAttribute('src')) return;
      setVideoStatus('Video gagal dimuat. Periksa koneksi lalu coba lagi.');
      videoRetry.classList.remove('hidden');
    });
    let resumeMusicAfterVideo = false;
    galleryVideo.addEventListener("play", () => {
      const audio = document.getElementById("bgAudio");
      resumeMusicAfterVideo = !audio.paused && audio.volume > 0;
      audio.pause();
      document.getElementById("musicBars").classList.remove("play");
    });
    galleryVideo.addEventListener("pause", () => {
      if (resumeMusicAfterVideo) {
        resumeMusicAfterVideo = false;
        resumeBackgroundMusic();
      }
    });
    function resumeBackgroundMusic() {
      const audio = document.getElementById("bgAudio");
      if (!audio.src || audio.volume <= 0) return;
      audio.play().then(() => document.getElementById("musicBars").classList.add("play")).catch(() => { });
    }
    document.getElementById("lbClose").onclick = () => {
      videoRequest++;
      galleryVideo.pause();
      galleryVideo.removeAttribute('src');
      galleryVideo.load();
      setVideoStatus('');
      document.getElementById("lightbox").classList.add("hidden");
    };
    document.getElementById("lbPrev").onclick = () => openLb((curGal - 1 + activePhotos.length) % activePhotos.length, activePhotos);
    document.getElementById("lbNext").onclick = () => openLb((curGal + 1) % activePhotos.length, activePhotos);

    // Render Kartu Flip 3D
    const rsnGrid = document.getElementById("rsnGrid");
    CONFIG.reasons.forEach((r, i) => {
      const c = document.createElement("div");
      c.className = "rsn-card";
      c.setAttribute("data-aos", "flip-up");
      c.setAttribute("data-aos-delay", String((i % 5) * 85));
      c.setAttribute("data-aos-once", "true");
      c.setAttribute("data-aos-duration", "750");
      c.innerHTML = `
        <div class="rsn-inner">
          <div class="rsn-face rsn-front">
            <span style="font-family:var(--font-heading);font-size:2.4rem;font-style:italic;color:var(--dusty-rose)">0${i + 1}</span>
            <span class="cd-lbl" style="margin-top:6px">Sentuh Kartu</span>
          </div>
          <div class="rsn-face rsn-back">“${r}”</div>
        </div>
      `;
      c.onclick = () => c.classList.toggle("flip");
      rsnGrid.appendChild(c);
    });

    // Cek Preview atau Countdown
    const params = new URLSearchParams(location.search);
    if (CONFIG.dev.enablePreview && params.get("preview") === CONFIG.dev.previewCode) {
      openMainPage();
    } else if (Date.now() < new Date(CONFIG.gate.unlockAt).getTime()) {
      document.getElementById("pwScreen").classList.add("hidden");
      startCountdown();
    }

    document.getElementById("welcomeYes").addEventListener("click", () => {
      document.getElementById("welcomeScreen").classList.add("hidden");
      startStorySlides();
    });
    document.getElementById("welcomeNo").addEventListener("click", () => {
      const actions = document.getElementById("welcomeActions");
      const noButton = document.getElementById("welcomeNo");
      const yesButton = document.getElementById("welcomeYes");
      const welcomeCard = document.getElementById("welcomeScreen");
      actions.classList.add("no-dodging");
      const area = welcomeCard.getBoundingClientRect();
      const buttonWidth = noButton.offsetWidth;
      const buttonHeight = noButton.offsetHeight;
      const pad = 16;
      const moveRadius = 72;
      const yes = yesButton.getBoundingClientRect();
      const maxLeft = area.width - buttonWidth - pad;
      const maxTop = area.height - buttonHeight - pad;
      const yesLeft = yes.left - area.left;
      const yesTop = yes.top - area.top;
      const currentRect = noButton.getBoundingClientRect();
      const currentLeft = currentRect.left - area.left;
      const currentTop = currentRect.top - area.top;
      let nextPosition = null;

      for (let attempt = 0; attempt < 80; attempt++) {
        const left = Math.min(maxLeft, Math.max(pad, currentLeft + (Math.random() * 2 - 1) * moveRadius));
        const top = Math.min(maxTop, Math.max(pad, currentTop + (Math.random() * 2 - 1) * moveRadius));
        const overlapsYes = left < yesLeft + yes.width + 18 && left + buttonWidth + 18 > yesLeft &&
          top < yesTop + yes.height + 18 && top + buttonHeight + 18 > yesTop;
        const movedClearly = Math.hypot(left - currentLeft, top - currentTop) > 24;
        if (!overlapsYes && movedClearly) {
          nextPosition = { left, top };
          break;
        }
      }

      if (nextPosition) {
        noButton.style.left = `${nextPosition.left}px`;
        noButton.style.top = `${nextPosition.top}px`;
      }
    });

    function startCountdown() {
      const cdScreen = document.getElementById("cdScreen");
      cdScreen.classList.remove("hidden");
      const target = new Date(CONFIG.gate.unlockAt).getTime();
      const giftButton = document.getElementById("cdOpenGift");
      giftButton.disabled = true;
      giftButton.onclick = () => {
        if (Date.now() < target) return;
        cdScreen.classList.add("hidden");
        document.getElementById("pwScreen").classList.remove("hidden");
      };
      let timer;
      const updateCountdown = () => {
        const diff = Math.max(0, target - Date.now());
        document.getElementById("cD").textContent = String(Math.floor(diff / 86400000)).padStart(2, "0");
        document.getElementById("cH").textContent = String(Math.floor((diff / 3600000) % 24)).padStart(2, "0");
        document.getElementById("cM").textContent = String(Math.floor((diff / 60000) % 60)).padStart(2, "0");
        document.getElementById("cS").textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
        if (diff <= 0) {
          clearInterval(timer);
          giftButton.disabled = false;
          document.getElementById("cdBot").textContent = "waktunya sudah tiba — buka yuk ✦";
        }
      };
      timer = setInterval(updateCountdown, 1000);
      updateCountdown();
    }

    // PIN Keypad 6 Digit & Validasi Otomatis
    const targetPin = CONFIG.gate.passwordDate.trim();
    const pinLength = targetPin.length || 6;
    const pinDotsContainer = document.getElementById("pinDots");
    const pinGreetingEl = document.getElementById("pinGreeting");
    const pinClueEl = document.getElementById("pinClue");

    if (CONFIG.gate.greetingText) pinGreetingEl.textContent = CONFIG.gate.greetingText;
    if (CONFIG.gate.clueText) pinClueEl.textContent = CONFIG.gate.clueText;

    // Buat 6 bulatan indikator sesuai panjang PIN
    pinDotsContainer.innerHTML = "";
    for (let i = 0; i < pinLength; i++) {
      const dot = document.createElement("span");
      dot.className = "pin-dot";
      pinDotsContainer.appendChild(dot);
    }
    const pinDots = [...pinDotsContainer.querySelectorAll(".pin-dot")];

    let currentPin = "";
    let attempts = 0;
    let isCheckingPin = false;

    function updatePinDots(isError = false) {
      pinDots.forEach((dot, idx) => {
        dot.classList.toggle("filled", idx < currentPin.length);
        dot.classList.toggle("error", isError);
      });
    }

    function pressDigit(digit) {
      if (isCheckingPin || currentPin.length >= pinLength) return;
      currentPin += digit;
      updatePinDots();

      if (currentPin.length === pinLength) {
        isCheckingPin = true;
        setTimeout(verifyPin, 220);
      }
    }

    function deleteDigit() {
      if (isCheckingPin || currentPin.length === 0) return;
      currentPin = currentPin.slice(0, -1);
      updatePinDots();
    }

    function verifyPin() {
      if (currentPin === targetPin) {
        startMusic();
        document.getElementById("pwFormArea").classList.add("hidden");
        document.getElementById("sealArea").classList.remove("hidden");
        document.getElementById("waxSeal").classList.add("break");
        setTimeout(() => {
          document.getElementById("pwScreen").classList.add("hidden");
          document.getElementById("welcomeScreen").classList.remove("hidden");
        }, 1500);
      } else {
        attempts++;
        updatePinDots(true);
        pinDotsContainer.classList.remove("shake");
        void pinDotsContainer.offsetWidth;
        pinDotsContainer.classList.add("shake");

        const wMsg = document.getElementById("wrongMsg");
        wMsg.textContent = CONFIG.gate.wrongMessage;
        wMsg.classList.remove("hidden");

        if (attempts >= CONFIG.gate.hintAfter) {
          const hMsg = document.getElementById("hintMsg");
          hMsg.textContent = CONFIG.gate.hintText;
          hMsg.classList.remove("hidden");
        }
        if (attempts >= CONFIG.gate.helpAfter) {
          const wa = document.getElementById("waHelpBtn");
          wa.href = `https://wa.me/${CONFIG.gate.helpWhatsapp}?text=${encodeURIComponent(CONFIG.gate.helpMessage)}`;
          wa.classList.remove("hidden");
        }

        // Kosongkan kembali bulatan setelah animasi getar selesai
        setTimeout(() => {
          currentPin = "";
          isCheckingPin = false;
          updatePinDots(false);
        }, 480);
      }
    }

    // Event Klik Tombol Keypad di Layar
    document.querySelectorAll(".pin-key[data-num]").forEach(btn => {
      btn.addEventListener("click", () => pressDigit(btn.dataset.num));
    });
    document.getElementById("pinBackspace").addEventListener("click", deleteDigit);

    // Dukungan Ketik Langsung dari Keyboard Laptop
    window.addEventListener("keydown", e => {
      const pwScreen = document.getElementById("pwScreen");
      const gateOverlay = document.getElementById("gateOverlay");
      if (pwScreen.classList.contains("hidden") || gateOverlay.classList.contains("hide")) return;

      if (/^[0-9]$/.test(e.key)) {
        const btn = document.querySelector(`.pin-key[data-num="${e.key}"]`);
        if (btn) {
          btn.classList.add("pressed");
          setTimeout(() => btn.classList.remove("pressed"), 150);
        }
        pressDigit(e.key);
      } else if (e.key === "Backspace") {
        deleteDigit();
      }
    });

    // Story Slides Interaktif
    let slideIdx = 0;
    function startStorySlides() {
      const scr = document.getElementById("storyScreen");
      const dots = document.getElementById("storyDots");
      scr.classList.remove("hidden");
      dots.innerHTML = CONFIG.storySlides.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}"></span>`).join("");
      showSlide(0);

      document.getElementById("nextStoryBtn").onclick = () => {
        slideIdx++;
        if (slideIdx < CONFIG.storySlides.length) {
          scr.style.animation = "none"; void scr.offsetWidth; scr.style.animation = "popIn 0.55s var(--ease)";
          showSlide(slideIdx);
        } else {
          burstPetals();
          openMainPage();
        }
      };
    }

    function showSlide(i) {
      document.getElementById("storyEmoji").textContent = CONFIG.storySlides[i].emoji;
      document.getElementById("storyLabel").textContent = CONFIG.storySlides[i].label;
      document.getElementById("storyText").textContent = CONFIG.storySlides[i].text;
      document.getElementById("nextStoryBtn").textContent = i === CONFIG.storySlides.length - 1 ? "Buka Cerita Kita ✨" : "Lanjut →";
      document.querySelectorAll(".dot").forEach((d, idx) => d.classList.toggle("active", idx === i));
    }

    function openMainPage() {
      document.getElementById("gateOverlay").classList.add("hide");
      document.getElementById("mainPage").classList.remove("hidden");
      document.querySelectorAll(".hero-word").forEach((w, i) => setTimeout(() => w.classList.add("show"), i * 250 + 250));
      startTogetherCounter();
      if (typeof AOS !== "undefined" && !prefersReducedMotion) {
        AOS.init({
          once: true,
          duration: 750,
          easing: "ease-out-quart",
          offset: 90,
          anchorPlacement: "top-bottom",
          disable: prefersReducedMotion
        });
        requestAnimationFrame(() => AOS.refreshHard());
      } else {
        document.querySelectorAll("#mainPage [data-aos]").forEach(el => el.classList.add("aos-animate"));
      }
      initScrollAnimations();
    }

    // Musik
    function startMusic() {
      const audio = document.getElementById("bgAudio");
      const dock = document.getElementById("musicDock");
      const btn = document.getElementById("musicBtn");
      const bars = document.getElementById("musicBars");
      const slider = document.getElementById("volumeSlider");
      audio.src = CONFIG.music.src;
      const baseVolume = Math.min(1, Math.max(0, CONFIG.music.volume));
      audio.volume = baseVolume;
      slider.value = Math.round(baseVolume * 100);
      dock.classList.remove("hidden");
      audio.play().then(() => bars.classList.add("play")).catch(() => { });
      btn.onclick = () => {
        if (audio.paused) { audio.play().then(() => bars.classList.add("play")).catch(() => { }); }
        else { audio.pause(); bars.classList.remove("play"); }
      };
      slider.oninput = () => { audio.volume = Number(slider.value) / 100; };
      slider.onchange = () => {
        if (audio.volume > 0) { audio.play().then(() => { bars.classList.add("play"); btn.classList.remove("muted"); }).catch(() => { }); }
        else { audio.pause(); bars.classList.remove("play"); btn.classList.add("muted"); }
      };
    }

    // Counter Waktu Bersama
    function startTogetherCounter() {
      const start = new Date(CONFIG.relationship.startDate);
      setInterval(() => {
        const now = new Date();
        let y = now.getFullYear() - start.getFullYear();
        let m = now.getMonth() - start.getMonth();
        let d = now.getDate() - start.getDate();
        if (d < 0) { m--; d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
        if (m < 0) { y--; m += 12; }
        const diff = now - start;
        document.getElementById("tY").textContent = Math.max(0, y);
        document.getElementById("tMo").textContent = Math.max(0, m);
        document.getElementById("tD").textContent = Math.max(0, d);
        document.getElementById("tH").textContent = String(Math.floor((diff / 3600000) % 24)).padStart(2, "0");
        document.getElementById("tMi").textContent = String(Math.floor((diff / 60000) % 60)).padStart(2, "0");
        document.getElementById("tS").textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
      }, 1000);
    }

    // Scroll Reveal & Typewriter Surat
    function initScrollAnimations() {
      const tlWrap = document.querySelector(".tl-wrap");
      const tlProgress = tlWrap.querySelector(".tl-line-progress");
      const tlDots = [...tlWrap.querySelectorAll(".tl-dot")];
      let scrollFrame = 0;
      const updateScroll = () => {
        scrollFrame = 0;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        document.getElementById("progressBar").style.width = `${h > 0 ? (window.scrollY / h) * 100 : 0}%`;
        const rect = tlWrap.getBoundingClientRect();
        const drawn = Math.max(0, Math.min(rect.height, window.innerHeight * 0.7 - rect.top));
        tlProgress.style.height = `${rect.height > 0 ? drawn / rect.height * 100 : 0}%`;
        tlDots.forEach(dot => {
          const center = dot.parentElement.offsetTop + dot.offsetTop + dot.offsetHeight / 2;
          dot.classList.toggle("active", drawn >= center);
        });
      };
      const scheduleScroll = () => {
        if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
      };
      window.addEventListener("scroll", scheduleScroll, { passive: true });
      window.addEventListener("resize", scheduleScroll);
      new ResizeObserver(scheduleScroll).observe(tlWrap);
      updateScroll();

      const letBody = document.getElementById("letterBody");
      let typed = false;
      const letObs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !typed) {
          typed = true;
          let i = 0; const txt = CONFIG.letter.body;
          const step = () => { if (i <= txt.length) { letBody.textContent = txt.slice(0, i++); setTimeout(step, 20); } };
          step();
        }
      }, { threshold: 0.25 });
      letObs.observe(letBody);
    }

    // Latar Dinamis: Bokeh, Cursor Trail & Click Sparkle
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bokehLayer = document.getElementById("bokehLayer");
    for (let i = 0; i < 10; i++) {
      const b = document.createElement("span");
      b.className = "bokeh";
      const size = 14 + Math.random() * 46;
      b.style.width = `${size}px`;
      b.style.height = `${size}px`;
      b.style.left = `${Math.random() * 100}%`;
      b.style.top = `${20 + Math.random() * 100}%`;
      b.style.animationDuration = `${16 + Math.random() * 14}s`;
      b.style.animationDelay = `${-Math.random() * 24}s`;
      bokehLayer.appendChild(b);
    }
    if (!reduceMotion && matchMedia("(pointer: fine)").matches) {
      const trail = document.getElementById("cursorTrail");
      const sparkles = ["✦", "♡", "✧", "·"];
      let lastX = -999, lastY = -999;
      window.addEventListener("pointermove", event => {
        if (Math.hypot(event.clientX - lastX, event.clientY - lastY) < 14) return;
        lastX = event.clientX; lastY = event.clientY;
        const dot = document.createElement("span");
        dot.className = "cursor-trail";
        dot.style.left = `${event.clientX}px`;
        dot.style.top = `${event.clientY}px`;
        trail.appendChild(dot);
        requestAnimationFrame(() => { dot.style.transform = "translate(-50%, -50%) scale(0)"; dot.style.opacity = "0"; });
        setTimeout(() => dot.remove(), 320);
      }, { passive: true });
      window.addEventListener("pointerdown", event => {
        for (let i = 0; i < 6; i++) {
          const spark = document.createElement("span");
          spark.className = "click-sparkle";
          spark.textContent = sparkles[i % sparkles.length];
          spark.style.left = `${event.clientX}px`;
          spark.style.top = `${event.clientY}px`;
          spark.style.setProperty("--sx", `${(Math.random() - 0.5) * 90}px`);
          spark.style.setProperty("--sy", `${-20 - Math.random() * 50}px`);
          spark.style.animationDelay = `${i * 40}ms`;
          document.body.appendChild(spark);
          setTimeout(() => spark.remove(), 1100);
        }
      }, { passive: true });
    }

    // Partikel Kelopak Canvas
    const cvs = document.getElementById("petalCanvas");
    const ctx = cvs.getContext("2d");
    let W = cvs.width = innerWidth, H = cvs.height = innerHeight;
    window.onresize = () => { W = cvs.width = innerWidth; H = cvs.height = innerHeight; };

    const petals = Array.from({ length: 18 }, () => makePetal(false));
    function makePetal(burst) {
      return {
        x: Math.random() * W, y: burst ? -20 - Math.random() * 120 : Math.random() * H,
        r: Math.random() * 4 + 3, vy: burst ? Math.random() * 1.8 + 1 : Math.random() * 0.5 + 0.25,
        angle: Math.random() * 6, spin: (Math.random() - 0.5) * 0.02, gold: Math.random() > 0.6
      };
    }
    function burstPetals() {
      for (let i = 0; i < 35; i++) petals.push(makePetal(true));
      setTimeout(() => petals.splice(18), 4500);
    }
    function drawPetals() {
      ctx.clearRect(0, 0, W, H);
      petals.forEach(p => {
        p.y += p.vy; p.x += Math.sin(p.angle) * 0.35; p.angle += p.spin;
        if (p.y > H + 20) { p.y = -15; p.x = Math.random() * W; }
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle);
        ctx.globalAlpha = 0.45;
        ctx.fillStyle = p.gold ? "#C9A58B" : "#C98B97";
        ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * 0.6, 0, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(drawPetals);
    }
    drawPetals();

  
