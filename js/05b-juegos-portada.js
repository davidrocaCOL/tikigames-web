/* ============================================
   TIKIGAMES - JUEGOS EN LA PORTADA (index.html)
   Los 10 primeros de la lista (los más nuevos), cada uno con su enlace a su ficha
   en Juegos. Si la app publica un juego nuevo, entra aquí solo (js/05a-juegos-datos.js).
   Va DESPUÉS de 05a-juegos-datos.js y ANTES de 02-animaciones.js.
   22-nov-2026, Ace: «que se actualice sola».
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
  cargarJuegosVivos(pintar);
})();
