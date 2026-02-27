//(JOSE)

/*
ARCHIVO: data.js

Este archivo define la clase Product y el inventario inicial.

Responsabilidades:
1. Aplicar Programación Orientada a Objetos mediante la clase Product.
2. Representar cada producto como un objeto.
3. Simular una base de datos local.
4. Exportar el inventario inicial.

Cada producto contiene:
- id
- nombre
- precio
- stock

Importante:
- No contiene lógica del carrito.
- No manipula el DOM.
- No realiza cálculos.

Este módulo permite encapsular la información de los productos.
*/

import { loadInventory, saveInventory } from "./storage.js";

export class Product {
  constructor(id, name, price, stock, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.image = image;
  }

  getFormattedPrice() {
    return `$${this.price.toFixed(2)}`;
  }
}

export const initialProducts = [
  new Product(1, "Laptop", 800, 1, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYBTF0Trz6nDdjFWDqsbcMcryfZaocJnhHdQ&s"),
  new Product(2, "Mouse", 20, 10, "https://webobjects2.cdw.com/is/image/CDW/2881640?$product-main$"),
  new Product(3, "Teclado", 50, 7, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkYcLTrmWNaRi3B6-ebAYk-ZqXXeSrwLrVY5kmJ-h11w&s"),
  new Product(4, "Monitor 24''", 150, 4, "https://i5.walmartimages.com/seo/Norcent-24-Inch-Frameless-Computer-Monitor-FHD-75HZ-VA-with-Built-In-Speakers_23ea9d00-605d-49d3-b753-25b1f35668bd.cb85455b9112eeec2bab5b50862383aa.png"),
  new Product(5, "Auriculares", 45, 12, "https://www.steren.com.sv/media/catalog/product/cache/0236bbabe616ddcff749ccbc14f38bf2/image/2230830d1/audifonos-bluetooth-3-5-mm-para-gamers.jpg"),
  new Product(7, "Soporte para Laptop", 25, 15, "https://www.steren.com.sv/media/catalog/product/cache/0236bbabe616ddcff749ccbc14f38bf2/image/23087c936/soporte-metalico-para-laptop.jpg"),
  new Product(8, "Hub USB", 30, 20,"https://m.media-amazon.com/images/I/61cg1AdFLoL.jpg"),
  new Product(9, "Alfombrilla Gaming", 15, 25, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiihNDjF7A0fbp08Y9s41rP6ZGGuGIPwgsxw&s"),
  new Product(10, "Silla Gamer", 200, 3, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYWK8OCxwvKul8nGtQm2OtCko8ZWW14FI34g&s"),
  new Product(11, "NVIDIA RTX 4090", 1600, 2, "https://pcbox.vtexassets.com/arquivos/ids/2357228-853-853/90YV0IY3-M0NA00_GAL_1.jpg?v=638610731485900000"),
  new Product(12, "NVIDIA RTX 4070 Super", 600, 5, "https://m.media-amazon.com/images/I/81Sq6VtClyL.jpg"),
  new Product(13, "AMD Radeon RX 7800 XT", 500, 4, "https://m.media-amazon.com/images/I/71GKfo5qtaL._AC_UF894,1000_QL80_.jpg"),
  new Product(14, "NVIDIA RTX 3060 Ti", 350, 8, "https://m.media-amazon.com/images/I/61jN35sc4jS.jpg"),
  new Product(15, "AMD Radeon RX 7600", 270, 10, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmH2cS5sgfx-jy1Ca8IW8TZloOl6xNB1I2NA&s"),
  new Product(16, "NVIDIA GTX 1650", 150, 15, "https://microless.com/cdn/products/ede670c910e2a7eb9460e012b6bae37d-hi.jpg"),
  new Product(17, "Intel Arc A770", 320, 3, "https://www.notebookcheck.net/fileadmin/Notebooks/Intel/Arc_A770/teaser.jpg"),
  new Product(18, "NVIDIA RTX 4080 Super", 1000, 3, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDG2Fz7OntIMMw9QbOks5UKmawNT30jN6jyA&s"),
  new Product(19, "AMD Radeon RX 7900 XTX", 950, 4, "https://www.gigabyte.com/FileUpload/Global/News/2150/o202402261644047237.jpg"),
  new Product(20, "NVIDIA Quadro RTX 4000", 900, 2, "https://m.media-amazon.com/images/I/71l7sbREViL._AC_SL1500_.jpg"),
];

// Cargamos el inventario persistido o usamos el inicial
const stored = loadInventory();
export const products = stored 
  ? stored.map(p => new Product(p.id, p.name, p.price, p.stock)) 
  : initialProducts;

// Si es la primera vez, guardamos el inicial para que exista en el storage//
if (!stored) {
  saveInventory(products);
}

