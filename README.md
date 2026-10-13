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
HTML statico, un CSS e tre moduli JavaScript: `app.mjs`, `features.mjs`, `motion.mjs`. Nessun framework, backend o build richiesto. Gli URL degli asset applicativi sono versionati. Percorsi relativi compatibili con GitHub Pages sotto `/Messi/`; `.nojekyll` preservato.

Il componente tab bar richiesto rimane collegato a `https://aiuxplayground.com/kits/ios-26/v1/ios.css`, senza leggere, copiare o riscrivere quel foglio. Il tema e le superfici dell’applicazione sono bianchi. La superficie è 402px nominali e si adatta ai dispositivi più stretti.

## Accessibilità e fallback
Contenuti e destinazioni sono disponibili anche senza JavaScript. Ricerca e pulsanti delle funzioni avanzate vengono mostrati dopo l’inizializzazione. Gli accordion restano nativi nel fallback. Focus visibile, spazio della tab bar misurato, gestione del viewport e dei link diretti, contatori live, dialogo nativo e immagini con dimensioni intrinseche.

## Verifica
Controllati sintassi, HTML, ancore, asset/crediti, dati del palmarès, filtri, persistenza dei salvataggi, errori storage, richieste annullate e navigazioni concorrenti, callback spring e retargeting. Le immagini aggiunte sono state ispezionate individualmente. Rendering, fluidità e prestazioni su dispositivo reale non verificati nell’ambiente disponibile.
