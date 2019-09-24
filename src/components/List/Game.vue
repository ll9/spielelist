<template>
  <div class="game-container">
    <a :href="game.url" target="_blank">
      <img
        class="cover"
        v-if="game.cover"
        :alt="game.name + ' bild'"
        :src="game.cover.url.replace('t_thumb', 't_cover_small_2x')"
      />
    </a>
    <div class="action-menu ml-2">
      <button @click="removeFromList(game.id)">
        <i class="fa fa-minus-circle"></i>
      </button>
      <button>
        <i class="fa fa-folder-open"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: ['game'],
  methods: {
    async removeFromList(id: number) {
      this.$emit('remove-game', id);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.game-container {
  margin: 10px;
  display: flex;
  justify-content: center;
}
.cover {
  box-shadow: -1px -1px 2px 2px rgba(0, 0, 0, 0.75);
  height: 180px;
}

.action-menu button {
  display: block;
  border: none;
  background: transparent;
  font-size: 1.75rem;
  transition: 0.75s;
  padding: 0;
  outline: none;
}
</style>
