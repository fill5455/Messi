# Messi — bianco, stile iOS 18

## Gerarchia
Home breve → destinazioni → sintesi → approfondimento. Carriera: tappe prima del profilo. Trofei: categorie prima del racconto. Record: ricerca, filtri, dati con periodo e spiegazione. Nessuna griglia fotografica o titolo decorativo.

## Fondamenti
Canvas #ffffff, superfici #f6f7f9, testo #1c1c1e, secondario #52525b, accento #005fc9. Font di sistema, pesi 400/600/700. Titoli pagina 32px, titoli riga 18px, testo 16px, descrizioni 15–17px, note 14px. Margini 20px, raggio gruppi 20px, frame identità 48px, glyph 22px.

## Motion
- Pressione: feedback cromatico immediato; icona scale 1↔0.92 o pulsante 1↔0.97, response nominale .18s.
- Chevron: 0↔90°, response .22s.
- Accordion: altezza reale, response .3s; callback di riposo e resize observer. Apertura/chiusura dal valore e dalla velocità correnti. Contenuto chiuso inert, focus restituito al summary quando necessario.
- Dialoghi: scale .96↔1 e opacity 0↔1, response .3s; chiusura sullo stesso percorso.
- Feedback: opacity e translateY 6↔0, response .22s.
- Pagine e filtri: View Transitions native, 180–280ms, opacity e scale .995↔1. Overlay delle transizioni non intercetta i puntatori; nuove navigazioni saltano le transizioni precedenti e annullano richieste superate.
- Nessun rimbalzo decorativo, autoplay o animazione delle fotografie durante la lettura.
- Reduced motion: aggiornamenti istantanei, nessuna scala animata, nessuno scorrimento artificiale.

## Materiali
Header bianco leggermente traslucido. Carte informative solide. Tab bar del kit fornito invariata. Dialoghi bianchi con scrim scuro e blur statico leggero. Nessuna sovrapposizione di carte di vetro chiare.

## Funzioni e stati
Ricerca Records etichettata, filtri esclusivi con aria-pressed, stato vuoto contestuale, pulsanti Salva/Salvato e Condividi. Feedback sul tipo di persistenza. Condivisione con fallback. Zoom delle immagini contestuale, con caption e crediti. Cronologia browser, scroll e sezioni aperte conservati.

## QA ancora necessaria
Safari su iPhone, View Transitions e fallback, tastiera/VoiceOver, zoom testo, tastiera virtuale, storage/clipboard/share reali, riapertura durante chiusura, performance degli accordion lunghi. La verifica del codice non equivale a una misurazione della fluidità sul dispositivo.

## Lente Liquid Glass
- Lente separata dai contenuti: gli elementi semantici e le etichette restano fermi; si anima solo il materiale dietro.
- Tab bar: trascinamento orizzontale con cattura dopo 10px, offset conservato, resistenza ai bordi e proiezione di 120ms; nessun blocco degli input.
- Damping 1 / .4s per spostamenti; .8 solo per release con velocità reale >120px/s. Width .32s, press .22s, modal .3s.
- Stretch limitato al 12%, squash verticale al 6%. Spring analitiche; nessun keyframe per i gesti.
- Filtri: una sola lente con geometria misurata, radio e pulsanti nativi conservati.
- Dialogo foto: trasformazione dal centro della sorgente, ritorno sullo stesso percorso; Escape e focus nativi.
- Il kit iOS resta esterno. `.liquid-tab-lane`, `.liquid-item`, `.liquid-lens` sono strati applicativi originali.
- Contenuti solidi bianchi; materiale su tab bar e piccoli controlli, blur statico 16–22px. Riduzione movimento, maggiore contrasto e fallback opaco.
- Riferimento verificato il 13 ottobre 2026: https://github.com/GetStream/awesome-liquid-glass/blob/main/README.md. Adattamento web, non equivalenza ottica al renderer iOS.
