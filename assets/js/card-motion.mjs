/** Spatial card expansion and interruptible native disclosure motion. No overlay or portal. */
export function installCardMotion(doc,host,{reduced}) {
  const running=new Map();
  let transition=null,revision=0,commitTeam=null;
  const immediate=()=>reduced.matches||doc.documentElement.classList.contains('keyboard-input');
  const region=()=>doc.querySelector('.screen-scroll');
  const finish=detail=>running.get(detail)?.finish();
  const settle=()=>{
    commitTeam?.();commitTeam=null;revision++;transition?.skipTransition();transition=null;
    [...running.values()].forEach(state=>state.finish());
    doc.querySelectorAll('[data-expand-card]').forEach(d=>{d.style.removeProperty('view-transition-name');delete d.dataset.openTarget;});
    delete doc.documentElement.dataset.cardTransition;
  };
  function resize(detail,open,instant=false) {
    const start=detail.getBoundingClientRect().height;
    const previous=running.get(detail);previous?.cancel();
    if(instant||immediate()||!detail.animate){detail.open=open;delete detail.dataset.openTarget;return;}
    detail.style.height='';detail.style.overflow='';
    detail.open=true;
    const summary=detail.querySelector(':scope > summary');
    const target=open?detail.getBoundingClientRect().height:summary.getBoundingClientRect().height+2;
    detail.dataset.openTarget=String(open);detail.style.overflow='clip';
    let done=false;
    const animation=detail.animate([{height:`${start}px`},{height:`${target}px`}],{duration:open?340:240,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
    const clean=()=>{detail.style.height='';detail.style.overflow='';delete detail.dataset.openTarget;running.delete(detail);};
    const state={cancel(){if(done)return;done=true;animation.cancel();clean();},finish(){if(done)return;done=true;detail.open=open;animation.cancel();clean();}};
    running.set(detail,state);animation.finished.then(()=>state.finish()).catch(()=>{});
  }
  function team(detail,open,instant=false) {
    transition?.skipTransition();const ticket=++revision;
    const stage=detail.closest('.team-stage');detail.dataset.openTarget=String(open);
    if(open&&!stage.dataset.returnScroll)stage.dataset.returnScroll=String(region()?.scrollTop||0);
    const update=()=>{
      if(ticket!==revision||!detail.isConnected)return;
      commitTeam=null;
      stage.querySelectorAll(':scope > details').forEach(d=>{d.open=d===detail&&open;});
      const url=new URL(host.location.href);
      if(open)url.hash=detail.id;else if(url.hash===`#${detail.id}`)url.hash='';
      host.history.replaceState(host.history.state,'',url.href);
      if(!open){const scroll=region();const y=Number(stage.dataset.returnScroll);if(scroll&&Number.isFinite(y))scroll.scrollTop=y;else if(scroll&&stage.getBoundingClientRect)scroll.scrollTop+=stage.getBoundingClientRect().top-scroll.getBoundingClientRect().top-16;delete stage.dataset.returnScroll;}
    };
    if(instant||immediate()||!doc.startViewTransition){
      update();delete detail.dataset.openTarget;
      if(!instant&&!immediate()&&open)detail.querySelector('.team-card-body')?.animate?.([{opacity:.25,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:260,easing:'cubic-bezier(.22,1,.36,1)'});
      return;
    }
    detail.style.viewTransitionName='selected-team';
    doc.documentElement.dataset.cardTransition='true';
    try{
      commitTeam=update;const active=doc.startViewTransition(update);transition=active;
      active.finished.catch(()=>{}).finally(()=>{
        if(ticket!==revision)return;
        detail.style.removeProperty('view-transition-name');delete detail.dataset.openTarget;delete doc.documentElement.dataset.cardTransition;transition=null;
      });
    }catch{update();detail.style.removeProperty('view-transition-name');delete detail.dataset.openTarget;delete doc.documentElement.dataset.cardTransition;}
  }
  doc.addEventListener('pointerdown',()=>{transition?.skipTransition();},true);
  doc.addEventListener('click',event=>{
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.altKey||event.shiftKey)return;
    const close=event.target.closest('[data-close-card]');
    if(close){event.preventDefault();const detail=close.closest('[data-expand-card]');team(detail,false,event.detail===0);detail.querySelector('summary').focus({preventScroll:true});return;}
    const summary=event.target.closest('summary');
    if(!summary||event.target.closest('a,button,input'))return;
    const detail=summary.parentElement;if(detail.tagName!=='DETAILS')return;
    event.preventDefault();
    const open=detail.dataset.openTarget?detail.dataset.openTarget==='false':!detail.open;
    if(detail.hasAttribute('data-expand-card'))team(detail,open,event.detail===0);else resize(detail,open,event.detail===0);
  });
  doc.addEventListener('toggle',event=>{
    const detail=event.target;if(!detail.matches?.('[data-expand-card]')||!detail.open)return;
    detail.parentElement.querySelectorAll(':scope > details[open]').forEach(other=>{if(other!==detail)other.open=false;});
  },true);
  doc.addEventListener('keydown',event=>{
    if(event.key!=='Escape'||doc.querySelector('dialog[open]'))return;
    const active=doc.querySelector('.team-stage > details[open]');
    if(active){event.preventDefault();team(active,false,true);active.querySelector('summary').focus({preventScroll:true});}
  });
  reduced.addEventListener?.('change',()=>{if(reduced.matches)settle();});
  host.addEventListener('pagehide',settle);
  doc.documentElement.dataset.cardMotion='ready';
  return {settle,refresh(){doc.documentElement.dataset.cardMotion='ready';},resize,team};
}
