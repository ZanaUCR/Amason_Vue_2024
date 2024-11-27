<template>
  <div class="discount-products">
    <h3 class="title">Black Amason</h3>
    <div class="discount-products-container">
      <div
        v-for="product in products"
        :key="product.product_id"
        class="product-card"
      >
        <div class="image-container">
          <img :src="product.product_image" alt="Imagen del producto" class="product-image" />
          <span class="discount-badge">
            {{ product.product_discount }}% off
          </span>
        </div>
        <div class="product-details">
          <h4 class="product-name">{{ product.product_name }}</h4>
          <p class="price">Precio: ${{ product.product_price }}</p>
          <p class="original-price">Precio Original: ${{ calculateOriginalPrice(product) }}</p>
        </div>
        <!-- Botón de agregar producto al carrito -->
        <i
          v-if="product.isAdding"
          class="fa-solid fa-spinner fa-spin-pulse fa-2x"
          :style="{ cursor: 'not-allowed' }"
        ></i>
        <i
          v-else
          @click="addProduct(product)"
          class="fas fa-cart-plus fa-2x"
          :style="{ cursor: 'pointer' }"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      products: [], // Almacenaremos los productos aquí
    };
  },
  
  async mounted() {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/recommendationByDiscount"
      );
      if (response.data && Array.isArray(response.data)) {
        this.products = response.data.map(item => {
        return {
          product_description: item.description,
          product_id: item.product_id,
          product_name: item.name,
          product_price: item.price,
          product_stock: item.stock,
          product_discount: item.discount,
          product_image: item.images[0]?.image_path,
          isAdding: false // Añadir la propiedad isAdding a cada producto
        };
      });
      } else {
        console.error("No se encontraron productos en descuento.");
      }
    } catch (error) {
      console.error("Error al obtener productos con descuento:", error);
    }
  },
  methods: {
    ...mapActions("cart", ["addProductToCart"]),
    
    calculateOriginalPrice(product) {
      return (product.product_price / (1 - product.product_discount / 100)).toFixed(2);
    },
    
    async addProduct(product) {
  const index = this.products.findIndex(p => p.product_id === product.product_id);
  if (index === -1) return; // Verifica que el producto exista en la lista.

  this.products[index].isAdding = true; // Activa el spinner para este producto.

  try {
    await this.addProductToCart(product); // Realiza la acción de agregar al carrito.
  } catch (error) {
    console.error('Error adding product to cart:', error);
  } finally {
    this.products[index].isAdding = false; // Desactiva el spinner tras completar la acción.
  }
}

  },
};
</script>

<style scoped>
/* Estilos no modificados del original */
.discount-products {
  margin-top: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ff4500;
}

.discount-products-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 20px;
  gap: 20px;
}

.product-card {
  width: 250px;
  min-width: 250px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: scale(1.05);
}

.image-container {
  position: relative;
}

.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.discount-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #ff4500;
  color: white;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: bold;
}

.product-details {
  padding: 10px;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
}

.price {
  font-size: 16px;
  color: #28a745;
  font-weight: bold;
}

.original-price {
  font-size: 14px;
  color: #777;
  text-decoration: line-through;
}

i {
  margin-left: 5px;
  cursor: pointer;
  color: black;
}

.fa-spinner {
  color: #f1a80b;
}
</style>
