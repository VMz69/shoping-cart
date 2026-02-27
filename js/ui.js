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

export function renderProducts(products, handleAdd) {
  const grid = document.querySelector(".products-grid");
  grid.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.dataset.id = p.id;//agregamos el id del producto (invisible) para identificarlo dentro del DOM
    card.dataset.stock = p.stock; // agregamos la cantidad disponible segun inventario

    card.innerHTML = `
      <div class="product-media">
        <img src="${p.image}" alt="${p.name}">
      </div>
      <div class="product-body">
        <h3 class="product-title">${p.name}</h3>
        <p class="product-price">$${p.price}</p>
        <span class="product-desc">${p.stock == 1? p.stock + " Disponible" : p.stock + " Disponibles"}</span>
      </div>
      <div class="product-actions">
        <button class="btn add add-btn">Agregar</button>
      </div>
    `;

    card.querySelector(".btn.add").addEventListener("click", () => handleAdd(p.id));
    grid.appendChild(card);
  });
}

export function renderCart(cart, products, removeHandler = null, total = null) {
  const container = document.getElementById("cart");
  container.innerHTML = "";

  cart.getItems().forEach((item) => {
    const product = products.find((p) => p.id === item.id);

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img class="cart-thumb" src="${product.image}" alt="${product.name}">
      <div class="cart-meta">
        <strong>${product.name}</strong>
        <small>Cantidad: ${item.quantity}</small>
        <small>Precio: $${product.price}</small>
      </div>
      <div class="cart-actions-row">
        ${removeHandler ? `<button class="btn danger" data-id="${item.id}">Eliminar</button>` : ""}
      </div>
    `;

    if (removeHandler) {
      div.querySelector("button").addEventListener("click", () => removeHandler(item.id));
    }

    container.appendChild(div);
  });

  if (total) {
    const summary = document.createElement("div");
    summary.classList.add("cart-summary");
    summary.innerHTML = `
      <span><strong>Total:</strong></span>
      <span>$${total}</span>
    `;
    container.appendChild(summary);
  }
}
// NUEVA FUNCIÓN: Renderizar factura
export function renderInvoice(invoiceData) {
  const container = document.getElementById("invoice");

  if (!invoiceData || !invoiceData.items || invoiceData.items.length === 0) {
    container.innerHTML = "<p>No hay datos de factura disponibles.</p>";
    return;
  }

  const { items, total } = invoiceData;

  container.innerHTML = `
    <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
    <table>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map(
            (p) => `
          <tr>
            <td>${p.nombre}</td>
            <td>${p.cantidad}</td>
            <td>$${p.precio.toFixed(2)}</td>
            <td>$${(p.precio * p.cantidad).toFixed(2)}</td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>
    <p><strong>Subtotal:</strong> $${total.subtotal.toFixed(2)}</p>
    <p><strong>Impuestos:</strong> $${total.impuestos.toFixed(2)}</p>
    <p><strong>Total:</strong> $${total.final.toFixed(2)}</p>
  `;
}
