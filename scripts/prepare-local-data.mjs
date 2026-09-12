import fs from 'node:fs';
const dir = 'data/local-seo';
fs.mkdirSync(dir,{recursive:true});
for(const [file,url] of [['comuni-source.json','https://raw.githubusercontent.com/RP92/comuni-italiani/main/data/comuni.json'],['coordinates-source.csv','https://raw.githubusercontent.com/opendatasicilia/comuni-italiani/main/dati/coordinate.csv']]){
 if(!fs.existsSync(`${dir}/${file}`)){const response=await fetch(url);if(!response.ok)throw Error(`Download fallito ${url}`);fs.writeFileSync(`${dir}/${file}`,await response.text())}
}
const source = JSON.parse(fs.readFileSync(`${dir}/comuni-source.json`, 'utf8'));
const secondary = new Map(fs.readFileSync(`${dir}/coordinates-source.csv`, 'utf8').trim().split('\n').slice(1).map(l => {const [id,lat,lng]=l.trim().split(','); return [id,{lat:+lat,lng:+lng}]}));
const comuni = source.map(c=>({id:c.codice,name:c.nome,region:c.regione.nome,province:c.provincia.nome,provinceCode:c.sigla,cap:c.cap,coordinates:c.coordinate || secondary.get(String(+c.codice))}));
if(comuni.some(c=>!c.coordinates)) throw Error('Coordinate mancanti');
fs.writeFileSync(`${dir}/municipalities.json`, JSON.stringify(comuni));
const repos = (await (await fetch('https://api.github.com/users/alessio-aesthetic/repos?per_page=100')).json()).filter(r=>/carroattrezzi|soccorsostradale/.test(r.name));
const contacts=[]; const excluded=[];
for(const repo of repos){
 let content='';
 for(const path of ['src/data/site.ts','src/lib/site.ts']){const r=await fetch(`https://raw.githubusercontent.com/alessio-aesthetic/${repo.name}/${repo.default_branch}/${path}`);if(r.ok){content=await r.text();break}}
 const read=k=>content.match(new RegExp(`["']?${k}["']?\\s*:\\s*["']([^"']+)`))?.[1];
 const city=read('city'), raw=read('tel')?.replace(/^tel:/,'').replace(/\s/g,'');
 if(!city||!raw||!/^\+?\d{9,13}$/.test(raw)){excluded.push({site:repo.name,reason:'Nessun telefono numerico nel sito'});continue}
 const tel=raw.startsWith('+39')?raw:`+39${raw}`;
 const c=comuni.find(c=>c.name.toLowerCase()===city.toLowerCase() || (city==='Reggio Emilia' && c.name.startsWith('Reggio nell')));
 if(!c) throw Error(`Comune contatto sconosciuto: ${city}`);
 contacts.push({city,phone:read('phone')||tel,tel,site:`https://${repo.name}`,coordinates:c.coordinates,source:`https://github.com/alessio-aesthetic/${repo.name}/blob/${repo.default_branch}/src`,checkedAt:new Date().toISOString().slice(0,10)});
}
// Lucca is an existing ViaSOS contact with no separate domain.
const lucca=comuni.find(c=>c.name==='Lucca');
contacts.push({city:'Lucca',phone:'035 068 3881',tel:'+390350683881',site:'https://viasos.it/carroattrezzi-lucca/',coordinates:lucca.coordinates,source:'src/app/carroattrezzi-lucca/page.tsx',checkedAt:new Date().toISOString().slice(0,10)});
fs.writeFileSync(`${dir}/contacts.json`,JSON.stringify(contacts,null,2));
fs.writeFileSync(`${dir}/excluded-contacts.json`,JSON.stringify(excluded,null,2));
const license=await (await fetch('https://raw.githubusercontent.com/RP92/comuni-italiani/main/LICENSE-DATA')).text();
fs.writeFileSync(`${dir}/LICENSE-DATA`,license);
console.log(JSON.stringify({municipalities:comuni.length,contacts:contacts.map(({city,phone})=>({city,phone})),excluded},null,2));
