# Composizione visiva corrente — 16 ottobre 2026

Questa revisione corregge l’ingombro delle aperture e l’uniformità eccessiva dei blocchi di Home, Carriera e Trofei. Usa componenti `r-*` e icone SVG locali `ui-*` nel foglio `assets/css/rebuilt.css`.

## Ordine e posizioni

- Home mobile: apertura compatta → quattro percorsi in griglia 2×2 (quando lo spazio del testo lo permette) → numeri → nazionale. A 390×844 i quattro collegamenti rientrano nell’area di lettura prima della barra mobile.
- Carriera: icona pagina → scorciatoie con stemmi → capitoli con stemma a sinistra, titolo sopra il periodo e testata distinta. Desktop: testo e cronologia a sinistra, foto e dati a destra, collegamento ai trofei su una riga completa. Mobile: stessa gerarchia in una colonna.
- Trofei: icona pagina → categorie con icone → intestazioni di sezione → schede squadra. Ogni competizione ha simbolo, nome, conteggio in badge e anni espandibili. Desktop: due colonne per le competizioni; mobile: una.

## Segnali visivi

Libro = carriera, coppa = trofei, grafico = record, bandiera = nazionale, pallone = gol, calendario = presenze/periodi, stella = premi. Icona accanto all’etichetta; nessuna funzione dipende dall’icona o dal colore. I percorsi Home hanno accenti blu, oro, viola e verde con testo scuro; superfici principali bianche o carta. Bordi, ombre leggere e testate colorate distinguono i livelli senza gradienti.

## Ritmo e accessibilità

Passi principali 16/24/32 px, spazi interni più contenuti sui telefoni. Target di almeno 44 px, focus visibile e testo al 200% gestito con ricomposizione delle griglie. Il feedback di pressione usa 1 px di spostamento solo senza movimento ridotto. Lo shell condiviso conserva la barra mobile fluttuante e la cronologia di lettura.

---

## Documentazione precedente (storica)

# Sistema corrente: Home, Carriera e Trofei ricostruite

16 ottobre 2026. Per queste tre pagine, `assets/css/rebuilt.css` e i componenti `r-*` sostituiscono le composizioni precedenti. `site.css` continua a definire lo shell condiviso, i font, la navigazione e le altre pagine.

## Architettura dei percorsi

- Home: introduzione → tre destinazioni fotografiche (Carriera, Trofei, Record) → tre numeri → percorso Argentina. Nessun secondo menu di squadre o azioni concorrenti nella testata.
- Carriera: indice locale con quattro capitoli → articoli cronologici sempre visibili → profilo → nazionale. Ogni club conduce alla propria sezione Trofei con un collegamento esplicito. Gli ID originali dei capitoli restano validi.
- Trofei: indice locale Club / Argentina / Premi → competizioni e quantità sempre visibili → edizioni vinte espandibili → finale del 2011. I club collegano al rispettivo capitolo Carriera. Le vecchie ancore dei gruppi sono conservate.

## Componenti e regole

Larghezza massima 1160 px, testo narrativo massimo 64 caratteri circa per riga, griglie con colonne `minmax(0,…)`. Margini 32 px desktop e 20/16 px mobile. Raggi principali 24–32 px. Superfici piatte bianco, carta e azzurro; blu inchiostro per il testo. DM Sans per lettura e sezioni, Barlow Condensed per l’apertura della Home.

Mobile: percorsi Home in righe con miniatura, capitoli in due colonne adattabili, articoli e trofei in una colonna. Contenuti primari senza accordion; solo elenchi di anni e fonti sono facoltativi. Immagini narrative ingrandibili con i controlli già esistenti. Focus visibile, etichette testuali, elementi interattivi di almeno 44 px. Ingressi di 240 ms limitati alle testate; movimento ridotto e uso da tastiera disattivano le animazioni. Nessun contenuto dipende dal movimento o da JavaScript per essere letto.

La navigazione mobile fluttuante e il ripristino della cronologia rimangono condivisi con Record, Argentina e Crediti. Tutte le pagine caricano il nuovo foglio per supportare anche i passaggi tramite navigatore client.

---

## Rapporti precedenti (storici)

# Messi — Editoriale arrotondato

La maglia argentina e la tipografia sportiva definiscono il linguaggio del sito. Tutte le sei pagine condividono il sistema; i contenuti cambiano composizione secondo il loro ruolo.

| Ruolo | Valore |
| --- | --- |
| Canvas | `#f7f7f2` |
| Inchiostro | `#14313e` |
| Secondario | `#49616b` |
| Azzurro Argentina | `#94d1ec` |
| Superficie secondaria | `#deeff5` |
| Oro del Mondiale | `#ecd16b` |
| Display | Barlow Condensed 700 desktop; DM Sans 700 mobile |
| Corpo e UI | DM Sans variabile, locale |
| Spaziatura | 8 / 16 / 24 / 32 / 48 / 64 / 96 px |
| Larghezza contenuti | Fino a 1200 px |
| Superfici | Piene, raggi 12 / 20 / 28 px, senza ombre o gradienti |

Home: ritratto, dati, percorsi editoriali, capitoli fotografici e racconto del Mondiale. Carriera: introduzione fotografica, disclosure e profilo laterale. Trofei: categorie e competizioni. Record: strumenti di ricerca e griglia leggibile. Argentina: cronologia e racconti; Crediti: informazioni e provenienze.

Navigazione a link: superiore su desktop, barra solida su mobile. La griglia della barra segue la dimensione del testo. Accordion nativi; feedback brevi e localizzati; dialoghi fotografici con focus nativo. Movimento ridotto rispettato. Nessuna dipendenza dal kit iOS precedente.

Riferimenti applicati dagli allegati: TypeUI (gerarchia, spaziatura e accessibilità), Taste (contenuto e composizione editoriale), Impeccable (nuova identità e qualità del rendering), Hallmark (struttura e tipografia), UI/UX Pro Max (flat design), guide di design engineering/motion (feedback e proprietà economiche), Web Interface Guidelines (semantica e stati).

Sotto 700 px il layout usa una sola colonna: testata ordinata in titolo, testo, azione e foto larga; dati su righe; capitoli e approfondimenti su superfici distinte. Testo primario 17 px con interlinea 1,75–1,8; titoli contenuti e margini esterni 14 px. La barra mobile usa icone con etichette persistenti.

La gerarchia di lettura usa DM Sans per titoli di sezione e approfondimenti anche sul desktop. Indici interni guidano alle sezioni; gli approfondimenti iniziano chiusi e preservano lo stato durante la navigazione. Ingressi fotografici di 240 ms, feedback di 180 ms e disclosure di 200 ms, con cancellazione e rispetto del movimento ridotto. I contenuti rimangono disponibili senza animazioni o JavaScript.

Le animazioni di ingresso interessano la testata e i capitoli fotografici; i blocchi di lettura restano stabili. Tastiera e movimento ridotto interrompono il movimento. Sotto 500 px di altezza l’interfaccia compatta intestazione, navigazione e testate per lasciare spazio alla lettura. Ricerca e filtri dei Record si riflettono nei parametri `q` e `f`, conservando hash e altri parametri del collegamento.

## Orientamento e navigazione mobile

La barra mobile è un dock fluttuante, staccato di 12 px dai bordi e sopra l’area sicura, con quattro destinazioni stabili, etichette e icone SVG. Solo la pagina realmente attiva viene evidenziata. Argentina e Crediti conservano un titolo persistente e un percorso Home → pagina, senza indicare un’altra pagina come corrente.

Ogni nuova navigazione parte dall’inizio. La scheda già attiva riporta in alto. Indietro/Avanti ripristinano la singola voce della cronologia, inclusi posizione di lettura, approfondimenti e filtri. Gli indici con freccia in basso spostano alla sezione nella stessa pagina; i collegamenti con freccia a destra aprono un percorso diverso.

I Trofei sono separati in pannelli per club, riconoscibili dallo stemma; gli stessi stemmi accompagnano i capitoli fotografici e i crediti. Le icone decorative hanno `aria-hidden`; i nomi visibili restano la fonte dell’etichetta accessibile.

## Composizione di lettura — revisione 15 ottobre, 23:50 UTC+2

La homepage usa una superficie blu inchiostro con ritratto affiancato al titolo su mobile; testo e azione occupano righe complete, senza una fotografia a tutta larghezza prima dei percorsi principali. Le destinazioni hanno icona, titolo, descrizione breve e freccia. La barra mobile usa una superficie scura, quattro etichette e una selezione azzurra. Le pagine interne usano testate bianche compatte e indici verticali a larghezza completa su mobile. Titoli dei pannelli e sezioni usano DM Sans per una lettura omogenea; Barlow Condensed resta nel marchio e nel titolo di apertura.

## Ordine delle pagine interne — 15 ottobre 2026

Le pagine interne condividono una colonna di lettura di massimo 1000 px, un indice breve e sezioni numerate. Carriera: profilo sintetico → tappe cronologiche → nazionale; nessuna sidebar con un ordine diverso su desktop. Trofei: club → Argentina → premi individuali → finale del 2011, con competizione, numero di titoli e anni su righe distinte. Argentina: elenco cronologico compatto → Copa América → Mondiale. Record: istruzioni e strumenti in un pannello, risultati in una sola colonna, numero prima del contesto e azioni dopo la descrizione. Crediti: progetto → fotografie → stemmi. Gli approfondimenti conservano gli ID originali e i collegamenti diretti.
