import Link from 'next/link';
import ProductsSection from '@/components/ProductsSection';
export default function CollectionPage(){return <main className="catalog-page catalog-page-full"><header><Link href="/" aria-label="PANCO home"><img src="/assets/panco-logo.svg" alt="PANCO" width={167} height={52}/></Link><nav className="catalog-header-links"><Link href="/favorites">Favorites</Link><Link href="/bag">Bag</Link><Link href="/">← Home</Link></nav></header><ProductsSection readQuery/></main>}
