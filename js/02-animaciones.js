function initParticles() {
const canvas = document.getElementById('particles-canvas');
// Si el fondo de puntitos está apagado (como en la app), no se gasta nada en dibujarlo
if (!canvas || getComputedStyle(canvas).display === 'none') return;
const ctx = canvas.getContext('2d');
function resize() {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);
const particles = Array.from({ length: 60 }, () => ({
x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
r: Math.random() * 2 + 0.5,
dx: (Math.random() - 0.5) * 0.4,
dy: (Math.random() - 0.5) * 0.4,
color: Math.random() > 0.5 ? '#ff0050' : '#00f0ff',
alpha: Math.random() * 0.5 + 0.2,
}));
function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
particles.forEach(p => {
ctx.beginPath();
ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0');
ctx.fill();
p.x += p.dx;
p.y += p.dy;
if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
});
particles.forEach((a, i) => {
particles.slice(i + 1).forEach(b => {
const dist = Math.hypot(a.x - b.x, a.y - b.y);
if (dist < 120) {
ctx.beginPath();
ctx.moveTo(a.x, a.y);
ctx.lineTo(b.x, b.y);
ctx.strokeStyle = `rgba(0,240,255,${0.06 * (1 - dist / 120)})`;
ctx.lineWidth = 0.5;
ctx.stroke();
}
});
});
requestAnimationFrame(draw);
}
draw();
}
initParticles();
// ─── Aparecer al bajar Y al subir (Ace, 27-oct-2026) ───
// Cada .reveal entra cuando se ve y se «reinicia» cuando sale del todo de la pantalla,
// así se vuelve a animar cada vez. Si salió por arriba, la próxima vez entra bajando
// desde arriba (.desde-arriba); si salió por abajo, entra subiendo.
// Los hermanos entran uno detrás de otro (--retraso). Al recargar, todo se anima de nuevo.
const revelables = document.querySelectorAll('.reveal');
revelables.forEach(el => {
const hermanos = [...el.parentElement.children].filter(h => h.classList.contains('reveal'));
const i = hermanos.indexOf(el);
if (i > 0) el.style.setProperty('--retraso', (Math.min(i, 9) * 0.07).toFixed(2) + 's');
});
function contarHasta(el) {
const fin = parseInt(el.dataset.cuenta, 10);
const t0 = performance.now();
const paso = (t) => {
const k = Math.min((t - t0) / 900, 1);
el.textContent = Math.round(fin * (1 - Math.pow(1 - k, 3)));
if (k < 1) requestAnimationFrame(paso);
};
requestAnimationFrame(paso);
}
// Ace: las animaciones van SIEMPRE, aunque Windows tenga «reducir movimiento»
if (!('IntersectionObserver' in window)) {
revelables.forEach(el => el.classList.add('visible'));
} else {
const revealObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
const el = entry.target;
if (entry.isIntersecting && entry.intersectionRatio > 0.08) {
if (!el.classList.contains('visible')) {
el.classList.add('visible');
el.querySelectorAll('[data-cuenta]').forEach(contarHasta);
// Cuando termina de entrar queda «asentado»: el pasar el ratón vuelve a ser rápido
clearTimeout(el._asentar);
el._asentar = setTimeout(() => el.classList.add('asentado'), 900 + (parseFloat(getComputedStyle(el).getPropertyValue('--retraso')) || 0) * 1000);
}
} else if (!entry.isIntersecting) {
// Fuera de la pantalla: se prepara para entrar por el lado por donde volverá
el.classList.toggle('desde-arriba', entry.boundingClientRect.bottom <= 0);
clearTimeout(el._asentar);
el.classList.remove('visible', 'asentado');
}
});
}, { threshold: [0, 0.08, 0.2] });
revelables.forEach(el => revealObserver.observe(el));
}
function animateCounter(el) {
const target = parseInt(el.dataset.target);
const suffix = el.dataset.suffix || '';
const duration = 1800;
const step = target / (duration / 16);
let current = 0;
const timer = setInterval(() => {
current = Math.min(current + step, target);
el.textContent = Math.floor(current).toLocaleString() + suffix;
if (current >= target) clearInterval(timer);
}, 16);
}
const counterObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
counterObserver.unobserve(entry.target);
}
});
}, { threshold: 0.3 });
document.querySelectorAll('.stats-strip').forEach(el => counterObserver.observe(el));
function initTyped(el) {
if (!el) return;
const words = el.dataset.typed.split('|');
let wi = 0, ci = 0, deleting = false;
function type() {
const word = words[wi];
el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
let delay = deleting ? 60 : 100;
if (!deleting && ci > word.length) { delay = 1800; deleting = true; }
else if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; delay = 300; }
setTimeout(type, delay);
}
type();
}
initTyped(document.querySelector('[data-typed]'));
document.querySelectorAll('[data-scroll-container]').forEach(container => {
const id = container.dataset.scrollContainer;
const prevBtn = document.querySelector(`[data-scroll-prev="${id}"]`);
const nextBtn = document.querySelector(`[data-scroll-next="${id}"]`);
const el = document.getElementById(id);
const amount = 300;
prevBtn?.addEventListener('click', () => el.scrollBy({ left: -amount, behavior: 'smooth' }));
nextBtn?.addEventListener('click', () => el.scrollBy({ left: amount, behavior: 'smooth' }));
});