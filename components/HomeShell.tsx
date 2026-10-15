'use client';
import { useRef, useState, type ReactNode } from 'react';
import useReactiveMotion from '@/components/useReactiveMotion';
import OpeningLoader from '@/components/OpeningLoader';
export default function HomeShell({children}:{children:ReactNode}) {
 const root=useRef<HTMLElement>(null);
 const [revealed,setRevealed]=useState(false);
 useReactiveMotion(root);
 return <><OpeningLoader onReveal={()=>setRevealed(true)}/><main ref={root} data-intro-revealed={revealed} className="home-page min-h-screen bg-[#0c0d11] text-white">{children}</main></>;
}
