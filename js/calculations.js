/*
ARCHIVO: calculations.js

Este archivo contiene todas las operaciones matemáticas del sistema.

Responsabilidades:
1. Calcular subtotal.
2. Calcular impuestos.
3. Calcular total final.
4. Calcular totales por producto.

Importante:
- No manipular el DOM.
- No modificar el carrito.
- Solo recibir datos y devolver resultados.
- Mantener funciones puras.

Este archivo permite que el sistema sea modular y fácil de probar.
*/



export function getTotal(cart, products) {
  return cart.items.reduce((acc, item) => {
    const product = products.find(p => p.id === item.id);
    return acc + product.price * item.quantity;
  }, 0);
}
