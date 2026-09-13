# Pagine comunali ViaSOS

## Ricerca rapida dalla homepage

La homepage usa `LocationFinder` e `src/lib/location-flow.mjs`: geolocalizzazione
solo su click, massimo 10 secondi per il fix e 8 secondi per l'archivio statico.
La posizione precisa non lascia il browser. Il comune viene selezionato per
distanza dal suo centro, non tramite confini amministrativi o geocodifica esterna.
Fix con accuratezza peggiore di 10 km o lontani oltre 25 km dal centro più vicino
richiedono una scelta manuale. La ricerca per nome e provincia è sempre disponibile.
La homepage non invia richieste, non chiama automaticamente e non chiede il telefono.
Le pagine di richiesta già esistenti mantengono i rispettivi flussi.

`npm run verify:location` verifica coordinate di esempio, posizione fuori Italia,
accuratezza insufficiente, permesso negato, timeout, URL di destinazione e presenza
dei Lottie originali. Il test usa coordinate simulate, non la posizione reale
del dispositivo. Il controllo viene eseguito anche prima del deploy.

Le pagine sono generate dopo l'export Next.js da `scripts/build-local-seo.mjs`.
Il contenuto è HTML leggibile senza JavaScript. CSS e JavaScript sono condivisi;
nessuna fotografia o libreria di animazione viene duplicata per comune.

## Dati e manutenzione

- `municipalities.json`: 7.896 comuni dal dataset RP92/comuni-italiani (CC BY 4.0), acquisito il 12 settembre 2026. Fonte anagrafica ISTAT; CAP/coordinate Garda Informatica. Archivio non ufficiale, aggiornabilità da verificare prima di future rigenerazioni.
- Coordinate di Lirio, Castegnero e Nanto integrate da OpenDataSicilia/comuni-italiani.
- `contacts.json`: numeri recuperati dai repository pubblici dell'account alessio-aesthetic e dalla pagina Lucca di ViaSOS. La data di controllo riguarda la presenza nei sorgenti, non un test telefonico dell'operatività.
- Bari e Ravenna non dispongono di telefoni numerici nei sorgenti e sono esclusi (`excluded-contacts.json`). Non vengono generati numeri fittizi.
- `routing-audit.json`: associazioni comune/telefono, distanza e alternative.
- `page-manifest.json`: hash dei contenuti e data di modifica effettiva per sitemap. Versionare dopo cambi editoriali; nessun aggiornamento automatico della data per le pagine invariate.
- `verification.json`: esito della verifica integrale più recente.

Per aggiornare le fonti, recuperare i due file sorgente con `node scripts/prepare-local-data.mjs` (il comando riutilizza la cache locale se presente), verificare il diff dei contatti, quindi `npm run build` e `npm run verify:local-seo`. Per piccoli aggiornamenti del numero, modificare direttamente `contacts.json` mantenendo la provenienza. Non usare un prefisso per dedurre una città.

Il numero principale minimizza la distanza geodetica fra i centri delle città.
Non rappresenta il percorso stradale, una posizione live, un tempo di arrivo o una copertura confermata. La pagina rende espliciti questi limiti, soprattutto per riferimenti distanti e isole.

## SEO e comportamento

URL gerarchici `/carroattrezzi/regione/provincia/comune/`, titolo e H1 locali,
canonical assoluto, description specifica, WebPage e BreadcrumbList JSON-LD,
link ai comuni vicini, indici territoriali e sitemap suddivise per regione.
Le landing preesistenti restano utilizzabili per i relativi flussi di richiesta.
I testi comuni spiegano come richiedere il servizio; dati territoriali, contatto,
distanze, CAP e alternative cambiano per comune. Non si afferma che tutti i
testi siano editorialmente unici. Non sono create sedi, recensioni o disponibilità fittizie.

L'orologio mostra Europe/Rome; non è una prova di disponibilità.
Il link `tel:` funziona senza JavaScript. Gli eventi `viasos:call` rimangono
locali al browser: nessuna chiamata di rete o tracciamento aggiuntivo.
Una futura integrazione analytics può sottoscriverli secondo il consenso previsto.

`npm run verify:local-seo` controlla tutte le pagine, almeno 600 parole nel corpo
dell'articolo, assegnazione geografica con formula indipendente, URL, canonical,
JSON-LD, link interni, sitemap e peso massimo di 1 GB. È obbligatorio nel workflow
prima del deploy. La conformità tecnica non garantisce indicizzazione o posizionamento.
