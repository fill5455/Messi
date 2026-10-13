# Messi — esperienza mobile, tema bianco

Sito statico dedicato a Lionel Messi, con tema bianco ispirato a iOS 18. Home, Carriera, Trofei e Record rimangono le quattro destinazioni principali. Argentina e Crediti sono approfondimenti.

## Contenuti
Profilo e tappe della carriera, cronologia degli anni al Barcellona, 22 voci del palmarès, sette record contestualizzati, racconti di Wembley 2011, Copa América 2021 e Qatar 2022. Sette fotografie e cinque stemmi, con provenienza in `credits.json`. Nessun archivio fotografico.

## Funzioni
- Navigazione interna progressiva: header e tab bar persistono; la pagina viene caricata e aggiornata senza ricaricare il documento.
- Richieste annullabili e controllo delle risposte superate, cache delle pagine visitate, cronologia browser e stato di scorrimento per pagina.
- Record: ricerca per testo/anno, filtri Gol/Premi/Salvati, salvataggi sul dispositivo tramite localStorage. Se lo storage è bloccato, il salvataggio resta nella sessione ed è dichiarato nel feedback.
- Condivisione tramite Web Share, copia negli appunti o dialogo con link selezionabile.
- Visualizzatore contestuale delle fotografie, con chiusura animata, Escape e gestione del focus nativa.
- Accordion spring reversibili; una sezione per gruppo; apertura corretta dei link diretti.

## Animazioni
Spring critiche su pressioni, chevron, altezze dei pannelli, dialoghi e feedback. Valore e velocità sono conservati quando cambia il target. Cambio pagina e filtri con View Transitions quando disponibili; fallback con feedback spring. Nessuna attesa forzata o blocco delle schede. `prefers-reduced-motion` applicato in CSS e JavaScript.

## Implementazione
HTML statico, un CSS e quattro moduli JavaScript: `app.mjs`, `features.mjs`, `motion.mjs`, `liquid.mjs`. Nessun framework, backend o build richiesto. Gli URL degli asset applicativi sono versionati. Percorsi relativi compatibili con GitHub Pages sotto `/Messi/`; `.nojekyll` preservato.

Il componente tab bar richiesto rimane collegato a `https://aiuxplayground.com/kits/ios-26/v1/ios.css`, senza leggere, copiare o riscrivere quel foglio. Il tema e le superfici dell’applicazione sono bianchi. La superficie è 402px nominali e si adatta ai dispositivi più stretti.

## Accessibilità e fallback
Contenuti e destinazioni sono disponibili anche senza JavaScript. Ricerca e pulsanti delle funzioni avanzate vengono mostrati dopo l’inizializzazione. Gli accordion restano nativi nel fallback. Focus visibile, spazio della tab bar misurato, gestione del viewport e dei link diretti, contatori live, dialogo nativo e immagini con dimensioni intrinseche.

## Verifica
Controllati sintassi, HTML, ancore, asset/crediti, dati del palmarès, filtri, persistenza dei salvataggi, errori storage, richieste annullate e navigazioni concorrenti, callback spring e retargeting. Le immagini aggiunte sono state ispezionate individualmente. Rendering, fluidità e prestazioni su dispositivo reale non verificati nell’ambiente disponibile.

## Liquid Glass · 13 ottobre 2026
Riferimento: [GetStream/awesome-liquid-glass](https://github.com/GetStream/awesome-liquid-glass/blob/main/README.md), in particolare `LiquidGlassTabBar.swift`. Implementazione web originale: il materiale e la rifrazione nativa SwiftUI/iOS 26 non sono riproducibili in modo identico tramite CSS.

La tab bar usa una lente applicativa che conserva i radio e il kit esterno; nessuna copia di `ios.css`. Al tocco si comprime; dopo 10px orizzontali cattura il puntatore, mantiene l'offset di presa e segue il dito. Il movimento verticale annulla la presa. Resistenza oltre i bordi (64px di limite asintotico), proiezione di 120ms, velocità limitata a 1800px/s e snap alla scheda più vicina. Damping 1 / risposta .4s di default; damping .8 solo al rilascio con velocità superiore a 120px/s. Stretch massimo 12%, compressione verticale 6%; non si deformano testi o icone. L'interfaccia resta interattiva durante il caricamento.

Filtri Record: lente condivisa che scorre tra i pulsanti senza trascinamento. Foto: apertura e chiusura spring ancorate alla foto originale. Materiali traslucidi solo sui controlli; contenuti e dialogo bianchi. Fallback opaco senza backdrop-filter, più contrasto, trasparenza ridotta e animazioni istantanee con reduced motion. Nessuna dipendenza nuova.

Verificati: formule di resistenza/proiezione, limiti di deformazione, continuità di posizione/velocità, retargeting, equivalenza numerica degli step a diversi frame rate e completamento istantaneo. Questa verifica matematica non misura i frame effettivi del browser; il rendering su dispositivo reale resta da verificare.

Test ripetibili, senza dipendenze: `node tests/liquid.test.mjs`. I test di lifecycle usano doppi di eventi/geometrie e non costituiscono una verifica del renderer del browser.
