export const site = {
  name: 'ViaSOS',
  domain: 'viasos.it',
  url: 'https://viasos.it',
  vatNumber: '02606820690',
  title: 'ViaSOS | Carroattrezzi e Soccorso Stradale Vicino in Tutta Italia',
  description:
    'Trova il carroattrezzi di riferimento dalla tua posizione. Apri la pagina del comune più vicino e chiama: nessun numero da inserire, ricerca manuale disponibile.',
  nav: [
    { href: '#come-funziona', label: 'Come funziona' },
    { href: '#servizi', label: 'Servizi' },
    { href: '#copertura', label: 'Copertura' },
    { href: '#perché-viasos', label: 'Perché ViaSOS' },
    { href: '#partner', label: 'Diventa partner' },
    { href: '#faq', label: 'FAQ' },
  ],
}

export const vehicleTypes = [
  'Auto',
  'Moto o scooter',
  'Furgone',
  'Camper',
  'Altro veicolo',
]

export const vehicleProblems = [
  'Veicolo in panne',
  'Incidente',
  'Batteria scarica',
  'Gomma danneggiata',
  'Veicolo bloccato',
  'Trasporto programmato',
  'Altro problema',
]

export const services = [
  {
    title: 'Auto in panne',
    image: '/images/realistic/service-auto-panne.webp',
    description:
      'Richiesta rapida per auto ferme su strada, in parcheggio, in area urbana o in zone extraurbane coperte dalla rete.',
  },
  {
    title: 'Recupero dopo incidente',
    image: '/images/realistic/service-incident.webp',
    description:
      'Invio dei dati principali a carroattrezzi compatibili quando il veicolo non può proseguire dopo un sinistro.',
  },
  {
    title: 'Batteria scarica',
    image: '/images/realistic/service-battery.webp',
    description:
      'Assistenza per veicoli che non si avviano, con posizione precisa e contatto diretto tramite telefono o WhatsApp.',
  },
  {
    title: 'Gomma danneggiata',
    image: '/images/realistic/service-tire.webp',
    description:
      'Supporto in caso di gomma forata, danneggiata o veicolo fermo senza possibilità di ripartenza sicura.',
  },
  {
    title: 'Recupero veicolo bloccato',
    image: '/images/realistic/service-blocked.webp',
    description:
      'Richieste per auto, moto o furgoni bloccati in accessi difficili, cortili, parcheggi o strade secondarie.',
  },
  {
    title: 'Trasporto auto',
    image: '/images/realistic/service-transport.webp',
    description:
      'Trasporto programmato o urgente verso officina, carrozzeria, deposito o destinazione concordata con il carroattrezzi.',
  },
  {
    title: 'Soccorso moto e scooter',
    image: '/images/realistic/service-moto.webp',
    description:
      'Recupero di due ruote ferme, non marcianti o danneggiate, con richiesta inviata ai carroattrezzi adatti.',
  },
  {
    title: 'Soccorso furgoni',
    image: '/images/realistic/service-van.webp',
    description:
      'Assistenza per furgoni leggeri in panne, veicoli commerciali bloccati e trasporti verso officine specializzate.',
  },
  {
    title: 'Soccorso camper',
    image: '/images/realistic/service-camper.webp',
    description:
      'Richieste per camper e veicoli ricreazionali, dove compatibilità del mezzo e distanza del carroattrezzi contano molto.',
  },
]

export const faqs = [
  {
    question: 'Come posso trovare un carroattrezzi vicino a me?',
    answer:
      'Tocca Usa la mia posizione e autorizza il browser. ViaSOS apre la pagina del comune più vicino al punto rilevato, con il numero da chiamare. Puoi anche scegliere manualmente il comune.',
  },
  {
    question: 'Quanto tempo serve per ricevere una risposta?',
    answer:
      'La ricerca del comune avviene appena il browser fornisce una posizione sufficientemente precisa. La risposta telefonica e il tempo d’intervento dipendono invece dal professionista, dalla zona e dal traffico.',
  },
  {
    question: 'Posso trovare contatti alternativi?',
    answer:
      'Sì. Nella pagina comunale trovi un riferimento principale e contatti alternativi ordinati per distanza geografica. La homepage non inoltra automaticamente chiamate o richieste.',
  },
  {
    question: 'Come viene scelto il carroattrezzi?',
    answer:
      'La homepage seleziona il comune il cui centro è più vicino al punto rilevato. Nella pagina locale il contatto è associato alla città più vicina fra i numeri in elenco. Le distanze non indicano la posizione dei mezzi o tempi di arrivo.',
  },
  {
    question: 'Perché un carroattrezzi più vicino può essere più conveniente?',
    answer:
      'Meno distanza può significare meno tempo di arrivo e meno chilometri da percorrere. Il prezzo finale viene comunque comunicato dal carroattrezzi incaricato prima o durante la gestione della richiesta.',
  },
  {
    question: 'Devo scaricare un’applicazione?',
    answer:
      'No. ViaSOS funziona dal browser. Per trovare il comune e aprire il numero da chiamare non serve registrarsi o inserire il telefono.',
  },
  {
    question: 'Posso condividere la posizione senza conoscere l’indirizzo?',
    answer:
      'Sì. Puoi autorizzare la geolocalizzazione del browser. Se non concedi il permesso o la posizione è imprecisa, cerca il nome del comune o della provincia e scegli il risultato corretto.',
  },
  {
    question: 'Quali veicoli possono essere recuperati?',
    answer:
      'La richiesta può riguardare auto, moto, scooter, furgoni, camper e altri veicoli. La compatibilità viene valutata dai carroattrezzi in base al mezzo e al problema indicato.',
  },
  {
    question: 'ViaSOS funziona in tutta Italia?',
    answer:
      'ViaSOS lavora con una rete nazionale in crescita. La copertura può variare in base alla zona e alla disponibilità effettiva dei carroattrezzi nel momento della richiesta.',
  },
  {
    question: 'Come conosco il prezzo dell’intervento?',
    answer:
      'Il preventivo e le condizioni dell’intervento vengono comunicati dal carroattrezzi incaricato. ViaSOS aiuta a inoltrare una richiesta chiara con posizione, veicolo e problema.',
  },
  {
    question: 'Posso richiedere soccorso di notte o nei giorni festivi?',
    answer:
      'Puoi inviare la richiesta anche in orari serali, notturni o festivi. La risposta dipende dai carroattrezzi disponibili nella zona in quel momento.',
  },
  {
    question: 'Cosa devo fare dopo aver trovato il comune?',
    answer:
      'Tocca Chiama ora nella pagina del comune. Comunica il punto esatto, il tipo di veicolo e il problema; chiedi disponibilità, tempi e costo prima di confermare.',
  },
]
