# Lionel Messi — La storia del dieci

Archivio editoriale indipendente in italiano dedicato alla carriera di Lionel Messi. Il sito raccoglie capitoli, statistiche, trofei, momenti chiave e un archivio fotografico filtrabile di 24 immagini.

## Avvio locale

Il progetto è statico: non richiede installazione di dipendenze, compilazione o credenziali.

~~~sh
python3 -m http.server 8000
~~~

Apri http://localhost:8000. La navigazione, le immagini, i filtri della galleria e i dettagli dei trofei funzionano anche senza connessione. L’aggiornamento delle statistiche parte solo su HTTP o HTTPS; se la fonte non risponde, resta visibile lo snapshot incluso nell’app.

## Struttura

- index.html — contenuti e markup semantico.
- styles/site.css — seleziona il foglio in base alla larghezza.
- styles/mobile.css — sistema mobile dedicato per schermi da 320 a 679 px.
- styles/desktop.css — composizione desktop da 680 px in su.
- scripts/app.js — capitoli, statistiche, trofei, aggiornamento e crediti.
- scripts/gallery.js — filtri fotografici e visualizzatore con tastiera.
- scripts/media.js — percorsi locali, attribuzioni e licenze.
- assets/images/ — fotografie, loghi e marchi usati dal sito.
- assets/fonts/ — font Manrope locale.
- licenses/ — licenza del font.

Lo snapshot statistico di ripiego è incluso in scripts/app.js.

## Dati e statistiche

La fonte primaria è il sito ufficiale di Lionel Messi:

- https://messi.com/estadisticas-totales/
- https://messi.com/

Quando il sito è servito via HTTP/HTTPS, scripts/app.js interroga i due endpoint WordPress pubblici configurati nel file. La risposta viene controllata per schema, coerenza tra squadre e regressioni dei totali. Timeout, cache e tentativi progressivi limitano il traffico. Non è un feed di partite in diretta.

Lo snapshot incluso è stato acquisito il 9 ottobre 2026 alle 12:42 UTC+2. Ogni numero mostrato mantiene il proprio timestamp; gli assist possono differire tra archivi statistici.

## Immagini, fonti e licenze

Le immagini sono locali e non dipendono da CDN. Attribuzioni e link sono nella sezione «Fonti e trasparenza». I diritti variano da un asset all’altro: prima di riutilizzare un’immagine, consulta la scheda in scripts/media.js e la licenza della fonte.

## Accessibilità

Controlli touch da almeno 44 px, navigazione da tastiera, focus visibile, dialoghi nativi e rispetto della preferenza per movimento ridotto. Non è stata eseguita una certificazione WCAG.

## Autori

Filippo Girolami, Alex Amadio e Stefano Amadio.

Il progetto è indipendente e non è affiliato a Lionel Messi, ai club, alle federazioni o agli organizzatori delle competizioni.

