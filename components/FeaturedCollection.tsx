'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icons';
import { featuredProducts, type Product } from '@/lib/products';
import { CatalogCard } from '@/components/ProductsSection';

export function ProductCard({product}:{product:Product}) { return <CatalogCard product={product}/>; }
export default function FeaturedCollection(){
 const track=useRef<HTMLDivElement>(null);
 const [ends,setEnds]=useState({start:true,end:false});
 useEffect(()=>{
  const node=track.current;if(!node)return;
  const update=()=>setEnds({start:node.scrollLeft<3,end:node.scrollLeft+node.clientWidth>=node.scrollWidth-3});
  node.addEventListener('scroll',update,{passive:true});const observer=new ResizeObserver(update);observer.observe(node);update();
  return()=>{node.removeEventListener('scroll',update);observer.disconnect()};
 },[]);
 const slide=(direction:number)=>{
  const node=track.current;if(!node)return;
  const card=node.querySelector<HTMLElement>('.catalog-product');
  const gap=parseFloat(getComputedStyle(node).columnGap)||0;
  const step=(card?.getBoundingClientRect().width||180)+gap;
  const visible=Math.max(1,Math.floor((node.clientWidth+gap)/step));
  node.scrollBy({left:direction*step*visible,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 };
 return <section className="featured-section" aria-labelledby="featured-title">
  <header className="featured-heading"><div><p>TRENDING NOW</p><h2 id="featured-title">FEATURED COLLECTION</h2></div><Link href="/collection">VIEW ALL <Icon name="arrow"/></Link></header>
  <div className="featured-track" ref={track} tabIndex={0} aria-label="Featured products, scroll horizontally for more">
   {featuredProducts.map(p=><ProductCard key={p.id} product={p}/>)}
  </div>
  <button className="featured-nav featured-prev" aria-label="Previous products" disabled={ends.start} onClick={()=>slide(-1)}><Icon name="arrow"/></button>
  <button className="featured-nav featured-next" aria-label="Next products" disabled={ends.end} onClick={()=>slide(1)}><Icon name="arrow"/></button>
 </section>;
}
