<template>
  <ion-modal :is-open="show" @did-dismiss="close">
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Nouvelle Organisation</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="close">Fermer</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item>
          <ion-label position="floating">Nom</ion-label>
          <ion-input v-model="newOrg.name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Mot de passe</ion-label>
          <ion-input v-model="newOrg.secret" type="password"></ion-input>
        </ion-item>
      </ion-list>
      <ion-button expand="block" @click="createOrg">Créer</ion-button>
    </ion-content>
  </ion-modal>
</template>

<script setup>
import { ref, watch } from 'vue';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonButtons } from '@ionic/vue';
import { useMainStore } from '@/store/main';

const props = defineProps({
  dialog: Boolean
});

const emit = defineEmits(['update:dialog']); // Déclare `emit` pour envoyer des événements

const show = ref(props.dialog);
const newOrg = ref({ name: '', secret: '' });

const mainStore = useMainStore();

const close = () => {
  show.value = false;
  emit('update:dialog', false); // Utilise `emit` pour envoyer l'événement
};

const createOrg = async () => {
  if (newOrg.value.name && newOrg.value.secret) {
    await mainStore.appendOrg(newOrg.value);
    close();
    newOrg.value = { name: '', secret: '' }; // Réinitialiser le formulaire
  }
};

watch(() => props.dialog, (newVal) => {
  show.value = newVal;
});
</script>

