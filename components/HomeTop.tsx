'use client';
import { useEffect, useRef, useState } from 'react';
import ResponsiveFrame from '@/components/ResponsiveFrame';
import Icon from '@/components/Icons';
import NeonGlow from '@/components/NeonGlow';
import { useShop } from '@/components/ShopProvider';
import ShopPanel from '@/components/ShopPanel';
import { outfits } from '@/lib/outfits';

const categories = [
 { label: 'OUTERWEAR', asset: 'neon-outerwear.svg', glow: '#ff7a8e', width: 64, height: 67 },
 { label: 'T-SHIRTS', asset: 'neon-tshirt.svg', glow: '#40723b', width: 61, height: 54 },
 { label: 'PANTS', asset: 'neon-pants.svg', glow: '#c59247', width: 41, height: 59 },
 { label: 'SWEATERS', asset: 'neon-sweater.svg', glow: '#286ac3', width: 63, height: 57 },
 { label: 'SHOES', asset: 'neon-shoes.svg', glow: '#ab6cea', width: 70, height: 49 },
];

type Panel = 'collection' | 'search' | 'favorites' | 'bag' | 'signin' | 'about' | 'menu' | null;
export default function HomeTop() {
 const [selected, setSelected] = useState(0);
 const [panel, setPanel] = useState<Panel>(null);
 const [search, setSearch] = useState('');
 const { favorites, cart, cartCount, toggleFavorite, addItem } = useShop();
 const bag = cart.map(item=>item.id);
 const modal = useRef<HTMLDialogElement>(null);
 const outfit = outfits[selected];
 const select = (index: number) => setSelected((index + outfits.length) % outfits.length);
 useEffect(() => { if (panel) modal.current?.showModal(); else modal.current?.close(); }, [panel]);
 return <>
  <header className="site-header flex items-center justify-between">
   <a href="/" className="wordmark" aria-label="PANCO home"><img className="reactive-surface" src="/assets/panco-logo.svg" alt="PANCO"/></a>
   <nav className="desktop-navigation" aria-label="Main navigation">
    <a href="#home" className="active">HOME</a>
    <button onClick={()=>setPanel('collection')}>COLLECTION</button>
    <button onClick={()=>setPanel('collection')}>BOYS</button>
    <button onClick={()=>setPanel('collection')}>GIRLS</button>
    <button onClick={()=>setPanel('collection')}>ACCESSORIES</button>
    <button onClick={()=>setPanel('about')}>ABOUT US</button>
   </nav>
   <nav className="flex items-center header-actions" aria-label="Account and shopping">
    <span className="language"><span>AR</span><i/>FR</span>
    <button className="icon-button" aria-label="Search collection" onClick={()=>setPanel('search')}><Icon name="search"/></button>
    <button className="icon-button badge-button" aria-label="Open favorites" onClick={()=>setPanel('favorites')}><Icon name="heart"/><span className="badge">{favorites.length}</span></button>
    <button className="icon-button badge-button" aria-label="Open shopping bag" onClick={()=>setPanel('bag')}><Icon name="bag"/><span className="badge">{cartCount}</span></button>
    <button className="sign-in" onClick={()=>setPanel('signin')}>SIGN IN</button>
   </nav>
   <button className="tablet-burger" aria-label="Open navigation menu" aria-haspopup="dialog" onClick={()=>setPanel('menu')}><img src="/assets/burger.svg" alt=""/></button>
  </header>
  <section id="home" className="hero-layout" aria-label="Winter collection outfit configurator">
   <div className="hero-stage">
    <ResponsiveFrame/>
    <div className="collection-label flex items-center"><span className="snow-badge"><img className="frozen-icon" src="/assets/frozen.svg" alt=""/></span><span>NEW COLLECTION<br/>2026</span></div>
    <div className="season-type" aria-hidden="true"><span>WINTER</span><span>2026</span></div>
    <div className="hero-copy">
     <p className="eyebrow">LAST COLLECTION</p>
     <h1>WINTER<br/><span>VIBES</span></h1>
     <p className="description">Discover the perfect combination<br className="desktop-break"/> of comfort, style and quality<br className="desktop-break"/> for your kids.</p>
     <button className="explore flex items-center justify-between" onClick={()=>setPanel('collection')}>EXPLORE COLLECTION<Icon name="arrow"/></button>
    </div>
    <a className="model-display" href={outfit.href} aria-label={`View ${outfit.label}, ${outfit.price} TND`} aria-live="polite" aria-atomic="true">
     <div className="ground-shadow"/>
     {outfits.map(item=><img key={item.model} src={item.model} alt={outfit.model === item.model ? outfit.label : ''} aria-hidden={outfit.model !== item.model} className={`hero-model ${outfit.model===item.model ? 'is-visible' : ''}`} draggable={false}/>)}
     <span className="sr-only">Selected outfit {selected + 1}: {outfit.label}</span>
    </a>
    <div className="price-block" aria-live="polite" aria-atomic="true"><p className="animated-price" key={outfit.id}>{outfit.price} TND</p><span>LAST COLLECTION</span><strong>2026</strong></div>
    <div className="benefits flex">
     {[['hear.svg','PREMIUM','QUALITY'],['safe.svg','SAFE','MATERIALS'],['smile.svg','DESIGNED','FOR KIDS']].map(([file,a,b])=><div className="benefit flex items-center" key={file}><img src={`/assets/${file}`} alt=""/><span>{a}<br/>{b}</span></div>)}
    </div>
    <div className="carousel-controls flex items-center">
     <button className="previous arrow-button reactive-surface" aria-label="Previous outfit" onClick={()=>select(selected-1)}><Icon name="arrow"/></button>
     <span className="current-number">{String(selected+1).padStart(2,'0')}</span>
     <div className="progress-bars flex" aria-label={`Outfit ${selected+1} of ${outfits.length}`}>
      {outfits.map((item,index)=><button key={item.id} aria-label={`Select outfit ${index+1}`} aria-current={selected===index ? 'true' : undefined} className={index===selected?'active':''} onClick={()=>select(index)}/>)}
     </div>
     <span className="total-number">{String(outfits.length).padStart(2,'0')}</span>
     <button className="next arrow-button reactive-surface" aria-label="Next outfit" onClick={()=>select(selected+1)}><Icon name="arrow"/></button>
    </div>
   </div>
   <aside className="outfit-selector" aria-label="Choose an outfit">
    <div className="outfit-scroll" role="group" aria-label="Outfit thumbnails" onKeyDown={e=>{if(e.key==='ArrowDown'||e.key==='ArrowRight'){e.preventDefault();select(selected+1)}if(e.key==='ArrowUp'||e.key==='ArrowLeft'){e.preventDefault();select(selected-1)}}}>
     {outfits.map((item,index)=><button key={item.id} className={`outfit-card reactive-surface ${item.fullBody?'outfit-fullbody':''} ${selected===index?'selected':''}`} aria-label={`Wear ${item.label}`} aria-pressed={selected===index} onClick={()=>select(index)}><img src={item.thumbnail} alt={item.label} draggable={false}/>{selected===index&&<span className="selected-check"><Icon name="check"/></span>}</button>)}
    </div>
    <p className="click-hint flex items-center"><img src="/assets/POINTER.png" alt=""/><span>CLICK TO CHANGE OUTFIT</span></p>
   </aside>
  </section>
  <section className="below-hero" aria-label="Shop categories and special offer">
   <nav className="category-strip" aria-label="Shop by category">
    {categories.map(category=><button className="category-tile reactive-surface" key={category.label} onClick={()=>setPanel('collection')}>
     <span className="category-art" style={{'--category-glow':category.glow, '--icon-mask':`url(/assets/${category.asset})`, '--icon-width':`${category.width}px`, '--icon-height':`${category.height}px`} as React.CSSProperties}><NeonGlow asset={category.asset} width={category.width} height={category.height}/><img src={`/assets/${category.asset}`} alt=""/></span>
     <span className="category-copy"><strong>{category.label}</strong><span>Explore Now <Icon name="arrow"/></span></span>
    </button>)}
   </nav>
   <button className="offer-banner" onClick={()=>setPanel('collection')} aria-label="Special offer: get 20% off on your first order. Explore collection">
    <span className="offer-bubbles offer-bubbles-middle" aria-hidden="true"/>
    <span className="offer-bubbles offer-bubbles-right" aria-hidden="true"/>
    <svg className="gift-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 15h22v15H5zM3 9h26v6H3zM16 9v21"/><path d="M16 9C7 10 5 6 8 3c3-3 7 2 8 6Zm0 0c9 1 11-3 8-6-3-3-7 2-8 6Z"/></svg>
    <span className="offer-title">SPECIAL OFFER</span><span className="offer-divider"/>
    <strong className="offer-message">GET 20% OFF ON YOUR FIRST ORDER !</strong>
    <img className="offer-kid" src="/assets/kid1.svg" alt=""/>
   </button>
  </section>
  <dialog ref={modal} className="shop-dialog" onCancel={()=>setPanel(null)} onClick={e=>{if(e.target===e.currentTarget)setPanel(null)}}>
   <div className="dialog-heading flex justify-between items-center"><h2>{panel==='menu'?'MENU':panel==='about'?'ABOUT PANCO':panel==='signin'?'SIGN IN':panel==='bag'?'YOUR BAG':panel==='favorites'?'YOUR FAVORITES':panel==='search'?'FIND YOUR STYLE':'THE COLLECTION'}</h2><button aria-label="Close panel" className="icon-button" onClick={()=>setPanel(null)}><Icon name="close"/></button></div>
   {panel==='menu' ? <nav className="tablet-menu-links" aria-label="Tablet navigation">
    <a href="#home" onClick={()=>setPanel(null)}>HOME</a>
    {['COLLECTION','BOYS','GIRLS','ACCESSORIES'].map(label=><button key={label} onClick={()=>setPanel('collection')}>{label}</button>)}
    <button onClick={()=>setPanel('about')}>ABOUT US</button>
    <button onClick={()=>setPanel('search')}>SEARCH</button>
    <button onClick={()=>setPanel('favorites')}>FAVORITES</button>
    <button onClick={()=>setPanel('bag')}>SHOPPING BAG</button>
    <button onClick={()=>setPanel('signin')}>SIGN IN</button>
   </nav> : panel==='bag'||panel==='favorites' ? <ShopPanel mode={panel}/> : panel==='about' ? <p>Discover the perfect combination of comfort, style and quality for your kids. Explore the PANCO Winter 2026 collection.</p> : panel==='signin' ? <p>This project includes the homepage and outfit configurator. Connect your authentication provider here to enable customer accounts.</p> : <>
    {panel==='search'&&<input autoFocus type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search hoodie or T-shirt…" aria-label="Search outfits" className="search-input"/>}
    <div className="collection-grid">
     {outfits.filter(item=>panel==='search'?item.label.toLowerCase().includes(search.toLowerCase()):true).map((item)=><button key={item.id} className="collection-item" onClick={()=>{select(outfits.findIndex(look=>look.id===item.id));setPanel(null)}}><img className={item.fullBody?'collection-fullbody':undefined} src={item.thumbnail} alt={item.label}/><span>{item.label}</span><strong>{item.price} TND</strong></button>)}
    </div>
    {panel==='collection'&&<div className="dialog-buttons flex"><button className="primary-action" onClick={()=>addItem({id:outfit.id,name:outfit.label,price:outfit.price,image:outfit.model,color:'Selected look'})}>ADD SELECTED LOOK TO BAG{bag.includes(outfit.id)?' ✓':''}</button><button className="secondary-action" onClick={()=>toggleFavorite(outfit.id)}>{favorites.includes(outfit.id)?'SAVED ✓':'SAVE LOOK'}</button></div>}
   </>}
  </dialog>
 </>;
}
