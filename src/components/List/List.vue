<template>
  <div>
    <div class="mb-3">
      <draggable
        :list="games"
        class="list-group grid-container"
        :group="{ name: 'userpanel', pull: 'clone', put: false }"
        :sort="false"
      >
        <Game
          v-for="game in games"
          :key="game.id"
          :game="game"
          :archivable="true"
          @remove-game="removeGame"
          @archive-game="archiveGame"
        />
      </draggable>
    </div>
    <UsersPanel ref="userPanel" />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
const draggable = require("vuedraggable")

import Game from "./Game.vue"
import UsersPanel from "./UsersPanel.vue"
import externalContext from "../../api/extern/apiContext"
import internalContext from "../../api/intern/apiContext"

export default Vue.extend({
  data: () => {
    return {
      searchVal: "",
      games: [] as any[]
    }
  },
  mounted() {
    const search = (this.$route.query.search || "mario") as string

    this.loadData(search)
  },
  methods: {
    submit() {
      this.$router.push({ query: { search: this.searchVal } })
      this.loadData(this.searchVal)
    },
    async loadData(val: string) {
      const listRes = await internalContext.listEintraege.list()
      const gameRes = await externalContext.games.listByIds(listRes.data.map((e: any) => e.igdbId))

      this.games = gameRes
    },
    async removeGame(id: number) {
      const index = this.games.findIndex(g => g.id === id)
      if (index !== -1) {
        this.games.splice(index, 1)
      }

      ;(this.$refs.userPanel as any).removeGameFromUsers(id)
      await internalContext.listEintraege.remove(id)
    },
    async archiveGame(id: number) {
      ;(this.$refs.userPanel as any).removeGameFromUsers(id)

      await internalContext.archive.add(id)
      await this.removeGame(id)
    }
  },
  components: {
    draggable,
    Game,
    UsersPanel
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  ::v-deep .cover {
    cursor: move;
  }
}
</style>
