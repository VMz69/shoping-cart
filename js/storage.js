//(JOSE)
/*
ARCHIVO: storage.js

Este archivo gestiona la persistencia de datos.

Responsabilidades:
1. Guardar el estado del carrito en localStorage.
2. Cargar el carrito.
3. Simular una base de datos local.

Importante:
- No contiene lógica de negocio.
- No interactúa con el DOM.
- No realiza cálculos.

Este módulo permite mantener la información entre sesiones.
*/

export function saveInventory(products) {
  localStorage.setItem("inventory", JSON.stringify(products));
}

export function loadInventory() {
  const stored = localStorage.getItem("inventory");
  return stored ? JSON.parse(stored) : null;
}

// --- GESTIÓN DE CARRITO ---

export function saveCart(cartItems) {
  // Aseguramos que guardamos un array, ya sea desde el objeto Cart o directo
  const dataToSave = Array.isArray(cartItems) ? cartItems : (cartItems.items || []);
  localStorage.setItem("cart", JSON.stringify(dataToSave));
}

export function loadCart() {
  try {
    const stored = localStorage.getItem("cart");
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : []; // Validación 
  } catch (error) {
    console.error("Error al recuperar el carrito:", error);
    return [];
  }
}

export function clearCart() {
  localStorage.removeItem("cart");
}

// --- LÓGICA DE NEGOCIO Y STOCK ---

/**
 * Reduce el stock tras validar disponibilidad.
 */
export function processStockReduction(cartItems, allProducts) {
  for (const item of cartItems) {
    const product = allProducts.find(p => p.id === item.id);
    
    if (!product) return { success: false, message: "Producto no encontrado." };

    if (item.quantity > product.stock) {
      return { 
        success: false, 
        message: `Stock insuficiente para ${product.name}. Disponible: ${product.stock}`
      };
    }
  }

  // 2. Ejecución: Restar cantidades
  cartItems.forEach(item => {
    const product = allProducts.find(p => p.id === item.id);
    product.stock -= item.quantity;
  });

  // 3. Persistencia de inventario
  saveInventory(allProducts);
  
  return { success: true, message: "Venta procesada con éxito." };
}

