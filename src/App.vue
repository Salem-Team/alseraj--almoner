<template>
    <!-- <nav class="ma-2">
        <router-link to="/">Home</router-link> |
        <router-link to="/Modifications">Modifications</router-link>|
        <span v-if="user">
            <router-link @click="logout" to="/UserLogin">Sign Out</router-link>
        </span>
        <span v-else>
            <router-link to="/UserLogin">Sign In</router-link>
        </span>
    </nav> -->
    <router-view />
</template>

<script>
import { useAuthStore } from "./store/userStore";
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
* {
    direction: rtl !important;
}
body {
    direction: rtl;
    font-family: "Cairo", sans-serif;
    font-variation-settings: "slnt" 0;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
}
:root {
    --main-color: #0088ff;
    --secound-color: #eee;
    --therd-color: #7a7a7a;
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
