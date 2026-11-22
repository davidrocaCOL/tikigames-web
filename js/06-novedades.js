/* ============================================
   TIKIGAMES - NOVEDADES DE LA APP (pages/comunidad.html)
   Las mismas tarjetas que enseña la app en «X cosas nuevas»
   (TikiGames/js/13y-novedades.js; 22-nov-2026: las de la 1.2.48, lo mejor de la 1.2.30 a la 1.2.47).
   Cuando la app saque una versión con
   novedades nuevas, se copian aquí arriba.
   El número de la última versión y su fecha se leen solos de GitHub.
   Va ANTES de 02-animaciones.js para que las tarjetas también se animen.
   ============================================ */

const NOVEDADES_WEB = {
  version: '1.2.47',
  cosas: [
    { c: '#ff0050', t: 'Siete juegos nuevos', d: 'Futbolito, Zumba Class, Leaving Earth, World Map y más', ic: '<rect x="2" y="6" width="20" height="12" rx="4.5"/><path d="M7 10.2v3.6M5.2 12h3.6"/><circle cx="16" cy="10.8" r="1.3"/><circle cx="18.2" cy="13.2" r="1.3"/>' },
    { c: '#ff0050', t: 'Juegos a tu cámara', d: 'En Live Studio: Completo o Cuadrado', ic: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4M10 9l4 1.5-4 1.5z"/>' },
    { c: '#ff0050', t: 'Barras del live', d: 'Nivel, club de fans, regalos y entrada VIP', ic: '<path d="M5 20v-8M12 20V5M19 20v-5"/>' },
    { c: '#ff0050', t: 'Marcos MVP', d: 'Quien más dona, con su foto e insignias', ic: '<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8z"/>' },
    { c: '#ff0050', t: 'Wins y Podio', d: 'Dos overlays nuevos para tus juegos', ic: '<path d="M8 21V11H3v10M15 21V7h-6v14M21 21V14h-6v7"/>' },
    { c: '#ff0050', t: 'Tu propio tema', d: 'Marco, efectos y colores, en todos tus overlays', ic: '<path d="M12 3a9 9 0 100 18c1 0 1.5-.8 1.5-1.5 0-.9-.7-1.2-.7-2.1 0-.8.6-1.4 1.4-1.4H17a4 4 0 004-4c0-4.4-4-9-9-9z"/><circle cx="7.5" cy="11.5" r="1"/><circle cx="10.5" cy="7.5" r="1"/><circle cx="15" cy="8" r="1"/>' },
    { c: '#ff0050', t: 'Overlays más fluidos', d: 'Galería con fotos y animaciones sin tirones', ic: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>' },
    { c: '#ff0050', t: 'Batalla: entra comentando', d: 'Cualquier regalo suma al equipo que comentaste', ic: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>' },
    { c: '#ff0050', t: 'Escena con tu cámara', d: 'Tu cámara como una capa más', ic: '<rect x="2" y="6" width="13" height="12" rx="2"/><path d="M15 10.5l6-3.5v10l-6-3.5z"/>' },
    { c: '#ff0050', t: 'Tu plan, al momento', d: 'Cambias de cuenta y los candados se van solos', ic: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 017.6-1.7"/>' },
  ],
};

(function () {
  const rejilla = document.getElementById('nv-rejilla');
  const etiqueta = document.getElementById('nv-version');
  if (!rejilla) return;
  // filas parejas, como en la app: 8 = 4 y 4, 10 = 5 y 5…
  const n = NOVEDADES_WEB.cosas.length;
  rejilla.style.setProperty('--cols', n <= 5 ? n : n % 2 === 0 && n / 2 <= 5 ? n / 2 : [3, 4, 5].find(c => n % c === 0 && n / c <= 4) || Math.ceil(n / Math.ceil(n / 5)));
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
