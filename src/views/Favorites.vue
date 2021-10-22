<template>
  <v-container :fluid="true">
    <v-row class="mt-3">
      <v-col cols="12">
        <h2 class="font-weight-bold text-h4">Favorites</h2>
      </v-col>
    </v-row>
    <v-row v-if="pokemons.length > 0">
      <v-col cols="12" sm="6" md="4" v-for="item of pokemons" :key="item.name">
        <Card :name="item.name" :url="item.url" :favorites="true" />
      </v-col>
    </v-row>
    <v-row v-if="pokemons.length === 0">
      <v-col>
        <ErrorMessage>
          <h2 class="text-h5 font-weight-medium">You have not added items to favorites yet 😅.</h2>
        </ErrorMessage>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from '../components/Card.vue';
import ErrorMessage from '../components/ErrorMessage.vue';

export default {
  created() {
    const pokemons = JSON.parse(localStorage.getItem('pokemons')) || [];
    this.pokemons = pokemons;
  },
  data() {
    return {
      pokemons: [],
    };
  },
  components: {
    Card,
    ErrorMessage,
  },
};
</script>
