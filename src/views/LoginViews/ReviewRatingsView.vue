<template>
  <div class="reviews-container">
    <!-- Sección de la barra lateral del producto -->
    <div class="product-sidebar">
      <!-- Bloque del producto -->
      <div class="product-block">
        <img src="@/assets/images/laptop-image.jpg" alt="Laptop Thunderbolt 15" class="product-image" />
        <h3 class="product-name">Laptop Thunderbolt 15</h3>
        <p class="product-price">₡ 534.000,00</p>
        <button class="cart-button">🛒</button>
      </div>

      <!-- Botón para escribir opinión -->
      <router-link to="/reviews-write">
        <button class="opinion-button">Escribir mi opinión del producto</button>
      </router-link>

      <!-- Bloque de calificación general restaurado -->
      <div class="rating-block">
        <h4>Calificación general</h4>
        <div class="average-rating">
          <strong>4.1</strong>
          <div class="stars">★★★★☆</div>
        </div>
        <div class="rating-details">
          <div class="rating-row">
            <span>5 estrellas</span>
            <div class="rating-bar">
              <div class="rating-fill" style="width: 55%;"></div>
            </div>
            <span>55%</span>
          </div>
          <div class="rating-row">
            <span>4 estrellas</span>
            <div class="rating-bar">
              <div class="rating-fill" style="width: 19%;"></div>
            </div>
            <span>19%</span>
          </div>
          <div class="rating-row">
            <span>3 estrellas</span>
            <div class="rating-bar">
              <div class="rating-fill" style="width: 14%;"></div>
            </div>
            <span>14%</span>
          </div>
          <div class="rating-row">
            <span>2 estrellas</span>
            <div class="rating-bar">
              <div class="rating-fill" style="width: 5%;"></div>
            </div>
            <span>5%</span>
          </div>
          <div class="rating-row">
            <span>1 estrella</span>
            <div class="rating-bar">
              <div class="rating-fill" style="width: 8%;"></div>
            </div>
            <span>8%</span>
          </div>
        </div>
      </div>
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

      <!-- Opiniones destacadas -->
      <div v-if="selectedFilter === 'featured'">
        <div class="review-card">
          <div class="review-header">
            <img src="@/assets/images/user-avatar.jpg" alt="Avatar" class="user-avatar" />
            <div class="user-info">
              <h5 class="user-name">Rebecca D. Condoriano</h5>
              <div class="rating">★★★★☆</div>
              <p class="review-date">20 de septiembre 2024</p>
            </div>
          </div>
          <p class="review-text">
            Buscaba una pc que me hiciera todos los trabajos universitarios y esta fue la ideal...
          </p>
          <div class="review-actions">
            <button class="useful-button">Útil</button>
            <button class="report-button">Reportar</button>
          </div>
        </div>
      </div>

      <!-- Opiniones recientes -->
      <div v-if="selectedFilter === 'recent'">
        <div class="review-card">
          <div class="review-header">
            <img src="@/assets/images/user-avatar2.jpg" alt="Avatar" class="user-avatar" />
            <div class="user-info">
              <h5 class="user-name">Monkey D. Luffy</h5>
              <div class="rating">★★☆☆☆</div>
              <p class="review-date">28 de octubre 2024</p>
            </div>
          </div>
          <p class="review-text">
            Con mucha dificultad corre las aplicaciones, es demasiado lenta, creo que se equivocaron con un procesador chino del mercadito porque esta vaina apenas corre el YouTube.
          </p>
          <div class="review-actions">
            <button class="useful-button">Útil</button>
            <button class="report-button">Reportar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFilter: "featured", 
    };
  },
};
</script>

<style scoped>
/* Contenedor principal */
.reviews-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

/* Sección de la barra lateral del producto */
.product-sidebar {
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: flex-start; 
  align-items: center; 
}

/* Bloque del producto */
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

/* Calificación general */
.rating-block {
  transform: scale(0.8);
  background: #fff;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 0px;
  width: 80%;
}

/* Botón de opinión */
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

.rating-details .rating-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 5px 0;
}

.rating-bar {
  width: 70%;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.rating-fill {
  height: 100%;
  background-color: #ffd700;
}

/* Lista de opiniones */
.reviews-list {
  width: 65%;
}

/* Menú desplegable */
.filter-dropdown select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
}

/* Comentarios */
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

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

/* Espaciado entre comentarios */
.reviews-list > .review-card:first-of-type {
  margin-top: 15px;
}

/* Acción de botones */
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
