import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import PokemonDetail from '../views/PokemonDetail.vue';
import Favorites from '../views/Favorites.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/pokemon/:name',
    name: 'pokemon',
    component: PokemonDetail,
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      // eslint-disable-next-line implicit-arrow-linebreak
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: () => ({
    x: 0,
    y: 0,
  }),
});

export default router;
