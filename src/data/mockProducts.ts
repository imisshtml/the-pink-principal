export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: 'makeup' | 'hair';
  badge?: string;
}

export const mockProducts: Product[] = [
  {
    id: 'prod_1',
    title: 'Rose Gold Glow Kit',
    price: 68.00,
    image: '/images/makeup_category_1772433307003.png',
    category: 'makeup',
    badge: 'Best Seller'
  },
  {
    id: 'prod_2',
    title: 'Silky Straight bundled trio',
    price: 320.00,
    image: '/images/hair_category_1772433319731.png',
    category: 'hair'
  },
  {
    id: 'prod_3',
    title: 'The Gloss Remedy Duo',
    price: 38.00,
    image: '/images/makeup_category_1772433307003.png',
    category: 'makeup',
    badge: 'New'
  },
  {
    id: 'prod_4',
    title: '24" Indian Wavy Unit',
    price: 450.00,
    image: '/images/hair_category_1772433319731.png',
    category: 'hair'
  }
];
