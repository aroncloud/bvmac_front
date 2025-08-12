<template>
  <div id="app">
    <AppHeader v-if="!['/embed/graphique', '/embed/tableau', '/embed/tableauObligation'].includes($route.path)" />

    <router-view />

    <AppFooter v-if="!['/embed/graphique', '/embed/tableau', '/embed/tableauObligation'].includes($route.path)" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'; // Importer useRoute
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

const route = useRoute(); // Obtenir l'objet route
</script>

<style>
/* Styles globaux pour l'application */
html, body {
  width: 100%;
  overflow-x: hidden;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw; /* S'assure que l'application prend toute la largeur */
}
</style>
