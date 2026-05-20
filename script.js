// ============================================
//   SURF DEL MAR HOTEL - Main JavaScript
// ============================================

// ── LOADER ──
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hide');
      setTimeout(() => loader.style.display = 'none', 800);
    }
  }, 2600);
});

// ── MOBILE MENU ──
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ── NAVBAR SCROLL ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
  handleReveal();
});

// ── SCROLL REVEAL ──
function handleReveal() {
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) el.classList.add('visible');
  });
}
handleReveal();

// ── WAVE CANVAS ──
const canvas = document.getElementById('waveCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, t = 0;

  function resize() {
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;
  }

  function drawWave(yBase, amp, freq, spd, color, alpha) {
    ctx.beginPath();
    ctx.moveTo(0, H);
    for (let x = 0; x <= W; x++) {
      const y = yBase
        + Math.sin((x * freq) + (t * spd)) * amp
        + Math.sin((x * freq * 0.6) + (t * spd * 0.8)) * (amp * 0.4);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function animateWaves() {
    ctx.clearRect(0, 0, W, H);
    t += 0.006;
    drawWave(H * 0.38, 26, 0.009, 0.44, '#1a6aaa', 0.28);
    drawWave(H * 0.50, 20, 0.013, 0.37, '#1560a0', 0.38);
    drawWave(H * 0.60, 14, 0.017, 0.31, '#0f4d8a', 0.52);
    drawWave(H * 0.70, 9,  0.021, 0.26, '#0a3d72', 0.70);
    drawWave(H * 0.82, 5,  0.025, 0.20, '#040f1c', 0.94);
    requestAnimationFrame(animateWaves);
  }

  resize();
  window.addEventListener('resize', resize);
  animateWaves();
}

// ── OCEAN SOUND ──
let audioCtx = null, soundOn = false, soundSource = null;

function toggleSound() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  soundOn = !soundOn;
  const btn = document.getElementById('soundBtn');
  if (btn) btn.textContent = soundOn ? '🔊' : '🔇';
  if (soundOn) playOcean();
  else if (soundSource) { try { soundSource.stop(); } catch(e){} }
}

function playOcean() {
  if (!soundOn || !audioCtx) return;
  const bufferSize = audioCtx.sampleRate * 3;
  const buf = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  soundSource = audioCtx.createBufferSource();
  soundSource.buffer = buf;
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 380;
  const gain = audioCtx.createGain();
  gain.gain.value = 0.055;
  soundSource.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);
  soundSource.loop = true;
  soundSource.start();
}
