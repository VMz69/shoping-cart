//(FERNANDO)

/*
ARCHIVO: calculations.js

Este archivo contiene funciones para cálculos del sistema.

Responsabilidades:
1. Calcular totales.
2. Calcular impuestos.
3. Calcular subtotales.
4. Mantener funciones puras.

Importante:
- No modificar objetos del carrito.
- No interactuar con el DOM.
- No almacenar datos.

Este módulo separa la lógica matemática de la lógica de negocio.
*/


export function getTotal(cart, products) {
  return cart.getItems().reduce((acc, item) => {
    const product = products.find(p => p.id === item.id);
    return acc + product.price * item.quantity;
  }, 0);
}
