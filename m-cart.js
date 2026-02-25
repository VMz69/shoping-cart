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
    add(productId, quantity) {
        const item = this.items.find(p => p.id === productId);
        if (quantity === undefined) {
            if (item) {
                item.quantity++;
            }
            else {
                this.items.push({ id: productId, quantity: 1 });
            }
            return;
        }
        if (typeof quantity !== "number" || Number.isNaN(quantity)) {
            throw new Error("El numero ingresado no es valido");
        }
        if (quantity <= 0) {
            throw new Error("La cantidad debe ser mayor a 0");
        }
        if (item) {
            item.quantity += quantity;
        }
        else {
            this.items.push({ id: productId, quantity });
        }
    }
    remove() {
        console.log("Producto(s) eliminado(s) del carrito");
    }
    clear() {
        console.log("Carrito vaciado");
    }
    getItems() {
        return this.items;
    }
}
