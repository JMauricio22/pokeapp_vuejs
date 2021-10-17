<template>
    <v-container :fluid="true">  
      <v-row class="mt-3">
        <v-col cols="12">
          <h2 class="font-weight-bold text-h4">
            Pokedex
          </h2>
        </v-col>
      </v-row>
      <v-row v-if="items.length > 0">
        <v-col cols="12" sm="6" md="4" v-for="item of items" :key="item.name">
          <Card :name="item.name" :url="item.url" />
        </v-col>
      </v-row>
      <div class="text-center my-6">
        <v-pagination
          v-model="page"
          :length="$store.state.count"
          @next="getPage('next')"
          @previous="getPage('previous')"
          @input="getPage"
        ></v-pagination>
      </div>
    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import config from '../../services/config';
import Card from '../components/Card.vue';

export default {
  name: 'Home',
  data() {
    return {
      page: 1,
    };
  },
  components: { Card },
  created() {
    this.page = this.$store.state.pagination.page;
    console.log(this.$store);
    if (this.$store.state.items.length === 0) {
      this.$store.dispatch('getAllPokemons').then((resp) => { console.log(resp); });
    }
  },
  computed: mapState(['items']),
  methods: {
    getPage(event) {
      let url = '';

      if (event === 'next' || event === 'previous') {
        url = this[event];
      } else {
        url = `${config.apiUrl}pokemon?offset=${(event - 1) * 20}&limit=20`;
      }

      this.$store.dispatch('getPage', { url, page: this.page }).then((resp) => { 
        console.log(resp);
      });
    },
  },
};
</script>
