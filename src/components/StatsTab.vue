<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="stats"
      :hide-default-footer="true"
      :disable-filtering="true"
      :disable-sort="true"
      :calculate-widths="true"
      mobile-breakpoint="0"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item of items" :key="item.name" style="width: 100%">
            <td>
              <p>{{ item.name }}</p>
            </td>
            <td>{{ item.stat }}</td>
            <td>
              <v-progress-linear
                :value="(item.base_stat / 255) * 100"
                :color="
                  item.name.includes('Attack') || item.name.includes('Speed')
                    ? 'red'
                    : 'green'
                "
              />
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          value: 'name',
          width: '20%',
        },
        {
          value: 'stat',
          width: '20%',
        },
        {
          value: 'base_stat',
          width: '60%',
        },
      ],
    };
  },
  props: {
    statsArray: {
      type: Array,
      required: true,
    },
  },
  computed: {
    stats() {
      const capitalizeString = (str) => str
        .split('-')
        .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
        .join('-');
      return this.statsArray.map((stat) => ({
        name:
          stat.stat.name.length > 2 ?
            capitalizeString(stat.stat.name) :
            stat.stat.name.toUpperCase(),
        stat: stat.base_stat,
        base_stat: stat.base_stat,
      }));
    },
  },
};
</script>
