<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Liste des Héros</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item v-for="hero in heroes" :key="hero._id">
          <ion-label>
            <h2>{{ hero.publicName }}</h2>
            <p>ID: {{ hero._id }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { onMounted } from 'vue';
import { useMainStore } from '@/store/main'; // Assurez-vous que le chemin d'accès est correct
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/vue';
import {storeToRefs} from "pinia";

// Utilisez votre store Pinia
const mainStore = useMainStore();

// Utilisez storeToRefs pour rendre les propriétés du store réactives
const { heroes } = storeToRefs(mainStore);

// Fonction pour charger les données si nécessaire
const loadData = async () => {
  if (heroes.value.length === 0) {
    await mainStore.getAllHeroes(); // Assurez-vous que cette action existe dans votre store
  }
};

onMounted(async () => {
  await loadData();
});
</script>
