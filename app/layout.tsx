import type { Metadata } from 'next';
import './globals.css';
import './mobile.css';
import ShopProvider from '@/components/ShopProvider';
import QuickViewProvider from '@/components/QuickViewProvider';
export const metadata: Metadata = { title: 'PANCO — Winter Vibes 2026', description: 'Discover the PANCO kids collection. Choose an outfit and explore winter styles.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><ShopProvider><QuickViewProvider>{children}</QuickViewProvider></ShopProvider></body></html>; }
