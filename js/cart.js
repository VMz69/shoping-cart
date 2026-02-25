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


    if (quantity === undefined) { //Si el campo esta vacio y se presiona el boton de agregar, se agrega 1 por defecto
      if (item) {
        item.quantity++; //Solo sumamos 1 si ya hay productos
      } else {
        this.items.push({ id: productId, quantity: 1 }); //Agrego nuevo producto con valor inicial 1
      } return;
    } 

    if (typeof quantity !== 'number' || Number.isNaN(quantity)) { //Si lo que se metio en el campo no es numero
      throw new Error("El numero ingresado no es valido");
    }

    if (quantity <= 0) { //Si todo al anterior es superado, veamos si el numero es menor a 0. 
      throw new Error("La cantidad debe ser mayor a 0");
    }

    if (item) {
      item.quantity += quantity; //Solo sumamos 1 si ya hay productos
    } else {
      this.items.push({ id: productId, quantity: quantity }); //Agrego nuevo producto con valor inicial 1
    }

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

