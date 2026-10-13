# Messi — mobile leggibile

La home identifica il soggetto e porta subito a Carriera, Trofei e Record. Un ritratto in una cornice da 72×88px precede le azioni. I dati di sintesi vengono dopo la navigazione.

## Pagine
- Home: profilo breve, tre destinazioni e tre dati di sintesi.
- Carriera: quattro tappe espandibili; una tappa aperta alla volta; Argentina come approfondimento.
- Trofei: tre categorie espandibili, senza ulteriori accordion annidati.
- Record: numeri sempre accompagnati da titolo, periodo e spiegazione.
- Argentina: vittorie in ordine cronologico e approfondimento su Qatar 2022.
- Fonti e crediti: provenienza delle cinque fotografie e dei cinque stemmi utilizzati.

## Design
Sistema di font nativo, testo 16px, descrizioni 15–17px, note 14px. Titoli pagina 32px. Nessun titolo spezzato manualmente nelle pagine, nessun testo sovrapposto a immagini, nessuna immagine grande prima delle azioni della home. Un header e la tab bar, senza altre barre sticky nel contenuto.

## Kit e navigazione
Superficie iOS chiara da 402px, adattabile agli schermi più piccoli. Il kit esterno è incluso una volta per pagina tramite `https://aiuxplayground.com/kits/ios-26/v1/ios.css`; non è letto, copiato o riscritto. Quattro schede: Home, Carriera, Trofei, Record. JavaScript apre le destinazioni e rivela le categorie dei link diretti. La navigazione alternativa noscript conserva l’accesso alle pagine senza JavaScript.

## Pubblicazione
HTML statico, un CSS, un controller JS e un modulo di feedback. Nessun build. Servire la radice; percorsi relativi compatibili con `/Messi/`. `.nojekyll` preservato. Fonti e fatti storici già verificati nell’edizione precedente; palmarès consultato il 13 ottobre 2026.

## Verifica
Controllati struttura HTML, tab bar, link, ancore, apertura dei link diretti, copertura delle immagini nei crediti, contrasto della palette e stato delle schede. Browser QA e verifica di leggibilità su dispositivo reale non eseguiti nell’ambiente disponibile.

## Rifinitura degli asset e della gerarchia
Stemmi originali del repository per Newell’s Old Boys, FC Barcelona, PSG, Inter Miami e Argentina, normalizzati con object-fit:contain. Ritratto verificato visivamente per il profilo; fotografie dei capitoli selezionate e ispezionate singolarmente, con dimensioni intrinseche corrette e senza tagliare firme o watermark. Icone delle destinazioni allineate alla famiglia del kit. Nei record: nome → periodo → valore → spiegazione. Link ai trofei di un club aprono il gruppo corrispondente. Questi controlli sugli asset non sostituiscono la verifica del rendering in browser.

## Dettagli di interazione
Feedback cromatico immediato su pressione; spring critiche su icone (response nominale 0,18s) e chevron (0,22s), senza rimbalzi. Il movimento oltre 10px annulla il feedback, senza intercettare lo scorrimento nativo. Reduced motion conserva il solo feedback cromatico e la rotazione istantanea di stato. Il modulo motion.mjs non modifica il kit esterno.
La tab bar viene misurata a runtime per riservare spazio corretto nel contenuto e proteggere il focus. Outline interni alle liste arrotondate. Gli URL degli asset applicativi hanno fingerprint per evitare la combinazione di HTML aggiornato con CSS o controller precedenti.
Verifiche aggiuntive: spring, retargeting, velocità conservata, prima risposta al frame, pointercancel, pagehide, focus ownership e spazio misurato della barra in harness Node. Il rendering e le prestazioni su dispositivo reale restano da verificare.
