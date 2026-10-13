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
