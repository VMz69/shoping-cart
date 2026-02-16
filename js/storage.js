/*
ARCHIVO: storage.js

Este archivo gestiona la persistencia de datos.

Responsabilidades:
1. Guardar el estado del carrito en localStorage.
2. Cargar el carrito.
3. Simular una base de datos local.

Importante:
- No contiene lógica de negocio.
- No interactúa con el DOM.
- No realiza cálculos.

Este módulo permite mantener la información entre sesiones.
*/



export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart.items));
}

export function loadCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
