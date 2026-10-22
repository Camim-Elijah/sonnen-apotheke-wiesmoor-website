// Datenquellen bleiben getrennt. Eine spätere API kann diese gemeinsame Form liefern.
import {productLines} from './nomosan.js';
import {pharmacyProducts} from './pharmacy-products.js';
export const products=[...pharmacyProducts,...productLines.map(p=>({...p,kind:'Nahrungsergänzungsmittel',brand:'NOMOSAN',category:p.category==='Haut'?'Haut':p.category==='Vitamine'?'Vitamine':'Vitalität',priceSource:'Hersteller-Endpreis, Stand 22.10.2026. Nomosan ist eine Demo-Erweiterung; keine bestätigte Sonnen-Sortimentsmarke.'}))];
export const variants=new Map(products.flatMap(p=>p.variants.map(v=>[v.id,{...v,product:p}])));
export const featuredIds=['apo-00010808','nomosan-9','apo-00097761','nomosan-0','apo-00679612','nomosan-1','apo-00243607','nomosan-5'];
export const money=cent=>new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR'}).format(cent/100);
export function unitPrice(v){if(v.netQuantityMg)return money(Math.round(v.price*1000000/v.netQuantityMg))+' / kg';return v.unit||'Preis je Packung';}
export function searchProducts({query='',category='Alle',sort='recommended'}={}){
 const terms=query.trim().toLocaleLowerCase('de-DE').split(/\s+/).filter(Boolean);
 let result=products.filter(p=>(category==='Alle'||(category==='Nomosan'?p.brand==='NOMOSAN':p.category===category))&&terms.every(t=>`${p.name} ${p.brand} ${p.category} ${p.pzn||''} ${p.description}`.toLocaleLowerCase('de-DE').includes(t)));
 if(sort==='price-asc')result.sort((a,b)=>a.variants[0].price-b.variants[0].price);
 else if(sort==='price-desc')result.sort((a,b)=>b.variants[0].price-a.variants[0].price);
 else if(sort==='name')result.sort((a,b)=>a.name.localeCompare(b.name,'de'));
 else result.sort((a,b)=>{const rank=id=>featuredIds.includes(id)?featuredIds.indexOf(id):999;return rank(a.id)-rank(b.id)});
 return result;
}
