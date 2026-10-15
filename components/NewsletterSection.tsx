'use client';
import { useState, type FormEvent } from 'react';
import Icon from '@/components/Icons';
export default function NewsletterSection(){
 const [email,setEmail]=useState(''),[message,setMessage]=useState('');
 function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();
  try{localStorage.setItem('panco-newsletter-email',email.trim().toLowerCase());setMessage('Email saved for this preview. Live signup is coming soon.');setEmail('')}
  catch{setMessage('Your email could not be saved. Please try again.')}
 }
 return <section className="newsletter-section" aria-labelledby="newsletter-heading"><div className="newsletter-intro"><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="m4 14 16-9 16 9v20H4Z"/><path d="m4 14 16 13 16-13M4 34l12-11m20 11L24 23"/><path d="M10 18V9h20v9"/></svg><div><h2 id="newsletter-heading">JOIN OUR WORLD</h2><p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p></div></div><form onSubmit={submit}><label className="sr-only" htmlFor="newsletter-email">Your email address</label><div className="newsletter-input"><input id="newsletter-email" type="email" required maxLength={254} autoComplete="email" placeholder="Your email address" value={email} onChange={e=>{setEmail(e.target.value);setMessage('')}}/><button type="submit">SUBSCRIBE <Icon name="arrow"/></button></div><p className="newsletter-status" role="status">{message}</p></form></section>;
}
