<template>
  <v-card>
    <v-container>
      <v-row class="pa-2">
        <v-col cols="4">
          <h2 class="text-h6 font-weight-light">Height</h2>
        </v-col>
        <v-col cols="8">
          <span class="text-h6 font-weight-medium">{{ pokemon.height * 10 }} cm</span>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="pa-2">
        <v-col cols="4">
          <h2 class="text-h6 font-weight-light">Weight</h2>
        </v-col>
        <v-col cols="8">
          <span class="text-h6 font-weight-medium">{{ (pokemon.weight * 0.1).toFixed(2) }} kg</span>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="pa-2">
        <v-col>
          <h2 class="text-h6 font-weight-light">Moves</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0">
          <v-chip-group class="pa-0" column>
            <v-chip
              v-for="move of pokemon.moves"
              :key="move.move.name"
              :color="color"
            >{{ move.move.name }}</v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
};
</script>
