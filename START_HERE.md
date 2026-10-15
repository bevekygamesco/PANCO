# PANCO — complete homepage (version 27)

Stop the previous development server, extract this archive into a new folder, open `panco-outfits-v27`, then run:

```
npm install
npm run dev
```

## Homepage structure

`app/page.tsx` is a server component that only imports and composes components. `HomeShell` owns the motion root. `HomeTop` contains the interactive header, hero configurator, category bar, offer and shopping dialog. All other sections have their own components.

New final sections: NewsletterSection, TestimonialsSection, SiteFooter. Review data is in lib/testimonials.ts. Avatar photos are local and work without external image requests. See ASSET_CREDITS.md for sources and licensing.

## Interactive preview and live integrations

The testimonial carousel supports arrow controls, keyboard scrolling and touch. Footer help/about links open accessible native information dialogs. Collection links open the catalog.

The newsletter validates email and saves it in this browser under panco-newsletter-email, with an honest preview confirmation. It does not send email or subscribe a person to a mailing service. Connect a newsletter provider before launch. Social buttons open a coming-soon panel until official account URLs are provided. Payment marks are decorative: checkout/payment processing is not connected.

Testimonials are fictional preview copy and stock avatars, not actual customer endorsements. Replace them with consented customer reviews and portraits before public launch. Store-specific shipping, returns and legal policies must also be filled in before launch.

Build and archive validation passed. Browser visual and interaction verification was unavailable in this environment.

## Version 24 motion and spacing

OpeningLoader waits for the hero/logo assets and fonts, with a 1.25 second minimum and a 3 second maximum. It has a Skip intro control, releases the body scroll lock at reveal, and respects reduced-motion settings. It runs on each fresh homepage mount.

Major section gaps scale from 64 to 120px on larger screens and use 48px on phones. Closing newsletter/testimonial/footer gaps scale from 28 to 48px, and use 24px on phones. Panel insets share one spacing token.

The pinned lookbook scroll distance is approximately 1.8 times longer than the previous version. The last 14% fades the bottom story text and progress line out using a smooth scroll-driven curve.

## Version 25

The entire pinned lookbook scene fades in on entry and fades out during its final 12% of scroll progress. Scrolling backward reverses the fade. Reduced-motion users retain full visibility. The offer-to-first-collection gap is now 24–36px. The lookbook grid also has an explicit bounded column so the wide image strips do not stretch the typography layout.

## Version 26: phones only

All new design rules live in app/mobile.css, under max-width:600px (plus refinements under max-width:360px). Tablet and desktop design source files remain unchanged.

The phone layout has a compact logo/menu/search/bag header, a 640px editorial hero, four fitted outfit thumbnails, swipeable neon category tiles, two-column products, larger shopping controls, a two-by-two editorial collage, bottom-sheet shopping dialogs, readable newsletter fields and a refined footer. CSS safe-area insets support phone browser cutouts.

Targets common 320–600 CSS-pixel phone viewports, including Samsung, Honor and similar Android devices. Layout behavior follows the viewport width, not the device brand. Browser/device visuals were not verified in this environment.

## Version 27: updated outfit models

The first mustard/yellow hoodie model and thumbnail remain unchanged. Slots 2–4 now use the supplied 01_winter.png, 02_varsity.png and 03_tshirt.png, respectively. Original PNG bytes and transparency are preserved. The selector, hero crossfade, search panel and quick view use all four looks. Full-body thumbnails use contain sizing. Prices and stable saved-look IDs are retained.
