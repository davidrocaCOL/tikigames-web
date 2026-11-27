/* ============================================
   TIKIGAMES - JUEGOS (pages/catalogo.html)
   Tarjetas, menú de categorías y ficha de cada juego.
   Los datos (y la lectura de los juegos de la app) están en js/05a-juegos-datos.js.
   Va ANTES de 02-animaciones.js para que sus tarjetas también se animen.

   Para poner imágenes de un juego: guardarlas en assets/img/juegos/<id>/
   con los nombres 01.jpg, 02.jpg, 03.jpg y 04.jpg. Si falta alguna, la ficha
   enseña un hueco «Imagen próximamente» en su lugar.
   ============================================ */

const ICONO_WIN = '<svg class="icono-windows" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 5.5 10.5 4.5v7H3zM11.5 4.4 21 3v8.5h-9.5zM3 12.5h7.5v7L3 18.5zM11.5 12.5H21V21l-9.5-1.4z"/></svg>';
const ICONO_IMAGEN = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/></svg>';
const nombreCat = id => CATEGORIAS.find(c => c.id === id);
const galeria = j => ['01', '02', '03', '04'].map(n => `../assets/img/juegos/${j.id}/${n}.jpg`);
// (27-nov-2026) los mods llevan su propia etiqueta, como en la app: no son juegos de TikiGames
const CHIP_MOD = '<span style="--g:#8b8ca3">Mod · Steam</span>';
const chipsDe = j => j.cats.includes('mod') ? CHIP_MOD : j.cats.filter(nombreCat).map(c => `<span style="--g:${nombreCat(c).color}">${nombreCat(c).nombre}</span>`).join('');

// ─── Pestañas, menú y tarjetas ───
// pestaña: 'juegos' (los de TikiGames) o 'mods' (27-nov-2026: «Juegos TikiGames | Mods», como en la app)
let catElegida = 'todos';
let pestana = /^#mods?$/.test(location.hash) || MODS.some(m => '#' + m.id === location.hash) ? 'mods' : 'juegos';
function pintarPestanas() {
  const p = document.getElementById('jg-pestanas');
  if (!p) return;
  p.innerHTML = `<button type="button" class="jg-pestana${pestana === 'juegos' ? ' on' : ''}" data-pestana="juegos">Juegos TikiGames <b>${LISTA_JUEGOS.length}</b></button>`
    + (LISTA_MODS.length ? `<button type="button" class="jg-pestana${pestana === 'mods' ? ' on' : ''}" data-pestana="mods">Mods <b>${LISTA_MODS.length}</b></button>` : '');
}
function pintarCatalogo() {
  const menu = document.getElementById('jg-menu');
  const rejilla = document.getElementById('jg-rejilla');
  if (!menu || !rejilla) return;
  if (!LISTA_MODS.length) pestana = 'juegos';
  pintarPestanas();
  const enMods = pestana === 'mods';
  const lista = enMods ? LISTA_MODS : LISTA_JUEGOS;
  menu.hidden = enMods;
  const nota = document.getElementById('jg-nota-mods');
  if (nota) nota.hidden = !enMods;
  menu.innerHTML = CATEGORIAS.map(c => {
    const n = c.id === 'todos' ? lista.length : lista.filter(j => j.cats.includes(c.id)).length;
    return `<button type="button" class="jg-filtro${c.id === catElegida ? ' on' : ''}" data-cat="${c.id}" style="--g:${c.color}"><i></i>${c.nombre}<b>${n}</b></button>`;
  }).join('');
  rejilla.innerHTML = lista.map(j => {
    const fuera = !enMods && catElegida !== 'todos' && !j.cats.includes(catElegida);
    return `
    <button type="button" class="p-juego jg-tarjeta reveal${fuera ? ' jg-oculto' : ''}" data-juego="${j.id}" data-cats="${j.cats.join(' ')}" aria-label="Ver ${limpio(j.nombre)}">
      <img src="${limpio(portadaDe(j))}" alt="" loading="lazy" width="600" height="800" />
      <span class="jg-chips">${chipsDe(j)}</span>
      ${j.nuevo ? '<span class="p-juego-nuevo">Nuevo</span>' : ''}
      <span class="p-juego-texto"><span class="jc-titulo">${limpio(j.nombre)}</span><span class="jg-linea">${limpio(j.texto)}</span><span class="jg-ver">Ver ${enMods ? 'mod' : 'juego'} →</span></span>
    </button>`;
  }).join('');
  // si la lista cambió después de cargar (un juego nuevo de la app), las tarjetas nuevas también se animan
  if (window.revelar) rejilla.querySelectorAll('.reveal').forEach(window.revelar);
}

(function () {
  const menu = document.getElementById('jg-menu');
  const rejilla = document.getElementById('jg-rejilla');
  if (!menu || !rejilla) return;
  pintarCatalogo();
  // lo que llega después de la app (un juego o un mod nuevo): se repinta y, si el enlace era a él, se abre su ficha
  const alLlegar = lista => {
    pintarCatalogo();
    const id = location.hash.slice(1);
    const capa = document.getElementById('jg-ficha');
    if (id && capa && capa.hidden && lista.some(j => j.id === id)) abrirFicha(id);
  };
  cargarJuegosVivos(alLlegar);
  cargarModsVivos(alLlegar);
  const pest = document.getElementById('jg-pestanas');
  if (pest) pest.addEventListener('click', e => {
    const b = e.target.closest('.jg-pestana');
    if (!b || b.dataset.pestana === pestana) return;
    pestana = b.dataset.pestana;
    pintarCatalogo();
    history.replaceState(null, '', pestana === 'mods' ? '#mods' : location.pathname);
    let i = 0;
    rejilla.querySelectorAll('.jg-tarjeta').forEach(t => { t.style.setProperty('--jg-d', (i++ * 0.05) + 's'); t.classList.add('visible', 'jg-entra'); });
  });

  // Al elegir una categoría: las que no son se van y las que quedan vuelven a entrar una detrás de otra
  menu.addEventListener('click', e => {
    const b = e.target.closest('.jg-filtro');
    if (!b) return;
    catElegida = b.dataset.cat;
    menu.querySelectorAll('.jg-filtro').forEach(x => x.classList.toggle('on', x === b));
    let i = 0;
    rejilla.querySelectorAll('.jg-tarjeta').forEach(t => {
      const sale = b.dataset.cat !== 'todos' && !t.dataset.cats.split(' ').includes(b.dataset.cat);
      t.classList.toggle('jg-oculto', sale);
      t.classList.remove('jg-entra');
      if (!sale) { t.style.setProperty('--jg-d', (i++ * 0.05) + 's'); void t.offsetWidth; t.classList.add('jg-entra'); }
    });
  });

  rejilla.addEventListener('click', e => {
    const t = e.target.closest('.jg-tarjeta');
    if (t) abrirFicha(t.dataset.juego);
  });
})();

// ─── Ficha de cada juego (ventana de cristal, como en la app) ───
function abrirFicha(id) {
  const j = LISTA_JUEGOS.find(x => x.id === id) || LISTA_MODS.find(x => x.id === id);
  const esMod = !!j && j.cats.includes('mod');
  const capa = document.getElementById('jg-ficha');
  if (!j || !capa) return;
  const fotos = galeria(j);
  const tapa = limpio(portadaDe(j)), nombre = limpio(j.nombre);
  capa.innerHTML = `
    <div class="jg-ventana" role="dialog" aria-modal="true" aria-label="${nombre}">
      <button type="button" class="jg-cerrar" data-cerrar aria-label="Cerrar">✕</button>
      <div class="jg-grande"><img src="${tapa}" alt="${nombre}" /></div>
      <div class="jg-info">
        <span class="jg-chips">${chipsDe(j)}</span>
        <h2 class="jc-titulo">${nombre}</h2>
        <p>${limpio(j.largo)}</p>
        <div class="jg-galeria">
          <button type="button" class="jg-mini on" data-foto="${tapa}"><img src="${tapa}" alt="Portada" /></button>
          ${fotos.map((f, n) => `<button type="button" class="jg-mini" data-foto="${f}"><img src="${f}" alt="Imagen ${n + 1}" loading="lazy" data-hueco /><span class="jg-hueco">${ICONO_IMAGEN}<small>Próximamente</small></span></button>`).join('')}
        </div>
        <ul class="jg-puntos">${esMod ? `
          <li>Es un mod para la demo gratis de <b>${nombre}</b> en Steam${j.autor ? `, de su creador ${limpio(j.autor)}` : ''}</li>
          <li>La app TikiGames lo instala sola en 3 pasos: Steam, la demo y el mod</li>
          <li>Tu público juega con regalos, taps y follows</li>
          <li>Regalos y wins, a tu gusto desde la app</li>` : `
          <li>Viene dentro de la app TikiGames</li>
          <li>Tu público juega con regalos, taps y follows</li>
          <li>Regalos, poderes y récords, a tu gusto desde la app</li>
          <li>Se conecta directo a tu TikTok Live</li>`}
        </ul>
        <div class="jg-acciones">
          <a class="btn btn-primary btn-lg btn-descargar" href="${DESCARGA}">${ICONO_WIN}<span>Descargar TikiGames</span></a>
          ${esMod && /^https:\/\/store\.steampowered\.com\//.test(j.tienda || '') ? `<a class="btn btn-outline btn-lg" href="${limpio(j.tienda)}" target="_blank" rel="noopener">Ver el juego en Steam</a>` : ''}
        </div>
        <small class="jg-nota">Gratis · Para Windows 10 y 11</small>
      </div>
    </div>`;
  // la foto que aún no existe deja su hueco «Próximamente» (sin código dentro del HTML: la web no lo permite)
  capa.querySelectorAll('img[data-hueco]').forEach(im => im.addEventListener('error', () => {
    im.parentElement.classList.add('vacio'); im.remove();
  }, { once: true }));
  capa.hidden = false;
  capa.classList.remove('cerrando');
  document.documentElement.classList.add('sin-scroll');
  history.replaceState(null, '', '#' + j.id);
  capa.querySelector('.jg-cerrar').focus({ preventScroll: true });
}

function cerrarFicha() {
  const capa = document.getElementById('jg-ficha');
  if (!capa || capa.hidden) return;
  capa.classList.add('cerrando');
  setTimeout(() => { capa.hidden = true; capa.innerHTML = ''; }, 230);
  document.documentElement.classList.remove('sin-scroll');
  history.replaceState(null, '', pestana === 'mods' ? '#mods' : location.pathname);
}

(function () {
  const capa = document.getElementById('jg-ficha');
  if (!capa) return;
  capa.addEventListener('click', e => {
    if (e.target === capa || e.target.closest('[data-cerrar]')) return cerrarFicha();
    const m = e.target.closest('.jg-mini');
    if (m && !m.classList.contains('vacio')) {
      capa.querySelectorAll('.jg-mini').forEach(x => x.classList.toggle('on', x === m));
      const g = capa.querySelector('.jg-grande img');
      g.classList.remove('jg-cambia'); void g.offsetWidth;
      g.src = m.dataset.foto; g.classList.add('jg-cambia');
    }
  });
  addEventListener('keydown', e => { if (e.key === 'Escape') cerrarFicha(); });
  // Enlace directo a un juego: pages/catalogo.html#ballracing
  const id = location.hash.slice(1);
  if (LISTA_JUEGOS.some(j => j.id === id) || LISTA_MODS.some(j => j.id === id)) setTimeout(() => abrirFicha(id), 350);
})();
