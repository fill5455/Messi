'use strict';
(() => {
  const bar = document.querySelector('.ios-tabbar__bar');
  const inputs = bar ? [...bar.querySelectorAll('input[type="radio"][data-href]')] : [];
  const resetSelection = () => inputs.forEach(input => { input.checked = input.defaultChecked; });
  window.addEventListener('pageshow', resetSelection);
  bar?.addEventListener('change', event => {
    const input = event.target;
    if (!inputs.includes(input) || !input.checked) return;
    const destination = new URL(input.dataset.href, document.baseURI);
    if (destination.origin === window.location.origin) window.location.assign(destination.href);
  });
  document.querySelector('.skip')?.addEventListener('click', event => {
    const main = document.getElementById('contenuto');
    const scroll = document.querySelector('.screen-scroll');
    if (!main || !scroll) return;
    event.preventDefault();
    scroll.scrollTop = 0;
    main.focus({ preventScroll: true });
  });
  // A deep link to a category must reveal its contents, not land on a closed row.
  const revealFragment = () => {
    let id;
    try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    let ancestor = target;
    while (ancestor) {
      if (ancestor.tagName === 'DETAILS') ancestor.open = true;
      ancestor = ancestor.parentElement;
    }
    requestAnimationFrame(() => target.scrollIntoView({ block: 'start', behavior: 'auto' }));
  };
  window.addEventListener('hashchange', revealFragment);
  revealFragment();
})();
