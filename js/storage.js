/*
ARCHIVO: storage.js

Este archivo gestiona el uso de localStorage.

Responsabilidades:
1. Guardar el carrito.
2. Cargar el carrito.
3. Guardar inventario.
4. Cargar inventario.

Importante:
- No manipular el DOM.
- No hacer cálculos.
- No modificar la lógica del negocio.
- Solo persistencia de datos.

Este archivo simula una base de datos en el navegador.
*/


export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart.items));
}

export function loadCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
