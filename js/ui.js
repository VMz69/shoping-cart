/*
ARCHIVO: ui.js

Este archivo se encarga de mostrar la información en pantalla.

Responsabilidades:
1. Renderizar productos.
2. Renderizar carrito.
3. Mostrar factura.
4. Mostrar mensajes al usuario.
5. Actualizar la interfaz cuando cambian los datos.

Importante:
- No guardar datos.
- No realizar cálculos.
- No modificar directamente la lógica del carrito.
- Solo interactuar con el DOM.

Este archivo conecta la lógica con la experiencia del usuario.
*/



export function renderProducts(products, handler) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");

    div.innerHTML = `
      <strong>${p.name}</strong>
      - $${p.price}
      <button data-id="${p.id}">Agregar</button>
    `;

    div.querySelector("button")
      .addEventListener("click", () => handler(p.id));

    container.appendChild(div);
  });
}

export function renderCart(cart, products) {
  const container = document.getElementById("cart");
  container.innerHTML = "";

  cart.items.forEach(item => {
    const product = products.find(p => p.id === item.id);

    const div = document.createElement("div");
    div.textContent = `${product.name} x ${item.quantity}`;

    container.appendChild(div);
  });
}
