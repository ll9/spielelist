<template>
  <div>
    <div class="mb-3">
      <Game
        v-for="game in games"
        :key="game.id"
        :game="game.igdb"
        :archived="game.archived"
        @remove-game="removeGame(game.id)"
        @update-game="updateGame(game.id, $event)"
      />
      <paginate
        :page-count="totalPages"
        :clickHandler="handlePageChange"
        prev-text="Zurück"
        next-text="Weiter"
        container-class="pagination"
      >
      </paginate>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
// @ts-ignore
import Paginate from "vuejs-paginate"

import Game from "./Game.vue"
import externalContext from "../../api/extern/apiContext"
import internalContext from "../../api/intern/apiContext"
import { ArchiveUpdateDto } from "@/models/ArchiveUpdateDto"

export default Vue.extend({
  data: () => {
    return {
      games: [] as any[],
      totalCount: 0,
      pageSize: 10
    }
  },
  computed: {
    totalPages(): number {
      return Math.ceil(this.totalCount / this.pageSize)
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData(page = 1) {
      const { data, totalCount } = await internalContext.archive.list(page, this.pageSize)
      const igdbData = await externalContext.games.listByIds(data.map((e: any) => e.igdbId))

      for (const game of data) {
        const igdb = igdbData.find((e: any) => e.id === game.igdbId)
        if (igdb) {
          game.igdb = igdb
        }
      }

      this.totalCount = totalCount
      this.games = data
    },
    async removeGame(id: number) {
      const index = this.games.findIndex(g => g.id === id)
      if (index !== -1) {
        this.games.splice(index, 1)
      }
      await internalContext.archive.remove(id)
    },

    updateGame(id: number, dto: ArchiveUpdateDto) {
      const index = this.games.findIndex(g => g.id === id)
      if (index === -1) return

      this.games[index].archived = dto.archived
      internalContext.archive
        .update(id, dto)
        .catch(() => alert("Netzwerkfehler, Änderung konnte nicht gespeichert werden"))
    },

    handlePageChange(page: number) {
      window.scrollTo(0, 0)
      this.loadData(page)
    }
  },
  components: {
    Game,
    Paginate
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.pagination {
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  border-radius: 4px;
  font-size: 0;

  li {
    position: relative;
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    line-height: 1.25;
    color: #007bff;
    border: 1px solid #dee2e6;

    font-size: 16px;
    display: inline-block;

    &.disabled {
      color: #6c757d;
      pointer-events: none;
      cursor: not-allowed;
      background-color: #fff;
      border-color: #dee2e6;
    }

    &.active {
      z-index: 1;
      color: #fff;
      background-color: #007bff;
      border-color: #007bff;
    }

    a:active,
    a:focus {
      outline: 0;
      border: none;
      outline-style: none;
      -moz-outline-style: none;
    }
  }
}
</style>
