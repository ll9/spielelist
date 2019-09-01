<template>
  <div>
    <form class="pure-form" @submit.prevent>
      <input type="text" placeholder="suche" />
      <div class="container">
        <Game v-for="game in games" :key="game.id" :game="game" />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Game from './Game.vue';

export default Vue.extend({
  data: () => {
    return {
      games: [] as any,
    };
  },
  mounted() {
    this.games = this.loadData();
  },
  methods: {
    loadData() {
      return [
        {
          id: 1942,
          cover: {
            id: 20471,
            url:
              '//images.igdb.com/igdb/image/upload/t_thumb/tri1c6vbydeosoqajwt1.jpg',
          },
          name: 'The Witcher 3: Wild Hunt',
          popularity: 134.9438287638789,
        },
        {
          id: 26845,
          cover: {
            id: 76781,
            url: '//images.igdb.com/igdb/image/upload/t_thumb/co1n8t.jpg',
          },
          name: 'Fire Emblem: Three Houses',
          popularity: 362.4923298752271,
        },
        {
          id: 55190,
          cover: {
            id: 70598,
            url: '//images.igdb.com/igdb/image/upload/t_thumb/co1ih2.jpg',
          },
          name: 'Pikuniku',
          popularity: 267.6277960513764,
        },
        {
          id: 37138,
          cover: {
            id: 24619,
            url:
              '//images.igdb.com/igdb/image/upload/t_thumb/ehnh4h1gv3urgxtwsp6c.jpg',
          },
          name: 'Sengoku Rance',
          popularity: 142.5740143637411,
        },
      ];
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
