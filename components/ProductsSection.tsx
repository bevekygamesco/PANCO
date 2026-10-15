'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icons';
import { useShop } from '@/components/ShopProvider';
import { catalogCategories, selectCatalog, type CatalogCategory } from '@/lib/catalog';
import type { Product } from '@/lib/products';
const icons:Record<string,string>={'Outerwear':'neon-outerwear.svg','T-shirts':'neon-tshirt.svg','Pants':'neon-pants.svg','Sweaters':'neon-sweater.svg','Shoes':'neon-shoes.svg'};
const colors:Record<string,string>={'Outerwear':'#ff839c','T-shirts':'#80b27a','Dress':'#eb8eaa','Pants':'#d9ac56','Sweaters':'#6ca0e3','Shoes':'#b98bdb'};
export function CatalogCard({product}:{product:Product}){
 const [variant,setVariant]=useState(0),[quantity,setQuantity]=useState(1),[added,setAdded]=useState(false);
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const {favorites,toggleFavorite,addItem}=useShop();const color=product.variants[variant];
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current)},[]);
 const add=()=>{addItem({id:product.id,name:product.name,price:product.price,image:color.image,color:color.name},quantity);setAdded(true);if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>setAdded(false),1500)};
 return <article className="catalog-product"><span className="new-label">NEW</span><button className={`catalog-heart ${favorites.includes(product.id)?'saved':''}`} aria-label={`${favorites.includes(product.id)?'Unsave':'Save'} ${product.name}`} aria-pressed={favorites.includes(product.id)} onClick={()=>toggleFavorite(product.id)}><Icon name="heart"/></button><Link className="catalog-product-photo" href={`/products/${product.id}?color=${encodeURIComponent(color.name)}`}><img key={color.image} src={color.image} alt={`${product.name} — ${color.name}`} width={217} height={222} loading="lazy"/></Link><div className="catalog-product-info"><Link className="catalog-product-name" href={`/products/${product.id}?color=${encodeURIComponent(color.name)}`}>{product.name}</Link><p>{product.price} TND</p><div className="product-swatches" role="group" aria-label={`${product.name} colors`}>{product.variants.map((v,i)=><button key={v.name} className={i===variant?'chosen':''} style={{backgroundColor:v.color}} title={v.name} aria-label={`${v.name} ${product.name}`} aria-pressed={i===variant} onClick={()=>setVariant(i)}/>)}</div><div className="catalog-product-actions"><div className="quantity-control"><button aria-label={`Decrease ${product.name} quantity`} disabled={quantity===1} onClick={()=>setQuantity(Math.max(1,quantity-1))}>−</button><span aria-live="polite">{quantity}</span><button aria-label={`Increase ${product.name} quantity`} disabled={quantity===99} onClick={()=>setQuantity(Math.min(99,quantity+1))}>+</button></div><button className={`catalog-add ${added?'added':''}`} aria-label={`Add ${quantity} ${product.name} in ${color.name} to bag`} onClick={add}><Icon name={added?'check':'bag'}/></button></div><span className="sr-only" role="status">{added?`${quantity} ${product.name} added to bag`:''}</span></div></article>;
}
export default function ProductsSection({readQuery=false}:{readQuery?:boolean}){
 const [category,setCategory]=useState<CatalogCategory>('All'),[sort,setSort]=useState('newest'),[page,setPage]=useState(1);
 const heading=useRef<HTMLElement>(null);
 const [pageSize,setPageSize]=useState(8);
 useEffect(()=>{
  const mobile=window.matchMedia('(max-width:600px)'),tablet=window.matchMedia('(max-width:1100px)');
  const resize=()=>{setPageSize(mobile.matches?4:tablet.matches?6:8);setPage(1)};
  resize();mobile.addEventListener('change',resize);tablet.addEventListener('change',resize);
  return()=>{mobile.removeEventListener('change',resize);tablet.removeEventListener('change',resize)};
 },[]);
 useEffect(()=>{if(readQuery){const value=new URLSearchParams(window.location.search).get('category');if(catalogCategories.includes(value as CatalogCategory))setCategory(value as CatalogCategory)}},[readQuery]);
 const products=selectCatalog(category,sort);
 const pages=Math.max(1,Math.ceil(products.length/pageSize)),shown=products.slice((page-1)*pageSize,page*pageSize);
 const go=(number:number)=>{setPage(Math.max(1,Math.min(pages,number)));heading.current?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'})};
 return <section className="products-section" ref={heading} aria-labelledby="products-heading"><header className="products-heading"><div><p>OUR PRODUCTS</p><h2 id="products-heading">FEATURED COLLECTION</h2><div>Discover our most loved styles, crafted for comfort,<br/> designed for every moment.</div></div><Link href="/collection">VIEW ALL <Icon name="arrow"/></Link></header>
 <div className="catalog-toolbar"><button className={`catalog-all ${category==='All'?'active':''}`} onClick={()=>{setCategory('All');setPage(1)}} aria-pressed={category==='All'}><span aria-hidden="true">⊞</span> All Products</button><div className="catalog-tabs" role="group" aria-label="Filter products by category">{catalogCategories.slice(1).map(item=><button key={item} className={category===item?'active':''} aria-pressed={category===item} onClick={()=>{setCategory(item);setPage(1)}} style={{'--tab-color':colors[item]} as React.CSSProperties}>{icons[item]?<img src={`/assets/${icons[item]}`} alt=""/>:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m9 3 3 2 3-2 2 4-2 3 5 11H4l5-11-2-3Z"/></svg>}<span>{item}</span></button>)}</div><label className="catalog-sort"><span className="sr-only">Sort products</span><select value={sort} onChange={e=>{setSort(e.target.value);setPage(1)}}><option value="newest">Newest</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="name">Name: A–Z</option></select></label></div>
 {shown.length?<div className="products-grid">{shown.map(product=><CatalogCard key={product.id} product={product}/>)}</div>:<div className="catalog-empty"><h3>More {category.toLowerCase()} styles are coming soon.</h3><p>Explore the styles currently available in our collection.</p><button onClick={()=>{setCategory('All');setPage(1)}}>VIEW ALL PRODUCTS</button></div>}
 <nav className="catalog-pagination" aria-label="Product pages"><span className="catalog-result-count" aria-live="polite">{products.length?`${(page-1)*pageSize+1}–${Math.min(page*pageSize,products.length)} of ${products.length}`:'0 products'}</span><button aria-label="First page" disabled={page===1} onClick={()=>go(1)}>«</button><button aria-label="Previous page" disabled={page===1} onClick={()=>go(page-1)}>‹</button>{Array.from({length:pages},(_,i)=><button key={i} aria-label={`Page ${i+1}`} aria-current={page===i+1?'page':undefined} className={page===i+1?'active':''} onClick={()=>go(i+1)}>{i+1}</button>)}<button aria-label="Next page" disabled={page===pages} onClick={()=>go(page+1)}>›</button><button aria-label="Last page" disabled={page===pages} onClick={()=>go(pages)}>»</button></nav>
 </section>;
}
