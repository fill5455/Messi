# Messi — direzione iOS 26

## Superficie e navigazione
- Superficie mobile `ios-surface`: 402px nominali, max-width 100%, altezza 100dvh.
- Tema chiaro senza classe dark.
- Quattro schede: Home (home), Carriera (book-open), Trofei (star), Record (arrow-up).
- Componente fornito dal kit esterno, senza copia o riscrittura di ios.css.
- `--tabs:4` sulla barra; un input checked per pagina. Nessun badge o ricerca.
- Tab bar assoluta sul fondo della superficie, safe-area e 120px riservati nel contenuto.
- Header fisso nella struttura; pagina scorrevole internamente. Indici sticky dentro il contenuto.

## Stile dell’applicazione
- Carattere di sistema: -apple-system / BlinkMacSystemFont / Segoe UI / sans-serif.
- Fondo #f2f2f7, testo #1c1c1e, secondario #636366, accento #007aff.
- Titoli pagina 40px, hero 54px, titoli sezione 28px, testo 15–16px.
- Margini 20px; superfici raggruppate bianche con raggio 20–28px; azioni a pillola.
- Fotografie integrate nei racconti; nessun archivio fotografico.
- Focus visibile; controlli dell’applicazione 44–48px o più; prefers-reduced-motion.

## Da verificare in browser
Caricamento del kit esterno e delle icone, resa della tab bar, 320/375/390/402px, Safari iOS, safe-area, zoom e tastiera. Questi controlli visivi non sono dichiarati eseguiti.
