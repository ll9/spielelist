<template>
  <div class="pure-menu pure-menu-horizontal" id="status-bar">
    <ul class="pure-menu-list">
      <li class="pure-menu-item">
        <router-link to="/suche" class="pure-menu-link" :class="{ active: $route.path=='/suche'}">Suche</router-link>
      </li>
      <li class="pure-menu-item">
        <router-link to="/liste" class="pure-menu-link" :class="{ active: $route.path=='/liste'}">Liste</router-link>
      </li>
      <li class="pure-menu-item">
        <router-link to="/archiv" class="pure-menu-link" :class="{ active: $route.path=='/archiv'}">Archiv</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#status-bar {
  position: absolute;
  top: 0;
}
</style>
