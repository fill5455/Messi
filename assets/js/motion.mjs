/** Analytic spring, critically damped by default; preserves live position and velocity. */
export class Spring {
  constructor(value, response, render, frames = {}) {
    this.value = this.target = value;
    this.velocity = 0;
    this.omega = 2 * Math.PI / response;
    this.damping = Math.max(.5, Math.min(1, frames.damping ?? 1));
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
    if (this.damping < 1) {
      const a = this.damping * this.omega;
      const frequency = this.omega * Math.sqrt(1 - this.damping ** 2);
      const b = (this.velocity + a * delta) / frequency;
      const cos = Math.cos(frequency * seconds), sin = Math.sin(frequency * seconds);
      const decay = Math.exp(-a * seconds);
      this.value = this.target + decay * (delta * cos + b * sin);
      this.velocity = decay * ((-a * delta + frequency * b) * cos + (-a * b - frequency * delta) * sin);
    } else {
      const b = this.velocity + this.omega * delta;
      const decay = Math.exp(-this.omega * seconds);
      this.value = this.target + (delta + b * seconds) * decay;
      this.velocity = (this.velocity - this.omega * b * seconds) * decay;
    }
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

/** Flat controls use CSS feedback; native details handle disclosure and focus. */
export function installFeedback(root, host = window) {
  const reduced = host.matchMedia('(prefers-reduced-motion: reduce)');
  let pressed = null;
  const release = () => { pressed?.classList.remove('is-pressed'); pressed = null; };
  const controls = '.destination, summary, .primary-button, .chapter, button';
  root.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    release(); pressed = event.target.closest(controls);
    if (pressed && !pressed.disabled) pressed.classList.add('is-pressed');
  });
  host.addEventListener('pointerup', release);
  host.addEventListener('pointercancel', release);
  host.addEventListener('blur', release);
  root.addEventListener('focusout', release);
  const reveal = target => {
    let node = target;
    while (node) {
      if (node.tagName === 'DETAILS') node.open = true;
      node = node.parentElement;
    }
  };
  return { reduced, refresh:release, settle:release, reveal };
}
