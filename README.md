# Lionel Messi · La storia del 10

Archivio editoriale indipendente, in italiano. Versione 9 ottobre 2026; orari mostrati in UTC+2.

## Autori
Realizzato da **Filippo Girolami, Alex Amadio e Stefano Amadio**. Il credito è visibile nel sito e nei metadati.

## Pubblicazione — cartella completa, senza limiti di file
Caricare tutto il contenuto della cartella sul proprio host statico HTTPS, mantenendo la struttura. `index.html`, `styles.css`, `app.js` e `media.js` sono affiancati da `assets/images/`, `assets/fonts/` e `licenses/`. Nessuna compilazione o dipendenza necessaria per pubblicare il pacchetto. L’apertura locale mantiene i contenuti storici; gli aggiornamenti automatici partono su HTTP/HTTPS.

Immagini e font sono asset separati e locali: nessun caricamento di fotografie, font o librerie da CDN. Le immagini editoriali successive alla prima schermata usano lazy loading; la hero e i font principali hanno preload. La struttura permette sostituzioni e aggiornamenti senza ricodificare tutti gli asset nel JavaScript.

## Design e funzioni
Tema esclusivamente scuro; menu mobile; filtri per squadra; aggiornamento statistiche; galleria di trofei con dialogo accessibile e fotografie di dettaglio; palmarès espandibile; cronologia; biografia; fonti e crediti. HTML semantico, navigazione da tastiera, focus visibile, testo alternativo, riduzione del movimento. Le fotografie storiche sono fotografie reali: la hero usa una fotografia originale con una composizione grafica dedicata, senza scene sintetiche.

## Statistiche ufficiali aggiornabili
Fonte primaria: https://messi.com/ e https://messi.com/estadisticas-totales/.
Lettura diretta del servizio WordPress pubblico di messi.com, verificato con CORS:
- https://messi.com/wp-json/wp/v2/pages/73?_fields=content,modified
- https://messi.com/wp-json/wp/v2/pages/3313?_fields=content,modified

app.js legge il contenuto pubblico, verifica lo schema, somma i quattro contesti per confrontarli con i totali e rifiuta letture inconsistenti o regressive. Il parser elimina la compensazione animata di 0,5 presente nei contatori ufficiali. La disponibilità futura e il formato del servizio dipendono da messi.com; non è un'API contrattualmente garantita.

Timeout 12 secondi; cache localStorage di 60 secondi; verifica automatica all’apertura, ogni 60 secondi, al ritorno della scheda e alla riconnessione. Nessun pulsante di aggiornamento. Le schede nascoste sospendono il polling; dopo un errore i tentativi rallentano progressivamente fino a 5 minuti. L’aggiornamento dei totali dipende dalla pubblicazione dei dati ufficiali: non costituisce un feed delle partite in diretta. La data indica l'acquisizione effettiva, non l'aggiornamento editoriale del fornitore. In caso di errore resta il dato valido precedente con il suo timestamp, senza azzeramenti o dati inventati. Il conteggio degli assist può differire dagli archivi dei club. I titoli includono Under 20 e Olimpiadi secondo la fonte primaria.

## Partite live — configurazione facoltativa
Il pacchetto non contiene chiavi API né risultati simulati. Nel CONFIG di app.js, impostare `liveEndpoint` con l'URL HTTPS di un gateway esterno che autorizzi l'origine del sito via CORS. Le credenziali di API-Football, Sportmonks o altro provider devono risiedere esclusivamente sul gateway, mai nei file pubblici. Il gateway non è incluso nel pacchetto statico.

Formato JSON previsto:
```json
{"source":"API-Football","acquiredAt":"2026-10-08T22:00:00Z","fixtures":[{"home":"Inter Miami","away":"Avversario","homeGoals":1,"awayGoals":0,"status":"Secondo tempo","elapsed":65}]}
```
Polling ogni 15 secondi con partite presenti, 60 secondi senza partite; sospensione quando la scheda è nascosta; cache dell'ultimo risultato valido. Verificare piano, quota, licenza e copertura del provider selezionato.
Documentazione: https://www.api-football.com/documentation-v3 ; https://docs.sportmonks.com/football ; https://www.thesportsdb.com/api.php . Nessun abbonamento o credenziale è stato attivato.

## Altre fonti
FIFA: https://inside.fifa.com/en/tournaments/mens/worldcup/qatar2022/news/triumphant-argentina-conclude-unprecedented-fifa-world-cup ; https://www.fifa.com/en/tournaments/mens/worldcup/articles/messi-final-farewell . Il dato di 26 presenze è esplicitamente riferito al 2022.
FC Barcelona: https://www.fcbarcelona.com/en/card/2214377/leo-messi .
Transfermarkt: https://www.transfermarkt.com/lionel-messi/profil/spieler/28003 . Collegamento per dettagli stagionali e mercato; valore non riprodotto perché non verificato.
Biografia, premi e fondazione: https://messi.com/biografia/ ; https://messi.com/palmares/ ; https://messi.com/fundacion-leo-messi/ .

## Crediti delle immagini e diritti
Archivio indipendente, non affiliato a Messi o ai club. Gli stemmi sono autentici e non ridisegnati. Marchi e materiali ufficiali restano dei titolari. Le immagini da messi.com non hanno una licenza pubblica di riuso verificata; l'attribuzione non equivale ad autorizzazione commerciale. Per una pubblicazione commerciale ottenere le autorizzazioni necessarie. Le fotografie Creative Commons conservano attribuzione e licenza; eventuali adattamenti delle immagini BY-SA seguono la stessa licenza. I riferimenti dei dati sono documentati qui; l’interfaccia presenta direttamente i contenuti, senza citazioni o rimandi informativi. Le attribuzioni fotografiche e le licenze restano accessibili nei crediti.

### Messi Logo
Leo Messi official website; individual photographer/designer not specified · Copyrighted official asset; no public reuse license stated

https://static.messi.com/wp-content/uploads/2019/10/messi-logo-01.png

Licenza: https://messi.com/

Authentic photographic asset from official Messi website. No Creative Commons or blanket reuse grant verified; rights remain with respective holders. Official Messi brand emblem; trademark rights remain.

### Newells Logo
//www.newellsoldboys.com.ar/ · Public domain

https://commons.wikimedia.org/wiki/File:Newell%27s_Old_Boys_Escudo.png

Licenza: https://commons.wikimedia.org/wiki/File:Newell%27s_Old_Boys_Escudo.png

Authentic club/federation mark; trademark rights remain with owner. Copyright status follows linked source; this does not grant a trademark license.

### Barcelona Logo
FC Barcelona · PD

https://en.wikipedia.org/wiki/File:FC_Barcelona_(crest).svg

Licenza: https://en.wikipedia.org/wiki/File:FC_Barcelona_(crest).svg

Authentic club/federation mark; trademark rights remain with owner. Copyright status follows linked source; this does not grant a trademark license. Public-domain claim is US-only; possibly non-free in source country.

### Psg Logo
Paris Saint-Germain Football Club · PD

https://en.wikipedia.org/wiki/File:Paris_Saint-Germain_F.C..svg

Licenza: https://en.wikipedia.org/wiki/File:Paris_Saint-Germain_F.C..svg

Authentic club/federation mark; trademark rights remain with owner. Copyright status follows linked source; this does not grant a trademark license. Public-domain claim is US-only; possibly non-free in source country.

### Miami Logo
Inter Miami CF · Fair use

https://en.wikipedia.org/wiki/File:Inter_Miami_CF_logo.svg

Licenza: https://en.wikipedia.org/wiki/File:Inter_Miami_CF_logo.svg

Authentic club/federation mark; trademark rights remain with owner. Copyright status follows linked source; this does not grant a trademark license. Wikipedia hosts under non-free fair-use rationale; no general reuse permission is supplied.

### Argentina Logo
Argentine Football Association · Public domain

https://commons.wikimedia.org/wiki/File:Argentine_Football_Association_logo.svg

Licenza: https://commons.wikimedia.org/wiki/File:Argentine_Football_Association_logo.svg

Authentic club/federation mark; trademark rights remain with owner. Copyright status follows linked source; this does not grant a trademark license.

### Messi Barcelona
www.realvalladolid.es · CC BY-SA 4.0

https://commons.wikimedia.org/wiki/File:Real_Valladolid_-_FC_Barcelona,_2018-08-25_(55).jpg

Licenza: https://creativecommons.org/licenses/by-sa/4.0

Original resized and compressed to WebP only. CSS cropping may be used. Attribution and linked license required for Creative Commons images.


### Messi Miami
Bryan Berlin · CC BY-SA 4.0

https://commons.wikimedia.org/wiki/File:Lionel_Messi_NYCFC_Miami_24_Sep_2025-096.jpg

Licenza: https://creativecommons.org/licenses/by-sa/4.0

Original resized and compressed to WebP only. CSS cropping may be used. Attribution and linked license required for Creative Commons images.

### Trophy Worldcup
Leo Messi official website; individual photographer/designer not specified · Copyrighted official asset; no public reuse license stated

https://static.messi.com/wp-content/uploads/2020/03/mundial-futbol.png

Licenza: https://messi.com/

Authentic photographic asset from official Messi website. No Creative Commons or blanket reuse grant verified; rights remain with respective holders. Transparent official trophy cutout at original small dimensions.

### Trophy Ballon
Leo Messi official website; individual photographer/designer not specified · Copyrighted official asset; no public reuse license stated

https://static.messi.com/wp-content/uploads/2020/03/balon-de-oro.png

Licenza: https://messi.com/

Authentic photographic asset from official Messi website. No Creative Commons or blanket reuse grant verified; rights remain with respective holders. Transparent official trophy cutout at original small dimensions.

### Trophy Champions
Leo Messi official website; individual photographer/designer not specified · Copyrighted official asset; no public reuse license stated

https://static.messi.com/wp-content/uploads/2020/03/champions.png

Licenza: https://messi.com/

Authentic photographic asset from official Messi website. No Creative Commons or blanket reuse grant verified; rights remain with respective holders. Transparent official trophy cutout at original small dimensions.

### Trophy Copa
Leo Messi official website; individual photographer/designer not specified · Copyrighted official asset; no public reuse license stated

https://static.messi.com/wp-content/uploads/2021/07/Copa-america.png

Licenza: https://messi.com/

Authentic photographic asset from official Messi website. No Creative Commons or blanket reuse grant verified; rights remain with respective holders. Transparent official trophy cutout at original small dimensions.

### Trophy Liga
Leo Messi official website; individual photographer/designer not specified · Copyrighted official asset; no public reuse license stated

https://static.messi.com/wp-content/uploads/2020/03/liga.png

Licenza: https://messi.com/

Authentic photographic asset from official Messi website. No Creative Commons or blanket reuse grant verified; rights remain with respective holders. Transparent official trophy cutout at original small dimensions.

### Trophy Boot
Leo Messi official website; individual photographer/designer not specified · Copyrighted official asset; no public reuse license stated

https://static.messi.com/wp-content/uploads/2020/03/boat-d_or.png

Licenza: https://messi.com/

Authentic photographic asset from official Messi website. No Creative Commons or blanket reuse grant verified; rights remain with respective holders. Transparent official trophy cutout at original small dimensions.

### Messi · Argentina a Qatar 2022
Hossein Zohrevand / Tasnim News Agency · CC BY 4.0

https://commons.wikimedia.org/wiki/File:Lionel-Messi-Argentina-2022-FIFA-World-Cup.jpg

Licenza: https://creativecommons.org/licenses/by/4.0/

Ridimensionamento e compressione WebP. Il layout può ritagliare la fotografia.

### Messi · Argentina a Qatar 2022
Hossein Zohrevand / Tasnim News Agency · CC BY 4.0

https://commons.wikimedia.org/wiki/File:Lionel_Messi_WC2022.jpg

Licenza: https://creativecommons.org/licenses/by/4.0/

Ridimensionamento e compressione WebP. Il layout può ritagliare la fotografia.

## Licenze dei font
Font locali Manrope e Oswald, SIL Open Font License 1.1.

### Manrope-OFL.txt

```text
Copyright 2018 The Manrope Project Authors (https://github.com/googlefonts/manrope)

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
http://scripts.sil.org/OFL


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded, 
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.

```

### Oswald-OFL.txt

```text
Copyright 2016 The Oswald Project Authors (https://github.com/googlefonts/OswaldFont)

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
https://scripts.sil.org/OFL


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded, 
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.

```

## Immagine del trionfo mondiale
Immagine ufficiale: https://static.messi.com/wp-content/uploads/2022/12/MESSI-Stats-COPA.jpg

Copyrighted official asset; no public reuse license stated. Authentic photographic asset from official Messi website. No Creative Commons or blanket reuse grant verified; rights remain with respective holders. Official website composition; resized/compressed only.

## Icone e nuova direzione visiva
Phosphor Icons, famiglia Regular, MIT. SVG incorporati come simboli nello stesso HTML, senza dipendenze esterne. Fonte: https://github.com/phosphor-icons/core .

Nessuna impostazione del tema è più letta o scritta. L’interfaccia è solo scura. La cache dei dati resta invariata.

### Fotografia del trofeo · trophy-champions-photo
David Flores · CC BY 2.0

https://commons.wikimedia.org/wiki/File:Trofeo_UEFA_Champions_League.jpg

https://creativecommons.org/licenses/by/2.0

Authentic photograph. Resized and compressed only; no crop, cutout or redraw. CSS crop possible with linked license/attribution retained.



### Licenza Phosphor Icons
```text
MIT License

Copyright (c) 2023 Phosphor Icons

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```


## Selezione fotografica rivista — 9 ottobre 2026
14 fotografie nella galleria, presentate in gruppi di sei. Rimosse foto mosse o deboli, soggetti troppo piccoli, fotografie senza rapporto con il passaggio narrativo e la Scarpa d’Oro di un altro giocatore. Il PSG utilizza un vero scatto ufficiale PSG–Nantes del 2021; il Pallone d’Oro mostra Messi con il suo premio del 2023; il saluto all’Argentina usa l’immagine dell’annuncio del 7 ottobre 2026. Dove manca una fotografia appropriata, la cronologia mantiene il testo senza un’immagine sostitutiva fuorviante. Il marchio LaLiga del 2023 è stato tolto dal racconto degli anni di Messi a Barcellona.

Le immagini ufficiali mantengono i watermark; nessuna licenza pubblica di riuso verificata, come indicato nei crediti. Nessun ingrandimento artificiale del file sorgente; i trofei piccoli sono presentati con dimensioni più contenute.

### New York City FC–Inter Miami — 24 settembre 2025
Bryan Berlin · CC BY-SA 4.0

https://commons.wikimedia.org/wiki/File:Lionel_Messi_NYCFC_Miami_24_Sep_2025-081.jpg

Licenza/diritti: https://creativecommons.org/licenses/by-sa/4.0/

### PSG–Nantes · 2021
Leo Messi official website; individual photographer not identified · Copyrighted official image; no public reuse license verified

https://messi.com/en/galeria/?mgi_45=16230%2Fpsg-v-nantes

Licenza/diritti: https://messi.com/terminos-y-condiciones/

### Ritratto di Messi con l’Argentina.
Hossein Zohrevand / Tasnim News Agency · CC BY 4.0

https://commons.wikimedia.org/wiki/File:Lionel_Messi_WC2022.jpg

Licenza/diritti: https://creativecommons.org/licenses/by/4.0/

### Ottavo Pallone d’Oro · Parigi, 2023
Leo Messi official website; individual photographer not identified · Copyrighted official image; no public reuse license verified

https://messi.com/leo-gana-su-octavo-balon-de-oro/

Licenza/diritti: https://messi.com/terminos-y-condiciones/

### Il capitolo americano, con Inter Miami.
Bryan Berlin · CC BY-SA 4.0

https://commons.wikimedia.org/wiki/File:Lionel_Messi_NYCFC_Miami_24_Sep_2025-096.jpg

Licenza/diritti: https://creativecommons.org/licenses/by-sa/4.0

### Composizione fotografica ufficiale pubblicata da messi.com.
Leo Messi official website; individual photographer/designer not specified · Copyrighted official asset; no public reuse license stated

https://static.messi.com/wp-content/uploads/2022/12/MESSI-Stats-COPA.jpg

Licenza/diritti: https://messi.com/

### PSG–Nantes · 2021
Leo Messi official website; individual photographer not identified · Copyrighted official image; no public reuse license verified

https://messi.com/en/galeria/?mgi_45=16230%2Fpsg-v-nantes

Licenza/diritti: https://messi.com/terminos-y-condiciones/

### Il saluto all’Argentina · fonte ufficiale, 7 ottobre 2026
Leo Messi official website; individual photographer not identified · Copyrighted official image; no public reuse license verified

https://messi.com/emotivo-adios-de-leo-con-la-seleccion-con-un-gol-y-doble-asistencia/

Licenza/diritti: https://messi.com/terminos-y-condiciones/

### New England Revolution–Inter Miami — 9 luglio 2025
Bryan Berlin · CC BY-SA 4.0

https://commons.wikimedia.org/wiki/File:Lionel_Messi_NE_Revolution_Inter_Miami_7.9.25-143.jpg

Licenza/diritti: https://creativecommons.org/licenses/by-sa/4.0/

### Messi in campo con il Barcellona.
www.realvalladolid.es · CC BY-SA 4.0

https://commons.wikimedia.org/wiki/File:Real_Valladolid_-_FC_Barcelona,_2018-08-25_(55).jpg

Licenza/diritti: https://creativecommons.org/licenses/by-sa/4.0

### Messi con l’Argentina a Qatar 2022.
Hossein Zohrevand / Tasnim News Agency · CC BY 4.0

https://commons.wikimedia.org/wiki/File:Lionel-Messi-Argentina-2022-FIFA-World-Cup.jpg

Licenza/diritti: https://creativecommons.org/licenses/by/4.0/

## Nuova esperienza editoriale
Capitoli navigabili di carriera con statistiche coerenti con la fonte primaria; foto documentali della Coppa del Mondo e del Pallone d’Oro; finale mondiale con risultato e rigori; credito autori nel finale; barra di lettura discreta. Nessun autoplay, scroll obbligato o animazione continua.

## Presentazione editoriale
I contenuti sono esposti direttamente nel sito. I link alle fonti dei dati e i riferimenti alle API sono conservati in questa documentazione; restano visibili solo i crediti e le licenze delle immagini. Il pannello live viene nascosto finché non è configurato un endpoint.

## Design editoriale · versione 4
Sistema CSS riscritto in modo unitario: apertura fotografica con traguardi, tabellone statistico, capitoli di carriera immersivi, griglia fotografica asimmetrica, bacheca con scatti documentali, finale mondiale e racconto cronologico. Composizioni responsive dedicate a desktop, tablet e telefono; nessuno scroll obbligato. Le entrate leggere si eseguono una sola volta e rispettano la riduzione del movimento. I contenuti restano disponibili senza animazioni.

## Design glassmorphism · versione 5
`styles.css` conserva gli stili strutturali; `glass.css` definisce il nuovo sistema di superfici e le composizioni responsive. Vetro scuro con base leggibile, blur/saturazione progressivi, bordo luminoso e ombre stratificate. Nessuna fotografia generata: gli asset documentali sono mantenuti.
Su telefono, le fotografie e i contenuti hanno blocchi separati; galleria, trofei, racconti e biografia sono in una colonna. I controlli hanno almeno 48 px di area utile e il corpo dei testi è 16 px con interlinea 1,6. I dettagli rimangono nei dialoghi accessibili. Sono rispettate riduzione movimento e, sui browser che la supportano, riduzione trasparenza. Senza backdrop-filter, il fondo scuro preserva il testo.

## Nuove fotografie contestuali

### Il bacio alla Coppa.
Messi kisses the Copa América trophy after Argentina’s victory over Brazil at Maracanã.

Pagina: https://messi.com/leo-campeon-y-mvp-de-la-copa-america/
Originale: https://static.messi.com/wp-content/uploads/2021/07/WhatsApp-Image-2021-07-11-at-10.26.48.jpeg
Autore: non indicato
Licenza: diritti riservati; riuso non autorizzato dalla sola presenza sul sito ufficiale

Adattamenti: ridimensionamento proporzionale e compressione WebP; eventuale ritaglio di presentazione via CSS.

### La notte più difficile.
Messi covers his face after Argentina’s loss to Germany in the 2014 World Cup final.

Pagina: https://commons.wikimedia.org/wiki/File:Lionel_Messi_in_tears_after_the_final.jpg
Originale: https://upload.wikimedia.org/wikipedia/commons/2/27/Lionel_Messi_in_tears_after_the_final.jpg
Autore: Agência Brasil
Licenza: CC BY 3.0 BR
https://creativecommons.org/licenses/by/3.0/br/
Adattamenti: ridimensionamento proporzionale e compressione WebP; eventuale ritaglio di presentazione via CSS.

### La gioia del Camp Nou.
Messi celebrates with Éric Abidal and Dani Alves during Barcelona–Mallorca at Camp Nou.

Pagina: https://commons.wikimedia.org/wiki/File:Gran_Messi,_Bar%C3%A7a_Mallorca.jpg
Originale: https://upload.wikimedia.org/wikipedia/commons/5/5a/Gran_Messi%2C_Bar%C3%A7a_Mallorca.jpg
Autore: Juan C. Niño
Licenza: CC BY-SA 2.0
https://creativecommons.org/licenses/by-sa/2.0/
Adattamenti: ridimensionamento proporzionale e compressione WebP; eventuale ritaglio di presentazione via CSS.

### Prima del fischio.
Messi and Argentina teammates carrying boots on their way to a training session in Beijing; official gallery title TRAINING SESSION 13-6-2023.

Pagina: https://messi.com/en/galeria/
Originale: https://static.messi.com/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-14-at-14.03.29.jpeg
Autore: non indicato
Licenza: diritti riservati; riuso non autorizzato dalla sola presenza sul sito ufficiale

Adattamenti: ridimensionamento proporzionale e compressione WebP; eventuale ritaglio di presentazione via CSS.

### Il primo trionfo americano.
Messi celebrates his goal for Inter Miami during the Leagues Cup final against Nashville at GEODIS Park.

Pagina: https://messi.com/en/galeria/
Originale: https://static.messi.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-20-at-07.11.23.jpeg
Autore: non indicato
Licenza: diritti riservati; riuso non autorizzato dalla sola presenza sul sito ufficiale

Adattamenti: ridimensionamento proporzionale e compressione WebP; eventuale ritaglio di presentazione via CSS.

### Una squadra, una prima volta.
Inter Miami team celebrates the 2023 Leagues Cup title with trophy in foreground, Messi standing near center; this is a team celebration, not Messi individually lifting it.

Pagina: https://messi.com/un-gol-de-leo-da-el-primer-titulo-de-la-historia-al-inter-miami/
Originale: https://static.messi.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-20-at-07.11.26-1.jpeg
Autore: non indicato
Licenza: diritti riservati; riuso non autorizzato dalla sola presenza sul sito ufficiale

Adattamenti: ridimensionamento proporzionale e compressione WebP; eventuale ritaglio di presentazione via CSS.

## Framework applicato a tutto il sito
Griglia a 12 colonne sopra 1024 px; colonna unica su smartphone e tablet, inclusi gruppi secondari. Spaziature e dimensioni verticali fisse in multipli di 8 px. Scala dei titoli basata sul rapporto 1,25; corpo 16 px e interlinea 1,6. Apertura ridotta e navigazione inferiore touch; una sola CTA dominante viene mantenuta visibile con IntersectionObserver. Archivio visivo rimosso; restano le foto contestuali. Sei nuove fotografie contestuali, con autori e diritti documentati.

Controlli eseguiti: parser dei dati, asset locali, interazioni DOM, regole CSS a 320/390/600/768/1024/1440 px, ritmo delle spaziature. L’emulazione DOM non sostituisce una verifica visiva su browser reale e non certifica automaticamente WCAG. L’ambiente di anteprima browser non è disponibile.

## Fotografie dei trofei — revisione attuale
Conteggi espliciti di titoli o premi vinti. Champions League e LaLiga usano fotografie reali del museo del FC Barcelona; la Scarpa d’Oro mostra Messi con i suoi sei premi europei nel 2019. Qatar 2022 usa la fotografia originale della premiazione, senza trattamento blu.

- Champions League: https://commons.wikimedia.org/wiki/File:2006_Champions_League_Trophy.jpg — Gaetano Porcaro; CC BY 2.0. Commons version already cropped, colors fixed/enhanced/sharpened by PlanckEpoch in 2016. Credit photographer and source; indicate subsequent resize/compression.

- LaLiga: https://commons.wikimedia.org/wiki/File:Col%C2%B7leccions_del_Museu_del_FC_Barcelona_16.jpg — Nicholas Frisardi / Nicholas Gemini; CC BY-SA 4.0. Credit Nicholas Gemini (Nicholas Frisardi), Commons source and license. Adapted versions retain compatible ShareAlike terms. EXIF orientation normalized.

- Le sei Scarpe d’Oro di Messi: https://www.fcbarcelona.com/en/news/1453566/messi-receives-his-sixth-golden-shoe — fotografo non indicato; copyright, licenza pubblica non dichiarata. Official FC Barcelona photograph, photographer and reuse license not stated on source. No Creative Commons or public-domain claim.

- Campione del mondo — Qatar 2022: https://messi.com/en/galeria/ — fotografo non indicato; copyright, licenza pubblica non dichiarata. Official messi.com photograph. Photographer and reuse license not stated. Site footer credits Leo Messi Management S.L.U.; no Creative Commons or public-domain claim. Natural color retained; no blue tint or composition.

## Immagini scelte dal committente — 9 ottobre 2026
Le tre fotografie sostituiscono le immagini di Mondiale, Champions League e LaLiga in schede e dettagli. Sono conservate localmente, compresse in WebP senza viraggio cromatico. Le schede separano foto e testo; i ritagli variano per competizione e schermo. I materiali sono protetti da copyright, senza licenza pubblica di riuso verificata.

- worldcup: https://wallpaperaccess.com/full/14139924.jpg

- champions: https://static.messi.com/wp-content/uploads/2019/12/copa_champions2009_amb_senyera-scaled.jpeg

- laliga: https://assets.goal.com/images/v3/blt35111b8b8b46699a/b4178487b0b223762672dd950ea2af4833f8662e.jpg?auto=webp&format=pjpg&width=3840&quality=60

## Revisione di gerarchia e movimento — 9 ottobre 2026
Rimossi Archivio visivo, relativo menu, visualizzatore fotografico e codice delle interazioni di galleria. Restano le fotografie contestuali di carriera, trofei, biografia e momenti. Rimosse etichette decorative, numerazione delle sezioni, numerazione dei capitoli e frasi ridondanti sotto i conteggi. Etichette e metadati leggibili a 16 px. Stemmi, icone e testi usano allineamenti coerenti con il contenuto.

Animazioni: un solo ingresso fotografico, apertura e chiusura del menu e del dettaglio trofei, cambio capitolo e transizione dei conteggi dopo la selezione squadra. Le interazioni mostrano subito il risultato; le animazioni non ritardano i dati. Tutte rispettano prefers-reduced-motion; nessun movimento continuo o effetto parallax.

## Layout unificato — 9 ottobre 2026
Sostituite le regole stratificate delle revisioni precedenti con un unico foglio mobile-first, affiancato da una breve definizione delle superfici glass. Sezioni separate da padding verticale di 64 px su mobile e 96 px su desktop; pannelli con 24–48 px di spazio interno. Fotografie e testi separati in carriera, Mondiale e momenti.

Su smartphone/tablet la selezione squadra e capitolo usa controlli nativi con etichette sopra il campo; su desktop restano i pulsanti. La prima schermata mobile elimina riepiloghi ripetuti e la fascia dei club, già presenti negli altri contenuti. Il layout desktop mantiene la griglia a 12 colonne. Tutte le immagini raster nell’HTML dichiarano le proprie dimensioni effettive; preload dei due pesi Manrope realmente utilizzati.

Controlli: comportamento dei selettori sincronizzato con i pulsanti, navigazione, dialoghi, dati e fallback; emulazione DOM/CSS a 320, 360, 390, 430, 600, 768, 1024, 1025, 1280 e 1440 px. Non sono screenshot o verifiche visive in un browser reale; non costituiscono certificazione WCAG.

## Composizione e firma degli autori
Percorso: introduzione, carriera, statistiche, trofei e Mondiale, record, momenti e biografia. La firma di Filippo Girolami, Alex Amadio e Stefano Amadio compare nell’introduzione, accanto alla prima azione. Record, cronologia e note biografiche usano raggruppamento e divisori al posto di cornici ripetute. Le statistiche secondarie sono riunite in una sola superficie. Applicate le indicazioni pertinenti delle skill Redesign, Impeccable Layout/Craft Floor e Apple Design presenti negli ZIP allegati.

La firma resta statica e leggibile durante l’ingresso della foto. Le animazioni ripetute di entrata su ogni sezione sono state sostituite da un solo ingresso fotografico nell’introduzione; restano le transizioni funzionali di menu, filtri, capitoli e dialoghi. Aggiunti fallback per trasparenza ridotta e contrasto aumentato. Il caricatore automatico Impeccable non ha eseguito il contesto per un limite di permessi; sono stati letti direttamente PRODUCT.md, DESIGN.md e i playbook Layout/Craft Floor, verificando le regole tramite il codice e l’emulazione CSS/DOM.

## Direzione editoriale e motion system — revisione con le nuove skill
Applicate Redesign (Taste), Impeccable e Animate (Emil Kowalski) dagli ZIP allegati. L’introduzione desktop separa titolo e fotografia su due campi della griglia a 12 colonne: foto a colori naturali, nessun testo sovrapposto, firma dei tre autori nel primo contesto. Su mobile fotografia, messaggio e azione seguono una colonna. I titoli delle sezioni e le introduzioni condividono allineamenti; i quattro numeri principali formano un’unica superficie con divisori, evitando schede ripetute.

Le transizioni usano CSS e Web Animations API, senza dipendenze: pressione 160 ms, filtri 160 ms, capitoli 200–220 ms, menu 200/160 ms, dialoghi 250/180 ms. Menu e dialoghi entrano ed escono lungo lo stesso percorso. Le transizioni interrotte ripartono dallo stato visivo corrente; i risultati vengono aggiornati subito. Interazioni da tastiera e preferenza di movimento ridotto usano stati immediati. Hover limitati a puntatori precisi. Un solo ingresso fotografico introduttivo; nessuna cascata di animazioni durante la lettura.

Verifica: parser, media, interazioni e refresh automatico, comportamento del movimento e griglia responsive in emulazione DOM/CSS. Questo controllo non equivale a una verifica visiva o del movimento in browser reale.

## Fotografie e movimento narrativo — revisione 16
Tutte le fotografie hanno versioni JPEG progressive (predefinite) e WebP locali, nelle stesse dimensioni e a colori naturali. Se una richiesta fallisce, l’immagine passa automaticamente al formato alternativo. Non si nascondono le immagini mancanti: resta una descrizione con messaggio di errore; alla riconnessione si ritenta la richiesta. Fogli e script usano un identificatore di versione per evitare combinazioni obsolete nella cache. Controllate le corrispondenze e la decodifica di tutti gli asset, incluse le copie fotografiche.

Le animazioni comprendono apertura fotografica e tipografica dell’introduzione, rivelazione delle foto contestuali, ingresso dei trofei con intervalli di 50 ms, composizione dedicata del Mondiale e apertura dei contenuti nei pannelli espandibili. Le transizioni narrative, eseguite una volta, durano 640–960 ms; le interazioni rimangono rapide (160–250 ms). I contenuti sono visibili anche senza JavaScript o IntersectionObserver; le foto lazy attendono il caricamento prima dell’animazione. Movimento ridotto e tastiera mantengono stati immediati.

La verifica locale non riproduce un dispositivo reale: non è stata identificata con certezza la causa delle immagini mancanti segnalate. Sono stati rinforzati formati, cache, fallback e recupero della connessione.
