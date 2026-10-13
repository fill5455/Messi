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
    this.frame = null;
    this.last = null;
  }
  step(seconds) {
    const delta = this.value - this.target;
    const b = this.velocity + this.omega * delta;
    const decay = Math.exp(-this.omega * seconds);
    this.value = this.target + (delta + b * seconds) * decay;
    this.velocity = (this.velocity - this.omega * b * seconds) * decay;
    if (Math.abs(this.value - this.target) < .0001 && Math.abs(this.velocity) < .001) {
      this.value = this.target;
      this.velocity = 0;
      return true;
    }
    return false;
  }
  to(target, instant = false) {
    this.target = target;
    if (instant) {
      this.stop();
      this.value = target;
      this.velocity = 0;
      this.render(this.value);
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
    else this.last = null;
  }
  stop() {
    if (this.frame !== null) this.cancel(this.frame);
    this.frame = this.last = null;
  }
}

export function installFeedback(root, host = window) {
  const reduced = host.matchMedia('(prefers-reduced-motion: reduce)');
  const icons = new Map();
  const rotations = new Map();
  let press = null;
  const controls = '.destination, .content-detail > summary';
  const scaleFor = control => {
    const icon = control.querySelector(':scope > .destination-icon, :scope > .team-badge');
    if (!icon) return null;
    if (!icons.has(icon)) icons.set(icon, new Spring(1, .18, value => {
      icon.style.transform = `scale(${value})`;
    }));
    return icons.get(icon);
  };
  const release = (instant = false) => {
    if (!press) return;
    press.control.classList.remove('is-pressed');
    scaleFor(press.control)?.to(1, instant || reduced.matches);
    press = null;
  };
  const begin = (control, pointerId = null, x = 0, y = 0) => {
    release();
    press = { control, pointerId, x, y };
    control.classList.add('is-pressed');
    // A colour response is immediate; only the glyph uses a spring.
    scaleFor(control)?.to(reduced.matches ? 1 : .92, reduced.matches);
  };
  root.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    const control = event.target.closest(controls);
    if (control) begin(control, event.pointerId, event.clientX, event.clientY);
  });
  host.addEventListener('pointermove', event => {
    if (press?.pointerId !== event.pointerId) return;
    if (Math.hypot(event.clientX - press.x, event.clientY - press.y) > 10) release();
  }, { passive: true });
  const endPointer = event => { if (press?.pointerId === event.pointerId) release(); };
  host.addEventListener('pointerup', endPointer);
  host.addEventListener('pointercancel', endPointer);
  root.addEventListener('keydown', event => {
    if (event.repeat) return;
    const control = event.target.closest(controls);
    if (control && (event.key === 'Enter' || (event.key === ' ' && control.tagName === 'SUMMARY'))) begin(control);
  });
  root.addEventListener('keyup', event => {
    if (event.key === 'Enter' || event.key === ' ') release();
  });
  root.addEventListener('focusout', event => {
    if (press?.control.contains(event.target)) release();
  });
  host.addEventListener('blur', () => release(true));
  root.querySelectorAll('.content-detail, .source-details').forEach(details => {
    const arrow = details.querySelector(':scope > summary > svg');
    if (!arrow) return;
    const spring = new Spring(details.open ? 90 : 0, .22, value => {
      arrow.style.transform = `rotate(${value}deg)`;
    });
    rotations.set(details, spring);
    details.addEventListener('toggle', () => spring.to(details.open ? 90 : 0, reduced.matches));
  });
  reduced.addEventListener('change', () => {
    if (!reduced.matches) return;
    release(true);
    icons.forEach(spring => spring.to(1, true));
    rotations.forEach((spring, details) => spring.to(details.open ? 90 : 0, true));
  });
  host.addEventListener('pagehide', () => {
    release(true);
    icons.forEach(spring => spring.to(1, true));
    rotations.forEach((spring, details) => spring.to(details.open ? 90 : 0, true));
  });
}

if (typeof window !== 'undefined') installFeedback(document);
