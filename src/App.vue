<template>
    <div class="main_header">
        <nav>
            <div>
                <router-link class="a" to="/">الرئيسية</router-link>
            </div>
            <div>
                <router-link class="a" to="/admin">لوحة الاشراف</router-link>
            </div>
            <div v-if="user">
                <router-link class="a" to="/Parent_Dashboard"
                    >الملف الشخصي</router-link
                >
            </div>
            <div>
                <router-link
                    class="a"
                    v-if="user"
                    @click="logout"
                    to="/UserLogin"
                    >تسجيل خروج</router-link
                >
                <router-link class="a" v-else to="/UserLogin"
                    >تسجيل دخول</router-link
                >
            </div>
        </nav>
    </div>
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
@import url("https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap");
* {
    direction: rtl !important;
    // transition: 0.3s;
    // letter-spacing: normal !important;
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
    --therd-color: #7a7a7a;
    --pink-color: #d8588c;
}
.main_header {
    padding: 0px 30px;
    background-color: white;
    -webkit-box-shadow: 0 0 10px #ddd;
    -moz-box-shadow: 0 0 10px #ddd;
    box-shadow: 0 0 10px #ddd;
    nav {
        display: flex;
        align-items: center;
        gap: 30px;
        flex-flow: wrap;
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 72px;
            position: relative;
            overflow: hidden;
            font-size: 18px;
            transition: 0.3s;
            &:hover {
                opacity: 1;
                z-index: 100;
                top: calc(100% + 1px);
            }
        }
        .a {
            text-decoration: none;
        }
        .container::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 4px;
            background-color: var(--main-color);
            top: 0;
            left: -100%;
            transition: 0.3s;
        }
    }
}
.v-overlay__scrim {
    background: rgb(0 0 0 / 36%) !important;
}

.v-container,
.container {
    width: 90% !important;
    max-width: 90% !important;
    margin: 0 auto;
    & > div {
        flex-grow: 1;
    }
}

a {
    color: var(--main-color);
    font-weight: bold;
}
</style>
