<template>
  <v-app-bar height="80" max-height="80" color="transparent" rounded>
    <router-link to="/">
      <v-img src="../assets/logo.png" max-width="140" min-width="100" contain></v-img>
    </router-link>
    <v-spacer></v-spacer>
    <v-row align="stretch" justify="end">
      <v-col cols="10" md="6">
        <v-text-field
          filled
          rounded
          hide-details
          append-icon="mdi-magnify"
          @input="updateQuery"
          :value="$store.state.query"
          @keyup.enter="searchData"
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn icon @click="goToFavorites">
      <v-icon>mdi-star</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    updateQuery(value) {
      this.$store.commit('setQuery', value);
    },
    searchData() {
      this.$store.dispatch('getPokemonsAndFilter');
    },
    goToFavorites() {
      this.$router.push('favorites');
    },
  },
};
</script>
