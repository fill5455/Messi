# Messi — mobile leggibile

La home identifica il soggetto e porta subito a Carriera, Trofei e Record. Una sola fotografia da 72×88px precede le azioni. I dati di sintesi vengono dopo la navigazione.

## Pagine
- Home: profilo breve, tre destinazioni e tre dati di sintesi.
- Carriera: quattro tappe espandibili; una tappa aperta alla volta; Argentina come approfondimento.
- Trofei: tre categorie espandibili, senza ulteriori accordion annidati.
- Record: numeri sempre accompagnati da titolo, periodo e spiegazione.
- Argentina: vittorie in ordine cronologico e approfondimento su Qatar 2022.
- Fonti e crediti: provenienza delle tre immagini utilizzate.

## Design
Sistema di font nativo, testo 16px, descrizioni 15–17px, note 14px. Titoli pagina 32px. Nessun titolo spezzato manualmente nelle pagine, nessun testo sovrapposto a immagini, nessuna immagine grande prima delle azioni della home. Un header e la tab bar, senza altre barre sticky nel contenuto.

## Kit e navigazione
Superficie iOS chiara da 402px, adattabile agli schermi più piccoli. Il kit esterno è incluso una volta per pagina tramite `https://aiuxplayground.com/kits/ios-26/v1/ios.css`; non è letto, copiato o riscritto. Quattro schede: Home, Carriera, Trofei, Record. JavaScript apre le destinazioni e rivela le categorie dei link diretti. La navigazione alternativa noscript conserva l’accesso alle pagine senza JavaScript.

## Pubblicazione
HTML statico, un CSS e un JS. Nessun build. Servire la radice; percorsi relativi compatibili con `/Messi/`. `.nojekyll` preservato. Fonti e fatti storici già verificati nell’edizione precedente; palmarès consultato il 13 ottobre 2026.

## Verifica
Controllati struttura HTML, tab bar, link, ancore, apertura dei link diretti, copertura delle immagini nei crediti, contrasto della palette e stato delle schede. Browser QA e verifica di leggibilità su dispositivo reale non eseguiti nell’ambiente disponibile.
