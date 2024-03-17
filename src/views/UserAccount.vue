<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar color="primary">
        <ion-title>Modifier le héros</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="stacked">Nom public</ion-label>
        <ion-input v-model="hero.publicName" clear-input></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Nom réel</ion-label>
        <ion-input v-model="hero.realName" clear-input></ion-input>
      </ion-item>

      <div v-for="(power, index) in hero.powers" :key="index">
        <ion-item>
          <ion-label position="stacked">Nom du pouvoir</ion-label>
          <ion-input v-model="power.name" clear-input></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Niveau</ion-label>
          <ion-input type="number" v-model="power.level" clear-input></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Type</ion-label>
          <ion-select v-model="power.type">
            <ion-select-option v-for="(type, index) in type_heroes" :value="index + 1" :key="index">
              {{ type }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-button color="danger" @click="removePower(index)">Supprimer</ion-button>
      </div>

      <ion-button @click="addPower">Ajouter un pouvoir</ion-button>
      <ion-button color="success" @click="updateHero">Valider</ion-button>
    </ion-content>
  </ion-page>
</template>


<script setup>
import { ref, watch } from 'vue';
import { useSecretStore } from '@/store/secret'; // Assurez-vous que le chemin est correct
import {useMainStore} from "@/store/main.js";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const router = useRouter();


const secretStore = useSecretStore();
const mainStore = useMainStore();
const { type_heroes } = mainStore;

const { userInfo } = storeToRefs(secretStore);

// Initialiser hero avec les données existantes de userInfo.hero ou avec une structure par défaut
const hero = ref(userInfo.value.hero || {
  publicName: '',
  realName: '',
  powers: []
});

const addPower = () => {
  hero.value.powers.push({ name: '', type: '', level: 0 });
};

const removePower = index => {
  hero.value.powers.splice(index, 1);
};

const updateHero = async () => {
  // Logique de mise à jour du héros
  // Convertir les types de pouvoir si nécessaire avant de sauvegarder
  console.log('Héros mis à jour:', hero.value);
  // Supposons que updateHero soit une action dans secretStore pour mettre à jour le héros
  await secretStore.updateAuthHero(hero.value);

  router.push({ name: 'home' });

};
</script>
