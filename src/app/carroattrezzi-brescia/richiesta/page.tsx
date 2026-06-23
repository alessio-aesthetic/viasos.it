import type { Metadata } from 'next'

import { BresciaRequestClient } from './BresciaRequestClient'

export const metadata: Metadata = {
  title: 'Richiesta Carroattrezzi Brescia | ViaSOS',
  description:
    'Richiedi un carroattrezzi a Brescia con un form guidato: problema, veicolo, posizione e telefono per essere ricontattato rapidamente.',
  alternates: {
    canonical: '/carroattrezzi-brescia/richiesta',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RichiestaCarroattrezziBresciaPage() {
  return (
    <>
      <script
        src="/vendor/lottie.min.js"
        async
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function initViaSOSLotties(){
              function boot(){
                if (!window.lottie) {
                  setTimeout(boot, 80);
                  return;
                }
                document.querySelectorAll('[data-lottie-src]').forEach(function(el){
                  if (el.getAttribute('data-lottie-ready') === '1') return;
                  el.setAttribute('data-lottie-ready', '1');
                  window.lottie.loadAnimation({
                    container: el,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: el.getAttribute('data-lottie-src')
                  });
                });
              }
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', boot);
              } else {
                boot();
              }
            })();
          `,
        }}
      />
      <BresciaRequestClient />
    </>
  )
}
