<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Register</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-label position="floating">Login</ion-label>
          <ion-input v-model="userData.login" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="userData.password" type="password" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Select a Hero</ion-label>
          <ion-select v-model="userData.hero" placeholder="Select one">
            <ion-select-option v-for="name in heroesName" :value="name" :key="name">{{ name }}</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
      <!-- Remplacer VueRecaptcha par une alternative compatible avec Vue 3 si nécessaire -->

      <ion-button @click="submitForm" :disabled="!formValid">Register</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useMainStore } from '@/store/main'; // Assurez-vous que le chemin est correct
import { useSecretStore } from '@/store/secret'; // Assurez-vous que le chemin est correct
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';

const mainStore = useMainStore();
const secretStore = useSecretStore();

// Computed pour transformer les héros en noms
const heroesName = computed(() => mainStore.heroes.map(hero => hero.publicName));

const userData = ref({
  login: '',
  password: '',
  hero: '',
  // captchaToken: '' // Gérez le token captcha si vous avez une solution compatible avec Vue 3
});

// Valider le formulaire (exemple simple)
const formValid = computed(() => userData.value.login && userData.value.password && userData.value.hero);

// Charger les héros s'ils ne sont pas déjà chargés
if (mainStore.heroes.length === 0) {
  mainStore.getAllHeroes();
}

const submitForm = async () => {
  if (formValid.value) {
    console.log("Submitted data:", userData.value);
    await secretStore.registerUser(userData.value);
    console.log('Registration successful');
  }
};
</script>
