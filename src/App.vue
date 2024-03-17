<template>
  <ion-app>
    <ion-menu side="start" content-id="main-content">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item @click="() => navigateTo('home')">
            <ion-label>Accueil</ion-label>
          </ion-item>

          <ion-item @click="() => navigateTo('org')">
            <ion-label>Organisations</ion-label>
          </ion-item>

          <ion-item @click="() => navigateTo('team')">
            <ion-label>Équipes</ion-label>
          </ion-item>

          <ion-item @click="() => navigateTo('hero')">
            <ion-label>Héros</ion-label>
          </ion-item>

            <template v-if="auth">
              <ion-item @click="() => navigateTo('UserAccount')">
                <ion-label>Espace Personnel</ion-label>
              </ion-item>
              <ion-item @click="logout">
                <ion-label color="danger">Déconnexion</ion-label>
              </ion-item>
            </template>

            <!-- Éléments visibles lorsque l'utilisateur n'est pas authentifié -->
            <template v-else>
              <ion-item @click="() => navigateTo('login')">
                <ion-label color="success">Authentification</ion-label>
              </ion-item>
              <ion-item @click="() => navigateTo('register')">
                <ion-label color="secondary">Inscription</ion-label>
              </ion-item>
            </template>

        </ion-list>
      </ion-content>
    </ion-menu>


    <div class="ion-page" id="main-content">
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <div class="title-container">
            <div class="title-left">
              <ion-title>Heroes & Vilains</ion-title>
            </div>

            <div class="title-right" v-if="auth">
              <ion-title>{{ getUserInfoName }}</ion-title>
            </div>
          </div>
        </ion-toolbar>
      </ion-header>

      <ion-content>

        <router-view/>

      </ion-content>
    </div>
  </ion-app>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { IonApp, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonMenu, IonList, IonItem, IonLabel, IonMenuButton, IonPage } from '@ionic/vue';
import { useSecretStore } from '@/store/secret.js';
import { storeToRefs } from 'pinia';

const router = useRouter();
const secretStore = useSecretStore();
const { auth, getUserInfoName} = storeToRefs(secretStore); // Cela permet à `auth` de rester réactif


const logout = async () => {
  await secretStore.logoutUser();
};

const navigateTo = (routeName) => {
  router.push({ name: routeName });
};
</script>

<style scoped>
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.title-left {
  flex: 1;
}

.title-right{
  color: red;
  flex: 1;

}

/* Ceci centre le titre si le nom de l'utilisateur n'est pas présent */
.title-right:empty {
  display: none;
}
</style>