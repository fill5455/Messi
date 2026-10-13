# Messi — carriera, trofei e record

Sito statico indipendente dedicato a Lionel Messi. Sei pagine, un sistema visivo bianco con accento blu e navigazione persistente. HTML, CSS e moduli JavaScript nativi: nessun framework, backend o build obbligatorio.

## Esperienza

- Home con profilo, tre percorsi editoriali, traguardi e approfondimento sul Mondiale.
- Carriera e Trofei con approfondimenti progressivi; Argentina e Crediti completi.
- Layout adattivo: elenco su mobile, destinazioni e dati in colonne su desktop. Superficie fino a 1200 px; lettura fino a 880 px e homepage fino a 1100 px.
- Navigazione progressiva con cache, richieste annullabili, cronologia, scorrimento e stato per pagina. I documenti HTML rimangono disponibili senza JavaScript.
- Record con ricerca per testo/anno, filtri e salvataggi sul dispositivo; fallback di sessione se lo storage è bloccato.
- Condivisione tramite Web Share, appunti o dialogo con link selezionabile. Foto contestuali con dialogo nativo, Escape e restituzione del focus.
- Spring reversibili per pannelli e controlli; lente della tab bar trascinabile. Movimento ridotto supportato. Nessuna animazione fotografica automatica.

## Affidabilità e accessibilità

Focus visibile, skip link, descrizioni dei controlli, contatori live, pannelli chiusi inert, dialoghi nativi e controlli touch ampi. La rimozione di un record dal filtro Salvati restituisce il focus a un controllo visibile. I link diretti rivelano e focalizzano la destinazione durante la navigazione da tastiera. Gli aggiornamenti dello storage, incluso `clear()`, sincronizzano i salvataggi.

La tab bar mantiene il kit esterno `https://aiuxplayground.com/kits/ios-26/v1/ios.css`. Stili di base e icone originali locali consentono di usarla anche senza quel CSS. Il foglio esterno non è copiato nel progetto. Il fallback senza JavaScript usa link nativi e nasconde i radio inattivi. La lente segue anche filtri disposti su più righe.

Le immagini originali e le attribuzioni sono conservate in `credits.json`. La sola miniatura del Mondiale sulla Home è ridotta a 26.544 byte, rispetto ai 393.450 della foto completa; l’immagine completa resta nel capitolo Argentina. Nessuna nuova dipendenza di produzione. CSS e tutti i moduli importati hanno versioni derivate dal contenuto.

## Avvio e verifica

```sh
python3 -m http.server 8080
```

Aprire `http://localhost:8080/`. I percorsi relativi funzionano anche sotto `/Messi/`; `.nojekyll` resta presente.

```sh
python3 tests/site_test.py
node tests/navigation.test.mjs
node tests/accordion.test.mjs
node tests/liquid.test.mjs
```

Per la verifica del renderer, aprire `tests/browser.html`: selezione pagina, viewport 320/390/768/1440 px, testo 100/200%, assenza del kit esterno, scripting disabilitato, matrice completa e apertura di tutti gli approfondimenti. Il solo strumento QA carica axe-core 4.10.3 da jsDelivr; il sito pubblico non lo carica. Eseguire una suite alla volta e attendere il rapporto JSON.

`tests/performance.html` riproduce la Home in una finestra principale con osservatori di FCP, LCP e CLS; il pannello diagnostico compare dopo la misura. Rigenerare il fixture con `python3 tests/generate_performance.py` quando cambia la Home. Le metriche raccolte negli iframe possono includere artefatti del contenitore e non vanno trattate come Web Vitals di produzione.

Risultati, problemi corretti e limiti: [QA_REPORT.md](QA_REPORT.md). La verifica automatica non costituisce certificazione WCAG né verifica di fluidità su iPhone reale.
