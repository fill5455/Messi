/** A critically damped spring: current position and velocity survive retargeting. */
export class Spring {
  constructor(value, response, render, frames = {}) {
    this.value = this.target = value;
    this.velocity = 0;
    this.omega = 2 * Math.PI / response;
    this.render = render;
    this.request = frames.request || (callback => requestAnimationFrame(callback));
    this.cancel = frames.cancel || (id => cancelAnimationFrame(id));
    this.now = frames.now || (() => performance.now());
    this.restDelta = frames.restDelta ?? .0001;
    this.restSpeed = frames.restSpeed ?? .001;
    this.onComplete = null;
    this.frame = null;
    this.last = null;
  }
  step(seconds) {
    const delta = this.value - this.target;
    const b = this.velocity + this.omega * delta;
    const decay = Math.exp(-this.omega * seconds);
    this.value = this.target + (delta + b * seconds) * decay;
    this.velocity = (this.velocity - this.omega * b * seconds) * decay;
    if (Math.abs(this.value - this.target) < this.restDelta && Math.abs(this.velocity) < this.restSpeed) {
      this.value = this.target;
      this.velocity = 0;
      return true;
    }
    return false;
  }
  to(target, instant = false, onComplete = null) {
    this.target = target;
    this.onComplete = onComplete;
    if (instant) {
      this.stop();
      this.value = target;
      this.velocity = 0;
      this.render(this.value);
      this.finish();
    } else if (this.frame === null) {
      this.last = this.now();
      this.frame = this.request(time => this.tick(time));
    }
  }
  tick(time) {
    this.frame = null;
    const complete = this.step(this.last === null ? 0 : Math.max(0, (time - this.last) / 1000));
    this.last = time;
    this.render(this.value);
    if (!complete) this.frame = this.request(next => this.tick(next));
    else { this.last = null; this.finish(); }
  }
  finish() {
    const callback = this.onComplete;
    this.onComplete = null;
    callback?.();
  }
  stop() {
    if (this.frame !== null) this.cancel(this.frame);
    this.frame = this.last = null;
  }
}

export function installFeedback(root, host = window) {
  const reduced = host.matchMedia('(prefers-reduced-motion: reduce)');
  const icons = new Map();
  const panels = new Map();
  let press = null;
  const controls = '.destination, .content-detail > summary, .source-details > summary, .inline-link, button';
  const scaleFor = control => {
    const icon = control.querySelector(':scope > .destination-icon, :scope > .team-badge, :scope > i') || (control.tagName === 'BUTTON' ? control : null);
    if (!icon) return null;
    if (!icons.has(icon)) icons.set(icon, new Spring(1, .18, value => { icon.style.transform = `scale(${value})`; }));
    return { spring: icons.get(icon), target: icon === control ? .97 : .92 };
  };
  const release = (instant = false) => {
    if (!press) return;
    press.control.classList.remove('is-pressed');
    scaleFor(press.control)?.spring.to(1, instant || reduced.matches);
    press = null;
  };
  const begin = (control, pointerId = null, x = 0, y = 0) => {
    release(); press = { control, pointerId, x, y };
    control.classList.add('is-pressed');
    const scale = scaleFor(control);
    scale?.spring.to(reduced.matches ? 1 : scale.target, reduced.matches);
  };
  root.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    const control = event.target.closest(controls);
    if (control && !control.disabled) begin(control, event.pointerId, event.clientX, event.clientY);
  });
  host.addEventListener('pointermove', event => {
    if (press?.pointerId === event.pointerId && Math.hypot(event.clientX - press.x, event.clientY - press.y) > 10) release();
  }, { passive:true });
  const end = event => { if (press?.pointerId === event.pointerId) release(); };
  host.addEventListener('pointerup', end); host.addEventListener('pointercancel', end);
  root.addEventListener('keydown', event => {
    if (event.repeat) return;
    const control = event.target.closest(controls);
    if (control && (event.key === 'Enter' || (event.key === ' ' && ['SUMMARY','BUTTON'].includes(control.tagName)))) begin(control);
  });
  root.addEventListener('keyup', event => { if (event.key === 'Enter' || event.key === ' ') release(); });
  root.addEventListener('focusout', event => { if (press?.control.contains(event.target)) release(); });
  host.addEventListener('blur', () => release(true));
  const naturalHeight = state => state.body.getBoundingClientRect().height;
  const setOpen = (state, open, instant = reduced.matches) => {
    if (open && state.group) panels.forEach(other => { if (other !== state && other.group === state.group && other.desired) setOpen(other, false, instant); });
    state.desired = open;
    state.details.dataset.openTarget = String(open);
    if (open) state.details.open = true;
    else if (state.wrapper.contains(root.activeElement)) state.summary.focus({ preventScroll:true });
    state.wrapper.inert = !open;
    state.wrapper.style.overflow = 'hidden';
    state.arrow?.to(open ? 90 : 0, instant);
    state.height.to(open ? naturalHeight(state) : 0, instant, () => {
      if (state.desired) { state.wrapper.style.height = 'auto';state.wrapper.style.overflow='visible'; }
      else state.details.open = false;
    });
  };
  root.addEventListener('click', event => {
    const summary = event.target.closest('.content-detail > summary, .source-details > summary');
    const state = summary && panels.get(summary.parentElement);
    if (!state || event.defaultPrevented) return;
    event.preventDefault(); setOpen(state, !state.desired);
  });
  const refresh = () => {
    release(true); icons.forEach(spring => spring.stop()); icons.clear();
    panels.forEach(state => { state.height.stop(); state.arrow?.stop(); state.observer?.disconnect(); }); panels.clear();
    root.querySelectorAll('.content-detail, .source-details').forEach(details => {
      const summary = details.querySelector(':scope > summary');
      if (!summary) return;
      let wrapper = details.querySelector(':scope > .details-content');
      if (!wrapper) {
        wrapper = root.createElement('div'); wrapper.className = 'details-content';
        [...details.childNodes].filter(node => node !== summary).forEach(node => wrapper.append(node)); details.append(wrapper);
      }
      const body = wrapper.firstElementChild;
      if (!body) return;
      const arrowElement = summary.querySelector(':scope > svg');
      const state = { details, summary, wrapper, body, desired:details.open, group:details.getAttribute('name') || details.dataset.detailGroup };
      if (state.group) details.dataset.detailGroup = state.group;
      details.removeAttribute('name'); // Native exclusivity would instantly hide a panel before its exit spring.
      details.dataset.openTarget = String(state.desired);
      wrapper.inert = !state.desired;
      state.height = new Spring(state.desired ? naturalHeight(state) : 0, .3, value => { if(value<0){state.height.value=0;state.height.velocity=0;}wrapper.style.height = `${Math.max(0,value)}px`; }, {restDelta:.25,restSpeed:2});
      if (arrowElement) state.arrow = new Spring(state.desired ? 90 : 0, .22, value => { arrowElement.style.transform = `rotate(${value}deg)`; });
      wrapper.style.height = state.desired ? 'auto' : '0px';
      panels.set(details,state);
      if (typeof ResizeObserver !== 'undefined') {
        state.observer = new ResizeObserver(() => {
          if (!state.desired) return;
          const height = naturalHeight(state);
          if (state.height.frame !== null) state.height.to(height, reduced.matches, () => { if (state.desired) wrapper.style.height='auto'; });
          else { state.height.value = state.height.target = height; state.height.velocity = 0; }
        });
        state.observer.observe(body);
      }
    });
  };
  const settle = () => {
    release(true); icons.forEach(spring => spring.to(1,true));
    panels.forEach(state => setOpen(state,state.desired,true));
  };
  reduced.addEventListener('change', () => { if (reduced.matches) settle(); });
  host.addEventListener('pagehide',settle);
  refresh();
  return { refresh, reduced, settle, reveal(target,instant=true) {
    let node=target; while(node) { const state=panels.get(node); if(state)setOpen(state,true,instant); else if(node.tagName==='DETAILS')node.open=true; node=node.parentElement; }
  } };
}
