/* ============================================
   TIKIGAMES - OVERLAYS (portada)
   Los 13 overlays de la app, en sus 4 bloques y con sus colores, igual que la
   galería de Overlays de la app (TikiGames/js/13g-overlays-galeria.js).
   Cada tarjeta enseña el overlay tal y como sale en el live (fotos sacadas de
   la vista previa de la app, con datos de ejemplo) y al tocarla se abre su
   ventana con lo que trae (la misma ventana de «Todo en uno», js/07-funciones.js).
   Va DESPUÉS de 07-funciones.js y ANTES de 02-animaciones.js.
   5-nov-2026, Ace: «actualiza lo que hay dentro de cada overlay».
   ============================================ */

const OV_REL = s => '<g style="fill:currentColor;fill-opacity:.22;stroke:none">' + s + '</g>';
const OV_ICONOS = {
  regalo: OV_REL('<rect x="4" y="11.5" width="16" height="9.5" rx="2"/>') + '<rect x="3" y="7.5" width="18" height="4" rx="1.3"/><path d="M4.5 11.5V19a2 2 0 002 2h11a2 2 0 002-2v-7.5M12 7.5V21"/><path d="M12 7.5C10.6 4.2 6.8 3.6 6.8 6c0 1.4 2.4 1.5 5.2 1.5zm0 0c1.4-3.3 5.2-3.9 5.2-1.5 0 1.4-2.4 1.5-5.2 1.5z"/>',
  meta: OV_REL('<circle cx="12" cy="12" r="9"/>') + '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.2"/><circle cx="12" cy="12" r="1.6"/><path d="M12 12l6.5-6.5M16.2 4.8l2.3.7.7 2.3"/>',
  copa: OV_REL('<path d="M7 3.5h10V9a5 5 0 01-10 0z"/>') + '<path d="M7 3.5h10V9a5 5 0 01-10 0z"/><path d="M7 5.5H4.5a3 3 0 003.2 4.2M17 5.5h2.5a3 3 0 01-3.2 4.2M12 14v3.5M8 21h8M9.5 17.5h5V21h-5z"/>',
  corazon: OV_REL('<path d="M11 20s-7-4.3-7-9.8A4 4 0 0111 7.6a4 4 0 017 2.6c0 5.5-7 9.8-7 9.8z"/>') + '<path d="M11 20s-7-4.3-7-9.8A4 4 0 0111 7.6a4 4 0 017 2.6c0 5.5-7 9.8-7 9.8z"/><path d="M19 3.5l1.2-1.2M21 7h1.3M17.2 2v-.8"/>',
  chat: OV_REL('<path d="M4 5h16v10.5H9.5L5 19.5V15.5H4z"/>') + '<path d="M4 6a1 1 0 011-1h14a1 1 0 011 1v8.5a1 1 0 01-1 1H9.5L5 19.5v-4H5a1 1 0 01-1-1z"/><path d="M8.5 9v2.5M11 8v4.5M13.5 9.2v2M16 8.5v3.5"/>',
  reloj: OV_REL('<circle cx="11" cy="13" r="8"/>') + '<circle cx="11" cy="13" r="8"/><path d="M11 9v4l2.5 2M8.5 2.5h5"/><path d="M19.5 3.5v5M17 6h5"/>',
  versus: OV_REL('<circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>') + '<path d="M3 3l11 11M21 3L10 14"/><path d="M3 3h3.5l9 9M21 3h-3.5l-9 9"/><path d="M14.5 15.5l2.5 2.5M9.5 15.5L7 18M12.5 13.5l3 3M11.5 13.5l-3 3"/>',
  estrella: OV_REL('<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z"/>') + '<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z"/>',
  batalla: OV_REL('<circle cx="5" cy="6" r="3"/><circle cx="5" cy="18" r="3"/><circle cx="19" cy="6" r="3"/><circle cx="19" cy="18" r="3"/>') + '<circle cx="5" cy="6" r="3"/><circle cx="5" cy="18" r="3"/><circle cx="19" cy="6" r="3"/><circle cx="19" cy="18" r="3"/><path d="M10 9.5l2 4.5 2-4.5"/>',
  crono: OV_REL('<circle cx="12" cy="14" r="8"/>') + '<circle cx="12" cy="14" r="8"/><path d="M12 10v4l2.5 2M10 2h4M12 2v4M19 6l1.5-1.5"/>',
  'vs-barra': '<rect x="2" y="9" width="20" height="6" rx="3"/><path d="M12 6v12"/>',
  'vs-duelo': '<rect x="2" y="6" width="7" height="9" rx="2"/><rect x="15" y="6" width="7" height="9" rx="2"/><path d="M10.5 9l1.5 3 1.5-3"/>',
  'vs-reto': '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/><circle cx="18" cy="18" r="3"/>',
  'vs-equipos': '<circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M2 20c0-3 3-5 6-5M22 20c0-3-3-5-6-5M9 20h6"/>',
};

// k: su foto (assets/img/overlays/<k>.webp) · gratis: también sale con el plan gratis
const OVERLAYS = {
  topregalos: { n: 'Top donadores', ic: 'copa', g: '#ffc13b', gratis: true,
    d: 'Quién lleva más monedas en el live',
    puntos: ['El top 3 destacado y corona para el primero.', 'Último directo o top histórico, con un toque.', 'Cuando alguien sube de puesto, se anima.', 'Tema, letra, colores y el tamaño de cada parte, a tu gusto.'] },
  toplikes: { n: 'Top tap-taps', ic: 'corazon', g: '#ffb02e', gratis: true,
    d: 'Quién da más tap-taps',
    puntos: ['Cuenta los tap-taps igual que TikTok Live Studio.', 'El top 3 destacado y corona para el primero.', 'Último directo o top histórico, con un toque.'] },
  topgift: { n: 'Top regalo y racha', ic: 'estrella', g: '#ffd15c', gratis: true,
    d: 'El regalo más caro y la racha más larga',
    puntos: ['Quién mandó el regalo más caro del live.', 'Y quién hizo la racha más larga.'] },
  metas: { n: 'Metas', ic: 'meta', g: '#2ee59d',
    d: 'Me gusta, monedas, seguidores o compartidos',
    puntos: ['Una barra que se llena sola con tu live.', 'Me gusta, monedas, seguidores o compartidos.', 'Varias metas a la vez, cada una con su texto.'] },
  subathon: { n: 'Extensible', ic: 'reloj', g: '#5ee08a',
    d: 'Una cuenta atrás que tu live alarga',
    puntos: ['Los regalos y los seguidores le suman tiempo.', 'Lo empiezas, lo pausas y lo terminas desde la app.'] },
  temporizador: { n: 'Temporizador', ic: 'crono', g: '#34d3a0', gratis: true,
    d: 'Cuenta atrás o cronómetro con vueltas',
    puntos: ['Cuenta atrás o cronómetro con vueltas.', 'El título y los números, cada uno con su tamaño.'] },
  batalla: { n: 'Batalla de imágenes', ic: 'batalla', g: '#ff5a7e',
    d: 'Hasta 16 equipos, cada uno con su regalo',
    puntos: ['Clubes, selecciones o tus propias imágenes: la arrastras encima del equipo y listo.', 'Cada equipo se une con su regalo de 1 moneda, para que todos puedan jugar.', 'Por tiempo o en Supervivencia: cada tanto se va el que menos tiene, hasta la final.', 'Taps, follows y compartidos también suman para el equipo de cada uno.', 'Copas para cada equipo, sonidos y unos últimos segundos que duran el triple.'],
    fotos: [['overlays/batalla.webp', 'Así se ve en tu live'], ['funciones/batalla-1.jpg', 'Se prepara en la app']] },
  'vs-barra': { n: 'Tira y afloja', ic: 'vs-barra', g: '#ff3d6e',
    d: 'La barra se va hacia el que más lleva',
    puntos: ['Dos lados, cada uno con su nombre y su regalo.', 'La barra se mueve hacia el que más lleva.', 'La meta y las rondas, a tu medida.'] },
  'vs-duelo': { n: 'Duelo', ic: 'vs-duelo', g: '#ff3d6e',
    d: 'Imagen contra imagen, con su marcador',
    puntos: ['Dos imágenes frente a frente, cada una con su marcador.', 'Cada lado suma con su regalo.'] },
  'vs-reto': { n: 'Reto', ic: 'vs-reto', g: '#ff3d6e',
    d: 'Cada lado, su meta',
    puntos: ['Cada lado con su propia meta.', 'El primero en llegar dispara lo que tú elijas.'] },
  'vs-equipos': { n: 'Equipos', ic: 'vs-equipos', g: '#ff3d6e',
    d: 'Se unen comentando 1 o 2',
    puntos: ['El público se une a un equipo comentando 1 o 2.', 'Sus monedas suman a su equipo.'] },
  alertas: { n: 'Alertas de regalo', ic: 'regalo', g: '#c084fc',
    d: 'Cada regalo, con su imagen y quién lo manda',
    puntos: ['La imagen del regalo, el nombre y la foto de quien lo manda.', 'En una racha el número sube solo: ×1, ×2, ×3…', 'Quien no tiene foto sale con el logo de TikiGames.'] },
  chat: { n: 'Chat TTS', ic: 'chat', g: '#a78bfa',
    d: 'Tu chat en pantalla y leído en voz alta',
    puntos: ['Los últimos mensajes con su foto y su nombre, y los regalos.', 'Voces naturales en español, inglés y portugués.', 'Filtros para que nadie abuse: quién puede, espera por persona, enlaces y palabras bloqueadas.'] },
};

const OV_BLOQUES = [
  { t: 'Tops', ic: 'copa', c: '#ffc13b', items: ['topregalos', 'toplikes', 'topgift'] },
  { t: 'Objetivos y tiempo', ic: 'meta', c: '#2ee59d', items: ['metas', 'subathon', 'temporizador'] },
  { t: 'Batallas', ic: 'versus', c: '#ff3d6e', items: ['batalla', 'vs-barra', 'vs-duelo', 'vs-reto', 'vs-equipos'] },
  { t: 'Alertas, chat y voz', ic: 'regalo', c: '#c084fc', items: ['alertas', 'chat'] },
];

(function () {
  const caja = document.getElementById('ov-bloques');
  const ic = k => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${OV_ICONOS[k]}</svg>`;
  // cada overlay, también en las ventanas de «Todo en uno»
  Object.entries(OVERLAYS).forEach(([k, o]) => {
    FUNCIONES[k] = { titulo: o.n, color: o.g, intro: o.d + '.', puntos: o.puntos, ic: ic(o.ic), ov: true,
      fotos: o.fotos || [['overlays/' + k + '.webp', 'Así se ve en tu live']] };
  });
  if (!caja) return;
  caja.innerHTML = OV_BLOQUES.map(b => `
    <div class="ov-bloque" style="--g:${b.c};--n:${b.items.length}">
      <h3 class="ov-grupo reveal"><span class="ic-caja">${ic(b.ic)}</span>${b.t}<b>${b.items.length}</b></h3>
      <div class="ov-rejilla">${b.items.map(k => {
        const o = OVERLAYS[k];
        return `<div class="ov-tarjeta reveal" data-funcion="${k}" role="button" tabindex="0" aria-label="Ver ${o.n}" style="--g:${o.g}">
          <div class="ov-foto"><img src="assets/img/overlays/${k}.webp" alt="${o.n}" loading="lazy" /></div>
          <div class="ov-texto">
            <span class="ic-caja">${ic(o.ic)}</span>
            <div><h4>${o.n}${o.gratis ? '<span class="ov-gratis">Gratis</span>' : ''}</h4><p>${o.d}</p></div>
          </div>
        </div>`;
      }).join('')}</div>
    </div>`).join('');
})();
