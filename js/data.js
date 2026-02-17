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



export class Product {
  constructor(id, name, price, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
getFormattedPrice() {
    return `$${this.price.toFixed(2)}`;
  }
}

export const products = [
  new Product(1, "Laptop", 800, 5),
  new Product(2, "Mouse", 20, 10),
  new Product(3, "Teclado", 50, 7),
  new Product(4, "Monitor 24''", 150, 4),
  new Product(5, "Auriculares", 45, 12),
  new Product(6, "Webcam HD", 60, 8),
  new Product(7, "Soporte para Laptop", 25, 15),
  new Product(8, "Hub USB", 30, 20),
  new Product(9, "Alfombrilla Gaming", 15, 25),
  new Product(10, "Silla Gamer", 200, 3),
  new Product(11, "NVIDIA RTX 4090", 1600, 2),
  new Product(12, "NVIDIA RTX 4070 Super", 600, 5),
  new Product(13, "AMD Radeon RX 7800 XT", 500, 4),
  new Product(14, "NVIDIA RTX 3060 Ti", 350, 8),
  new Product(15, "AMD Radeon RX 7600", 270, 10),
  new Product(16, "NVIDIA GTX 1650", 150, 15),
  new Product(17, "Intel Arc A770", 320, 3),
  new Product(18, "NVIDIA RTX 4080 Super", 1000, 3),
  new Product(19, "AMD Radeon RX 7900 XTX", 950, 4),
  new Product(20, "NVIDIA Quadro RTX 4000", 900, 2)
];

