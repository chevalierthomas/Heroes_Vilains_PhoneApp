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
          <ion-item button :router-link="{ name: 'org' }">
            <ion-label>Organisations</ion-label>
          </ion-item>
          <ion-item button :router-link="{ name: 'team' }">
            <ion-label>Équipes</ion-label>
          </ion-item>
          <ion-item button :router-link="{ name: 'hero' }">
            <ion-label>Héros</ion-label>
          </ion-item>
          <template v-if="auth">
            <ion-item button :router-link="{ name: 'UserAccount' }">
              <ion-label>Espace Personnel</ion-label>
            </ion-item>
            <ion-item button @click="logout">
              <ion-label color="danger">Déconnexion</ion-label>
            </ion-item>
          </template>
          <template v-else>
            <ion-item button :router-link="{ name: 'login' }">
              <ion-label color="success">Authentification</ion-label>
            </ion-item>
            <ion-item button :router-link="{ name: 'register' }">
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
          <ion-title>Heroes & Vilains</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <router-view />
      </ion-content>
    </div>
  </ion-app>
</template>

<script setup>
import { IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonMenu, IonList, IonItem, IonLabel, IonMenuButton } from '@ionic/vue';
import { useSecretStore } from '@/store/secret.js';
import { useMainStore } from '@/store/main';
import { storeToRefs } from 'pinia';

const secretStore = useSecretStore();
const mainStore = useMainStore();

const logout = async () => {
  await secretStore.logoutUser();
};

const { auth } = storeToRefs(secretStore);
</script>
