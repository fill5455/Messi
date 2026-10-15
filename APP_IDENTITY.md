# Identità dell’app Messi

16 ottobre 2026. L’identità riguarda il significato dei contenuti, oltre alla decorazione.

| Argomento | Simbolo condiviso | Colore del testo | Superficie | Bordo |
| --- | --- | --- | --- | --- |
| Carriera | Libro · `icons.svg#book` | `#135477` | `#EDF5FC` | `#C2D9EA` |
| Trofei e premi | Coppa · `icons.svg#cup`; stella per il sottotipo premio | `#795414` | `#FCF4DC` | `#E7D69D` |
| Record | Grafico · `icons.svg#chart` | `#5D4386` | `#F0ECFA` | `#D4C7EB` |
| Argentina | Bandiera · `icons.svg#flag` | `#25674B` | `#E6F4EE` | `#BCDFCF` |
| Home e informazioni | Casa / informazioni | `#14313E` | `#EAF0F3` | `#CFDCE2` |

Base: carta `#F5F5F0`, bianco `#FFFFFF`, inchiostro `#14313E`. Gli stemmi identificano le squadre e conservano i propri colori. Pallone, calendario, persona e fotografia indicano il tipo di dato o azione. Icona e colore accompagnano sempre un’etichetta.

Un’unica sorgente SVG (`assets/icons.svg`) contiene i simboli. `assets/css/identity.css` definisce i token semantici. Gli attributi `data-topic` e `data-icon` collegano menu, titoli, schede e collegamenti allo stesso significato, anche dopo una navigazione client.

## Movimento legato alla funzione

| Interazione | Comportamento |
| --- | --- |
| Scheda squadra | Il riquadro originale si amplia nella propria area, tramite View Transition di 420 ms. Non apre un dialogo e non genera una copia del contenuto. Le altre schede lasciano spazio al capitolo. |
| Tutte le squadre / chiusura | La scheda torna al riquadro di partenza e ripristina la posizione della griglia. Comando disponibile prima e dopo il contenuto. |
| Riquadro Home → pagina | Il riquadro si trasforma nella testata della destinazione; simbolo, colore e voce attiva mantengono il contesto. |
| Anni, fonti, altri dettagli | Espansione locale di 340 ms, chiusura di 240 ms; un secondo tocco inverte il movimento dalla misura corrente. |
| Pressione | Feedback breve e contenuto; nessun movimento continuo durante la lettura. |
| Tastiera o movimento ridotto | Cambi di stato immediati, senza passaggi animati obbligatori. Escape richiude la squadra; il focus torna al suo comando. |

Curva condivisa: `cubic-bezier(.22,1,.36,1)`. I browser senza View Transitions mantengono le stesse funzioni e una comparsa semplice del contenuto. Collegamenti diretti ai capitoli, cronologia e lettura senza JavaScript rimangono disponibili.
