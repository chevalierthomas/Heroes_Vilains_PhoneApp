<template>
  <ion-modal :is-open="show" @did-dismiss="close">
    <ion-header>
      <ion-toolbar>
        <ion-title>Nouvelle Équipe</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="close">Fermer</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="stacked">Nom de l'équipe</ion-label>
        <ion-input v-model="newTeam.name" type="text"></ion-input>
      </ion-item>
      <ion-row>
        <ion-col>
          <ion-button expand="block" color="medium" @click="close">Annuler</ion-button>
        </ion-col>
        <ion-col>
          <ion-button expand="block" @click="createTeam">Créer</ion-button>
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-modal>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem, IonLabel, IonInput, IonRow, IonCol } from '@ionic/vue';
import { useMainStore } from '@/store/main';
import { close as closeIcon } from 'ionicons/icons'; // Renommez l'importation de l'icône


const props = defineProps({
  dialog: Boolean
});

const emit = defineEmits(['update:dialog']);
const show = ref(props.dialog);
const newTeam = ref({ name: '' });
const mainStore = useMainStore();

watch(() => props.dialog, (newVal) => {
  show.value = newVal;
});

const closeDialog = () => { // Renommez la fonction close pour éviter le conflit
  emit('update:dialog', false);
};

const createTeam = async () => {
  if (newTeam.value.name) {
    await mainStore.appendTeam(newTeam.value);
    closeDialog(); // Utilisez le nouveau nom de fonction
    newTeam.value = { name: '' };
  }
};
</script>
