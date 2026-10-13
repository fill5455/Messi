# Sistema visivo — Archivio Messi

## Intento

Ricostruire la pagina come archivio editoriale mobile: poche decisioni per schermata, contenuti leggibili e immagini trattate come parte del racconto. La composizione per telefono è definita in `styles/mobile.css`; il foglio desktop resta separato.

## Fondazioni

- **Stile:** flat design editoriale. Superfici piatte, separatori leggeri e nessuna ombra decorativa nel layout mobile.
- **Palette:** carta `#f4f7f8`, bianco `#ffffff`, testo `#142630`, testo secondario `#53656e`, bordo `#d7e1e5`, azzurro `#8fd1ec`, blu `#177ca5`, blu profondo `#125b79`, blu tenue `#e7f4f9`, oro `#e8bd4e`, fondo scuro `#10242d`.
- **Tipografia:** Manrope locale; corpo 16 px con interlinea 1,55; titoli compatti e fluidi; etichette e didascalie mantenute leggibili a partire da 11 px.
- **Spaziatura:** griglia di 4 px. Gli spazi interni ai gruppi sono più stretti di quelli tra sezioni; le sezioni usano 48–64 px secondo la larghezza.
- **Forme:** raggi da 4–8 px per schede e controlli; forma a pillola riservata ai filtri fotografici.
- **Movimento:** transizioni brevi per menu e controlli, scorrimento con snap dove aiuta a esplorare; `prefers-reduced-motion` rimuove gli effetti non essenziali.

I principi del file ZIP TypeUI allegato sono applicati dove pertinenti: gerarchia, raggruppamento, ritmo su griglia, dimensioni dei controlli, focus e movimento accessibile. Il kit contiene linee guida di interfaccia, non fotografie di calcio: le immagini del racconto restano quelle attribuite nel repository.

## Layout mobile

- **320–679 px:** una colonna, margini laterali fluidi, contenuto largo al massimo 720 px, tipografia e spazi adattivi.
- **Barra inferiore:** cinque azioni nella zona del pollice — inizio, carriera, numeri, foto e menu. La sezione attiva segue lo scorrimento e usa `aria-current`.
- **Menu secondario:** trofei, cronologia, persona, aggiornamenti, fonti; compare sopra la barra e si chiude selezionando una destinazione o premendo Esc.
- **Contenuti:** capitoli selezionabili, numeri filtrabili, carosello dei trofei, cronologia e archivio di 24 fotografie filtrabile e apribile a schermo intero.
- **Immagini:** proporzioni dichiarate per limitare i salti di layout, alternative testuali, caricamento differito fuori dall’apertura.
- **Scorrimento:** solo liste e caroselli hanno scorrimento orizzontale; il documento resta verticale.

La soglia 680 px carica il foglio desktop esistente; tra 680 e 1024 px la barra mantiene una navigazione touch a cinque azioni. Sopra i 1024 px torna la navigazione nell’intestazione.

## Interazione e accessibilità

- Controlli touch con area di almeno 44 × 44 px, stati attivi distinguibili e anello di focus evidente.
- La barra espone quattro collegamenti diretti e un quinto controllo per le altre sezioni.
- Filtri con `aria-pressed`; selettori etichettati; menu e dialoghi utilizzabili da tastiera.
- Dialoghi nativi: Esc chiude, i comandi hanno nomi accessibili e la galleria consente di scorrere le immagini.
- Testi secondari con contrasto leggibile; movimento non necessario alla comprensione e disattivato per chi lo richiede.

## Controlli di qualità

Verificare a 320, 360, 390 e 430 px, poi attorno alla soglia 679/680 px. Controllare che non ci sia overflow orizzontale del documento e provare menu, selettori, filtri, trofei, galleria, tastiera e `prefers-reduced-motion`.
