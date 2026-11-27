/* ============================================
   TIKIGAMES - JUEGOS EN LA PORTADA (index.html)
   Los 10 primeros de la lista (los más nuevos), cada uno con su enlace a su ficha
   en Juegos. Si la app publica un juego nuevo, entra aquí solo (js/05a-juegos-datos.js).
   Va DESPUÉS de 05a-juegos-datos.js y ANTES de 02-animaciones.js.
   22-nov-2026, Ace: «que se actualice sola». 27-nov-2026: también las 3 portadas grandes de arriba.
   ============================================ */

(function () {
  const caja = document.getElementById('p-juegos');
  if (!caja) return;
  const pintar = lista => {
    caja.innerHTML = lista.slice(0, 10).map(j => `
      <a class="p-juego reveal" href="pages/catalogo.html#${j.id}">
        <img src="${limpio(portadaDe(j))}" alt="${limpio(j.nombre)}" loading="lazy" width="600" height="800" />
        ${j.nuevo ? '<span class="p-juego-nuevo">Nuevo</span>' : ''}
        <div class="p-juego-texto"><h3 class="jc-titulo">${limpio(j.nombre)}</h3><p>${limpio(j.texto)}</p></div>
      </a>`).join('');
    if (window.revelar) caja.querySelectorAll('.reveal').forEach(window.revelar);
  };
  pintar(LISTA_JUEGOS);
  cargarJuegosVivos(lista => { pintar(lista); abanico(lista); });
  cargarModsVivos();     // (solo cuenta los mods: «2 mods» arriba)
})();

/* las 3 portadas grandes de arriba (27-nov-2026, Ace: «arriba, donde aparecen los tres últimos juegos lanzados… no se
   actualiza»): los 3 primeros de la lista (los más nuevos), el más nuevo en el centro. Se cambia solo la foto: las
   animaciones del abanico siguen igual. */
function abanico(lista) {
  const imgs = document.querySelectorAll('#p-abanico img');
  if (imgs.length !== 3 || lista.length < 3) return;
  [lista[1], lista[0], lista[2]].forEach((j, i) => {
    const src = portadaDe(j);
    if (imgs[i].getAttribute('src') !== src) imgs[i].setAttribute('src', src);
  });
}
abanico(LISTA_JUEGOS);
