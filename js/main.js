/*
ARCHIVO: main.js

Este archivo es el controlador principal del sistema.

Responsabilidades:
1. Inicializar la aplicación.
2. Crear instancias de las clases (POO).
3. Coordinar los módulos:
   - Productos
   - Carrito
   - Interfaz
   - Persistencia
4. Configurar eventos globales.
5. Controlar el flujo del sistema.

Importante:
- No contiene lógica específica de un módulo.
- Solo integra y coordina.

Este módulo garantiza que el sistema funcione de manera organizada.
*/



import { products } from "./data.js";
import { Cart } from "./cart.js";
import { renderProducts, renderCart, renderInvoice } from "./ui.js";
import { saveCart, loadCart } from "./storage.js";
import { getTotal, generateInvoice } from "./calculations.js";

const cart = new Cart();

// cargar carrito si existe
cart.items = loadCart();

function handleAdd(productId) {
  cart.add(productId);
  saveCart(cart);
  renderCartWithTotal();
}

function handleRemove(productId) {
  cart.remove(productId);
  saveCart(cart);
  renderCartWithTotal();
}

function renderCartWithTotal() {
  const total = getTotal(cart, products);
  renderCart(cart, products, handleRemove, total);
}

function init() {
  renderProducts(products, handleAdd);
  renderCartWithTotal();
  setupCheckout();
}


// Configura eventos para el proceso de checkout y generación de factura con modal
function setupCheckout() {
  const modal = document.getElementById("invoice-modal");
  const overlay = document.getElementById("modal-overlay");
  const closeBtn = document.getElementById("close-modal");
  const closeBtnFtr = document.getElementById("close-modal-footer");
  const printBtn = document.getElementById("print-invoice");
  const checkoutBtn = document.getElementById("checkout");
  const clearBtn = document.getElementById("clear-cart");
  const purchaseBtn = document.getElementById("purchase")

  function openModal() {
    if (cart.getItems().length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    const { items, subtotal, tax, total } = generateInvoice(cart, products);
    renderInvoice({ items, total: { subtotal, impuestos: tax, final: total } });
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  function finalizePurchase(){
    alert("Compra finalizada con exito")
    cart.clear()
    saveCart(cart);
    renderCartWithTotal();
    closeModal()
  }
  // se debe vaciar el carrito al finalizar la compra
    //   console.log("el carrito debe vaciarse")
    // cart.clear()
    // saveCart(cart);
    // renderCartWithTotal();

  checkoutBtn.addEventListener("click", openModal);
  overlay.addEventListener("click", closeModal);
  closeBtn.addEventListener("click", closeModal);
  closeBtnFtr.addEventListener("click", closeModal);
  printBtn.addEventListener("click", () => window.print());
  purchaseBtn.addEventListener("click", finalizePurchase)

  // Vaciar carrito
  clearBtn.addEventListener("click", () => {
    cart.clear();
    saveCart(cart);
    renderCartWithTotal();
  });
}

init();
