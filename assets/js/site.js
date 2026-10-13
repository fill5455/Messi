'use strict';
(() => {
  const menu = document.querySelector('.menu-dialog');
  const lightbox = document.querySelector('.lightbox');
  const menuLink = document.querySelector('[data-menu]');
  const supportsDialog = typeof menu.showModal === 'function';
  if (supportsDialog) {
    menuLink.addEventListener('click', event => { event.preventDefault(); menu.showModal(); });
    document.querySelectorAll('dialog').forEach(dialog => {
      dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
      dialog.addEventListener('click', event => {
        const box = dialog.getBoundingClientRect();
        if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
      });
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => menu.close()));
  } else { menuLink.href = '#eredita'; menuLink.querySelector('span').textContent = 'Eredità'; }
  const photos = [...document.querySelectorAll('.photo')];
  const filters = document.querySelector('.filters');
  const count = document.querySelector('.photo-count');
  filters.hidden = false;
  count.hidden = false;
  const visibleLinks = () => photos.filter(photo => !photo.hidden).map(photo => photo.querySelector('[data-photo]'));
  const updateCount = () => { const n = visibleLinks().length; count.textContent = `${n} ${n === 1 ? 'fotografia' : 'fotografie'}`; };
  filters.addEventListener('click', event => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    photos.forEach(photo => { photo.hidden = button.dataset.filter !== 'Tutte' && photo.dataset.category !== button.dataset.filter; });
    updateCount();
  });
  updateCount();
  let current = 0;
  const showPhoto = index => {
    const links = visibleLinks();
    current = (index + links.length) % links.length;
    const link = links[current];
    const image = lightbox.querySelector('img');
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    document.getElementById('lightbox-caption').textContent = link.dataset.caption;
    lightbox.querySelector('.lightbox-position').textContent = `${current + 1} / ${links.length}`;
  };
  if (supportsDialog) {
    document.querySelectorAll('[data-photo]').forEach(link => link.addEventListener('click', event => {
      event.preventDefault(); showPhoto(visibleLinks().indexOf(link)); lightbox.showModal();
    }));
    lightbox.querySelector('[data-prev]').addEventListener('click', () => showPhoto(current - 1));
    lightbox.querySelector('[data-next]').addEventListener('click', () => showPhoto(current + 1));
    lightbox.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(current + (event.key === 'ArrowRight' ? 1 : -1)); }
    });
    let touchStart = null;
    lightbox.querySelector('img').addEventListener('touchstart', event => { touchStart = event.touches.length === 1 ? event.touches[0].clientX : null; }, { passive:true });
    lightbox.querySelector('img').addEventListener('touchend', event => {
      if (touchStart === null) return;
      const distance = event.changedTouches[0].clientX - touchStart;
      if (Math.abs(distance) > 60) showPhoto(current + (distance < 0 ? 1 : -1));
      touchStart = null;
    }, { passive:true });
  }
  const dockLinks = [...document.querySelectorAll('.dock>a[href^="#"]')].filter(link => !link.hasAttribute('data-menu'));
  const sections = dockLinks.map(link => document.querySelector(link.getAttribute('href')));
  const updateNavigation = () => {
    let active = 0;
    sections.forEach((section, index) => { if (section.getBoundingClientRect().top <= window.innerHeight * .4) active = index; });
    dockLinks.forEach((link, index) => { if (index === active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); });
  };
  let frame = false;
  window.addEventListener('scroll', () => { if (!frame) { frame = true; requestAnimationFrame(() => { updateNavigation(); frame = false; }); } }, { passive:true });
  window.addEventListener('resize', updateNavigation);
  updateNavigation();
})();
