<template>
  <div>
    <form class="pure-form" @submit.prevent="submit">
      <input type="text" placeholder="suche" v-model="searchVal" />
      <div class="container">
        <Game v-for="game in games" :key="game.id" :game="game" />
      </div>
    </form>
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
    const search = (this.$route.query.search || 'mario') as string;

    this.loadData(search);
  },
  methods: {
    submit() {
      this.$router.push({ query: { search: this.searchVal } });
      this.loadData(this.searchVal);
    },
    async loadData(val: string) {
      const res = await Context.games.search(val);
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
