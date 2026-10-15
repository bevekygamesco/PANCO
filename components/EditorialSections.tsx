import Link from 'next/link';
import Icon from '@/components/Icons';
const categories=[
 {name:'OUTERWEAR',image:'/assets/editorial/04.png',category:'Outerwear'},
 {name:'OUTERWEAR',image:'/assets/lifestyle/06.png',category:'Dress'},
 {name:'OUTERWEAR',image:'/assets/editorial/05.png',category:'T-shirts'},
 {name:'ACCESSORIES',image:'/assets/editorial/06.png',category:'All'},
 {name:'ROBE',image:'/assets/editorial/07.png',category:'Dress'},
];
export default function EditorialSections(){return <section className="editorial-section" aria-label="Lookbook and shop by category">
 <div className="editorial-top"><div className="editorial-copy"><p>LOOKBOOK 2026</p><h2>STYLE FOR<br/>EVERY MOMENT</h2><div>Our new collection is designed to<br className="desktop-break"/> bring comfort and style to your kids<br className="desktop-break"/> every day.</div><Link className="editorial-cta" href="/collection">DISCOVER LOOKBOOK <Icon name="arrow"/></Link></div>
 <div className="editorial-collage"><Link href="/products/premium-hoodie"><img src="/assets/editorial/00.png" alt="Beige outfit, seated look" loading="lazy"/></Link><div className="editorial-stacked"><Link href="/products/basic-sweatshirt"><img src="/assets/editorial/01.png" alt="Green sweatshirt look" loading="lazy"/></Link><Link href="/products/black-tee"><img src="/assets/editorial/02.png" alt="Black T-shirt look" loading="lazy"/></Link></div><Link href="/products/logo-hoodie"><img src="/assets/editorial/03.png" alt="Mustard hoodie look" loading="lazy"/></Link><Link href="/products/black-tee"><img src="/assets/kid2.svg" alt="Black T-shirt and beige pants look" loading="lazy"/></Link></div></div>
 <div className="editorial-categories"><h2>SHOP BY CATEGORY</h2><div className="editorial-category-grid">{categories.map((item,index)=><Link key={index} className="editorial-category" href={`/collection?category=${encodeURIComponent(item.category)}`}><img src={item.image} alt={index===1?'Girls dress':item.name} loading="lazy"/><span>{item.name}<Icon name="arrow"/></span></Link>)}</div></div>
 </section>}
