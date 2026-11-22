/* ============================================
   TIKIGAMES - JUEGOS (pages/catalogo.html)
   Los 19 juegos: tarjetas, menú de categorías y ficha de cada uno.
   Va ANTES de 02-animaciones.js para que sus tarjetas también se animen.

   Para poner imágenes de un juego: guardarlas en assets/img/juegos/<id>/
   con los nombres 01.jpg, 02.jpg, 03.jpg y 04.jpg. Si falta alguna, la ficha
   enseña un hueco «Imagen próximamente» en su lugar.
   ============================================ */

const DESCARGA = 'https://github.com/davidrocaCOL/tikigames/releases/latest/download/TikiGames-Instalador.exe';

const CATEGORIAS = [
  { id: 'todos',    nombre: 'Todos',           color: '#eef0f6' },
  { id: 'carreras', nombre: 'Carreras',        color: '#ff0050' },
  { id: 'buenos',   nombre: 'Buenos vs malos', color: '#5aa9ff' },   // 22-nov-2026: tú (o los héroes) contra lo que manda el chat
  { id: 'juntos',   nombre: 'Todos juntos',    color: '#a78bfa' },   // todo el público a la vez, cada uno con lo suyo
  { id: 'equipos',  nombre: 'Rojo vs Azul',    color: '#00f0ff' },
  { id: 'futbol',   nombre: 'Fútbol',          color: '#3ddc97' },
  { id: 'paises',   nombre: 'Por países',      color: '#ffc13b' },
];

// texto: una línea para la tarjeta · largo: lo que dice la ficha (el texto de cada juego en la app, juegos.json)
// 22-nov-2026: la web al día con la app 1.2.47: los 19 juegos publicados, los más nuevos primero (sin los BETA)
const JUEGOS = [
  { id: 'futbolito', nombre: 'Futbolito', cats: ['futbol', 'paises'], nuevo: true,
    texto: 'Una mesa de futbolito con hasta 16 países.',
    largo: 'Una mesa de futbolito con hasta 16 países: cada uno con sus muñecos, su barra y su portería. Quien comenta su país se une a él; los taps patean balones y los regalos lanzan escudos, cañonazos que se tragan las bolas, tornados, posesiones, meteoritos y agujeros negros. Gana la ronda el país que más goles mete.' },
  { id: 'zumbaclass', nombre: 'Zumba Class', cats: ['juntos'], nuevo: true,
    texto: 'Una clase de zumba en directo.',
    largo: 'Una clase de zumba en directo: el profe y la profe marcan los pasos en su tarima y los alumnos, en filas detrás, los copian al ritmo de salsa, merengue y reggaetón. Cada regalo te mete en la clase como chico o chica, te cambia la ropa deportiva, te sube a bailar con el DJ o te hace el profe; el Quiéreme te pone de DJ, y también hay lluvia de confeti y máxima intensidad.' },
  { id: 'leavingearth', nombre: 'Leaving Earth', cats: ['juntos'], nuevo: true,
    texto: 'Un viaje por el espacio con tu directo.',
    largo: 'Un viaje por el espacio con tu directo: quien comenta hace fila y sube al cohete. La tripulación esquiva asteroides comentando izquierda o derecha, los taps y los regalos reparan la nave y la mejoran (hasta 500 plazas), y en cada planeta llega un mensaje alienígena por descifrar.' },
  { id: 'worldmap', nombre: 'World Map', cats: ['paises'], nuevo: true,
    texto: 'El mundo en 100 zonas para pintar.',
    largo: 'El mundo en 100 zonas: cada país lo va pintando con sus colores a punta de regalos y, con el mundo entero, tiene que aguantar 60 segundos con su escudo.' },
  { id: 'parchis', nombre: 'Parchís', cats: ['carreras', 'paises'], nuevo: true,
    texto: 'Carrera de figuritas en un parqués 3D.',
    largo: 'Carrera de figuritas por países en un parqués 3D sobre una mesa: los regalos, los tap-taps y los comentarios del directo mueven la ficha de cada país, con su música típica y efectos cada vez más grandes. Cada vuelta es un punto; gana el que más vueltas da cuando se acaba el tiempo.' },
  { id: 'neonrace', nombre: 'Neon Race', cats: ['carreras', 'paises'], nuevo: true,
    texto: 'Motos de luz en una ciudad de neón.',
    largo: 'Carrera de motos de luz en 3D por países, de noche, sobre una pista elevada en una ciudad de neón. Cada país tiene su moto con sus colores y deja una estela de luz con ellos. Los regalos y los taps las aceleran; gana el país que da más vueltas.' },
  { id: 'weddingparty', nombre: 'Wedding Party', cats: ['juntos'], nuevo: true,
    texto: 'La fiesta después de la boda.',
    largo: 'La fiesta después de la boda: los novios en su tarima, los invitados bailando salsa, merengue y reggaetón alrededor y la banda en vivo. Cada regalo da un papel en la fiesta (invitado, músico, novio o novia) o lanza el ramo, la lluvia de dinero o la fiesta disco.' },
  { id: 'trompobattle', nombre: 'Trompo Battle', cats: ['juntos'],
    texto: 'Todos contra todos con trompos.',
    largo: 'Todos contra todos con trompos: cada persona del directo tiene el suyo y los regalos lanzan poderes para tumbar a los demás. Gana el último en pie o el de más puntaje.' },
  { id: 'donttouchwater', nombre: 'Don’t Touch the Water', cats: ['buenos'],
    texto: 'Parkour a oscuras: no toques el agua.',
    largo: 'Parkour a oscuras por unos backrooms inundados, solo con tu linterna. Si tocas el agua, algo te oye y viene a por ti. 50 niveles en los que el directo te sube o te baja de nivel, te empuja, te deja sin batería… o te da un impulso.' },
  { id: 'animalrace', nombre: 'Animal Race', cats: ['carreras', 'paises'],
    texto: 'Carrera de animales en 3D por países.',
    largo: 'Carrera de animales en 3D por países: cada país tiene su animal y corre en una pista tipo Fórmula 1. Los regalos y los taps los hacen correr; gana el país que da más vueltas y sube al podio.' },
  { id: 'poolcleaning', nombre: 'Pool Cleaning', cats: ['buenos'],
    texto: 'Una piscina con un millón de bolas.',
    largo: 'Una piscina gigante con un millón de bolas. Los regalos la llenan o la vacían con una máquina enorme, y tú la limpias con tu manguera hasta dejarla vacía.' },
  { id: 'snakerun', nombre: 'Snake Run', cats: ['carreras', 'buenos'],
    texto: 'Runner 3D de héroes y villanos.',
    largo: 'Runner 3D: los regalos invocan héroes que empujan hacia la meta y villanos que empujan hacia atrás.' },
  { id: 'ballracing', nombre: 'Ball Racing', cats: ['carreras', 'paises'],
    texto: 'Carrera de canicas con ambiente de F1.',
    largo: 'Carrera de canicas con ambiente de F1. Los regalos dan poderes y el público corre por su país o por su cuenta.' },
  { id: 'chessbattle', nombre: 'Chess Battle', cats: ['equipos'],
    texto: 'Ajedrez 3D, rojo contra azul.',
    largo: 'Batalla de ajedrez en 3D, rojo contra azul. Cada regalo invoca una ficha para su bando, del peón a la reina, y gana el que derriba al rey rival.' },
  { id: 'towerup', nombre: 'Tower Up', cats: ['equipos'],
    texto: 'Dos torres de cubos, rojo contra azul.',
    largo: 'Dos torres de cubos, Rojo contra Azul. Regalos, taps y follows suman bloques a su equipo, y los regalos grandes atacan la torre rival.' },
  { id: 'poparena', nombre: 'Pop Arena', cats: ['equipos'],
    texto: 'Rojo contra azul en una arena redonda.',
    largo: 'Rojo contra azul en una arena redonda: los regalos sueltan bolitas de cada equipo y la pelota las revienta para sumar puntos. Quien más sume al final de la ronda se lleva el win.' },
  { id: 'dropclash', nombre: 'Drop Clash', cats: ['paises'],
    texto: 'Lluvia de fichas por países.',
    largo: 'Lluvia de fichas por países: los regalos sueltan fichas en el tablero y el país que más puntos suma se lleva la ronda.' },
  { id: 'mundialito', nombre: 'Mundialito', cats: ['futbol', 'paises'],
    texto: 'Torneo de fútbol por países.',
    largo: 'Torneo por países en el que la audiencia apoya a su selección hasta coronar al campeón. Clasificación, goleadores y récords que se guardan entre transmisiones.' },
  { id: 'carreritas', nombre: 'Carreritas', cats: ['carreras', 'paises'],
    texto: 'Carrera de animales por países.',
    largo: 'Carrera de animales por países. Cada país corre con los regalos, los taps y los follows de su gente, con turbos, multiplicadores y tarjetas.' },
];

const ICONO_WIN = '<svg class="icono-windows" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 5.5 10.5 4.5v7H3zM11.5 4.4 21 3v8.5h-9.5zM3 12.5h7.5v7L3 18.5zM11.5 12.5H21V21l-9.5-1.4z"/></svg>';
const ICONO_IMAGEN = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/></svg>';
const nombreCat = id => CATEGORIAS.find(c => c.id === id);
const portada = j => `../assets/img/portadas/portada-${j.id}.jpg`;
const galeria = j => ['01', '02', '03', '04'].map(n => `../assets/img/juegos/${j.id}/${n}.jpg`);

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
      ${j.nuevo ? '<span class="p-juego-nuevo">Nuevo</span>' : ''}
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
          ${fotos.map((f, n) => `<button type="button" class="jg-mini" data-foto="${f}"><img src="${f}" alt="Imagen ${n + 1}" loading="lazy" data-hueco /><span class="jg-hueco">${ICONO_IMAGEN}<small>Próximamente</small></span></button>`).join('')}
        </div>
        <ul class="jg-puntos">
          <li>Viene dentro de la app TikiGames</li>
          <li>Tu público juega con regalos, taps y follows</li>
          <li>Regalos, poderes y récords, a tu gusto desde la app</li>
          <li>Se conecta directo a tu TikTok Live</li>
        </ul>
        <div class="jg-acciones">
          <a class="btn btn-primary btn-lg btn-descargar" href="${DESCARGA}">${ICONO_WIN}<span>Descargar TikiGames</span></a>
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
