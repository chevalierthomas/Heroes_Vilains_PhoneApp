<template>
  <ion-modal v-model="dialog" :is-open="dialog">
    <ion-header>
      <ion-toolbar>
        <ion-title>Modifier le héros</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeDialog">
            <ion-icon :icon="closeIcon"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-item>
        <ion-label position="stacked">Nom public</ion-label>
        <ion-input v-model="editedHero.publicName" clear-input></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Nom réel</ion-label>
        <ion-input v-model="editedHero.realName" clear-input></ion-input>
      </ion-item>

      <div v-for="(power, index) in editedHero.powers" :key="index">
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

        <ion-item>
          <ion-button @click="removePower(index)" color="danger" size="small">
            Supprimer
          </ion-button>
        </ion-item>
      </div>

      <ion-button @click="addPower">Ajouter un pouvoir</ion-button>

      <ion-button color="success" @click="updateHero">Valider</ion-button>
    </ion-content>
  </ion-modal>
</template>

<script setup>
import { ref, watch } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['heroUpdated']);
import { useMainStore } from '@/store/main';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon, IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption } from '@ionic/vue';
import { close } from 'ionicons/icons';
import {storeToRefs} from "pinia";

const mainStore = useMainStore();
const dialog = ref(false);
const closeIcon = close;
const { type_heroes } = mainStore;

const { currentHero } = storeToRefs(mainStore);

const editedHero = ref(null);

const addPower = () => {
  editedHero.value.powers.push({ name: '', type: '', level: 0 });
};

const removePower = (index) => {
  editedHero.value.powers.splice(index, 1);
};

const updatePowerType = (index, value) => {
  editedHero.value.powers[index].type = value;
};

const openDialog = () => {
  if (currentHero.value) {
    // Si un héros est actuellement sélectionné, copiez-le pour modification
    editedHero.value = JSON.parse(JSON.stringify(currentHero.value));
    dialog.value = true;
  }
};

const closeDialog = () => {
  dialog.value = false;

};

// Watcher sur currentHero pour ouvrir la fenêtre modale lorsque sa valeur change
watch(currentHero, () => {
  if (currentHero.value) {

    openDialog();
  }
});



const updateHero = async () => {
  if (editedHero.value) {
    await mainStore.updateCurrentHero(editedHero.value);
    emit('heroUpdated');
    closeDialog();
  }
};
</script>
