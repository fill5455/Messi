# Sistema visivo

## Intento

Archivio editoriale sportivo con lettura lineare, gerarchie nette e fotografie documentali. Il layout mobile è stato ridisegnato come interfaccia autonoma: contenuti raggruppati, navigazione raggiungibile col pollice e superfici essenziali. La versione desktop usa il proprio foglio di stile.

## Colori mobile

- Sfondo pagina: #f7f7f3
- Superficie: #ffffff
- Testo principale: #17242b
- Testo secondario: #58666d
- Linee: #d8dfe0
- Accento: #176b7d
- Accento tenue: #e8f1f2
- Accento caldo: #a94f39
- Superficie scura: #10242d

Il contrasto usa l’accento scuro su superfici chiare. Le superfici scure sono riservate alle aree di racconto e dati.

## Tipografia e spazi

Manrope locale per interfaccia e dati; titoli e contenuti seguono una scala tipografica compatta e leggibile. Il testo base è 16 px con interlinea 1,55. Il margine mobile è 20 px, le sezioni hanno 56 px di respiro, i bordi sono contenuti (6–8 px) e le superfici restano piatte.

## Layout e responsive

- Da 320 a 679 px: foglio mobile dedicato, indice flottante inferiore, dati organizzati in blocchi leggibili e galleria a due colonne (una sotto i 360 px).
- Da 680 px: il foglio desktop seleziona la composizione ampia preesistente.
- Entrambi i fogli sono selezionati da styles/site.css; le regole mobile non si mescolano a quelle desktop.

## Interazioni e accessibilità

- Navigazione mobile ancorata in basso con area sicura per i dispositivi con notch.
- Controlli touch con dimensioni comode e stati di focus visibili.
- Galleria filtrabile e visualizzatore con frecce e chiusura da tastiera.
- Dettagli dei trofei in dialogo nativo.
- Scorrimento fluido, disattivato per chi preferisce movimento ridotto.
- Immagini con caricamento differito e dimensioni dichiarate per ridurre gli spostamenti di layout.

## Asset

Sono mantenuti solo asset riferiti da markup o script. Le coppie JPG/WebP ancora presenti supportano il fallback dei browser; percorsi, attribuzioni e licenze sono raccolti in scripts/media.js. Il font Manrope è locale e la sua licenza si trova in licenses/.
