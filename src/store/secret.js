import { defineStore } from 'pinia';
import { getUserInfo, registerUser, signIn, updateHeroWithAuth } from "@/services/auth.services";

export const useSecretStore = defineStore('secret', {
    state: () => ({
        passwordOrg: "baba",
        auth: false,
        jwtToken: null,
        xsrfToken: null,
        refreshToken: null,
        userInfo: null,
    }),
    getters: {
        getUserInfoName: (state) => state.userInfo?.login,
        getUserInfoHero: (state) => state.userInfo?.hero,
    },
    actions: {
        async setPasswordOrg(password) {
            this.passwordOrg = password;
        },

        async signIn(userData) {
            try {
                console.log('store', userData);
                const response = await signIn(userData);

                if (response.error === 0) {
                    this.jwtToken = response.data.jwtToken;
                    this.xsrfToken = response.data.xsrfToken;
                    this.refreshToken = response.data.refreshToken;
                    const responseUser = await getUserInfo(userData.login);

                    if (responseUser.error === 0) {
                        this.userInfo = responseUser.data;
                        this.auth = true;
                    } else {
                        console.error('Erreur lors de la récupération des informations utilisateur:', responseUser.data.data);
                    }
                } else {
                    // Utilisez ici votre gestion d'erreur, par exemple en définissant un autre store pour les erreurs.
                    console.error('Erreur de connexion:', response.data.data);
                }
            } catch (error) {
                console.error('Erreur lors de la connexion:', error);
            }
        },

        logoutUser() {
            this.auth = false;
            this.jwtToken = null;
            this.xsrfToken = null;
            this.userInfo = null;
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('xsrfToken');
        },

        async updateAuthHero(hero) {
            hero._id = this.userInfo.hero._id;

            console.log("store", hero);
            const response = await updateHeroWithAuth(hero);

            if (response.error === 0) {
                this.userInfo = response.data;
            } else {
                console.error('Erreur lors de la mise à jour des informations utilisateur:', response.data.data);
            }
        },

        async registerUser(hero) {
            const response = await registerUser(hero);
            console.log(response);

            if (response.error === 0) {
                this.userInfo = response.data;
            } else {
                console.error("Erreur lors de l'enregistrement de l'utilisateur:", response.data.data);
            }
        }
    },
});
