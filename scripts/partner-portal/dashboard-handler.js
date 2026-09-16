
const data = parseBody();
const token = String(data.token || '').replace(/[^a-zA-Z0-9_-]/g, '');
if (!token) return [{ json: { ok: false, message: 'Sessione mancante. Accedi al portale.' } }];
const formula = "{Token Accesso Dashboard}='" + escFormula(token) + "'";
const found = await air.call(this, 'GET', PARTNER_TABLE, { query: '?maxRecords=1&filterByFormula=' + encodeURIComponent(formula) });
const partner = (found.records || [])[0];
if (!partner) return [{ json: { ok: false, message: 'Sessione non valida. Accedi di nuovo.' } }];
let fields = partner.fields || {};
function publicPartner(f) {
 const keys = ['Nome Ditta','Nome Referente','Citta','WhatsApp','Attivo','Pausa Operativa','Stato Registrazione','Indirizzo Fatturazione','Copertura KM','Abilitato Autostrada','Partita IVA','Codice Fiscale','Codice Destinatario SDI','PEC Fatturazione','Chiamate Prese','Chiamate Non Prese','Chiamate In Trattativa','Percentuale Prima Chiamata Diretta'];
 const out={};for(const k of keys) if(f[k]!==undefined)out[k]=f[k];return out;
}
if (data.action === 'availability') {
 if (typeof data.available !== 'boolean') return [{json:{ok:false,message:'DisponibilitÃ  non valida.'}}];
 if (fields.Attivo !== true) return [{json:{ok:false,message:'Il profilo deve essere attivato da ViaSOS.'}}];
 const saved = await air.call(this,'PATCH',PARTNER_TABLE,{body:{records:[{id:partner.id,fields:{'Pausa Operativa':!data.available}}]}});
 return [{json:{ok:true,partner:publicPartner(saved.records[0].fields)}}];
}
if (data.action === 'fiscal') {
 const clean = v => String(v||'').trim().slice(0,150);
 const update = {'Partita IVA':clean(data.vatNumber),'Codice Fiscale':clean(data.taxCode),'Codice Destinatario SDI':clean(data.sdi),'PEC Fatturazione':clean(data.pec)};
 await air.call(this,'PATCH',PARTNER_TABLE,{body:{records:[{id:partner.id,fields:update}]}});
 return [{json:{ok:true}}];
}
if (data.action) return [{json:{ok:false,message:'Operazione non riconosciuta.'}}];
const leadIds = [...new Set(fields['Lead Carroattrezzi'] || [])];
const keys = ['Nome','Citta','Servizio','Descrizione','stato_lead','Esito Chiamata','Feedback Carroattrezzi','Commissione Pagata','Da Fatturare','Importo Commissione','Link Pagamento Nexi','Link Pagamento Stripe','Data Creazione Lead','Prima Chiamata Diretta'];
let leads=[];
for(let start=0;start<leadIds.length;start+=40){
 const ids=leadIds.slice(start,start+40);
 const leadFormula='OR('+ids.map(id=>"RECORD_ID()='"+escFormula(id)+"'").join(',')+')';
 let offset='';
 do {
  const query='?pageSize=100&filterByFormula='+encodeURIComponent(leadFormula)+(offset?'&offset='+encodeURIComponent(offset):'');
  const result=await air.call(this,'GET',LEAD_TABLE,{query});
  for(const r of result.records||[]){const row={id:r.id};for(const k of keys)if(r.fields[k]!==undefined)row[k]=r.fields[k];leads.push(row);}
  offset=result.offset||'';
 } while(offset);
}
leads.sort((a,b)=>(Date.parse(b['Data Creazione Lead'])||0)-(Date.parse(a['Data Creazione Lead'])||0));

let priority={share:null,mode:'unknown'};
const digits=v=>String(v||'').replace(/\D/g,'');
const reference=digits(fields['Numero Telnyx']);
if(reference && fields.Attivo===true && !fields['Pausa Operativa']){
 let cars=[],offset='';do{const result=await air.call(this,'GET',PARTNER_TABLE,{query:'?pageSize=100&filterByFormula='+encodeURIComponent('AND({Attivo}=1,NOT({Pausa Operativa}=1))')+(offset?'&offset='+encodeURIComponent(offset):'')});cars.push(...result.records||[]);offset=result.offset||'';}while(offset);
 const owner=cars.find(r=>digits(r.fields['Numero Ads'])===reference);
 const pool=owner?[owner]:cars.filter(r=>digits(r.fields['Numero Telnyx'])===reference && r.fields['Prima Chiamata Diretta Attiva']===true && digits(r.fields.WhatsApp));
 const weight=r=>Math.max(1,Number(r.fields['Percentuale Prima Chiamata Diretta']||1));
 const mine=pool.find(r=>r.id===partner.id),total=pool.reduce((sum,r)=>sum+weight(r),0);
 priority={share:total?Math.round((mine?weight(mine):0)/total*100):0,mode:owner?'dedicated':'pool'};
}else if(fields['Pausa Operativa'])priority={share:0,mode:'paused'};
return [{json:{ok:true,partner:publicPartner(fields),leads,priority}}];

