// =======================================================
// JAVASCRIPT LOGIC - "هادي لقى نوره" WEDDING INVITATION
// Smooth 3D Envelope Opening, Instant Cheerful Music, HD Save
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
    initEnvelopeOpening();
    initCountdownTimer();
    initGuestWishes();
    initCardSave();
    initCalendarEvent();
    initAudioController();
    initStarlightGlow();
});

/* ----------------- 1. SMOOTH 3D ENVELOPE OPENING ----------------- */
function initEnvelopeOpening() {
    const envelopeScreen = document.getElementById('envelopeScreen');
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const openBtn = document.getElementById('openEnvelopeBtn');
    const waxSeal = document.getElementById('waxSeal');

    let isOpened = false;

    function openEnvelope() {
        if (isOpened) return;
        isOpened = true;

        // Break the wax seal
        if (waxSeal) {
            waxSeal.style.transform = 'translate(-50%, -50%) scale(0) rotate(90deg)';
            waxSeal.style.opacity = '0';
        }

        // Trigger 3D unfolding animation
        if (envelopeWrapper) {
            envelopeWrapper.classList.add('unfolding');
        }

        // Play celebration chime & immediately launch romantic cheerful music
        playChime();
        startJoyfulMusic();

        // Smooth transition to the invitation card
        setTimeout(() => {
            if (envelopeScreen) {
                envelopeScreen.classList.add('opened');
            }
        }, 900);
    }

    if (openBtn) openBtn.addEventListener('click', openEnvelope);
    if (waxSeal) waxSeal.addEventListener('click', openEnvelope);
    if (envelopeWrapper) envelopeWrapper.addEventListener('click', openEnvelope);
}

/* ----------------- 2. CHEERFUL ROMANTIC AUDIO (WEB AUDIO API) ----------------- */
let audioCtx = null;
let isAudioPlaying = false;
let musicTimer = null;

function getAudioContext() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function initAudioController() {
    const musicBtn = document.getElementById('musicToggleBtn');
    const label = document.getElementById('audioLabel');

    if (!musicBtn) return;

    musicBtn.addEventListener('click', () => {
        if (!isAudioPlaying) {
            startJoyfulMusic();
            musicBtn.classList.remove('muted');
            if (label) label.innerText = 'الموسيقى تعمل';
        } else {
            stopJoyfulMusic();
            musicBtn.classList.add('muted');
            if (label) label.innerText = 'تشغيل الموسيقى';
        }
    });
}

// Warm, joyful arpeggio scale
const joyfulNotes = [
    261.63, 329.63, 392.00, 523.25, // C - E - G - C
    293.66, 369.99, 440.00, 587.33, // D - F# - A - D
    329.63, 392.00, 493.88, 659.25, // E - G - B - E
    349.23, 440.00, 523.25, 698.46  // F - A - C - F
];

function playAcousticNote(freq, time, duration = 1.4) {
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.exponentialRampToValueAtTime(0.12, time + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + duration);
    } catch (e) {
        // silent fallback
    }
}

function startJoyfulMusic() {
    isAudioPlaying = true;
    let stepIndex = 0;
    const ctx = getAudioContext();

    function step() {
        if (!isAudioPlaying) return;
        const now = ctx.currentTime;
        const freq = joyfulNotes[stepIndex % joyfulNotes.length];
        
        playAcousticNote(freq, now, 1.5);
        
        // Gentle harmony
        if (stepIndex % 2 === 0) {
            playAcousticNote(freq * 1.25, now + 0.12, 1.2);
        }

        stepIndex++;
    }

    step();
    musicTimer = setInterval(step, 650);
}

function stopJoyfulMusic() {
    isAudioPlaying = false;
    if (musicTimer) clearInterval(musicTimer);
}

function playChime() {
    try {
        const ctx = getAudioContext();
        const chimeNotes = [523.25, 659.25, 783.99, 1046.50];
        const now = ctx.currentTime;
        chimeNotes.forEach((freq, idx) => {
            playAcousticNote(freq, now + idx * 0.1, 1.6);
        });
    } catch (e) {
        // silent fallback
    }
}

/* ----------------- 3. COUNTDOWN TIMER ----------------- */
function initCountdownTimer() {
    // September 18, 2026, 19:00 Cairo
    const weddingDate = new Date('September 18, 2026 19:00:00 GMT+0300').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function update() {
        const now = new Date().getTime();
        const diff = weddingDate - now;

        if (diff <= 0) {
            if (daysEl) daysEl.innerText = "00";
            if (hoursEl) hoursEl.innerText = "00";
            if (minutesEl) minutesEl.innerText = "00";
            if (secondsEl) secondsEl.innerText = "00";
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        if (daysEl) daysEl.innerText = d < 10 ? `0${d}` : d;
        if (hoursEl) hoursEl.innerText = h < 10 ? `0${h}` : h;
        if (minutesEl) minutesEl.innerText = m < 10 ? `0${m}` : m;
        if (secondsEl) secondsEl.innerText = s < 10 ? `0${s}` : s;
    }

    update();
    setInterval(update, 1000);
}

/* ----------------- 3.5 GUEST PRAYERS & CUTE MESSAGES ----------------- */
function initGuestWishes() {
    const wishesForm = document.getElementById('wishesQuickForm');
    const wishesFeed = document.getElementById('wishesFeedList');
    const authorInput = document.getElementById('wishAuthorInput');
    const textInput = document.getElementById('wishTextInput');

    if (!wishesForm || !wishesFeed) return;

    // Load saved wishes from localStorage
    try {
        const savedWishes = JSON.parse(localStorage.getItem('hady_nour_wishes') || '[]');
        savedWishes.forEach(wish => {
            appendWishCard(wish.author, wish.text, false);
        });
    } catch (e) {
        // ignore storage errors
    }

    wishesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const author = authorInput.value.trim();
        const text = textInput.value.trim();

        if (!author || !text) return;

        appendWishCard(author, text, true);

        // Save to localStorage
        try {
            const savedWishes = JSON.parse(localStorage.getItem('hady_nour_wishes') || '[]');
            savedWishes.unshift({ author, text, date: new Date().toISOString() });
            localStorage.setItem('hady_nour_wishes', JSON.stringify(savedWishes));
        } catch (e) {
            // ignore
        }

        // Reset form & play sweet chime
        authorInput.value = '';
        textInput.value = '';
        playChime();
    });

    function appendWishCard(author, text, isNew = false) {
        const card = document.createElement('div');
        card.classList.add('single-wish-card', 'highlight');
        if (isNew) {
            card.style.animation = 'fadeInCard 0.5s ease';
        }
        card.innerHTML = `
            <div class="wish-meta">
                <strong class="author-name">${escapeHtml(author)}</strong>
                <span class="wish-badge">دعوة طيبة</span>
            </div>
            <p class="wish-content">"${escapeHtml(text)}"</p>
        `;
        wishesFeed.prepend(card);
    }

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
}

/* ----------------- 4. INVITATION CARD HD DOWNLOAD ----------------- */
function initCardSave() {
    const downloadBtn = document.getElementById('downloadCardBtn');
    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', () => {
        const card = document.getElementById('printableWeddingCard');
        if (!card) return;

        const originalHTML = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري تجهيز الكارت...';
        downloadBtn.disabled = true;

        html2canvas(card, {
            scale: 3,
            useCORS: true,
            backgroundColor: '#FAF6EE',
            logging: false
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'كارت_دعوة_فرح_هادي_ونور.png';
            link.href = canvas.toDataURL('image/png');
            link.click();

            downloadBtn.innerHTML = '<i class="fa-solid fa-check"></i> تم التحميل بنجاح';
            setTimeout(() => {
                downloadBtn.innerHTML = originalHTML;
                downloadBtn.disabled = false;
            }, 3000);
        }).catch(() => {
            downloadBtn.innerHTML = originalHTML;
            downloadBtn.disabled = false;
        });
    });
}

/* ----------------- 5. ADD TO CALENDAR ----------------- */
function initCalendarEvent() {
    const calBtn = document.getElementById('addToCalBtn');
    if (!calBtn) return;

    calBtn.addEventListener('click', () => {
        const title = encodeURIComponent("حفل زفاف هادي & نور - هادي لقى نوره");
        const details = encodeURIComponent("يسعدنا حضوركم ومشاركتنا فرحة العمر في فندق ماريوت الزمالك - قاعة عايدة الكبرى.");
        const location = encodeURIComponent("Cairo Marriott Hotel, Saray El Gezira St, Zamalek, Cairo, Egypt");
        const dates = "20260918T160000Z/20260918T230000Z";

        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
        window.open(url, '_blank');
    });
}

/* ----------------- 6. CREATIVE THEME: AMBIENT STARLIGHT GLOW & FAIRY LIGHTS ----------------- */
function initStarlightGlow() {
    const container = document.getElementById('ambient-particles');
    if (!container) return;

    container.innerHTML = '';
    const totalStars = 24;

    for (let i = 0; i < totalStars; i++) {
        const star = document.createElement('div');
        star.classList.add('starlight-sparkle');

        const size = Math.random() * 5 + 3;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const duration = Math.random() * 4 + 3;
        const delay = Math.random() * 4;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${top}vh`;
        star.style.left = `${left}vw`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;

        container.appendChild(star);
    }
}
