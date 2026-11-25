// data.js - the product list (the "database" of the page).
// To add a product: add one object here. Nothing else needs to change.
// Every file in js/shop/ adds its pieces to one shared object called Shop.
window.Shop = window.Shop || {};

Shop.PRODUCTS = [
  { id: 1, name: 'Monitor 24" Basic',    category: 'Monitors', price: 200,  oldPrice: 400,  rating: 4.2, image: 'img/monitor1.svg', desc: 'Simple 24 inch office monitor. Good for study and daily work.' },
  { id: 2, name: 'Monitor 27" Wide',     category: 'Monitors', price: 150,  oldPrice: 300,  rating: 3.9, image: 'img/monitor2.svg', desc: 'Wide screen with thin borders. Nice for watching and multitasking.' },
  { id: 3, name: 'Monitor 32" Curved',   category: 'Monitors', price: 320,  oldPrice: 500,  rating: 4.7, image: 'img/monitor3.svg', desc: 'Big curved screen for design work and movies.' },
  { id: 4, name: 'Laptop 14" Light',     category: 'Laptops',  price: 90,   oldPrice: 120,  rating: 3.5, image: 'img/monitor4.svg', desc: 'Light laptop for students. Easy to carry every day.' },
  { id: 5, name: 'Monitor 22" Compact',  category: 'Monitors', price: 250,  oldPrice: 400,  rating: 4.4, image: 'img/monitor5.svg', desc: 'Small monitor that fits any desk.' },
  { id: 6, name: 'Monitor 24" Gaming',   category: 'Monitors', price: 180,  oldPrice: 260,  rating: 4.8, image: 'img/monitor6.svg', desc: 'Fast screen for games, with sharp colours.' },
  { id: 7, name: 'Laptop 15" Pro',       category: 'Laptops',  price: 400,  oldPrice: 650,  rating: 4.6, image: 'img/monitor7.svg', desc: 'Stronger laptop for programming and design.' },
  { id: 8, name: 'Monitor 29" Ultrawide',category: 'Monitors', price: 120,  oldPrice: 200,  rating: 4.0, image: 'img/monitor8.svg', desc: 'Ultrawide screen, like two screens in one.' }
];
