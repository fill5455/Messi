# Sistema editoriale Messi

## Architettura
Home → Carriera / Argentina / Trofei. Fonti e crediti nel footer. Le categorie sono pagine reali con titolo, descrizione, contenuto e navigazione. Nessun archivio fotografico o componente galleria.

## Fondamenti
- Carta `#f4f3ed`, inchiostro `#14201e`, testo secondario `#52605a`, azzurro `#b5ddec`, focus `#086685`.
- Oswald 600: titoli. Manrope 400/700: testo e controlli. Font locali e licenze OFL.
- Testo 16px / 1.7; introduzioni 17–19px; etichette 10–12px; comandi 13–14px, etichette dock 11px.
- H1 56–112px, H2 40–76px con clamp; hero 84–216px. 32px fra titolo e testo.
- Scala spaziale di 4px; margine mobile 24px, tablet 40px, desktop 48px.
- Sezioni principali 80px sopra/sotto su mobile, 104px su tablet/desktop.
- Superfici piatte, immagini squadrate, bordi sottili. Raggio 4px sui link a pulsante e 16px sul dock mobile.

## Comportamento
- Tutta la navigazione funziona senza JavaScript.
- Dock a 4 destinazioni, stato aria-current=page, safe-area, area riservata nel body.
- Desktop: navigazione in header; dock nascosto sopra 1000px.
- Carriera e Trofei: indice di capitolo sticky con ancore native, scorrimento orizzontale naturale quando necessario.
- Palmarès: details/summary nativi; prima categoria aperta; indicatori di espansione.
- Target dei link di controllo 48px o maggiori, 8px fra comandi adiacenti.
- Focus 3px, contrasto del testo verificato con luminanza WCAG, contenuto disponibile senza animazioni.
- prefers-reduced-motion disattiva scorrimento animato e transizioni.

## Verifica visiva ancora necessaria
320/375/390/430/768/1440px; zoom 200%; VoiceOver; tastiera; ritagli fotografici; font caricati; safe-area iOS; overflow e indice sticky. Questi controlli non sono dichiarati eseguiti.
