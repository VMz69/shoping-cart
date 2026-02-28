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

  products.forEach((p) => {
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
        <p class="product-price">$${Number(p.price).toFixed(2)}</p>
        <span class="product-desc">
          ${p.stock === 1 ? `${p.stock} Disponible` : `${p.stock ?? "—"} Disponibles`}
        </span>
      </div>

      <div class="product-actions">
        <div class="qty" data-id="${p.id}">
          <button class="qty-dec" aria-label="Disminuir cantidad" type="button">-</button>
          <input class="qty-input" type="number" inputmode="numeric"
                 value="1" min="1" ${p.stock ? `max="${p.stock}"` : ""} aria-label="Cantidad" />
          <button class="qty-inc" aria-label="Aumentar cantidad" type="button">+</button>
        </div>

        <button class="btn add add-btn btn primary">Agregar</button>
      </div>
    `;

    // ===== UI del stepper (sin lógica de negocio) =====
    const input  = card.querySelector(".qty-input");
    const decBtn = card.querySelector(".qty-dec");
    const incBtn = card.querySelector(".qty-inc");
    const addBtn = card.querySelector(".btn.add");

    const clamp = (val) => {
      const min = Number(input.min || 1);
      const max = Number(input.max || Infinity);
      return Math.max(min, Math.min(max, val));
    };

    decBtn.addEventListener("click", () => {
      const next = clamp(Number(input.value || 1) - 1);
      input.value = String(next);
    });

    incBtn.addEventListener("click", () => {
      const next = clamp(Number(input.value || 1) + 1);
      input.value = String(next);
    });

    // Validación suave al escribir
    input.addEventListener("input", () => {
      const n = Number(String(input.value).replace(/[^\d]/g, "")) || 1;
      input.value = String(clamp(n));
    });
    input.addEventListener("blur", () => {
      input.value = String(clamp(Number(input.value || 1)));
    });

    // Agregar con cantidad (si tu handleAdd solo acepta 1 arg, JS ignora el extra)
    addBtn.addEventListener("click", () => {
      const qty = clamp(Number(input.value || 1));
      handleAdd(p.id, qty);

      //reiniciar stepper
      input.value = "1";
      // Feedback visual rápido
      addBtn.disabled = true;
      addBtn.textContent = "Agregado ✓";
      setTimeout(() => { addBtn.disabled = false; addBtn.textContent = "Agregar"; }, 800);
    });

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
    <small>Precio: $${product.price}</small>
    <small>Cantidad: ${item.quantity}</small>
  </div>

  <div class="cart-actions-row">
    <button class="btn decrease btn primary" data-id="${item.id}"> Quitar 1</button>
    ${removeHandler ? `<button class="btn danger" data-id="${item.id}">Eliminar</button>` : ""}
  </div>
`;

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
