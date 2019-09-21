<template>
  <div>
    <form class="pure-form" @submit.prevent="submit">
      <input type="text" placeholder="suche" v-model="searchVal" />
    </form>
    <div class="container">
      <Game v-for="game in games" :key="game.id" :game="game" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Game from './Game.vue';
import Context from '../../api/extern/apiContext';

export default Vue.extend({
  data: () => {
    return {
      searchVal: '',
      games: [] as any,
    };
  },
  mounted() {
    const search = this.$route.query.search as string;

    if (search) {
      this.loadSearch(search);
      this.searchVal = search;
    } else {
      this.loadRecent();
    }
  },
  methods: {
    submit() {
      this.$router.push({ query: { search: this.searchVal } });
      this.loadSearch(this.searchVal);
    },
    async loadSearch(val: string) {
      const res = await Context.games.search(val);
      this.games = res.data;
    },
    async loadRecent() {
      const res = await Context.games.recentReleases();
      this.games = res.data;
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
