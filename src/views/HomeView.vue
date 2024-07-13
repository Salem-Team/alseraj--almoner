<template>
    <section class="parallax">
        <h1 id="text">مدرسة السراج المنير</h1>
        <img
            style="filter: grayscale(1)"
            src="../assets/gate-left.png"
            id="gate-left"
        />
        <img
            style="filter: grayscale(1)"
            src="../assets/gate-right.png"
            id="gate-right"
        />
        <img
            style="filter: grayscale(1)"
            src="../assets/tree-left.png"
            id="tree-left"
        />
        <img
            style="filter: grayscale(1)"
            src="../assets/tree-right.png"
            id="tree-right"
        />
        <img
            style="filter: grayscale(1) !important"
            src="../assets/grass.png"
            id="grass"
        />
    </section>
    <div visible>
        <Photo_Gallery_data />
        <News_data />
        <Q_A />
        <job_data />
    </div>
    <v-layout class="footer" visible>
        <v-footer
            class="d-flex flex-column"
            style="width: 100% !important; margin: auto; padding: 0px"
        >
            <div
                class="d-flex w-100 align-center px-4"
                style="background: var(--main-color); color: white"
            >
                <strong>تواصل معنا من خلال مواقع التواصل الاجتماعي</strong>

                <v-spacer></v-spacer>

                <v-btn
                    v-for="icon in icons"
                    :key="icon"
                    :icon="icon"
                    class="mx-4"
                    size="small"
                    variant="plain"
                ></v-btn>
            </div>

            <div
                class="px-4 py-2 text-center w-100"
                style="background: var(--secound-color)"
            >
                <strong>سالم تيم</strong> - {{ new Date().getFullYear() }}
            </div>
        </v-footer>
    </v-layout>
</template>

<script>
import job_data from "../components/job_data.vue";
import News_data from "../components/News_data.vue";
import Q_A from "../components/Q_A.vue";
import Photo_Gallery_data from "../components/Photo_Gallery_data.vue";
import { defineComponent } from "vue";
export default defineComponent({
    components: {
        job_data,
        Q_A,
        News_data,
        Photo_Gallery_data,
    },

    data() {
        return {
            icons: [
                "mdi-facebook",
                "mdi-twitter",
                "mdi-linkedin",
                "mdi-instagram",
            ],
        };
    },
    mounted() {
        this.moveText();
    },
    methods: {
        moveText() {
            let text = document.getElementById("text");
            let tree_left = document.getElementById("tree-left");
            let tree_right = document.getElementById("tree-right");
            let gate_left = document.getElementById("gate-left");
            let gate_right = document.getElementById("gate-right");
            window.addEventListener("scroll", () => {
                let value = window.scrollY;
                text.style.marginTop = value * 1.5 + `px`;
                tree_left.style.left = value * -1.5 + `px`;
                tree_right.style.left = value * 1.5 + `px`;
                gate_left.style.left = value * 0.3 + `px`;
                gate_right.style.left = value * -0.3 + `px`;
            });
        },
    },
});
</script>
<style lang="scss" scoped>
body {
    overflow: hidden;
}
.parallax {
    position: relative;
    height: 130vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("../assets/sky.jpg") no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    overflow: hidden;
    #text {
        position: absolute;
        font-size: 5em;
        color: #1b283a;
        text-shadow: 2px 4px 5px #f9f9f9;
    }
    img {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
    }
    #gate-left {
        position: absolute;
        transform: translateX(-282px);
    }
    #gate-right {
        position: absolute;
        transform: translateX(305px);
    }
}
.content_header {
    color: white;
    width: 100%;
    position: relative;
    bottom: 720px;
    right: 910px;
    z-index: -1887;
    background-attachment: fixed;
}
form {
    width: 90%;
    margin: auto;
}

.use {
    width: 95% !important;
    margin: auto;
    .title {
        margin-top: 40px;
        background: var(--secound-color);
        padding: 15px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 3px;
        border-radius: 5px;
        color: var(--main-color);
        font-weight: bold;
        font-size: 20px;
        & > div {
            display: flex;
            align-items: center;
            gap: 4px;
            &.left {
                .icon,
                svg {
                    cursor: pointer;
                    transition: 0.3s;
                    background: #fff;
                    padding: 10px;
                    border-radius: 5px;
                    &:hover {
                        color: var(--therd-color);
                    }
                }
                .icon {
                    padding: 20px;
                }
            }
        }
    }
}
.job {
    width: 100% !important;
    margin-bottom: 10px;
    .title {
        background: var(--main-color);
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 5px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        font-size: 20px;
        & > div {
            display: flex;
            align-items: center;
            gap: 10px;
            &.left {
                svg {
                    color: var(--main-color);
                    cursor: pointer;
                    transition: 0.3s;
                    background: #fff;
                    padding: 10px;
                    border-radius: 5px;
                    &:hover {
                        color: var(--therd-color);
                    }
                }
            }
        }
    }
}
.box {
    width: 95% !important;
    margin: 0 auto;
    padding: 10px 0px;
}
.visible {
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;
}
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
