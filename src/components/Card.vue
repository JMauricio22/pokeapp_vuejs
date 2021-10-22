<template>
  <div>
    <v-sheet v-if="!pokemon.id" color="white" elevation="1" width="100%">
      <v-skeleton-loader type="image" elevation="2" width="100%"></v-skeleton-loader>
    </v-sheet>
    <v-card
      class="rounded-xl pa-2"
      v-if="pokemon.id"
      :color="colorLighten3"
      max-width="100%"
      elevation="4"
    >
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title
            v-text="pokemon.name"
            class="text-h6 font-weight-medium pb-0"
          ></v-card-title>
          <v-card-text class="pa-0">
            <v-list color="transparent">
              <v-list-item v-for="type of pokemon.types" :key="type.type.name">
                <v-list-item-content class="py-0">
                  <v-chip class="d-flex justify-center" :color="colorLighten4">{{
                    type.type.name
                  }}</v-chip>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </div>
        <div class="d-flex justify-space-center align-center">
          <v-img
            :src="pokemon.sprites.other.dream_world.front_default"
            width="180"
            height="180"
            :contain="true"
          >
            <template v-slot:placeholder>
              <v-skeleton-loader type="image"></v-skeleton-loader>
            </template>
          </v-img>
        </div>
      </div>
      <v-card-actions class="px-4">
        <v-btn
          class="px-4"
          :color="colorLighten4"
          @click="goToPokemonDetail"
          rounded
          elevation="10"
          large
          >Details</v-btn
        >
        <v-btn
          v-if="!favorites"
          class="px-4"
          :color="colorLighten4"
          @click="addToFavorites"
          rounded
          elevation="10"
          large
          icon
          text
        >
          <v-img
            src="/pokemon_go_play_game_cinema_film_movie_icon-icons.com_69163.png"
          ></v-img>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import pokemonService from '../../services/pokemon';

export default {
  data() {
    return {
      pokemon: {},
      colors: {},
    };
  },
  created() {
    pokemonService.getPokemonByName(this.name).then((resp) => {
      this.pokemon = resp.data;
    });
  },
  props: ['name', 'url', 'favorites'],
  emits: ['getFavorites'],
  methods: {
    goToPokemonDetail() {
      this.$router.push({ name: 'pokemon', params: { name: this.name } });
    },
    addToFavorites() {
      const pokemons = JSON.parse(localStorage.getItem('pokemons')) || [];
      pokemons.push(this.pokemon);
      localStorage.setItem('pokemons', JSON.stringify(pokemons));
      this.$emit('getFavorites');
    },
  },
  watch: {
    pokemon(value) {
      pokemonService
        .getPokemonColor(value.id)
        .then((resp) => {
          const colors = resp.data;
          if (colors.name === 'black' || colors.name === 'white') {
            throw new Error('Color is black');
          }
          this.colors = colors;
        })
        .catch(() => {
          this.colors = {
            name: 'grey',
          };
        });
    },
  },
  computed: {
    colorLighten4() {
      return `${this.colors.name} lighten-4`;
    },
    colorLighten3() {
      return `${this.colors.name} lighten-3`;
    },
  },
};
</script>
