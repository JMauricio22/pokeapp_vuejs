<template>
  <v-container :fluid="true">
    <v-row class="mt-3">
      <v-col cols="12">
        <h2 class="font-weight-bold text-h4">Pokedex</h2>
      </v-col>
    </v-row>

    <v-row v-if="loading">
      <Loading />
    </v-row>

    <v-row v-if="error && !loading">
      <v-col cols="12">
        <ErrorMessage>
          <h2 class="text-h6">{{error}}</h2>
        </ErrorMessage>
      </v-col>
    </v-row>

    <template v-if="mode === 'items' && !loading && !error">
      <template v-if="items.length > 0">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="item of items" :key="item.name">
            <Card
              :name="item.name"
              :url="item.url"
              :favorites="favorites.includes(item.name)"
              @getFavorites="getFavorites"
            />
          </v-col>
        </v-row>
        <div class="text-center my-6">
          <v-pagination
            v-model="page"
            :length="count"
            total-visible="5"
            @next="getPage('next')"
            @previous="getPage('previous')"
            @input="getPage"
          ></v-pagination>
        </div>
      </template>
    </template>

    <template v-if="mode === 'search' && !loading && !error">
      <v-row v-if="filters.length > 0 && !loading">
        <v-col cols="12" sm="6" md="4" v-for="pok of filters" :key="pok.name">
          <Card
            :name="pok.name"
            :url="pok.url"
            :favorites="favorites.includes(pok.name)"
            @getFavorites="getFavorites"
          />
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import config from '../../services/config';
import Card from '../components/Card.vue';
import Loading from '../components/Loading.vue';
import ErrorMessage from '../components/ErrorMessage.vue';

export default {
  name: 'Home',
  data() {
    return {
      page: 1,
      favorites: [],
    };
  },
  components: { Card, Loading, ErrorMessage },
  created() {
    this.getFavorites();
    this.page = this.$store.state.pagination.page;
    if (this.$store.state.items.length === 0) {
      this.$store
        .dispatch('getPage', {
          url: `${config.apiUrl}pokemon?offset=0&limit=20`,
          page: this.page,
        })
        .then((resp) => {
          console.log(resp);
        });
    }
  },
  computed: mapState([
    'items',
    'filters',
    'count',
    'loading',
    'mode',
    'query',
    'error',
    'pagination',
  ]),
  methods: {
    getPage(event) {
      let url = '';

      if (event === 'next' || event === 'previous') {
        url = this.pagination[event];
      } else {
        url = `${config.apiUrl}pokemon?offset=${(event - 1) * 20}&limit=20`;
      }

      this.$store.dispatch('getPage', { url, page: this.page });
    },
    getFavorites() {
      const pokemons = JSON.parse(localStorage.getItem('pokemons')) || [];
      this.favorites = pokemons.map((pokemon) => pokemon.name);
    },
  },
};
</script>
