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
      <button @click="addToList(game.id)">
        <i class="fa fa-plus-circle"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Context from '../../api/intern/apiContext';

export default Vue.extend({
  props: ['game'],
  methods: {
    addToList(id: number) {
      Context.listEintraege.add(id)
        .then((res) => alert('Wurde erfolgreich zur liste hinzugefügt'))
        .catch((err) => alert(`Fehler: ${JSON.stringify(err.response.data)}`));
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.game-container {
  margin: 35px;
  display: flex;
  justify-content: center;
}
.cover {
  box-shadow: -1px -1px 2px 2px rgba(0, 0, 0, 0.75);
  width: 180px;
}

.action-menu button {
  border: none;
  background: transparent;
  font-size: 1.75rem;
  transition: .75s;
  padding: 0;
  outline: none;

}
</style>
