export const menuItems = [
  {
    name: 'Cheeseburger',
    price: '6,90 €',
    category: 'beef',
    image: '/menu/cheeseburger.webp',
    alt: 'BUNEX Cheeseburger mit Smash Patty, Käse und Gurke',
  },
  {
    name: 'Double Cheeseburger',
    price: '9,90 €',
    category: 'beef',
    image: '/menu/double-cheeseburger.webp',
    alt: 'BUNEX Double Cheeseburger mit zwei Smash Pattys und Käse',
  },
  {
    name: 'BBQ Burger',
    price: '11,90 €',
    category: 'beef',
    image: '/menu/bbq-burger.webp',
    alt: 'BUNEX BBQ Burger mit Bacon, BBQ Sauce und Käse',
  },
  {
    name: 'Hot Chicken',
    price: '9,90 €',
    category: 'chicken',
    image: '/menu/hot-chicken.webp',
    alt: 'BUNEX Hot Chicken Burger mit Sauce und Gurke',
  },
  {
    name: 'Special Chicken',
    price: '9,90 €',
    category: 'chicken',
    image: '/menu/special-chicken.webp',
    alt: 'BUNEX Special Chicken Burger mit Salat und Tomate',
  },
  {
    name: 'Veggie Cheeseburger',
    price: '6,90 €',
    category: 'veggie',
    image: '/menu/veggie-cheeseburger.webp',
    alt: 'BUNEX Veggie Cheeseburger mit Plant Patty und Käse',
  },
  {
    name: 'Special Burger (Veggie)',
    price: '10,90 €',
    category: 'veggie',
    image: '/menu/special-veggie.webp',
    alt: 'BUNEX Special Veggie Burger mit Salat und Tomate',
  },
  {
    name: 'Pommes',
    price: '3,50 €',
    category: 'sides',
    image: '/menu/pommes.webp',
    alt: 'Goldene BUNEX Pommes in einer Schale',
  },
];

export function getMenuItems(category = 'all') {
  return category === 'all'
    ? menuItems
    : menuItems.filter((item) => item.category === category);
}
