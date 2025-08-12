<template>
  <footer class="app-footer">
    <div class="footer-grid">
      <div class="footer-column">
        <h4>CASI</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.</p>
      </div>
      <div class="footer-column">
        <h4>Lorem ipsum</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.</p>
      </div>
      <div class="footer-column">
        <h4>Lorem ipsum</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.</p>
      </div>
      <div class="footer-column">
        <h4>Lorem ipsum</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Pas de logique JavaScript complexe pour ce composant simple
</script>

<style scoped>
.app-footer {
  background: linear-gradient(to top, #004d99, #007bff);
  color: white;
  padding: 40px 0;
  font-size: 14px;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.2);
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  width: 90%; /* <-- RESTAURÉ */
  max-width: 1200px; /* <-- RESTAURÉ */
  margin: 0 auto; /* <-- RESTAURÉ */
  /* padding: 0 40px; <-- SUPPRIMÉ */
  /* box-sizing: border-box; <-- SUPPRIMÉ */
}

/* Base pour la responsivité future */
@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>
