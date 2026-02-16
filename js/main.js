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
import { renderProducts, renderCart } from "./ui.js";
import { saveCart, loadCart } from "./storage.js";
import { getTotal } from "./calculations.js";

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
}

init();
