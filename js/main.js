/*
ARCHIVO: main.js

Este archivo es el punto central del sistema.

Responsabilidades:
1. Inicializar la aplicación.
2. Cargar inventario y carrito al iniciar.
3. Configurar eventos globales.
4. Conectar los módulos:
   - data
   - cart
   - calculations
   - ui
   - storage
5. Controlar el flujo general del sistema.

Importante:
- No contener lógica específica de un módulo.
- Solo coordinar.
- Mantener el código claro y organizado.

Este archivo asegura que todo funcione como un solo sistema.
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
