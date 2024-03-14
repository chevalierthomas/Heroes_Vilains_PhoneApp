import {addTeamToOrg, createOrg, getOrgById, getOrgs, removeTeamFromOrg} from "@/services/org.services";
import {addHeroesToTeam, createTeam, getTeams, removeHeroesFromTeam} from "@/services/team.services";
import {createHero, getAllHeroes, updateHero} from "@/services/hero.services";
import {defineStore} from "pinia";

import {useErrorsStore} from "./errors.js";


export const useMainStore = defineStore('main', {

    state: () => ({
        currentHero: null,
        currentTeam: null,
        currentOrg: null,

        orgs: [],
        teams: [],
        heroes: [],

        type_heroes: ["force", "vitesse", "endurance", "magie", "effrayant", "furtivité", "stupidité"]
    }),

    actions: {
        async getAllOrgs() {
            try {
                const orgs = await getOrgs();
                console.log(orgs.data);
                if (!orgs.error || orgs.error === 0) {
                    this.orgs = orgs.data;
                } else {
                    const errorStore = useErrorsStore();
                    errorStore.pushError(orgs.data.data);
                } // Utilisation de l'action pushError
            } catch (error) {
                console.error('Error fetching orgs:', error);
            }
        },

        async appendOrg(newOrg) {
            try {
                console.log('store', newOrg.name, newOrg.secret);
                const orgs = await createOrg(newOrg.name, newOrg.secret);
                console.log(orgs.data);

                if (!orgs.error || orgs.error === 0) {
                    const {_id, name} = orgs.data;
                    const newOrg = {_id, name};
                    this.orgs.push(newOrg);

                } else {
                    const errorStore = useErrorsStore();
                    errorStore.pushError(orgs.data.data);
                }
            } catch (error) {
                console.error('Error appending org:', error);
            }
        },

        async setCurrentOrg(id) {
            try {
                console.log("store", id);
                const currentOrg = await getOrgById(id); // Assurez-vous que cette ligne utilise `secret` et non `secet`
                if(currentOrg.error===0){
                    this.currentOrg = currentOrg.data[0];
                }
                else{
                    const errorStore = useErrorsStore();
                    errorStore.pushError(currentOrg.data.data);
                }
            } catch (error) {
                console.error('Error fetching orgs:', error);
            }
        },
        //TEAMS

        async getAllTeams() {
            try {
                const teams = await getTeams();
                console.log(teams.data);
                this.teams = teams.data;
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        },

        async appendTeam(newTeam) {
            try {
                console.log('store', newTeam);
                const team = await createTeam(newTeam.name);
                console.log(team.data);

                if (!team.error || team.error === 0) {
                    const { _id, name } = team.data;
                    const newTeam = {_id, name};
                    this.teams.push(newTeam);
                } else {
                    const errorStore = useErrorsStore();
                    errorStore.pushError(team.data.data);
                }
            } catch (error) {
                console.error('Error appending team:', error);
            }
        },

        async addTeamToCurrentOrg(newTeamToCurrentOrg) {
            try {
                await addTeamToOrg(newTeamToCurrentOrg._id);
                const currentOrg = await getOrgById(this.currentOrg._id);
                console.log(currentOrg.data);

                if (!currentOrg.error || currentOrg.error === 0) {
                    this.currentOrg = currentOrg.data[0];

                } else {
                    const errorStore = useErrorsStore();

                    errorStore.pushError(currentOrg.data.data);
                }
            } catch (error) {
                console.error('Error adding team to org:', error);
            }
        },

        async removeTeamToCurrentOrg(deleteTeamFromCurrentOrg) {
            try {
                console.log('store', deleteTeamFromCurrentOrg);
                await removeTeamFromOrg(deleteTeamFromCurrentOrg._id);
                const currentOrg = await getOrgById(this.currentOrg._id);
                console.log(currentOrg.data);

                if (!currentOrg.error || currentOrg.error === 0) {
                    this.currentOrg = currentOrg.data[0];

                } else {
                    const errorStore = useErrorsStore();
                    errorStore.pushError(currentOrg.data.data);

                }
            } catch (error) {
                console.error('Error removing team from org:', error);
            }
        },

        async setCurrentTeam(currentTeam) {
            try {
                console.log("store", currentTeam);
                this.currentTeam = currentTeam
            } catch (error) {
                console.error('Error setting current team:', error);
            }
        },

        //HEROES

        async getAllHeroes() {
            try {
                const heroes = await getAllHeroes();
                console.log(heroes.data);
                if (!heroes.error || heroes.error === 0) {
                    this.heroes = heroes.data;

                } else {
                    const errorStore = useErrorsStore();
                    errorStore.pushError(heroes.data.data);
                }
            } catch (error) {
                console.error('Error fetching heroes:', error);
            }
        },

        async addHeroesToCurrentTeam(newHeroesIds) {
            try {
                console.log('store', newHeroesIds);
                const response = await addHeroesToTeam(this.currentTeam._id, newHeroesIds);
                if (!response.error || response.error === 0) {
                    this.currentTeam = response.data;
                } else {
                    const errorStore = useErrorsStore();
                    errorStore.pushError(response.data.data);
                }
            } catch (error) {
                console.error('Error adding heroes to the team:', error);
            }
        },

        async createHeroAndAddHeroesToCurrentTeam( newHero) {
            try {
                const reponses_hero = await createHero(newHero);

                console.log(reponses_hero)

                if (!reponses_hero.error || reponses_hero.error === 0) {
                    const response = await addHeroesToTeam(this.currentTeam._id, [reponses_hero.data._id]);
                    this.currentTeam = response.data;
                } else {
                    const errorStore = useErrorsStore();
                    errorStore.pushError(response.data.data);
                }
            } catch (error) {
                console.error('Error creating hero and adding to the team:', error);
            }
        },

        async removeHeroesFromCurrentTeam(oldHeroesIds) {
            try {
                console.log('store', oldHeroesIds);
                const response = await removeHeroesFromTeam(state.currentTeam._id, oldHeroesIds);
                if (!response.error || response.error === 0) {
                    this.currentTeam = response.data;

                } else {
                    const errorStore = useErrorsStore();
                    errorStore.pushError(response.data.data);

                }
            } catch (error) {
                console.error('Error removing heroes from the team:', error);
            }
        },

        async setCurrentHero(currentHero) {
            try {
                console.log("store", currentHero);
                this.currentHero = currentHero;

            } catch (error) {
                console.error('Error setting current hero:', error);
            }
        },

        async updateCurrentHero(updatedCurrentHero) {
            try {
                console.log("store", updatedCurrentHero);
                const updated_hero = await updateHero(updatedCurrentHero);
                if (!updated_hero.error || updated_hero.error === 0) {
                    console.log(updated_hero.data);
                    this.currentHero = updated_hero.data;

                } else {
                    const errorStore = useErrorsStore();

                    errorStore.pushError(updated_hero.data.data);
                }
            } catch (error) {
                console.error('Error updating current hero:', error);
            }
        },

        clearCurrentHero() {
            this.currentHero = null;
        },
        clearCurrentTeam() {
            this.currentTeam = null;
        },
        clearCurrentOrg() {
            this.currentOrg = null;
        },

    },

})
