<template>
  <ion-modal :is-open="show" @did-dismiss="close">
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Définir le mot de passe de l'organisation</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="close">Fermer</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item>
          <ion-label position="floating">Nouveau mot de passe</ion-label>
          <ion-input v-model="newPassword" type="password"></ion-input>
        </ion-item>
      </ion-list>
      <ion-button expand="block" @click="definePassword">Définir</ion-button>
    </ion-content>
  </ion-modal>
</template>

<script setup>
import { ref, watch } from 'vue';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonButtons } from '@ionic/vue';
import { useSecretStore } from '@/store/secret';

const props = defineProps({
  dialog: Boolean
});

const emit = defineEmits(['update:dialog']);
const show = ref(props.dialog);
const newPassword = ref('');

const secretStore = useSecretStore();

const close = () => {
  show.value = false;
  emit('update:dialog', false);
};

const definePassword = async () => {
  if (newPassword.value.trim()) {
    await secretStore.setPasswordOrg(newPassword.value.trim());
    close();
    newPassword.value = ''; // Réinitialiser le mot de passe
  } else {
    alert("Le mot de passe ne peut pas être vide."); // Afficher une alerte pour le moment
  }
};

watch(() => props.dialog, (newVal) => {
  show.value = newVal;
});
</script>
