'use client';
import { useEffect, type RefObject } from 'react';

type Motion = {
 node: HTMLElement; x: number; y: number; lift: number;
 vx: number; vy: number; vl: number; tx: number; ty: number; tl: number;
 rect: DOMRect | null; strength: number;
};
/** One animation loop for all surfaces. Pointer moves update targets, not React
 * state. Damped springs retain velocity when the pointer changes direction. */
export default function useReactiveMotion(root: RefObject<HTMLElement | null>) {
 useEffect(() => {
  const host = root.current;
  if (!host) return;
  const preference = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  let teardown = () => {};
  function setup() {
   teardown();
   if (!preference.matches || !host) return;
   const pending = new Set<Motion>();
   const cleanups: (() => void)[] = [];
   let frame = 0, last = 0;
   function draw(time: number) {
    const dt = Math.min((time - (last || time - 16)) / 1000, .032);
    last = time;
    for (const m of pending) {
     // Semi-implicit integration, with substeps to stay stable on slow frames.
     for (let i = 0; i < 2; i++) {
      const step = dt / 2;
      m.vx += ((m.tx - m.x) * 210 - m.vx * 23) * step;
      m.vy += ((m.ty - m.y) * 210 - m.vy * 23) * step;
      m.vl += ((m.tl - m.lift) * 210 - m.vl * 23) * step;
      m.x += m.vx * step; m.y += m.vy * step; m.lift += m.vl * step;
     }
     const style = m.node.style;
     style.setProperty('--tilt-x', `${-m.y * 12 * m.strength}deg`);
     style.setProperty('--tilt-y', `${m.x * 15 * m.strength}deg`);
     style.setProperty('--depth-x', `${m.x * 3}px`);
     style.setProperty('--depth-y', `${m.y * 3}px`);
     style.setProperty('--lift', `${-m.lift * 3}px`);
     style.setProperty('--motion-scale', `${1 + m.lift * .035}`);
     style.setProperty('--shine-x', `${50 + m.x * 50}%`);
     style.setProperty('--shine-y', `${50 + m.y * 50}%`);
     style.setProperty('--shine-opacity', `${m.lift * .42}`);
     if (Math.abs(m.tx-m.x)+Math.abs(m.ty-m.y)+Math.abs(m.tl-m.lift)+Math.abs(m.vx)+Math.abs(m.vy)+Math.abs(m.vl) < .003) { pending.delete(m); delete m.node.dataset.reactiveMoving; }
    }
    if (pending.size) frame = requestAnimationFrame(draw);
    else { frame = 0; last = 0; }
   }
   function wake(m: Motion) { m.node.dataset.reactiveMoving = 'true'; pending.add(m); if (!frame) frame = requestAnimationFrame(draw); }
   const nodes = host.querySelectorAll<HTMLElement>('.outfit-card, .category-tile, .arrow-button, .wordmark img');
   for (const node of nodes) {
    const m: Motion = { node, x:0,y:0,lift:0,vx:0,vy:0,vl:0,tx:0,ty:0,tl:0,rect:null,strength:1 };
    const move = (event: PointerEvent) => {
     if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
     if (!m.rect) m.rect = node.getBoundingClientRect();
     m.tx = Math.max(-1,Math.min(1,(event.clientX-m.rect.left)/m.rect.width*2-1));
     m.ty = Math.max(-1,Math.min(1,(event.clientY-m.rect.top)/m.rect.height*2-1));
     m.tl = 1; node.dataset.reactiveActive = 'true'; wake(m);
    };
    const enter = (e: PointerEvent) => { m.rect = node.getBoundingClientRect(); move(e); };
    const leave = () => { m.tx=0;m.ty=0;m.tl=0;m.rect=null;delete node.dataset.reactiveActive;wake(m); };
    const down = () => { m.tl=-.35;wake(m); };
    const up = () => { m.tl=1;wake(m); };
    node.addEventListener('pointerenter',enter);node.addEventListener('pointermove',move);
    node.addEventListener('pointerleave',leave);node.addEventListener('pointercancel',leave);
    node.addEventListener('pointerdown',down);node.addEventListener('pointerup',up);
    window.addEventListener('resize',leave);window.addEventListener('scroll',leave,{passive:true});
    cleanups.push(() => {
     node.removeEventListener('pointerenter',enter);node.removeEventListener('pointermove',move);
     node.removeEventListener('pointerleave',leave);node.removeEventListener('pointercancel',leave);
     node.removeEventListener('pointerdown',down);node.removeEventListener('pointerup',up);
     window.removeEventListener('resize',leave);window.removeEventListener('scroll',leave);
     delete node.dataset.reactiveActive; delete node.dataset.reactiveMoving;
     for (const key of ['--tilt-x','--tilt-y','--depth-x','--depth-y','--lift','--motion-scale','--shine-x','--shine-y','--shine-opacity']) node.style.removeProperty(key);
    });
   }
   teardown = () => { if(frame) cancelAnimationFrame(frame);pending.clear();cleanups.forEach(fn=>fn()); };
  }
  setup(); preference.addEventListener('change',setup);
  return () => { preference.removeEventListener('change',setup);teardown(); };
 }, [root]);
}
