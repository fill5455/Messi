# Messi — prototipo iOS 26

Prototipo mobile con quattro schede: Home, Carriera, Trofei e Record. Argentina resta un approfondimento accessibile dai contenuti; Fonti e crediti è nel footer.

## Struttura
- `index.html`, `carriera.html`, `trofei.html`, `record.html`: destinazioni della tab bar.
- `argentina.html`, `credits.html`: approfondimenti.
- `assets/css/site.css`: layout e stile dell’applicazione.
- `assets/js/tabs.js`: navigazione delle schede, ripristino dello stato su pageshow e skip link.
- `credits.json`: provenienza delle otto fotografie utilizzate.

## Kit iOS 26
Ogni pagina include una volta il link esterno `https://aiuxplayground.com/kits/ios-26/v1/ios.css`. Il foglio di stile non è copiato nel repository, né letto o riscritto. Parti, classi e attributi della tab bar seguono il formato fornito: `ios-tabbar`, `ios-tabbar__bar`, `ios-tab`, input radio, icone e `--tabs:4`. Nessun badge o pulsante ricerca perché il prototipo non ne richiede il comportamento.

La superficie `ios-surface` è larga 402px e si riduce alla larghezza disponibile sui dispositivi più piccoli. Tema chiaro. Altezza 100dvh, header in alto, contenuto in un contenitore scorrevole, tab bar ancorata al fondo della superficie con safe-area. Ogni pagina ha una sola scheda checked; Argentina appartiene al percorso Carriera, Crediti al percorso Home.

La tab bar richiede JavaScript per aprire le pagine. Una navigazione alternativa in noscript mantiene le destinazioni raggiungibili quando JavaScript è disattivato. Il kit esterno deve essere disponibile perché icone e aspetto della tab bar vengano caricati.

## Pubblicazione
Servire la radice. Nessun build o dipendenza npm. Percorsi relativi compatibili con `/Messi/`. `.nojekyll` preservato.

## Verifica
Validati HTML, collegamenti e ancore, unica inclusione del kit, wrapper, numero e stato delle schede, copertura degli asset e sintassi JavaScript. Verificato il comportamento del controller delle schede in un harness Node. Browser QA e rendering del kit esterno non eseguiti nell’ambiente disponibile.
