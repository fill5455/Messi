# Messi — sistema di design

## Identità e gerarchia

Bianco, accento blu, tipografia di sistema e fotografie originali. La Home introduce il giocatore e offre tre prospettive; le altre pagine alternano introduzione, gruppi leggibili, approfondimenti e fonti. I numeri sono prominenti e sempre accompagnati da periodo e significato. Argentina e Crediti mantengono lo stesso linguaggio delle quattro destinazioni principali.

## Fondamenti

| Elemento | Regola |
| --- | --- |
| Canvas | `#ffffff` |
| Superficie | `#f6f8fb` |
| Testo | `#1c1c1e` |
| Testo secondario | `#52525b` |
| Accento | `#005fc9` |
| Separatore | `#dde3ed`; rafforzato con maggiore contrasto |
| Caratteri | Stack di sistema, nessuna richiesta a font remoti |
| Titoli | 32–48 px nelle pagine; 32–72 px nella Home; dimensioni espresse in rem/clamp |
| Corpo | 16–20 px secondo il contesto; interlinea 1.55–1.65 |
| Margini | `clamp(20px, 4vw, 48px)` |
| Gruppi | Raggio 22 px; superfici solide; separatori leggeri |
| Superficie applicativa | 100% fino a 1200 px |
| Colonna di lettura | Fino a 880 px; Home fino a 1100 px |
| Navigazione | Barra inferiore persistente fino a 460 px; spazio libero misurato |

## Componenti e reflow

Destinazioni a elenco su mobile e tre carte su desktop da 700 px. Il profilo passa da ritratto compatto a immagine 240×280; le statistiche passano dalle righe a tre colonne. Gli approfondimenti conservano ampiezza di lettura e fotografie intere. I record usano titoli, periodo, numero tabulare, spiegazione e azioni.

Gli elementi flex possono restringersi. Dati lunghi e azioni possono andare a capo, senza contenuto troncato. A viewport stretti i filtri usano due righe; la lente misura anche quota verticale e altezza. Le etichette della navigazione possono rifluire con testo ingrandito. Il fallback senza script riserva spazio conservativo alla barra.

## Interazione e stati

Ricerca etichettata, filtri esclusivi con `aria-pressed`, stato vuoto contestuale e pulsanti Salva/Salvato. Il feedback specifica quando la persistenza è solo di sessione. Focus visibile blu da 3 px; i controlli nascosti non conservano il focus. Escape chiude le foto; il dialogo nativo restituisce il focus al collegamento iniziale.

Navigazione con richieste annullabili e controllo delle risposte superate; cronologia e stato delle pagine mantenuti. I target dei link diversi da `_self` mantengono il comportamento nativo. Fonti esterne restano link ordinari.

## Movimento e materiali

Spring analitiche reversibili con posizione e velocità conservate. Accordion da altezza reale, con ResizeObserver; al termine sono `height:auto` e `overflow:visible`, evitando il taglio dei focus ring. Chiusura inert e restituzione del focus al summary. Lente originale applicativa sotto etichette e radio; presa orizzontale dopo 10 px, annullamento verticale, resistenza ai bordi e snap. View Transitions con fallback. Con movimento ridotto, aggiornamenti istantanei e nessuna deformazione decorativa.

Contenuti e dialoghi solidi bianchi; traslucenza confinata a navigazione e piccoli controlli. Fallback opaco, contrasto aumentato e forced colors. Il kit esterno resta un’integrazione opzionale per il rendering: geometria e icone locali non dipendono dal suo caricamento.

## Verifica

[QA_REPORT.md](QA_REPORT.md) documenta scenari browser effettivi, test di logica e limiti. Nessuna equivalenza ottica dichiarata con il renderer nativo iOS, nessuna promessa di WCAG completa o fluidità misurata su dispositivi non testati.
