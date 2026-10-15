'use client';
import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icons';
import { testimonials } from '@/lib/testimonials';
export default function TestimonialsSection(){
 const track=useRef<HTMLDivElement>(null),[ends,setEnds]=useState({start:true,end:false});
 useEffect(()=>{const node=track.current;if(!node)return;const update=()=>setEnds({start:node.scrollLeft<2,end:node.scrollLeft+node.clientWidth>=node.scrollWidth-2});const observer=new ResizeObserver(update);observer.observe(node);node.addEventListener('scroll',update,{passive:true});update();return()=>{observer.disconnect();node.removeEventListener('scroll',update)}},[]);
 function slide(direction:number){const node=track.current;if(!node)return;const card=node.firstElementChild as HTMLElement;const gap=parseFloat(getComputedStyle(node).gap)||0;node.scrollBy({left:direction*(card.offsetWidth+gap),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}
 return <section className="testimonials-section" aria-labelledby="testimonials-heading"><header><div><p>OUR HAPPY CUSTOMERS</p><h2 id="testimonials-heading">WHAT PARENTS SAY</h2></div><div className="testimonial-controls"><button aria-label="Previous testimonial" disabled={ends.start} onClick={()=>slide(-1)}><Icon name="arrow"/></button><button aria-label="Next testimonial" disabled={ends.end} onClick={()=>slide(1)}><Icon name="arrow"/></button></div></header><div className="testimonial-track" ref={track} tabIndex={0} aria-label="Parent testimonials, scroll for more">{testimonials.map(item=><article className="testimonial-card" key={item.id}><div className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>“{item.quote}”</blockquote><div className="testimonial-person"><img src={item.image} alt="" width={36} height={36} loading="lazy"/><span>— {item.name}</span></div></article>)}</div></section>;
}
