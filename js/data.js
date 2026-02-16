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
}

export const products = [
  new Product(1, "Laptop", 800, 5),
  new Product(2, "Mouse", 20, 10),
  new Product(3, "Teclado", 50, 7)
];

