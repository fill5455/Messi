'use strict';
(() => {
  const tabs = document.querySelector('.ios-tabbar__bar');
  if (!tabs) return;
  const inputs = [...tabs.querySelectorAll('input[type="radio"][data-href]')];
  const resetSelection = () => inputs.forEach(input => { input.checked = input.defaultChecked; });
  // Safari may restore form state when returning through the back/forward cache.
  window.addEventListener('pageshow', resetSelection);
  tabs.addEventListener('change', event => {
    const input = event.target;
    if (!inputs.includes(input) || !input.checked) return;
    const destination = new URL(input.dataset.href, document.baseURI);
    if (destination.origin !== window.location.origin) return;
    window.location.assign(destination.href);
  });
  const scroll = document.querySelector('.screen-scroll');
  document.querySelector('.skip')?.addEventListener('click', event => {
    const main = document.getElementById('contenuto');
    if (!main || !scroll) return;
    event.preventDefault();
    scroll.scrollTop = 0;
    main.focus({ preventScroll: true });
  });
})();
