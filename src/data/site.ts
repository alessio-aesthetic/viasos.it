export const site = {
  name: 'ViaSOS',
  domain: 'viasos.it',
  url: 'https://viasos.it',
  vatNumber: '02606820690',
  title: 'ViaSOS | Carroattrezzi e Soccorso Stradale Vicino in Tutta Italia',
  description:
    'Invia la tua posizione e ViaSOS cerca automaticamente il carroattrezzi disponibile più vicino. Una sola richiesta, risposta tramite WhatsApp e rete di partner in tutta Italia.',
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
    image: '/images/micro/service-auto-panne.webp',
    description:
      'Richiesta rapida per auto ferme su strada, in parcheggio, in area urbana o in zone extraurbane coperte dalla rete.',
  },
  {
    title: 'Recupero dopo incidente',
    image: '/images/micro/service-incident.webp',
    description:
      'Invio dei dati principali a carroattrezzi compatibili quando il veicolo non può proseguire dopo un sinistro.',
  },
  {
    title: 'Batteria scarica',
    image: '/images/micro/service-battery.webp',
    description:
      'Assistenza per veicoli che non si avviano, con posizione precisa e contatto diretto tramite telefono o WhatsApp.',
  },
  {
    title: 'Gomma danneggiata',
    image: '/images/micro/service-tire.webp',
    description:
      'Supporto in caso di gomma forata, danneggiata o veicolo fermo senza possibilità di ripartenza sicura.',
  },
  {
    title: 'Recupero veicolo bloccato',
    image: '/images/micro/service-blocked.webp',
    description:
      'Richieste per auto, moto o furgoni bloccati in accessi difficili, cortili, parcheggi o strade secondarie.',
  },
  {
    title: 'Trasporto auto',
    image: '/images/micro/service-transport.webp',
    description:
      'Trasporto programmato o urgente verso officina, carrozzeria, deposito o destinazione concordata con il carroattrezzi.',
  },
  {
    title: 'Soccorso moto e scooter',
    image: '/images/micro/service-moto.webp',
    description:
      'Recupero di due ruote ferme, non marcianti o danneggiate, con richiesta inviata ai carroattrezzi adatti.',
  },
  {
    title: 'Soccorso furgoni',
    image: '/images/micro/service-van.webp',
    description:
      'Assistenza per furgoni leggeri in panne, veicoli commerciali bloccati e trasporti verso officine specializzate.',
  },
  {
    title: 'Soccorso camper',
    image: '/images/micro/service-camper.webp',
    description:
      'Richieste per camper e veicoli ricreazionali, dove compatibilità del mezzo e distanza del carroattrezzi contano molto.',
  },
]

export const faqs = [
  {
    question: 'Come posso trovare un carroattrezzi vicino a me?',
    answer:
      'Compila il modulo, inserisci il telefono, seleziona veicolo e problema e condividi la posizione. ViaSOS prepara una richiesta completa e la indirizza verso i carroattrezzi presenti nelle vicinanze, partendo da quelli potenzialmente più vicini.',
  },
  {
    question: 'Quanto tempo serve per ricevere una risposta?',
    answer:
      'Dipende dalla zona, dal traffico, dal tipo di veicolo e dalla disponibilità dei carroattrezzi. Il vantaggio e che non devi chiamare un numero dopo l’altro: la richiesta può essere verificata progressivamente nella rete.',
  },
  {
    question: 'ViaSOS contatta un solo carroattrezzi?',
    answer:
      'No. Il punto di forza della piattaforma e proprio la ricerca progressiva: se un carroattrezzi non può intervenire, la richiesta può passare a quello successivo compatibile e più vicino.',
  },
  {
    question: 'Come viene scelto il carroattrezzi?',
    answer:
      'La ricerca parte dalla posizione condivisa e considera i carroattrezzi disponibili e compatibili presenti nella rete al momento della richiesta. L’obiettivo e trovare una disponibilità vicina, non assegnare il lavoro in modo casuale.',
  },
  {
    question: 'Perché un carroattrezzi più vicino può essere più conveniente?',
    answer:
      'Meno distanza può significare meno tempo di arrivo e meno chilometri da percorrere. Il prezzo finale viene comunque comunicato dal carroattrezzi incaricato prima o durante la gestione della richiesta.',
  },
  {
    question: 'Devo scaricare un’applicazione?',
    answer:
      'No. ViaSOS funziona dal browser e prepara una richiesta inviabile tramite WhatsApp. Non servono registrazioni complesse o app aggiuntive.',
  },
  {
    question: 'Posso condividere la posizione senza conoscere l’indirizzo?',
    answer:
      'Sì. Puoi usare la geolocalizzazione del browser. Se non vuoi concedere il permesso, puoi scrivere manualmente strada, riferimento, uscita, parcheggio o punto vicino.',
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
    question: 'Cosa devo fare dopo aver inviato la richiesta?',
    answer:
      'Controlla WhatsApp e tieni il telefono raggiungibile. Il carroattrezzi disponibile potrà contattarti per confermare dettagli, destinazione e condizioni dell’intervento.',
  },
]
