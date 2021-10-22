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
    query: '',
    filters: [],
    loading: true,
    mode: 'items',
    error: '',
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
    setQuery(state, query) {
      if (!query) {
        state.mode = 'items';
      }
      state.query = query;
    },
    setFilters(state, filters) {
      state.filters = filters;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setMode(state, mode) {
      state.mode = mode;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async getPokemonByName(context, { name }) {
      let selectedItem;
      try {
        context.commit('setError', '');
        context.commit('setLoading', true);
        const resp = await pokemonService.getPokemonByName(name);
        selectedItem = resp.data;
      } catch (error) {
        console.log(error);
        context.commit('setError', error.message);
        selectedItem = {};
      } finally {
        context.commit('setLoading', false);
        context.commit('setSelectedItem', selectedItem);
      }
    },
    async getPage(context, { url, page }) {
      try {
        context.commit('setLoading', true);
        context.commit('setError', '');
        const resp = await pokemonService.getPage(url);
        console.log(resp);
        context.commit('setItems', resp.data.results);
        context.commit('setCount', 800 / 20);
        context.commit('setPagination', {
          next: resp.data.next,
          previous: resp.data.previous,
          page,
        });
      } catch (error) {
        console.log(error);
        context.commit('setItems', []);
        context.commit('setCount', 0);
        context.commit('setError', error.message);
      } finally {
        context.commit('setLoading', false);
      }
    },
    async getPokemonsAndFilter(context) {
      let filters;
      try {
        context.commit('setError', '');
        if (context.state.query === '') {
          context.commit('setMode', 'items');
          return;
        }
        context.commit('setLoading', true);
        context.commit('setMode', 'search');
        const resp = await pokemonService.all();
        const pokemons = resp.data.results;
        filters = pokemons.filter((pokemon) => {
          const index = pokemon.name.indexOf(context.state.query);
          return index !== -1;
        });
        if (filters.length === 0) {
          throw new Error(`Nothing was found to search: ${context.state.query} 😥`);
        }
      } catch (error) {
        console.log(error);
        context.commit('setError', error.message);
      } finally {
        context.commit('setFilters', filters);
        context.commit('setLoading', false);
      }
    },
  },
  modules: {},
});
