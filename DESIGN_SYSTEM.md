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
