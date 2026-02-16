/*
ARCHIVO: cart.js

Este archivo controla el estado del carrito de compras.

Responsabilidades:
1. Agregar productos al carrito.
2. Eliminar productos.
3. Actualizar cantidades.
4. Validar que no se exceda el stock.
5. Mantener una estructura simple y clara.

Este es el núcleo del sistema.

Importante:
- No manipular el DOM aquí.
- No hacer cálculos de totales.
- Solo lógica del carrito.
- Usar funciones reutilizables.

Estructura recomendada del carrito:
[
  { id: 1, quantity: 2 },
  { id: 2, quantity: 1 }
]
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
}
