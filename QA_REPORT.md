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
