<template>
<div class="graph-section mt-6 ml-6" ref="graphSection">
          <h3 class="mt-5">GRAPHIQUES</h3>
         
          <!-- champs auto complete -->
          <div class="relative w-150">
            <div class="flex items-center gap-4">
            <select v-model="changeValue" @change="getValue" class="search-input px-1 py- border solid rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">select filter</option>
              <option value="action">Marché des Actions</option>
              <option value="obligation">Marché des Obligations</option>
            </select>

            <div class="relative w-200">
              <input
                type="text"
                v-model="searchTerm"
                placeholder="Rechercher..."
                @input="fetchResults"
                class="search-input px-1 py- border solid rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
              <ul v-if="results.length > 0" class="autocomplete-list absolute top-full left-0 z-10 bg-white border border-gray-300 rounded-lg shadow-lg w-full max-h-[200px] overflow-y-auto">
                <li v-for="result in results" :key="result.id" @click="selectResult(result)" class="autocomplete-item px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  {{ result.display }}
                </li>
              </ul>
             
            </div>
           
          </div>
          <p v-if="selectedCountry" class="text-center mt-3 ml-2 w-full">Pays sélectionné : {{ selectedCountry.designationTitre ||   selectedCountry.designationEmetteur }}</p>
          </div>
         
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
             <!-- ces boutons ne sont pas sur la meme ligne que les autres boutons -->
            <div class="flex items-center">
              <div class="relative ml-auto">
                <button
                  @click="showMoreOptionsDropdown = !showMoreOptionsDropdown"
                  class="more-options px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Options
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
          </div>
          <!-- <p class="chart-title">Comparaison</p> -->
          <!-- <div v-if="!isLoading && statisticsObligations && !error && statisticsObligations.length > 0"
            class="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-4 text-gray-900 pt-1">Visualisation des Données</h3>


                <apexchart
                  :key="chartKey"
                  type="line"
                  height="350"
                  :options="chartOptions"
                  :series="chartSeries"
                ></apexchart>
          </div> -->
          <apexchart
              :key="chartKey"
              type="line"
              height="350"
              :options="chartOptions"
              :series="chartSeries"
          ></apexchart>
          <!-- <div v-else-if=" !isLoading && statisticsObligations && !error && statisticsObligations.length === 0" class="mt-8 p-6 text-center text-gray-600">
            Aucune donnée disponible pour le graphique.
          </div> -->
  </div>
</template>

<script setup lang="ts">

import { getObligationFilter } from "../../services/api";
import { getActionDataFilter } from "../../services/api";
import { getActionAutoComplete, getObligationAutoComplete } from "../../services/api";
import { ref, onMounted, computed, watch, defineEmits } from "vue";


//Créer une référence pour la section du graphique
const graphSection = ref(null);
// Nouvelle référence pour le champ de recherche
const searchTerm = ref("");
const graphObligations = ref([]); // <-- Ajouté pour le graphique
const isLoading = ref(true);
const error = ref(null);

const typetable = ref();
const changeValue = ref('action');

const getValue = () => {
    typetable.value = changeValue.value;
    console.log('filter ===>  ' ,typetable.value);
}

onMounted(() => {
  getValue();
});

const results = ref<any[]>([]);
const selectedCountry = ref<any>(null);
const isFetchingSuggestions = ref(false);
let searchTimeout: ReturnType<typeof setTimeout> | null = null;

const fetchResults = () => {

  
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(async () => {
    if (!searchTerm.value.trim()) {
      results.value = [];
      return;
    }

    isFetchingSuggestions.value = true;
    try {
      let response;
      if (changeValue.value === 'action') {
        response = await getActionAutoComplete(searchTerm.value);

        
      } else if (changeValue.value === 'obligation') {
        response = await getObligationAutoComplete(searchTerm.value);
        console.log('obligation ==>  ' ,JSON.stringify(response))
      }
      
      if (response && response.data) {
            results.value = response.data.map((item: any) => ({
              id: item.id,
              original: item, // Keep the original object
              display: changeValue.value === 'action' ? item.designationEmetteur : item.designationTitre
            }));
          } else {
            results.value = [];
          }

      console.log('testete===> ' +results.value);

    } catch (err) {
      console.error("Error fetching autocomplete results:", err);
      results.value = [];
    } finally {
      isFetchingSuggestions.value = false;
    }
  }, 300); // 300ms debounce
};

const selectResult = (result: any) => {
  searchTerm.value = result.display; // Use the consistent display property
  selectedCountry.value = result.original; // Store the original object
  results.value = [];
};

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

const availableMoreOptions = computed(() => {
  return allActionFields.filter((field) => !displayedColumns.value.includes(field.key));
});

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
      isLoading.value = true;
      error.value = null;

      getValue();
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
