import Vue from 'vue';
import Router from 'vue-router';
import Search from './components/Search/Search.vue';

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
  ],
});
