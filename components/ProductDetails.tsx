'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Product } from '@/lib/products';
import { useShop } from '@/components/ShopProvider';
import Icon from '@/components/Icons';
export default function ProductDetails({product,initialColor}:{product:Product;initialColor?:string}){
 const [choice,setChoice]=useState(()=>Math.max(0,product.variants.findIndex(variant=>variant.name===initialColor)));
 const {addItem,favorites,toggleFavorite}=useShop();
 const [quantity,setQuantity]=useState(1);
 const [added,setAdded]=useState(false);
 useEffect(()=>{const color=initialColor||new URLSearchParams(window.location.search).get('color');const index=product.variants.findIndex(v=>v.name===color);if(index>=0)setChoice(index)},[product,initialColor]);
 const variant=product.variants[choice];
 return <article className="product-details"><div className="product-photo"><img key={variant.image} src={variant.image} alt={`${product.name} — ${variant.name}`}/></div><div className="product-summary"><p className="eyebrow">WINTER COLLECTION · 2026</p><h1>{product.name}</h1><p className="product-price">{product.price} TND</p><p className="detail-color">Color: <strong>{variant.name}</strong></p><div className="product-swatches" role="group" aria-label="Product colors">{product.variants.map((v,i)=><button key={v.name} className={choice===i?'chosen':''} style={{backgroundColor:v.color}} aria-pressed={choice===i} aria-label={v.name} onClick={()=>{setChoice(i);setAdded(false)}}/>)}</div><p>Discover the perfect combination of comfort, style and quality for your kids.</p><div className="detail-quantity-row"><span>QUANTITY</span><div className="quantity-control"><button aria-label="Decrease quantity" disabled={quantity===1} onClick={()=>setQuantity(Math.max(1,quantity-1))}>−</button><span>{quantity}</span><button aria-label="Increase quantity" disabled={quantity===99} onClick={()=>setQuantity(Math.min(99,quantity+1))}>+</button></div><button className={`detail-favorite ${favorites.includes(product.id)?'saved':''}`} aria-label="Save product" aria-pressed={favorites.includes(product.id)} onClick={()=>toggleFavorite(product.id)}><Icon name="heart"/></button></div><div className="detail-shop-actions"><button className="primary-action" onClick={()=>{addItem({id:product.id,name:product.name,price:product.price,image:variant.image,color:variant.name},quantity);setAdded(true)}}>{added?'ADDED TO BAG ✓':'ADD TO BAG'}</button><Link href="/bag">VIEW BAG</Link></div><Link className="primary-action" href="/collection">EXPLORE COLLECTION</Link></div></article>
}
