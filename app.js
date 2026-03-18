/* app.js — Single Panel Comic Viewer */

let comics  = [];
let current = 0;

const el = id => document.getElementById(id);

function wrap(idx, len) {
  return ((idx % len) + len) % len;
}

function render(idx, animate = true) {
  const c = comics[idx];

  const targets = [
    el('bubble-maya'), el('bubble-ro'),
    el('sfx'), el('caption')
  ];

  function applyData() {
    el('bubble-maya').textContent = c.maya;
    el('bubble-ro').textContent   = c.ro;
    el('sfx').textContent         = c.sfx;
    el('caption').textContent     = c.caption;

    el('bubble-ro').style.display = c.ro  ? 'block' : 'none';
    el('sfx').style.display       = c.sfx ? 'block' : 'none';
  }

  if (animate) {
    targets.forEach(t => t && t.classList.add('swapping'));
    setTimeout(() => {
      applyData();
      targets.forEach(t => t && t.classList.remove('swapping'));
    }, 175);
  } else {
    applyData();
  }

  el('counter').textContent = `${idx + 1} / ${comics.length}`;
  const foot = el('counter-foot');
  if (foot) foot.textContent = String(idx + 1).padStart(3, '0');
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === idx);
  });
}

function navigate(dir) {
  current = wrap(current + dir, comics.length);
  render(current);
}

function buildDots() {
  const container = el('dots');
  container.innerHTML = '';
  comics.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => { current = i; render(i); });
    container.appendChild(d);
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'd') navigate(+1);
  if (e.key === 'ArrowLeft'  || e.key === 'a') navigate(-1);
});

async function init() {
  try {
    const res  = await fetch('comics.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    el('stripTitle').textContent = data.stripTitle ?? 'UNTITLED';
    comics = data.comics ?? [];
    if (comics.length === 0) throw new Error('No comics found in JSON.');

    buildDots();
    render(0, false);
  } catch (err) {
    el('scene').innerHTML =
      `<div class="load-error">⚠ Could not load comics.json<br><small>${err.message}</small></div>`;
    console.error('Comic loader:', err);
  }
}

init();