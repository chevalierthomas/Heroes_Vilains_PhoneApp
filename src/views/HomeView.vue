<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="welcome-container">
        <ion-img
            src="https://www.pause-canap.com/media/wysiwyg/univers-spiderman.JPG"
            alt="The Wisconsin State Capitol building in Madison, WI at night"
        >
        </ion-img>

        <h1>Bienvenue dans Heroes & Vilains App</h1>
        <p>
          Vous êtes sur une plateforme unique de gestion d'organisations de héros et d'une marketplace dédiée. Que vous cherchiez à créer et gérer une équipe de héros ou à explorer notre marketplace pour découvrir des héros exceptionnels, vous êtes au bon endroit.
        </p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage } from '@ionic/vue';

export default {
  name: 'HomePage',
};
</script>

<style scoped>
.welcome-container {
  text-align: center;
  padding: 20px;
}

</style>
