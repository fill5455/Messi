import { Spring } from './motion.mjs?v=a8295a3730';

// Bounded projection and resistance use CSS pixels and pixels/second.
export function rubberBand(value,min,max,range=64) {
  const edge=value<min?min:value>max?max:value;
  const excess=value-edge;
  return edge+Math.sign(excess)*range*(1-1/(Math.abs(excess)*.55/range+1));
}
export function projectIndex(position,velocity,centers) {
  if(!centers.length)return -1;
  const projected=Math.max(centers[0],Math.min(centers.at(-1),position+Math.max(-1800,Math.min(1800,velocity))*.12));
  return centers.reduce((best,center,index)=>Math.abs(center-projected)<Math.abs(centers[best]-projected)?index:best,0);
}
export function liquidShape(velocity,pressed=1) {
  const stretch=Math.min(.12,Math.abs(velocity)/6000);
  return {x:(1+stretch)*pressed,y:(1-stretch*.5)*pressed};
}

export function contactShape(velocity,contact=0) {
  const amount=Math.max(-.25,Math.min(1.15,contact));
  const stretch=Math.min(.16,Math.abs(velocity)/4500);
  return {x:1+.12*amount+stretch,y:1+.2*amount-stretch*.45};
}

/** Contact drives the material from pointer-down, even when the selected tab is tapped. */
export function installLiquid(doc,host,{reduced}) {
  const nav=doc.querySelector('.ios-tabbar__bar');
  const lanes=new Map();
  const attach=(bar,selector,isSelected,choose,draggable=false)=>{
    const items=[...bar.querySelectorAll(selector)];if(items.length<2)return;
    const lens=doc.createElement('span');lens.className='liquid-lens';lens.setAttribute('aria-hidden','true');bar.prepend(lens);
    bar.classList.add('liquid-ready');if(draggable)bar.classList.add('liquid-tab-lane');items.forEach(item=>item.classList.add('liquid-item'));
    let geometry=[],gesture=null,suppressClick=false,suppressionTimer=null,observer=null;
    let width,pressure,position,offset,lensHeight,pressedItem=null;
    const selected=()=>Math.max(0,items.findIndex(isSelected));
    const paint=()=>{
      const shape=reduced.matches?{x:1,y:1}:contactShape(gesture?gesture.velocity:position.velocity,pressure.value);
      lens.style.setProperty('--liquid-contact',String(Math.max(0,pressure.value)));
      if(pressedItem)pressedItem.style.setProperty('--liquid-lift',`${reduced.matches?0:-1.5*Math.max(0,pressure.value)}px`);
      lens.style.width=`${width.value}px`;
      lens.style.top=`${offset.value}px`;lens.style.bottom='auto';lens.style.height=`${lensHeight.value}px`;
      lens.style.transform=`translate3d(${position.value-width.value/2}px,0,0) scale(${shape.x},${shape.y})`;
    };
    offset=new Spring(0,.32,()=>{}, {restDelta:.08,restSpeed:.5});
    lensHeight=new Spring(0,.32,()=>{}, {restDelta:.08,restSpeed:.5});
    position=new Spring(0,.4,paint,{restDelta:.08,restSpeed:.5});
    width=new Spring(0,.32,paint,{restDelta:.08,restSpeed:.5});
    pressure=new Spring(0,.2,paint,{damping:.72});
    offset.render=lensHeight.render=paint;
    const sync=(instant=reduced.matches)=>{
      if(gesture||!geometry.length)return;
      const target=geometry[selected()];position.damping=1;
      position.to(target.center,instant);width.to(target.width,instant);offset.to(target.top,instant);lensHeight.to(target.height,instant);pressure.to(0,instant);
    };
    const measure=()=>{
      const rect=bar.getBoundingClientRect(),border=bar.clientLeft||0;
      geometry=items.map(item=>{const r=item.getBoundingClientRect();return {center:r.left-rect.left-border+r.width/2,width:Math.max(24,r.width-8),top:(r.top||0)-(rect.top||0)-(bar.clientTop||0),height:r.height||44};});
      // A geometry change cancels the gesture instead of applying stale grab offsets.
      if(gesture)cancel();sync(true);
    };
    const change=()=>sync();
    bar.addEventListener('change',change);
    const mutations=new MutationObserver(change);mutations.observe(bar,{subtree:true,attributes:true,attributeFilter:['aria-pressed','checked']});
    const cancel=()=>{
      if(!gesture)return;
      const id=gesture.id;gesture=null;bar.classList.remove('is-dragging','is-contact');
      if(bar.hasPointerCapture?.(id))bar.releasePointerCapture(id);
      sync();
    };
    const down=event=>{
      const item=event.target.closest(selector);
      if(!event.isPrimary||event.button!==0||!items.includes(item))return;
      if(gesture)cancel();
      suppressClick=false;host.clearTimeout(suppressionTimer);position.stop();
      if(pressedItem&&pressedItem!==item)pressedItem.style.removeProperty('--liquid-lift');
      pressedItem=item;const index=items.indexOf(item);
      bar.classList.add('is-contact');
      gesture={item,index,id:event.pointerId,x:event.clientX,y:event.clientY,start:position.value,lastX:event.clientX,lastTime:event.timeStamp,velocity:0,dragging:false};
      // Make the first presentation change in the input handler, before the next frame.
      if(!reduced.matches&&pressure.frame===null){pressure.value=-.2;pressure.velocity=7;}
      position.damping=1;position.to(geometry[index].center,reduced.matches);width.to(geometry[index].width,reduced.matches);offset.to(geometry[index].top,reduced.matches);lensHeight.to(geometry[index].height,reduced.matches);
      lens.style.setProperty('--touch-x',`${Math.max(8,Math.min(92,(event.clientX-item.getBoundingClientRect().left)/item.getBoundingClientRect().width*100))}%`);
      pressure.to(reduced.matches?0:1,reduced.matches);paint();
    };
    const move=event=>{
      if(!gesture||event.pointerId!==gesture.id)return;
      const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;
      if(!gesture.dragging){
        if(Math.hypot(dx,dy)>10&&!draggable){cancel();return;}
        if(Math.abs(dy)>10&&Math.abs(dy)>Math.abs(dx)){cancel();return;}
        if(!draggable||Math.abs(dx)<=10)return;
        gesture.dragging=true;gesture.start=position.value;bar.setPointerCapture(event.pointerId);bar.classList.add('is-dragging');position.stop();
      }
      event.preventDefault();
      const dt=Math.max(1,event.timeStamp-gesture.lastTime)/1000;
      const nextPosition=rubberBand(gesture.start+dx,geometry[0].center,geometry.at(-1).center);
      const sample=Math.max(-1800,Math.min(1800,(nextPosition-position.value)/dt));
      gesture.velocity=.65*sample+.35*gesture.velocity;
      gesture.lastX=event.clientX;gesture.lastTime=event.timeStamp;
      position.value=nextPosition;
      position.velocity=gesture.velocity;
      const nearest=projectIndex(position.value,0,geometry.map(g=>g.center));
      width.to(geometry[nearest].width,reduced.matches);offset.to(geometry[nearest].top,reduced.matches);lensHeight.to(geometry[nearest].height,reduced.matches);paint();
    };
    const up=event=>{
      if(!gesture||event.pointerId!==gesture.id)return;
      bar.classList.remove('is-contact');
      if(!gesture.dragging){
        const state=gesture;gesture=null;
        const item=event.target.closest?.(selector);
        if(item===state.item){choose(state.item);suppressClick=true;host.clearTimeout(suppressionTimer);suppressionTimer=host.setTimeout(()=>{suppressClick=false;},500);}
        sync();return;
      }
      const state=gesture;gesture=null;bar.classList.remove('is-dragging');
      if(bar.hasPointerCapture(event.pointerId))bar.releasePointerCapture(event.pointerId);
      const velocity=event.timeStamp-state.lastTime>100?0:state.velocity;
      const index=projectIndex(position.value,velocity,geometry.map(g=>g.center));
      suppressClick=true;host.clearTimeout(suppressionTimer);suppressionTimer=host.setTimeout(()=>{suppressClick=false;},500);
      choose(items[index]);
      position.velocity=velocity;
      position.damping=!reduced.matches&&Math.abs(velocity)>120?.8:1;
      position.to(geometry[index].center,reduced.matches);width.to(geometry[index].width,reduced.matches);offset.to(geometry[index].top,reduced.matches);lensHeight.to(geometry[index].height,reduced.matches);pressure.to(0,reduced.matches);
    };
    const click=event=>{if(suppressClick&&event.detail!==0){event.preventDefault();event.stopImmediatePropagation();suppressClick=false;host.clearTimeout(suppressionTimer);}};
    const keyDown=event=>{
      if(event.repeat||![' ','Enter'].includes(event.key))return;
      if(!reduced.matches){pressure.value=-.2;pressure.velocity=7;pressure.to(1);paint();}
    };
    const keyUp=event=>{if([' ','Enter'].includes(event.key))pressure.to(0,reduced.matches);};
    const pointerCancel=event=>{if(gesture?.id===event.pointerId)cancel();};
    const end=()=>{cancel();sync(true);};
    {
      bar.addEventListener('pointerdown',down);bar.addEventListener('keydown',keyDown);bar.addEventListener('keyup',keyUp);host.addEventListener('pointermove',move,{passive:false});host.addEventListener('pointerup',up);host.addEventListener('pointercancel',pointerCancel);bar.addEventListener('lostpointercapture',pointerCancel);bar.addEventListener('click',click,true);
    }
    if(typeof ResizeObserver!=='undefined'){observer=new ResizeObserver(measure);observer.observe(bar);items.forEach(item=>observer.observe(item));}
    host.addEventListener('resize',measure);host.addEventListener('blur',end);host.addEventListener('pagehide',end);
    const reduce=()=>{if(reduced.matches)end();};reduced.addEventListener('change',reduce);
    measure();
    return {sync,dispose(){
      gesture=null;position.stop();width.stop();offset.stop();lensHeight.stop();pressure.stop();observer?.disconnect();mutations.disconnect();host.clearTimeout(suppressionTimer);
      bar.removeEventListener('change',change);bar.removeEventListener('pointerdown',down);bar.removeEventListener('keydown',keyDown);bar.removeEventListener('keyup',keyUp);host.removeEventListener('pointermove',move);host.removeEventListener('pointerup',up);host.removeEventListener('pointercancel',pointerCancel);bar.removeEventListener('lostpointercapture',pointerCancel);bar.removeEventListener('click',click,true);host.removeEventListener('resize',measure);host.removeEventListener('blur',end);host.removeEventListener('pagehide',end);reduced.removeEventListener('change',reduce);lens.remove();items.forEach(item=>item.classList.remove('liquid-item'));bar.classList.remove('liquid-ready','liquid-tab-lane','is-dragging','is-contact');
    }};
  };
  if(nav)lanes.set(nav,attach(nav,'.ios-tab',item=>item.querySelector('input').checked,item=>{
    const input=item.querySelector('input');if(!input.checked){input.checked=true;input.dispatchEvent(new Event('change',{bubbles:true}));}
  },true));
  const refresh=()=>{
    for(const [bar,lane] of lanes)if(bar!==nav){lane?.dispose();lanes.delete(bar);}
    doc.querySelectorAll('.filter-row').forEach(bar=>lanes.set(bar,attach(bar,'button',item=>item.getAttribute('aria-pressed')==='true',item=>item.click())));
  };
  refresh();
  return {refresh,sync(){lanes.forEach(lane=>lane?.sync());}};
}
