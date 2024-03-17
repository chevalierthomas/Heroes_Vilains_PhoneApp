<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Liste des Organisations</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-button @click="addOrgDialog = true">Ajouter Organisation</ion-button>
      <AddOrgDialog :dialog="addOrgDialog" @update:dialog="value => addOrgDialog = value"/>

      <ion-button color="success" @click="defineSecretDialog = true">Définir Secret</ion-button>
      <PasswordDialog :dialog="defineSecretDialog" @update:dialog="value => defineSecretDialog = value"/>

      <ion-list>
        <ion-item v-for="org in orgs" :key="org._id" @click="selectOrg(org)">
          <ion-label>
            <h2>{{ org.name }}</h2>
            <p>ID: {{ org._id }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMainStore } from '@/store/main';
import AddOrgDialog from "@/components/Orgs/AddOrgDialog.vue";
import PasswordDialog from "@/components/Orgs/PasswordDialog.vue";


import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonLabel } from '@ionic/vue';
import {storeToRefs} from "pinia";

// Utilisation du store Pinia
const mainStore = useMainStore();
const router = useRouter();

const defineSecretDialog = ref(false);
const addOrgDialog = ref(false);

// Notez l'utilisation de `storeToRefs` si vous souhaitez réagir aux changements d'état dans le store
const { orgs } = storeToRefs(mainStore);

const loadData = async () => {
  console.log(orgs.value); // Accéder à la valeur réelle
  if (orgs.value.length === 0) {
    await mainStore.getAllOrgs();
  }
};
const selectOrg = async (org) => {
  console.log(org)
  await mainStore.setCurrentOrg(org._id);
  router.push({ name: 'orgDetails' });
};

onMounted(async () => {
  await loadData();
});
</script>
