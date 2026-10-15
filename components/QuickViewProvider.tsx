'use client';
import { createContext, useContext, useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { findProduct } from '@/lib/productLookup';
import type { Product } from '@/lib/products';
import ProductDetails from '@/components/ProductDetails';
import Icon from '@/components/Icons';
type Request={product:Product;color?:string};
const Context=createContext<((id:string,color?:string)=>void)|null>(null);
export function useQuickView(){return useContext(Context)}
export default function QuickViewProvider({children}:{children:ReactNode}){
 const [request,setRequest]=useState<Request|null>(null),[closing,setClosing]=useState(false);
 const dialog=useRef<HTMLDialogElement>(null),timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const open=(id:string,color?:string)=>{const product=findProduct(id);if(!product)return;if(timer.current)clearTimeout(timer.current);setClosing(false);setRequest({product,color})};
 const close=()=>{if(timer.current)clearTimeout(timer.current);setClosing(true);timer.current=setTimeout(()=>{setRequest(null);setClosing(false)},window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:180)};
 useEffect(()=>{const node=dialog.current;if(!node)return;if(request){if(!node.open)node.showModal();const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous}}else if(node.open)node.close()},[request]);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current)},[]);
 const intercept=(event:MouseEvent<HTMLDivElement>)=>{
  if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  const link=(event.target as Element).closest<HTMLAnchorElement>('a[href]');if(!link||link.target==='_blank'||link.hasAttribute('download'))return;
  const url=new URL(link.href,window.location.href);if(url.origin!==window.location.origin)return;
  const match=url.pathname.match(/^\/products\/([^/]+)\/?$/);if(!match){if(request){if(timer.current)clearTimeout(timer.current);setRequest(null);setClosing(false)}return;}if(!findProduct(decodeURIComponent(match[1])))return;
  event.preventDefault();event.stopPropagation();open(decodeURIComponent(match[1]),url.searchParams.get('color')||undefined);
 };
 return <Context.Provider value={open}><div className="quickview-root" onClickCapture={intercept}>{children}<dialog ref={dialog} aria-label={request?`${request.product.name} quick view`:'Product quick view'} className={`quick-view-dialog ${closing?'is-closing':''}`} onCancel={event=>{event.preventDefault();close()}} onClick={event=>{if(event.target===event.currentTarget)close()}}><div className="quick-view-shell"><header><span>PANCO · WINTER 2026</span><button className="quick-view-close" aria-label="Close product preview" onClick={close}><Icon name="close"/></button></header>{request&&<ProductDetails key={`${request.product.id}-${request.color||''}`} product={request.product} initialColor={request.color}/>}</div></dialog></div></Context.Provider>;
}
