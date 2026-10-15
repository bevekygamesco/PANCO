'use client';
import { useEffect, useRef } from 'react';
import styles from './ScrollLookbook.module.css';
import { lifestyleRows } from '@/lib/lifestyle';
import { lookbookOffsets } from '@/lib/lookbookMotion';
export default function ScrollLookbook(){
 const root=useRef<HTMLElement>(null);
 useEffect(()=>{
  const section=root.current;if(!section)return;
  const sticky=section.querySelector<HTMLElement>('[data-lookbook-canvas]');
  const tracks=section.querySelectorAll<HTMLElement>('.lookbook-track');
  if(!sticky)return;
  const chapters=section.querySelectorAll<HTMLElement>('.lookbook-chapter');
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,run=0,pinTop=0,stageHeight=0;
  const measure=()=>{
   const viewport=section.clientWidth;
   const largest=Math.max(...Array.from(tracks,track=>track.scrollWidth));
   const firstGroup=(tracks[0]?.firstElementChild as HTMLElement)?.offsetWidth||0;
   const span=Math.min(viewport*.6263,firstGroup);
   const distance=lookbookOffsets(viewport,largest,span,0).distance;
   stageHeight=sticky.offsetHeight;
   pinTop=Math.max(0,Math.min(150,(window.innerHeight-stageHeight)/2));
   run=motion.matches?0:Math.min(2600,Math.max(1100,distance*.55));
   section.style.height=`${stageHeight+run}px`;
  };
  const draw=()=>{
   frame=0;
   const bounds=section.getBoundingClientRect();
   const travelled=pinTop-bounds.top;
   const progress=run?Math.max(0,Math.min(1,travelled/run)):0;
   // Explicit pinning avoids dependence on sticky containment in a host layout.
   const pinned=run>0&&travelled>=0&&travelled<run;
   sticky.style.position=pinned?'fixed':'absolute';
   sticky.style.top=`${pinned?pinTop:travelled>=run&&run>0?run:0}px`;
   sticky.style.left=`${pinned?bounds.left:0}px`;
   sticky.style.width=`${section.clientWidth}px`;
   sticky.style.zIndex=pinned?'10':'auto';
   const smooth=(value:number)=>{const t=Math.max(0,Math.min(1,value));return t*t*(3-2*t)};
   // Enter while the stage comes into view, then fade the entire scene at the end.
   const entrance=smooth((window.innerHeight-bounds.top)/(window.innerHeight*.3));
   const exit=smooth((progress-.88)/.12);
   sticky.style.setProperty('--scene-opacity',`${motion.matches?1:entrance*(1-exit)}`);
   sticky.style.setProperty('--story-progress',`${progress}`);
   sticky.style.setProperty('--story-shift',`${motion.matches?0:(progress-.5)*50}px`);
   const ending=Math.max(0,Math.min(1,(progress-.86)/.14));
   const fade=ending*ending*(3-2*ending);
   sticky.style.setProperty('--story-out',`${1-fade}`);
   sticky.style.setProperty('--story-out-y',`${-fade*12}px`);
   const chapter=Math.min(2,Math.floor(progress*3));
   chapters.forEach((node,index)=>{node.dataset.active=String(index===chapter)});
   const viewport=section.clientWidth;
   tracks.forEach((track,index)=>{
    const groupWidth=(track.firstElementChild as HTMLElement)?.offsetWidth||0;
    const visibleSpan=Math.min(viewport*.6263,groupWidth);
    const offsets=lookbookOffsets(viewport,track.scrollWidth,visibleSpan,progress);
    track.style.transform=`translate3d(${index===0?offsets.top:offsets.bottom}px,0,0)`;
   });
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(draw)};
  const resize=()=>{measure();schedule()};
  const observer=new ResizeObserver(resize);observer.observe(sticky);observer.observe(section);
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',resize);motion.addEventListener('change',resize);
  measure();draw();
  return()=>{if(frame)cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',resize);motion.removeEventListener('change',resize);section.style.removeProperty('height');for(const prop of ['position','top','left','width','z-index'])sticky.style.removeProperty(prop)};
 },[]);
 return <section className="scroll-lookbook" ref={root} aria-label="Boys and girls collection lookbook">
  <div className={styles.canvas} data-lookbook-canvas>
   <header className="lookbook-story-heading"><div className="lookbook-story-meta"><span>PANCO / THE EVERYDAY EDIT</span><span>WINTER 2026 <i aria-hidden="true">✦</i></span></div><h2>Little people. <span>Big personality.</span></h2></header>
   {lifestyleRows.map((photos,row)=><div className={`lookbook-row lookbook-row-${row}`} key={row}>
    <div className="lookbook-track">
     {Array.from({length:3},(_,repeat)=><div className="lookbook-group" key={repeat} aria-hidden={repeat!==2?true:undefined}>
      {photos.map(photo=><img key={photo.src} src={photo.src} alt={repeat===2?photo.alt:''} width={240} height={240} loading="lazy" draggable={false}/>)}
     </div>)}
    </div>
   </div>)}
   <footer className="lookbook-story-footer">
    <div className="lookbook-story-orbit" aria-hidden="true"><span>✦</span></div>
    <div className="lookbook-chapters" aria-hidden="true"><div className="lookbook-chapter" data-active="true"><span>01 / LITTLE MOMENTS</span><strong>Made for <em>every day.</em></strong><p>Soft layers. Big smiles. A style all their own.</p></div><div className="lookbook-chapter" data-active="false"><span>02 / FREEDOM TO PLAY</span><strong>Room to <em>be themselves.</em></strong><p>From quiet mornings to their next little adventure.</p></div><div className="lookbook-chapter" data-active="false"><span>03 / BIG ADVENTURES</span><strong>Ready for <em>what’s next.</em></strong><p>Discover the pieces that make every moment theirs.</p></div></div>
    <p className="sr-only">Made for every day. Room to be themselves. Ready for what’s next.</p>
    <div className="lookbook-story-progress" aria-hidden="true"><span>KEEP EXPLORING</span><div><i/></div><span>SCROLL TO DISCOVER ↓</span></div>
   </footer>
  </div>
 </section>;
}
