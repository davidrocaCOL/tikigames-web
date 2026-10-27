/* ============================================
   TIKIGAMES - JUEGOS (pages/catalogo.html)
   Los 9 juegos: tarjetas, menú de categorías y ficha de cada uno.
   Va ANTES de 02-animaciones.js para que sus tarjetas también se animen.

   Para poner imágenes de un juego: guardarlas en assets/img/juegos/<id>/
   con los nombres 01.jpg, 02.jpg, 03.jpg y 04.jpg. Si falta alguna, la ficha
   enseña un hueco «Imagen próximamente» en su lugar.
   ============================================ */

const DESCARGA = 'https://github.com/davidrocaCOL/tikigames/releases/latest/download/TikiGames-Instalador.exe';

const CATEGORIAS = [
  { id: 'todos',    nombre: 'Todos',         color: '#eef0f6' },
  { id: 'carreras', nombre: 'Carreras',      color: '#ff0050' },
  { id: 'futbol',   nombre: 'Fútbol',        color: '#3ddc97' },
  { id: 'equipos',  nombre: 'Rojo vs Azul',  color: '#00f0ff' },
  { id: 'paises',   nombre: 'Por países',    color: '#ffc13b' },
];

// texto: una línea para la tarjeta · largo: lo que dice la ficha (sale de la ficha tikigames.json de cada juego)
const JUEGOS = [
  { id: 'ballracing', nombre: 'Ball Racing', cats: ['carreras', 'paises'],
    texto: 'Carrera de canicas con ambiente de F1.',
    largo: 'Carrera de canicas con ambiente de F1. Los regalos dan poderes y el público corre por su país o por su cuenta.' },
  { id: 'mundialito', nombre: 'Mundialito', cats: ['futbol', 'paises'], pagina: 'mundialito.html',
    texto: 'Torneo de fútbol por países.',
    largo: 'Torneo por países en el que la audiencia apoya a su selección hasta coronar al campeón. Clasificación, goleadores y récords que se guardan entre transmisiones.',
    galeria: ['../assets/img/juegos/mundialito_torneo.jpg', '../assets/img/juegos/slide_puntos.png', '../assets/img/juegos/slide_multiplicadores.png', '../assets/img/juegos/slide_reconocimientos.png'] },
  { id: 'carreritas', nombre: 'Carreritas', cats: ['carreras', 'paises'], pagina: 'carreritas.html',
    texto: 'Carrera de animales por países.',
    largo: 'Carrera de animales por países. Cada país corre con los regalos, los taps y los follows de su gente, con turbos, multiplicadores y tarjetas.',
    galeria: ['../assets/img/juegos/carreritas_1_portada.jpg', '../assets/img/juegos/carreritas_2_poderes.jpg', '../assets/img/juegos/carreritas_3_multiplicadores.jpg', '../assets/img/juegos/carreritas_4_modos.jpg'] },
  { id: 'octogol', nombre: 'Octogol', cats: ['futbol', 'paises'],
    texto: 'Ocho países en un octágono.',
    largo: 'Ocho países en un octágono, cada uno con su cañón y su portería. Los regalos disparan balones, escudos, tornados y meteoritos; gana el país con más goles.' },
  { id: 'poparena', nombre: 'Pop Arena', cats: ['equipos'],
    texto: 'Rojo contra azul en una arena redonda.',
    largo: 'Rojo contra azul en una arena redonda: los regalos sueltan bolitas de cada equipo y la pelota las revienta para sumar puntos. Quien más sume al final de la ronda se lleva el win.' },
  { id: 'dropclash', nombre: 'Drop Clash', cats: ['paises'],
    texto: 'Lluvia de fichas por países.',
    largo: 'Lluvia de fichas por países: los regalos sueltan fichas en el tablero y el país que más puntos suma se lleva la ronda.' },
  { id: 'chessbattle', nombre: 'Chess Battle', cats: ['equipos'],
    texto: 'Ajedrez 3D, rojo contra azul.',
    largo: 'Batalla de ajedrez en 3D, rojo contra azul. Cada regalo invoca una ficha para su bando, del peón a la reina, y gana el que derriba al rey rival.' },
  { id: 'towerup', nombre: 'Tower Up', cats: ['equipos'],
    texto: 'Dos torres de cubos, rojo contra azul.',
    largo: 'Dos torres de cubos, Rojo contra Azul. Regalos, taps y follows suman bloques a su equipo, y los regalos grandes atacan la torre rival.' },
  { id: 'snakerun', nombre: 'Snake Run', cats: ['carreras'],
    texto: 'Runner 3D de héroes y villanos.',
    largo: 'Runner 3D: los regalos invocan héroes que empujan hacia la meta y villanos que empujan hacia atrás.' },
];

const ICONO_WIN = '<svg class="icono-windows" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 5.5 10.5 4.5v7H3zM11.5 4.4 21 3v8.5h-9.5zM3 12.5h7.5v7L3 18.5zM11.5 12.5H21V21l-9.5-1.4z"/></svg>';
const ICONO_IMAGEN = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/></svg>';
const nombreCat = id => CATEGORIAS.find(c => c.id === id);
const portada = j => `../assets/img/portadas/portada-${j.id}.jpg`;
const galeria = j => j.galeria || ['01', '02', '03', '04'].map(n => `../assets/img/juegos/${j.id}/${n}.jpg`);

// ─── Menú y tarjetas ───
(function () {
  const menu = document.getElementById('jg-menu');
  const rejilla = document.getElementById('jg-rejilla');
  if (!menu || !rejilla) return;

  menu.innerHTML = CATEGORIAS.map(c => {
    const n = c.id === 'todos' ? JUEGOS.length : JUEGOS.filter(j => j.cats.includes(c.id)).length;
    return `<button type="button" class="jg-filtro${c.id === 'todos' ? ' on' : ''}" data-cat="${c.id}" style="--g:${c.color}"><i></i>${c.nombre}<b>${n}</b></button>`;
  }).join('');

  rejilla.innerHTML = JUEGOS.map(j => `
    <button type="button" class="p-juego jg-tarjeta reveal" data-juego="${j.id}" data-cats="${j.cats.join(' ')}" aria-label="Ver ${j.nombre}">
      <img src="${portada(j)}" alt="" loading="lazy" width="600" height="800" />
      <span class="jg-chips">${j.cats.map(c => `<span style="--g:${nombreCat(c).color}">${nombreCat(c).nombre}</span>`).join('')}</span>
      <span class="p-juego-texto"><span class="jc-titulo">${j.nombre}</span><span class="jg-linea">${j.texto}</span><span class="jg-ver">Ver juego →</span></span>
    </button>`).join('');

  // Al elegir una categoría: las que no son se van y las que quedan vuelven a entrar una detrás de otra
  menu.addEventListener('click', e => {
    const b = e.target.closest('.jg-filtro');
    if (!b) return;
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
  const j = JUEGOS.find(x => x.id === id);
  const capa = document.getElementById('jg-ficha');
  if (!j || !capa) return;
  const fotos = galeria(j);
  capa.innerHTML = `
    <div class="jg-ventana" role="dialog" aria-modal="true" aria-label="${j.nombre}">
      <button type="button" class="jg-cerrar" data-cerrar aria-label="Cerrar">✕</button>
      <div class="jg-grande"><img src="${portada(j)}" alt="${j.nombre}" /></div>
      <div class="jg-info">
        <span class="jg-chips">${j.cats.map(c => `<span style="--g:${nombreCat(c).color}">${nombreCat(c).nombre}</span>`).join('')}</span>
        <h2 class="jc-titulo">${j.nombre}</h2>
        <p>${j.largo}</p>
        <div class="jg-galeria">
          <button type="button" class="jg-mini on" data-foto="${portada(j)}"><img src="${portada(j)}" alt="Portada" /></button>
          ${fotos.map((f, n) => `<button type="button" class="jg-mini" data-foto="${f}"><img src="${f}" alt="Imagen ${n + 1}" loading="lazy" onerror="this.parentElement.classList.add('vacio');this.remove()" /><span class="jg-hueco">${ICONO_IMAGEN}<small>Próximamente</small></span></button>`).join('')}
        </div>
        <ul class="jg-puntos">
          <li>Viene dentro de la app TikiGames</li>
          <li>Tu público juega con regalos, taps y follows</li>
          <li>Se conecta directo a tu TikTok Live</li>
        </ul>
        <div class="jg-acciones">
          <a class="btn btn-primary btn-lg btn-descargar" href="${DESCARGA}">${ICONO_WIN}<span>Descargar TikiGames</span></a>
          ${j.pagina ? `<a class="btn btn-outline btn-lg" href="${j.pagina}">Ver más</a>` : ''}
        </div>
        <small class="jg-nota">Gratis · Para Windows 10 y 11</small>
      </div>
    </div>`;
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
  history.replaceState(null, '', location.pathname);
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
  if (JUEGOS.some(j => j.id === id)) setTimeout(() => abrirFicha(id), 350);
})();
