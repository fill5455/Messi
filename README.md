# Messi — sito editoriale

Sito statico mobile first dedicato a Lionel Messi. Cinque pagine, un unico foglio di stile, nessuna dipendenza JavaScript o fase di build.

## Pagine
- `index.html`: introduzione e accesso ai tre percorsi.
- `carriera.html`: Rosario, Barcellona, Parigi, Miami.
- `argentina.html`: percorso in nazionale e racconto di Qatar 2022.
- `trofei.html`: palmarès per club, nazionale e riconoscimenti individuali.
- `credits.html`: fonti editoriali, attribuzioni e licenze.

## Componenti e navigazione
Header desktop e barra mobile con stato di pagina corrente. Navigazione dei capitoli con ancore native, categorie del palmarès con `details`/`summary`, font locali, immagini WebP. Il sito è completamente utilizzabile senza JavaScript. Archivio fotografico, filtri, lightbox e relativo script rimossi.

## Pubblicazione
Servire la radice del repository. Percorsi relativi compatibili con GitHub Pages sotto `/Messi/`. Nessun comando di build. `.nojekyll` disabilita Jekyll. La configurazione del servizio di hosting è esterna al codice; nessun file GitHub/hosting preesistente è stato rimosso in questa revisione.

## Verifica
Validati struttura HTML, titoli e ID unici, collegamenti fra tutte le pagine e ancore, copertura delle immagini nei crediti, presenza dei font/licenze, contrasto della palette e assenza di vecchi componenti galleria. Verificati gli hash del codice pubblicato su GitHub.
Il rendering su browser e dispositivi reali non è stato verificato nell’ambiente disponibile.

## Materiale di riferimento
Principi applicati da `typeui-main.zip`: token semantici, scala spaziale di 4px, gerarchia tipografica, target ampi, focus visibile e movimento ridotto. Fotografie mantenute dal repository originale con provenienza in `credits.json`.
