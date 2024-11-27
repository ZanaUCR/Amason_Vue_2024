<template>
  <div class="reviews-container">
    <!-- Sección de la barra lateral del producto -->
    <div class="product-sidebar">
      <!-- Bloque del producto -->
      <div class="product-block">
        <img :alt="productName" class="product-image" />
        <h3 class="product-name">{{ productName }}</h3>
        <p class="product-price">₡ {{ productPrice }}</p>
        <button class="cart-button">🛒</button>
      </div>

      <!-- Botón para escribir opinión -->
      <router-link :to="{ path: '/reviews-write', query: { product_id: id } }">
        <button class="opinion-button">Escribir mi opinión del producto</button>
      </router-link>

    </div>

    <!-- Lista de opiniones -->
    <div class="reviews-list">
      <!-- Menú desplegable -->
      <div class="filter-dropdown">
        <select v-model="selectedFilter">
          <option value="featured">Opiniones destacadas</option>
          <option value="recent">Más recientes</option>
        </select>
      </div>

      <!-- Lista dinámica de reseñas -->
      <div v-if="reviews.length > 0">
        <div v-for="review in filteredReviews" :key="review.id" class="review-card">
          <div class="review-header">
            <div class="user-info">
              <h5 class="user-name">{{ review.user_name }}</h5>
              <div class="rating">
                <span v-for="n in review.calification" :key="n" class="star">⭐</span>
              </div>
              <p class="review-date">{{ formatDate(review.created_at || 'Fecha no disponible') }}</p>
            </div>
          </div>
          <p class="review-text">{{ review.comment }}</p>
          <div class="review-actions">
            <button class="useful-button">Útil</button>
            <button class="report-button">Reportar</button>
          </div>
        </div>
      </div>

      <!-- Mensaje cuando no hay reseñas -->
      <div v-else>
        <p>No hay reseñas disponibles para este producto.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },

  data() {
    return {
      selectedFilter: "featured",
      reviews: [],
      product: {},
      productName: '',
      productPrice: '',
    };
  },

  computed: {
    filteredReviews() {
      return [...this.reviews].sort((a, b) =>
        this.selectedFilter === 'featured'
          ? b.calification - a.calification
          : new Date(b.created_at || 0) - new Date(a.created_at || 0)
      );
    }
  },
  methods: {
    formatDate(isoDate) {
      const date = new Date(isoDate);

      return new Intl.DateTimeFormat('es-CR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(date);
    }
  },

  async created() {
    try {
      const response = await axios.get(`http://localhost:8000/api/reviews/showReviews/${this.id}`);
      this.reviews = response.data.reviews || [];

      console.log('Reviews cargadas:', this.reviews);
    } catch (error) {
      console.error('Error al cargar las reseñas:', error);
      this.reviews = [];
    }

    this.productName = this.$route.query.name;
    this.productPrice = this.$route.query.price;
  }
};
</script>

<style scoped>
/* Los estilos se mantienen igual */
.reviews-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.product-sidebar {
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: flex-start;
  align-items: center;
}

.product-block {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transform: scale(0.8);
  width: 80%;
}

.product-image {
  transform: scale(0.8);
  width: 100%;
  height: auto;
}

.opinion-button {
  background-color: #0073e6;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: -20px;
  align-self: center;
}

.reviews-list {
  width: 65%;
}

.filter-dropdown select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
}

.review-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.review-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user-info {
  flex-grow: 1;
}

.review-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.useful-button,
.report-button {
  background-color: #f0f0f0;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.useful-button:hover,
.report-button:hover {
  background-color: #e0e0e0;
}
</style>