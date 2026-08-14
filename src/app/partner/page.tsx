import type { Metadata } from 'next'

import { PartnerBadge, PartnerShell } from '@/components/viasos/partner-shell'

export const metadata: Metadata = {
  title: 'ViaSOS per carroattrezzi',
  description:
    'Ricevi richieste nella tua zona, scegli se intervenire e paghi solo dopo un lavoro svolto e incassato.',
  robots: { index: false, follow: false },
}

const advantages = [
  ['È gratis entrare', 'Nessun abbonamento. Nessun costo mensile.'],
  ['Decidi sempre tu', 'Scegli tu se prendere il lavoro, il prezzo e il tempo di arrivo.'],
  ['Il cliente paga te', 'Parli direttamente con il cliente e ricevi il pagamento da lui.'],
  ['Paghi solo se lavori', '30 euro fissi solo dopo un servizio concluso e incassato.'],
]

export default function PartnerHome() {
  return (
    <PartnerShell>
      <main>
        <section className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <PartnerBadge>ViaSOS per carroattrezzi</PartnerBadge>
          <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-6xl">
            Più richieste. Più libertà. Zero abbonamenti.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-600 sm:text-xl">
            ViaSOS trova clienti che hanno bisogno di un carroattrezzi nella tua zona. Tu ricevi la richiesta, parli con il cliente e scegli se fare il lavoro.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="/partner/registrazione/" className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#25d366] px-7 py-4 font-black text-[#07111f] transition hover:bg-[#55e888]">
              Registrati gratis
            </a>
            <a href="/partner/login/" className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-4 font-black text-slate-900 transition hover:border-slate-400">
              Accedi
            </a>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <PartnerBadge>Come funziona</PartnerBadge>
              <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
                Semplice: arriva il cliente, scegli tu.
              </h2>
            </div>
            <ol className="mt-10 grid gap-5 sm:grid-cols-3">
              <li className="rounded-2xl border border-slate-200 p-6">
                <span className="text-sm font-black text-[#075e54]">1</span>
                <h3 className="mt-3 text-xl font-black text-slate-950">Ricevi la richiesta</h3>
                <p className="mt-2 font-semibold leading-7 text-slate-600">Può arrivare con chiamata diretta o con messaggio WhatsApp.</p>
              </li>
              <li className="rounded-2xl border border-slate-200 p-6">
                <span className="text-sm font-black text-[#075e54]">2</span>
                <h3 className="mt-3 text-xl font-black text-slate-950">Parli con il cliente</h3>
                <p className="mt-2 font-semibold leading-7 text-slate-600">Vedi il problema, decidi se sei disponibile e fai il tuo preventivo.</p>
              </li>
              <li className="rounded-2xl border border-slate-200 p-6">
                <span className="text-sm font-black text-[#075e54]">3</span>
                <h3 className="mt-3 text-xl font-black text-slate-950">Fai il lavoro</h3>
                <p className="mt-2 font-semibold leading-7 text-slate-600">Il cliente paga te. Solo dopo il servizio concluso versi la commissione.</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="bg-[#f3f8fb] py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <PartnerBadge>Perché è conveniente?</PartnerBadge>
              <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
                Rischio basso. Controllo totale.
              </h2>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {advantages.map(([title, text]) => (
                <article key={title} className="rounded-2xl bg-white p-6 shadow-[0_14px_34px_rgba(15,23,42,0.06)]">
                  <h3 className="text-xl font-black text-slate-950">{title}</h3>
                  <p className="mt-2 font-semibold leading-7 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PartnerShell>
  )
}
