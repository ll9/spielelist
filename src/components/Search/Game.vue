<template>
  <div>
    <h4>{{game.name}}</h4>
    <img
      v-if="game.cover"
      :alt="game.name + ' bild'"
      :src="game.cover.url.replace('t_thumb', 't_cover_small_2x')"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: ['game'],
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
