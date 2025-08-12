<template>
  <main class="app-main-content">
    <div class="container">
      <div class="tabs">
        <button :class="{ active: activeTab === 'actions' }" @click="activeTab = 'actions'">
          MARCHE DES ACTIONS
        </button>
        <button :class="{ active: activeTab === 'obligations' }" @click="activeTab = 'obligations'">
          MARCHE DES OBLIGATIONS
        </button>
      </div>

      <div class="content-grid">
        <div class="overflow-x-auto rounded-lg shadow-md max-w-full mx-auto overflow-y-auto">
          <h3>DERNIERES STATISTIQUES</h3>
          <div v-if="isLoading">Chargement des statistiques...</div>
          <div v-else-if="activeTab === 'actions'">
            <div
              class="statistics-section overflow-x-auto overflow-y-auto max-h-[400px] rounded-lg shadow-md max-w-full mx-auto mt-4"
            >
              <table class="min-w-full divide-y divide-gray-200 bg-white">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                    >
                      Designation Emetteur
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                    >
                      Code ISIN
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                    >
                      MNEMO
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                    >
                      Nom Court
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                    >
                      Cours
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                    >
                      Cours Precedent
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                    >
                      Date Cours
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                    >
                      Volume Demande
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                    >
                      Volume Offert
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                    >
                      Volume Transige
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                    >
                      Valeur Transige
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                    >
                      Nombre Transactions
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                    >
                      Statut
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                    >
                      Ouverture
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                    >
                      Cloture
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                    >
                      Seuil Haut
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                    >
                      Seuil Bas
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                    >
                      Variation Pourcentage
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                    >
                      Cours Reference Seance Suivante
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                    >
                      Cours Depuis Janvier Haut
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                    >
                      Cours Depuis Janvier Bas
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                    >
                      Variation Annee Precedente
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="stat in statistics" :key="stat.id">
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                      @click="handleActionData(stat.id)"
                    >
                      {{ stat.designationEmetteur ?? "" }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ stat.codeIsin }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ stat.mnemo }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ stat.nomCourt }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ stat.cours }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ stat.coursPrecedent }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ stat.dateCours }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ stat.volumeDemande }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ stat.volumeOffert }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ stat.volumeTransige }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ stat.valeurTransige }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ stat.nombreTransactions }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ stat.statut }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ stat.ouverture }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ stat.cloture }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ stat.seuilHaut }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ stat.seuilBas }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ stat.variationPourcentage }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ stat.coursReferenceSeanceSuivante }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ stat.coursDepuisJanvierHaut }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ stat.coursDepuisJanvierBas }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ stat.variationAnneePrecedente }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-else-if="activeTab === 'obligations'">
            <marche-obligation
              :obligations="statisticsObligations"
              :is-loading="isLoading"
              :error="error"
            />
          </div>

          <hr class="section-divider" />
          <button class="copy-button" @click="copyTableIframe">Copy</button>
          <p class="last-updated">Actualisé le 21 Juillet 2025</p>
        </div>

        <div class="graph-section" ref="graphSection">
          <h3>GRAPHIQUES</h3>

          <input
            type="text"
            v-model="searchTerm"
            placeholder="Rechercher..."
            class="search-input px-1 py- border solid rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <select v-model="changeValue" @change="getValue" class=" ml-9 search-input px-1 py- border solid rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">select filter</option>
            <option value="action">Marché des Actions</option>
            <option value="obligation">Marché des Obligations</option>
          </select>
          <div
            class="graph-header flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm mb-4"
          >
            <div class="flex flex-wrap gap-2">
              <!-- Labels des champs affichés (les 4 premiers) -->
              <span
                v-for="fieldKey in displayedColumns"
                :key="fieldKey"
                :class="{
                  'bg-blue-200 text-blue-800 border-blue-500':
                    selectedFilterFields.includes(fieldKey),
                  'bg-gray-200 text-gray-700 border-gray-300':
                    !selectedFilterFields.includes(fieldKey),
                }"
                @click="toggleFilterSelection(fieldKey)"
                class="value-label px-3 py-1 rounded-full border cursor-pointer hover:bg-gray-300 transition-colors duration-200"
              >
                {{ allActionFields.find((f) => f.key === fieldKey)?.label || fieldKey }}
              </span>
            </div>

            <!-- Bouton "Plus d'options" avec menu déroulant -->
            <div class="relative">
              <button
                @click="showMoreOptionsDropdown = !showMoreOptionsDropdown"
                class="more-options px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Plus d'options
              </button>
              <div
                v-if="showMoreOptionsDropdown"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 max-h-[200px] overflow-y-auto"
              >
                <a
                  v-for="field in availableMoreOptions"
                  :key="field.key"
                  @click="toggleColumnDisplay(field.key)"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {{ field.label }}
                </a>
                <div
                  v-if="availableMoreOptions.length === 0"
                  class="px-4 py-2 text-sm text-gray-500"
                >
                  Toutes les options sont affichées.
                </div>
              </div>
            </div>
          </div>
          <!-- <p class="chart-title">Comparaison</p> -->
          <div v-if="!isLoading && statisticsObligations && !error && statisticsObligations.length > 0"
            class="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-4 text-gray-900 pt-1">Visualisation des Données</h3>


              <apexchart
                :key="chartKey"
                type="line"
                height="350"
                :options="chartOptions"
                :series="chartSeries"
              ></apexchart>
          </div>
          <div
            v-else-if="
              !isLoading && statisticsObligations && !error && statisticsObligations.length === 0
            "
            class="mt-8 p-6 text-center text-gray-600"
          >
            Aucune donnée disponible pour le graphique.
          </div>
          <!-- <div class="chart-legend">
            <div class="legend-item"><span class="color-box blue"></span> Code 1</div>
            <div class="legend-item"><span class="color-box green"></span> Code 2</div>
            <div class="legend-item"><span class="color-box orange"></span> Code 3</div>
          </div> -->
          <button class="copy-button" @click="copyGraphIframe">Copy</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { getActionData } from "../services/api";
import { getObligationData } from "../services/api";
import { ref, onMounted, computed, watch, defineEmits } from "vue";
import MarcheObligation from "./datatable/MarcheObligation.vue";
import { getObligationFilter } from "../services/api";
import { getActionDataFilter } from "../services/api";

const activeTab = ref("actions");

const statistics = ref([]);
const statisticsObligations = ref([]);
const graphObligations = ref([]); // <-- Ajouté pour le graphique
const isLoading = ref(true);
const error = ref(null);
const typetable = ref();
const changeValue = ref('action');

const getValue = () => {
    typetable.value = changeValue.value;
    console.log('filter ===>  ' ,typetable.value);
}



//Créer une référence pour la section du graphique
const graphSection = ref(null);
const tableSection = ref(null);

// Fonction pour charger les données des actions
const loadActionData = async () => {
  try {
    isLoading.value = true; // Commence le chargement
    error.value = null; // Réinitialise l'erreur
    const data = await getActionData();
    const dataObligations = await getObligationData(); // Récupère les données des obligations
    statisticsObligations.value = dataObligations.data;
    statistics.value = data.data; // Assigne les données reçues à la référence statistics
  } catch (err) {
    console.error("Erreur lors de la récupération des données des actions :", err);
    error.value = "Impossible de charger les données. Veuillez réessayer plus tard."; // Définit un message d'erreur
  } finally {
    isLoading.value = false; // Termine le chargement, qu'il y ait eu succès ou erreur
  }
};

// Appelle loadActionData lorsque le composant est monté
onMounted(() => {
  loadActionData();
  getValue();
});

const handleActionData = (id: number) => {
  // Logique pour gérer les données d'action, par exemple, naviguer vers une page de détails
  console.log(`Action ID: ${id}`);
  // Vous pouvez utiliser Vue Router pour naviguer vers une page de détails si nécessaire
};

// Fonction pour copier l'iframe
const copyGraphIframe = async () => {
  const width = graphSection.value ? graphSection.value.offsetWidth : 800;
  const height = graphSection.value ? graphSection.value.offsetHeight : 600;

  // L'URL de base de votre application déployée.
  // Utilisez window.location.origin pour obtenir le protocole + domaine + port actuel
  const baseUrl = window.location.origin;

   // Prepare data to send
   const graphData = {
    series: chartSeries.value,
    options: chartOptions.value,
    selectedFields: selectedFilterFields.value,
    obligations: graphObligations.value
  };

   // Encode data as base64 to avoid URL length limitations
   const encodedData = btoa(JSON.stringify(graphData));
  const graphEmbedUrl = `${baseUrl}/embed/graphique?data=${encodedData}`;

  // L'URL de la page qui affichera seulement le graphique

  const iframeCode = `
    <iframe
      src="${graphEmbedUrl}"
      width="${width}px"
      height="${height}px"
      frameborder="0"
      allowfullscreen
      loading="lazy"
      title="Graphique CASI">
    </iframe>`;

  try {
    await navigator.clipboard.writeText(iframeCode);
    alert("Le code de l'iframe du graphique a été copié dans le presse-papiers !");
  } catch (err) {
    console.error("Erreur lors de la copie de l'iframe : ", err);
    alert(
      "Échec de la copie du code de l'iframe. Veuillez réessayer ou copier manuellement à partir de la console."
    );
  }
};

//iframe pour la table des graphiques
// Nouvelle fonction pour copier l'iframe du tableau
const copyTableIframe = async () => {
  const width = tableSection.value ? tableSection.value.offsetWidth : 800;
  const height = tableSection.value ? tableSection.value.offsetHeight : 600;

  const tableData = {
    // Vos données à envoyer
    data: activeTab.value === 'actions' ? statistics.value : statisticsObligations.value,
    activeTab: activeTab.value
  };

  let tableEmbedUrl = '';
  if(activeTab.value == 'actions'){
    tableEmbedUrl = `${window.location.origin}/embed/tableau`;
  }else{
    tableEmbedUrl = `${window.location.origin}/embed/tableauObligation`
  }

  // On peut créer l'iframe sans l'ajouter au DOM, juste pour obtenir son code HTML
  const tempIframe = document.createElement('iframe');
  tempIframe.src = tableEmbedUrl;
  tempIframe.width = width;
  tempIframe.height = height;
  tempIframe.frameBorder = "0";
  tempIframe.allowFullscreen = true;
  tempIframe.title = "Tableau Statistiques CASI";

  const iframeCode = tempIframe.outerHTML;

  try {
    navigator.clipboard.writeText(iframeCode);
    alert("Le code de l'iframe a été copié dans le presse-papiers !");

  } catch (err) {
    console.error("Erreur lors de la copie de l'iframe du tableau : ", err);
    alert("Échec de la copie du code de l'iframe du tableau. Veuillez réessayer.");
  }
};

// Nouvelle référence pour le champ de recherche
const searchTerm = ref("");
const definiveTerm = "";
let searchTimeout: ReturnType<typeof setTimeout> | null = null; // Pour le débouncing
watch(searchTerm, (newSearchTerm) => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    // Appelle loadObligationData avec les filtres actuels et le nouveau terme de recherche
    // loadObligationData(selectedFilterFields.value, newSearchTerm);
  }, 500); // Débouncing de 500ms
});

// Tous les champs disponibles pour les actions (clés et labels d'affichage)
const allActionFields = [
 // --- Champs de Volume et Valeur ---
  { key: "volume_demande", label: "Volume demandé", accessKey: "volumeDemande" },
  { key: "volume_offert", label: "Volume Offert", accessKey: "volumeOffert" },
  { key: "volume_transige", label: "Volume Transigé", accessKey: "volumeTransige" },
  { key: "valeur_transige", label: "Valeur Transigée", accessKey: "valeurTransige" },
  { key: "nombre_transactions", label: "Nombre de Transactions", accessKey: "nombreTransactions" }, // Key uniforme

  // --- Champs de Cours et Statut ---
  { key: "ouverture", label: "Ouverture", accessKey: "ouverture" },
  { key: "cloture", label: "Clôture", accessKey: "cloture" }, // Uniformisé
  { key: "seuil_haut", label: "Seuil Haut", accessKey: "seuilHaut" }, // Clé plus descriptive
  { key: "seuil_bas", label: "Seuil Bas", accessKey: "seuilBas" }, // Clé plus descriptive
  { key: "variation_pourcentage", label: "Variation en %", accessKey: "variationPourcentage" }, // Key uniforme
  { key: "cours_precedent_pourcent", label: "Cours Précédent Pourcent", accessKey: "coursPrecedentPourcent" }, // Nom plus spécifique
  { key: "cours_precedent", label: "Cours Précédent", accessKey: "coursPrecedent" }, // Nom plus spécifique
  { key: "cours_en_fcfa", label: "Cours En Fcfa", accessKey: "coursEnFcfa" }, // Clé plus spécifique
  { key: "nominal", label: "Nominal", accessKey: "nominal" },
  { key: "coupon_couru", label: "Coupon Couru", accessKey: "couponCouru" }, // Clé plus spécifique
  { key: "cours", label: "Cours", accessKey: "cours" }, // Clé plus spécifique

  // --- Champs spécifiques aux Obligations / Autres titres ---
  { key: "taux_facial", label: "Taux Facial", accessKey: "tauxFacial" },
  { key: "montant_leve", label: "Montant Levé", accessKey: "montantLeve" },
  { key: "nombre_titres_cotes", label: "Nombre Titres Côtés", accessKey: "nombreTitresCotes" },
  { key: "amortissement", label: "Amortissement", accessKey: "amortissement" },
  { key: "encours_calcule_ce_jour", label: "Encours Calculé Ce Jour", accessKey: "encoursCalculeCeJour" },
  { key: "rendement_net", label: "Rendement Net", accessKey: "rendementNet" },
  { key: "rendement_brut", label: "Rendement Brut", accessKey: "rendementBrut" },
  { key: "taux_rotation_liquidite", label: "Taux Rotation Liquidite", accessKey: "tauxRotationLiquidite" },
  { key: "cours_reference_seance_suivante", label: "Cours Ref Seance Suivant", accessKey: "coursReferenceSeanceSuivante" },
  { key: "variation_annee_precedente", label: "Variation année Prec", accessKey: "variationAnneePrecedente" },
  { key: "cours_depuis_janvier_bas", label: "Cours depuis Janvier B", accessKey: "coursDepuisJanvierBas" },
  { key: "cours_depuis_janvier_haut", label: "Cours depuis Janvier H", accessKey: "coursDepuisJanvierHaut" },

  // Ajoutez ici tous les autres champs de votre ActionData
];

// Les 4 premières colonnes affichées par défaut dans l'en-tête et le tableau
const displayedColumns = ref(allActionFields.slice(0, 4).map((field) => field.key));

// Champs actuellement sélectionnés comme filtres (initialement vide)
const selectedFilterFields = ref<string[]>([]);

// Visibilité du menu déroulant "Plus d'options"
const showMoreOptionsDropdown = ref(false);

// Propriété calculée pour les champs disponibles dans "Plus d'options"
// Ce sont les champs qui ne sont PAS actuellement dans displayedColumns
const availableMoreOptions = computed(() => {
  return allActionFields.filter((field) => !displayedColumns.value.includes(field.key));
});

/**
 * Bascule l'affichage d'une colonne dans l'en-tête et le tableau.
 * Si la colonne est déjà affichée, elle est retirée.
 * Si moins de 4 colonnes sont affichées, la nouvelle colonne est ajoutée.
 * Si 4 colonnes sont déjà affichées, la nouvelle colonne remplace la première colonne affichée.
 * @param fieldKey La clé du champ à basculer.
 */
const toggleColumnDisplay = (fieldKey: string) => {
  const index = displayedColumns.value.indexOf(fieldKey);
  if (index > -1) {
    // Si la colonne est déjà affichée, la retirer
    displayedColumns.value.splice(index, 1);
  } else {
    // Si la colonne n'est pas affichée
    if (displayedColumns.value.length < 4) {
      // Si moins de 4 colonnes sont affichées, l'ajouter
      displayedColumns.value.push(fieldKey);
    } else {
      const placeToReplace = Math.floor(Math.random() * 4);
      // Si 4 colonnes sont déjà affichées, remplacer la colonne à l'index choisi par la nouvelle
      displayedColumns.value.splice(placeToReplace, 1, fieldKey);
    }
  }
  // Ferme le dropdown après sélection
  showMoreOptionsDropdown.value = false;
};

/**
 * Bascule la sélection d'un champ comme filtre.
 * Désormais, un seul champ peut être sélectionné à la fois.
 * Si on clique à nouveau sur le même champ, on le désélectionne.
 * @param fieldKey La clé du champ à filtrer.
 */
 const toggleFilterSelection = async (fieldKey: string) => {
    if (selectedFilterFields.value[0] === fieldKey) {
      // Si déjà sélectionné, on désélectionne
      selectedFilterFields.value = [];
      graphObligations.value = [];
      return;
    } else {
      // Sinon, on sélectionne uniquement ce champ
      selectedFilterFields.value = [fieldKey];
    }

    // Déclencher l'appel API si un champ est sélectionné
    if (selectedFilterFields.value.length === 1) {
      getValue();

       console.log('filter ===>1  ' ,typetable.value);
      isLoading.value = true;
      error.value = null;

      if(typetable.value == 'action'){
        const response = await getActionDataFilter(selectedFilterFields.value, searchTerm.value);
        graphObligations.value = response.data;
      }else{
        const response = await getObligationFilter(selectedFilterFields.value, searchTerm.value);
        graphObligations.value = response.data;
      }

      isLoading.value = false;
    } else {
      // Aucun champ sélectionné, on peut vider les données si besoin
      // graphObligations.value = [];
    }
  };

const chartSeries = ref<any[]>([]);
const chartOptions = ref<any>({
  chart: {
    id: "obligation-chart",
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: false,
        zoom: true,
        pan: true,
        reset: true,
        customIcons: [],
      },
      autoSelected: "zoom",
    },
  },
  xaxis: {
    categories: [], // Les années fixes iront ici
    title: {
      text: "Année",
    },
    type: "category",
    labels: {
      rotate: -45,
      formatter: function (val: string) {
        return val;
      },
    },
  },
  tooltip: {
    enabled: true,
    shared: true,
    intersect: false,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  markers: {
    size: 5,
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"],
      opacity: 0.5,
    },
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    floating: true,
    offsetY: -25,
    offsetX: -5,
  },
});

// Années fixes pour l'axe X

// Récupérez les dates d'entrée et extrayez les années uniques pour l'axe X.
const prepareChartData = computed(() => {
  const series = [];
  const categories = [];

  // 1. Collectez toutes les dates uniques et triez-les.
  const allDates = new Set();
  graphObligations.value.forEach((ob) => {
    const dateStr = ob.dateCours || ob.date_cours;
    if (dateStr) {
      allDates.add(dateStr);
    }
  });

  const sortedDates = Array.from(allDates).sort((a, b) => {
    const [d1, m1, y1] = a.split('/').map(Number);
    const [d2, m2, y2] = b.split('/').map(Number);
    return new Date(y1, m1 - 1, d1).getTime() - new Date(y2, m2 - 1, d2).getTime();
  });

  // Utilisez les dates complètes comme catégories
  categories.push(...sortedDates);

  // 2. Parcourez les filtres sélectionnés
  selectedFilterFields.value.forEach((element) => {
    const found = allActionFields.find(action => action.key === element);
    const seriesName = found?.label ?? "";
    const seriesData = Array(categories.length).fill(null);

    // 3. Remplissez les données pour chaque date
    graphObligations.value.forEach((ob) => {
      const dateStr = ob.dateCours || ob.date_cours;
      if (dateStr) {
        const rawValue = ob[found?.accessKey ?? element];

        if (!rawValue) return;

        const value = !isNaN(parseFloat(String(rawValue).replace(",", ".")))
          ? parseFloat(String(rawValue).replace(",", "."))
          : null;

        const dateIndex = categories.indexOf(dateStr);
        if (dateIndex !== -1) {
          seriesData[dateIndex] = value;
        }
      }
    });

    // 4. Ajoutez la série à la liste
    series.push({
      name: seriesName,
      data: seriesData
    });
  });

  return { series, categories };
});

const chartKey = ref(0);

// Dans votre watcher existant
watch(
  prepareChartData,
  (newChartData) => {
    console.log('chardata==> ', JSON.stringify(newChartData));

    // Get the selected field label for y-axis title
    const selectedField = allActionFields.find(field => field.key === selectedFilterFields.value[0]);
    const yAxisTitle = selectedField ? selectedField.label : '';

    // Créez de nouveaux objets pour forcer la mise à jour
    chartSeries.value = JSON.parse(JSON.stringify(newChartData.series));
    chartOptions.value = {
      ...JSON.parse(JSON.stringify(chartOptions.value)),
      xaxis: {
        ...JSON.parse(JSON.stringify(chartOptions.value.xaxis)),
        categories: newChartData.categories,
      }
    };

    // Incrémentez la clé pour forcer le re-rendu
    chartKey.value++;
  },
  { immediate: true }
);

</script>

<style scoped>
.app-main-content {
  background-image: url("../assets/main_background.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;

  padding: 40px 0;
  min-height: 600px;
  margin-left: 200px;
  margin-right: 200px;
}

.container {
  width: 100%; /* Prend 100% de la largeur du parent */
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 30px 40px; /* Padding sur les côtés */
  box-sizing: border-box; /* Inclure le padding dans la largeur */
}

/* Le reste du CSS du main content reste inchangé */
.tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.tabs button {
  background-color: transparent;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #666;
  cursor: pointer;
  outline: none;
  position: relative;
  top: 1px;
  transition: color 0.3s ease;
}

.tabs button.active {
  color: #007bff;
  border-bottom: 3px solid #007bff;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 30px;
  padding-top: 20px;
}

.statistics-section,
.graph-section {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
}

.table-wrapper {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

table th,
table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

table th {
  background-color: #f8f8f8;
  color: #555;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 10;
}

table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

table tbody tr:hover {
  background-color: #f2f2f2;
}

.section-divider {
  border: 0;
  height: 1px;
  background-color: #ddd;
  margin: 25px 0;
}

.last-updated {
  font-size: 13px;
  color: #777;
  text-align: right;
}

/* Graph Section Specifics */
.graph-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.value-label {
  font-size: 13px;
  color: #666;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.more-options {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  color: #555;
  transition: background-color 0.2s;
}

.more-options:hover {
  background-color: #e0e0e0;
}

.chart-title {
  font-size: 14px;
  color: #555;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 500;
}

.chart-area {
  position: relative;
  height: 250px;
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding-bottom: 10px;
  padding-left: 40px;
  margin-bottom: 20px;
}

.chart-y-axis {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding-right: 10px;
  font-size: 12px;
  color: #777;
}
.chart-y-axis span:first-child {
  margin-top: -8px;
}
.chart-y-axis span:last-child {
  margin-bottom: -8px;
}

.chart-bars {
  display: flex;
  gap: 15px;
  height: 100%;
  align-items: flex-end;
  width: 100%;
  justify-content: space-around;
}

.bar-set {
  display: flex;
  gap: 5px;
  height: 100%;
  align-items: flex-end;
}

.bar {
  width: 15px;
  background-color: #007bff;
  border-radius: 3px 3px 0 0;
  transition: height 0.3s ease;
}

.bar-blue {
  background-color: #4a90e2;
}
.bar-green {
  background-color: #7ed321;
}
.bar-orange {
  background-color: #f5a623;
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 15px;
  font-size: 14px;
  color: #555;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-box {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.color-box.blue {
  background-color: #4a90e2;
}
.color-box.green {
  background-color: #7ed321;
}
.color-box.orange {
  background-color: #f5a623;
}

.copy-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: block;
  margin: 20px auto 0;
  transition: background-color 0.3s ease;
}

.copy-button:hover {
  background-color: #0056b3;
}
</style>
