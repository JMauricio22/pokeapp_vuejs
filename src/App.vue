<template>
  <v-app>
    <AppBar />
    <v-main>
      <router-view />
    </v-main>
    <v-footer>
      <v-col cols="12 pa-4">
        <p class="text-center m-0"> Make ❤ by Mauricio Lemús </p>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
/* eslint-disable */
import AppBar from './components/AppBar.vue';

export default {
  name: 'App',
  components: { AppBar },
};
</script>
