import { featuredProducts, type Product } from '@/lib/products';
export const catalogCategories=['All','Outerwear','T-shirts','Dress','Pants','Sweaters','Shoes'] as const;
export type CatalogCategory=typeof catalogCategories[number];
export function categoryFor(product:Product):CatalogCategory{
 if(/puffer|jacket/.test(product.id))return 'Outerwear';
 if(/hoodie|sweatshirt/.test(product.id))return 'Sweaters';
 return 'T-shirts';
}
export function selectCatalog(category:string,sort:string){
 const items=featuredProducts.filter(p=>category==='All'||categoryFor(p)===category);
 return [...items].sort((a,b)=>sort==='price-asc'?a.price-b.price:sort==='price-desc'?b.price-a.price:sort==='name'?a.name.localeCompare(b.name):featuredProducts.indexOf(a)-featuredProducts.indexOf(b));
}
