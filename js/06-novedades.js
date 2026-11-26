/* ============================================
   TIKIGAMES - NOVEDADES DE LA APP (pages/comunidad.html)
   Las mismas tarjetas que enseña la app en «X cosas nuevas»
   (TikiGames/js/13y-novedades.js; 26-nov-2026: las de la 1.2.54: World Map 3D, la Configuración en lista y VacBot Simulator).
   Cuando la app saque una versión con
   novedades nuevas, se copian aquí arriba.
   El número de la última versión y su fecha se leen solos de GitHub.
   Va ANTES de 02-animaciones.js para que las tarjetas también se animen.
   ============================================ */

const NOVEDADES_WEB = {
  version: '1.2.54',   // (solo se ve un instante: la versión publicada se lee de GitHub)
  entrada: '1.2.54',   // la entrada de NOVEDADES (TikiGames/js/13y-novedades.js) de la que salen estas tarjetas; la revisión automática la compara
  cosas: [
    { c: '#ff0050', t: 'World Map 3D ya está', d: 'Cada país sube en el mundo, capa a capa', ic: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>' },
    { c: '#ff0050', t: 'Configuración en lista', d: 'Añade, cambia o quita cualquier regalo, como quieras', ic: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>' },
    { c: '#ff0050', t: 'Tres juegos a tu manera', d: 'Stairs to Heaven, Shred a Billion y VacBot Simulator', ic: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>' },
    { c: '#ff0050', t: 'Probar y detener', d: 'Pruebas un regalo y lo paras cuando quieras', ic: '<rect x="6" y="6" width="12" height="12" rx="2"/>' },
    { c: '#ff0050', t: 'Arranque más limpio', d: 'La app abre sin ventana blanca', ic: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>' },
    { c: '#ff0050', t: 'VacBot Simulator ya está', d: 'Tu chat llena la casa de confeti y tú la limpias · en Juegos → Mods', ic: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v2M4 12h2"/>' },
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
