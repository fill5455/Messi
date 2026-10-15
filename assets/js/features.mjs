import { Spring } from './motion.mjs?v=b547626a08';

export const normalize = value => String(value).replace(/\b(\d{4})\/(\d{2})\b/g,(_,start,end)=>`${start}/${end} ${start.slice(0,2)}${end}`).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
export function matchesRecord(record,query,filter,saved=new Set()) {
  if(filter==='salvati'&&!saved.has(record.id))return false;
  if(['gol','premi'].includes(filter)&&record.category!==filter)return false;
  const text=normalize([record.title,record.period,record.description,record.number].join(' '));
  return normalize(query).split(/\s+/).filter(Boolean).every(token=>text.includes(token));
}
/** Only public, bounded search state is placed in the address. */
export function readRecordState(url) {
  const params = new URL(url).searchParams;
  const candidate = params.get('f');
  return {query:(params.get('q')||'').slice(0,80),filter:['gol','premi','salvati'].includes(candidate)?candidate:'tutti'};
}
export function recordStateURL(url,{query='',filter='tutti'}) {
  const next = new URL(url);
  const bounded = String(query).slice(0,80).trim();
  if(bounded)next.searchParams.set('q',bounded);else next.searchParams.delete('q');
  if(['gol','premi','salvati'].includes(filter))next.searchParams.set('f',filter);else next.searchParams.delete('f');
  return next;
}

export function createFavorites(storage,key='messi.saved-records.v1') {
  const parse=text=>{
    try { const value=JSON.parse(text);return new Set(Array.isArray(value)?value.filter(id=>typeof id==='string'&&/^record-[a-z0-9-]{1,60}$/.test(id)).slice(0,100):[]); }
    catch{return new Set();}
  };
  let values=new Set();try{values=parse(storage?.getItem(key));}catch{}
  return {
    get values(){return new Set(values);},
    has:id=>values.has(id),
    reload(text){values=parse(text);},
    toggle(id){
      if(!/^record-[a-z0-9-]{1,60}$/.test(id))return false;
      if(values.has(id))values.delete(id);else values.add(id);
      try{if(!storage)return false;storage.setItem(key,JSON.stringify([...values]));return true;}catch{return false;}
    },key
  };
}

export function installFeatures(doc,host,{mutate,reduced}) {
  let storage=null;try{storage=host.localStorage;}catch{}
  const favorites=createFavorites(storage);
  const surface=doc.querySelector('.ios-surface');
  const toast=doc.querySelector('.toast');
  const instantMotion=()=>reduced.matches||doc.documentElement.classList.contains('keyboard-input');
  let toastTimer=null,filter='tutti',rows=[],input=null,tools=null;
  const toastSpring=new Spring(0,.22,value=>{
    if(!toast)return;toast.style.opacity=String(value);toast.style.transform=`translateY(${(1-value)*6}px)`;
  });
  const announce=message=>{
    if(!toast)return;
    host.clearTimeout(toastTimer);toast.textContent=message;toastSpring.to(1,instantMotion());
    toastTimer=host.setTimeout(()=>toastSpring.to(0,instantMotion()),2600);
  };
  const dataFor=row=>({id:row.id,category:row.dataset.category,title:row.querySelector('h2').textContent,period:row.querySelector('.record-period').textContent,description:row.querySelector('.record-meaning').textContent,number:row.querySelector('.record-number').textContent});
  const syncSaved=()=>rows.forEach(row=>{
    const button=row.querySelector('[data-save-record]');if(!button)return;
    const saved=favorites.has(row.id);button.setAttribute('aria-pressed',String(saved));
    button.setAttribute('aria-label',`${saved?'Rimuovi dai salvati':'Salva'}: ${row.querySelector('h2').textContent}`);
    row.querySelector('[data-share-record]')?.setAttribute('aria-label',`Condividi: ${row.querySelector('h2').textContent}`);
    button.querySelector('span').textContent=saved?'Salvato':'Salva';
    button.querySelector('i').className=`ios-icon ios-icon--${saved?'checkmark':'bookmark'}`;
  });
  const syncAddress=()=>{
    const next=recordStateURL(host.location.href,{query:input.value,filter});
    try{const id=decodeURIComponent(next.hash.slice(1));if(rows.some(row=>row.id===id&&row.hidden))next.hash='';}catch{/* Preserve malformed fragments for native navigation. */}
    if(next.href!==host.location.href){try{host.history.replaceState(host.history.state,'',next.href);}catch{/* Local-file previews may deny History writes; filtering still works. */}}
  };
  const applyFilter=()=>{
    if(!tools||!doc.contains(tools))return;
    const update=()=>{
      if(!doc.contains(tools))return;
      const saved=favorites.values;
      rows.forEach(row=>{
        row.hidden=!matchesRecord(dataFor(row),input.value,filter,saved);
        if(row.hidden&&row.contains(doc.activeElement)) {
          const destination=[...tools.querySelectorAll('[data-record-filter]')].find(button=>button.dataset.recordFilter===filter)||input;
          destination.focus({preventScroll:true});
        }
      });
      const count=rows.filter(row=>!row.hidden).length;
      tools.querySelector('.result-count').textContent=`${count} record${filter==='salvati'?(count===1?' salvato':' salvati'):''}`;
      const empty=doc.querySelector('.empty-results');empty.hidden=count!==0;
      const noSaved=filter==='salvati'&&!normalize(input.value);
      empty.querySelector('strong').textContent=noSaved?'Nessun record salvato':'Nessun record trovato';
      empty.querySelector('p').textContent=noSaved?'Tocca Salva su un record per ritrovarlo qui.':'Prova un’altra ricerca o cambia filtro.';
      tools.querySelector('[data-clear-search]').hidden=input.value.length===0;
      tools.querySelectorAll('[data-record-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.recordFilter===filter)));
    };
    update();syncAddress();
  };
  const mount=(state={})=>{
    tools=doc.querySelector('.record-tools');rows=[...doc.querySelectorAll('[data-record]')];
    if(!tools)return;
    tools.hidden=false;input=tools.querySelector('input');
    const url=new URL(host.location.href);
    const restored=url.searchParams.has('q')||url.searchParams.has('f')?readRecordState(url):state;
    input.value=(restored.query||'').slice(0,80);filter=['gol','premi','salvati'].includes(restored.filter)?restored.filter:'tutti';
    rows.forEach(row=>{row.querySelector('.record-actions').hidden=false;});syncSaved();applyFilter();
  };
  const showAll=()=>{if(!tools)return;filter='tutti';input.value='';applyFilter();};
  const collect=()=>tools&&doc.contains(tools)?{query:input.value,filter}:{};

  // One contextual viewer, never a gallery. Native dialog handles focus and modal semantics.
  const dialog=doc.createElement('dialog');dialog.className='utility-dialog';dialog.setAttribute('aria-labelledby','utility-title');surface.append(dialog);
  let origin={x:0,y:8,scale:1},dialogTrigger=null;
  const modalSpring=new Spring(0,.3,value=>{
    dialog.style.opacity=String(value);
    dialog.style.transform=`translate3d(${origin.x*(1-value)}px,${origin.y*(1-value)}px,0) scale(${origin.scale+(1-origin.scale)*value})`;
  });
  const closeOverlay=(instant=false)=>{
    if(!dialog.open)return;
    modalSpring.to(0,instant||instantMotion(),()=>{dialog.close();if(dialogTrigger?.isConnected)dialogTrigger.focus({preventScroll:true});dialogTrigger=null;});
  };
  const showDialog=(trigger=null)=>{
    mutate.cancel();dialogTrigger=trigger||doc.activeElement;
    if(!dialog.open){modalSpring.value=0;modalSpring.velocity=0;dialog.style.opacity='0';dialog.style.transform='none';dialog.showModal();
      origin={x:0,y:8,scale:1};
      modalSpring.render(0);
    }
    modalSpring.to(1,instantMotion());
  };
  const dialogHeader=title=>{
    dialog.replaceChildren();
    const header=doc.createElement('div');header.className='dialog-header';
    const h=doc.createElement('h2');h.id='utility-title';h.textContent=title;
    const button=doc.createElement('button');button.type='button';button.dataset.closeOverlay='';button.setAttribute('aria-label','Chiudi');button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
    header.append(h,button);dialog.append(header);
  };
  const openPhoto=anchor=>{
    if(typeof dialog.showModal!=='function')return false;
    const original=anchor.querySelector('img');if(!original)return false;
    dialogHeader('Fotografia');
    const image=doc.createElement('img');image.className='dialog-image';image.decoding='async';image.src=anchor.href;image.alt=original.alt;
    image.width=Number(original.width)||1200;image.height=Number(original.height)||900;
    image.addEventListener('error',()=>{
      const error=doc.createElement('p');error.className='photo-error';error.textContent='La fotografia non è disponibile. Puoi aprire il file originale o riprovare.';
      const link=doc.createElement('a');link.href=anchor.href;link.textContent='Apri la fotografia originale';link.className='inline-link';
      image.replaceWith(error,link);
    },{once:true});
    const caption=doc.createElement('p');caption.className='dialog-caption';caption.textContent=anchor.closest('figure').querySelector('figcaption').textContent.replace(' Tocca la foto per ingrandirla.','');
    const credit=doc.createElement('a');credit.href='credits.html';credit.textContent='Fonti e crediti';credit.className='dialog-credit';
    dialog.append(image,caption,credit);showDialog(anchor);return true;
  };
  const copyFallback=url=>{
    if(typeof dialog.showModal!=='function'){announce('Copia questo indirizzo dalla barra del browser.');return;}
    dialogHeader('Link al record');
    const help=doc.createElement('p');help.textContent='Tieni premuto sul link per copiarlo, oppure selezionalo e usa Copia.';
    const field=doc.createElement('textarea');field.readOnly=true;field.rows=3;field.value=url;field.setAttribute('aria-label','Link da copiare');
    const button=doc.createElement('button');button.type='button';button.dataset.selectLink='';button.textContent='Seleziona il link';button.className='primary-button';
    dialog.append(help,field,button);showDialog();field.focus({preventScroll:true});field.select();
  };
  const share=async id=>{
    const row=doc.getElementById(id);if(!row)return;
    const url=new URL(`record.html#${id}`,host.location.href).href;
    const title=`Messi · ${row.querySelector('h2').textContent}`;
    try{
      if(host.navigator.share){await host.navigator.share({title,url});return;}
      if(!host.navigator.clipboard?.writeText){copyFallback(url);return;}
      await host.navigator.clipboard.writeText(url);announce('Link al record copiato');
    }catch(error){if(error.name!=='AbortError')copyFallback(url);}
  };
  dialog.addEventListener('cancel',event=>{event.preventDefault();closeOverlay();});
  dialog.addEventListener('click',event=>{
    if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeOverlay();}
  });
  doc.addEventListener('input',event=>{if(event.target===input)applyFilter();});
  doc.addEventListener('click',event=>{
    const target=event.target;
    const photo=target.closest('[data-photo-open]');
    if(photo&&event.button===0&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey&&!event.altKey&&openPhoto(photo)){event.preventDefault();return;}
    const filterButton=target.closest('[data-record-filter]');
    if(filterButton){filter=filterButton.dataset.recordFilter;applyFilter();return;}
    if(target.closest('[data-clear-search]')){input.value='';applyFilter();input.focus();return;}
    if(target.closest('[data-reset-records]')){showAll();input.focus();return;}
    const save=target.closest('[data-save-record]');
    if(save){const persistent=favorites.toggle(save.dataset.saveRecord);syncSaved();applyFilter();announce(favorites.has(save.dataset.saveRecord)?(persistent?'Record salvato sul dispositivo':'Record salvato per questa sessione'):'Record rimosso dai salvati');return;}
    const shareButton=target.closest('[data-share-record]');if(shareButton){share(shareButton.dataset.shareRecord);return;}
    if(target.closest('[data-close-overlay]'))closeOverlay();
    if(target.closest('[data-select-link]')){const field=dialog.querySelector('textarea');field.focus();field.select();}
  });
  host.addEventListener('storage',event=>{if(event.key===favorites.key||event.key===null){favorites.reload(event.key===null?null:event.newValue);syncSaved();applyFilter();}});
  reduced.addEventListener('change',()=>{if(instantMotion()){toastSpring.to(toastSpring.target,true);modalSpring.to(modalSpring.target,true,()=>{if(modalSpring.target===0&&dialog.open)dialog.close();});}});
  host.addEventListener('pagehide',()=>{host.clearTimeout(toastTimer);toastSpring.to(0,true);closeOverlay(true);});
  return {mount,collect,showAll,closeOverlay,favorites};
}
