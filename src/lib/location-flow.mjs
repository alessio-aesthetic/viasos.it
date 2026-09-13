/** @param {string} text */
export const normalizePlace=text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
/** @param {{latitude:number,longitude:number}} a @param {{latitude:number,longitude:number}} b */
export function kilometres(a,b){const r=Math.PI/180;const h=Math.sin((b.latitude-a.latitude)*r/2)**2+Math.cos(a.latitude*r)*Math.cos(b.latitude*r)*Math.sin((b.longitude-a.longitude)*r/2)**2;return 12742*Math.asin(Math.sqrt(Math.min(1,h)));}
/** @param {Array<{name:string,province:string,code:string,url:string,latitude:number,longitude:number}>} places @param {{latitude:number,longitude:number,accuracy?:number}} coords */
export function resolveLocation(places,coords){
 if(!Number.isFinite(coords.latitude)||!Number.isFinite(coords.longitude)||Math.abs(coords.latitude)>90||Math.abs(coords.longitude)>180)throw Error('Posizione non valida');
 if(!places.length)throw Error('Elenco dei comuni non disponibile');
 const ranked=places.map(city=>({city,distance:kilometres(coords,city)})).sort((a,b)=>a.distance-b.distance);
 const best=ranked[0];
 // Outside coverage or imprecise fixes require a manual choice, never a silent redirect.
 return {...best,automatic:best.distance<=25&&(coords.accuracy??Infinity)<=10000,alternatives:ranked.slice(0,3)};
}
/** @param {Geolocation} geo @returns {Promise<GeolocationPosition>} */
export function requestPosition(geo){return new Promise((resolve,reject)=>geo.getCurrentPosition(resolve,reject,{enableHighAccuracy:false,timeout:10000,maximumAge:60000}));}
