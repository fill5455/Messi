# Sistema visivo

## Intento

Un archivio editoriale sportivo: immagini documentali, gerarchia tipografica forte, lettura lineare. La pagina usa un solo tema chiaro e colori misurati; le sezioni scure sono riservate ai dati e al racconto della Coppa del Mondo. Niente cornici decorative ripetute o superfici sfocate.

## Colori

- Carta: #f4f2ec
- Superficie: #fffefa
- Inchiostro: #152127
- Testo secondario: #5f6b6c
- Blu cielo: #85c9de
- Blu accessibile: #176578
- Terracotta: #ba5a40
- Fondo scuro: #122027
- Linea chiara: #d9ded9
- Linea scura: #35444b

Il blu chiaro è usato come accento su fondi scuri; su fondi chiari link e stati attivi usano il blu più scuro.

## Tipografia e spaziatura

Manrope locale per interfaccia e dati; Georgia di sistema per titoli e didascalie editoriali. Corpo minimo 16 px. Spaziatura basata su passi di 4 e 8 px; contenuto centrato in una larghezza massima di 1240 px. Il margine laterale cresce da 20 px su telefoni a 42 px sui grandi schermi.

## Responsive

- Sotto 680 px: selettori nativi, numeri in griglia 2×2 e galleria in due colonne.
- Da 680 px: più spazio per testi, record in quattro colonne e galleria in tre.
- Da 1025 px: navigazione orizzontale, indice dei capitoli, statistiche filtrabili e galleria in quattro colonne.
- Fotografie con rapporto controllato dal layout, caricamento differito sotto la prima schermata e dimensioni dichiarate per ridurre gli spostamenti.

## Interazioni

- Filtri di carriera e statistiche con stato aria-pressed.
- Galleria fotografica filtrabile e visualizzatore con frecce, tasti freccia e chiusura con Esc.
- Dettagli dei trofei in dialogo nativo.
- Progressione di lettura e menu mobile con pulsanti da almeno 44 px.
- Movimento ridotto rispettato in CSS e JavaScript.

## Asset

Le immagini restano locali. Percorsi e metadati delle fonti sono mantenuti in scripts/media.js; le licenze dei font sono nella cartella licenses/. Consultare la sezione crediti del sito prima di riutilizzare un’immagine.

