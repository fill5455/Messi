# Messi — archivio editoriale

Ricostruzione completa del sito statico, mobile first. HTML, CSS e JavaScript senza framework, dipendenze di runtime, API o build.

## Struttura
- `index.html`: contenuti e navigazione, disponibili anche senza JavaScript.
- `assets/css/site.css`: unico sistema di stile responsive.
- `assets/js/site.js`: filtri, dialoghi, galleria e navigazione attiva.
- `credits.html` / `credits.json`: provenienza delle fotografie mantenute dal repository.
- `assets/images/`: esclusivamente i 13 WebP utilizzati.
- `assets/fonts/` e `licenses/`: Manrope e Oswald con licenze.

## Pubblicazione
Servire la radice del repository. I percorsi relativi supportano anche GitHub Pages sotto `/Messi/`. Nessun comando di build necessario. `.nojekyll` disabilita l’elaborazione Jekyll. La configurazione del servizio di hosting è esterna al codice; questo repository non conteneva workflow o file di dominio personalizzato al momento della ricostruzione.

## Verifica
Controllati sintassi JavaScript, struttura HTML, collegamenti interni, copertura degli asset e corrispondenza dei file pubblicati. Il rendering su browser e dispositivi reali deve ancora essere verificato: non è stato possibile eseguirlo nell’ambiente di lavoro disponibile.

## Provenienza del progetto
Applicati i principi del materiale `typeui-main.zip`: scala spaziale di 4 px, gerarchia tipografica, token semantici, focus visibile, controlli ampi, contrasto e movimento ridotto. Il pacchetto è stato usato come riferimento progettuale; non contiene le fotografie del calciatore.
