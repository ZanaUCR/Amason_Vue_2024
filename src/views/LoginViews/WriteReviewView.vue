<template>
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
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
}

.review-header {
  display: flex;
  align-items: center;
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
}
</style>