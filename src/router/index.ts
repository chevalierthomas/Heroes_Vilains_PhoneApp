import { createRouter, createWebHistory } from 'vue-router';

import HomeView from "@/views/HomeView.vue";
import OrgListView from "@/views/Orgs/OrgListView.vue";
import OrgView from "@/views/Orgs/OrgView.vue";
import TeamView from "@/views/Teams/TeamView.vue";
import TeamListView from "@/views/Teams/TeamListView.vue";
import TeamDetailsView from "@/views/Teams/TeamDetailsView.vue";
import OrgDetailsView from "@/views/Orgs/OrgDetailsView.vue";
import HeroListView from "@/views/Heros/HeroListView.vue";
import HeroView from "@/views/Heros/HeroView.vue";
import LoginView from "@/views/LoginView.vue";
import UserAccountView from "@/views/UserAccount.vue";
import RegisterView from "@/views/RegisterView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/user-account',
    name: 'UserAccount',
    component: UserAccountView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/org',
    component: OrgView,
    children: [
      {
        path: '',
        name: 'org',
        component: OrgListView
      },
      {
        path: 'details',
        name: 'orgDetails',
        component: OrgDetailsView,
      }
    ]
  },

  {
    path: '/team',
    component: TeamView,
    children: [
      {
        path: '',
        name: 'team',
        component: TeamListView
      },
      {
        path: 'details',
        name: 'teamDetails',
        component: TeamDetailsView,
      }
    ]
  },
  {
    path: '/hero',
    component: HeroView,
    children: [
      {
        path: '',
        name: 'hero',
        component: HeroListView
      },
    ]
  },

  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: () => import('@/views/404.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
