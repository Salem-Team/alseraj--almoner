<template>
<<<<<<< HEAD
    <div class="main_header">
        <nav class="ma-2">
            <router-link class="a" to="/">Home</router-link>
            <router-link class="a" to="/admin">لوحة الاشراف</router-link>

            <router-link class="a" v-if="user" @click="logout" to="/UserLogin"
                >Sign Out</router-link
            >
            <router-link class="a" v-else to="/UserLogin">Sign In</router-link>
=======
    <div>
        <nav class="ma-2">
            <router-link to="/">Home</router-link> |
            <router-link to="/admin">لوحة الاشراف</router-link>|
            <span v-if="user">
                <router-link @click="logout" to="/UserLogin"
                    >Sign Out</router-link
                >
            </span>
            <span v-else>
                <router-link to="/UserLogin">Sign In</router-link>
            </span>
>>>>>>> ca7a465 (add Add_admin , admin , img)
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
    transition: 0.3s;
    letter-spacing: normal !important;
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
    --main-color: #336699;
    --secound-color: #eee;
<<<<<<< HEAD
    --therd-color: #d8588c;
=======
    --therd-color: #7a7a7a;
    --pink-color: #d8588c;
>>>>>>> ca7a465 (add Add_admin , admin , img)
}
nav {
    padding: 30px;
    background-color: white;
    -webkit-box-shadow: 0 0 10px #ddd;
    -moz-box-shadow: 0 0 10px #ddd;
    box-shadow: 0 0 10px #ddd;
    display: flex;
    align-items: center;
    gap: 30px;
    flex-flow: wrap;
    &:hover {
        opacity: 1;
        z-index: 100;
        top: calc(100% + 1px);
    }
    .a {
        text-decoration: none;
        &::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 4px;
            background-color: var(--main-color);
            top: 0;
            left: -100%;
            transition: 0.3s;
        }
        &:hover {
            color: var(--main-color);
            background-color: #fafafa;
        }
        &:hover::before {
            left: 0;
        }
    }
}
.v-container {
    width: 90% !important;
    max-width: 90% !important;
}
</style>
