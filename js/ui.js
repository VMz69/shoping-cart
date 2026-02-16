//(WILLIAM | FERNANDO)

/*
ARCHIVO: ui.js

Este archivo gestiona la interfaz del usuario.

Responsabilidades:
1. Renderizar productos.
2. Mostrar el carrito.
3. Mostrar la factura.
4. Conectar eventos con los métodos de las clases.

Importante:
- No contiene lógica de negocio.
- No realiza cálculos.
- Solo interactúa con el DOM.

Este módulo actúa como puente entre el usuario y las clases del sistema.
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


export function renderCart(cart, products, removeHandler = null, total = null) {
  const container = document.getElementById("cart");
  container.innerHTML = "";

  cart.getItems().forEach(item => {
    const product = products.find(p => p.id === item.id);

    const div = document.createElement("div");

    // Si existe removeHandler mostramos botón
    if (removeHandler) {
      div.innerHTML = `
        ${product.name} x ${item.quantity}
        <button data-id="${item.id}">Eliminar</button>
      `;

      div.querySelector("button")
        .addEventListener("click", () => removeHandler(item.id));
    } else {
      div.textContent = `${product.name} x ${item.quantity}`;
    }

    container.appendChild(div);
  });

  // Mostrar total solo si existe
  if (total !== null) {
    const totalDiv = document.createElement("h3");
    totalDiv.textContent = `Total: $${total}`;
    container.appendChild(totalDiv);
  }
}

