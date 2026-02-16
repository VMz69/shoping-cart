/*
ARCHIVO: data.js

Este archivo contiene los productos ficticios del sistema.

Responsabilidades:
1. Definir el inventario inicial de la tienda.
2. Cada producto debe tener:
   - id
   - nombre
   - precio
   - stock
3. No debe contener lógica de negocio.
4. Solo exportar los datos.

Este archivo simula una base de datos.

Importante:
- No modificar la estructura del producto.
- No agregar funciones complejas aquí.
- Solo datos.

Ejemplo de producto:
{
  id: 1,
  name: "Laptop",
  price: 800,
  stock: 5
}
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

