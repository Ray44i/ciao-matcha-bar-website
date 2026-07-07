import "dotenv/config";
import db from "./db.js";

const menuItems = [
  ["drinks", "Classic Matcha Latte", "Ceremonial-grade matcha whisked with steamed milk.", 4.5, ""],
  ["drinks", "Strawberry Matcha", "Layered strawberry puree and creamy matcha over ice.", 5.2, ""],
  ["drinks", "Coconut Matcha", "Matcha with coconut milk for a tropical twist.", 5.2, ""],
  ["drinks", "Iced Matcha Latte", "Our classic latte, chilled and refreshing.", 4.8, ""],
  ["desserts", "Matcha Cheesecake", "Baked cheesecake swirled with ceremonial matcha.", 4.9, ""],
  ["desserts", "Matcha Tiramisu", "Espresso-free tiramisu reimagined with matcha layers.", 5.3, ""],
  ["desserts", "Matcha Cookie", "Chewy cookies with white chocolate chunks.", 3.2, ""],
  ["desserts", "Matcha Roll Cake", "Soft sponge rolled with matcha cream.", 4.8, ""],
];

const products = [
  ["Matcha Starter Kit", "Everything you need to whisk matcha at home.", 49.0, "", 25],
  ["Bamboo Whisk", "Traditional chasen for the smoothest froth.", 15.0, "", 40],
  ["Matcha Bowl", "Hand-glazed ceramic chawan.", 22.0, "", 30],
  ["Ciao Tumbler", "Insulated tumbler with the Ciao gradient wrap.", 25.0, "", 50],
];

const blogPosts = [
  [
    "Why Ceremonial-Grade Matcha Is Worth the Hype",
    "Not all matcha is created equal — here's what sets ceremonial grade apart.",
    "Full article content goes here.",
    "",
  ],
  [
    "5 Health Benefits of Matcha",
    "From focus to antioxidants, matcha brings more than just good looks.",
    "Full article content goes here.",
    "",
  ],
  [
    "How We Prepare Our Matcha",
    "A behind-the-scenes look at our whisking ritual, step by step.",
    "Full article content goes here.",
    "",
  ],
];

const galleryImages = [
  ["", "drinks"],
  ["", "drinks"],
  ["", "desserts"],
  ["", "interior"],
  ["", "drinks"],
  ["", "interior"],
];

const insertMenu = db.prepare(
  "INSERT INTO menu_items (category, name, description, price, image) VALUES (?, ?, ?, ?, ?)"
);
const insertProduct = db.prepare(
  "INSERT INTO products (name, description, price, image, stock) VALUES (?, ?, ?, ?, ?)"
);
const insertBlog = db.prepare(
  "INSERT INTO blog_posts (title, excerpt, content, image) VALUES (?, ?, ?, ?)"
);
const insertGallery = db.prepare("INSERT INTO gallery_images (url, category) VALUES (?, ?)");

db.exec(
  "DELETE FROM menu_items; DELETE FROM products; DELETE FROM blog_posts; DELETE FROM gallery_images;"
);
for (const m of menuItems) insertMenu.run(...m);
for (const p of products) insertProduct.run(...p);
for (const b of blogPosts) insertBlog.run(...b);
for (const g of galleryImages) insertGallery.run(...g);

console.log("Seed complete: menu, products, blog posts and gallery placeholders inserted.");
