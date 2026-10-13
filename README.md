# Archivio Messi

Pagina editoriale in italiano dedicata a Lionel Messi. La ricostruzione mobile organizza la carriera in capitoli, statistiche, palmarès, cronologia, notizie e una galleria fotografica filtrabile di 24 immagini.

## Avvio locale

Non servono dipendenze o compilazione. Dalla cartella `messi/`:

~~~sh
python3 -m http.server 8000
~~~

Apri [http://localhost:8000](http://localhost:8000). Il sito usa risorse locali; l’aggiornamento delle statistiche richiede HTTP/HTTPS e una fonte raggiungibile. Se non riceve dati validi, mostra lo snapshot incluso nell’app.

## Struttura

- `index.html` — struttura semantica, contenuti, navigazione e dialoghi.
- `styles/site.css` — seleziona il foglio responsive.
- `styles/mobile.css` — layout flat dedicato ai telefoni, da 320 a 679 px.
- `styles/desktop.css` — layout desktop e navigazione touch per tablet.
- `scripts/app.js` — capitoli, statistiche, menu, trofei, fonti e barra di lettura.
- `scripts/gallery.js` — filtri e visualizzatore fotografico con tastiera.
- `scripts/media.js` — percorsi locali, attribuzioni e licenze dei media.
- `assets/images/` — fotografie e marchi; `assets/fonts/` contiene Manrope.
- `licenses/Manrope-OFL.txt` — licenza del font.

## Statistiche e immagini

La fonte primaria delle statistiche è [messi.com](https://messi.com/estadisticas-totales/). Le richieste pubbliche sono controllate per schema, coerenza e regressioni; timeout e cache limitano i tentativi. Non è un feed di partite in diretta. Lo snapshot statistico di ripiego è incluso in `scripts/app.js` e riporta l’ultimo dato disponibile al 9 ottobre 2026.

Fotografie e loghi sono forniti localmente e le relative attribuzioni sono mostrate in **Fonti e trasparenza**. I diritti variano da un file all’altro: consulta `scripts/media.js` prima di riutilizzare gli asset. Il progetto è indipendente e non affiliato a Messi, ai club o alle federazioni.

## Accessibilità

La pagina supporta la navigazione da tastiera, controlli touch ampi, focus visibile, testi alternativi, dialoghi nativi e movimento ridotto. La verifica descritta nel sistema visivo è un controllo di progetto, non una certificazione WCAG.

## Autori

Filippo Girolami, Alex Amadio e Stefano Amadio.
