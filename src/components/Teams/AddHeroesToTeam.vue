<template>
  <div>
    <ion-button color="primary" v-if="!isAddingHeroes" @click="isAddingHeroes = true">
      Recruter de nouveaux héros
    </ion-button>

    <div v-if="isAddingHeroes">
      <ion-item>
        <ion-label>Sélectionnez des héros à ajouter</ion-label>
        <ion-select v-model="selectedHeroes" multiple="true" @ionChange="enableAddButton">
          <ion-select-option v-for="hero in filteredHeroes" :value="hero._id" :key="hero._id">
            {{ hero.publicName }}
          </ion-select-option>
        </ion-select>
      </ion-item>

      <ion-button :disabled="!isAddButtonActive" color="success" @click="addHeroesToTeam">
        <ion-icon slot="start" name="checkmark"></ion-icon>
        Valider
      </ion-button>

      <ion-button color="danger" @click="resetSelection">
        <ion-icon slot="start" name="close"></ion-icon>
        Annuler
      </ion-button>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue';
import { useMainStore } from '@/store/main';
import { IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonIcon } from '@ionic/vue';
import {storeToRefs} from "pinia";

const mainStore = useMainStore();
const { heroes, currentTeam } = storeToRefs(mainStore);

const selectedHeroes = ref([]);
const isAddButtonActive = ref(false);
const isAddingHeroes = ref(false);

const filteredHeroes = computed(() => {
  if (!heroes.value.length) {
    mainStore.getAllHeroes(); // Charge les héros si 'heroes' est vide
  }
  // Filtre les héros qui ne sont pas déjà dans l'équipe courante
  return heroes.value.filter(hero => !currentTeam.value.members.includes(hero._id));
});

const enableAddButton = () => {
  isAddButtonActive.value = selectedHeroes.value.length > 0;
};

const addHeroesToTeam = async () => {
  if (selectedHeroes.value.length) {
    const heroIds = selectedHeroes.value;

    await mainStore.addHeroesToCurrentTeam(heroIds);

    resetSelection();
  }
};

const resetSelection = () => {
  selectedHeroes.value = [];
  isAddButtonActive.value = false;
  isAddingHeroes.value = false; // Réinitialise également l'état d'ajout de héros
};
</script>
