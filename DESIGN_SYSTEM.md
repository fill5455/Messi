# Sistema visivo mobile

## Obiettivo

Raccontare la carriera di Lionel Messi in una pagina editoriale mobile che si legge e si naviga senza sforzo. Una gerarchia principale per volta: introduzione, capitoli, numeri, palmarès, storie e archivio fotografico. Le sezioni desktop restano nel foglio separato.

## Fondazioni

- Stile: flat, editoriale, fotografico; superfici piane, bordi sottili, nessuna ombra decorativa.
- Palette mobile:
  - Pagina `--paper`: #f5f7fa
  - Superficie `--surface`: #ffffff
  - Testo `--ink`: #142235
  - Secondario `--muted`: #566579
  - Bordo `--line`: #d9e0e8
  - Accento `--blue`: #2459d3
  - Accento scuro `--blue-dark`: #1945aa
  - Accento morbido `--blue-soft`: #eaf0ff
  - Dettaglio `--gold`: #e3b64d
- Tipografia: Manrope locale; corpo 16 px / 1,55, metadati da 10–12 px, titoli con scala fluida e interlinea stretta.
- Spazi: griglia di 4 px; passi comuni 8, 12, 16, 20, 24, 32, 48 e 72 px. Spazi interni più stretti di quelli tra gruppi e sezioni.
- Forme: angoli 6–8 px per contenuti e controlli; pillola solo per filtri.
- Movimento: transizioni brevi e funzionali; scorrimento orizzontale con snap; rispetto di `prefers-reduced-motion`.

## Layout e breakpoint

- 320–679 px: foglio dedicato in `styles/mobile.css`, contenuto centrato e largo al massimo 720 px, margine laterale 20 px (16 px sotto i 360 px), sezioni in colonna.
- Da 680 px: `styles/desktop.css`, caricato da `styles/site.css`.
- Barra d’azione flottante con area sicura per notch e menu a comparsa sopra la barra.
- Immagini a larghezza piena nel racconto; archivio a due colonne con una copertina a tutta larghezza.
- Carosello dei trofei con scorrimento a scatto e controlli espliciti.

## Interazione e accessibilità

- Ogni controllo touch deve avere area minima 44 × 44 px e separazione visibile.
- Stati attivi distinguibili con testo/forma oltre al colore; focus da tastiera sempre evidente.
- Un’azione primaria per volta; navigazione secondaria raccolta nel menu.
- Filtri con stato `aria-pressed`; immagini apribili con pulsanti; dialoghi chiudibili da tastiera.
- Testo alternativo descrittivo, proporzioni immagine dichiarate, messaggi di errore leggibili.
- Nessuna animazione necessaria per comprendere il contenuto; motion ridotto supportato.

## Componenti principali

- **Apertura:** titolo, descrizione breve, una fotografia, credito e invito alla carriera.
- **Capitoli:** selettore etichettato, fotografia, descrizione e tre numeri.
- **Statistiche:** cinque filtri scorrevoli, quattro valori principali e dati secondari raggruppati.
- **Trofei:** card fotografiche orizzontali; il dettaglio si apre solo su richiesta.
- **Cronologia:** storie ordinate per squadra e data, in schede compatte.
- **Archivio:** 24 immagini filtrabili; scorrimento naturale, anteprima a schermo intero.
- **Fonti:** attribuzioni e licenze raccolte in una disclosure.

## Verifiche prima del rilascio

- Controllare larghezze 320, 360, 390 e 430 px, oltre alla soglia 679/680.
- Nessuno scorrimento orizzontale della pagina; overflow limitato a caroselli e filtri.
- Tutti i controlli raggiungibili con tastiera e comodi al tocco.
- Filtri, capitoli, statistiche, trofei, menu e galleria continuano a funzionare.
- Contrasto, focus visibile e movimento ridotto verificati.

