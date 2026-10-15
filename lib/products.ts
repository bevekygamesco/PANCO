export type ProductVariant = { name: string; color: string; image: string };
export type Product = { id: string; name: string; price: number; variants: ProductVariant[] };
const variant = (name:string,color:string,image:number):ProductVariant => ({name,color,image:`/assets/products/${String(image).padStart(2,'0')}.png`});
export const featuredProducts: Product[] = [
 {id:'padded-jacket',name:'Padded Jacket',price:180,variants:[variant('Black','#0b0b0c',10),variant('Silver','#b8b9bb',6),variant('Navy','#466e95',12)]},
 {id:'premium-hoodie',name:'Premium Hoodie',price:110,variants:[variant('Beige','#d0b8a1',15),variant('Green','#52743d',14),variant('Burgundy','#74263c',0)]},
 {id:'basic-sweatshirt',name:'Basic Sweatshirt',price:90,variants:[variant('Green','#52743d',14),variant('Charcoal','#303033',1),variant('Ice blue','#9accec',2)]},
 {id:'logo-hoodie',name:'Logo Hoodie',price:120,variants:[variant('Mustard','#e39a20',13),variant('Charcoal','#303033',1),variant('Dusty rose','#bd7c82',3)]},
 {id:'puffer-jacket',name:'Puffer Jacket',price:180,variants:[variant('Navy','#18314e',12),variant('Red','#c21231',5),variant('Royal blue','#174cb5',9)]},
 {id:'sand-padded-jacket',name:'Padded Jacket',price:220,variants:[variant('Sand','#b89b7a',11),variant('Olive','#62713e',7),variant('Caramel','#b17434',8)]},
 {id:'burgundy-hoodie',name:'Burgundy Hoodie',price:125,variants:[variant('Burgundy','#74263c',0),variant('Dusty rose','#bd7c82',3),variant('Beige','#d0b8a1',15)]},
 {id:'zip-hoodie',name:'Zip Hoodie',price:130,variants:[variant('Charcoal','#303033',1),variant('Ice blue','#9accec',2),variant('Green','#52743d',14)]},
 {id:'ice-blue-hoodie',name:'Ice Blue Hoodie',price:115,variants:[variant('Ice blue','#9accec',2),variant('Dusty rose','#bd7c82',3),variant('Beige','#d0b8a1',15)]},
 {id:'rose-hoodie',name:'Rose Hoodie',price:115,variants:[variant('Dusty rose','#bd7c82',3),variant('Burgundy','#74263c',0),variant('Ice blue','#9accec',2)]},
 {id:'varsity-jacket',name:'Varsity Jacket',price:160,variants:[variant('Green & cream','#235c42',4)]},
 {id:'red-puffer',name:'Red Puffer',price:190,variants:[variant('Red','#c21231',5),variant('Navy','#18314e',12),variant('Royal blue','#174cb5',9)]},
 {id:'silver-puffer',name:'Silver Puffer',price:195,variants:[variant('Silver','#b8b9bb',6),variant('Black','#0b0b0c',10),variant('Olive','#62713e',7)]},
 {id:'olive-puffer',name:'Olive Puffer',price:185,variants:[variant('Olive','#62713e',7),variant('Sand','#b89b7a',11),variant('Caramel','#b17434',8)]},
 {id:'caramel-puffer',name:'Caramel Puffer',price:195,variants:[variant('Caramel','#b17434',8),variant('Sand','#b89b7a',11),variant('Olive','#62713e',7)]},
 {id:'royal-blue-puffer',name:'Royal Blue Puffer',price:200,variants:[variant('Royal blue','#174cb5',9),variant('Navy','#18314e',12),variant('Red','#c21231',5)]},
];
