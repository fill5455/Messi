import { installFeedback } from './motion.mjs?v=b547626a08';
import { installFeatures } from './features.mjs?v=bf0d6fa0cf';

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
  const navLinks=[...nav.querySelectorAll('a[data-href]')];
  const feedback=installFeedback(doc,host);
  const rawPages=new Map(), pageState=new Map();
  const pageKey=url=>url.pathname.endsWith('/')?url.pathname+'index.html':url.pathname;
  let currentURL=new URL(host.location.href), clearance=112, keyboard=true;
  const live=doc.querySelector('.navigation-status');
  const reduced=feedback.reduced;
  const cancelTransition=()=>{};
  const mutate=async update=>{update();};
  mutate.cancel=cancelTransition;
  const features=installFeatures(doc,host,{mutate,reduced});
  const selectedFile=url=>{
    const file=url.pathname.split('/').pop()||'index.html';
    return file==='argentina.html'?'carriera.html':file==='credits.html'?'index.html':file;
  };
  const select=url=>{navLinks.forEach(link=>{if(link.dataset.href===selectedFile(url))link.setAttribute('aria-current',link.dataset.href===(url.pathname.split('/').pop()||'index.html')?'page':'location');else link.removeAttribute('aria-current');});};
  function ensureVisible(target) {
    if(!target?.matches('a,button,input,summary,[tabindex="0"]'))return;
    const viewport=region.getBoundingClientRect(),bounds=target.getBoundingClientRect();
    const top=viewport.top+12,bottom=viewport.bottom-16;
    if(bounds.top<top||bounds.height>bottom-top)region.scrollTop+=bounds.top-top;
    else if(bounds.bottom>bottom)region.scrollTop+=bounds.bottom-bottom;
  }
  const measure=()=>{
    if(host.visualViewport && host.visualViewport.scale===1)surface.style.height=`${Math.round(host.visualViewport.height)}px`;
    else surface.style.removeProperty('height');
    surface.classList.toggle('is-compact',host.innerWidth<800 && (host.visualViewport?.height||host.innerHeight)<500);
    clearance=host.matchMedia('(min-width: 800px)').matches?24:Math.ceil(nav.getBoundingClientRect().height+(parseFloat(host.getComputedStyle(nav).bottom)||0)+16);
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
    if(keyboard){if(!target.hasAttribute('tabindex'))target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}
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
      feedback.refresh();features.mount(state);
      region.scrollTop=state.scroll||0;
      if(currentURL.hash)revealHash();
      measure();
      if(keyboard&&!currentURL.hash)doc.getElementById('contenuto')?.focus({preventScroll:true});
      if(live)live.textContent=`Pagina ${header.querySelector('.current-page')?.textContent||''}`;
    });
  };
  const navigator=createNavigator({load,render,cancelTransition,busy:loading=>{
    header.classList.toggle('is-loading',loading);nav.setAttribute('aria-busy',String(loading));region.setAttribute('aria-busy',String(loading));
    if(loading&&live)live.textContent='Caricamento della pagina…';
  },fallback:url=>host.location.assign(url.href)});
  const go=(url,history='push')=>{
    remember();navigator.go(url,{history});
  };
  doc.addEventListener('keydown',()=>{keyboard=true;});doc.addEventListener('pointerdown',()=>{keyboard=false;});
  doc.addEventListener('click',event=>{
    if(event.detail===0)keyboard=true;
    const anchor=event.target.closest('a[href]');
    if(!anchor||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||(anchor.target&&anchor.target!=='_self')||anchor.hasAttribute('download'))return;
    if(anchor.classList.contains('skip')){
      event.preventDefault();region.scrollTop=0;doc.getElementById('contenuto')?.focus({preventScroll:true});return;
    }
    const url=new URL(anchor.getAttribute('href'),host.location.href);
    if(!allowed(url))return;
    event.preventDefault();
    if(pageKey(url)===pageKey(currentURL)&&url.search===new URL(host.location.href).search&&url.hash){
      remember();host.history.pushState({messi:true},'',url.href);currentURL=url;revealHash();return;
    }
    go(url);
  });
  host.addEventListener('popstate',()=>go(new URL(host.location.href),'none'));
  host.addEventListener('hashchange',()=>{
    if(new URL(host.location.href).pathname===currentURL.pathname){currentURL=new URL(host.location.href);revealHash();}
  });
  host.addEventListener('pagehide',()=>{remember();navigator.cancel();});
  host.addEventListener('pageshow',()=>{select(new URL(host.location.href));measure();});
  host.history.scrollRestoration='manual';
  select(currentURL);features.mount();revealHash();feedback.refresh();
  return {go,navigator,features,feedback};
}
if(typeof document!=='undefined')installApp();
