<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { getActionData } from "../../services/api";

  const route = useRoute();

  const isLoading = ref(true);
  const statistics = ref([]);
  const error = ref(null);

  onMounted(() => {
    // L'iframe écoute les messages de sa page parente
    loadActionData();
});

const loadActionData = async () => {
  try {
    isLoading.value = true; // Commence le chargement
    error.value = null; // Réinitialise l'erreur
    const data = await getActionData();
    statistics.value = data.data; // Assigne les données reçues à la référence statistics
  } catch (err) {
    console.error("Erreur lors de la récupération des données des actions :", err);
    error.value = "Impossible de charger les données. Veuillez réessayer plus tard."; // Définit un message d'erreur
  } finally {
    isLoading.value = false; // Termine le chargement, qu'il y ait eu succès ou erreur
  }
};
</script>


<template>
  <div class="embed-table">

    <h3 class="text-center mt-6 font-bold">Marché des Actions</h3>
    <div v-if="isLoading" class="p-4 text-center text-gray-600">Chargement des obligations...</div>
    <div v-else>
      <div class="statistics-section overflow-x-auto overflow-y-auto max-h-[400px] rounded-lg shadow-md max-w-full mx-auto mt-4">
            <table class="min-w-full divide-y divide-gray-200 bg-white">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    Designation Emetteur
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    Code ISIN
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    MNEMO
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    Nom Court
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    Cours
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    Cours Precedent
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    Date Cours
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    Volume Demande
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    Volume Offert
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    Volume Transige
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    Valeur Transige
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    Nombre Transactions
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    Statut
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    Ouverture
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    Cloture
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    Seuil Haut
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    Seuil Bas
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    Variation Pourcentage
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    Cours Reference Seance Suivante
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    Cours Depuis Janvier Haut
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    Cours Depuis Janvier Bas
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]"
                  >
                    Variation Annee Precedente
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="stat in statistics" :key="stat.id">
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 "
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
  </div>
</template>

