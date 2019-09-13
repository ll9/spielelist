<template>
  <div class="grid-container">
    <div v-for="user in users" :key="user.id">
      <p>{{user.name}}</p>
      <button @click="removeUser(user.id)">-</button>
      <draggable
        :list="user.games"
        class="list-group grid-container"
        ghost-class="ghost"
        group="userpanel"
      >
        <Game v-for="game in user.games" :key="game.id" :game="game" />
      </draggable>
    </div>
    <div v-if="users.length < 4">
      <button @click="addUser">+</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import draggable from 'vuedraggable';
import Game from './Game.vue';

export default Vue.extend({
  data: () => {
    return {
      users: [
        {
          id: 1,
          name: 'Hans',
          games: [],
        },
      ],
    };
  },
  methods: {
    addUser() {
      const user = prompt('Username');
      if (user) {
        this.users.push({ id: this.users.length + 1, name: user, games: [] });
      }
    },
    removeUser(id: any) {
      const index = this.users.findIndex((u) => u.id === id);
      if (index !== -1) {
        this.users.splice(index, 1);
      }
    },
  },
  components: {
    draggable,
    Game,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  border: 1px solid black;

  div {
    border: 1px solid black;
  }
}
</style>
