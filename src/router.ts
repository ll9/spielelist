import Vue from 'vue';
import Router from 'vue-router';
import Search from './components/Search/Search.vue';
import List from './components/List/List.vue';
import Archive from './components/Archive/Archive.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/suche',
    },
    {
      path: '/suche',
      name: 'suche',
      component: Search,
    },
    {
      path: '/liste',
      name: 'liste',
      component: List,
    },
    {
      path: '/archive',
      name: 'archive',
      component: Archive,
    },
  ],
});
