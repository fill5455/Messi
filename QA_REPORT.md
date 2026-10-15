# Riordino delle pagine interne — 15 ottobre 2026, 23:59 UTC+2

Revisione verificata in Chrome cloud: `6ce3e0051f98df55cad1e98c383e67f8d9f638d9`.

- 72 scenari, sei pagine × sei larghezze da 320 a 1440 px × testo 100% e 200%: nessun overflow, immagine mancante, sovrapposizione della barra o violazione axe nei tag WCAG selezionati.
- Tutti i 28 approfondimenti aperti a 320 px con testo 200%: nessuna anomalia rilevata.
- Osservazione del nuovo ordine Carriera su mobile, della sezione Club nei Trofei e del layout Record su desktop.
- Ricerca reale `Mondiali`: un risultato, coerente con i dati presenti.
- 165 riferimenti/ancore/attributi/versioni cache verificati. ID degli approfondimenti e numero dei record confrontati con la versione precedente e conservati. Test navigazione e accordion superati; diff senza errori.

Correzioni dopo il primo controllo: profilo raccolto in una scheda senza debordamenti al 200%; contrasto della navigazione stabile durante i cambi di breakpoint, senza transizione di colore.

Limiti: Chrome cloud con viewport in iframe; non verificati Safari, dispositivi fisici o lettori di schermo. Nessuna certificazione WCAG o misura affidabile dei Core Web Vitals. Seguono i rapporti storici.

---

# Ricomposizione visiva — 15 ottobre 2026, 23:50 UTC+2

La revisione `d13d3ed` modifica l’apertura della homepage, superfici, barra mobile, titoli, indici e pannelli delle sei pagine. Verifiche effettivamente eseguite:

- 72 scenari (sei pagine, sei larghezze, testo 100% e 200%): nessun overflow, immagine mancante o sovrapposizione; 70 scenari senza violazioni axe selezionate. I due scenari Home desktop segnalavano il contrasto della navigazione.
- Correzione `fbaa5d3`: superficie esplicita per la navigazione desktop; Home a 1440 px ricontrollata al 100% e 200%, senza violazioni axe selezionate o overflow.
- 24 scenari su schermi bassi con testo 200% sulla correzione finale: nessuna anomalia rilevata.
- Tutti i 28 approfondimenti a 320 px con testo 200% sulla correzione finale: nessuna anomalia rilevata.
- Osservazione in browser della homepage mobile e desktop e della pagina Trofei mobile: nuova composizione effettivamente renderizzata.
- 163 riferimenti locali, ancore, attributi e versioni cache controllati; test navigazione e accordion superati; diff senza errori.

Test eseguiti in Chrome cloud tramite iframe. Non verificati dispositivi fisici, Safari o lettori di schermo. Nessun nuovo punteggio prestazionale: il ridimensionamento della fixture altera le metriche di layout. I risultati sottostanti sono storici.

---

# Navigazione mobile e leggibilità — 15 ottobre 2026

Revisione verificata in Chrome cloud sullo snapshot `f3821376b0c4e799e9943b7c80e96d3b12841d98`.

- Sei pagine × sei larghezze da 320 a 1440 px × testo 100% e 200%: 72 scenari senza overflow, immagini mancanti, sovrapposizione della navigazione o violazioni axe nei tag WCAG selezionati.
- Revisione precedente `55d87fd`: 24 scenari su schermi bassi con testo 200% e tutti i 28 approfondimenti a 320 px con testo 200%, senza anomalie rilevate.
- Osservazione visiva delle intestazioni mobile compatte, fotografie, percorso della pagina e barra inferiore fluttuante.
- Navigazione reale: una nuova destinazione parte dall’inizio; Indietro ripristina apertura e posizione di lettura. Nel percorso Carriera con ancora, posizione prima e dopo il ritorno: 2097 px.
- Controlli locali: 163 riferimenti/ancore/attributi/versioni cache; test navigazione e accordion; diff senza errori.

La barra mobile è fluttuante, con quattro destinazioni, etichette visibili e stato corrente. Su schermi bassi usa una variante compatta. Le pagine secondarie mostrano il loro nome e il percorso Home; nessuna scheda principale viene evidenziata impropriamente. I trofei dei club sono separati in pannelli con stemma. Fotografie e icone riutilizzano il patrimonio del sito e SVG locali.

Limiti: non verificati Safari/WebKit, dispositivi fisici e lettori di schermo. Nessuna certificazione WCAG o nuovo punteggio Core Web Vitals. I risultati precedenti sotto sono storici e non sostituiscono i controlli di questa revisione.

---

# Verifica corrente — 15 ottobre 2026, 14:34 UTC+2

Revisione delle sei pagine HTML con identità flat e arrotondata conservata. Le verifiche a matrice hanno coperto le revisioni `9d6cf6c` e `8f1c28f`; il comportamento finale di indirizzi, ancore, ricaricamento e ritorno dalla Carriera è stato verificato in browser su `77f4c37`.

| Controllo eseguito | Esito osservato |
| --- | --- |
| Sei pagine × sei larghezze, testo 100% e 200% | 72 scenari senza overflow, immagini rotte o violazioni axe nei tag WCAG selezionati |
| Sei pagine × quattro viewport bassi, testo 100% e 200% | 48 scenari senza sovrapposizione tra area di lettura e navigazione; area di lettura minima osservata 194 px |
| Sei pagine × sei larghezze, spaziatura accessibile aumentata | 36 scenari senza overflow o violazioni axe selezionate |
| Tutti i 26 approfondimenti a 320 px e testo 200% | Contenuti aperti e controllati senza anomalie rilevate dal test |
| Ricerca `Mondiali`, filtro Premi, ricaricamento | Un risultato mantenuto; ricerca e filtro presenti nell’indirizzo |
| Carriera → indietro ai Record | Ricerca, filtro e risultato ripristinati |
| Collegamento con filtro e ancora di un risultato escluso | Ancora incoerente rimossa, filtro mantenuto |
| Fotografia → Escape | Dialogo chiuso, focus restituito al collegamento originale |
| Approfondimento aperto con Enter | Apertura nativa, animazione disattivata durante l’uso da tastiera |
| Controlli locali | 150 riferimenti, ancore, versioni cache e attributi verificati; test navigazione, preferiti, ricerca, URL e movimento ridotto superati; sintassi JS e diff controllati |

## Correzioni guidate dalle skill allegate

| Before | After | Why |
| --- | --- | --- |
| Ingressi su quasi tutti i blocchi di contenuto | Ingressi di 240 ms concentrati su testata e fotografie | Lettura stabile; motion più breve e pertinente (Emil, Impeccable) |
| Transizione dell’altezza degli approfondimenti | Apertura nativa e feedback con opacity/transform | Evitare animazioni che richiedono ricalcolo del layout (Emil, Vercel, UI/UX Pro Max) |
| Ricerca conservata solo nello stato interno | Parametri pubblici `q` e `f` con validazione | Ripristino e condivisione coerenti (Vercel, TypeUI) |
| Intestazione completa su viewport bassi | Navigazione compatta e testate più brevi | Più spazio utile al contenuto (TypeUI, UI/UX Pro Max, Hallmark) |
| Metadati e font critici incompleti | Metadati social e preload dei due font locali | Condivisione identificabile e caricamento tipografico anticipato (Taste, Vercel) |

Applicati anche il controllo del contrasto tramite axe, la gerarchia tipografica, i target interattivi, i focus, la coerenza dei raggi e delle superfici. Il design esistente è stato mantenuto secondo il mandato di raffinamento.

## Limiti della verifica

Browser usato: Chrome cloud, con viewport reali dentro iframe. Nessuna certificazione WCAG o garanzia di assenza di difetti. Non verificati Safari/WebKit, dispositivi fisici, lettori di schermo, resa su stampante e guasti di rete provocati. Le metriche temporali dell’iframe non costituiscono una misura affidabile dei Core Web Vitals: nessun nuovo punteggio di prestazioni viene dichiarato. La fixture standalone è stata rigenerata dal codice corrente.

---

# Archivio della verifica precedente

Questo rapporto riguarda la versione precedente. Il successivo redesign flat sostituisce componenti, tipografia e navigazione; le indicazioni sul kit e sulle lenti non descrivono la versione corrente.

# Rapporto di verifica — Messi

Verifica del 13/10/2026, 23:23 UTC+2. Base: `848a4c37380fe1ab271d49fa2f49c2d7960b18aa`. Ramo: `redesign/responsive-quality`.

## Copertura e risultato

Home, Carriera, Trofei, Record, Argentina e Crediti sono stati letti e controllati nel renderer Chrome del browser cloud. Per le larghezze di dispositivo è stato usato un iframe con viewport reale 320, 390, 768 o 1440 px, alto 844 px. Le viste desktop sono state osservate anche in una finestra principale. Il browser locale non era avviabile; la verifica è stata completata tramite l’anteprima del ramo su raw.githack.com.

| Verifica | Risultato osservato |
| --- | --- |
| Sei pagine × quattro larghezze, testo 100% | 24 scenari senza overflow orizzontale rilevato |
| Sei pagine × quattro larghezze, testo 200% | 24 scenari senza overflow orizzontale rilevato dopo le correzioni |
| Tutti i 26 approfondimenti, 320 px / testo 200% | Nessun overflow o violazione axe rilevata negli stati aperti |
| Axe-core 4.10.3 | Zero violazioni nei tag WCAG 2 A/AA, 2.1 AA e 2.2 AA selezionati; 25–30 regole superate secondo la pagina |
| Ricerca `2012` | Quattro record pertinenti, comprese le stagioni 2011/12 e 2012/13 |
| Salva → Salvati → rimozione | Un record salvato, poi stato vuoto; focus restituito al filtro visibile |
| Ripristino dei filtri | Sette record visibili e focus nella ricerca |
| Condivisione desktop | Feedback «Link al record copiato» osservato |
| Accordion e link `trofei.html#barcellona-trofei` | Apertura reale, destinazione rivelata e scorrimento corretto |
| Foto del Barcellona | Dialogo aperto; Escape chiude e restituisce il focus alla foto |
| Cronologia | Carriera → ritorno browser ad Argentina verificato |
| Kit esterno disabilitato, Home a 390 px | Icone, barra e contenuti visibili; nessun overflow o violazione axe rilevata |
| JavaScript disabilitato | Home → Carriera via link nativi, accordion Barcellona aperto; nessun radio inattivo duplicato annunciato |
| Integrità statica | Sei pagine, 94 riferimenti locali, ancore, ID, heading principale, attributi immagini, tab e versioni asset validi |
| Test di logica | Tutti i test navigation, accordion e liquid superati |
| Sintassi e patch | Moduli eseguibili nei test; `git diff --check` superato |

Il controllo delle immagini nel renderer rileva errori nelle immagini effettivamente caricate; i file e i riferimenti delle altre immagini sono coperti dall’integrità statica. Le immagini lazy fuori viewport non sono dichiarate tutte scaricate da ogni scenario.

## Problemi corretti

- Superficie limitata a 402 px anche su desktop: ora layout adattivo con colonna di lettura e homepage più ampia.
- Gerarchia troppo uniforme: profilo, percorsi e dati distinguibili; numeri tabulari e tipografia scalabile; componenti condivisi in tutte le pagine.
- Dipendenza completa dalle icone e dalla geometria del kit esterno: fondazione locale e SVG originali come maschere CSS, integrazione mantenuta.
- Overflow a 320 px con testo 200%: fatti, timeline, pulsanti e filtri possono restringersi o andare a capo.
- Lente disallineata sui filtri a più righe: posizione verticale e altezza misurate.
- Focus perso dopo la rimozione di un elemento visibile solo in Salvati: ritorno a un controllo visibile.
- Link diretti non focalizzati da tastiera e target nominati intercettati: semantica nativa e focus corretti.
- Salvataggi non sincronizzati dopo `localStorage.clear()` in un’altra scheda: listener aggiornato.
- Callback ResizeObserver dell’accordion che lasciava `overflow:hidden` a pannello aperto: al riposo ripristina `overflow:visible`.
- Navigazione radio inattiva annunciata insieme al fallback senza script: ora nascosta in quel caso.
- Fotografia completa usata come piccola anteprima sulla Home: miniatura dedicata, originale e crediti preservati.
- Versioni asset obsolete: hash aggiornati per CSS, entry point e intero grafo dei moduli.
- Duplicazione di una frase nella biografia e nomi tecnici/inglesi nei crediti: testo ripulito.

## Prestazioni

La miniatura passa da **393.450 a 26.544 byte**, una riduzione del **93,25%** per quell’immagine. Il totale non compresso di CSS e quattro moduli applicativi è **73.632 byte**. Il sito non introduce framework o font remoti. Il kit esterno resta una richiesta separata; axe-core viene caricato soltanto nello strumento di QA.

Campione standalone della homepage su Chrome desktop, attraverso il CDN di anteprima, senza throttling di rete o CPU: **FCP 1.024 ms, LCP 1.024 ms, CLS 0** nel campione iniziale raccolto. Questi valori non sono dati sul campo, una mediana di più dispositivi o un benchmark della futura pubblicazione.

Il controllo in iframe aveva registrato CLS 1 con passaggio dalla geometria pre-stile del documento al contenitore finale. Il fixture standalone non ha registrato layout shift. Per questo il valore dell’iframe è trattato come dato del contesto di test e non come CLS di produzione. `tests/performance.html` consente di ripetere la misura standalone; `tests/generate_performance.py` lo rigenera dalla homepage corrente.

## Test ripetibili

```sh
python3 tests/site_test.py
node tests/navigation.test.mjs
node tests/accordion.test.mjs
node tests/liquid.test.mjs
```

I test JavaScript coprono richieste concorrenti/abortite e fallback, storage valido/bloccato, ricerca normalizzata, resize durante apertura, reversibilità, chiusura inert, soglie pointer, annullamenti, proiezione, resistenza, continuità della velocità, geometria a righe e movimento ridotto. I test di motion usano doppi di eventi e geometrie: verificano la logica, non il frame rate reale.

`tests/browser.html` esercita il renderer e axe. Eseguire una suite alla volta e attendere il JSON finale; una modifica del viewport o l’esecuzione di axe può influenzare la diagnostica delle prestazioni. Per i numeri di caricamento usare il fixture standalone.

## Limiti espliciti

Non verificati Safari/iOS su dispositivo fisico, VoiceOver/NVDA, pannello nativo Web Share, tastiera virtuale mobile, gesture touch su hardware, forced colors e movimento/trasparenza ridotti nel renderer, distribuzione reale dei Web Vitals o frame rate su telefoni. Il successo di axe non certifica conformità WCAG completa. I controlli di storage bloccato e concorrenza sono test di logica, oltre ai percorsi browser indicati nella tabella.

Gli screenshot sono stati osservati nel browser. La revisione automatica ha rifiutato la lettura delle istruzioni per esportarli, classificandola fuori ambito; non sono consegnati come file. Il codice e i risultati rimangono consultabili sul ramo.

## Riferimenti

- [WCAG 2.2 — W3C](https://www.w3.org/TR/WCAG22/)
- [Novità WCAG 2.2 — WAI](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)
- [Palmarès ufficiale di Messi](https://messi.com/palmares/), ricontrollato il 13 ottobre 2026.
- Il progetto conserva l’adattamento originale della lente e il riferimento [GetStream/awesome-liquid-glass](https://github.com/GetStream/awesome-liquid-glass); non dichiara equivalenza con il renderer nativo iOS.
