/* ===========================================================
   TikiGames · Guía de instalación (3-nov-2026, Ace)
   «Cuando alguien le da a descargar, que baje el instalador y que se abra una ventanita con la guía
   visual»: el instalador aún no lleva firma digital y Windows enseña «Windows protegió su PC». La guía
   dice, con dibujos que imitan lo que se ve, qué tocar: Conservar → Más información → Ejecutar de todas
   formas. La descarga NO se frena: el enlace sigue funcionando y la guía sale encima.
   Sirve para cualquier enlace al instalador (también los que se crean solos, como los de las fichas).
   =========================================================== */
(function () {
  const INSTALADOR = 'TikiGames-Instalador.exe';
  const TEXTOS = {
    es: {
      tit: 'Tu descarga empezó', sub: 'Abre el instalador cuando termine. Windows puede avisar porque TikiGames es nuevo: es normal.',
      p1: 'Si tu navegador pregunta', p1b: 'Toca «Conservar»',
      p2: 'Si sale este aviso azul', p2b: 'Toca «Más información»',
      p3: 'Y después', p3b: 'Toca «Ejecutar de todas formas»',
      nav: 'TikiGames-Instalador.exe no se descarga habitualmente.', conservar: 'Conservar', eliminar: 'Eliminar',
      win: 'Windows protegió su PC', wintxt: 'Windows SmartScreen impidió el inicio de una aplicación no reconocida.',
      mas: 'Más información', app: 'Aplicación:', editor: 'Editor:', desconocido: 'Editor desconocido',
      ejecutar: 'Ejecutar de todas formas', noejecutar: 'No ejecutar',
      listo: 'Entendido', otra: '¿No empezó? Descargar de nuevo', cerrar: 'Cerrar'
    },
    en: {
      tit: 'Your download has started', sub: 'Open the installer when it finishes. Windows may warn you because TikiGames is new: that is normal.',
      p1: 'If your browser asks', p1b: 'Click «Keep»',
      p2: 'If this blue warning shows up', p2b: 'Click «More info»',
      p3: 'Then', p3b: 'Click «Run anyway»',
      nav: 'TikiGames-Instalador.exe isn’t commonly downloaded.', conservar: 'Keep', eliminar: 'Delete',
      win: 'Windows protected your PC', wintxt: 'Microsoft Defender SmartScreen prevented an unrecognized app from starting.',
      mas: 'More info', app: 'App:', editor: 'Publisher:', desconocido: 'Unknown publisher',
      ejecutar: 'Run anyway', noejecutar: 'Don’t run',
      listo: 'Got it', otra: 'Didn’t start? Download again', cerrar: 'Close'
    }
  };
  const idioma = () => { try { return TEXTOS[localStorage.getItem('tg_lang')] ? localStorage.getItem('tg_lang') : 'es'; } catch (e) { return 'es'; } };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // el escudo de Windows, dibujado (sin imágenes de Microsoft)
  const ESCUDO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 6v6M12 15.5v.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  let caja = null, enlace = '';
  function pintar() {
    const t = TEXTOS[idioma()];
    caja.innerHTML = `
      <div class="guia" role="dialog" aria-modal="true" aria-labelledby="guia-tit">
        <button class="guia-x" type="button" data-guia-cerrar aria-label="${esc(t.cerrar)}">✕</button>
        <div class="guia-cab">
          <span class="guia-bajando"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg></span>
          <h2 id="guia-tit">${esc(t.tit)}</h2>
          <p>${esc(t.sub)}</p>
        </div>
        <ol class="guia-pasos">
          <li class="guia-paso">
            <span class="guia-num">1</span>
            <div class="guia-que"><small>${esc(t.p1)}</small><b>${esc(t.p1b)}</b></div>
            <div class="guia-dibujo nav">
              <div class="nav-fila"><span class="nav-aviso">!</span><span class="nav-txt">${esc(t.nav)}</span></div>
              <div class="nav-botones"><span class="w-boton luz">${esc(t.conservar)}</span><span class="w-boton">${esc(t.eliminar)}</span></div>
            </div>
          </li>
          <li class="guia-paso">
            <span class="guia-num">2</span>
            <div class="guia-que"><small>${esc(t.p2)}</small><b>${esc(t.p2b)}</b></div>
            <div class="guia-dibujo win">
              <span class="win-escudo">${ESCUDO}</span>
              <b class="win-tit">${esc(t.win)}</b>
              <span class="win-txt">${esc(t.wintxt)}</span>
              <span class="win-mas luz">${esc(t.mas)}</span>
              <div class="win-pie"><span class="w-boton oscuro">${esc(t.noejecutar)}</span></div>
            </div>
          </li>
          <li class="guia-paso">
            <span class="guia-num">3</span>
            <div class="guia-que"><small>${esc(t.p3)}</small><b>${esc(t.p3b)}</b></div>
            <div class="guia-dibujo win">
              <span class="win-escudo">${ESCUDO}</span>
              <b class="win-tit">${esc(t.win)}</b>
              <span class="win-dato">${esc(t.app)} <i>${INSTALADOR}</i></span>
              <span class="win-dato">${esc(t.editor)} <i>${esc(t.desconocido)}</i></span>
              <div class="win-pie"><span class="w-boton oscuro luz">${esc(t.ejecutar)}</span><span class="w-boton oscuro">${esc(t.noejecutar)}</span></div>
            </div>
          </li>
        </ol>
        <div class="guia-pie">
          <a class="guia-otra" href="${esc(enlace)}" data-guia-otra>${esc(t.otra)}</a>
          <button class="btn btn-primary guia-listo" type="button" data-guia-cerrar>${esc(t.listo)}</button>
        </div>
      </div>`;
  }
  function abrir(href) {
    enlace = href;
    if (!caja) {
      caja = document.createElement('div');
      caja.className = 'guia-fondo';
      caja.addEventListener('click', e => { if (e.target === caja || e.target.closest('[data-guia-cerrar]')) cerrar(); });
      document.body.appendChild(caja);
    }
    pintar();
    document.body.classList.add('guia-abierta');
    requestAnimationFrame(() => caja.classList.add('abierta'));
    setTimeout(() => { const b = caja.querySelector('.guia-listo'); if (b) b.focus({ preventScroll: true }); }, 50);
  }
  function cerrar() {
    if (!caja) return;
    caja.classList.remove('abierta');
    document.body.classList.remove('guia-abierta');
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && caja && caja.classList.contains('abierta')) cerrar(); });
  // cualquier enlace al instalador: la descarga sigue su camino y la guía sale encima
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href*="' + INSTALADOR + '"]');
    if (!a || a.hasAttribute('data-guia-otra')) return;
    abrir(a.href);
  });
})();
