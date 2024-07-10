<template>
    <div>
        <nav class="ma-2">
            <router-link to="/">Home</router-link> |
            <router-link to="/admin">لوحة الاشراف</router-link>|

            <router-link v-if="user" @click="logout" to="/UserLogin"
                >Sign Out</router-link
            >
            <router-link v-else to="/UserLogin">Sign In</router-link>
        </nav>
        <router-view />
    </div>
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
@import url("https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap");
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
