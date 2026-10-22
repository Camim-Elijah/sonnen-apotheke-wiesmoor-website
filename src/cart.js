// Reine Funktionen: keine DOM-Abhängigkeit, keine Preise aus Browserdaten übernehmen.
import {variants} from './catalog.js';
export function cleanCart(value){
 if(!Array.isArray(value))return [];
 const merged=new Map();
 for(const item of value){if(!item||typeof item!=='object'||!variants.has(item.id))continue;
 const q=Number(item.quantity);if(!Number.isFinite(q)||q<1)continue;
 merged.set(item.id,Math.min(99,(merged.get(item.id)||0)+Math.floor(q)));}
 return [...merged].map(([id,quantity])=>({id,quantity}));
}
export function addItem(cart,id){return cleanCart([...cart,{id,quantity:1}]);}
export function setQuantity(cart,id,quantity){return cleanCart(cart.map(x=>x.id===id?{id,quantity}:x));}
export function cartTotal(cart){return cleanCart(cart).reduce((sum,x)=>sum+variants.get(x.id).price*x.quantity,0);}
export function cartCount(cart){return cleanCart(cart).reduce((sum,x)=>sum+x.quantity,0);}
