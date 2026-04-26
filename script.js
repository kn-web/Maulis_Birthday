/* ── Detect which page we're on ─────────────────────────── */
const isPage1 = document.body.classList.contains('page-message');
const isPage2 = document.body.classList.contains('page-birthday');

/* ══════════════════════════════════════════════════════════
   PAGE 1 — Typing animation + floating particles
══════════════════════════════════════════════════════════ */
if (isPage1) {

  /* ── Messages ─────────────────────────────────────────── */
  // const messages = [
  //   "Hey…",
  //   "I want to tell you something.",
  //   "You are very special to me ❤️",
  //   "There's no one quite like you.",
  //   "And today… is your day.",
  //   "So let's celebrate you. 🎂"
  // ];

  const messages = [
    "Hey… 💫",
    "I don’t know where to start…",
    "But I just want to say something from my heart ❤️",
    "You are not just special… you are *irreplaceable* ✨",
    "In a world full of people… my eyes always search for you 👀",
    "Your smile has a kind of magic that makes everything feel right 😊",
    "And your presence… makes everything calm and peaceful around me… except me 😂",
    "Yes, we’ve known each other for almost 10 years…",
    "But honestly, it feels like I’ve truly started knowing you in the last 6–8 months ✨",
    "Especially that courageous and ambitious girl…",
    "That overthinking girl…",
    "That cute, angry-bird kind of anger 😂😂❤️",
    "And so many little things that make you… you 💖",
    "I may not say it often…",
    "But you truly mean a lot to me 💖",
    "More than words… more than moments…",
    "You are a beautiful part of my life 🌸",
    "And today… is all about you 🎂",
    "So just keep smiling… because you deserve all the happiness in the world 🌍",
    "Let’s celebrate you… the amazing person you are 🎉"
  ];

  const textEl = document.getElementById('message-text');
  const cursorEl = document.getElementById('cursor');
  const btnEl = document.getElementById('continue-btn');
  const readAgainBtn = document.getElementById('read-again-btn');

  let msgIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimer;

  const TYPING_SPEED = 55;   // ms per character
  const DELETE_SPEED = 28;   // ms per delete
  const PAUSE_AFTER = 2500; // ms hold before deleting
  const PAUSE_BEFORE = 300;  // ms before typing next

  function typeStep() {
    const current = messages[msgIndex];

    if (!isDeleting) {
      // Type one character
      charIndex++;
      textEl.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        // Finished typing this message
        const isLast = msgIndex === messages.length - 1;
        if (isLast) {
          // Show cursor briefly then show button
          setTimeout(() => {
            cursorEl.style.display = 'none';
            btnEl.classList.add('visible');
            readAgainBtn.classList.add('visible');  
          }, 900);
          return; // stop
        }
        // Pause then delete
        typingTimer = setTimeout(() => {
          isDeleting = true;
          typeStep();
        }, PAUSE_AFTER);
        return;
      }
    } else {
      // Delete one character
      charIndex--;
      textEl.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        // Finished deleting — move to next message
        isDeleting = false;
        msgIndex++;
        typingTimer = setTimeout(typeStep, PAUSE_BEFORE);
        return;
      }
    }

    const speed = isDeleting ? DELETE_SPEED : TYPING_SPEED;
    typingTimer = setTimeout(typeStep, speed);
  }

  // Start after a short delay
  setTimeout(typeStep, 800);

  /* ── Floating particles (canvas) ─────────────────────── */
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');

  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  function createParticle() {
    return {
      x: randomBetween(0, canvas.width),
      y: randomBetween(0, canvas.height),
      r: randomBetween(1, 2.5),
      alpha: randomBetween(0.1, 0.5),
      vx: randomBetween(-0.15, 0.15),
      vy: randomBetween(-0.3, -0.1),
      color: Math.random() < 0.5 ? '#f472b6' : '#fff'
    };
  }

  for (let i = 0; i < 55; i++) particles.push(createParticle());

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.0008;

      if (p.alpha <= 0 || p.y < -10) {
        Object.assign(p, createParticle(), { y: canvas.height + 5, alpha: randomBetween(0.1, 0.4) });
      }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

}

/* ── Navigation with fade transition ───────────────────── */
function goToPage2() {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'page-fade-overlay';
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.classList.add('fade-in');
  });

  setTimeout(() => {
    window.location.href = 'second_optimised.html';
  }, 650);
}

/* ══════════════════════════════════════════════════════════
   PAGE 2 — Fade-in reveal + confetti
══════════════════════════════════════════════════════════ */
if (isPage2) {

  /* Fade body in */
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.7s ease';
    document.body.style.opacity = '1';
  });

  /* Reveal inner content */
  const inner = document.querySelector('.birthday-inner');
  setTimeout(() => {
    inner.classList.add('revealed');
  }, 200);

  /* ── Confetti ─────────────────────────────────────────── */
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const COLORS = [
    '#f472b6', '#fb7185', '#fda4af', '#ffffff',
    '#e11d48', '#fbbf24', '#f9a8d4', '#ff6b9d'
  ];

  let pieces = [];
  let animating = false;

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  function spawnConfetti(count = 120) {
    for (let i = 0; i < count; i++) {
      pieces.push({
        x: randomBetween(0.1, 0.9) * canvas.width,
        y: randomBetween(-20, -canvas.height * 0.3),
        w: randomBetween(6, 11),
        h: randomBetween(3, 6),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rot: randomBetween(0, Math.PI * 2),
        rotV: randomBetween(-0.08, 0.08),
        vy: randomBetween(1.8, 3.8),
        vx: randomBetween(-1.2, 1.2),
        alpha: 1,
        decay: randomBetween(0.006, 0.012),
        shape: Math.random() < 0.35 ? 'circle' : 'rect'
      });
    }
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces = pieces.filter(p => p.alpha > 0.02);

    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }

      ctx.restore();

      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.rotV;
      p.vy += 0.04; // gravity
      p.alpha -= p.decay;
    });

    if (pieces.length > 0 || animating) {
      requestAnimationFrame(drawConfetti);
    }
  }

  function launchConfetti() {
    animating = true;
    spawnConfetti(130);
    drawConfetti();

    // Second burst for effect
    setTimeout(() => spawnConfetti(80), 500);

    setTimeout(() => {
      animating = false;
    }, 4000);
  }

  // Auto-launch after page reveals
  setTimeout(launchConfetti, 700);
}

function reloadPage() {
  window.location.reload();
}
