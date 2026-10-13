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
  const surface = document.querySelector('.ios-surface');
  const scrollRegion = document.querySelector('.screen-scroll');
  const navigation = document.querySelector('.ios-tabbar');
  let navigationClearance = 112;
  const measureNavigation = () => {
    if (!surface || !navigation) return;
    const bottom = parseFloat(getComputedStyle(navigation).bottom) || 0;
    navigationClearance = Math.ceil(navigation.getBoundingClientRect().height + bottom + 16);
    surface.style.setProperty('--nav-clearance', `${navigationClearance}px`);
  };
  if (navigation && typeof ResizeObserver !== 'undefined') new ResizeObserver(measureNavigation).observe(navigation);
  window.addEventListener('resize', measureNavigation);
  window.visualViewport?.addEventListener('resize', measureNavigation);
  measureNavigation();
  // Keyboard focus must stay above the floating tab bar, including after text zoom.
  scrollRegion?.addEventListener('focusin', event => {
    const target = event.target;
    if (!target.matches('a, button, input, summary, [tabindex="0"]')) return;
    const viewport = scrollRegion.getBoundingClientRect();
    const bounds = target.getBoundingClientRect();
    const top = viewport.top + 12;
    const bottom = viewport.bottom - navigationClearance;
    if (bounds.top < top || bounds.height > bottom - top) scrollRegion.scrollTop += bounds.top - top;
    else if (bounds.bottom > bottom) scrollRegion.scrollTop += bounds.bottom - bottom;
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
