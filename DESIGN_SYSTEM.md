# Messi — chiarezza mobile

## Obiettivo
L’utente deve riconoscere il soggetto e scegliere dove andare prima di incontrare racconti lunghi o fotografie. Ogni pagina ha un titolo che descrive il contenuto. I dati hanno sempre etichetta e contesto.

## Gerarchia
- Livello 1: titolo pagina, 32px / 1.25.
- Livello 2: sezioni, 22px / 1.25; etichette di gruppo 18px.
- Livello 3: titoli dei controlli e dei record, 18px.
- Lettura: 16px / 1.65. Descrizioni: 15–17px. Note e crediti: almeno 14px.
- Font di sistema. Nessuna etichetta tutta maiuscola, slogan, numerazione decorativa o titolo spezzato.

## Fondamenti
- Fondo #f2f2f7, superfici #fff, testo #1c1c1e, secondario #52525b, azioni #005fc9.
- Margini 20px; gruppi 20px di raggio; separatori leggeri.
- Tre livelli di distanza: 4–8px per label, 12–20px per gruppi, 24–28px per sezioni.
- Nessuna ombra sulle carte informative, nessun testo su fotografie.

## Composizione
- Home: ritratto in cornice 72×88px + testo → destinazioni → dati di sintesi.
- Carriera: quattro righe espandibili, una aperta alla volta.
- Trofei: Club / Argentina / Premi individuali; categorie senza annidamenti.
- Record: valore, nome, periodo, spiegazione nello stesso blocco.
- Fotografie: cinque file pertinenti, nessun archivio o galleria.
- Header unico; niente indici sticky che competono con la tab bar.

## Interazioni
- Kit iOS 26 esterno invariato; quattro input radio, una selezione per pagina.
- Superficie 402px/max-width100%; scorrimento interno e safe-area.
- Details nativi con summary ampio; feedback di pressione immediato sui controlli dell’app.
- Link a categorie: apertura automatica del details di destinazione.
- Focus visibile, target ampi, fallback senza JavaScript, reduced motion.

## Verifica visiva ancora da eseguire
320/375/390/402px, Safari iOS, kit esterno, testo ingrandito, safe-area, focus e lettura con VoiceOver. La verifica statica non dimostra la qualità del rendering.

## Identità e precisione
- Cinque stemmi in una colonna da 48px; nei titoli del palmarès cornice da 36px. Object-fit:contain, nessuna deformazione.
- Summary con tre colonne: identità / nome e periodo / indicatore. Testo flessibile, stemma e chevron non comprimibili.
- Icone principali identiche a quelle della tab bar: book-open, star, arrow-up.
- Fotografie di Barcellona, PSG e Miami all’interno del rispettivo capitolo, dopo il testo. Composizioni integrali e rapporto intrinseco corretto.
- Record: titolo e periodo a sinistra, valore allineato a destra; spiegazione separata sotto.
