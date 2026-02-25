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

  products.forEach((p) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <strong>${p.name}</strong>
      - $${p.price}
      <button data-id="${p.id}">Agregar</button>
    `;

    div.querySelector("button").addEventListener("click", () => handler(p.id));

    container.appendChild(div);
  });
}

export function renderCart(cart, products, removeHandler = null, total = null) {
  const container = document.getElementById("cart");
  container.innerHTML = "";

  cart.getItems().forEach((item) => {
    const product = products.find((p) => p.id === item.id);

    const div = document.createElement("div");

    if (removeHandler) {
      div.innerHTML = `
        ${product.name} x ${item.quantity}
        <button data-id="${item.id}">Eliminar</button>
      `;
      div
        .querySelector("button")
        .addEventListener("click", () => removeHandler(item.id));
    } else {
      div.textContent = `${product.name} x ${item.quantity}`;
    }

    container.appendChild(div);
  });

  if (total !== null) {
    const totalDiv = document.createElement("div");
    totalDiv.style.display = "flex";
    totalDiv.style.justifyContent = "space-between";
    totalDiv.style.width = "100%";

    // Elemento para el texto "Total:"
    const textoSpan = document.createElement("span");
    textoSpan.textContent = "Total:";
    textoSpan.style.fontWeight = "bold";

    // Elemento para el monto
    const montoSpan = document.createElement("span");
    montoSpan.textContent = `$${total}`;
    montoSpan.style.fontWeight = "bold";

    totalDiv.appendChild(textoSpan);
    totalDiv.appendChild(montoSpan);
    container.appendChild(totalDiv);
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
