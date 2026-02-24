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

// Tasa de IVA aplicada en la factura (13%).
export const TAX = 0.13;

// Calcula el precio total de un item (precio unitario x cantidad).
export function getItemTotal(price, quantity) {
  return price * quantity;
}

// Calcula el subtotal del carrito (antes de impuestos).
export function getSubtotal(cart, products) {
  return cart.getItems().reduce((acc, item) => {
    const product = products.find(p => p.id === item.id);
    if (!product) return acc;
    return acc + getItemTotal(product.price, item.quantity);
  }, 0);
}

// Calcula el monto de impuestos con una tasa configurable.
export function calculateTax(total, rate) {
  return total * rate;
}

// Calcula el IVA sobre el subtotal usando la tasa predeterminada (13%).
export function getTax(subtotal) {
  return calculateTax(subtotal, TAX);
}

// Retorna lista con nombre, precio unitario, cantidad y subtotal por cada producto en el carrito.
export function getSubtotals(cart, products) {
  return cart.getItems().map(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return null;
    return {
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      subtotal: getItemTotal(product.price, item.quantity)
    };
  }).filter(Boolean);
}

// Calcula el total general del carrito incluyendo impuestos.
export function getTotal(cart, products) {
  const subtotal = getSubtotal(cart, products);
  return subtotal + getTax(subtotal);
}

// Formatea un numero como precio en dolares con 2 decimales.
export function formatPrice(amount) {
  return `$${amount.toFixed(2)}`;
}

// Genera un objeto factura con productos, subtotales, impuestos y total general.
export function generateInvoice(cart, products, taxRate = TAX) {
  const items = getSubtotals(cart, products);
  const subtotal = getSubtotal(cart, products);
  const tax = calculateTax(subtotal, taxRate);
  const total = subtotal + tax;

  return { items, subtotal, tax, total };
}

// Valida que la cantidad ingresada sea un numero entero positivo y no exceda el stock disponible.
// export function validateQuantity(quantity, stock) {
//   const qty = parseInt(quantity, 10);

//   if (isNaN(qty) || qty <= 0) {
//     return { valid: false, message: "La cantidad debe ser un número entero positivo." };
//   }
//   if (qty > stock) {
//     return { valid: false, message: `Solo hay ${stock} unidades disponibles.` };
//   }
//   return { valid: true, message: "" };
// }