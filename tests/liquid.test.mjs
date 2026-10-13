import assert from 'node:assert/strict';
import {rubberBand,projectIndex,liquidShape,contactShape} from '../assets/js/liquid.mjs';
import {Spring} from '../assets/js/motion.mjs';
const frames={request:()=>1,cancel:()=>{},now:()=>0};
assert.equal(rubberBand(150,50,350),150);
assert(rubberBand(-1000,50,350)>-14);
assert(rubberBand(2000,50,350)<414);
assert.equal(projectIndex(160,0,[50,150,250,350]),1);
assert.equal(projectIndex(160,900,[50,150,250,350]),2);
assert.equal(projectIndex(340,10000,[50,150,250,350]),3);
assert.equal(projectIndex(50,-10000,[50,150,250,350]),0);
assert.equal(projectIndex(0,0,[]),-1);
const shape=liquidShape(99999);assert.equal(shape.x,1.12);assert.equal(shape.y,.94);
const s=new Spring(50,.4,()=>{},frames);s.to(350);s.step(.08);
const live=s.value,velocity=s.velocity;s.to(50);assert.equal(s.value,live);assert.equal(s.velocity,velocity);
for(let i=0;i<240;i++)s.step(1/120);assert.equal(s.value,50);assert.equal(s.velocity,0);
// Analytic spring is independent of refresh rate; underdamping is release-only.
for(const damping of [1,.8]){
 const a=new Spring(50,.4,()=>{},{...frames,damping});const b=new Spring(50,.4,()=>{},{...frames,damping});
 a.target=b.target=250;a.velocity=b.velocity=800;
 a.step(.2);for(let i=0;i<24;i++)b.step(1/120);
 assert(Math.abs(a.value-b.value)<1e-8);assert(Math.abs(a.velocity-b.velocity)<1e-7);
 for(let i=0;i<240;i++)a.step(1/120);assert.equal(a.value,250);
}
let callback='';s.to(100,false,()=>callback='old');s.to(0,true,()=>callback='latest');assert.equal(s.value,0);assert.equal(callback,'latest');
console.log('PASS lens projection, edge resistance, bounded deformation, live reversal, velocity continuity, 60/120 Hz equivalence, rest and reduced-motion completion');
// Pointer lifecycle tested with event/geometry doubles, not a browser renderer.
import {installLiquid} from '../assets/js/liquid.mjs';
function style(){return {setProperty(name,value){this[name]=value;},removeProperty(name){delete this[name];}};}
class Bus {
 constructor(){this.listeners=new Map();}
 addEventListener(type,fn){if(!this.listeners.has(type))this.listeners.set(type,new Set());this.listeners.get(type).add(fn);}
 removeEventListener(type,fn){this.listeners.get(type)?.delete(fn);}
 emit(type,event={}){for(const fn of this.listeners.get(type)||[])fn(event);}
}
const bar=new Bus(),host=new Bus(),reduced=new Bus();reduced.matches=false;
let lens,captured=null,changes=0,timer=0;
host.setTimeout=()=>++timer;host.clearTimeout=()=>{};
bar.classList={add(){},remove(){}};bar.getBoundingClientRect=()=>({left:0});bar.prepend=node=>{lens=node;};
bar.setPointerCapture=id=>{captured=id;};bar.hasPointerCapture=id=>captured===id;bar.releasePointerCapture=()=>{captured=null;};
const items=Array.from({length:4},(_,i)=>{
 const input={_checked:i===0,get checked(){return this._checked;},set checked(value){if(value)items.forEach(item=>item.input._checked=false);this._checked=value;},dispatchEvent(){changes++;bar.emit('change');}};
 return {input,style:style(),classList:bar.classList,closest:()=>items[i],querySelector:()=>input,getBoundingClientRect:()=>({left:i*100,width:100})};
});
bar.querySelectorAll=()=>items;
const doc={querySelector:()=>bar,querySelectorAll:()=>[],createElement:()=>({style:style(),setAttribute(){},remove(){}})};
globalThis.MutationObserver=class{observe(){}disconnect(){}};
let now=0,framesQueue=new Map(),frameId=0;
globalThis.requestAnimationFrame=fn=>{framesQueue.set(++frameId,fn);return frameId;};globalThis.cancelAnimationFrame=id=>framesQueue.delete(id);
const api=installLiquid(doc,host,{reduced});
function pointer(x,y,time=now){return {isPrimary:true,button:0,pointerId:1,clientX:x,clientY:y,timeStamp:time,target:items[0],preventDefault(){},stopImmediatePropagation(){},detail:1};}
function settle(){for(let n=0;n<200&&framesQueue.size;n++){now+=16;const batch=[...framesQueue.values()];framesQueue.clear();batch.forEach(fn=>fn(now+performance.now()));}}
bar.emit('pointerdown',pointer(50,0));host.emit('pointermove',pointer(58,0,10));assert.equal(captured,null);
host.emit('pointermove',pointer(260,0,200));assert.equal(captured,1);assert.match(lens.style.transform,/translate3d\(214px/);
host.emit('pointerup',pointer(260,0,201));assert.equal(captured,null);assert(items[3].input.checked);assert.equal(changes,1);
settle();bar.emit('pointerdown',pointer(350,0,1000));host.emit('pointermove',pointer(350,20,1020));assert.equal(captured,null);assert.equal(changes,1);settle();
bar.emit('pointerdown',pointer(350,0,1100));host.emit('pointermove',pointer(100,0,1300));host.emit('pointercancel',pointer(100,0,1301));assert.equal(captured,null);assert.equal(changes,1);settle();
reduced.matches=true;reduced.emit('change');bar.emit('pointerdown',pointer(350,0,1400));host.emit('pointermove',pointer(50,0,1600));assert.match(lens.style.transform,/scale\(1,1\)/);host.emit('pointerup',pointer(50,0,1601));assert(items[0].input.checked);
api.refresh();console.log('PASS pointer threshold, direct tracking, capture/release, velocity snap, vertical cancellation, pointercancel and reduced-motion gesture lifecycle (event doubles)');

// A normal tap, and a tap on the already active tab, must both have visible down feedback.
reduced.matches=false;reduced.emit('change');settle();
const beforeContact=lens.style.transform;
bar.emit('pointerdown',pointer(50,0,2000));
assert.notEqual(lens.style.transform,beforeContact);assert.equal(changes,2);
host.emit('pointerup',pointer(50,0,2020));assert.equal(changes,2);settle();
assert.deepEqual(contactShape(0,0),{x:1,y:1});
assert(contactShape(0,1).y>1.15);assert(contactShape(0,-.2).y<1);
const nextTap={...pointer(250,0,2100),target:items[2]};
bar.emit('pointerdown',nextTap);assert.equal(changes,2);host.emit('pointerup',{...nextTap,timeStamp:2120});assert(items[2].input.checked);assert.equal(changes,3);
let prevented=false;bar.emit('click',{detail:1,preventDefault(){prevented=true;},stopImmediatePropagation(){}});assert(prevented);
settle();console.log('PASS same-tab down feedback, contact expansion, tap selection on release and duplicate-click suppression');

// Wrapped controls and enlarged text keep the lens on the selected row.
items.forEach((item,index)=>{item.getBoundingClientRect=()=>({left:(index%2)*100,top:Math.floor(index/2)*60,width:100,height:52});});
reduced.matches=true;host.emit('resize');
assert.equal(lens.style.top,'60px');assert.equal(lens.style.height,'52px');
assert.equal(lens.style.bottom,'auto');
console.log('PASS selected-row lens geometry for wrapped and enlarged controls');
