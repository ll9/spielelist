<template>
  <div class="user-grid-container">
    <div v-for="user in users" :key="user.id">
      <div class="card-header">
        <p class="inline mr-2">{{user.name}}</p>
        <button @click="removeUser(user.id)" class="pure-button">-</button>
      </div>
      <draggable
        :list="user.games"
        class="list-group user-items"
        ghost-class="ghost"
        :group="{name: 'userpanel', pull: false }"
        :sort="false"
        @add="onAddDraggable($event, user.games)"
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
    <div v-if="users.length < 4" class="card-header">
      <button @click="addUser" class="inline pure-button">+</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
const draggable = require('vuedraggable');
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
  mounted() {
    this.loadUsers();
  },
  methods: {
    async addUser() {
      const user = prompt('Username');
      if (user) {
        const res = await internalContext.users.add(user);
        this.users.push({ id: res.data.id, name: res.data.name, games: [] });
      }
    },
    async loadUsers() {
      const res = await internalContext.users.list();
      this.users = res.data.map((d: any) => ({ ...d, games: [] }));
    },
    async removeUser(id: any) {
      const index = this.users.findIndex((u) => u.id === id);
      if (index !== -1) {
        await internalContext.users.remove(id);
        this.users.splice(index, 1);
      }
    },
    async removeGame(games: any[], id: number) {
      const index = games.findIndex((g) => g.id === id);
      if (index !== -1) {
        games.splice(index, 1);
      }
    },
    onAddDraggable(evt: any, destination: any[]) {
      const game = destination[evt.newIndex];
      const count = destination.filter((g: any) => g.id === game.id).length;
      if (count > 1) {
        destination.splice(evt.index, 1);
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
.user-grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  > div {
    border: 1px solid black;

    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 5px;

    &:hover {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
  }
}

.card-header {
  padding: 10px 0;
  border-bottom: 1px solid black;
}

.user-items {
  padding: 10px;
  min-height: 300px;
}

.list-group{
  border: 3px dashed black;
  margin: 20px;
}
</style>
