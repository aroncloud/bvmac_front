<script setup lang="ts">
import { defineProps } from 'vue';
import { ObligationData } from '../types/options';


// Définition des props que ce composant attend de son parent
const props = defineProps<{
  obligations: ObligationData[];
  isLoading: boolean;
  error: string | null;
}>();
</script>


<template>
  <div class=" statistics-section overflow-x-auto overflow-y-auto max-h-[400px] rounded-lg shadow-md max-w-full mx-auto mt-4">
    <div v-if="isLoading" class="p-4 text-center text-gray-600">Chargement des obligations...</div>
    <div v-else-if="error" class="p-4 text-center text-red-500">{{ error }}</div>
    <table v-else class="min-w-full divide-y divide-gray-200 bg-white">
      <thead class="bg-gray-50 sticky top-0 bg-white z-10">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">Désignation Émetteur</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">Désignation Titre</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">Code Isin</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">MNEMO</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">Date Court</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">Cours Precedent En Pourcent</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">Cours En Fcfa</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">Nominal</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">Coupon Couru</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">Volume Demande</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">Volume Offert</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">Volume Transige</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">Nombre Transactions</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">Statut</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">Ouverture</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">Clôture</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">Seuil Haut</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">Seuil Bas</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">Variation Pourcentage</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">Cours Référence Séance Suivante</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">Type Obligation</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">Catégorie</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="obligation in obligations" :key="obligation.id">
           <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
              @click="showObligationDetails(obligation.id)">
            {{ obligation.designationEmetteur ?? '' }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ obligation.designationTitre ?? '' }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ obligation.codeIsin ?? '' }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ obligation.mnemo  ?? '' }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ obligation.dateCours ?? ''}}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ obligation.coursPrecedentEnPourcent ?? '' }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ obligation.coursEnFcfa ?? '' }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ obligation.nominal ?? '' }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ obligation.couponCouru ?? '' }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ obligation.volumeDemande ?? '' }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ obligation.volumeOffert ?? '' }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ obligation.volumeTransige ?? '' }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ obligation.nombreTransactions ?? '' }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ obligation.statut ?? '' }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ obligation.ouverture ?? '' }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ obligation.cloture ?? '' }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ obligation.seuilHaut ?? '' }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ obligation.seuilBas ?? '' }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ obligation.variationPourcentage ?? '' }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ obligation.coursReferenceSeanceSuivante ?? '' }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ obligation.typeObligation ?? '' }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ obligation.categorie ?? '' }}</td>
        </tr>
        <!-- Message si aucune donnée n'est disponible -->
        <tr v-if="!obligations.length && !isLoading && !error">
          <td colspan="10" class="px-6 py-4 text-center text-sm text-gray-500">Aucune donnée d'obligation disponible.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  .statistics-section {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}
</style>



