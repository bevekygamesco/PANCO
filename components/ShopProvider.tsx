'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
export type CartLine={id:string;name:string;price:number;image:string;color:string;quantity:number};
type Shop={favorites:string[];cart:CartLine[];cartCount:number;toggleFavorite:(id:string)=>void;addItem:(item:Omit<CartLine,'quantity'>,quantity?:number)=>void;removeItem:(id:string,color:string)=>void;changeQuantity:(id:string,color:string,quantity:number)=>void};
const ShopContext=createContext<Shop|null>(null);
export default function ShopProvider({children}:{children:ReactNode}){
 const [favorites,setFavorites]=useState<string[]>([]),[cart,setCart]=useState<CartLine[]>([]),[ready,setReady]=useState(false);
 useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem('panco-shop-v1')||'null');if(saved&&Array.isArray(saved.favorites)&&Array.isArray(saved.cart)){setFavorites(saved.favorites.filter((id:unknown)=>typeof id==='string'));setCart(saved.cart.filter((item:CartLine)=>item&&typeof item.id==='string'&&typeof item.name==='string'&&typeof item.color==='string'&&typeof item.image==='string'&&Number.isFinite(item.price)&&Number.isInteger(item.quantity)&&item.quantity>0).map((item:CartLine)=>({...item,quantity:Math.min(99,item.quantity)})))}}catch{}setReady(true)},[]);
 useEffect(()=>{if(ready)try{localStorage.setItem('panco-shop-v1',JSON.stringify({favorites,cart}))}catch{}},[favorites,cart,ready]);
 const toggleFavorite=(id:string)=>setFavorites(previous=>previous.includes(id)?previous.filter(item=>item!==id):[...previous,id]);
 const addItem=(item:Omit<CartLine,'quantity'>,quantity=1)=>setCart(previous=>{const found=previous.find(line=>line.id===item.id&&line.color===item.color);return found?previous.map(line=>line===found?{...line,quantity:Math.min(99,line.quantity+quantity)}:line):[...previous,{...item,quantity:Math.max(1,Math.min(99,quantity))}]});
 const removeItem=(id:string,color:string)=>setCart(previous=>previous.filter(line=>line.id!==id||line.color!==color));
 const changeQuantity=(id:string,color:string,quantity:number)=>setCart(previous=>previous.map(line=>line.id===id&&line.color===color?{...line,quantity:Math.max(1,Math.min(99,quantity))}:line));
 return <ShopContext.Provider value={{favorites,cart,cartCount:cart.reduce((sum,line)=>sum+line.quantity,0),toggleFavorite,addItem,removeItem,changeQuantity}}>{children}</ShopContext.Provider>;
}
export function useShop(){const shop=useContext(ShopContext);if(!shop)throw new Error('ShopProvider is required');return shop}
