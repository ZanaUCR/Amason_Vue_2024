<template>
<<<<<<< HEAD
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
=======
  <div class="write-review-container">
    <!-- Encabezado de la reseña con imagen y nombre de usuario -->
    <div class="review-header" style="display:none">
      <img src="@/assets/images/user-avatar.jpg" alt="Avatar" class="user-image" />
      <div class="user-name">Monkey D. Luffy</div>
    </div>

    <p class="public-notice">Las reseñas son públicas e incluyen el nombre de tu cuenta.</p>

    <textarea v-model="comment" placeholder="Escribe tu opinión sobre este producto" maxlength="100" rows="3"
      class="comment-box"></textarea>
    <p class="character-limit">100 caracteres como máximo</p>

    <div class="rating-container">
      <p>Valora este producto con estrellas</p>
      <div class="star-rating">
        <span v-for="index in 5" :key="index" class="star" @click="setRating(index)">
          <i :class="index <= rating ? 'filled' : 'empty'">★</i>
        </span>
      </div>
      <div class="rating-actions">
        <a href="#" @click.prevent="submitRating">Enviar</a>
>>>>>>> 895374893a6baa8d5c195f5104724530ff2fc50e
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
<<<<<<< HEAD

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
=======
export default {
  data() {
    return {
      comment: '',
      rating: 0,
      productId: null, // Aquí se guardará el ID del producto
    };
  },
  created() {
    // Obtén el ID del producto desde los parámetros de la URL
    this.productId = this.$route.query.product_id;
  },
  methods: {
    setRating(index) {
      this.rating = index; // Actualiza la calificación cuando el usuario haga clic en una estrella
    },
    async submitRating() {
      // Verifica que el ID del producto esté disponible
      if (!this.productId) {
        alert("No se encontró el ID del producto. Inténtalo de nuevo.");
        return;
      }

      // Verifica que el usuario haya completado los campos necesarios
      if (!this.comment || this.rating === 0) {
        alert("Por favor completa la calificación y el comentario.");
        return;
      }

      try {
        // Envía los datos a la API
        await axios.post('http://localhost:8000/api/reviews/publishReview/', {
          product_id: this.productId,
          calification: this.rating,
          comment: this.comment,
        });

        // Muestra un mensaje de éxito y reinicia el formulario
        alert("¡Reseña publicada exitosamente!");
        this.comment = '';
        this.rating = 0;
      } catch (error) {
        // Manejo de errores
        console.error("Error al enviar la reseña:", error);
        alert("Ocurrió un error al enviar la reseña. Inténtalo de nuevo.");
      }
    },
  },
};

</script>

<style scoped>
.write-review-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  font-family: 'Montserrat', sans-serif;
>>>>>>> 895374893a6baa8d5c195f5104724530ff2fc50e
}

.review-header {
  display: flex;
  align-items: center;
<<<<<<< HEAD
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
=======
  gap: 10px;
  margin-bottom: 10px;
}

.user-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.user-name {
  font-weight: bold;
}

.public-notice {
  color: #555;
  margin: 0 0 10px 0;
}

.comment-box {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.character-limit {
  font-size: 12px;
  color: #888;
  margin-top: 5px;
}

.actions {
  margin-top: 10px;
  font-size: 14px;
  color: #007bff;
}

.actions a {
  color: #007bff;
  text-decoration: none;
  margin-right: 5px;
}

.rating-container {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.star-rating {
  display: flex;
  font-size: 24px;
  color: #f0c040;
  margin-top: 10px;
}

.star {
  cursor: pointer;
}

.filled {
  color: #f0c040;
}

.empty {
  color: #ccc;
}

.rating-actions {
  margin-top: 10px;
  font-size: 14px;
  color: #007bff;
}

.rating-actions a {
  color: #007bff;
  text-decoration: none;
  margin-right: 5px;
>>>>>>> 895374893a6baa8d5c195f5104724530ff2fc50e
}
</style>