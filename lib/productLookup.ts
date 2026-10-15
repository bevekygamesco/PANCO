import { outfits } from '@/lib/outfits';
import { featuredProducts, type Product } from '@/lib/products';
export function findProduct(id:string):Product|undefined{
 const product=featuredProducts.find(item=>item.id===id);if(product)return product;
 const outfit=outfits.find(item=>item.id===id);
 return outfit?{id:outfit.id,name:outfit.label,price:outfit.price,variants:[{name:'Selected look',color:outfit.color,image:outfit.model}]}:undefined;
}
