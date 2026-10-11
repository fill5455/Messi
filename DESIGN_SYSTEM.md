# MESSI · Criteri di progettazione del progetto

Autori: Filippo Girolami, Alex Amadio e Stefano Amadio.
Framework recepito il 9 ottobre 2026, fuso di riferimento UTC+2.

## Regole condivise
- Una CTA dominante per contesto. Azioni secondarie subordinate.
- Pattern di navigazione familiari, etichette concrete, nessun gergo tecnico nei flussi.
- Informazioni correlate vicine e gruppi diversi separati chiaramente.
- Informazioni complesse mostrate progressivamente; gruppi di massimo 5–7 elementi.
- Scala di spaziatura: 8, 16, 24, 32, 48, 64, 96 px.
- Scala dei titoli basata sul rapporto 1,25; corpo di lettura minimo 16 px, interlinea 1,5–1,6.
- Contrasto del testo normale almeno 4,5:1; testo grande almeno 3:1.
- Palette con fondo dominante, superfici/testi secondari e accento funzionale. Obiettivo compositivo 60–30–10.
- Spazio negativo significativo; obiettivo compositivo 30–40%, da giudicare anche sul contenuto reale.
- Stato del sistema comunicato subito; obiettivo di feedback locale entro 100 ms.
- Default, hover, pressed, focus, disabled, loading, success, error definiti quando pertinenti.
- Chiudere i dialoghi facilmente, supportare Escape e ripristinare il focus.
- Contenuti accessibili da tastiera e con tecnologie assistive.
- Zoom, ridistribuzione del testo e preferenze di movimento rispettati.
- Le fotografie devono essere autentiche e associate al soggetto, periodo e momento corretto.
- Il glassmorphism conserva una base scura leggibile e un fallback senza blur.

## Desktop, sopra 1024 px
- Layout a 12 colonne, allineamenti coerenti, navigazione estesa.
- Apertura progettata per mostrare messaggio e azione principale entro 700 px.
- Spaziature multiple di 8 px; testo con lunghezza di riga controllata.
- Ogni controllo cliccabile ha feedback al passaggio del mouse.

## Smartphone e tablet, fino a 1024 px
- Colonna unica, inclusi i gruppi secondari; margini laterali di 24 px, ridotti a 16 px sotto 360 px.
- Nessuno scorrimento orizzontale richiesto per leggere i contenuti.
- Target di tocco del progetto almeno 48×48 px, separati da almeno 8 px.
- Navigazione compatta e azione inferiore nella zona del pollice.
- Apertura progettata per mostrare messaggio e prima azione entro 600 px.
- Le foto hanno il proprio blocco; i testi non dipendono dalla leggibilità sopra una foto.
- Moduli, se introdotti: una colonna, label sopra il campo, errori descrittivi, prevenzione invii incompleti.

## Verifica
I criteri non equivalgono a una certificazione automatica. I controlli CSS e DOM sono documentati nel README. La verifica visiva su browser reali, lo zoom reale e la valutazione completa WCAG richiedono un ambiente di test disponibile. Eventuali limiti di verifica vanno dichiarati senza trasformarli in risultati superati.

## Sistema consolidato
Un solo foglio strutturale (`styles.css`) e una definizione breve del materiale (`glass.css`); nessuna sovrapposizione di revisioni responsive. Mobile: sezioni 64 px, gruppi 32–48 px, pannelli 24–32 px; desktop: sezioni 96 px, pannelli fino a 48 px. I selettori compatti mantengono una sola scelta visibile alla volta. Le fotografie non sono sfondi dei pannelli di lettura.

## Composizione e firma degli autori
Percorso: introduzione, carriera, statistiche, trofei e Mondiale, record, momenti e biografia. La firma di Filippo Girolami, Alex Amadio e Stefano Amadio compare nell’introduzione, accanto alla prima azione. Record, cronologia e note biografiche usano raggruppamento e divisori al posto di cornici ripetute. Le statistiche secondarie sono riunite in una sola superficie. Applicate le indicazioni pertinenti delle skill Redesign, Impeccable Layout/Craft Floor e Apple Design presenti negli ZIP allegati.

## Direzione editoriale e motion system — revisione con le nuove skill
Applicate Redesign (Taste), Impeccable e Animate (Emil Kowalski) dagli ZIP allegati. L’introduzione desktop separa titolo e fotografia su due campi della griglia a 12 colonne: foto a colori naturali, nessun testo sovrapposto, firma dei tre autori nel primo contesto. Su mobile fotografia, messaggio e azione seguono una colonna. I titoli delle sezioni e le introduzioni condividono allineamenti; i quattro numeri principali formano un’unica superficie con divisori, evitando schede ripetute.

Le transizioni usano CSS e Web Animations API, senza dipendenze: pressione 160 ms, filtri 160 ms, capitoli 200–220 ms, menu 200/160 ms, dialoghi 250/180 ms. Menu e dialoghi entrano ed escono lungo lo stesso percorso. Le transizioni interrotte ripartono dallo stato visivo corrente; i risultati vengono aggiornati subito. Interazioni da tastiera e preferenza di movimento ridotto usano stati immediati. Hover limitati a puntatori precisi. Un solo ingresso fotografico introduttivo; nessuna cascata di animazioni durante la lettura.

Verifica: parser, media, interazioni e refresh automatico, comportamento del movimento e griglia responsive in emulazione DOM/CSS. Questo controllo non equivale a una verifica visiva o del movimento in browser reale.

## Fotografie e movimento narrativo — revisione 16
Tutte le fotografie hanno versioni JPEG progressive (predefinite) e WebP locali, nelle stesse dimensioni e a colori naturali. Se una richiesta fallisce, l’immagine passa automaticamente al formato alternativo. Non si nascondono le immagini mancanti: resta una descrizione con messaggio di errore; alla riconnessione si ritenta la richiesta. Fogli e script usano un identificatore di versione per evitare combinazioni obsolete nella cache. Controllate le corrispondenze e la decodifica di tutti gli asset, incluse le copie fotografiche.

Le animazioni comprendono apertura fotografica e tipografica dell’introduzione, rivelazione delle foto contestuali, ingresso dei trofei con intervalli di 50 ms, composizione dedicata del Mondiale e apertura dei contenuti nei pannelli espandibili. Le transizioni narrative, eseguite una volta, durano 640–960 ms; le interazioni rimangono rapide (160–250 ms). I contenuti sono visibili anche senza JavaScript o IntersectionObserver; le foto lazy attendono il caricamento prima dell’animazione. Movimento ridotto e tastiera mantengono stati immediati.

La verifica locale non riproduce un dispositivo reale: non è stata identificata con certezza la causa delle immagini mancanti segnalate. Sono stati rinforzati formati, cache, fallback e recupero della connessione.
