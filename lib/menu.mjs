export const menuItems = [
  {
    name: 'Cheeseburger',
    ingredients: 'Smashed Beef Patty, American Cheese, Ketchup, Senf, Zwiebel, Gurke.',
    price: '6,90 €',
    category: 'beef',
    image: '/menu/cheeseburger.webp',
    alt: 'BUNEX Cheeseburger mit Smash Patty, Käse und Gurke',
  },
  {
    name: 'Double Cheeseburger',
    ingredients: '2 Smashed Beef Patties, American Cheese, Ketchup, Senf, Zwiebel, Gurke.',
    price: '9,90 €',
    category: 'beef',
    image: '/menu/double-cheeseburger.webp',
    alt: 'BUNEX Double Cheeseburger mit zwei Smash Pattys und Käse',
  },
  {
    name: 'BBQ Burger',
    ingredients: '2 Smashed Beef Patties, Bacon, BBQ Sauce, karamellisierte Zwiebeln, American Cheese.',
    price: '11,90 €',
    category: 'beef',
    image: '/menu/bbq-burger.webp',
    alt: 'BUNEX BBQ Burger mit Bacon, BBQ Sauce und Käse',
  },
  {
    name: 'Hot Chicken',
    ingredients: 'Spicy Fried Chicken, Mayo, Gurke.',
    price: '9,90 €',
    category: 'chicken',
    image: '/menu/hot-chicken.webp',
    alt: 'BUNEX Hot Chicken Burger mit Sauce und Gurke',
  },
  {
    name: 'Special Chicken',
    ingredients: 'Fried Chicken, Salat, Tomate, Gurke, Spezial Sauce.',
    price: '9,90 €',
    category: 'chicken',
    image: '/menu/special-chicken.webp',
    alt: 'BUNEX Special Chicken Burger mit Salat und Tomate',
  },
  {
    name: 'Veggie Cheeseburger',
    ingredients: 'Smashed Plant Patty, American Cheese, Ketchup, Senf, Zwiebel, Gurke.',
    price: '6,90 €',
    category: 'veggie',
    image: '/menu/veggie-cheeseburger.webp',
    alt: 'BUNEX Veggie Cheeseburger mit Plant Patty und Käse',
  },
  {
    name: 'Special Burger (Veggie)',
    ingredients: '2 Smashed Plant Patties, American Cheese, Eisbergsalat, Tomate, karamellisierte Zwiebeln, Gurke, Special Sauce.',
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
