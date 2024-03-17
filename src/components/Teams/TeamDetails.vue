<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Détails de l'équipe</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-card-title>{{ currentTeam.name }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>ID: {{ currentTeam._id }}</p>
          <ion-item-divider></ion-item-divider>
          <h3>Héros</h3>

          <!-- Appel au composant AddHeroesToTeam -->
          <AddHeroesToTeam />

          <!-- Appel au composant CreateHeroToTeam -->
          <CreateHeroToTeam />

          <EditHeroesToTeam  @hero-updated="loadTeamMembers"  ref="editHeroDialog" > </EditHeroesToTeam>

          <ion-list>
            <ion-item v-for="hero in teamMembersDetails" :key="hero._id" lines="full">
              <ion-label>
                <h2>{{ hero.publicName }}</h2>
                <p>Prénom réel: {{ hero.realName }}</p>
              </ion-label>
              <ion-button slot="end" fill="outline" @click="openEditDialog(hero)">Modifier</ion-button>
              <ion-button color="danger" @click="prepareToDelete(hero)">Supprimer</ion-button>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useMainStore } from '@/store/main';
import { useSecretStore } from '@/store/secret';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItemDivider, IonList, IonItem, IonLabel, IonButton } from '@ionic/vue';
import AddHeroesToTeam from "@/components/Teams/AddHeroesToTeam.vue";
import CreateHeroToTeam from "@/components/Teams/CreateHeroToTeam.vue";
import { getHeroById } from "@/services/hero.services";
import { storeToRefs } from "pinia";
import EditHeroesToTeam from "@/components/Teams/EditHeroesToTeam.vue";

const mainStore = useMainStore();
const secretStore = useSecretStore();
const { currentTeam } = storeToRefs(mainStore);
const teamMembersDetails = ref([]);

const loadTeamMembers = async () => {
  teamMembersDetails.value = [];
  if (currentTeam.value.members && currentTeam.value.members.length > 0) {
    for (const memberId of currentTeam.value.members) {
      try {
        const heroDetails = await getHeroById(memberId, secretStore.passwordOrg);
        teamMembersDetails.value.push(heroDetails.data[0]);
      } catch (error) {
        console.error(`Erreur lors du chargement du héros ${memberId}:`, error);
      }
    }
  }
};

onMounted(loadTeamMembers);

watch(currentTeam, loadTeamMembers, { deep: true });



const openEditDialog = async (hero) => {
  await mainStore.setCurrentHero(hero)
};

const prepareToDelete = async (hero) => {
  await mainStore.removeHeroesFromCurrentTeam([hero._id]);
  this.$refs.editHeroDialog.openDialog(); // Ouvrez le dialogue d'édition

};
</script>
