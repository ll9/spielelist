<template>
  <div class="grid-container">
    <div v-for="user in users" :key="user.id">
      <p class="inline mr-2">{{user.name}}</p>
      <button @click="removeUser(user.id)">-</button>
      <draggable
        :list="user.games"
        class="list-group user-items"
        ghost-class="ghost"
        group="userpanel"
      >
        <Game
          v-for="game in user.games"
          :key="game.id"
          :game="game"
          @remove-game="removeGame(user.games, $event)"
          class="user-item"
        />
      </draggable>
    </div>
    <div v-if="users.length < 4">
      <button @click="addUser" class="inline">+</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import draggable from 'vuedraggable';
import internalContext from '../../api/intern/apiContext';
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
    async removeGame(games: any[], id: number) {
      const index = games.findIndex((g) => g.id === id);
      if (index !== -1) {
        games.splice(index, 1);
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

  > div {
    border: 1px solid black;
  }
}

.user-items {
    padding: 10px;
    min-height: 300px;
}
</style>
