<template>
  <nav class="ma-2">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <span v-if="user">
      <router-link @click="logout" to="/UserLogin">Sign Out</router-link>
    </span>
    <span v-else>
      <router-link to="/UserLogin">Sign In</router-link>
    </span>
  </nav>
  <router-view />
</template>

<script>
import { useAuthStore } from "./stores/userStore";
import { mapActions, mapState } from "pinia";

export default {
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["logout"]),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
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
