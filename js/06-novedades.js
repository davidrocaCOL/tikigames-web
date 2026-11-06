/* ============================================
   TIKIGAMES - NOVEDADES DE LA APP (pages/comunidad.html)
   Las mismas tarjetas que enseña la app en «X cosas nuevas»
   (TikiGames/js/13y-novedades.js). Cuando la app saque una versión con
   novedades nuevas, se copian aquí arriba.
   El número de la última versión y su fecha se leen solos de GitHub.
   Va ANTES de 02-animaciones.js para que las tarjetas también se animen.
   ============================================ */

const NOVEDADES_WEB = {
  version: '1.2.19',
  cosas: [
    { c: '#ff5a7e', t: 'Batalla de imágenes', d: 'Hasta 16 equipos con su regalo, rondas y victorias', ic: '<circle cx="5" cy="6" r="3"/><circle cx="5" cy="18" r="3"/><circle cx="19" cy="6" r="3"/><circle cx="19" cy="18" r="3"/><path d="M10 9.5l2 4.5 2-4.5"/>' },
    { c: '#ff3d6e', t: 'Batalla: Supervivencia', d: 'Cada tanto se va el que menos tiene, hasta la final', ic: '<circle cx="12" cy="12" r="9"/><path d="M8.5 8.5l7 7M15.5 8.5l-7 7"/>' },
    { c: '#ffc13b', t: 'Batalla: regalos de 1', d: 'Cada equipo se une con un regalo de 1 moneda', ic: '<circle cx="12" cy="12" r="9"/><path d="M10 9l2-1v8"/>' },
    { c: '#ff6bb5', t: 'Arrastra tu imagen', d: 'Suéltala encima del equipo y listo', ic: '<path d="M12 3v12M7 10l5 5 5-5M5 20h14"/>' },
    { c: '#ff0050', t: 'Regalos con poder', d: 'Cuanto más vale, más espectacular', ic: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>' },
    { c: '#00f0ff', t: 'Overlays en tres columnas', d: 'Lo que sale en tu live en el centro, sin bajar', ic: '<rect x="2" y="4" width="5" height="16" rx="1.5"/><rect x="9" y="4" width="6" height="16" rx="1.5"/><rect x="17" y="4" width="5" height="16" rx="1.5"/>' },
    { c: '#ff3d6e', t: 'Versus en 4 overlays', d: 'Tira y afloja, Duelo, Reto y Equipos', ic: '<rect x="2" y="9" width="20" height="6" rx="3"/><path d="M12 6v12"/>' },
    { c: '#2ee59d', t: 'Todos los regalos cuentan', d: '5 Confetis o 10 Universos seguidos, todos', ic: '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18"/>' },
  ],
};

(function () {
  const rejilla = document.getElementById('nv-rejilla');
  const etiqueta = document.getElementById('nv-version');
  if (!rejilla) return;
  rejilla.innerHTML = NOVEDADES_WEB.cosas.map(x => `
    <div class="nv-cosa reveal" style="--g:${x.c}">
      <span class="ic-caja"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${x.ic}</svg></span>
      <b>${x.t}</b><small>${x.d}</small>
    </div>`).join('');
  if (etiqueta) etiqueta.textContent = 'Versión ' + NOVEDADES_WEB.version;

  // La última versión publicada, leída de GitHub (si falla, se queda la de arriba)
  fetch('https://api.github.com/repos/davidrocaCOL/tikigames/releases/latest')
    .then(r => r.ok ? r.json() : null)
    .then(r => {
      if (!r || !r.tag_name || !etiqueta) return;
      const v = r.tag_name.replace(/^v/, '');
      const f = new Date(r.published_at).toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' });
      etiqueta.textContent = `Versión ${v} · ${f}`;
    })
    .catch(() => {});
})();
