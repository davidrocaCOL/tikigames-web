/* ============================================
   TIKIGAMES - LUCES
   El borde de luz de las tarjetas sigue al ratón: aquí solo se apunta dónde
   está (--mx, --my), una vez por cuadro; el dibujo lo hace css/06-luces.css.
   En celular no hay ratón: no se hace nada.
   ============================================ */
(function () {
  if (!matchMedia('(hover: hover)').matches) return;
  const TARJETAS = '.p-juego, .p-funcion, .p-plan, .p-paso, .p-final, .ov-tarjeta';
  let ultimo = null, pendiente = false;
  addEventListener('pointermove', e => {
    ultimo = e;
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => {
      pendiente = false;
      const t = ultimo.target.closest && ultimo.target.closest(TARJETAS);
      if (!t) return;
      const r = t.getBoundingClientRect();
      t.style.setProperty('--mx', Math.round(ultimo.clientX - r.left) + 'px');
      t.style.setProperty('--my', Math.round(ultimo.clientY - r.top) + 'px');
    });
  }, { passive: true });
})();
