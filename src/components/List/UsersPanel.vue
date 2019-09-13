<template>
  <div class="grid-container">
    <div v-for="user in users" :key="user.id">
      <p>{{user.name}}</p>
      <button @click="removeUser(user.id)">-</button>
    </div>
    <div v-if="users.length < 4">
      <button @click="addUser">+</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => {
    return {
      users: [
        {
          id: 1,
          name: 'Hans',
        },
      ],
    };
  },
  methods: {
    addUser() {
      const user = prompt('Username');
      if (user) {
        this.users.push({ id: this.users.length + 1, name: user });
      }
    },
    removeUser(id: any) {
        const index = this.users.findIndex((u) => u.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
    },
  },
  components: {},
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
