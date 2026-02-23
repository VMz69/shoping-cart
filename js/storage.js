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

/**
 * Guarda el array de productos actualizado en el almacenamiento local.
 */
export function saveInventory(products) {
  localStorage.setItem("inventory", JSON.stringify(products));
}

/**
 * Recupera el inventario guardado.
 * @returns {Array|null} 
 */
export function loadInventory() {
  const stored = localStorage.getItem("inventory");
  return stored ? JSON.parse(stored) : null;
}

// --- PERSISTENCIA DEL CARRITO prueba  ---

/**
 * Guarda los productos que el usuario tiene en su carrito.
 * @param {Array} cartItems - Lista de productos seleccionados.
 */
export function saveCart(cartItems) {
  // Validamos que estemos guardando un array para evitar errores al cargar
  const dataToSave = Array.isArray(cartItems) ? cartItems : [];
  localStorage.setItem("cart", JSON.stringify(dataToSave));
}

/**
 * Recupera el carrito guardado con validación de datos
 * @returns {Array} Retorna el array del carrito o un array vacío si falla.
 */
export function loadCart() {
  try {
    const stored = localStorage.getItem("cart");
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Disculpa los incovenientes se produjo un error al recuperar el carrito, si persiste favor contactar atencion al cliente", error);
    return [];
  }
}

/**
 * Limpia el carrito del almacenamiento (tras finalizar una compra).
 */
export function clearCart() {
  localStorage.removeItem("cart");
}


/**
 * Reduce el stock del inventario.
 * @param {Array} cartItems - Lista de productos en el carrito.
 * @param {Array} allProducts - El inventario completo.
 * @returns {Object} Resultado de la operación con éxito o error.
 */
export function processStockReduction(cartItems, allProducts) {
  // 1. Validar que hay stock para TODOS los productos antes de restar nada
  for (const item of cartItems) {
    const product = allProducts.find(p => p.id === item.id);
    
    if (!product) {
      return { success: false, message: `Producto ID ${item.id} no encontrado.` };
    }

    if (item.quantity > product.stock) {
      return { 
        success: false, 
        message: `Lo sentimos el stock es insuficiente para ${product.name}. Disponible: ${product.stock}, Solicitado: ${item.quantity}, para mayor informacion favor contactar atencion al cliente` 
      };
    }
  }

  // 2. Si llegamos aquí, hay stock para todo.
  cartItems.forEach(item => {
    const product = allProducts.find(p => p.id === item.id);
    product.stock -= item.quantity;
  });

  // 3. Persistencia: Guardar el inventario actualizado.
  saveInventory(allProducts);
  
  return { success: true, message: "Inventario actualizado correctamente." };
}