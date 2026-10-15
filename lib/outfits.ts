// Four configurator looks; keep stable IDs so saved looks remain valid.
export const outfits = [
  { id: 'winter-hoodie', href: '/products/winter-hoodie', label: 'Mustard winter hoodie', model: '/assets/kid1.svg', thumbnail: '/assets/MODEL1.png', price: 180, color: '#dda027', fullBody: false },
  { id: 'black-tee', href: '/products/black-tee', label: 'Charcoal winter jacket', model: '/assets/outfits/01_winter.png', thumbnail: '/assets/outfits/01_winter.png', price: 220, color: '#3b393b', fullBody: true },
  { id: 'hoodie-three', href: '/products/hoodie-three', label: 'Black and white varsity outfit', model: '/assets/outfits/02_varsity.png', thumbnail: '/assets/outfits/02_varsity.png', price: 195, color: '#252526', fullBody: true },
  { id: 'hoodie-four', href: '/products/hoodie-four', label: 'Black graphic T-shirt outfit', model: '/assets/outfits/03_tshirt.png', thumbnail: '/assets/outfits/03_tshirt.png', price: 240, color: '#222222', fullBody: true },
] as const;
