<template>
  <div>    
    <div v-if="loading">
      <v-card class="pa-2">
        <v-skeleton-loader type="card" :types="types"></v-skeleton-loader>
      </v-card>
      <v-card class="px-2 py-4">
        <v-skeleton-loader type="card" :types="types"></v-skeleton-loader>
      </v-card>
    </div>
    <div v-if="!loading">
      <v-card v-for="ability of abilities" :key="ability.name">
        <v-card-title>{{ ability.name }}</v-card-title>
        <v-card-subtitle>{{
          getFlavorText(ability['flavor_text_entries'])['flavor_text']
        }}</v-card-subtitle>
        <v-card-text>
          {{ getEffect(ability['effect_entries']).effect }}
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  created() {
    const promises = [];
    this.abilitiesArray.forEach((ability) => {
      promises.push(axios.get(ability.ability.url).then((resp) => resp.data));
    });
    Promise.all(promises).then((abilities) => {
      console.log(abilities);
      this.abilities = abilities;
    });
  },
  data() {
    return {
      abilities: [],
      types: {
        card: 'paragraph, text, text',
        paragraph: 'text@2',
      },
    };
  },
  props: {
    abilitiesArray: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getFlavorText(flavorTextEntries) {
      const item = flavorTextEntries.find((flavorText) => flavorText.language.name.includes('en'));
      console.log(item);
      return item || flavorTextEntries[0];
    },
    getEffect(effectEntries) {
      const item = effectEntries.find((effect) => effect.language.name.includes('en'));
      console.log(item);
      return item || effectEntries[0];
    },
  },
  computed: {
    loading() {
      return this.abilities.length === 0;
    },
  },
};
</script>
