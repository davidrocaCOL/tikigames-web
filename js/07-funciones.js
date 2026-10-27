/* ============================================
   TIKIGAMES - TODO EN UNO (portada)
   Al tocar una función se abre su ventana: los menús de dentro de la app
   (recortes en assets/img/funciones/) y qué se puede hacer con ellos.
   Lo que dice cada una sale de la propia app (sus menús y sus notas).
   ============================================ */

const FUNCIONES = {
  escenas: {
    titulo: 'Escenas', color: '#c084fc',
    intro: 'Todos tus overlays en un solo enlace para TikTok Live Studio.',
    puntos: [
      'Elige qué sale: metas, extensible, top donadores, top tap-taps, alertas de regalo, chat y videos.',
      'Arrastra para mover, la esquina agranda y los lados recortan. Doble clic: se ajusta solo.',
      'Plantillas listas: Clásica, Esencial, Ranking y Extensible.',
      'Tipo de live: cámara, batalla o gaming, con las zonas de TikTok marcadas.',
      'Copias un solo enlace y lo pegas en Live Studio como fuente «Enlace».',
    ],
    fotos: [['escenas-1', 'El editor de escenas']],
  },
  overlays: {
    titulo: 'Overlays', color: '#00f0ff',
    intro: 'Lo que pasa en tu live, en pantalla y con tu estilo.',
    puntos: [
      'Alertas de regalo: en una racha la tarjeta sube sola ×1, ×2, ×3…',
      'Top donadores y top tap-taps, con el top 3 destacado y corona al primero.',
      'Metas de me gusta, monedas, seguidores y compartidos que suben solas al cumplirse.',
      'Extensible: una cuenta atrás que tu live alarga con regalos y seguidores.',
      '8 temas y 8 letras para cada uno, y su enlace para Live Studio u OBS.',
    ],
    fotos: [['overlays-1', 'Todos tus overlays'], ['overlays-2', 'Alertas de regalo'], ['overlays-3', 'Top donadores'], ['overlays-4', 'Metas'], ['overlays-5', 'Extensible']],
  },
  deck: {
    titulo: 'Stream Deck', color: '#a78bfa',
    intro: 'Tus botones a mano para lanzar sonidos, videos y acciones al instante.',
    puntos: [
      'Ventana flotante: con «Ventana aparte» se queda siempre encima de Live Studio o del juego, del tamaño que quieras.',
      '9 botones gratis; con la suscripción, hasta 10×10.',
      'Atajos Ctrl + Shift + 1 a 9, o el teclado numérico.',
      'Varias páginas de botones (Principal, Animaciones…) y volumen propio.',
      'Mantén pulsado para cortar el sonido, el lápiz lo configura y arrastras para cambiarlo de sitio.',
    ],
    fotos: [['deck-1', 'Tu consola de botones'], ['deck-2', 'Elige cuántos botones']],
  },
  voz: {
    titulo: 'Chat de voz', color: '#2ee59d',
    intro: 'Tu chat en pantalla y leído en voz alta.',
    puntos: [
      'Los últimos mensajes con foto y nombre, y avisos de seguidores, regalos y compartidos.',
      'Lectura en voz alta con la voz de Windows, desde la app.',
      'Filtros para que nadie abuse: por comando, solo ciertos espectadores, espera por persona, sin enlaces y palabras bloqueadas.',
      'Cuántos mensajes a la vez, cuándo desaparecen, tamaño, tema y letra.',
    ],
    fotos: [['voz-1', 'Chat en pantalla']],
  },
  alertas: {
    titulo: 'Alertas de sonido y video', color: '#ffc13b',
    intro: 'Cada regalo con su sonido, su imagen o su video.',
    puntos: [
      'Eliges el regalo de una lista, con su imagen, y le pones un sonido.',
      'Biblioteca de sonidos y catálogo de regalos de tu región.',
      'Volumen y duración de cada alerta; suenan desde la app, sin pantallas.',
      'Videos e imágenes que salen en tus pantallas cuando pasa algo en tu live.',
    ],
    fotos: [['alertas-1', 'Alertas de sonido'], ['alertas-2', 'Video e imagen']],
  },
  animaciones: {
    titulo: 'Animaciones', color: '#ff8a3d',
    intro: 'Videos animados para tu live: entradas, celebraciones, regalos y transiciones.',
    puntos: [
      'Una vitrina de animaciones listas, por categorías.',
      'Muy pronto, con un toque: en tus acciones y en el Stream Deck.',
    ],
    fotos: [['animaciones-1', 'La vitrina de animaciones']],
  },
  estadisticas: {
    titulo: 'Estadísticas', color: '#3ddc97',
    intro: 'Cómo te va de verdad, sin cuentas a mano.',
    puntos: [
      'Diamantes, seguidores nuevos, espectadores y horas en vivo, por semana, mes o año.',
      'Comparado con el periodo anterior.',
      'Tu mejor live, tu media por live y tu mejor día para salir.',
      'Para premiar: tus mayores donadores, los de más tap-taps y quién subió de nivel.',
      'Tus números oficiales de TikTok de los últimos 60 días.',
    ],
    fotos: [['estadisticas-1', 'Tus números del mes']],
  },
  envivo: {
    titulo: 'En vivo', color: '#ff2d55',
    intro: 'Los lives que más se ven ahora en tu región.',
    puntos: [
      'Por idioma y por tipo de dinámica: gaming, charla, juegos interactivos, extensibles, batallas…',
      'Lo que más se ve ahora, sumando espectadores.',
      '«Para ti»: dinámicas parecidas a las de TikiGames.',
      'Se pone al día solo cada 2 minutos.',
    ],
    fotos: [['envivo-1', 'Lo que más se ve ahora']],
  },
  conexion: {
    titulo: 'Conexión directa con TikTok', color: '#00f0ff',
    intro: 'Escribe tu usuario y la app entra sola cuando empiezas el live.',
    puntos: [
      'Conexión directa con TikTok; si ya usas TikFinity, también sirve de respaldo.',
      'Ves en directo todo lo que pasa en tu live.',
      'Eliges tu región para ver sus regalos.',
    ],
    fotos: [['conexion-1', 'Tu conexión con TikTok']],
  },
};

(function () {
  const capa = document.getElementById('fn-ficha');
  if (!capa) return;
  const ruta = n => `assets/img/funciones/${n}.jpg`;

  function abrir(id) {
    const f = FUNCIONES[id];
    if (!f) return;
    const icono = document.querySelector(`[data-funcion="${id}"] .p-captura > .ic`);
    capa.innerHTML = `
      <div class="jg-ventana fn-ventana" role="dialog" aria-modal="true" aria-label="${f.titulo}" style="--g:${f.color}">
        <button type="button" class="jg-cerrar" data-cerrar aria-label="Cerrar">✕</button>
        <div class="fn-cabeza">
          <span class="ic-caja fn-ic">${icono ? icono.outerHTML : ''}</span>
          <div><h2>${f.titulo}</h2><p>${f.intro}</p></div>
        </div>
        <figure class="fn-vista">
          <img src="${ruta(f.fotos[0][0])}" alt="${f.fotos[0][1]}" />
          <figcaption>${f.fotos[0][1]}</figcaption>
        </figure>
        ${f.fotos.length > 1 ? `<div class="fn-minis">${f.fotos.map(([n, t], i) => `
          <button type="button" class="fn-mini${i ? '' : ' on'}" data-foto="${ruta(n)}" data-texto="${t}">
            <img src="${ruta(n)}" alt="" loading="lazy" /><span>${t}</span>
          </button>`).join('')}</div>` : ''}
        <ul class="jg-puntos fn-puntos">${f.puntos.map(p => `<li>${p}</li>`).join('')}</ul>
        <div class="jg-acciones">
          <a class="btn btn-primary btn-lg btn-descargar" href="https://github.com/davidrocaCOL/tikigames/releases/latest/download/TikiGames-Instalador.exe"><svg class="icono-windows" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 5.5 10.5 4.5v7H3zM11.5 4.4 21 3v8.5h-9.5zM3 12.5h7.5v7L3 18.5zM11.5 12.5H21V21l-9.5-1.4z"/></svg><span>Descargar TikiGames</span></a>
          <span class="jg-nota">Gratis · Para Windows 10 y 11</span>
        </div>
      </div>`;
    capa.hidden = false;
    capa.classList.remove('cerrando');
    document.documentElement.classList.add('sin-scroll');
    capa.querySelector('.jg-cerrar').focus({ preventScroll: true });
  }

  function cerrar() {
    if (capa.hidden) return;
    capa.classList.add('cerrando');
    setTimeout(() => { capa.hidden = true; capa.innerHTML = ''; }, 230);
    document.documentElement.classList.remove('sin-scroll');
  }

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-funcion]');
    if (t) abrir(t.dataset.funcion);
  });
  document.addEventListener('keydown', e => {
    const t = e.target.closest && e.target.closest('[data-funcion]');
    if (t && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); abrir(t.dataset.funcion); }
    if (e.key === 'Escape') cerrar();
  });
  capa.addEventListener('click', e => {
    if (e.target === capa || e.target.closest('[data-cerrar]')) return cerrar();
    const m = e.target.closest('.fn-mini');
    if (!m) return;
    capa.querySelectorAll('.fn-mini').forEach(x => x.classList.toggle('on', x === m));
    const img = capa.querySelector('.fn-vista img');
    img.classList.remove('jg-cambia'); void img.offsetWidth;
    img.src = m.dataset.foto; img.alt = m.dataset.texto; img.classList.add('jg-cambia');
    capa.querySelector('.fn-vista figcaption').textContent = m.dataset.texto;
  });
})();
