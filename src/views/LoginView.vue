<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar color="primary">
        <ion-title>Connexion Héros</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col size="12" size-md="6" size-lg="4">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Connexion</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-item>
                  <ion-label position="floating">Login</ion-label>
                  <ion-input type="text" :value="user.login" @ionChange="e => user.login = e.detail.value"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label position="floating">Mot de passe</ion-label>
                  <ion-input :type="showPassword ? 'text' : 'password'" :value="user.password" @ionChange="e => user.password = e.detail.value"></ion-input>
                  <ion-icon :icon="showPassword ? eyeOutline : eyeOffOutline" slot="end" @click="toggleShowPassword"></ion-icon>
                </ion-item>
                <ion-button expand="block" @click="loginUser">Se connecter</ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useSecretStore } from '@/store/secret'; // Ajustez le chemin selon votre structure de projet
import { useRouter } from 'vue-router';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

const secretStore = useSecretStore();
const user = ref({ login: '', password: '' });
const showPassword = ref(false);
const router = useRouter();

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const loginUser = async () => {
  console.log(user.value); // Pour déboguer
  if (user.value.login.trim() && user.value.password.trim()) {
    try {
      await secretStore.signIn(user.value);
      router.push({ name: 'home' });
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      // Traiter l'erreur
    }
  } else {
    console.error("Les champs login et mot de passe sont requis.");
    // Informer l'utilisateur
  }
};
</script>
