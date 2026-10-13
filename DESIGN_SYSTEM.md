# Sistema visivo

## Direzione
Archivio sportivo editoriale: fotografia, tipografia condensata, fondi piatti, righe divisorie. Nessun carosello automatico o contenuto nascosto in attesa di animazioni.

## Fondamenti
- Carta `#f4f3ed`, inchiostro `#14201e`, testo secondario `#52605a`, azzurro `#b5ddec`.
- Oswald 600 per titoli; Manrope 400/700 per lettura e controlli. Font locali.
- Testo di lettura 16px, interlinea 1.65; titoli fluidi con clamp.
- Spazi: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 104px.
- Margine mobile 24px; sezioni 80px sopra/sotto; desktop 48px e 104px.
- 32px tra titolo e testo descrittivo. Colonne solo quando lo spazio lo permette.
- Superfici piatte; foto squadrate; controlli raggio 4px; dock 16px.

## Interazione
- Controlli principali 48px o più; almeno 8px fra controlli adiacenti.
- Galleria con filtri a pulsante, stato aria-pressed, conteggio live.
- Dialog nativi: gestione focus, Escape, pulsante chiusura, ripristino focus.
- Galleria: frecce visibili, tastiera, swipe; collegamento diretto all’immagine senza JS.
- Navigazione inferiore con safe-area; spazio riservato nel body.
- Animazioni limitate all’hover delle fotografie (250ms); prefers-reduced-motion disattiva transizioni e scorrimento animato.

## QA da completare in browser
320/375/390/430/768/1440px; zoom 200%; tastiera; VoiceOver; apertura/chiusura dialog; safe-area iOS; assenza overflow orizzontale; ritagli fotografici; contrasto e font caricati. Questi controlli visivi non sono dichiarati eseguiti.
