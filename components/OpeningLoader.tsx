'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
export default function OpeningLoader({onReveal}:{onReveal:()=>void}){
 const [phase,setPhase]=useState<'loading'|'revealing'|'done'>('loading');
 const release=useRef<()=>void>(()=>{}),revealCallback=useRef(onReveal);
 revealCallback.current=onReveal;
 const reveal=useCallback(()=>setPhase(current=>current==='loading'?'revealing':current),[]);
 useEffect(()=>{
  let cancelled=false;
  const previous=document.body.style.overflow;
  document.body.style.overflow='hidden';
  release.current=()=>{document.body.style.overflow=previous};
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const minimum=new Promise(resolve=>setTimeout(resolve,reduced?100:1250));
  const portraits=Array.from(document.querySelectorAll<HTMLImageElement>('.hero-model,.wordmark img'));
  const assets=Promise.allSettled([document.fonts.ready,...portraits.map(img=>img.decode())]);
  const deadline=setTimeout(()=>{if(!cancelled)reveal()},reduced?500:3000);
  Promise.all([minimum,assets]).then(()=>{if(!cancelled)reveal()});
  return()=>{cancelled=true;clearTimeout(deadline);release.current()};
 },[reveal]);
 useEffect(()=>{
  if(phase!=='revealing')return;
  release.current();revealCallback.current();
  const timer=setTimeout(()=>setPhase('done'),window.matchMedia('(prefers-reduced-motion: reduce)').matches?100:900);
  return()=>clearTimeout(timer);
 },[phase]);
 if(phase==='done')return null;
 return <><div className={`opening-loader ${phase==='revealing'?'is-revealing':''}`} role="status" aria-label="Preparing the PANCO collection" aria-live="polite"><div className="opening-panel opening-panel-top"/><div className="opening-panel opening-panel-bottom"/><div className="opening-light" aria-hidden="true"/><div className="opening-emblem"><div className="opening-orbit opening-orbit-one" aria-hidden="true"/><div className="opening-orbit opening-orbit-two" aria-hidden="true"/><div className="opening-orbit opening-orbit-three" aria-hidden="true"/><div className="opening-logo"><img src="/assets/panco-logo.svg" width={260} height={80} alt="PANCO"/><span>LITTLE PEOPLE. BIG PERSONALITY.</span></div></div><div className="opening-caption"><span>WINTER / 2026</span><div className="opening-progress" aria-hidden="true"><i/></div><span>PREPARING YOUR NEXT ADVENTURE</span></div><button className="opening-skip" onClick={reveal}>SKIP INTRO <span aria-hidden="true">↗</span></button></div><noscript><style>{'.opening-loader{display:none!important}'}</style></noscript></>;
}
