<template>
  <div>
    <h4>{{game.name}}</h4>
    <a :href="game.url" target="_blank">
    <img
      class="cover"
      v-if="game.cover"
      :alt="game.name + ' bild'"
      :src="game.cover.url.replace('t_thumb', 't_cover_small_2x')"
    />
    </a>
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
.cover {
  box-shadow: -1px -1px 2px 2px rgba(0,0,0,0.75);
}
</style>
