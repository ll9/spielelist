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
        @add="addDraggable($event, user)"
        @sort="onSort($event, user)"
      >
        <Game
          v-for="game in user.games"
          :key="game.id"
          :game="game"
          @remove-game="removeGame(user, $event)"
          @archive-game="archiveGame(user, $event)"
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
import externalContent from '../../api/extern/apiContext';
import internalContext from '../../api/intern/apiContext';
import Game from './Game.vue';

export default Vue.extend({
  data: () => {
    return {
      users: [
        {
          id: 1,
          name: 'Temp User',
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
      this.users = await Promise.all(
        res.data.map(async (user: any) => {
          const games = [];
          if (user.userEntries.length > 0) {
            const usergamesRes = await externalContent.games.listByIds(
              user.userEntries.map((ue: any) => ue.listEntryId),
            );

            // insert in correct order
            for (const entry of user.userEntries) {
              const game = usergamesRes.data.find(
                (g: any) => g.id === entry.listEntryId,
              );
              if (game) {
                games.push(game);
              }
            }
          }
          return { ...user, games };
        }),
      );
    },
    async removeUser(id: any) {
      const index = this.users.findIndex((u) => u.id === id);
      if (index !== -1) {
        await internalContext.users.remove(id);
        this.users.splice(index, 1);
      }
    },
    async removeGame(user: any, id: number) {
      const index = user.games.findIndex((g: any) => g.id === id);
      if (index !== -1) {
        const gameId = user.games[index].id;
        user.games.splice(index, 1);
        await internalContext.userEntries.remove(user.id, gameId);
      }
    },
    removeGameFromUsers(id: number) {
      for (const user of this.users) {
        const index = user.games.findIndex((g: any) => g.id === id);
        if (index !== -1) {
          user.games.splice(index, 1);
        }
      }
    },
    async archiveGame(user: any, id: number) {
      await internalContext.archive.add(id);
      await this.removeGame(user, id);
    },
    async addDraggable(evt: any, user: any) {
      const game = user.games[evt.newIndex];
      const count = user.games.filter((g: any) => g.id === game.id).length;
      if (count > 1) {
        user.games.splice(evt.newIndex, 1);
      } else {
        await internalContext.userEntries.add(user.id, game.id, evt.newIndex);
      }
    },
    async onSort(evt: any, user: any) {
      if (evt.to === evt.from) {
        const game = user.games[evt.newIndex];
        await internalContext.userEntries.updateIndex(
          user.id,
          game.id,
          evt.newIndex,
        );
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
  padding: 10px;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(
      0,
      1fr
    );

  > div {
    border: 1px solid black;

    transition: 0.3s;

    &:hover {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
  }

  ::v-deep .cover {
    cursor: move;
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

.list-group {
  border: 3px dashed black;
  margin: 20px;
}
</style>
