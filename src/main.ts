import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createRouter, createWebHistory } from 'vue-router';

import GraphEmbed from './components/GraphEmbeded/GraphEmbed.vue';
import TableEmbed from './components/graphEmbeded/TableEmbedAction.vue';
import TableEmbedObligation from './components/graphEmbeded/TableEmbedObligation.vue';
import AppMainContent from './components/AppMainContent.vue'; // Si AppMainContent est maintenant une route
import VueApexCharts from 'vue3-apexcharts';

const routes = [
  {
    path: '/',
    component: AppMainContent,
  },
  {
    path: '/embed/graphique',
    component: GraphEmbed,
  },
  {
    path: '/embed/tableau', // Route dédiée uniquement au tableau pour l'iframe
    name: 'table-embed',
    component: TableEmbed,
  },
  {
    path: '/embed/tableauObligation',
    name: 'table-embed-obligation',
    component: TableEmbedObligation
  }
  // Si vous avez d'autres pages, définissez-les ici
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App); // Montez App.vue comme composant racine
app.use(router);
app.use(VueApexCharts);
app.mount('#app');
