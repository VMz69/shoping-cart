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

  add(productId) {
    const item = this.items.find(p => p.id === productId);

    if (item) {
      item.quantity++;
    } else {
      this.items.push({ id: productId, quantity: 1 });
    }
  }

  remove(productId) {
    this.items = this.items.filter(p => p.id !== productId);
  }

  clear() {
    this.items = [];
  }

  getItems() {
    return this.items;
  }
}

