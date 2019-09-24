<template>
  <div>
    <div class="mb-3">
        <Game
          v-for="game in games"
          :key="game.id"
          :game="game.igdb"
          @remove-game="removeGame(game.id)"
        />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Game from './Game.vue';
import externalContext from '../../api/extern/apiContext';
import internalContext from '../../api/intern/apiContext';

export default Vue.extend({
  data: () => {
    return {
      searchVal: '',
      games: [] as any[],
    };
  },
  mounted() {
    const search = (this.$route.query.search || 'mario') as string;

    this.loadData(search);
  },
  methods: {
    submit() {
      this.$router.push({ query: { search: this.searchVal } });
      this.loadData(this.searchVal);
    },
    async loadData(val: string) {
      const archiveRes = await internalContext.archive.list();
      const gameRes = await externalContext.games.listByIds(
        archiveRes.data.map((e: any) => e.igdbId),
      );

      const games = archiveRes.data;
      for (const game of games) {
        const igdb = gameRes.data.find((e: any) => e.id === game.igdbId);
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
  },
  components: {
    Game,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
