// Cargar la imagen PNG y mostrar animación
function loadTreeImage() {
  const container = document.getElementById('tree-container');
  
  // Crear elemento de imagen
  const img = document.createElement('img');
  img.src = 'Img/arbol.png';
  img.alt = 'Árbol de amor';
  img.style.width = '100%';
  img.style.height = 'auto';
  img.style.opacity = '0';
  img.style.transform = 'scale(0.8)';
  img.style.transition = 'opacity 1.5s ease-out, transform 1.5s ease-out';
  
  container.innerHTML = '';
  container.appendChild(img);
  
  // Cuando la imagen se carga, mostrar con animación
  img.onload = function() {
    // Pequeño delay para asegurar que la transición funcione
    setTimeout(() => {
      img.style.opacity = '1';
      img.style.transform = 'scale(1)';
      
      // Después de la animación de aparición, mover y escalar
      setTimeout(() => {
        img.classList.add('move-and-scale');
        
        // Mostrar texto con efecto typing
        setTimeout(() => {
          showDedicationText();
          // Mostrar petalos flotando
          startFloatingObjects();
          // Mostrar cuenta regresiva
          showCountdown();
          // Iniciar música de fondo
          playBackgroundMusic();
        }, 1200); // Tiempo para agrandar la imagen
      }, 1500); // Esperar a que termine la animación de aparición
    }, 100);
  };
  
  // Manejar error de carga
  img.onerror = function() {
    container.innerHTML = '<p style="color: #e60026; text-align: center; padding: 50px;">Error: No se pudo cargar la imagen arbol.png</p>';
  };
}

// Variable global para controlar el audio
let audioInstance = null;
let musicStarted = false;

// Función para intentar reproducir música automáticamente
function tryAutoPlay() {
  if (!audioInstance || musicStarted) return;
  
  audioInstance.play().then(() => {
    console.log('Música iniciada automáticamente');
    musicStarted = true;
    updateMusicButton('🔊 Música');
  }).catch(error => {
    console.log('Autoplay bloqueado, esperando interacción del usuario');
    updateMusicButton('▶️ Reproducir Música');
  });
}

// Función para manejar cualquier interacción del usuario
function handleUserInteraction() {
  if (!musicStarted && audioInstance) {
    tryAutoPlay();
  }
}

// Iniciar la carga de la imagen cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
  loadTreeImage();
  
  // Agregar listeners para detectar cualquier interacción del usuario
  document.addEventListener('click', handleUserInteraction, { once: true });
  document.addEventListener('touchstart', handleUserInteraction, { once: true });
  document.addEventListener('keydown', handleUserInteraction, { once: true });
  document.addEventListener('scroll', handleUserInteraction, { once: true });
});

// Efecto máquina de escribir para el texto de dedicatoria (seguidores)
function getURLParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function showDedicationText() { //seguidores
  let text = getURLParam('text');
  if (!text) {
   if (true) {
    text = `Adel🐝:\n\nTe amé más de lo que pudiste imaginar y por ello tambien eres libre de tomar cualquier decisión. \n\nSi algún día me extrañas, solo activa la "bati-señal" y te llevaré conmigo a descubir el mundo y veras como yo veo la vida... eso sí, no lo hagas cuando ya sea demasiado tarde.\n\nYo por el momento estare en busca de nuevas anecdotas y tratando de dejar mi marca en el mundo...\n\n P.D. paquito puede ir si ayuda a conquitar el mundo`;
  
} else {
    text = decodeURIComponent(text).replace(/\\n/g, '\n');
}
  }
  const container = document.getElementById('dedication-text');
  container.classList.add('typing');
  let i = 0;
  function type() {
    if (i <= text.length) {
      container.textContent = text.slice(0, i);
      i++;
      setTimeout(type, text[i - 2] === '\n' ? 350 : 45);
    } else {
      // Al terminar el typing, mostrar la firma animada
      setTimeout(showSignature, 600);
    }
  }
  type();
}

// Firma manuscrita animada
function showSignature() {
  // Cambia para buscar la firma dentro del contenedor de dedicatoria
  const dedication = document.getElementById('dedication-text');
  let signature = dedication.querySelector('#signature');
  if (!signature) {
    signature = document.createElement('div');
    signature.id = 'signature';
    signature.className = 'signature';
    dedication.appendChild(signature);
  }
  let firma = getURLParam('firma');
  signature.textContent = firma ? decodeURIComponent(firma) : "❤️";
  signature.classList.add('visible');
}

// Controlador de objetos flotantes
function startFloatingObjects() {
  const container = document.getElementById('floating-objects');
  let count = 0;
  function spawn() {
    let el = document.createElement('div');
    el.className = 'floating-petal';
    // Posición inicial
    el.style.left = `${Math.random() * 90 + 2}%`;
    el.style.top = `${100 + Math.random() * 10}%`;
    el.style.opacity = 0.7 + Math.random() * 0.3;
    container.appendChild(el);

    // Animación flotante
    const duration = 6000 + Math.random() * 4000;
    const drift = (Math.random() - 0.5) * 60;
    setTimeout(() => {
      el.style.transition = `transform ${duration}ms linear, opacity 1.2s`;
      el.style.transform = `translate(${drift}px, -110vh) scale(${0.8 + Math.random() * 0.6}) rotate(${Math.random() * 360}deg)`;
      el.style.opacity = 0.2;
    }, 30);

    // Eliminar después de animar
    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, duration + 2000);

    // Generar más objetos
    if (count++ < 32) setTimeout(spawn, 350 + Math.random() * 500);
    else setTimeout(spawn, 1200 + Math.random() * 1200);
  }
  spawn();
}


// Función auxiliar para actualizar el botón de música
function updateMusicButton(text) {
  const btn = document.getElementById('music-btn');
  if (btn) {
    btn.textContent = text;
  }
}

// --- Música de fondo mejorada ---
function playBackgroundMusic() {
  const audio = document.getElementById('bg-music');
  if (!audio) return;

  // Guardar referencia global
  audioInstance = audio;

  // --- Opción archivo local por parámetro 'musica' ---
  let musicaParam = getURLParam('musica');
  if (musicaParam) {
    // Decodifica y previene rutas maliciosas
    musicaParam = decodeURIComponent(musicaParam).replace(/[^\w\d .\-]/g, '');
    audio.src = 'Music/' + musicaParam;
  }

  // --- Opción YouTube (solo mensaje de ayuda) ---
  let youtubeParam = getURLParam('youtube');
  if (youtubeParam) {
    // Muestra mensaje de ayuda para descargar el audio
    let helpMsg = document.getElementById('yt-help-msg');
    if (!helpMsg) {
      helpMsg = document.createElement('div');
      helpMsg.id = 'yt-help-msg';
      helpMsg.style.position = 'fixed';
      helpMsg.style.right = '18px';
      helpMsg.style.bottom = '180px';
      helpMsg.style.background = 'rgba(255,255,255,0.95)';
      helpMsg.style.color = '#0e0d0dff';
      helpMsg.style.padding = '10px 16px';
      helpMsg.style.borderRadius = '12px';
      helpMsg.style.boxShadow = '0 2px 8px #e6002633';
      helpMsg.style.fontSize = '1.05em';
      helpMsg.style.zIndex = 100;
      helpMsg.innerHTML = 'Para usar música de YouTube, descarga el audio (por ejemplo, usando y2mate, 4K Video Downloader, etc.), colócalo en la carpeta <b>Music</b> y usa la URL así:<br><br><code>?musica=nombre.mp3</code>';
      document.body.appendChild(helpMsg);
      setTimeout(() => { if(helpMsg) helpMsg.remove(); }, 15000);
    }
  }

  // Crear botón de música
  let btn = document.getElementById('music-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'music-btn';
    btn.textContent = '🔊 Música';
    btn.style.position = 'fixed';
    btn.style.bottom = '18px';
    btn.style.right = '18px';
    btn.style.zIndex = 99;
    btn.style.background = 'rgba(255,255,255,0.85)';
    btn.style.border = 'none';
    btn.style.borderRadius = '24px';
    btn.style.padding = '10px 18px';
    btn.style.fontSize = '1.1em';
    btn.style.cursor = 'pointer';
    btn.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    btn.style.transition = 'all 0.3s ease';
    document.body.appendChild(btn);
  }

  // Configurar audio
  audio.volume = 0.7;
  audio.loop = true;
  audio.preload = 'auto';

  // Manejar eventos del audio
  audio.addEventListener('loadeddata', () => {
    console.log('Audio cargado, intentando reproducir automáticamente...');
    tryAutoPlay();
  });

  audio.addEventListener('canplay', () => {
    if (!musicStarted) {
      tryAutoPlay();
    }
  });

  // Intentar reproducir inmediatamente si el audio ya está listo
  if (audio.readyState >= 3) { // HAVE_FUTURE_DATA
    tryAutoPlay();
  }

  // Botón de control manual
  btn.onclick = () => {
    if (audio.paused) {
      audio.play().then(() => {
        musicStarted = true;
        updateMusicButton('🔊 Música');
      }).catch(error => {
        console.error('Error al reproducir:', error);
        updateMusicButton('❌ Error');
      });
    } else {
      audio.pause();
      updateMusicButton('▶️ Reproducir');
    }
  };

  // Intentar reproducir con diferentes estrategias
  setTimeout(() => {
    if (!musicStarted) {
      tryAutoPlay();
    }
  }, 500);

  setTimeout(() => {
    if (!musicStarted) {
      tryAutoPlay();
    }
  }, 2000);
}

// Intentar reproducir la música lo antes posible
window.addEventListener('DOMContentLoaded', () => {
  // Configurar audio inmediatamente
  setTimeout(playBackgroundMusic, 100);
});

// También intentar cuando la página esté completamente cargada
window.addEventListener('load', () => {
  if (!musicStarted && audioInstance) {
    tryAutoPlay();
  }
});

// Intentar reproducir después de cualquier animación o interacción
document.addEventListener('animationend', handleUserInteraction);
document.addEventListener('transitionend', handleUserInteraction);
