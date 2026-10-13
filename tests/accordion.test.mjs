import assert from 'node:assert/strict';
import {installFeedback} from '../assets/js/motion.mjs';

class Bus {
  listeners=new Map();
  addEventListener(type,handler){if(!this.listeners.has(type))this.listeners.set(type,new Set());this.listeners.get(type).add(handler);}
  emit(type,event={}){for(const handler of this.listeners.get(type)||[])handler(event);}
}
const root=new Bus(),host=new Bus(),reduced=new Bus();reduced.matches=false;
host.matchMedia=()=>reduced;root.activeElement=null;
let measuredHeight=160,resize;
const body={getBoundingClientRect:()=>({height:measuredHeight})};
const wrapper={style:{},firstElementChild:body,contains:()=>false};
const summary={querySelector:()=>null,closest:()=>summary};
const details={open:false,dataset:{},getAttribute:()=>null,removeAttribute(){},querySelector:selector=>selector.includes('summary')?summary:wrapper};
summary.parentElement=details;
root.querySelectorAll=()=>[details];
globalThis.ResizeObserver=class {constructor(callback){resize=callback;}observe(){}disconnect(){}};
let nextId=0,time=performance.now();const frames=new Map();
globalThis.requestAnimationFrame=handler=>{frames.set(++nextId,handler);return nextId;};
globalThis.cancelAnimationFrame=id=>frames.delete(id);
const settle=()=>{for(let step=0;step<300&&frames.size;step++){time+=16;const pending=[...frames.values()];frames.clear();pending.forEach(handler=>handler(time));}assert.equal(frames.size,0);};
const toggle=()=>root.emit('click',{target:summary,defaultPrevented:false,preventDefault(){}});
installFeedback(root,host);
toggle();assert.equal(details.open,true);assert.equal(wrapper.inert,false);
measuredHeight=240;resize();settle();
assert.equal(wrapper.style.height,'auto');assert.equal(wrapper.style.overflow,'visible');
toggle();settle();assert.equal(details.open,false);assert.equal(wrapper.inert,true);assert.equal(wrapper.style.height,'0px');
toggle();resize();toggle();toggle();resize();settle();
assert.equal(details.open,true);assert.equal(wrapper.style.height,'auto');assert.equal(wrapper.style.overflow,'visible');
reduced.matches=true;reduced.emit('change');toggle();
assert.equal(details.open,false);assert.equal(wrapper.style.height,'0px');
console.log('PASS accordion resize during opening, unclipped settled content, rapid reversals and reduced-motion closure (event doubles)');
