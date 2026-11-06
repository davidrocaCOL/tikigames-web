/* ============================================
   TIKIGAMES - TODO EN UNO (portada)
   Al tocar una función se abre su ventana: los menús de dentro de la app
   (recortes en assets/img/funciones/) y qué se puede hacer con ellos.
   Lo que dice cada una sale de la propia app (sus menús y sus notas).
   ============================================ */

const FUNCIONES = {
  escenas: {
    titulo: 'Escena', color: '#c084fc',
    intro: 'Todos tus overlays en un solo enlace para TikTok Live Studio.',
    puntos: [
      'Por capas: la de arriba tapa a las de abajo. El ojo la oculta, el candado la bloquea y Supr la quita.',
      '«Agregar overlay»: tops, metas, alertas, batallas, chat y videos.',
      'Arrastra para mover, la esquina agranda y los lados recortan. Doble clic: se ajusta solo.',
      'Plantillas listas (Clásica, Esencial, Ranking y Extensible) y tipo de live: cámara, batalla o gaming.',
      'Ejemplo en Live Studio: ves dónde queda cada overlay antes del directo.',
      'Copias un solo enlace y lo pegas en Live Studio como fuente «Enlace».',
    ],
    fotos: [['escenas-1', 'El editor de escena']],
  },
  deck: {
    titulo: 'Stream Deck', color: '#a78bfa',
    intro: 'Tus botones a mano para lanzar sonidos, videos y acciones al instante.',
    puntos: [
      'En el celular: escaneas el QR y lo usas por el Wi-Fi.',
      'Ventana flotante: con «Ventana aparte» se queda encima de Live Studio o del juego, y la mueves desde la barra de arriba.',
      '9 botones gratis; con la suscripción, hasta 10×10.',
      'Pestañas: cada página con su forma y su tecla. Atajos Ctrl + Shift + 1 a 9, o el teclado numérico.',
      'Mantén pulsado para cortar el sonido, el lápiz lo configura y arrastras para cambiarlo de sitio.',
    ],
    fotos: [['deck-1', 'Tu consola de botones'], ['deck-2', 'Elige cuántos botones']],
  },
  alertas: {
    titulo: 'Alertas de sonido', color: '#ffc13b',
    intro: 'Cada regalo con su sonido.',
    puntos: [
      'Eliges el regalo de una lista, con su imagen y su nombre, y le pones un sonido.',
      'Biblioteca de sonidos y el catálogo de regalos de tu región, con los más populares primero.',
      'Volumen y duración de cada alerta; suenan desde la app, sin pantallas.',
    ],
    fotos: [['alertas-1', 'Alertas de sonido']],
  },
  video: {
    titulo: 'Video e imagen', color: '#ff8a3d',
    intro: 'Videos e imágenes que salen en tu live cuando pasa algo.',
    puntos: [
      'Acciones: qué se ve (tus videos, imágenes y sonidos).',
      'Eventos: cuándo sale (un regalo, un seguidor, un comentario, un sticker…).',
      'Pantallas: dónde sale. Cada pantalla es un enlace para Live Studio.',
    ],
    fotos: [['video-1', 'Acciones, eventos y pantallas']],
  },
  animaciones: {
    titulo: 'Animaciones', color: '#ff5c9a',
    intro: 'Videos animados para tu live, listos para usar.',
    puntos: [
      'Por apartados: tap-taps, Quiéreme, ×2, ×3, Guante, Snipe…',
      'Muy pronto, con un toque: en tus acciones y en el Stream Deck.',
      '¿Quieres una intro o una animación hecha para ti? Se pide por Discord.',
    ],
    fotos: [['animaciones-1', 'Los apartados de animaciones']],
  },
  estadisticas: {
    titulo: 'Estadísticas', color: '#3ddc97',
    intro: 'Cómo te va de verdad, sin cuentas a mano.',
    puntos: [
      'Diamantes, seguidores nuevos, espectadores y horas en vivo, por semana, mes o año.',
      'Tus números oficiales de TikTok: los 60 días, día por día.',
      'Tu mejor live, tu media por live y tu mejor día para salir.',
      'Podios del mes: tus mayores donadores, los de más tap-taps y quién más tiempo estuvo.',
    ],
    fotos: [['estadisticas-1', 'Tus números del mes']],
  },
  envivo: {
    titulo: 'En vivo ahora', color: '#ff2d55',
    intro: 'Los lives que más se ven ahora en tu región.',
    puntos: [
      'Lo que más se ve ahora, sumando espectadores por tipo de dinámica.',
      'Por idioma y por tipo: juegos interactivos, batallas, extensibles, gaming, charla…',
      'Ordenados por más vistos, más populares, más tap-taps o más comentarios.',
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
  // «carpeta/archivo.ext» va tal cual (overlays…); si no, es un recorte de la app en funciones/
  const ruta = n => n.includes('/') ? `assets/img/${n}` : `assets/img/funciones/${n}.jpg`;

  function abrir(id) {
    const f = FUNCIONES[id];
    if (!f) return;
    const icono = f.ic ? null : document.querySelector(`[data-funcion="${id}"] .ic`);
    capa.innerHTML = `
      <div class="jg-ventana fn-ventana" role="dialog" aria-modal="true" aria-label="${f.titulo}" style="--g:${f.color}">
        <button type="button" class="jg-cerrar" data-cerrar aria-label="Cerrar">✕</button>
        <div class="fn-cabeza">
          <span class="ic-caja fn-ic">${f.ic || (icono ? icono.outerHTML : '')}</span>
          <div><h2>${f.titulo}</h2><p>${f.intro}</p></div>
        </div>
        <figure class="fn-vista${f.ov ? ' es-ov' : ''}">
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
