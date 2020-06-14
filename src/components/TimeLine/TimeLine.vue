<template>
  <v-app>
    <label style="margin-bottom: 30px"
      ><span>Jahr: </span>
      <select v-model="selectedYear" style="width: 100px" @change="loadData">
        <option v-for="year in years" :key="year">{{ year }}</option>
      </select>
    </label>

    <v-timeline reverse>
      <v-timeline-item v-for="game in games" :key="game.id">
        <!-- <span slot="opposite">{{ new Date(game.archived).toLocaleDateString() }}</span> -->
        <Game :game="game.igdb" :archived="game.archived" @remove-game="removeGame(game.id)"
      /></v-timeline-item>
    </v-timeline>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue"

import externalContext from "../../api/extern/apiContext"
import internalContext from "../../api/intern/apiContext"
import Game from "./Game.vue"

export default Vue.extend({
  components: {
    Game
  },
  data() {
    return {
      games: [] as any[],
      years: [...new Array(new Date().getFullYear() - 2019 + 1)].map((v, i) => 2019 + i),
      selectedYear: 2019
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData(page = 1) {
      const { data, totalCount } = await internalContext.archive.listByYear(this.selectedYear)
      const igdbData = await externalContext.games.listByIds(data.map((e: any) => e.igdbId))

      for (const game of data) {
        const igdb = igdbData.find((e: any) => e.id === game.igdbId)
        if (igdb) {
          game.igdb = igdb
        }
      }

      this.games = data
    }
  }
})
</script>

<style scoped></style>
