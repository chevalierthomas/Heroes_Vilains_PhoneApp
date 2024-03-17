<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Détails de l'organisation</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-card-title>{{ currentOrg.name }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>ID: {{ currentOrg._id }}</p>
          <p>Secret: {{ currentOrg.secret }}</p>
          <ion-item-divider></ion-item-divider>
          <h3>Équipes</h3>
          <AddTeamToOrg></AddTeamToOrg>

          <ion-list>
            <ion-item v-for="team in currentOrg.teams" :key="team._id">
              <ion-label>
                <h2>{{ team.name }}</h2>
              </ion-label>
              <ion-button color="primary" @click="selectTeam(team)">Sélectionner</ion-button>
              <ion-button color="danger" @click="prepareToDelete(team)">Supprimer</ion-button>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {  ref } from 'vue';
import { useMainStore } from '@/store/main';
import { useRouter } from 'vue-router';
import AddTeamToOrg from "@/components/Orgs/OrgManagment/AddTeamToOrg.vue";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItemDivider, IonList, IonItem, IonLabel, IonButton } from '@ionic/vue';
import {storeToRefs} from "pinia";

const mainStore = useMainStore();
const router = useRouter();

const { currentOrg } = storeToRefs(mainStore);

const selectedTeam = ref(null);

const selectTeam = async (team) => {
  await mainStore.setCurrentTeam(team);
  router.push({ name: 'teamDetails' });
};

const prepareToDelete = async (team) => {
  await mainStore.removeTeamToCurrentOrg(team);
  console.log(team);
};

</script>

