<template>
  <div>
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
      </div>
      <br />
    </div>
    <p class="mb-3">
      Archivert:
      <span @click="updateDate" style="cursor: pointer;">{{
        new Date(archived).toLocaleDateString()
      }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { ArchiveUpdateDto } from "@/models/ArchiveUpdateDto"
import Vue from "vue"
import internalContext from "../../api/intern/apiContext"

export default Vue.extend({
  props: ["game", "archived"],
  methods: {
    async removeFromList(id: number) {
      this.$emit("remove-game", id)
    },
    updateDate() {
      // Hack to get local date without timezone issues
      let d = new Date(this.archived)
      d = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      let yyyymmdd = d.toISOString().slice(0, 10)

      let result = prompt("Datum aktualisieren", yyyymmdd)
      if (!result) return

      const date = new Date(result)
      let isValidDate = !isNaN(date.getTime())
      if (!isValidDate) {
        alert("Datum ungültig")
        return
      }

      this.$emit("update-game", { archived: date } as ArchiveUpdateDto)
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.game-container {
  margin: 5px;
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
