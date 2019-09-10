<template>
  <div>
    <div class="container">
      <Game v-for="game in games" :key="game.id" :game="game" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Game from '../Search/Game.vue';
import externalContext from '../../api/extern/apiContext';
import internalContext from '../../api/intern/apiContext';

export default Vue.extend({
  data: () => {
    return {
      searchVal: '',
      games: [] as any,
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
      let gameRes = await externalContext.games.listByIds(listRes.data.map((e: any) => e.spielId));

      this.games = gameRes.data;
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
