<template >
  <v-container :class="backgroundColor + ' h-100 pb-10'" :fluid="true">
    <div v-if="loading">
      <v-skeleton-loader type="text" width="200px"></v-skeleton-loader>
      <v-chip-group>
        <v-skeleton-loader type="chip"></v-skeleton-loader>
      </v-chip-group>
      <div class="d-flex justify-center mt-4">
        <v-skeleton-loader type="image" width="250" height="350"></v-skeleton-loader>
      </div>
      <div class="d-flex justify-center">
        <v-skeleton-loader type="card" :types="types" max-width="500" width="100%" />
      </div>
    </div>

    <v-row v-if="error && !loading">
      <v-col cols="12">
        <ErrorMessage>
          <h2 class="text-h6">{{error}}</h2>
        </ErrorMessage>
      </v-col>
    </v-row>

    <div v-if="!loading && !error">
      <h1 class="text-h4 font-weight-bold">{{ pokemon.name }}</h1>
      <v-chip-group>
        <v-chip
          v-for="item of pokemon.types"
          :key="item.type.name"
          :color="typeBackgroundColor"
        >{{ item.type.name }}</v-chip>
      </v-chip-group>
      <div class="d-flex justify-center mt-4">
        <v-img
          max-height="250"
          max-width="300"
          :contain="true"
          :src="pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default"
        ></v-img>
      </div>
      <div class="d-flex justify-center">
        <v-card class="mt-10" rounded="xl" max-width="500" width="100%">
          <v-tabs
            grow
            v-model="selectedTab"
            active-class="router-link-active"
            color="black"
            slider-color="blue lighten-3"
          >
            <v-tab
              v-for="tab of tabItems"
              :key="tab[0]"
              active-class="router-link-active"
              :ripple="false"
            >{{ tab[0] }}</v-tab>
          </v-tabs>

          <v-tabs-items v-model="selectedTab">
            <v-tab-item v-for="tab of tabItems" :key="tab[0]">
              <AbilitiesTab v-if="tab[0] === 'abilities'" :abilitiesArray="tab[1]" />
              <StatsTab v-else-if="tab[0] === 'stats'" :statsArray="tab[1]" />
              <AboutTab v-else :pokemon="tab[1]" :color="typeBackgroundColor" />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import pokemonService from '../../services/pokemon';
import AbilitiesTab from '../components/AbilitiesTab.vue';
import StatsTab from '../components/StatsTab.vue';
import AboutTab from '../components/AboutTab.vue';

export default {
  data() {
    return {
      colors: {},
      selectedTab: '',
      types: {
        card: 'table',
        'table-row': 'table-cell@3',
        table: 'table-thead, table-tbody',
        'table-tbody': 'table-row-divider@9',
        'table-thead': 'heading@3',
      },
    };
  },
  created() {
    this.$store.dispatch('getPokemonByName', { name: this.$route.params.name });
  },
  computed: {
    ...mapState(['selectedItem', 'loading', 'error']),
    backgroundColor() {
      return `${this.colors.name} lighten-3`;
    },
    typeBackgroundColor() {
      return `${this.colors.name} lighten-4`;
    },
    pokemon() {
      return this.$store.state.selectedItem;
    },
    tabItems() {
      const pokemonInfo = Object.entries(this.$store.state.selectedItem);
      const tabs = [['about', []]];
      pokemonInfo.forEach((item) => {
        if (item[0].includes('abilities') || item[0].includes('stats')) {
          tabs.push(item);
        } else if (
          item[0].includes('height') ||
          item[0].includes('weight') ||
          item[0].includes('moves')
        ) {
          tabs[0][1].push(item);
        }
      });
      tabs[0][1] = Object.fromEntries(tabs[0][1]);
      return tabs;
    },
  },
  methods: {
    goToHome() {
      this.$router.back();
    },
  },
  watch: {
    '$store.state.selectedItem': {
      handler(item) {
        pokemonService
          .getPokemonColor(item.id)
          .then((resp) => {
            if (resp.data.name === 'black') {
              throw new Error('Color is black');
            }
            this.colors = resp.data;
          })
          .catch(() => {
            this.colors = {
              name: 'grey',
            };
          });
      },
    },
  },
  components: {
    AbilitiesTab,
    StatsTab,
    AboutTab,
  },
};
</script>

<style scoped>
.h-100 {
  min-height: 100vh;
  height: auto;
}
.v-tab:before {
  background-color: transparent;
}
</style>
