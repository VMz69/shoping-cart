//(MILTON)
/*
ARCHIVO: cart.js

Este archivo contiene la clase Cart, núcleo del sistema.

Responsabilidades:
1. Aplicar Programación Orientada a Objetos.
2. Gestionar el estado del carrito.
3. Agregar productos.
4. Eliminar productos.
5. Vaciar el carrito.
6. Mantener la integridad del estado.

Importante:
- No manipular el DOM.
- No realizar cálculos matemáticos.
- No guardar datos en localStorage.

Este módulo encapsula la lógica del carrito.
*/

export class Cart {
  constructor() {
    this.items = [];
  }

  add(productId, quantity) { //Enviar cantidad opcional, al estilo  cart.add(productId, quantity);, si no se envía, se agrega 1 por defecto
    const item = this.items.find(p => p.id === productId);

    if (quantity === undefined) {
    if (item) {
      item.quantity++;
    } else {
      this.items.push({ id: productId, quantity: 1 });
    }

    } else { // Si si hay cantidad, se agrega al producto ya existente o se agrega un nuevo producto con la cantidad recibida
    if (item) {
      item.quantity += quantity;
    } else {
      this.items.push({ id: productId, quantity });
    }}

  }

  remove(productId, quantity) {
    this.items = this.items.filter(p => p.id !== productId);
  }

  clear() {
    this.items = []; // Vacia el carrito por completo.
  }

  getItems() {
    return this.items;
  }
}

