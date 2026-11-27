/* ============================================
   TIKIGAMES - LOS JUEGOS (datos)
   La lista de juegos que usan la portada (js/05b-juegos-portada.js) y la página
   Juegos (js/05-juegos.js), y la lectura de los juegos de la app (abajo).
   Va ANTES de esos dos.
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
  // 26-nov-2026 (revisión automática): World Map 3D, de la app 1.2.54
  { id: 'worldmap3d', nombre: 'World Map 3D', cats: ['paises'], nuevo: true,
    texto: 'La Tierra en 3D, capa a capa.',
    largo: 'La Tierra en 3D: cada país sube capa a capa con los colores de su bandera y la foto de quien puso la última. Gana la ronda el que más metros tenga.' },
  // 24-nov-2026 (revisión automática): Stairs to Heaven, de la app 1.2.50
  { id: 'stairstoheaven', nombre: 'Stairs to Heaven', cats: ['buenos'], nuevo: true,
    texto: 'Escalera al cielo: buenos contra malos.',
    largo: 'Escalera al cielo: los regalos de los buenos te suben escalones y los de los malos te bajan.' },
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

/* ─── Juegos vivos (22-nov-2026, Ace: «se me había olvidado por completo que la página web existía») ───
   La web lee la misma lista que usa la app (juegos.json, público en GitHub, sin los BETA). Así:
   · un juego que se publica en la app sale aquí al momento: primero, con su portada, su texto y «Nuevo»;
   · uno que se quita de la app desaparece de la web;
   · «Nuevo» se pone y se quita solo: los juegos estrenados hace menos de 14 días.
   Sin internet, o si GitHub no contesta, se queda la lista de arriba tal cual.
   La revisión automática (tarea programada «web-al-dia») después le pone su categoría, su frase corta y su portada
   en la web, y lo pasa a la lista de arriba. */
const RAIZ = /\/pages\//.test(location.pathname) ? '../' : '';
const MANIFIESTO_JUEGOS = 'https://raw.githubusercontent.com/davidrocaCOL/tikigames-juegos/main/juegos.json';
const DIAS_NUEVO = 14;
let LISTA_JUEGOS = JUEGOS.slice();

const portadaDe = j => j.img || `${RAIZ}assets/img/portadas/portada-${j.id}.jpg`;
// la primera frase del texto de la app, para la tarjeta («Escalera al cielo: los regalos…» → «Escalera al cielo.»)
const fraseCorta = t => { const s = String(t || '').trim(); const m = s.match(/^[^.:;!?]{8,70}/); return m ? m[0].trim() + '.' : s.slice(0, 60); };
// los números («19 juegos») se cuentan solos
const pintarNumerosJuegos = () => document.querySelectorAll('[data-n-juegos]').forEach(e => { e.textContent = LISTA_JUEGOS.length; });

function cargarJuegosVivos(alCambiar) {
  pintarNumerosJuegos();
  fetch(MANIFIESTO_JUEGOS, { cache: 'no-cache' })
    .then(r => r.ok ? r.json() : null)
    .then(m => {
      if (!m || typeof m !== 'object' || Array.isArray(m)) return;
      const ahora = Date.now();
      const reciente = x => !!(x && x.estreno && ahora - Date.parse(x.estreno) < DIAS_NUEVO * 864e5);
      const conocidos = JUEGOS.filter(j => m[j.id]).map(j => ({ ...j, nuevo: reciente(m[j.id]) }));
      const yaEstan = new Set(JUEGOS.map(j => j.id));
      const deLaApp = Object.entries(m)
        .filter(([id, x]) => !yaEstan.has(id) && x && typeof x.nombre === 'string' && /^[a-z0-9-]+$/.test(id))
        .sort((a, b) => (Date.parse(b[1].estreno) || 0) - (Date.parse(a[1].estreno) || 0))
        .map(([id, x]) => ({
          id, nombre: x.nombre, cats: [], texto: fraseCorta(x.texto), largo: String(x.texto || ''),
          img: /^https:\/\//.test(x.portada || '') ? x.portada : `${RAIZ}assets/img/logo/og-image.png`,
          nuevo: !x.estreno || reciente(x), desdeApp: true,
        }));
      const lista = [...deLaApp, ...conocidos];
      if (!lista.length) return;
      const firma = l => l.map(j => j.id + (j.nuevo ? '*' : '')).join(',');
      if (firma(lista) === firma(LISTA_JUEGOS)) return;
      LISTA_JUEGOS = lista;
      pintarNumerosJuegos();
      if (alCambiar) alCambiar(LISTA_JUEGOS);
    })
    .catch(() => {});
}

/* ─── Los MODS (27-nov-2026, Ace: «los mods que se han hecho… no sé si están») ───
   Igual que en la app (TikiGames/mods.js): un mod es una modificación de un juego de OTRA persona (su demo gratis de
   Steam), así que va en su propia pestaña «Mods», para que se entienda que no es un juego de TikiGames, y siempre con
   el crédito y el enlace de Steam de su creador. El texto, el creador y la tienda salen de la lista BASE de mods.js.
   La lista publicada (mods.json, sin los BETA) se lee sola como la de los juegos: un mod nuevo sale solo. */
const MODS = [
  { id: 'vacbotsimulator', nombre: 'VacBot Simulator', cats: ['mod'], nuevo: true,
    texto: 'Limpia la casa antes de que el chat la ensucie.',
    largo: 'Limpia la casa con la aspiradora robot antes de que el chat la vuelva a ensuciar. Los regalos buenos limpian, los malos ensucian.',
    autor: 'RadioactiveElephant', tienda: 'https://store.steampowered.com/app/4297050' },
  { id: 'shredabillion', nombre: 'Shred a Billion', cats: ['mod'], nuevo: true,
    texto: 'Tritura el dinero antes de que el chat lo devuelva.',
    largo: 'Vacía la bóveda de dinero y tritúralo antes de que el chat la vuelva a llenar. Los regalos buenos quitan, los malos ponen.',
    autor: 'ImSoTiredStudio', tienda: 'https://store.steampowered.com/app/5472080' },
];
const MANIFIESTO_MODS = 'https://raw.githubusercontent.com/davidrocaCOL/tikigames-juegos/main/mods.json';
let LISTA_MODS = MODS.slice();
const pintarNumerosMods = () => document.querySelectorAll('[data-n-mods]').forEach(e => { e.textContent = LISTA_MODS.length; });

function cargarModsVivos(alCambiar) {
  pintarNumerosMods();
  fetch(MANIFIESTO_MODS, { cache: 'no-cache' })
    .then(r => r.ok ? r.json() : null)
    .then(m => {
      if (!m || typeof m !== 'object' || Array.isArray(m)) return;
      const ahora = Date.now();
      const reciente = x => !!(x && x.estreno && ahora - Date.parse(x.estreno) < DIAS_NUEVO * 864e5);
      const publicado = x => x && x.beta !== true;
      const conocidos = MODS.filter(j => publicado(m[j.id])).map(j => ({ ...j, nuevo: reciente(m[j.id]) }));
      const yaEstan = new Set(MODS.map(j => j.id));
      const deLaApp = Object.entries(m)
        .filter(([id, x]) => !yaEstan.has(id) && publicado(x) && typeof x.nombre === 'string' && /^[a-z0-9-]+$/.test(id))
        .sort((a, b) => (Date.parse(b[1].estreno) || 0) - (Date.parse(a[1].estreno) || 0))
        .map(([id, x]) => ({
          id, nombre: x.nombre, cats: ['mod'], texto: 'Mod de un juego de Steam.', largo: 'Un mod de TikiGames para la demo gratis de un juego de Steam: tu público juega con sus regalos, taps y follows.',
          img: /^https:\/\//.test(x.portada || '') ? x.portada : `${RAIZ}assets/img/logo/og-image.png`,
          nuevo: !x.estreno || reciente(x), desdeApp: true,
        }));
      const lista = [...deLaApp, ...conocidos];
      const firma = l => l.map(j => j.id + (j.nuevo ? '*' : '')).join(',');
      if (firma(lista) === firma(LISTA_MODS)) return;
      LISTA_MODS = lista;
      pintarNumerosMods();
      if (alCambiar) alCambiar(LISTA_MODS);
    })
    .catch(() => {});
}

// los nombres y textos de la app van a la página como texto, nunca como código
const limpio = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
