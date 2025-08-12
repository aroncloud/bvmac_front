<template>
  <header class="app-header">
    <div class="header-overlay"></div>
    <div class="header-top-deco left"></div>
    <div class="header-top-deco right"></div>

    <div class="header-content">
      <div class="logo">CASI</div>

      <div class="header-right-section">
        <nav class="main-nav">
          <ul>
            <li><a href="#">Nos Services</a></li>
            <li><a href="#">Produits</a></li>
            <li><a href="#">Marchés</a></li>
            <li><a href="#">Carrière</a></li>
            <li><a href="#">Accademie</a></li>
            <li><a href="#">À propos de nous</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
 <div class="yellow-full-width-bar">
      <div class="yellow-bar-content">
          <marquee behavior="scroll" direction="left" scrollamount="5">
              <span>** 300 FCFA (0,00 %) **</span>
              <span>** ACTIONS SCG-Ré : 21 000 FCFA (0 %) **</span>
              <span>** ECMR.10 23/31 : 100 % (0,000 %) **</span>
              <span>** EOG.06 21-26 : 99.50 % (0,000 %) **</span>
              <span>** AUTRE INFO IMPORTANTE DE DÉFILEMENT **</span>
          </marquee>
      </div>
  </div>
</template>

<script setup>
// Pas de logique JavaScript complexe pour ce composant simple
</script>

<style scoped>
.app-header {
  background-image: url('../assets/header_background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  color: white;
  padding: 20px 0;
  position: relative;
  overflow: hidden;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.header-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 123, 255, 0.8), rgba(0, 86, 179, 0.8));
  z-index: 0;
}

.header-top-deco {
  position: absolute;
  top: 0;
  width: 150px;
  height: 150px;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 1;
}

.header-top-deco.left {
  left: 0;
  margin-left: 1px;
  float: left;
  margin-top: 2px;
  background-image: url('../assets/coins_left.svg');
}

.header-top-deco.right {
  right: 0;
  background-image: url('../assets/coins_right.svg');
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  flex-grow: 1;
  padding: 0 40px;
  box-sizing: border-box;
}

.logo {
  font-size: 100px;
  font-weight: bold;
  letter-spacing: 2px;
  margin-left: 150px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.header-right-section {
    display: flex;
    margin-top: -9px;
    margin-right: 10%;
    flex-direction: column;
    align-items: flex-end;
    flex-grow: 1;
}

.yellow-full-width-bar {
    width: 100%;
    background-color: #ffc107;
    color: #333;
    padding: 10px 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 10;
    position: relative;
}

.yellow-bar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; /* <-- CHANGEMENT: Prend 100% de la largeur du parent */
    /* max-width: 1200px; <-- SUPPRIMÉ */
    margin: 0 auto;
    font-size: 14px;
    padding: 0 40px; /* <-- AJOUT: Padding sur les côtés */
    box-sizing: border-box; /* Inclure le padding dans la largeur */
}

.yellow-bar-left span, .yellow-bar-right span {
    margin-right: 20px;
    cursor: pointer;
    transition: color 0.2s ease;
    font-weight: bold;
}

.yellow-bar-left span:last-child, .yellow-bar-right span:last-child {
    margin-right: 0;
}

.yellow-bar-left span:hover, .yellow-bar-right span:hover {
    color: #007bff;
}

.main-nav {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.main-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 25px;
}

.main-nav a {
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 5px 0;
  transition: color 0.3s ease, border-bottom 0.3s ease;
}

.main-nav a:hover {
  color: #cceeff;
  border-bottom: 2px solid #cceeff;
}
</style>
