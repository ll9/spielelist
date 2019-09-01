<template>
  <div id="app">
    <Menu />
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Menu from './views/Menu.vue';

export default Vue.extend({
  components: {
    Menu,
  },
});
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
