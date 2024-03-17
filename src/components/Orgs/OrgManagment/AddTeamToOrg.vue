  <template>
    <ion-list>
      <ion-item>
        <ion-select
            aria-label="Ajouter des équipes"
            placeholder="Sélectionnez toutes les équipes que vous voulez ajouter"
            v-model="selectedTeams"
        >
          <ion-select-option
              v-for="team in filteredTeams"
              :value="team._id"
              :key="team._id"
          >
            {{ team.name }}
          </ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>
    <!-- Bouton Valider pour confirmer la sélection -->
    <ion-button @click="addTeamsToOrg">
      Valider
    </ion-button>
  </template>

  <script setup>
  import { IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/vue';
  import { ref, computed, onMounted, reactive } from 'vue';
  import { useMainStore } from '@/store/main';
  import { storeToRefs } from 'pinia';

  const mainStore = useMainStore();
  const { teams, currentOrg } = storeToRefs(mainStore);
  const selectedTeams = ref([]);

  const forceUpdateKey = ref(0);

  const filteredTeams = computed(() => {
    // Utiliser forceUpdateKey dans la computed property
    console.log(forceUpdateKey.value); // Juste pour forcer l'accès et la réactivité

    return teams.value.filter(
        team => !currentOrg.value.teams.includes(team._id)
    );
  });

  onMounted(async () => {
    if (!teams.value.length) {
      await mainStore.getAllTeams();
    }
  });

  const resetSelection = () => {
    selectedTeams.value = [];
  };

  const addTeamsToOrg = async () => {
    console.log("Vue (selectedTeams.value):", selectedTeams.value);
    await mainStore.addTeamToCurrentOrg(selectedTeams.value);
    resetSelection();

    forceUpdateKey.value++;

  };

  </script>
