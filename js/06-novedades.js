/* ============================================
   TIKIGAMES - NOVEDADES DE LA APP (pages/comunidad.html)
   Las mismas tarjetas que enseña la app en «X cosas nuevas»
   (TikiGames/js/13y-novedades.js). Cuando la app saque una versión con
   novedades nuevas, se copian aquí arriba.
   El número de la última versión y su fecha se leen solos de GitHub.
   Va ANTES de 02-animaciones.js para que las tarjetas también se animen.
   ============================================ */

const NOVEDADES_WEB = {
  version: '1.1.9',
  cosas: [
    { c: '#a78bfa', t: 'Stream Deck a tu medida', d: 'Consola nueva, hasta 10×10 y teclado numérico', ic: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>' },
    { c: '#00f0ff', t: 'Escena a tu medida', d: 'Los recuadros se ajustan solos y se recortan desde los lados', ic: '<path d="M6 2v14a2 2 0 002 2h14M2 6h14a2 2 0 012 2v14"/>' },
    { c: '#ff2d55', t: 'En vivo ahora', d: 'Los lives que más se ven en tu región', ic: '<circle cx="12" cy="12" r="2"/><path d="M7.8 7.8a6 6 0 000 8.4M16.2 7.8a6 6 0 010 8.4M5 5a10 10 0 000 14M19 5a10 10 0 010 14"/>' },
    { c: '#3ddc97', t: 'Tus números de TikTok', d: '60 días de diamantes, lives y seguidores', ic: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>' },
    { c: '#ffc13b', t: 'Inicio renovado', d: 'Tu último live y tu plan de un vistazo', ic: '<path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"/>' },
    { c: '#00c2ff', t: 'Arrastra y ordena', d: 'Tarjetas que se mueven suaves, con sus puntitos', ic: '<circle cx="9" cy="6" r="1.4"/><circle cx="15" cy="6" r="1.4"/><circle cx="9" cy="12" r="1.4"/><circle cx="15" cy="12" r="1.4"/><circle cx="9" cy="18" r="1.4"/><circle cx="15" cy="18" r="1.4"/>' },
    { c: '#ff6bb5', t: 'Regalos populares', d: 'Los que más te mandan, primero', ic: '<path d="M12 2c1 4 5 5 5 10a5 5 0 01-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3-1-5 1-8.5z"/>' },
    { c: '#ffc13b', t: 'Juegos al instante', d: 'Listos para jugar desde que abres la app', ic: '<rect x="2" y="6" width="20" height="12" rx="4"/><path d="M7 10v4M5 12h4M16 11h.01M18 13h.01"/>' },
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
