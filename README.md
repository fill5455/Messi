# Messi — Flat design

Sito HTML/CSS/JavaScript dedicato a Lionel Messi. Sei pagine con superfici piene, azzurro Argentina, tipografia Barlow Condensed + DM Sans ospitata localmente, fotografie reali e navigazione tramite link nativi.

La Home racconta il profilo, i numeri e i capitoli fotografici. Carriera presenta tappe e profilo laterale; Trofei raggruppa il palmarès; Record mantiene ricerca, filtri, salvataggi e condivisione. Argentina e Crediti completano il sito.

Niente ombre, gradienti, vetro, lenti animate o CSS esterno. Gli accordion sono nativi; foto e link restano utilizzabili senza JavaScript. Le fotografie complete e le attribuzioni sono conservate; le anteprime leggere sono registrate in `credits.json`. Licenze dei font in `assets/fonts/`.

Avvio locale: `python3 -m http.server 8080`. Percorsi relativi compatibili con GitHub Pages sotto `/Messi/`.

I controlli esistenti sono in `tests/`: integrità del sito, navigazione e storage, disclosure native, renderer responsive e accessibilità. `liquid.mjs` è mantenuto come codice storico e non è importato dall’applicazione flat.
