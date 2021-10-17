import Vue from 'vue';
import Vuex from 'vuex';
import pokemonService from '../../services/pokemon';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    selectedItem: {},
    count: 0,
    pagination: {
      next: '',
      previous: '',
      page: 1,
    },
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    setSelectedItem(state, item) {
      state.selectedItem = item;
    },
    setCount(state, count) {
      state.count = count;
    },
    setPagination(state, pagination) {
      state.pagination = pagination;
    },
  },
  actions: {
    getAllPokemons(context) {
      return pokemonService.all().then((resp) => {
        context.commit('setItems', resp.data.results);  
        context.commit('setCount', resp.data.count);
        return resp.data;
      });
    },
    getPokemonByName(context, { name }) {
      return pokemonService.getPokemonByName(name).then((resp) => {
        context.commit('setSelectedItem', resp.data);
        return resp.data;
      });
    },
    getPage(context, { url, page }) {
      return pokemonService.getPage(url).then((resp) => {
        console.log(resp);
        context.commit('setItems', resp.data.results);
        context.commit('setCount', resp.data.count);
        context.commit('setPagination', {
          next: resp.data.next,
          previous: resp.data.previous,
          page,
        });
        return resp.data;
      });
    },
  },
  modules: {},
});
