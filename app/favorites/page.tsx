import Link from 'next/link';
import ShopPanel from '@/components/ShopPanel';
export default function FavoritesPage(){return <main className="shopping-page"><header><Link href="/"><img src="/assets/panco-logo.svg" alt="PANCO" width={167} height={52}/></Link><Link href="/collection">← Continue shopping</Link></header><section><h1>YOUR FAVORITES</h1><ShopPanel mode="favorites"/></section></main>}
