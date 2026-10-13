import { installLiquid } from './liquid.mjs?v=2342a7efde';
import { Spring, installFeedback } from './motion.mjs?v=642d03137e';
import { installFeatures } from './features.mjs?v=ab21e1531c';

/** Latest navigation wins, including when an older fetch or transition finishes late. */
export function createNavigator({load,render,busy=()=>{},cancelTransition=()=>{},fallback=()=>{}}) {
  let revision=0, request=null;
  return {
    async go(url,options={}) {
      const ticket=++revision; request?.abort(); cancelTransition();
      request=new AbortController(); const signal=request.signal;
      const current=()=>ticket===revision;
      busy(true,url);
      try {
        const page=await load(url,signal);
        if(!current()) return false;
        await render(page,url,{...options,current});
        return current();
      } catch(error) {
        if(current() && error.name!=='AbortError') fallback(url,error);
        return false;
      } finally { if(current()) busy(false,url); }
    },
    cancel() { revision++;request?.abort();cancelTransition();busy(false); }
  };
}

export function installApp(doc=document,host=window) {
  const surface=doc.querySelector('.ios-surface');
  const region=doc.querySelector('.screen-scroll');
  const header=doc.querySelector('.app-header');
  const nav=doc.querySelector('.ios-tabbar');
  if(!surface||!region||!header||!nav) return;
  const inputs=[...nav.querySelectorAll('input[data-href]')];
  const feedback=installFeedback(doc,host);
  const rawPages=new Map(), pageState=new Map();
  const pageKey=url=>url.pathname.endsWith('/')?url.pathname+'index.html':url.pathname;
  let currentURL=new URL(host.location.href), activeTransition=null, clearance=112, keyboard=true;
  const live=doc.querySelector('.navigation-status');
  const reduced=feedback.reduced;
  const pulse=new Spring(1,.28,value=>{
    region.style.opacity=String(.9+.1*value);
    region.style.transform=`scale(${.996+.004*value})`;
  });
  const cancelTransition=()=>{ activeTransition?.skipTransition();activeTransition=null;pulse.stop(); };
  const mutate=async update=>{
    cancelTransition();
    if(typeof doc.startViewTransition==='function' && !reduced.matches) {
      const transition=doc.startViewTransition(update); activeTransition=transition;
      transition.ready.catch(()=>{});transition.finished.catch(()=>{});
      await transition.updateCallbackDone;
      transition.finished.then(()=>{if(activeTransition===transition)activeTransition=null;}).catch(()=>{});
    } else {
      update();
      if(!reduced.matches) {if(pulse.value===1){pulse.value=0;pulse.velocity=0;}pulse.to(1);} else pulse.to(1,true);
    }
  };
  mutate.cancel=cancelTransition;
  const features=installFeatures(doc,host,{mutate,reduced});
  const liquid=installLiquid(doc,host,{reduced});
  const selectedFile=url=>{
    const file=url.pathname.split('/').pop()||'index.html';
    return file==='argentina.html'?'carriera.html':file==='credits.html'?'index.html':file;
  };
  const select=url=>{inputs.forEach(input=>{input.checked=input.defaultChecked=input.dataset.href===selectedFile(url);});liquid.sync();};
  function ensureVisible(target) {
    if(!target?.matches('a,button,input,summary,[tabindex="0"]'))return;
    const viewport=region.getBoundingClientRect(),bounds=target.getBoundingClientRect();
    const top=viewport.top+12,bottom=viewport.bottom-clearance;
    if(bounds.top<top||bounds.height>bottom-top)region.scrollTop+=bounds.top-top;
    else if(bounds.bottom>bottom)region.scrollTop+=bounds.bottom-bottom;
  }
  const measure=()=>{
    if(host.visualViewport && host.visualViewport.scale===1)surface.style.height=`${Math.round(host.visualViewport.height)}px`;
    else surface.style.removeProperty('height');
    clearance=Math.ceil(nav.getBoundingClientRect().height+(parseFloat(host.getComputedStyle(nav).bottom)||0)+16);
    surface.style.setProperty('--nav-clearance',`${clearance}px`);
    requestAnimationFrame(()=>{if(region.contains(doc.activeElement))ensureVisible(doc.activeElement);});
  };
  if(typeof ResizeObserver!=='undefined')new ResizeObserver(measure).observe(nav);
  host.addEventListener('resize',measure);host.visualViewport?.addEventListener('resize',measure);measure();
  region.addEventListener('focusin',event=>ensureVisible(event.target));
  const remember=()=>pageState.set(pageKey(currentURL),{
    scroll:region.scrollTop,
    open:[...region.querySelectorAll('details[id][open]')].filter(d=>d.dataset.openTarget!=='false').map(d=>d.id),
    ...features.collect()
  });
  const revealHash=()=>{
    let id;try{id=decodeURIComponent(currentURL.hash.slice(1));}catch{return;}
    if(!id)return;
    const target=doc.getElementById(id);if(!target)return;
    if(target.matches('[data-record]'))features.showAll();
    feedback.reveal(target,true);
    target.scrollIntoView({block:'start',behavior:'auto'});
  };
  const allowed=url=>{
    const file=url.pathname.split('/').pop()||'index.html';
    return url.origin===host.location.origin && url.pathname.slice(0,url.pathname.lastIndexOf('/')+1)===currentURL.pathname.slice(0,currentURL.pathname.lastIndexOf('/')+1) && ['index.html','carriera.html','trofei.html','record.html','argentina.html','credits.html'].includes(file);
  };
  const load=async(url,signal)=>{
    const key=pageKey(url);
    let text=rawPages.get(key);
    if(!text){
      const fetchURL=new URL(url);fetchURL.hash='';
      const response=await host.fetch(fetchURL.href,{signal,headers:{Accept:'text/html'}});
      if(!response.ok)throw new Error(`Page ${response.status}`);
      text=await response.text();
      const parsed=new DOMParser().parseFromString(text,'text/html');
      if(!parsed.querySelector('.screen-scroll main')||!parsed.querySelector('.app-header'))throw new Error('Invalid page');
      rawPages.set(key,text);
    }
    return new DOMParser().parseFromString(text,'text/html');
  };
  const render=async(page,url,options)=>{
    await mutate(()=>{
      if(!options.current())return;
      remember();
      const state=pageState.get(pageKey(url))||{};
      features.closeOverlay(true);feedback.settle();
      region.innerHTML=page.querySelector('.screen-scroll').innerHTML;
      header.innerHTML=page.querySelector('.app-header').innerHTML;
      doc.title=page.title;
      const meta=doc.querySelector('meta[name="description"]'), nextMeta=page.querySelector('meta[name="description"]');
      if(meta&&nextMeta)meta.content=nextMeta.content;
      if(options.history==='push')host.history.pushState({messi:true},'',url.href);
      currentURL=new URL(url.href);select(currentURL);
      (state.open||[]).forEach(id=>{const d=doc.getElementById(id);if(d?.tagName==='DETAILS')d.open=true;});
      feedback.refresh();features.mount(state);liquid.refresh();
      region.scrollTop=state.scroll||0;
      if(currentURL.hash)revealHash();
      measure();
      if(keyboard&&!currentURL.hash)doc.getElementById('contenuto')?.focus({preventScroll:true});
      if(live)live.textContent=`Pagina ${header.querySelector('.current-page')?.textContent||''}`;
    });
  };
  const navigator=createNavigator({load,render,cancelTransition,busy:loading=>{
    header.classList.toggle('is-loading',loading);region.setAttribute('aria-busy',String(loading));
    if(loading&&live)live.textContent='Caricamento della pagina';
  },fallback:url=>host.location.assign(url.href)});
  const go=(url,history='push')=>{
    remember();navigator.go(url,{history});
  };
  doc.addEventListener('keydown',()=>{keyboard=true;});doc.addEventListener('pointerdown',()=>{keyboard=false;});
  nav.addEventListener('change',event=>{
    const input=event.target;if(inputs.includes(input)&&input.checked)go(new URL(input.dataset.href,host.location.href));
  });
  doc.addEventListener('click',event=>{
    if(event.detail===0)keyboard=true;
    const anchor=event.target.closest('a[href]');
    if(!anchor||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||anchor.target==='_blank'||anchor.hasAttribute('download'))return;
    if(anchor.classList.contains('skip')){
      event.preventDefault();region.scrollTop=0;doc.getElementById('contenuto')?.focus({preventScroll:true});return;
    }
    const url=new URL(anchor.getAttribute('href'),host.location.href);
    if(!allowed(url))return;
    event.preventDefault();go(url);
  });
  host.addEventListener('popstate',()=>go(new URL(host.location.href),'none'));
  host.addEventListener('hashchange',()=>{
    if(new URL(host.location.href).pathname===currentURL.pathname){currentURL=new URL(host.location.href);revealHash();}
  });
  host.addEventListener('pagehide',()=>{remember();navigator.cancel();});
  host.addEventListener('pageshow',()=>{select(new URL(host.location.href));measure();});
  reduced.addEventListener('change',()=>{if(reduced.matches){cancelTransition();pulse.to(1,true);}});
  host.history.scrollRestoration='manual';
  select(currentURL);features.mount();liquid.refresh();revealHash();
  return {go,navigator,features,feedback,liquid};
}
if(typeof document!=='undefined')installApp();
