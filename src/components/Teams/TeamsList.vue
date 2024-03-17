<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Liste des Équipes</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-button color="primary" @click="addTeamDialog = true">Ajouter Équipe</ion-button>
      <AddTeamDialog :dialog="addTeamDialog" @update:dialog="addTeamDialog = $event"></AddTeamDialog>

      <ion-list>
        <ion-item v-for="team in teams" :key="team._id" @click="selectTeam(team)">
          <ion-label>{{ team.name }}</ion-label>
          <ion-badge slot="end">{{ team.nbAffiliations }}</ion-badge>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMainStore } from '@/store/main';
import AddTeamDialog from "@/components/Teams/AddTeamDialog.vue";
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();
const addTeamDialog = ref(false);

const { teams } = storeToRefs(mainStore);

onMounted(async () => {
  if (teams.value.length === 0) {
    await mainStore.getAllTeams();
  }
});

const selectTeam = (team) => {
  // Logique de sélection d'une équipe, par exemple pour afficher ses détails
  console.log(team);
};
</script>
