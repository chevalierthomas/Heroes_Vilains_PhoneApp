<template>
  <div>
    <ion-button color="primary" @click="dialog = true">Créer un nouveau héros</ion-button>

    <ion-modal v-model="dialog" :is-open="dialog">
      <ion-header>
        <ion-toolbar>
          <ion-title>Créer un héros</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="dialog = false">
              <ion-icon :icon="closeIcon"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-item>
          <ion-label position="stacked">Nom public</ion-label>
          <ion-input v-model="newHero.publicName" clear-input></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Nom réel</ion-label>
          <ion-input v-model="newHero.realName" clear-input></ion-input>
        </ion-item>

        <div v-for="(power, index) in newHero.powers" :key="index">
          <ion-item>
            <ion-label position="stacked">Nom du pouvoir</ion-label>
            <ion-input v-model="power.name" clear-input></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Niveau</ion-label>
            <ion-input v-model="power.level" clear-input></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Type</ion-label>
            <ion-select v-model="power.type" @ionChange="updatePowerType(index, $event.detail.value)">
              <ion-select-option v-for="(type, index) in type_heroes" :value="index + 1" :key="index">
                {{ type }}
              </ion-select-option>
            </ion-select>
          </ion-item>
          <!-- Niveau et bouton Supprimer -->
        </div>

        <ion-button @click="addPower">Ajouter un pouvoir</ion-button>

        <ion-button color="success" @click="createHero">Valider</ion-button>
      </ion-content>
    </ion-modal>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useMainStore } from '@/store/main';
import { IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon, IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption } from '@ionic/vue';
import { close } from 'ionicons/icons';
import {storeToRefs} from "pinia";

const mainStore = useMainStore();
const dialog = ref(false);
const newHero = ref({
  publicName: '',
  realName: '',
  powers: []
});
const closeIcon = close;

const { type_heroes } = storeToRefs(mainStore);

const addPower = () => {
  newHero.value.powers.push({ name: '', type: '', level: 0 });
};

const removePower = (index) => {
  newHero.value.powers.splice(index, 1);
};

const updatePowerType = (index, value) => {
  newHero.value.powers[index].type = value;
};
const createHero = async () => {
  // Assurez-vous que la fonction `createHeroAndAddHeroesToCurrentTeam` gère correctement l'objet `newHero`
  await mainStore.createHeroAndAddHeroesToCurrentTeam(newHero.value);
  newHero.value = { publicName: '', realName: '', powers: [] };
  dialog.value = false; // Ferme le modal
};

const levelRules = computed(() => [
  v => !v || (v >= 0 && v <= 100) || 'Le niveau doit être entre 0 et 100',
]);
</script>
