<template>
  <div>
    <div>
      <draggable
        :list="games"
        class="list-group grid-container"
        :group="{name: 'userpanel', pull: 'clone', put: false}"
        :sort="false"
      >
        <Game v-for="game in games" :key="game.id" :game="game" @remove-game="removeGame" />
      </draggable>
    </div>
    <UsersPanel />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
const draggable = require('vuedraggable');

import Game from './Game.vue';
import UsersPanel from './UsersPanel.vue';
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
      const listRes = await internalContext.listEintraege.list();
      const gameRes = await externalContext.games.listByIds(
        listRes.data.map((e: any) => e.igdbId),
      );

      this.games = gameRes.data;
    },
    async removeGame(id: number) {
      const index = this.games.findIndex((g) => g.id === id);
      if (index !== -1) {
        this.games.splice(index, 1);
      }
      await internalContext.listEintraege.remove(id);
    },
  },
  components: {
    draggable,
    Game,
    UsersPanel,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  ::v-deep .cover {
    cursor: move;
  }
}
</style>
