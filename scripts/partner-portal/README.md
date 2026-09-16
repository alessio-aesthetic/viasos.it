# ViaSOS partner portal

The partner pages are statically published through GitHub Pages. Authenticated operations use the existing `viasos-partner-dashboard` n8n webhook; secrets remain in n8n and are not shipped in the site.

## Dashboard contract

- `{ token }` returns the authenticated partner's permitted profile fields, **all** linked services and aggregate first-call priority. Services are fetched in batches; the former 20-service limit is removed.
- `{ token, action: 'availability', available: boolean }` updates `Pausa Operativa`. An inactive partner cannot enable their profile. It does not modify the administrative `Attivo` approval flag.
- `{ token, action: 'fiscal', vatNumber, taxCode, sdi, pec }` saves the corresponding fiscal fields, including `Codice Destinatario SDI` and `PEC Fatturazione`.

The source in `dashboard-handler.js` is the **body** of the n8n `Dashboard Partner Airtable` code node. It uses its existing `parseBody`, `escFormula`, `air` and table constants. Credentials and common helpers are managed in n8n.

## Availability

`Pausa Operativa` defaults to false. The direct-call bridge, first-call selection, sequential dispatcher and quote collection exclude paused partners from new automatic selections. Existing services and manual follow-up are preserved.

## Statistics and payments

- Taken, not-taken and negotiating counts come from the existing partner counters.
- The outcome rate is `taken / (taken + notTaken)`; missing or empty data is shown as unavailable.
- First-call share is computed from the actual selection weights of currently eligible partners on the partner's reference number. Dedicated advertising numbers follow their dedicated-owner route. This share is separate from the outcome score and does not promise a fixed volume of calls.
- A service is paid only when `Commissione Pagata` is true. Unpaid services become due when `Da Fatturare` is true. Totals use recorded `Importo Commissione`; missing amounts are disclosed and excluded.
- Payment links are displayed only when recorded and use HTTPS. The portal does not create payments, invoices or receipts.

Run `npm run verify:partner` to check service batching, exclusion of private fields, first-call share, persisted availability, inactive-profile protection and fiscal mapping without network calls or real partner data.
