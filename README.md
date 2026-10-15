# PANCO — Next.js outfit configurator

A Next.js App Router project in TypeScript/TSX, with Tailwind CSS v4 and custom CSS for precise reference placement. Uses the original supplied assets, not a flattened screenshot.

## Run locally

Install Node.js 20.9 or newer. Open a terminal in this folder:

```sh
npm install
npm run dev
```

Open http://localhost:3000. On Windows, `npm.cmd` can be used if PowerShell blocks `npm.ps1`.

Production:

```sh
npm run build
npm start
```

Type checking: `npm run typecheck`.

## Configurator

Click an outfit thumbnail, previous/next arrow, or pagination segment to update the full-body model and active state. The thumbnail group also supports arrow keys. Both full-body assets are mounted up front to avoid a blank image during switching. Reduced-motion preferences disable transitions.

The source archive provides **two unique full-body models** (`kid1.svg` hoodie and `kid2.svg` T-shirt), and two corresponding thumbnails. The repeated hoodie cards reproduce the reference; they do not represent additional unique outfits. To add outfits, add image files to `public/assets` and edit `lib/outfits.ts`. The reference price, 180 TND, is used for both; replace with real product prices as needed.

The collection button opens a local collection panel. Search, favorites, and shopping bag are browser-session preview interactions. Header initial counters (3 and 2) match the artwork. These are not connected to live inventory, checkout, or accounts. Sign-in explains the integration point; no credentials are collected.

## SVG frame and responsive layout

`public/assets/form.svg` is your untouched original. `components/ResponsiveFrame.tsx` reproduces its path at the original 1511 × 747 dimensions and uses a ResizeObserver to adapt it to the actual banner size. It extends straight sections and retains the corner control points rather than applying a nonuniform scale to the entire SVG. On narrow screens the top indentation becomes shallower so its edges remain usable.

Desktop preserves the reference composition. Tablet and phone layouts rearrange content and put the outfit strip below the banner. The small-screen design is an adaptation because no mobile reference was supplied.

## Files to edit

- `app/page.tsx`: page content, selection state, navigation, and collection panel.
- `app/globals.css`: Tailwind import, dimensions, typography, breakpoints, and transitions.
- `components/ResponsiveFrame.tsx`: responsive outline.
- `components/Icons.tsx`: small interface icons.
- `lib/outfits.ts`: model, thumbnail, label, and price data.
- `public/assets/`: all original archive assets plus form.svg. Apparel SVG assets are included for future use.

The logo is a styled text recreation because no separate logo asset or font was supplied. Text uses Arial. The page has not been browser screenshot compared in this environment; the production build and TypeScript are checked. Exact rendering can vary with font availability and viewport dimensions.


## Revision 2

- Desktop banner uses the Figma 1511:747 width-to-height ratio, so a tall window no longer enlarges the model. At the reference dimensions the banner is 747px tall and the model display is about 657px tall.
- Typography and banner details scale together using CSS container units. All mobile breakpoints remain responsive.
- Added the six desktop navigation links, five neon category links using the supplied vector artwork, and the pink first-order offer.
- Offer decorations are CSS circles, not raster screenshots. Apparel viewport variants remove the large transparent Figma filter margins while preserving original files.
- Staggered entrance animations reveal the header, frame, copy, model, controls, and new sections. Reduced-motion preferences disable them.
- Category links open the supplied collection; live category catalogs and checkout require product data.


## Revision 3

The selected thumbnail has a continuously rotating pink-to-gray gradient border. Only the gradient angle animates; the rounded frame, photo, and checkmark stay fixed. Reduced-motion preferences keep the border static. The carousel now contains three entries, with three visible progress segments and a dynamic 03 total. Previous/next wrap between 01 and 03.


## Revision 4

Restored four outfit entries and the dynamic 04 counter. All four progress lines are visible and shorter (24px at the reference desktop size and 18px on phones). Mobile thumbnails fit four cards again. The animated selected border is retained.


## Tablet layout and product links

The 601–1100px layout follows the supplied 789×635 tablet reference: centered logo inside the top cutout, language at top left, supplied burger icon at top right, four outfit thumbnails on the right, and all five categories in one row. The burger opens the navigation menu. Below 601px the existing phone layout applies; above 1100px the desktop header applies.

Every outfit in `lib/outfits.ts` now has its own `price` and `href`. Prices remain the supplied 180 TND as no other prices were provided. Change these individual fields to your real prices and final clothing URLs. Clicking the large hero model opens its product URL; thumbnails continue selecting the outfit. Four working starter detail pages are included at `/products/winter-hoodie`, `/products/black-tee`, `/products/hoodie-three`, and `/products/hoodie-four`. Edit `app/products/[slug]/page.tsx` when you build the final clothing page.

Production compilation and type checks were completed; a browser screenshot comparison remains unavailable in this environment.


## Logo, hover and price motion

The supplied Group 32 logo is included unchanged as `public/assets/panco-logo.svg`, replacing text logos on the homepage and product pages. Tablet logo positioning follows the center of the banner's top indentation. Hovering the logo enlarges it slightly; hovering outfit cards gives them a small lift and enlargement with interruptible CSS transitions, so quick pointer movements reverse smoothly. Existing rotating selection borders remain.

Prices animate upward with a short fade and blur on every outfit selection, keyed by outfit ID so rapid selections immediately show the latest choice. Each outfit retains its independent price field in `lib/outfits.ts`; all remain 180 TND until real values are supplied. Reduced-motion preferences disable these animations.


## Reactive 3D interactions

The homepage now uses pointer-position-driven 3D tilt on outfit cards, category tiles, logo artwork, and carousel arrows, plus subtle model movement. Outfit cards have a moving gloss highlight, raised checkmark, responsive lighting, and press/release depth. A single requestAnimationFrame loop advances damped springs, with no React renders on pointer movement; rapid movement preserves velocity and settles smoothly. The loop stops at rest. Touch and reduced-motion users retain the static interface. Event listeners and animation frames are cleaned up on unmount and preference changes.


## New neon category icons

Replaced the five category icons with the supplied Group SVGs, unchanged: Group 36 = outerwear, Group 48 = T-shirt, Group 49 = pants, Group 50 = sweater, Group 37 = shoes. They retain their native aspect ratios and reference sizes. Colored neon halos are built with layered CSS drop-shadow filters plus a radial ambient glow, not baked into newly generated images. Colors are pink, green, warm gold, blue and purple respectively. Glow intensity increases on hover while existing reactive 3D interactions remain. Tablet and phone artwork scales down without stretching. Exact screenshot rendering remains unverified in a browser.


## Selection interaction fix and example prices

The thumbnail `reactive-surface` class is now owned by React markup, so selecting an outfit cannot remove it during className reconciliation. Pointer activity is stored in a separate data attribute, leaving selection classes and animated hover state independent. Repeated selections and previous/next updates retain the same DOM nodes and spring listeners.

The large model is excluded from pointer tilt; hovering gives only a centered 3.5% zoom. Example prices are 180, 220, 195 and 240 TND in carousel order. The animated hero price, accessible product label and clothing detail page all read the same per-outfit price field.


## Sharper, darker neon

Removed blur/drop-shadow filters from the visible SVG icons. Their original vector paths are displayed in the foreground, with a separate CSS-masked colored glow behind them. Ambient glow is lower and the sharper halo is narrower. Category tiles release their 3D compositing after the pointer leaves and the spring settles, preventing persistent transformed raster layers at rest. Reactive hover motion remains. Visual sharpness has not been browser screenshot verified.


## Original Figma neon profiles

Replaced the approximate CSS glow with a code-based SVG filter in `components/NeonGlow.tsx`. It uses the original archive's exact sRGB glow colors, source-alpha amplification, independent Gaussian blur radii and layered compositing, behind the supplied new icon outlines. Colors: outerwear #FF7A8E, T-shirt #40723B, pants #C59247, sweater #286AC3 with #227DDA ambient layer, shoes #AB6CEA. The foreground vectors remain unfiltered at full opacity. No hover brightening changes the chosen palette. Exact displayed screenshot matching remains unverified; these are the recovered source filter settings.

## Featured collection and scroll lookbook

The homepage now includes the featured collection under the offer banner, then the two lifestyle photo rows from the new references. All sixteen garment PNGs and all ten 240×240 lifestyle photos are included unchanged.

- `lib/products.ts`: sixteen sample product records. The first six follow the reference names/prices (180 / 110 / 90 / 120 / 180 / 180 TND). Change images, prices, color variants, or product IDs here. Values are demo catalog data.
- `components/FeaturedCollection.tsx`: six desktop cards, three tablet cards, two phone cards per view; previous/next arrows scroll by a page and disable at the ends. Track supports swipe, native keyboard scrolling and reduced motion. Color buttons update the actual image, selected state, and link query.
- `/collection`: all products in a responsive grid. Product links open working detail pages, where the chosen color is read from the URL and can be changed again.
- `components/ProductDetails.tsx`: shared detail view for the original four model outfits and the new sixteen garments. Existing hero prices and links remain.
- `lib/lifestyle.ts`: filenames/order for the top and bottom photo rows. To add photos later, put files in `public/assets/lifestyle/` and add their URLs to the corresponding row array. Arrays can contain any number of images.
- `components/ScrollLookbook.tsx`: repeats each row eight times in the DOM, reusing the same image URLs; no duplicated files. Scrolling down shifts the top right and bottom left; scrolling up reverses both. Motion is tied to section position, with no timer-driven autoplay. Scroll work is scheduled with requestAnimationFrame and skipped offscreen. Reduced motion disables travel.

The lifestyle source images are 240×240, and display sizes are capped at 240px to avoid upscaling on desktop. The original garment images are approximately 217×222. Larger source photos can be swapped into the same paths later for higher-density displays. Browser visual comparison remains unverified; production compilation and generated routes are checked.

## Finite lookbook with empty space and full exit

Replaces the previous edge-to-edge repeated tracks. Each strip now has three finite copies of its photo group. Initially the top ends around 62.63% of the viewport, leaving empty space on the right; the bottom starts around 37.37%, leaving empty space on the left, as in the reference. The rows stay in a sticky viewport while page scrolling brings the remaining photos through. Top travels right and bottom left until both strips are completely offscreen; the sticky section then releases for the next section. Scroll upward to reverse the sequence. There is no loop or automatic motion.

The scroll distance follows the total image-strip width, so adding files to `lib/lifestyle.ts` extends the sequence. Geometry lives in `lib/lookbookMotion.ts`. Reduced motion shows the staggered rows statically without a long pinned interval. No additional placeholder next section was added; insert future content after `<ScrollLookbook/>` in `app/page.tsx`.

## Added lookbook/category panel and interactive product section

Added both reference sections after the finite scrolling photo sequence:

- `components/EditorialSections.tsx`: lookbook copy, five-image collage (including the stacked center column), Discover Lookbook button, and five category cards. Uses all eight newly supplied assets unchanged in `public/assets/editorial/`, plus existing matching photos/full model. The repeated OUTERWEAR labels follow the supplied artwork.
- `components/ProductsSection.tsx`: desktop six-column/two-row product view, tablet four-column grid, phone two-column grid, category tabs, newest/price/name sorting, favorites, actual color-image variants, quantity steppers (1–99), add-to-bag feedback and working pagination. The initial homepage repeats the reference's six styles in its second row; additional styles continue on page two. The standalone collection lists the sixteen distinct products.
- `lib/catalog.ts`: shared filters and sorting. Only categories represented by the supplied garment inventory have results (Outerwear and Sweaters); other tabs display a useful empty state with a return-to-all button. Add correctly categorized product assets/data when available rather than relabeling unrelated images.
- `components/ShopProvider.tsx`: shared favorites and variant-specific cart lines, persisted in browser localStorage. Adding the same product/color merges quantities; different colors stay separate. Header badges now reflect actual saved items/quantities rather than the previous reference-only starting counts.
- `components/ShopPanel.tsx`: favorites and bag content, remove controls, bag quantity updates, total. Shared by the homepage dialogs and `/favorites` and `/bag` pages. Product pages also allow adding their selected variant.
- `/collection?category=Outerwear` and other category URLs initialize the corresponding filter. The category cards and collage all navigate to working routes.

All shop functionality is a local frontend demo: no account service, live inventory, payment or order submission is connected. Demo prices remain editable in `lib/products.ts`. The sand Padded Jacket is 220 TND in the latest reference. The existing hero and earlier featured carousel remain in place. Production build and category/sort/data-route checks pass; browser screenshot and interaction checks remain unavailable in this environment.


## Compact spacing, larger consistent cards and quick view

Homepage sections now share a 20px vertical gap (16px on phones), with reduced panel padding. The pinned photo stage fits the two rows instead of occupying the full screen height, eliminating the large centered top/bottom void while retaining its scroll-driven passage and exit.

Both product sections use the same `CatalogCard` component and larger sizes: four columns on desktop, three on tablet, two on phones. The previous duplicated reference entries were removed from the lower grid; each of the sixteen catalog products appears once, with sixteen distinct primary images.

`components/QuickViewProvider.tsx` intercepts ordinary product-link clicks and opens a centered animated native dialog instead of changing the URL. This covers the large hero model, garment cards and names, editorial product photos, and saved-product links. Color, price, quantity, save/favorite and add-to-bag controls share the same catalog and cart state. Escape, the close icon and backdrop dismiss it with an exit animation; focus returns to the trigger. Body scrolling is locked while the popup is open. Reduced-motion users get instant presentation. Direct product URLs and modified clicks remain available as a fallback. Explicit View Bag/collection navigation closes the popup.

The existing four-slot hero selector is retained as previously requested; removing duplicates refers to the product listing, not its approved outfit slots. Browser visual/interaction verification remains unavailable; build, lookup and product uniqueness checks pass.
