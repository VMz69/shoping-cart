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

const cart = new Cart();

// cargar carrito si existe
cart.items = loadCart();

function handleAdd(productId) {
  cart.add(productId);
  saveCart(cart);
  renderCart(cart, products);
}

function init() {
  renderProducts(products, handleAdd);
  renderCart(cart, products);
}

init();
