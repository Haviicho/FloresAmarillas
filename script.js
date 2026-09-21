/* ==========================================================
   FLORES AMARILLAS PARA JHEN 🌻✨
   Inspirado en Kimi no Na wa (Your Name) y el 21 de Septiembre
   Paleta: Color Glauco (#5B8A8C) + Flores Amarillas Doradas
   ========================================================== */

(function () {
  'use strict';

  // --- 1. CONFIGURACIÓN Y PARÁMETROS URL ---
  const urlParams = new URLSearchParams(window.location.search);
  const recipientName = urlParams.get('para') || 'Jhen';
  const senderName = urlParams.get('de') || 'Con todo mi cariño ✨';

  // Actualizar textos en el DOM
  const introRecipientEl = document.getElementById('introRecipient');
  const cardRecipientEl = document.getElementById('cardRecipient');
  const cardSenderEl = document.getElementById('cardSender');
  const inputRecipient = document.getElementById('inputRecipient');
  const inputSender = document.getElementById('inputSender');

  if (introRecipientEl) introRecipientEl.textContent = recipientName;
  if (cardRecipientEl) cardRecipientEl.textContent = `Para ${recipientName} 🌻`;
  if (cardSenderEl) cardSenderEl.textContent = senderName;
  if (inputRecipient) inputRecipient.value = recipientName;
  if (inputSender) inputSender.value = urlParams.get('de') || '';

  // Elementos DOM
  const introScreen = document.getElementById('introScreen');
  const mainExperience = document.getElementById('mainExperience');
  const openButton = document.getElementById('openButton');
  const letterCard = document.getElementById('letterCard');
  const closeLetterBtn = document.getElementById('closeLetterBtn');
  const showLetterBtn = document.getElementById('showLetterBtn');
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const showerBtn = document.getElementById('showerBtn');
  const bloomMoreBtn = document.getElementById('bloomMoreBtn');
  const minigameBtn = document.getElementById('minigameBtn');
  const musicIcon = document.getElementById('musicIcon');
  const bloomFlash = document.getElementById('bloomFlash');

  // Reproductor flotante en esquina superior
  const floatingMusicPlayer = document.getElementById('floatingMusicPlayer');
  const topPlayerPlayBtn = document.getElementById('topPlayerPlayBtn');
  const topPlayerMuteBtn = document.getElementById('topPlayerMuteBtn');
  const playerPlayIcon = document.getElementById('playerPlayIcon');
  const playerMuteIcon = document.getElementById('playerMuteIcon');
  const playerVinyl = document.getElementById('playerVinyl');
  const activeThemePill = document.getElementById('activeThemePill');
  const activeThemeName = document.getElementById('activeThemeName');

  // Minijuego y recompensas
  const minigameModal = document.getElementById('minigameModal');
  const closeGameBtn = document.getElementById('closeGameBtn');
  const gameLevelEl = document.getElementById('gameLevel');
  const gameScoreEl = document.getElementById('gameScore');
  const gameComboEl = document.getElementById('gameCombo');
  const plumScoreEl = document.getElementById('plumScore');
  const levelProgressBar = document.getElementById('levelProgressBar');
  const levelProgressText = document.getElementById('levelProgressText');
  const gameToast = document.getElementById('gameToast');
  const toastIcon = document.getElementById('toastIcon');
  const toastTitle = document.getElementById('toastTitle');
  const toastDesc = document.getElementById('toastDesc');
  const gameCanvas = document.getElementById('gameCanvas');
  const gameWinScreen = document.getElementById('gameWinScreen');
  const restartGameBtn = document.getElementById('restartGameBtn');
  const continueGameBtn = document.getElementById('continueGameBtn');

  // Indicador de formato de dispositivo (Celular / Web)
  const deviceBadge = document.getElementById('deviceBadge');
  const deviceBadgeIcon = document.getElementById('deviceBadgeIcon');
  const deviceBadgeText = document.getElementById('deviceBadgeText');

  // Canvases
  const skyCanvas = document.getElementById('skyCanvas');
  const skyCtx = skyCanvas.getContext('2d');
  const flowerCanvas = document.getElementById('flowerCanvas');
  const flowerCtx = flowerCanvas.getContext('2d');

  let width = 0;
  let height = 0;
  let isExperienceActive = false;

  // Ajustar resolución de Canvas
  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    skyCanvas.width = width * dpr;
    skyCanvas.height = height * dpr;
    skyCanvas.style.width = width + 'px';
    skyCanvas.style.height = height + 'px';
    skyCtx.scale(dpr, dpr);

    flowerCanvas.width = width * dpr;
    flowerCanvas.height = height * dpr;
    flowerCanvas.style.width = width + 'px';
    flowerCanvas.style.height = height + 'px';
    flowerCtx.scale(dpr, dpr);
  }

  // --- DETECTOR AUTOMÁTICO DE DISPOSITIVO (CELULAR / WEB) ---
  const DeviceDetector = {
    isMobile: false,
    isTouch: false,
    deviceType: 'desktop',

    init() {
      this.detect();
      window.addEventListener('resize', () => {
        const prevMode = this.isMobile;
        resizeCanvas();
        this.detect();
        if (prevMode !== this.isMobile && isExperienceActive) {
          generateBouquet();
        }
      });

      window.addEventListener('orientationchange', () => {
        setTimeout(() => {
          resizeCanvas();
          DeviceDetector.detect();
          if (isExperienceActive) generateBouquet();
        }, 220);
      });
    },

    detect() {
      const ua = navigator.userAgent || navigator.vendor || window.opera || '';
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
      const isMobileUA = mobileRegex.test(ua);
      const isTouchScreen = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
      const isNarrow = window.innerWidth <= 768;

      // Se considera formato celular si el navegador es móvil, si la pantalla es estrecha o táctil
      this.isMobile = isMobileUA || isNarrow || (isTouchScreen && window.innerWidth <= 1024);
      this.isTouch = isTouchScreen;
      this.deviceType = this.isMobile ? 'mobile' : 'desktop';

      this.applyFormat();
      return this.isMobile;
    },

    applyFormat() {
      const root = document.documentElement;
      const body = document.body;

      if (this.isMobile) {
        root.classList.add('is-mobile', 'device-mobile');
        root.classList.remove('is-desktop', 'device-desktop');
        body.classList.add('is-mobile', 'device-mobile');
        body.classList.remove('is-desktop', 'device-desktop');

        if (deviceBadgeIcon) deviceBadgeIcon.textContent = '📱';
        if (deviceBadgeText) deviceBadgeText.textContent = 'Formato Celular Detectado ✨';
      } else {
        root.classList.add('is-desktop', 'device-desktop');
        root.classList.remove('is-mobile', 'device-mobile');
        body.classList.add('is-desktop', 'device-desktop');
        body.classList.remove('is-mobile', 'device-mobile');

        if (deviceBadgeIcon) deviceBadgeIcon.textContent = '💻';
        if (deviceBadgeText) deviceBadgeText.textContent = 'Formato Web de Escritorio ✨';
      }

      // Adaptar el texto de ayuda según si es táctil o ratón
      const tapHint = document.querySelector('.tap-hint');
      if (tapHint) {
        tapHint.textContent = this.isTouch
          ? '💡 Toca la pantalla para hacer brotar más flores ✨'
          : '💡 Haz clic en la pantalla para hacer brotar más flores ✨';
      }
    }
  };

  resizeCanvas();
  DeviceDetector.init();

  // --- 2. SISTEMA DE AUDIO (MP3 + FALLBACK AMBIENTAL ESTILO YOUR NAME) ---
  const bgAudio = document.getElementById('bgAudio');
  if (bgAudio) {
    bgAudio.src = 'musica.mp3?v=sparkle_v3';
    bgAudio.load();
  }
  let isMuted = false;
  let isAudioPlaying = false;
  let synthAudioCtx = null;
  let synthInterval = null;

  // Notas celestiales estilo Kimi no Na wa (Sparkle / Katawaredoki)
  const ambientNotes = [329.63, 392.00, 440.00, 493.88, 587.33, 659.25, 783.99, 880.00];

  function playSynthTone(freq, duration = 1.3, volume = 0.07) {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!synthAudioCtx) synthAudioCtx = new AudioCtx();
      if (synthAudioCtx.state === 'suspended') synthAudioCtx.resume();

      const osc = synthAudioCtx.createOscillator();
      const gain = synthAudioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, synthAudioCtx.currentTime);

      gain.gain.setValueAtTime(0, synthAudioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, synthAudioCtx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, synthAudioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(synthAudioCtx.destination);

      osc.start();
      osc.stop(synthAudioCtx.currentTime + duration);
    } catch (e) {
      // AudioContext bloqueado o no disponible
    }
  }

  function startAmbientChimes() {
    if (synthInterval || isAudioPlaying) return;
    let step = 0;
    const melodyPattern = [0, 2, 3, 5, 4, 3, 2, 1, 0, 3, 5, 7, 6, 4, 2, 3];
    synthInterval = setInterval(() => {
      if (isAudioPlaying || isMuted) return;
      const noteIdx = melodyPattern[step % melodyPattern.length];
      playSynthTone(ambientNotes[noteIdx], 1.6, 0.05);
      step++;
    }, 950);
  }

  function stopAmbientChimes() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  function updateAudioUI(playing) {
    isAudioPlaying = playing;
    if (floatingMusicPlayer) {
      if (playing) {
        floatingMusicPlayer.classList.add('is-playing');
        if (playerPlayIcon) playerPlayIcon.textContent = '⏸';
      } else {
        floatingMusicPlayer.classList.remove('is-playing');
        if (playerPlayIcon) playerPlayIcon.textContent = '▶';
      }
    }
    if (audioToggleBtn) {
      if (playing) {
        audioToggleBtn.classList.add('active-sound');
        if (musicIcon) musicIcon.textContent = '🎵';
      } else {
        audioToggleBtn.classList.remove('active-sound');
        if (musicIcon) musicIcon.textContent = '🔇';
      }
    }
  }

  function playBackgroundMusic() {
    if (isMuted) return;
    if (bgAudio) {
      bgAudio.volume = 0.85;
      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          stopAmbientChimes();
          updateAudioUI(true);
        }).catch(err => {
          // Si el archivo mp3 aún no se encuentra físicamente, iniciamos las campanas ambientales suaves
          startAmbientChimes();
          updateAudioUI(true);
        });
      } else {
        startAmbientChimes();
        updateAudioUI(true);
      }
    } else {
      startAmbientChimes();
      updateAudioUI(true);
    }
  }

  function toggleBackgroundMusic() {
    if (isAudioPlaying) {
      isMuted = true;
      if (bgAudio) bgAudio.pause();
      stopAmbientChimes();
      updateAudioUI(false);
    } else {
      isMuted = false;
      playBackgroundMusic();
    }
  }

  function toggleMute() {
    if (!isMuted) {
      isMuted = true;
      if (bgAudio) bgAudio.volume = 0;
      stopAmbientChimes();
      if (playerMuteIcon) playerMuteIcon.textContent = '🔇';
      updateAudioUI(false);
    } else {
      isMuted = false;
      if (bgAudio) {
        bgAudio.volume = 0.85;
        bgAudio.play().catch(() => startAmbientChimes());
      } else {
        startAmbientChimes();
      }
      if (playerMuteIcon) playerMuteIcon.textContent = '🔊';
      updateAudioUI(true);
    }
  }

  // Si hay error al cargar musica.mp3, probar ruta alternativa o melodía ambiental
  if (bgAudio) {
    bgAudio.addEventListener('error', () => {
      if (!bgAudio.src.includes('assets/')) {
        bgAudio.src = 'assets/musica.mp3?v=sparkle_v3';
        bgAudio.load();
        if (isAudioPlaying) bgAudio.play().catch(() => startAmbientChimes());
      } else {
        console.log('Música física no disponible en este momento. Activando melodía ambiental ✨');
        if (!isMuted && isExperienceActive) {
          startAmbientChimes();
          updateAudioUI(true);
        }
      }
    });
    bgAudio.addEventListener('ended', () => {
      bgAudio.currentTime = 0;
      bgAudio.play().catch(() => {});
    });
  }

  // --- 3. CIELO CREPUSCULAR, ESTRELLAS Y COMETA (KATAWAREDOKI & GLAUCO) ---
  const stars = [];
  const numStars = 110;
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random(),
      y: Math.random() * 0.75, // Concentradas en el cielo superior
      size: Math.random() * 1.8 + 0.5,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.3 ? '#ffffff' : (Math.random() > 0.5 ? '#8cb9bc' : '#ffd166')
    });
  }

  // Cometa de Tiamat (estilo Kimi no Na wa)
  let comet = {
    active: false,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    length: 120,
    opacity: 0,
    timer: 120
  };

  function spawnComet() {
    comet.active = true;
    comet.x = Math.random() * (width * 0.5);
    comet.y = Math.random() * (height * 0.25);
    const speed = Math.random() * 4 + 7;
    const angle = Math.PI / 4.5 + (Math.random() * 0.2 - 0.1);
    comet.vx = Math.cos(angle) * speed;
    comet.vy = Math.sin(angle) * speed;
    comet.opacity = 1;
    comet.length = Math.random() * 80 + 130;
  }

  function drawSky(time) {
    // Fondo degradado Katawaredoki y Glauco adaptado a la especie floral activa
    const grad = skyCtx.createLinearGradient(0, 0, 0, height);
    if (currentFlowerTheme === 'orchid') {
      grad.addColorStop(0, '#030712');        // Noche zafiro ultra profunda
      grad.addColorStop(0.35, '#07182c');     // Glauco azul marino noche
      grad.addColorStop(0.65, '#0d2d48');     // Azul glauco místico
      grad.addColorStop(0.85, '#124161');     // Resplandor cian glauco
      grad.addColorStop(1, '#1b5f7e');        // Horizonte cian bioluminiscente
    } else if (currentFlowerTheme === 'rose') {
      grad.addColorStop(0, '#0f0916');        // Crepúsculo amatista profundo
      grad.addColorStop(0.35, '#1f1325');     // Glauco violáceo
      grad.addColorStop(0.65, '#3b1e32');     // Matiz borgoña aterciopelado
      grad.addColorStop(0.85, '#6a2d3e');     // Resplandor rosa dorado
      grad.addColorStop(1, '#b0533c');        // Horizonte ámbar dorado de rosa
    } else if (currentFlowerTheme === 'carnation') {
      grad.addColorStop(0, '#0e1622');        // Glauco nocturno
      grad.addColorStop(0.35, '#1c2b37');     // Glauco pizarra suave
      grad.addColorStop(0.65, '#36444e');     // Glauco intermedio
      grad.addColorStop(0.85, '#664754');     // Matiz clavel durazno
      grad.addColorStop(1, '#b36e6e');        // Horizonte cálido clavel
    } else {
      // Girasoles originales Katawaredoki
      grad.addColorStop(0, '#0c151f');        // Noche profunda
      grad.addColorStop(0.35, '#1b333c');     // Glauco oscuro
      grad.addColorStop(0.65, '#2f525b');     // Glauco medio (#5B8A8C atenuado)
      grad.addColorStop(0.85, '#5b4c57');     // Matiz púrpura crepuscular
      grad.addColorStop(1, '#a87556');        // Horizonte cálido de atardecer
    }
    skyCtx.fillStyle = grad;
    skyCtx.fillRect(0, 0, width, height);

    // Resplandor atmosférico en la zona media según el tema
    const radialGlauco = skyCtx.createRadialGradient(width * 0.5, height * 0.45, 20, width * 0.5, height * 0.45, width * 0.8);
    if (currentFlowerTheme === 'orchid') {
      radialGlauco.addColorStop(0, 'rgba(0, 180, 216, 0.28)');
      radialGlauco.addColorStop(1, 'rgba(0, 180, 216, 0)');
    } else if (currentFlowerTheme === 'rose') {
      radialGlauco.addColorStop(0, 'rgba(251, 133, 0, 0.24)');
      radialGlauco.addColorStop(1, 'rgba(251, 133, 0, 0)');
    } else if (currentFlowerTheme === 'carnation') {
      radialGlauco.addColorStop(0, 'rgba(255, 182, 193, 0.22)');
      radialGlauco.addColorStop(1, 'rgba(255, 182, 193, 0)');
    } else {
      radialGlauco.addColorStop(0, 'rgba(91, 138, 140, 0.22)');
      radialGlauco.addColorStop(1, 'rgba(91, 138, 140, 0)');
    }
    skyCtx.fillStyle = radialGlauco;
    skyCtx.fillRect(0, 0, width, height);

    // Dibujar estrellas
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const brightness = 0.4 + 0.6 * Math.sin(time * s.twinkleSpeed + s.twinklePhase);
      skyCtx.fillStyle = s.color;
      skyCtx.globalAlpha = Math.max(0.1, brightness);
      skyCtx.beginPath();
      skyCtx.arc(s.x * width, s.y * height, s.size, 0, Math.PI * 2);
      skyCtx.fill();
    }
    skyCtx.globalAlpha = 1;

    // Dibujar cometa
    if (comet.active) {
      skyCtx.save();
      const tailX = comet.x - comet.vx * (comet.length / 8);
      const tailY = comet.y - comet.vy * (comet.length / 8);

      // Cola principal
      const cometGrad = skyCtx.createLinearGradient(comet.x, comet.y, tailX, tailY);
      cometGrad.addColorStop(0, `rgba(255, 240, 180, ${comet.opacity})`);
      cometGrad.addColorStop(0.3, `rgba(140, 185, 188, ${comet.opacity * 0.8})`); // Tono glauco
      cometGrad.addColorStop(1, 'rgba(140, 185, 188, 0)');

      skyCtx.strokeStyle = cometGrad;
      skyCtx.lineWidth = 2.8;
      skyCtx.lineCap = 'round';
      skyCtx.beginPath();
      skyCtx.moveTo(comet.x, comet.y);
      skyCtx.lineTo(tailX, tailY);
      skyCtx.stroke();

      // Cabeza brillante
      skyCtx.fillStyle = `rgba(255, 255, 255, ${comet.opacity})`;
      skyCtx.beginPath();
      skyCtx.arc(comet.x, comet.y, 2.5, 0, Math.PI * 2);
      skyCtx.fill();
      skyCtx.restore();

      comet.x += comet.vx;
      comet.y += comet.vy;
      comet.opacity -= 0.007;
      if (comet.opacity <= 0 || comet.x > width || comet.y > height) {
        comet.active = false;
        comet.timer = Math.floor(Math.random() * 200 + 150);
      }
    } else {
      comet.timer--;
      if (comet.timer <= 0) {
        spawnComet();
      }
    }
  }

  // --- 4. SISTEMA DE FLORES Y JARDÍN MULTI-ESPECIE (GIRASOLES, CLAVELES, ROSAS, ORQUÍDEAS) ---
  let currentFlowerTheme = 'sunflower';
  const unlockedGardenThemes = {
    sunflower: true,
    carnation: false,
    rose: false,
    orchid: false
  };

  const flowers = [];
  const petals = [];
  const sparkParticles = [];
  const skyburstFlowers = [];

  class Flower {
    constructor(baseX, targetY, scale = 1, delay = 0) {
      this.baseX = baseX;
      this.baseY = height + 20;
      this.targetX = baseX + (Math.random() * 46 - 23);
      this.targetY = targetY;
      this.scale = scale;
      this.delay = delay;
      this.age = 0;
      this.flowerType = currentFlowerTheme;

      this.stemProgress = 0; // 0 a 1
      this.bloomProgress = 0; // 0 a 1

      // Proporciones botánicas de la flor
      this.petalLength = 62 * scale;
      this.petalWidth = 17 * scale;
      this.centerRadius = 29 * scale;
      this.swaySpeed = 0.016 + Math.random() * 0.015;
      this.swayOffset = Math.random() * Math.PI * 2;
      this.curveControlX = baseX + (Math.random() * 50 - 25);
      this.stemWidth = Math.max(5, 8.5 * scale);

      // Variación orgánica individual para que cada flor sea única
      this.organicSeed = Math.random() * 1000;
    }

    update() {
      if (this.delay > 0) {
        this.delay--;
        return;
      }
      this.age++;

      // Crecimiento natural del tallo
      if (this.stemProgress < 1) {
        this.stemProgress += 0.014;
        if (this.stemProgress >= 1) {
          this.stemProgress = 1;
        }
      } else if (this.bloomProgress < 1) {
        // Apertura elástica y suave de los pétalos
        this.bloomProgress += 0.022;
        if (this.bloomProgress >= 1) {
          this.bloomProgress = 1;
        }
      }
    }

    draw(ctx, time) {
      if (this.delay > 0) return;

      const sway = Math.sin(time * this.swaySpeed + this.swayOffset) * (6 * this.scale);
      const headX = this.targetX + sway;
      const headY = this.baseY - (this.baseY - this.targetY) * this.stemProgress;

      ctx.save();

      // 1. Tallo fibroso y robusto de girasol con sombreado de luz
      ctx.lineWidth = this.stemWidth;
      const stemGrad = ctx.createLinearGradient(this.baseX - 4, this.baseY, headX + 4, headY);
      stemGrad.addColorStop(0, '#234428');
      stemGrad.addColorStop(0.35, '#35633b');
      stemGrad.addColorStop(0.7, '#47824f');
      stemGrad.addColorStop(1, '#2c5332');
      ctx.strokeStyle = stemGrad;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(this.baseX, this.baseY);
      const ctrlX = this.curveControlX + sway * 0.35;
      const ctrlY = (this.baseY + headY) / 2;
      ctx.quadraticCurveTo(ctrlX, ctrlY, headX, headY);
      ctx.stroke();

      // 2. Grandes hojas acorazonadas con nervaduras primarias y secundarias
      if (this.stemProgress > 0.3) {
        const leafP1 = Math.min(1, (this.stemProgress - 0.3) / 0.4);
        const leafY1 = this.baseY - (this.baseY - this.targetY) * 0.42;

        this.drawRealisticLeaf(ctx, ctrlX - 3, leafY1, -0.68, leafP1 * this.scale * 1.1);
        this.drawRealisticLeaf(ctx, ctrlX + 6, leafY1 - 18, 0.72, leafP1 * this.scale * 1.0);

        if (this.stemProgress > 0.6) {
          const leafP2 = Math.min(1, (this.stemProgress - 0.6) / 0.35);
          const leafY2 = this.baseY - (this.baseY - this.targetY) * 0.72;
          this.drawRealisticLeaf(ctx, ctrlX - 4, leafY2, -0.58, leafP2 * this.scale * 0.88);
          this.drawRealisticLeaf(ctx, ctrlX + 5, leafY2 - 14, 0.62, leafP2 * this.scale * 0.85);
        }
      }

      // 3. Cabeza botánica según la especie floral activa
      if (this.bloomProgress > 0.05) {
        ctx.translate(headX, headY);
        const open = Math.sin((this.bloomProgress * Math.PI) / 2);
        const rot = time * 0.0025 + this.swayOffset;

        const activeSpecies = this.flowerType || currentFlowerTheme;
        if (activeSpecies === 'carnation') {
          this.drawCarnationHead(ctx, time, open, rot);
        } else if (activeSpecies === 'rose') {
          this.drawRoseHead(ctx, time, open, rot);
        } else if (activeSpecies === 'orchid') {
          this.drawOrchidHead(ctx, time, open, rot);
        } else {
          this.drawSunflowerHead(ctx, time, open, rot);
        }
      }

      ctx.restore();
    }

    // CABEZA BOTÁNICA 1: GIRASOL REALISTA (Domo de Fermat y 3 capas de pétalos)
    drawSunflowerHead(ctx, time, open, rot) {
      // Halo de resplandor solar ambiental
      const glowGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, this.petalLength * 1.7 * open);
      glowGrad.addColorStop(0, 'rgba(255, 214, 102, 0.45)');
      glowGrad.addColorStop(0.5, 'rgba(255, 183, 3, 0.15)');
      glowGrad.addColorStop(1, 'rgba(255, 183, 3, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, this.petalLength * 1.7 * open, 0, Math.PI * 2);
      ctx.fill();

      // Sépalos del Cáliz
      ctx.save();
      ctx.rotate(rot);
      const sepalCount = 16;
      for (let s = 0; s < sepalCount; s++) {
        ctx.save();
        ctx.rotate((s / sepalCount) * Math.PI * 2);
        ctx.fillStyle = '#1c3820';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-8 * open, -this.centerRadius * 1.18 * open);
        ctx.lineTo(0, -this.centerRadius * 1.45 * open);
        ctx.lineTo(8 * open, -this.centerRadius * 1.18 * open);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();

      // CAPA 1: Pétalos exteriores
      ctx.save();
      ctx.rotate(rot);
      const outerPetals = 20;
      for (let i = 0; i < outerPetals; i++) {
        const angle = (i / outerPetals) * Math.PI * 2;
        const varSeed = this.organicSeed + i * 17;
        const lenMod = 0.96 + Math.sin(varSeed) * 0.07;
        const tilt = Math.cos(varSeed * 2) * 0.03;

        ctx.save();
        ctx.rotate(angle + tilt);
        this.drawRealisticPetal(
          ctx,
          this.petalLength * 1.02 * lenMod * open,
          this.petalWidth * 1.08 * open,
          '#8f3a00',
          '#d97706',
          '#f59e0b',
          '#ffd166'
        );
        ctx.restore();
      }
      ctx.restore();

      // CAPA 2: Pétalos intermedios
      ctx.save();
      ctx.rotate(rot + Math.PI / 20);
      for (let i = 0; i < outerPetals; i++) {
        const angle = (i / outerPetals) * Math.PI * 2;
        const varSeed = this.organicSeed + i * 31 + 50;
        const lenMod = 0.95 + Math.sin(varSeed) * 0.06;
        const tilt = Math.sin(varSeed * 1.5) * 0.025;

        ctx.save();
        ctx.rotate(angle + tilt);
        this.drawRealisticPetal(
          ctx,
          this.petalLength * 0.98 * lenMod * open,
          this.petalWidth * 0.98 * open,
          '#b45309',
          '#f59e0b',
          '#fbbf24',
          '#fef08a'
        );
        ctx.restore();
      }
      ctx.restore();

      // CAPA 3: Pétalos interiores
      ctx.save();
      ctx.rotate(rot + 0.1);
      const innerPetals = 16;
      for (let i = 0; i < innerPetals; i++) {
        const angle = (i / innerPetals) * Math.PI * 2;
        ctx.save();
        ctx.rotate(angle);
        this.drawRealisticPetal(
          ctx,
          this.petalLength * 0.62 * open,
          this.petalWidth * 0.72 * open,
          '#92400e',
          '#f59e0b',
          '#fcd34d',
          '#fffbeb'
        );
        ctx.restore();
      }
      ctx.restore();

      // SOMBRA 3D DEL DISCO
      const curR = this.centerRadius * open;
      const shadowGrad = ctx.createRadialGradient(0, 0, curR * 0.75, 0, 0, curR * 1.28);
      shadowGrad.addColorStop(0, 'rgba(25, 10, 4, 0.65)');
      shadowGrad.addColorStop(1, 'rgba(25, 10, 4, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, curR * 1.28, 0, Math.PI * 2);
      ctx.fill();

      // GRAN DISCO CENTRAL DE SEMILLAS
      const discGrad = ctx.createRadialGradient(0, -curR * 0.15, curR * 0.15, 0, 0, curR);
      discGrad.addColorStop(0, '#1c0c05');
      discGrad.addColorStop(0.55, '#2e1408');
      discGrad.addColorStop(0.82, '#58280d');
      discGrad.addColorStop(0.95, '#8c4415');
      discGrad.addColorStop(1, '#b0591b');
      ctx.fillStyle = discGrad;
      ctx.beginPath();
      ctx.arc(0, 0, curR, 0, Math.PI * 2);
      ctx.fill();

      // PATRÓN FIBONACCI DE FERMAT
      if (open > 0.4) {
        const goldenAngle = 2.399963;
        const totalSeeds = Math.floor(75 * this.scale);

        for (let n = 1; n <= totalSeeds; n++) {
          const rNorm = Math.sqrt(n / totalSeeds);
          const r = rNorm * (curR * 0.90);
          const theta = n * goldenAngle;
          const sx = Math.cos(theta) * r;
          const sy = Math.sin(theta) * r;

          if (rNorm > 0.72) {
            ctx.fillStyle = '#ffbe0b';
            ctx.beginPath();
            ctx.arc(sx, sy, 1.6 * this.scale, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#fff3b0';
            ctx.beginPath();
            ctx.arc(sx, sy, 0.8 * this.scale, 0, Math.PI * 2);
            ctx.fill();
          } else if (rNorm > 0.38) {
            ctx.fillStyle = '#c06b18';
            ctx.beginPath();
            ctx.arc(sx, sy, 1.4 * this.scale, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = '#6b3711';
            ctx.beginPath();
            ctx.arc(sx, sy, 1.2 * this.scale, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.strokeStyle = '#ffd166';
        ctx.lineWidth = 1.8 * this.scale;
        ctx.setLineDash([2.5 * this.scale, 3 * this.scale]);
        ctx.beginPath();
        ctx.arc(0, 0, curR * 0.96, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1.4 * this.scale;
        ctx.setLineDash([3 * this.scale, 4 * this.scale]);
        ctx.beginPath();
        ctx.arc(0, 0, curR * 0.88, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // CABEZA BOTÁNICA 2: CLAVEL (Capas densas de pétalos crespos/rizados)
    drawCarnationHead(ctx, time, open, rot) {
      // Halo cálido rosado-dorado
      const glowGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, 65 * this.scale * open);
      glowGrad.addColorStop(0, 'rgba(255, 235, 200, 0.45)');
      glowGrad.addColorStop(0.6, 'rgba(255, 182, 193, 0.18)');
      glowGrad.addColorStop(1, 'rgba(255, 182, 193, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 65 * this.scale * open, 0, Math.PI * 2);
      ctx.fill();

      // Cáliz tubular verde protector de clavel
      ctx.save();
      ctx.fillStyle = '#2c5332';
      ctx.beginPath();
      ctx.moveTo(-10 * this.scale * open, 0);
      ctx.lineTo(-7 * this.scale * open, 22 * this.scale * open);
      ctx.lineTo(7 * this.scale * open, 22 * this.scale * open);
      ctx.lineTo(10 * this.scale * open, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 4 capas concéntricas de pétalos con borde festoneado/rizado
      const layers = [
        { count: 18, radius: 52 * this.scale * open, width: 22 * this.scale * open, c0: '#d97706', c1: '#ffd166', c2: '#ffcad4', c3: '#ffffff', rotOffset: 0 },
        { count: 16, radius: 42 * this.scale * open, width: 19 * this.scale * open, c0: '#f59e0b', c1: '#ffbe0b', c2: '#ffe6a7', c3: '#fffbeb', rotOffset: 0.2 },
        { count: 14, radius: 32 * this.scale * open, width: 16 * this.scale * open, c0: '#b45309', c1: '#f59e0b', c2: '#fef08a', c3: '#ffffff', rotOffset: 0.4 },
        { count: 10, radius: 20 * this.scale * open, width: 13 * this.scale * open, c0: '#d97706', c1: '#ffd60a', c2: '#fff3b0', c3: '#ffffff', rotOffset: 0.1 }
      ];

      layers.forEach(layer => {
        ctx.save();
        ctx.rotate(rot + layer.rotOffset);
        for (let i = 0; i < layer.count; i++) {
          const angle = (i / layer.count) * Math.PI * 2;
          const varSeed = this.organicSeed + i * 19;
          const lenMod = 0.94 + Math.sin(varSeed) * 0.08;

          ctx.save();
          ctx.rotate(angle);

          const pLen = layer.radius * lenMod;
          const pWid = layer.width;

          // Gradiente del clavel
          const pGrad = ctx.createLinearGradient(0, 0, 0, -pLen);
          pGrad.addColorStop(0, layer.c0);
          pGrad.addColorStop(0.3, layer.c1);
          pGrad.addColorStop(0.75, layer.c2);
          pGrad.addColorStop(1, layer.c3);
          ctx.fillStyle = pGrad;

          // Borde dentado ondulado
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-pWid * 0.45, -pLen * 0.45);
          const steps = 7;
          for (let s = 0; s <= steps; s++) {
            const t = s / steps;
            const px = (-pWid * 0.55) + t * (pWid * 1.1);
            const py = -pLen - (s % 2 === 0 ? 3.5 * this.scale : -1.5 * this.scale);
            ctx.lineTo(px, py);
          }
          ctx.lineTo(pWid * 0.45, -pLen * 0.45);
          ctx.closePath();
          ctx.fill();

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
          ctx.lineWidth = 0.8;
          ctx.stroke();

          ctx.restore();
        }
        ctx.restore();
      });

      // Centro esponjoso de clavel
      ctx.fillStyle = '#ffbe0b';
      ctx.beginPath();
      ctx.arc(0, 0, 7 * this.scale * open, 0, Math.PI * 2);
      ctx.fill();
    }

    // CABEZA BOTÁNICA 3: ROSA DE ORO (Espiral aterciopelada en floración)
    drawRoseHead(ctx, time, open, rot) {
      // Halo áureo
      const glowGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, 68 * this.scale * open);
      glowGrad.addColorStop(0, 'rgba(255, 214, 102, 0.45)');
      glowGrad.addColorStop(0.55, 'rgba(251, 133, 0, 0.18)');
      glowGrad.addColorStop(1, 'rgba(251, 133, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 68 * this.scale * open, 0, Math.PI * 2);
      ctx.fill();

      // Sépalos finos de rosa
      ctx.save();
      ctx.rotate(rot);
      const sepalCount = 5;
      for (let s = 0; s < sepalCount; s++) {
        ctx.save();
        ctx.rotate((s / sepalCount) * Math.PI * 2);
        ctx.fillStyle = '#234428';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-6 * this.scale * open, -28 * this.scale * open, -14 * this.scale * open, -45 * this.scale * open);
        ctx.quadraticCurveTo(0, -32 * this.scale * open, 6 * this.scale * open, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();

      // Capa 1: Pétalos exteriores amplios acorazonados (5 pétalos)
      ctx.save();
      ctx.rotate(rot);
      const outerCount = 5;
      for (let i = 0; i < outerCount; i++) {
        const angle = (i / outerCount) * Math.PI * 2;
        ctx.save();
        ctx.rotate(angle);

        const pLen = 54 * this.scale * open;
        const pWid = 40 * this.scale * open;

        const rGrad = ctx.createRadialGradient(0, -pLen * 0.5, 4, 0, -pLen * 0.5, pLen * 0.7);
        rGrad.addColorStop(0, '#ffd166');
        rGrad.addColorStop(0.65, '#f59e0b');
        rGrad.addColorStop(1, '#b45309');
        ctx.fillStyle = rGrad;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-pWid * 0.6, -pLen * 0.35, -pWid * 0.55, -pLen * 0.88, -pWid * 0.15, -pLen);
        ctx.quadraticCurveTo(0, -pLen * 0.92, pWid * 0.15, -pLen);
        ctx.bezierCurveTo(pWid * 0.55, -pLen * 0.88, pWid * 0.6, -pLen * 0.35, 0, 0);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 253, 235, 0.45)';
        ctx.lineWidth = 1.4;
        ctx.stroke();

        ctx.restore();
      }
      ctx.restore();

      // Capa 2: Pétalos intermedios envolventes (6 pétalos)
      ctx.save();
      ctx.rotate(rot + 0.35);
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        ctx.save();
        ctx.rotate(angle);

        const pLen = 42 * this.scale * open;
        const pWid = 32 * this.scale * open;

        const mGrad = ctx.createLinearGradient(0, 0, 0, -pLen);
        mGrad.addColorStop(0, '#92400e');
        mGrad.addColorStop(0.3, '#d97706');
        mGrad.addColorStop(0.8, '#fbbf24');
        mGrad.addColorStop(1, '#fffbeb');
        ctx.fillStyle = mGrad;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-pWid * 0.55, -pLen * 0.35, -pWid * 0.45, -pLen * 0.95, 0, -pLen);
        ctx.bezierCurveTo(pWid * 0.45, -pLen * 0.95, pWid * 0.55, -pLen * 0.35, 0, 0);
        ctx.fill();

        ctx.restore();
      }
      ctx.restore();

      // Capa 3: Pétalos interiores en copa (6 pétalos)
      ctx.save();
      ctx.rotate(rot + 0.7);
      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((i / 6) * Math.PI * 2);
        const pLen = 28 * this.scale * open;
        const pWid = 22 * this.scale * open;

        const iGrad = ctx.createLinearGradient(0, 0, 0, -pLen);
        iGrad.addColorStop(0, '#78350f');
        iGrad.addColorStop(0.5, '#f59e0b');
        iGrad.addColorStop(1, '#fef08a');
        ctx.fillStyle = iGrad;

        ctx.beginPath();
        ctx.ellipse(0, -pLen * 0.48, pWid * 0.5, pLen * 0.52, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();

      // Centro: Espiral icónica de capullo de rosa
      ctx.save();
      ctx.rotate(rot + 1.2);
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.arc(0, 0, 12 * this.scale * open, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#fffbeb';
      ctx.lineWidth = 1.8 * this.scale;
      ctx.beginPath();
      for (let a = 0; a < Math.PI * 3.5; a += 0.2) {
        const sr = (a / (Math.PI * 3.5)) * (10 * this.scale * open);
        const sx = Math.cos(a) * sr;
        const sy = Math.sin(a) * sr;
        if (a === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
      ctx.restore();
    }

    // CABEZA BOTÁNICA 4: ORQUÍDEA AZUL MÍSTICA (Phalaenopsis bioluminiscente zafiro y cian)
    drawOrchidHead(ctx, time, open, rot) {
      // 1. Halo celestial bioluminiscente
      const glowGrad = ctx.createRadialGradient(0, 0, 6, 0, 0, 78 * this.scale * open);
      glowGrad.addColorStop(0, 'rgba(0, 245, 212, 0.5)');
      glowGrad.addColorStop(0.45, 'rgba(0, 119, 182, 0.28)');
      glowGrad.addColorStop(1, 'rgba(2, 62, 138, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 78 * this.scale * open, 0, Math.PI * 2);
      ctx.fill();

      // Partículas de polvo de estrellas celestiales
      for (let p = 0; p < 4; p++) {
        const pAngle = time * 0.0015 + (p / 4) * Math.PI * 2 + this.swayOffset;
        const pDist = (44 + Math.sin(time * 0.003 + p) * 12) * this.scale * open;
        ctx.fillStyle = p % 2 === 0 ? '#caf0f8' : '#00f5d4';
        ctx.shadowColor = '#00f5d4';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(Math.cos(pAngle) * pDist, Math.sin(pAngle) * pDist, 1.4 * this.scale, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      ctx.save();
      ctx.rotate(rot);

      // 2. TRES SÉPALOS EXTERNOS (Dorsal hacia arriba, 2 laterales)
      const sepalAngles = [-Math.PI / 2, Math.PI * 0.28, Math.PI * 0.72];
      sepalAngles.forEach(ang => {
        ctx.save();
        ctx.rotate(ang);

        const sLen = 52 * this.scale * open;
        const sWid = 20 * this.scale * open;

        const sGrad = ctx.createLinearGradient(0, 0, 0, -sLen);
        sGrad.addColorStop(0, '#03045e');
        sGrad.addColorStop(0.4, '#0077b6');
        sGrad.addColorStop(0.82, '#48cae4');
        sGrad.addColorStop(1, '#caf0f8');
        ctx.fillStyle = sGrad;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-sWid * 0.5, -sLen * 0.35, -sWid * 0.45, -sLen * 0.85, 0, -sLen);
        ctx.bezierCurveTo(sWid * 0.45, -sLen * 0.85, sWid * 0.5, -sLen * 0.35, 0, 0);
        ctx.fill();

        ctx.strokeStyle = 'rgba(202, 240, 248, 0.45)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -sLen * 0.88);
        ctx.stroke();

        ctx.restore();
      });

      // 3. DOS PÉTALOS LATERALES GRANDES (Alas anchas de Phalaenopsis)
      const petalAngles = [-0.15, Math.PI + 0.15];
      petalAngles.forEach(ang => {
        ctx.save();
        ctx.rotate(ang);

        const pLen = 48 * this.scale * open;
        const pWid = 38 * this.scale * open;

        const pGrad = ctx.createRadialGradient(0, -pLen * 0.45, 4, 0, -pLen * 0.45, pLen * 0.85);
        pGrad.addColorStop(0, '#001845');
        pGrad.addColorStop(0.35, '#0077b6');
        pGrad.addColorStop(0.75, '#0096c7');
        pGrad.addColorStop(0.92, '#48cae4');
        pGrad.addColorStop(1, '#00f5d4');
        ctx.fillStyle = pGrad;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-pWid * 0.65, -pLen * 0.25, -pWid * 0.65, -pLen * 0.82, 0, -pLen);
        ctx.bezierCurveTo(pWid * 0.65, -pLen * 0.82, pWid * 0.65, -pLen * 0.25, 0, 0);
        ctx.fill();

        ctx.strokeStyle = 'rgba(144, 224, 239, 0.35)';
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -pLen * 0.85);
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-pWid * 0.25, -pLen * 0.45, -pWid * 0.32, -pLen * 0.7);
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(pWid * 0.25, -pLen * 0.45, pWid * 0.32, -pLen * 0.7);
        ctx.stroke();

        ctx.restore();
      });

      // 4. LABELO CENTRAL / LABIO DE LA ORQUÍDEA
      ctx.save();
      ctx.translate(0, 6 * this.scale * open);

      const lipGrad = ctx.createLinearGradient(0, 0, 0, 26 * this.scale * open);
      lipGrad.addColorStop(0, '#7209b7');
      lipGrad.addColorStop(0.5, '#0077b6');
      lipGrad.addColorStop(1, '#00f5d4');
      ctx.fillStyle = lipGrad;

      ctx.beginPath();
      ctx.moveTo(-14 * this.scale * open, 0);
      ctx.bezierCurveTo(-18 * this.scale * open, 14 * this.scale * open, -4 * this.scale * open, 26 * this.scale * open, 0, 26 * this.scale * open);
      ctx.bezierCurveTo(4 * this.scale * open, 26 * this.scale * open, 18 * this.scale * open, 14 * this.scale * open, 14 * this.scale * open, 0);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#ffd166';
      ctx.shadowColor = '#ffd166';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(0, 2 * this.scale * open, 3.5 * this.scale * open, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#caf0f8';
      ctx.beginPath();
      ctx.arc(-4 * this.scale * open, 12 * this.scale * open, 1.2 * this.scale, 0, Math.PI * 2);
      ctx.arc(4 * this.scale * open, 12 * this.scale * open, 1.2 * this.scale, 0, Math.PI * 2);
      ctx.arc(0, 18 * this.scale * open, 1.4 * this.scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      ctx.restore();
    }

    // Hoja realista de girasol con nervaduras detalladas
    drawRealisticLeaf(ctx, x, y, angle, size) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      // Silueta acorazonada con borde botánico
      const leafGrad = ctx.createLinearGradient(0, 0, 60 * size, 0);
      leafGrad.addColorStop(0, '#2d5333');
      leafGrad.addColorStop(0.5, '#3a6b42');
      leafGrad.addColorStop(1, '#4f8a58');

      ctx.fillStyle = leafGrad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(22 * size, -24 * size, 54 * size, -18 * size, 70 * size, 0);
      ctx.bezierCurveTo(54 * size, 18 * size, 22 * size, 24 * size, 0, 0);
      ctx.fill();

      // Nervadura central prominente
      ctx.strokeStyle = '#68a773';
      ctx.lineWidth = Math.max(1.2, 1.8 * size);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(64 * size, 0);
      ctx.stroke();

      // 4 pares de nervaduras secundarias
      ctx.lineWidth = Math.max(0.8, 1.1 * size);
      ctx.strokeStyle = '#5a9665';
      for (let v = 1; v <= 4; v++) {
        const vx = v * 13 * size;
        ctx.beginPath();
        ctx.moveTo(vx, 0);
        ctx.lineTo(vx + 9 * size, -8 * size);
        ctx.moveTo(vx, 0);
        ctx.lineTo(vx + 9 * size, 8 * size);
        ctx.stroke();
      }

      ctx.restore();
    }

    // Pétalo de girasol realista: lanceolado con nervadura doble y degradado botánico
    drawRealisticPetal(ctx, length, width, colorBase, colorMid1, colorMid2, colorTip) {
      const grad = ctx.createLinearGradient(0, 0, 0, -length);
      grad.addColorStop(0, colorBase);       // Sombra base de anclaje
      grad.addColorStop(0.18, colorMid1);    // Ámbar
      grad.addColorStop(0.65, colorMid2);    // Amarillo girasol brillante
      grad.addColorStop(0.92, colorTip);     // Luz en la punta
      grad.addColorStop(1, '#ffffff');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      // Forma lanceolada con curva suave y punta afilada
      ctx.bezierCurveTo(-width * 0.62, -length * 0.32, -width * 0.48, -length * 0.84, 0, -length);
      ctx.bezierCurveTo(width * 0.48, -length * 0.84, width * 0.62, -length * 0.32, 0, 0);
      ctx.fill();

      // Pliegue central del pétalo (relieve 3D)
      ctx.strokeStyle = 'rgba(160, 75, 0, 0.24)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -length * 0.08);
      ctx.lineTo(0, -length * 0.82);
      ctx.stroke();

      // Nervadura lateral sutil
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(-width * 0.18, -length * 0.2);
      ctx.lineTo(-width * 0.15, -length * 0.65);
      ctx.stroke();
    }
  }

  // Clase para los pétalos que caen por el aire
  class Petal {
    constructor(isBurst = false, originX = null, originY = null) {
      this.reset(isBurst, originX, originY);
    }

    reset(isBurst = false, originX = null, originY = null) {
      if (isBurst) {
        this.x = originX !== null ? originX : width / 2;
        this.y = originY !== null ? originY : height / 2;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 2;
      } else {
        this.x = Math.random() * width;
        this.y = Math.random() * -height * 0.5;
        this.vx = Math.random() * 1.5 - 0.75;
        this.vy = Math.random() * 1.8 + 1.2;
      }

      this.size = Math.random() * 8 + 10;
      this.rotX = Math.random() * Math.PI * 2;
      this.rotY = Math.random() * Math.PI * 2;
      this.rotZ = Math.random() * Math.PI * 2;
      this.rotSpeedX = Math.random() * 0.04 + 0.01;
      this.rotSpeedZ = Math.random() * 0.03 + 0.01;
      this.oscillationSpeed = Math.random() * 0.03 + 0.01;
      this.oscillationAmp = Math.random() * 1.5 + 0.5;
      this.color = Math.random() > 0.4 ? '#ffd166' : '#ffbe0b';
      this.opacity = Math.random() * 0.3 + 0.7;
    }

    update() {
      this.x += this.vx + Math.sin(this.rotY) * this.oscillationAmp;
      this.y += this.vy;
      this.rotX += this.rotSpeedX;
      this.rotZ += this.rotSpeedZ;
      this.rotY += this.oscillationSpeed;

      if (this.y > height + 20) {
        this.reset(false);
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotZ);
      ctx.scale(Math.cos(this.rotX), 1); // Simular vuelta en 3D en el viento
      ctx.globalAlpha = this.opacity;

      if (currentFlowerTheme === 'orchid') {
        // Pétalo de Orquídea Azul: zafiro brillante con borde cian bioluminiscente
        const grad = ctx.createLinearGradient(0, -this.size, 0, this.size);
        grad.addColorStop(0, '#caf0f8');
        grad.addColorStop(0.3, '#48cae4');
        grad.addColorStop(0.7, '#0077b6');
        grad.addColorStop(1, '#023e8a');
        ctx.fillStyle = grad;
        ctx.shadowColor = '#00f5d4';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 0.65, this.size, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (currentFlowerTheme === 'rose') {
        // Pétalo de Rosa: suave, acorazonado, terciopelo ámbar y oro
        const grad = ctx.createLinearGradient(0, -this.size, 0, this.size);
        grad.addColorStop(0, '#fffbeb');
        grad.addColorStop(0.35, '#ffbe0b');
        grad.addColorStop(0.75, '#f59e0b');
        grad.addColorStop(1, '#b45309');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, this.size * 0.8);
        ctx.bezierCurveTo(-this.size * 0.8, 0, -this.size * 0.7, -this.size, 0, -this.size * 0.7);
        ctx.bezierCurveTo(this.size * 0.7, -this.size, this.size * 0.8, 0, 0, this.size * 0.8);
        ctx.fill();
      } else if (currentFlowerTheme === 'carnation') {
        // Pétalo de Clavel: festoneado en amarillo canario y durazno suave
        const grad = ctx.createLinearGradient(0, -this.size, 0, this.size);
        grad.addColorStop(0, '#fff3b0');
        grad.addColorStop(0.5, '#ffd166');
        grad.addColorStop(1, '#ffcad4');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 0.75, this.size * 0.85, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 182, 193, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
      } else {
        // Girasol: lanceolado dorado cálido
        const grad = ctx.createLinearGradient(0, -this.size, 0, this.size);
        grad.addColorStop(0, '#fff3b0');
        grad.addColorStop(0.7, this.color);
        grad.addColorStop(1, '#e07a10');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 0.6, this.size, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // Chispas de toque interactivo
  class SparkParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.5;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.size = Math.random() * 3 + 2;
      this.life = 1;
      this.decay = Math.random() * 0.03 + 0.02;
      // Colores adaptados al tema activo
      if (currentFlowerTheme === 'orchid') {
        this.color = Math.random() > 0.5 ? '#00f5d4' : '#90e0ef';
      } else if (currentFlowerTheme === 'carnation') {
        this.color = Math.random() > 0.5 ? '#ffcad4' : '#ffd166';
      } else {
        this.color = Math.random() > 0.5 ? '#ffd166' : '#8cb9bc';
      }
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.06; // Gravedad suave
      this.life -= this.decay;
    }

    draw(ctx) {
      if (this.life <= 0) return;
      ctx.save();
      ctx.globalAlpha = this.life;
      ctx.fillStyle = this.color;
      if (currentFlowerTheme === 'orchid') {
        ctx.shadowColor = '#00f5d4';
        ctx.shadowBlur = 6;
      }
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Clase para el cañón de flores disparadas hacia el cielo
  class SkyburstFlower {
    constructor(type = null) {
      this.x = width * (0.35 + Math.random() * 0.3);
      this.y = height * (0.75 + Math.random() * 0.15);
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.55;
      const speed = Math.random() * 16 + 12;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.gravity = 0.34;
      this.scale = Math.random() * 0.45 + 0.35;
      this.rot = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.2;
      this.alpha = 1;
      this.decay = Math.random() * 0.003 + 0.004;
      this.petalCount = 16;
      this.flowerType = type || currentFlowerTheme;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.vx *= 0.985;
      this.rot += this.rotSpeed;
      if (this.vy > 0) {
        this.alpha -= this.decay;
      }
    }

    draw(ctx) {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.globalAlpha = Math.max(0, this.alpha);

      const pLen = 25 * this.scale;
      const pWid = 8 * this.scale;
      const cRad = 10 * this.scale;

      if (this.flowerType === 'orchid') {
        // Mini Orquídea Azul en el cielo
        ctx.fillStyle = 'rgba(0, 245, 212, 0.45)';
        ctx.beginPath();
        ctx.arc(0, 0, pLen * 1.6, 0, Math.PI * 2);
        ctx.fill();

        // 3 sépalos
        [-Math.PI / 2, Math.PI * 0.28, Math.PI * 0.72].forEach(a => {
          ctx.save();
          ctx.rotate(a);
          ctx.fillStyle = '#48cae4';
          ctx.beginPath();
          ctx.ellipse(0, -pLen * 0.8, pWid * 0.6, pLen * 0.8, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // 2 alas laterales
        [-0.15, Math.PI + 0.15].forEach(a => {
          ctx.save();
          ctx.rotate(a);
          ctx.fillStyle = '#0077b6';
          ctx.beginPath();
          ctx.ellipse(0, -pLen * 0.85, pWid * 1.1, pLen * 0.85, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Centro brillante
        ctx.fillStyle = '#ffd166';
        ctx.beginPath();
        ctx.arc(0, 0, cRad * 0.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.flowerType === 'rose') {
        // Mini Rosa de Oro
        ctx.fillStyle = 'rgba(255, 190, 11, 0.45)';
        ctx.beginPath();
        ctx.arc(0, 0, pLen * 1.4, 0, Math.PI * 2);
        ctx.fill();

        for (let i = 0; i < 7; i++) {
          ctx.save();
          ctx.rotate((i / 7) * Math.PI * 2);
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.ellipse(0, -pLen * 0.7, pWid * 1.1, pLen * 0.7, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        ctx.fillStyle = '#ffd166';
        ctx.beginPath();
        ctx.arc(0, 0, cRad * 0.6, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.flowerType === 'carnation') {
        // Mini Clavel festoneado
        ctx.fillStyle = 'rgba(255, 182, 193, 0.45)';
        ctx.beginPath();
        ctx.arc(0, 0, pLen * 1.4, 0, Math.PI * 2);
        ctx.fill();

        for (let i = 0; i < 12; i++) {
          ctx.save();
          ctx.rotate((i / 12) * Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? '#ffd166' : '#ffcad4';
          ctx.beginPath();
          ctx.ellipse(0, -pLen * 0.75, pWid * 0.8, pLen * 0.75, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        ctx.fillStyle = '#ffbe0b';
        ctx.beginPath();
        ctx.arc(0, 0, cRad * 0.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Mini Girasol
        ctx.fillStyle = 'rgba(255, 214, 102, 0.45)';
        ctx.beginPath();
        ctx.arc(0, 0, pLen * 1.5, 0, Math.PI * 2);
        ctx.fill();

        for (let i = 0; i < this.petalCount; i++) {
          ctx.save();
          ctx.rotate((i / this.petalCount) * Math.PI * 2);
          const pGrad = ctx.createLinearGradient(0, 0, 0, -pLen);
          pGrad.addColorStop(0, '#d97706');
          pGrad.addColorStop(0.5, '#fbbf24');
          pGrad.addColorStop(1, '#fffbeb');
          ctx.fillStyle = pGrad;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-pWid * 0.5, -pLen * 0.5);
          ctx.lineTo(0, -pLen);
          ctx.lineTo(pWid * 0.5, -pLen * 0.5);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }

        const cGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, cRad);
        cGrad.addColorStop(0, '#1c0c05');
        cGrad.addColorStop(0.8, '#4a230d');
        cGrad.addColorStop(1, '#8c4415');
        ctx.fillStyle = cGrad;
        ctx.beginPath();
        ctx.arc(0, 0, cRad, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffbe0b';
        ctx.beginPath();
        ctx.arc(0, 0, cRad * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // Crear el campo floral adaptado según celular o escritorio
  function generateBouquet() {
    flowers.length = 0;
    const isMobile = DeviceDetector.isMobile;
    const flowerCount = isMobile ? (width < 380 ? 7 : 9) : (width > 1200 ? 16 : 13);

    const margin = width * (isMobile ? 0.04 : 0.06);
    const availableWidth = width - margin * 2;
    const step = availableWidth / (flowerCount - 1);

    for (let i = 0; i < flowerCount; i++) {
      const baseX = margin + i * step + (Math.random() * 20 - 10);
      // En celular, las flores enmarcan la base y los bordes con elegancia sin tapar la carta
      const wave = Math.sin((i / flowerCount) * Math.PI);
      const targetY = isMobile
        ? height * (0.42 + (1 - wave) * 0.22 + Math.random() * 0.08)
        : height * (0.34 + (1 - wave) * 0.26 + Math.random() * 0.08);

      const scale = isMobile
        ? (0.64 + Math.random() * 0.22)
        : (0.85 + Math.random() * 0.38);

      const delay = Math.floor(i * 7 + Math.random() * 12);

      const fl = new Flower(baseX, targetY, scale, delay);
      fl.flowerType = currentFlowerTheme;
      flowers.push(fl);
    }
  }

  // Iniciar lluvia de pétalos
  for (let p = 0; p < 35; p++) {
    petals.push(new Petal());
  }

  // --- 5. BUCLE PRINCIPAL DE ANIMACIÓN (60 FPS) ---
  let lastTime = 0;
  function animate(timestamp) {
    const time = timestamp * 0.001;

    // 1. Dibujar cielo y estrellas
    drawSky(time);

    // 2. Limpiar canvas de flores
    flowerCtx.clearRect(0, 0, width, height);

    // 3. Dibujar y actualizar flores
    if (isExperienceActive) {
      for (let i = 0; i < flowers.length; i++) {
        flowers[i].update();
        flowers[i].draw(flowerCtx, time);
      }
    }

    // 4. Dibujar pétalos flotantes
    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw(flowerCtx);
    }

    // 5. Dibujar chispas de toques interactivos
    for (let i = sparkParticles.length - 1; i >= 0; i--) {
      const spark = sparkParticles[i];
      spark.update();
      spark.draw(flowerCtx);
      if (spark.life <= 0) {
        sparkParticles.splice(i, 1);
      }
    }

    // 6. Dibujar flores amarillas disparadas hacia el cielo (gran destello)
    for (let i = skyburstFlowers.length - 1; i >= 0; i--) {
      const sf = skyburstFlowers[i];
      sf.update();
      sf.draw(flowerCtx);
      if (sf.alpha <= 0 || sf.y > height + 60) {
        skyburstFlowers.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  // --- 6. EVENTOS E INTERACTIVIDAD ---

  // Al hacer clic en abrir el regalo
  openButton.addEventListener('click', () => {
    isExperienceActive = true;

    // Destello de luz dorada inicial
    if (bloomFlash) {
      bloomFlash.classList.add('active');
      setTimeout(() => {
        bloomFlash.classList.remove('active');
      }, 180);
    }

    // Mostrar el reproductor de música flotante en la esquina superior
    if (floatingMusicPlayer) {
      floatingMusicPlayer.classList.remove('hidden-player');
    }

    // ¡Gran explosión de flores amarillas disparadas al cielo!
    for (let i = 0; i < 65; i++) {
      skyburstFlowers.push(new SkyburstFlower());
    }

    // Cascada de chispas de luz
    for (let s = 0; s < 80; s++) {
      sparkParticles.push(new SparkParticle(width * 0.5, height * 0.75));
    }

    // Iniciar música de fondo (MP3 o arpegios celestiales si el MP3 aún no está puesto)
    playBackgroundMusic();

    // Transición de salida de la pantalla de bienvenida
    introScreen.classList.add('fade-out');

    // Desplegar flores
    generateBouquet();

    // Mostrar contenedor principal
    mainExperience.classList.remove('hidden');

    // Mostrar carta de dedicatoria después de que broten las flores
    setTimeout(() => {
      letterCard.classList.remove('hidden-letter');
    }, 1800);

    // Toast confirmando el formato detectado automáticamente
    setTimeout(() => {
      if (DeviceDetector.isMobile) {
        showGameToast('📱', 'Modo Celular Activado', 'Formato adaptado para pantalla vertical y controles táctiles ✨');
      } else {
        showGameToast('💻', 'Modo Web Activado', 'Vista panorámica de alta definición para tu pantalla ✨');
      }
    }, 2200);

    // Pequeña lluvia festiva inicial de pétalos
    triggerPetalShower(25);
  });

  // Tocar o hacer clic en la pantalla para hacer brotar flores y chispas (SIN SONIDO)
  flowerCanvas.addEventListener('pointerdown', (e) => {
    const rect = flowerCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Añadir chispas luminosas visuales
    for (let i = 0; i < 14; i++) {
      sparkParticles.push(new SparkParticle(x, y));
    }

    // Si la experiencia ya está activa, brotar una nueva flor interactiva de la especie actual
    if (isExperienceActive) {
      const scale = DeviceDetector.isMobile ? (0.54 + Math.random() * 0.22) : (0.7 + Math.random() * 0.32);
      const newFlower = new Flower(x, y, scale, 0);
      newFlower.flowerType = currentFlowerTheme;
      newFlower.stemProgress = 0.4; // Comienza a crecer desde el punto tocado
      flowers.push(newFlower);
    }
  });

  // Función para lluvia intensa de flores y pétalos
  function triggerPetalShower(count = 35) {
    for (let i = 0; i < count; i++) {
      petals.push(new Petal(true, width * (0.2 + Math.random() * 0.6), height * 0.2));
    }
    setTimeout(() => {
      if (petals.length > 40) {
        petals.splice(35);
      }
    }, 8000);
  }

  // Controles del Dock
  if (showerBtn) {
    showerBtn.addEventListener('click', () => {
      triggerPetalShower(40);
    });
  }

  if (bloomMoreBtn) {
    bloomMoreBtn.addEventListener('click', () => {
      generateBouquet();
    });
  }

  if (showLetterBtn) {
    showLetterBtn.addEventListener('click', () => {
      letterCard.classList.toggle('hidden-letter');
    });
  }

  if (closeLetterBtn) {
    closeLetterBtn.addEventListener('click', () => {
      letterCard.classList.add('hidden-letter');
    });
  }

  // Controles del Reproductor de Música (Dock y Reproductor Flotante Superior)
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      toggleBackgroundMusic();
    });
  }

  if (topPlayerPlayBtn) {
    topPlayerPlayBtn.addEventListener('click', () => {
      toggleBackgroundMusic();
    });
  }

  if (topPlayerMuteBtn) {
    topPlayerMuteBtn.addEventListener('click', () => {
      toggleMute();
    });
  }

  // --- 7. MINIJUEGO EVOLUTIVO Y TRANSFORMACIÓN INTEGRAL DE TODA LA WEB ---
  // Hitos de puntuación:
  // 0 - 499 pts: Girasoles 🌻
  // 500 pts: ¡Toda la web se transforma en Claveles 🌸!
  // 1500 pts: ¡Toda la web se transforma en Rosas 🌹!
  // 2000 pts: ¡Toda la web se transforma en Orquídeas Azules 💙✨!

  let gameActive = false;
  let gameScore = 0;
  let plumScore = 0;
  let gameLevel = 1;
  let comboStreak = 0;
  let comboMultiplier = 1.0;
  let poohX = 170;
  let poohTargetX = 170;
  let gameItems = [];
  let gamePopups = [];
  let gameSparks = [];
  let gameLoopId = null;
  let spawnCounter = 0;
  let toastTimeout = null;

  const gameCtx = gameCanvas ? gameCanvas.getContext('2d') : null;

  // Notificación dinámica flotante en el juego / web
  function showGameToast(icon, title, desc) {
    if (!gameToast) return;
    if (toastTimeout) clearTimeout(toastTimeout);
    if (toastIcon) toastIcon.textContent = icon;
    if (toastTitle) toastTitle.textContent = title;
    if (toastDesc) toastDesc.textContent = desc;

    gameToast.classList.remove('hidden');
    gameToast.style.animation = 'none';
    void gameToast.offsetWidth;
    gameToast.style.animation = 'toastSlide 3s ease forwards';

    toastTimeout = setTimeout(() => {
      gameToast.classList.add('hidden');
    }, 3000);
  }

  // Melodía celebratoria al transformar la página completa
  function playCelebrationArpeggio(theme) {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!synthAudioCtx) synthAudioCtx = new AudioCtx();
      if (synthAudioCtx.state === 'suspended') synthAudioCtx.resume();

      const chords = {
        sunflower: [523.25, 659.25, 783.99, 1046.50],           // Do Mayor brillante
        carnation: [587.33, 739.99, 880.00, 1174.66],           // Re Mayor dulce
        rose: [659.25, 830.61, 987.77, 1318.51],                // Mi Mayor majestuoso
        orchid: [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98] // Acorde celestial
      };

      const notes = chords[theme] || chords.sunflower;
      notes.forEach((freq, idx) => {
        const osc = synthAudioCtx.createOscillator();
        const gain = synthAudioCtx.createGain();
        osc.type = theme === 'orchid' ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, synthAudioCtx.currentTime + idx * 0.09);
        gain.gain.setValueAtTime(0.001, synthAudioCtx.currentTime + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.09, synthAudioCtx.currentTime + idx * 0.09 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, synthAudioCtx.currentTime + idx * 0.09 + 0.46);

        osc.connect(gain);
        gain.connect(synthAudioCtx.destination);
        osc.start(synthAudioCtx.currentTime + idx * 0.09);
        osc.stop(synthAudioCtx.currentTime + idx * 0.09 + 0.5);
      });
    } catch (e) {}
  }

  // Sonido musical suave al atrapar elementos en el minijuego
  function playCatchChime(multiplier = 1, isSpecial = false) {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!synthAudioCtx) synthAudioCtx = new AudioCtx();
      if (synthAudioCtx.state === 'suspended') synthAudioCtx.resume();

      const osc = synthAudioCtx.createOscillator();
      const gain = synthAudioCtx.createGain();

      let baseFreq = 523.25; // C5
      if (isSpecial) baseFreq = 783.99; // G5
      else if (multiplier >= 3) baseFreq = 880.00; // A5
      else if (multiplier >= 2) baseFreq = 659.25; // E5
      else if (multiplier >= 1.5) baseFreq = 587.33; // D5

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, synthAudioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.32, synthAudioCtx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.07, synthAudioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, synthAudioCtx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(synthAudioCtx.destination);
      osc.start();
      osc.stop(synthAudioCtx.currentTime + 0.23);
    } catch (e) {}
  }

  // =========================================================================
  // 🌟 FUNCIÓN MAESTRA: TRANSFORMAR TODA LA PÁGINA A LA NUEVA ESPECIE FLORAL
  // =========================================================================
  function transformEntirePage(newTheme, title, desc) {
    if (!newTheme) return;
    currentFlowerTheme = newTheme;
    unlockedGardenThemes[newTheme] = true;

    // 1. Clases CSS globales en body para ambientación completa
    document.body.classList.remove('theme-sunflower', 'theme-carnation', 'theme-rose', 'theme-orchid');
    document.body.classList.add(`theme-${newTheme}`);

    // 2. Actualizar Píldora del Jardín Activo
    if (activeThemeName) {
      if (newTheme === 'orchid') activeThemeName.textContent = 'Jardín: Orquídeas Azules 💙✨';
      else if (newTheme === 'rose') activeThemeName.textContent = 'Jardín: Rosas 🌹';
      else if (newTheme === 'carnation') activeThemeName.textContent = 'Jardín: Claveles 🌸';
      else activeThemeName.textContent = 'Jardín: Girasoles 🌻';
    }

    // 2.1 Actualizar Botón del Dock Inferior (Icono y Texto dinámico)
    const bloomBtnIcon = document.getElementById('bloomBtnIcon');
    const bloomBtnLabel = document.getElementById('bloomBtnLabel');
    if (bloomBtnIcon && bloomBtnLabel) {
      if (newTheme === 'orchid') {
        bloomBtnIcon.textContent = '💙';
        bloomBtnLabel.textContent = 'Orquídeas';
      } else if (newTheme === 'rose') {
        bloomBtnIcon.textContent = '🌹';
        bloomBtnLabel.textContent = 'Rosas';
      } else if (newTheme === 'carnation') {
        bloomBtnIcon.textContent = '🌸';
        bloomBtnLabel.textContent = 'Claveles';
      } else {
        bloomBtnIcon.textContent = '🌻';
        bloomBtnLabel.textContent = 'Girasoles';
      }
    }
    if (bloomMoreBtn) {
      const flowerName = newTheme === 'orchid' ? 'orquídeas' : (newTheme === 'rose' ? 'rosas' : (newTheme === 'carnation' ? 'claveles' : 'girasoles'));
      bloomMoreBtn.title = `Brotar más ${flowerName}`;
    }

    // 3. Actualizar centro del vinilo flotante de música
    if (playerVinyl) {
      const center = playerVinyl.querySelector('.vinyl-center');
      if (center) {
        if (newTheme === 'orchid') center.textContent = '💙';
        else if (newTheme === 'rose') center.textContent = '🌹';
        else if (newTheme === 'carnation') center.textContent = '🌸';
        else center.textContent = '🌻';
      }
    }

    // 4. Actualizar repisa de insignias en el modal
    const badgeMap = {
      sunflower: 'badgeSunflower',
      carnation: 'badgeCarnation',
      rose: 'badgeRose',
      orchid: 'badgeOrchid'
    };

    Object.keys(unlockedGardenThemes).forEach(k => {
      const b = document.getElementById(badgeMap[k]);
      if (b) {
        if (unlockedGardenThemes[k]) {
          b.classList.remove('locked');
          b.classList.add('unlocked');
        } else {
          b.classList.add('locked');
          b.classList.remove('unlocked');
        }
      }
    });

    // 5. 🌸 ¡TRANSFORMAR TODAS LAS FLORES DEL JARDÍN! 🌸
    // Se adaptan dinámicamente y vuelven a brotar hacia la nueva especie botánica
    flowers.forEach(f => {
      f.flowerType = newTheme;
      f.bloomProgress = 0.12; // Re-florecen con gracia en pantalla
      f.growth = Math.max(0.78, f.growth);
    });

    // 6. Destello de transición en pantalla (Bloom Flash)
    if (bloomFlash) {
      bloomFlash.classList.remove('flash-animate');
      void bloomFlash.offsetWidth;
      if (newTheme === 'orchid') {
        bloomFlash.style.background = 'radial-gradient(circle, rgba(0, 212, 255, 0.75) 0%, rgba(7, 24, 46, 0.95) 75%)';
      } else if (newTheme === 'rose') {
        bloomFlash.style.background = 'radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, rgba(251, 133, 0, 0.6) 75%)';
      } else if (newTheme === 'carnation') {
        bloomFlash.style.background = 'radial-gradient(circle, rgba(255, 182, 193, 0.8) 0%, rgba(255, 105, 180, 0.5) 75%)';
      } else {
        bloomFlash.style.background = 'radial-gradient(circle, rgba(255, 214, 10, 0.85) 0%, rgba(247, 127, 0, 0.65) 70%)';
      }
      bloomFlash.classList.add('flash-animate');
    }

    // 7. Lluvia de pétalos de la nueva especie y disparo celestial de flores
    triggerPetalShower(36);
    const burstCount = 40;
    for (let i = 0; i < burstCount; i++) {
      skyburstFlowers.push(new SkyburstFlower(
        Math.random() * width,
        height + Math.random() * 50,
        (Math.random() - 0.5) * 8.5,
        -(Math.random() * 11 + 13),
        Math.random() * 0.45 + 0.45,
        newTheme
      ));
    }

    // 8. Melodía musical mágica
    playCelebrationArpeggio(newTheme);

    // 9. Toast anunciando la transformación
    const icons = {
      sunflower: '🌻',
      carnation: '🌸',
      rose: '🌹',
      orchid: '💙'
    };
    if (title && desc) {
      showGameToast(icons[newTheme] || '✨', title, desc);
    }
  }

  // Actualizar indicadores visuales de nivel y progreso en el minijuego
  function updateGameStatsUI() {
    if (gameScoreEl) gameScoreEl.textContent = gameScore;
    if (plumScoreEl) plumScoreEl.textContent = plumScore;
    if (gameLevelEl) gameLevelEl.textContent = gameLevel;
    if (gameComboEl) gameComboEl.textContent = `x${comboMultiplier.toFixed(1)}`;

    if (gameScore >= 2000) {
      if (levelProgressBar) levelProgressBar.style.width = '100%';
      if (levelProgressText) {
        levelProgressText.textContent = '💙 ¡2000+ pts! Orquídeas Azules y Corona Celestial logradas ✨';
      }
    } else if (gameScore >= 1500) {
      // 1500 a 2000: meta Orquídeas Azules
      const pct = Math.min(100, Math.max(0, ((gameScore - 1500) / 500) * 100));
      if (levelProgressBar) levelProgressBar.style.width = `${pct}%`;
      const ptsRemaining = 2000 - gameScore;
      if (levelProgressText) {
        levelProgressText.textContent = `Faltan ${ptsRemaining} pts para transformar la web a Orquídeas Azules (2000 pts) 💙`;
      }
    } else if (gameScore >= 500) {
      // 500 a 1500: meta Rosas
      const pct = Math.min(100, Math.max(0, ((gameScore - 500) / 1000) * 100));
      if (levelProgressBar) levelProgressBar.style.width = `${pct}%`;
      const ptsRemaining = 1500 - gameScore;
      if (levelProgressText) {
        levelProgressText.textContent = `Faltan ${ptsRemaining} pts para transformar la web a Rosas (1500 pts) 🌹`;
      }
    } else {
      // 0 a 500: meta Claveles
      const pct = Math.min(100, Math.max(0, (gameScore / 500) * 100));
      if (levelProgressBar) levelProgressBar.style.width = `${pct}%`;
      const ptsRemaining = 500 - gameScore;
      if (levelProgressText) {
        levelProgressText.textContent = `Faltan ${ptsRemaining} pts para transformar la web a Claveles (500 pts) 🌸`;
      }
    }
  }

  // Verificación y ejecución de transformaciones al alcanzar los hitos pedidos:
  // 500 pts -> Claveles 🌸
  // 1500 pts -> Rosas 🌹
  // 2000 pts -> Orquídeas Azules 💙✨
  function checkUnlocks() {
    // Hito 1: 500 Puntos -> Toda la web cambia a Claveles
    if (gameScore >= 500 && !unlockedGardenThemes.carnation) {
      gameLevel = 2;
      transformEntirePage(
        'carnation',
        '¡500 Puntos! Toda la web florece en Claveles 🌸',
        'El jardín completo se ha transformado en delicados claveles para Jhen'
      );
    }

    // Hito 2: 1500 Puntos -> Toda la web cambia a Rosas
    if (gameScore >= 1500 && !unlockedGardenThemes.rose) {
      gameLevel = 3;
      transformEntirePage(
        'rose',
        '¡1500 Puntos! Toda la web florece en Rosas 🌹',
        'El jardín completo se ha transformado en majestuosas rosas doradas'
      );
    }

    // Hito 3: 2000 Puntos -> Toda la web cambia a Orquídeas Azules
    if (gameScore >= 2000 && !unlockedGardenThemes.orchid) {
      gameLevel = 4;
      transformEntirePage(
        'orchid',
        '¡2000 Puntos! Místicas Orquídeas Azules 💙✨',
        '¡Transformación suprema! Todo el firmamento brilla con orquídeas azules'
      );
      if (gameWinScreen && gameWinScreen.classList.contains('hidden')) {
        gameWinScreen.classList.remove('hidden');
      }
    }

    updateGameStatsUI();
  }

  function resetGame() {
    gameScore = 0;
    plumScore = 0;
    gameLevel = 1;
    comboStreak = 0;
    comboMultiplier = 1.0;
    gameItems = [];
    gamePopups = [];
    gameSparks = [];
    spawnCounter = 0;
    poohX = 170;
    poohTargetX = 170;

    // Resetear desbloqueos y volver al jardín inicial de Girasoles
    unlockedGardenThemes.carnation = false;
    unlockedGardenThemes.rose = false;
    unlockedGardenThemes.orchid = false;
    transformEntirePage('sunflower');

    const bC = document.getElementById('badgeCarnation');
    if (bC) { bC.classList.add('locked'); bC.classList.remove('unlocked'); }
    const bR = document.getElementById('badgeRose');
    if (bR) { bR.classList.add('locked'); bR.classList.remove('unlocked'); }
    const bO = document.getElementById('badgeOrchid');
    if (bO) { bO.classList.add('locked'); bO.classList.remove('unlocked'); }

    updateGameStatsUI();
    if (gameWinScreen) gameWinScreen.classList.add('hidden');
  }

  function startMinigame() {
    if (gameScore === 0) {
      resetGame();
    }
    gameActive = true;
    runGameLoop();
  }

  function stopMinigame() {
    gameActive = false;
    if (gameLoopId) {
      cancelAnimationFrame(gameLoopId);
      gameLoopId = null;
    }
  }

  function runGameLoop() {
    if (!gameActive || !gameCtx) return;

    // 1. Limpiar y dibujar fondo crepuscular del minijuego
    const gGrad = gameCtx.createLinearGradient(0, 0, 0, 370);
    if (currentFlowerTheme === 'orchid' || gameScore >= 2000) {
      gGrad.addColorStop(0, '#040816');
      gGrad.addColorStop(0.65, '#0b233a');
      gGrad.addColorStop(1, '#134760');
    } else if (currentFlowerTheme === 'rose' || gameScore >= 1500) {
      gGrad.addColorStop(0, '#100a18');
      gGrad.addColorStop(0.65, '#2b1a2e');
      gGrad.addColorStop(1, '#4a2638');
    } else if (currentFlowerTheme === 'carnation' || gameScore >= 500) {
      gGrad.addColorStop(0, '#0e1724');
      gGrad.addColorStop(0.65, '#1e3340');
      gGrad.addColorStop(1, '#3b454e');
    } else {
      gGrad.addColorStop(0, '#0c1824');
      gGrad.addColorStop(0.65, '#1e3845');
      gGrad.addColorStop(1, '#2f525b');
    }
    gameCtx.fillStyle = gGrad;
    gameCtx.fillRect(0, 0, 340, 370);

    // Suave césped en la base
    gameCtx.fillStyle = currentFlowerTheme === 'orchid' ? '#14383c' : (currentFlowerTheme === 'rose' ? '#383226' : '#2d5032');
    gameCtx.beginPath();
    gameCtx.ellipse(170, 370, 190, 42, 0, 0, Math.PI * 2);
    gameCtx.fill();

    // 2. Mover a Winnie the Pooh con inercia ultra-ágil y reactiva
    poohX += (poohTargetX - poohX) * 0.55;

    // 3. Generar nuevos elementos según la fase / puntuación (ritmo acelerado y dinámico)
    spawnCounter++;
    const spawnRate = gameScore >= 2000 ? 15 : (gameScore >= 1500 ? 18 : (gameScore >= 500 ? 22 : 25));

    if (spawnCounter % spawnRate === 0) {
      const rand = Math.random();
      let type = 'sunflower';
      let symbol = '🌻';
      let points = 15;
      let color = '#ffd166';

      if (gameScore < 500) {
        // Fase 1: Girasoles (0 a 499 pts) + introducción a claveles
        if (rand < 0.50) {
          type = 'sunflower'; symbol = '🌻'; points = 15; color = '#ffd166';
        } else if (rand < 0.75) {
          type = 'daisy'; symbol = '💛'; points = 20; color = '#ffbe0b';
        } else if (rand < 0.90) {
          type = 'honey'; symbol = '🍯'; points = 25; color = '#f77f00';
        } else {
          type = 'carnation'; symbol = '🌸'; points = 35; color = '#ffcad4';
        }
      } else if (gameScore < 1500) {
        // Fase 2: Claveles (500 a 1499 pts) + introducción a rosas
        if (rand < 0.40) {
          type = 'carnation'; symbol = '🌸'; points = 35; color = '#ffcad4';
        } else if (rand < 0.65) {
          type = 'carnation_peach'; symbol = '💮'; points = 45; color = '#ffb5a7';
        } else if (rand < 0.80) {
          type = 'honey'; symbol = '🍯'; points = 30; color = '#f77f00';
        } else if (rand < 0.92) {
          type = 'rose'; symbol = '🌹'; points = 60; color = '#ffb703';
        } else {
          type = 'plum'; symbol = '💜'; points = 100; color = '#c77dff';
        }
      } else if (gameScore < 2000) {
        // Fase 3: Rosas (1500 a 1999 pts) + introducción a orquídeas azules
        if (rand < 0.38) {
          type = 'rose'; symbol = '🌹'; points = 65; color = '#ffb703';
        } else if (rand < 0.62) {
          type = 'rose_flame'; symbol = '🏵️'; points = 80; color = '#fb8500';
        } else if (rand < 0.80) {
          type = 'plum'; symbol = '💜'; points = 120; color = '#c77dff';
        } else if (rand < 0.92) {
          type = 'orchid'; symbol = '💙'; points = 130; color = '#00b4d8';
        } else {
          type = 'star'; symbol = '⭐'; points = 110; color = '#fff3b0';
        }
      } else {
        // Fase 4: Orquídeas Azules (2000+ pts) - Reino celestial de Jhen
        if (rand < 0.32) {
          type = 'orchid'; symbol = '💙'; points = 150; color = '#00b4d8';
        } else if (rand < 0.58) {
          type = 'sapphire'; symbol = '💎'; points = 180; color = '#90e0ef';
        } else if (rand < 0.78) {
          type = 'plum'; symbol = '💜'; points = 150; color = '#c77dff';
        } else if (rand < 0.90) {
          type = 'star'; symbol = '⭐'; points = 140; color = '#fff3b0';
        } else {
          type = 'crown'; symbol = '👑'; points = 250; color = '#ffd700';
        }
      }

      gameItems.push({
        x: Math.random() * 280 + 30,
        y: -20,
        vy: Math.random() * 1.8 + (gameScore >= 2000 ? 5.2 : (gameScore >= 1500 ? 4.6 : (gameScore >= 500 ? 4.0 : 3.5))),
        type: type,
        symbol: symbol,
        points: points,
        color: color,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.10
      });
    }

    // 4. Actualizar y dibujar flores cayendo
    for (let i = gameItems.length - 1; i >= 0; i--) {
      const item = gameItems[i];
      item.y += item.vy;
      item.rot += item.rotSpeed;

      // Estela para ítems especiales (Rosas, Orquídeas, Ciruelas, Zafiros, Corona)
      if (item.type === 'orchid' || item.type === 'sapphire' || item.type === 'rose' || item.type === 'plum' || item.type === 'crown') {
        if (Math.random() < 0.35) {
          gameSparks.push({
            x: item.x + (Math.random() - 0.5) * 14,
            y: item.y + (Math.random() - 0.5) * 14,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            color: item.color,
            alpha: 0.85
          });
        }
      }

      // Dibujar ítem (optimizado en rendimiento gráfico para móviles y escritorio)
      gameCtx.save();
      gameCtx.translate(item.x, item.y);
      gameCtx.rotate(item.rot);
      gameCtx.shadowColor = item.color;
      gameCtx.shadowBlur = (item.type === 'crown' || item.type === 'orchid' || item.type === 'sapphire') ? 8 : 3;
      gameCtx.font = item.type === 'crown' ? '28px sans-serif' : '23px sans-serif';
      gameCtx.textAlign = 'center';
      gameCtx.textBaseline = 'middle';
      gameCtx.fillText(item.symbol, 0, 0);
      gameCtx.restore();

      // Detección de captura con Pooh (y ~325, radio 42px)
      const dist = Math.hypot(item.x - poohX, item.y - 325);
      if (dist < 42 && item.y >= 300 && item.y <= 348) {
        // Aumentar combo más ágilmente para mayor recompensa
        comboStreak++;
        if (comboStreak >= 10) comboMultiplier = 3.0;
        else if (comboStreak >= 6) comboMultiplier = 2.0;
        else if (comboStreak >= 3) comboMultiplier = 1.5;
        else comboMultiplier = 1.0;

        const earnedPoints = Math.round(item.points * comboMultiplier);
        gameScore += earnedPoints;

        if (item.type === 'plum') {
          plumScore++;
        }

        playCatchChime(comboMultiplier, item.type === 'plum' || item.type === 'crown' || item.type === 'orchid');

        // Popup flotante con multiplicador
        let popupText = `+${earnedPoints}`;
        if (comboMultiplier > 1) {
          popupText += ` (x${comboMultiplier.toFixed(1)})`;
        }
        if (item.type === 'plum') popupText += ' 💜';
        if (item.type === 'orchid') popupText += ' 💙';

        gamePopups.push({
          x: item.x,
          y: item.y,
          text: popupText,
          color: item.color,
          alpha: 1,
          vy: -1.7
        });

        // Chispas de captura
        const numSparks = (item.type === 'crown' || item.type === 'orchid') ? 16 : (item.type === 'plum' || item.type === 'rose' ? 12 : 8);
        for (let s = 0; s < numSparks; s++) {
          const a = Math.random() * Math.PI * 2;
          const sp = Math.random() * 3.4 + 1.2;
          gameSparks.push({
            x: item.x,
            y: item.y,
            vx: Math.cos(a) * sp,
            vy: Math.sin(a) * sp,
            color: item.color,
            alpha: 1
          });
        }

        gameItems.splice(i, 1);
        checkUnlocks();
        continue;
      }

      // Si cae al suelo
      if (item.y > 380) {
        if (comboStreak > 3) {
          comboStreak = 0;
          comboMultiplier = 1.0;
          updateGameStatsUI();
        }
        gameItems.splice(i, 1);
      }
    }

    // 5. Dibujar a Winnie the Pooh
    drawPoohPlayer(gameCtx, poohX, 330, gameScore, currentFlowerTheme);

    // 6. Dibujar chispas
    for (let i = gameSparks.length - 1; i >= 0; i--) {
      const sp = gameSparks[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.alpha -= 0.04;
      if (sp.alpha <= 0) {
        gameSparks.splice(i, 1);
        continue;
      }
      gameCtx.save();
      gameCtx.globalAlpha = sp.alpha;
      gameCtx.fillStyle = sp.color;
      gameCtx.beginPath();
      gameCtx.arc(sp.x, sp.y, 2.4, 0, Math.PI * 2);
      gameCtx.fill();
      gameCtx.restore();
    }

    // 7. Dibujar popups flotantes
    for (let i = gamePopups.length - 1; i >= 0; i--) {
      const pop = gamePopups[i];
      pop.y += pop.vy;
      pop.alpha -= 0.024;
      if (pop.alpha <= 0) {
        gamePopups.splice(i, 1);
        continue;
      }
      gameCtx.save();
      gameCtx.globalAlpha = pop.alpha;
      gameCtx.fillStyle = pop.color;
      gameCtx.font = 'bold 14px Montserrat, sans-serif';
      gameCtx.textAlign = 'center';
      gameCtx.shadowColor = '#000';
      gameCtx.shadowBlur = 5;
      gameCtx.fillText(pop.text, pop.x, pop.y);
      gameCtx.restore();
    }

    gameLoopId = requestAnimationFrame(runGameLoop);
  }

  // Dibujar a Winnie the Pooh con la canasta que refleja la especie floral activa
  function drawPoohPlayer(ctx, px, py, score, theme) {
    ctx.save();
    ctx.translate(px, py);

    // Halo / Aura mágica según la especie floral o nivel
    if (theme === 'orchid' || score >= 2000) {
      ctx.save();
      ctx.shadowColor = '#00b4d8';
      ctx.shadowBlur = 22;
      ctx.fillStyle = 'rgba(0, 180, 216, 0.25)';
      ctx.beginPath();
      ctx.arc(0, 0, 38, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else if (theme === 'rose' || score >= 1500) {
      ctx.save();
      ctx.shadowColor = '#fb8500';
      ctx.shadowBlur = 18;
      ctx.fillStyle = 'rgba(251, 133, 0, 0.2)';
      ctx.beginPath();
      ctx.arc(0, 0, 36, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else if (theme === 'carnation' || score >= 500) {
      ctx.save();
      ctx.shadowColor = '#ffb5a7';
      ctx.shadowBlur = 16;
      ctx.fillStyle = 'rgba(255, 182, 193, 0.22)';
      ctx.beginPath();
      ctx.arc(0, 0, 35, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Orejitas de Pooh
    ctx.fillStyle = '#f3a712';
    ctx.beginPath();
    ctx.arc(-16, -26, 8, 0, Math.PI * 2);
    ctx.arc(16, -26, 8, 0, Math.PI * 2);
    ctx.fill();

    // Cabeza
    ctx.beginPath();
    ctx.arc(0, -12, 22, 0, Math.PI * 2);
    ctx.fill();

    // Corona en la cabeza de Pooh al alcanzar las Orquídeas Azules (2000 pts)
    if (theme === 'orchid' || score >= 2000) {
      ctx.font = '17px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('👑', 0, -33);
    }

    // Camiseta roja clásica
    ctx.fillStyle = '#e63946';
    ctx.beginPath();
    ctx.ellipse(0, 10, 20, 13, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mejillas tiernas
    ctx.fillStyle = 'rgba(255, 117, 143, 0.4)';
    ctx.beginPath();
    ctx.arc(-12, -7, 4.5, 0, Math.PI * 2);
    ctx.arc(12, -7, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // Hocico y nariz
    ctx.fillStyle = '#ffd257';
    ctx.beginPath();
    ctx.ellipse(0, -8, 11, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#2d1e15';
    ctx.beginPath();
    ctx.arc(0, -10, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Sonrisa
    ctx.strokeStyle = '#4a2810';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(0, -7, 5, 0.2, Math.PI - 0.2);
    ctx.stroke();

    // Ojos
    ctx.fillStyle = '#2d1e15';
    ctx.beginPath();
    ctx.arc(-7, -15, 2.2, 0, Math.PI * 2);
    ctx.arc(7, -15, 2.2, 0, Math.PI * 2);
    ctx.fill();

    // Canasta que sostiene Pooh
    ctx.fillStyle = '#8b5a2b';
    ctx.beginPath();
    ctx.ellipse(0, 18, 30, 13, 0, 0, Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#c68b59';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Flores asomándose en la canasta según el tema floral activo
    ctx.font = '15px sans-serif';
    ctx.textAlign = 'center';

    if (theme === 'orchid' || score >= 2000) {
      ctx.fillText('💙', 0, 12);
      ctx.fillText('💎', -12, 16);
      ctx.fillText('💜', 12, 16);
      ctx.fillText('⭐', -4, 18);
    } else if (theme === 'rose' || score >= 1500) {
      ctx.fillText('🌹', 0, 13);
      ctx.fillText('🏵️', -12, 16);
      ctx.fillText('💜', 12, 16);
      ctx.fillText('🌻', 4, 18);
    } else if (theme === 'carnation' || score >= 500) {
      ctx.fillText('🌸', 0, 13);
      ctx.fillText('💮', -12, 16);
      ctx.fillText('🍯', 12, 16);
      ctx.fillText('🌻', 3, 18);
    } else {
      // Girasoles iniciales
      ctx.fillText('🌻', -10, 16);
      ctx.fillText('🌻', 10, 16);
      ctx.fillText('💛', 0, 14);
    }

    ctx.restore();
  }

  // Controles de movimiento para el minijuego
  function movePooh(clientX) {
    if (!gameCanvas) return;
    const rect = gameCanvas.getBoundingClientRect();
    const scaleX = gameCanvas.width / rect.width;
    poohTargetX = Math.max(38, Math.min(gameCanvas.width - 38, (clientX - rect.left) * scaleX));
  }

  if (gameCanvas) {
    gameCanvas.addEventListener('pointermove', (e) => movePooh(e.clientX));
    gameCanvas.addEventListener('pointerdown', (e) => movePooh(e.clientX));

    // Soporte táctil directo para teléfonos celulares (evita desplazamiento de la página)
    gameCanvas.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        movePooh(e.touches[0].clientX);
      }
      e.preventDefault();
    }, { passive: false });

    gameCanvas.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        movePooh(e.touches[0].clientX);
      }
      e.preventDefault();
    }, { passive: false });
  }

  if (minigameBtn && minigameModal) {
    minigameBtn.addEventListener('click', () => {
      minigameModal.classList.remove('hidden');
      startMinigame();
    });
  }

  if (closeGameBtn && minigameModal) {
    closeGameBtn.addEventListener('click', () => {
      minigameModal.classList.add('hidden');
      stopMinigame();
    });
  }

  if (minigameModal) {
    minigameModal.addEventListener('click', (e) => {
      if (e.target === minigameModal) {
        minigameModal.classList.add('hidden');
        stopMinigame();
      }
    });
  }

  if (restartGameBtn) {
    restartGameBtn.addEventListener('click', () => {
      resetGame();
    });
  }

  if (continueGameBtn) {
    continueGameBtn.addEventListener('click', () => {
      if (gameWinScreen) gameWinScreen.classList.add('hidden');
    });
  }

  // Clic en la píldora de Jardín Activo para alternar entre jardines desbloqueados
  if (activeThemePill) {
    activeThemePill.addEventListener('click', () => {
      const themes = ['sunflower', 'carnation', 'rose', 'orchid'];
      const unlocked = themes.filter(t => unlockedGardenThemes[t]);
      if (unlocked.length <= 1) {
        showGameToast('🌻', 'Jardín de Girasoles', '¡Alcanza 500 puntos en el minijuego para desbloquear el Jardín de Claveles! 🌸');
        return;
      }
      const currentIndex = unlocked.indexOf(currentFlowerTheme);
      const nextIndex = (currentIndex + 1) % unlocked.length;
      const nextTheme = unlocked[nextIndex];
      const titles = {
        sunflower: 'Jardín: Girasoles 🌻',
        carnation: 'Jardín: Claveles 🌸',
        rose: 'Jardín: Rosas 🌹',
        orchid: 'Jardín: Orquídeas Azules 💙'
      };
      transformEntirePage(nextTheme, titles[nextTheme], 'Has cambiado el jardín activo en toda la pantalla');
    });
  }

  // Clic en los ítems de la repisa de flores para ver dedicatoria o cambiar de jardín
  const shelfItems = document.querySelectorAll('.shelf-item');
  const flowerLoveNotes = {
    badgeSunflower: {
      theme: 'sunflower',
      note: '🌻 Girasol: "Siempre buscando tu calor y tu sonrisa, incluso a través de la distancia."',
      ptsNeeded: '0 pts'
    },
    badgeCarnation: {
      theme: 'carnation',
      note: '🌸 Clavel: "Amor puro, tierno y sincero que florece con fuerza cada 21 de Septiembre."',
      ptsNeeded: '500 pts'
    },
    badgeRose: {
      theme: 'rose',
      note: '🌹 Rosa: "La elegancia y la pasión de nuestro amor, lo más valioso en mi corazón."',
      ptsNeeded: '1500 pts'
    },
    badgeOrchid: {
      theme: 'orchid',
      note: '💙 Orquídea Azul: "Un amor único, eterno e irrepetible en el universo, dedicado a ti, mi lunita."',
      ptsNeeded: '2000 pts'
    }
  };

  shelfItems.forEach(item => {
    item.addEventListener('click', () => {
      const id = item.id;
      const flowerData = flowerLoveNotes[id];
      if (!flowerData) return;

      if (unlockedGardenThemes[flowerData.theme]) {
        // Si ya está desbloqueada, permite cambiar toda la página a esa flor inmediatamente
        transformEntirePage(
          flowerData.theme,
          `Jardín: ${flowerData.theme === 'orchid' ? 'Orquídeas Azules 💙' : (flowerData.theme === 'rose' ? 'Rosas 🌹' : (flowerData.theme === 'carnation' ? 'Claveles 🌸' : 'Girasoles 🌻'))}`,
          flowerData.note
        );
      } else {
        showGameToast('🔒', 'Flor Bloqueada', `Reúne ${flowerData.ptsNeeded} en el minijuego para transformar toda la web a esta flor para Jhen`);
      }
    });
  });

})();


