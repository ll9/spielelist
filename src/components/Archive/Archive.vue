<template>
  <div>
    <div class="mb-3">
        <Game
          v-for="game in games"
          :key="game.id"
          :game="game.igdb"
          :archived="game.archived"
          @remove-game="removeGame(game.id)"
        />
        <paginate
          :page-count="20"
          :clickHandler="handlePageChange"
          prev-text="Zurück"
          next-text="Weiter"
          container-class="pagination">
        </paginate>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// @ts-ignore
import Paginate from 'vuejs-paginate'

import Game from './Game.vue';
import externalContext from '../../api/extern/apiContext';
import internalContext from '../../api/intern/apiContext';

export default Vue.extend({
  data: () => {
    return {
      games: [] as any[],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData(page = 1) {
      const archiveRes = await internalContext.archive.list(page);
      const gameRes = await externalContext.games.listByIds(
        archiveRes.data.map((e: any) => e.igdbId),
      );

      const games = archiveRes.data;
      for (const game of games) {
        const igdb = gameRes.find((e: any) => e.id === game.igdbId);
        if (igdb) {
          game.igdb = igdb;
        }
      }

      this.games = games;
    },
    async removeGame(id: number) {
      const index = this.games.findIndex((g) => g.id === id);
      if (index !== -1) {
        this.games.splice(index, 1);
      }
      await internalContext.archive.remove(id);
    },
    handlePageChange(page: number) {
      this.loadData(page);
    }
  },
  components: {
    Game,
    Paginate
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
