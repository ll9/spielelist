<template>
  <div class="home">
    <Menu />
    <HelloWorld/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Menu from './Menu.vue';

@Component({
  components: {
    HelloWorld,
    Menu,
  },
})
export default class Home extends Vue {}
</script>
