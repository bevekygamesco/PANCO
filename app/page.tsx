import HomeShell from '@/components/HomeShell';
import HomeTop from '@/components/HomeTop';
import FeaturedCollection from '@/components/FeaturedCollection';
import ScrollLookbook from '@/components/ScrollLookbook';
import EditorialSections from '@/components/EditorialSections';
import ProductsSection from '@/components/ProductsSection';
import NewsletterSection from '@/components/NewsletterSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import SiteFooter from '@/components/SiteFooter';

export default function Home() {
 return <HomeShell>
  <HomeTop/>
  <FeaturedCollection/>
  <ScrollLookbook/>
  <EditorialSections/>
  <ProductsSection/>
  <NewsletterSection/>
  <TestimonialsSection/>
  <SiteFooter/>
 </HomeShell>;
}
