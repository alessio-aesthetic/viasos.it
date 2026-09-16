const fs = require('fs'),
  assert = require('assert')
const body = fs.readFileSync(
  require('path').join(__dirname, 'partner-portal/dashboard-handler.js'),
  'utf8',
)
const prefix = `const PARTNER_TABLE='Carroattrezzi',LEAD_TABLE='Lead Carroattrezzi';
function parseBody(){return $input.first().json.body;}
function escFormula(v){return String(v);}
async function air(method,table,options){return await this.stub(method,table,options);}`
const fn = new (Object.getPrototypeOf(async function () {}).constructor)(
  '$input',
  prefix + body,
)
const ids = Array.from({ length: 45 }, (_, i) => 'recTest' + i)
let writes = []
const fields = {
  'Nome Ditta': 'Test',
  WhatsApp: '+390003',
  Attivo: true,
  'Lead Carroattrezzi': ids,
  'Password Hash Partner': 'PRIVATE',
  'Token Accesso Dashboard': 'PRIVATE',
  'Numero Telnyx': '+390001',
  'Prima Chiamata Diretta Attiva': true,
  'Percentuale Prima Chiamata Diretta': 30,
}
const ctx = {
  stub: async (method, table, options) => {
    if (method === 'PATCH') {
      writes.push(options.body.records[0].fields)
      Object.assign(fields, options.body.records[0].fields)
      return { records: [{ id: 'recPartner', fields: { ...fields } }] }
    }
    if (table === 'Carroattrezzi') {
      if (options.query.includes('maxRecords=1'))
        return {
          records: options.query.includes('vp_invalid')
            ? []
            : [{ id: 'recPartner', fields }],
        }
      return {
        records: [
          { id: 'recPartner', fields },
          {
            id: 'recOther',
            fields: {
              Attivo: true,
              'Numero Telnyx': '+390001',
              WhatsApp: '+390002',
              'Prima Chiamata Diretta Attiva': true,
              'Percentuale Prima Chiamata Diretta': 70,
            },
          },
        ],
      }
    }
    const formula = new URLSearchParams(options.query.slice(1)).get(
      'filterByFormula',
    )
    const matched = ids.filter((id) =>
      formula.includes("RECORD_ID()='" + id + "'"),
    )
    return {
      records: matched.map((id) => ({
        id,
        fields: {
          Servizio: 'Recupero',
          Descrizione: 'Test',
          'Esito Nexi Raw': 'PRIVATE',
        },
      })),
    }
  },
}
;(async () => {
  const result = (
    await fn.call(ctx, {
      first: () => ({ json: { body: { token: 'vp_test' } } }),
    })
  )[0].json
  assert.equal(result.leads.length, 45)
  assert.equal(result.priority.share, 30)
  assert(!('Password Hash Partner' in result.partner))
  assert(!('Token Accesso Dashboard' in result.partner))
  assert(!('Esito Nexi Raw' in result.leads[0]))
  const paused = (
    await fn.call(ctx, {
      first: () => ({
        json: {
          body: { token: 'vp_test', action: 'availability', available: false },
        },
      }),
    })
  )[0].json
  assert.equal(paused.partner['Pausa Operativa'], true)
  assert(!('Attivo' in writes.at(-1)))
  const pausedRead = (
    await fn.call(ctx, {
      first: () => ({ json: { body: { token: 'vp_test' } } }),
    })
  )[0].json
  assert.equal(pausedRead.priority.share, 0)
  fields.Attivo = false
  const denied = (
    await fn.call(ctx, {
      first: () => ({
        json: {
          body: { token: 'vp_test', action: 'availability', available: true },
        },
      }),
    })
  )[0].json
  assert.equal(denied.ok, false)
  fields.Attivo = true
  await fn.call(ctx, {
    first: () => ({
      json: { body: { token: 'vp_test', action: 'fiscal', sdi: 'ABC1234' } },
    }),
  })
  assert.equal(writes.at(-1)['Codice Destinatario SDI'], 'ABC1234')
  const invalid = (
    await fn.call(ctx, {
      first: () => ({ json: { body: { token: 'vp_invalid' } } }),
    })
  )[0].json
  assert.equal(invalid.ok, false)
  console.log(
    'PASS: 45 services, private fields excluded, availability persists, inactive profile blocked, fiscal field mapping.',
  )
})().catch((e) => {
  console.error(e.message)
  process.exitCode = 1
})
