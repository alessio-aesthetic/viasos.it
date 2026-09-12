import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('out');
const cities=JSON.parse(fs.readFileSync('data/local-seo/municipalities.json','utf8'));
const contacts=JSON.parse(fs.readFileSync('data/local-seo/contacts.json','utf8'));
const routing=JSON.parse(fs.readFileSync('data/local-seo/routing-audit.json','utf8'));
const manifest=JSON.parse(fs.readFileSync('data/local-seo/page-manifest.json','utf8'));
assert.equal(cities.length,routing.length);assert.equal(new Set(routing.map(c=>c.url)).size,cities.length);
const radians=x=>x*Math.PI/180;
const angularDistance=(a,b)=>Math.acos(Math.max(-1,Math.min(1,Math.sin(radians(a.lat))*Math.sin(radians(b.lat))+Math.cos(radians(a.lat))*Math.cos(radians(b.lat))*Math.cos(radians(a.lng-b.lng)))));
let minWords=Infinity,maxWords=0,bytes=0,links=0;
const titles=new Set(),descriptions=new Set();
for(const c of routing){
 const html=fs.readFileSync(path.join(root,c.url,'index.html'),'utf8');bytes+=Buffer.byteLength(html);
 const title=html.match(/<title>(.*?)<\/title>/)?.[1];
 const description=html.match(/<meta name="description" content="([^"]*)"/ )?.[1];
 assert(title?.endsWith(' - Soccorso stradale economico'),`${c.url} titolo`);
 assert(!titles.has(title),`${c.url} titolo duplicato`);titles.add(title);
 assert(!descriptions.has(description),`${c.url} description duplicata`);descriptions.add(description);
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${c.url} H1`);
 assert(html.includes(`<link rel="canonical" href="https://viasos.it${c.url}">`),`${c.url} canonical`);
 assert(html.includes(`href="tel:${c.tel}"`),`${c.url} call`);
 assert(html.includes('class="sticky-call"'),`${c.url} sticky`);
 assert(!html.includes('undefined')&&!html.includes('NaN'),`${c.url} missing data`);
 const article=html.match(/<article class="prose">([\s\S]*?)<\/article>/)?.[1]||'';
 const words=article.replace(/<[^>]*>/g,' ').split(/\s+/).filter(Boolean).length;
 minWords=Math.min(minWords,words);maxWords=Math.max(maxWords,words);assert(words>=600,`${c.url} ${words} parole`);
 const original=cities.find(o=>o.id===c.id),selected=contacts.find(p=>p.tel===c.tel&&p.city===c.city);
 assert(selected,`${c.url} contatto assente`);
 const selectedDistance=angularDistance(original.coordinates,selected.coordinates);
 for(const p of contacts)assert(selectedDistance<=angularDistance(original.coordinates,p.coordinates)+1e-8,`${c.url} numero non più vicino`);
 for(const [,raw] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g))JSON.parse(raw);
 for(const [,href] of html.matchAll(/href="(\/[^"#?]*)/g)){const target=href.endsWith('/')?`${href}index.html`:href;assert(fs.existsSync(path.join(root,target)),`${c.url} collegamento rotto ${href}`);links++;}
}
const index=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');const mapped=[];
for(const [,url] of index.matchAll(/<loc>https:\/\/viasos.it\/([^<]+)<\/loc>/g)){const xml=fs.readFileSync(path.join(root,url),'utf8');for(const [,loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g))mapped.push(loc);}
assert.equal(new Set(mapped).size,mapped.length,'URL duplicati nella sitemap');
for(const c of routing)assert(mapped.includes(`https://viasos.it${c.url}`),`${c.url} assente sitemap`);
for(const url of Object.keys(manifest)){const h=fs.readFileSync(path.join(root,url,'index.html'),'utf8');assert(h.includes('name="description"'));for(const [,href] of h.matchAll(/href="(\/[^"#?]*)/g)){const target=href.endsWith('/')?`${href}index.html`:href;assert(fs.existsSync(path.join(root,target)),`${url} collegamento rotto ${href}`)}}
const bergamo=routing.find(c=>c.name==='Bergamo');assert.equal(bergamo.tel,'+390350683839');
assert.equal(routing.find(c=>c.name==='Abano Terme').tel,'+3904441520847');
assert.equal(routing.find(c=>c.name==='Udine').tel,'+3904321772099');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).reduce((sum,e)=>sum+(e.isDirectory()?walk(path.join(d,e.name)):fs.statSync(path.join(d,e.name)).size),0);
const totalBytes=walk(root);assert(totalBytes<1024**3,'Superato limite GitHub Pages 1 GB');
const report={municipalities:routing.length,pages:Object.keys(manifest).length,contacts:contacts.length,minArticleWords:minWords,maxArticleWords:maxWords,checkedLinks:links,localHTMLMB:+(bytes/1024**2).toFixed(2),publishedSiteMB:+(totalBytes/1024**2).toFixed(2),sitemapURLs:mapped.length,passed:true};
fs.writeFileSync('data/local-seo/verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
