# Lionel Messi — La storia del dieci

Archivio editoriale indipendente in italiano dedicato alla carriera di Lionel Messi. Il sito raccoglie capitoli di carriera, statistiche, trofei, momenti chiave e un archivio fotografico filtrabile di 18 immagini.

## Avvio locale

Il progetto è statico: non richiede installazione di dipendenze, compilazione o credenziali.

Dalla cartella del repository:

~~~sh
python3 -m http.server 8000
~~~

Apri http://localhost:8000. La navigazione, le immagini, i filtri della galleria e i dettagli dei trofei funzionano anche senza connessione. L’aggiornamento delle statistiche parte solo su HTTP o HTTPS; se la fonte non risponde, resta visibile l’ultima lettura valida.

## Struttura

- index.html — contenuti e markup semantico.
- styles/site.css — sistema responsive, mobile-first, con composizione desktop dedicata.
- scripts/app.js — capitoli, filtri delle statistiche, trofei, aggiornamento dei dati e crediti.
- scripts/gallery.js — filtri fotografici e visualizzatore con tastiera.
- scripts/media.js — percorsi locali, attribuzioni e licenze degli asset.
- assets/images/ — fotografie, loghi e marchi.
- assets/fonts/ — font locali.
- data/official-snapshot.json — ultimo insieme di statistiche incluso nel sito.
- licenses/ — licenze dei font.

## Dati e statistiche

La fonte primaria è il sito ufficiale di Lionel Messi:

- https://messi.com/estadisticas-totales/
- https://messi.com/

Quando il sito è servito via HTTP/HTTPS, scripts/app.js interroga i due endpoint WordPress pubblici configurati nel file. La risposta viene controllata per schema, coerenza tra squadre e regressioni dei totali. Timeout, cache e tentativi progressivi limitano il traffico. L’aggiornamento dipende dalla disponibilità e dal formato del servizio di origine; non è un feed di partite in diretta.

Lo snapshot incluso è stato acquisito il 9 ottobre 2026 alle 12:42 UTC+2. Ogni numero mostrato mantiene il proprio timestamp; gli assist possono differire tra archivi statistici.

## Immagini, fonti e licenze

Le immagini sono locali e non dipendono da CDN. Le attribuzioni e i link alle fonti sono visibili nella pagina, nella sezione «Fonti e trasparenza». I diritti variano da un asset all’altro: alcuni sono rilasciati con licenze Creative Commons, altri sono materiali ufficiali con licenza di riuso non dichiarata. Prima di riutilizzarli fuori dal progetto, verifica la scheda di ogni immagine in scripts/media.js e la licenza indicata dalla fonte.

## Accessibilità e compatibilità

Il layout parte dagli schermi piccoli e si adatta a tablet e desktop. La navigazione è utilizzabile da tastiera, i dialoghi usano elementi HTML nativi, le immagini informative hanno testo alternativo e le animazioni rispettano la preferenza per movimento ridotto. Non è stata eseguita una certificazione WCAG.

## Autori

Filippo Girolami, Alex Amadio e Stefano Amadio.

Il progetto è indipendente e non è affiliato a Lionel Messi, ai club, alle federazioni o agli organizzatori delle competizioni.

