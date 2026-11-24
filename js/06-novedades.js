/* ============================================
   TIKIGAMES - NOVEDADES DE LA APP (pages/comunidad.html)
   Las mismas tarjetas que enseña la app en «X cosas nuevas»
   (TikiGames/js/13y-novedades.js; 24-nov-2026: las de la 1.2.50: Stairs to Heaven, Shred a Billion y lo mejor de la 1.2.48).
   Cuando la app saque una versión con
   novedades nuevas, se copian aquí arriba.
   El número de la última versión y su fecha se leen solos de GitHub.
   Va ANTES de 02-animaciones.js para que las tarjetas también se animen.
   ============================================ */

const NOVEDADES_WEB = {
  version: '1.2.50',   // (solo se ve un instante: la versión publicada se lee de GitHub)
  entrada: '1.2.50',   // la entrada de NOVEDADES (TikiGames/js/13y-novedades.js) de la que salen estas tarjetas; la revisión automática la compara
  cosas: [
    { c: '#ff0050', t: 'Stairs to Heaven, a tu manera', d: 'Cualquier regalo, escalones o wins, y escribes el número', ic: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>' },
    { c: '#ff0050', t: 'Shred a Billion ya está', d: 'Vacía la bóveda con tu chat · en Juegos → Mods', ic: '<path d="M10 3.5a2 2 0 014 0V6h4a1 1 0 011 1v4h-2.5a2 2 0 000 4H19v4a1 1 0 01-1 1h-4v-2.5a2 2 0 00-4 0V20H6a1 1 0 01-1-1v-4h2.5a2 2 0 000-4H5V7a1 1 0 011-1h4z"/>' },
    { c: '#ff0050', t: 'Siete juegos nuevos', d: 'Futbolito, Zumba Class, Leaving Earth, World Map y más', ic: '<rect x="2" y="6" width="20" height="12" rx="4.5"/><path d="M7 10.2v3.6M5.2 12h3.6"/><circle cx="16" cy="10.8" r="1.3"/><circle cx="18.2" cy="13.2" r="1.3"/>' },
    { c: '#ff0050', t: 'Juegos a tu cámara', d: 'En Live Studio: Completo o Cuadrado', ic: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4M10 9l4 1.5-4 1.5z"/>' },
    { c: '#ff0050', t: 'Barras del live', d: 'Nivel, club de fans, regalos y entrada VIP', ic: '<path d="M5 20v-8M12 20V5M19 20v-5"/>' },
    { c: '#ff0050', t: 'Marcos MVP', d: 'Quien más dona, con su foto e insignias', ic: '<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8z"/>' },
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
