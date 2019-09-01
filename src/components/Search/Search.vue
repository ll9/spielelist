<template>
  <div>
    <form class="pure-form" @submit.prevent="loadData(searchVal)">
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
    this.games = this.loadData('mario');
  },
  methods: {
    async loadData(val: string) {
      const res = await Context.games.search(val);
      this.games = res.data;
      return;
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
