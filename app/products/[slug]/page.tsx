import Link from 'next/link';
import { notFound } from 'next/navigation';
import { outfits } from '@/lib/outfits';
import { featuredProducts } from '@/lib/products';
import ProductDetails from '@/components/ProductDetails';
import { findProduct } from '@/lib/productLookup';
export function generateStaticParams(){return [...outfits,...featuredProducts].map(product=>({slug:product.id}))}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const product=findProduct(slug);
 if(!product)notFound();
 return <main className="product-page"><header><Link href="/" className="wordmark" aria-label="PANCO home"><img src="/assets/panco-logo.svg" alt="PANCO"/></Link><Link href="/collection">← Back to collection</Link></header><ProductDetails product={product}/></main>;
}
