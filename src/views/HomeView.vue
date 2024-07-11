<template>
    <div>
        <div class="paralax">
            <div class="paralax_item p_item1"></div>
            <div class="paralax_item p_item2"></div>
            <div class="paralax_item p_item1"></div>
        </div>
        <div class="container">
            <div class="content_header">
                <h1>مدرسة السراج المنير</h1>
            </div>
        </div>
    </div>
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
});
</script>
<style lang="scss" scoped>
body {
    overflow: hidden;
}
.paralax {
    .paralax_item {
        width: 100%;
        height: 200vh;
        top: 0;
        left: 0;
    }
    .p_item1 {
        position: absolute;
        background: url("../assets/sky.jpg") center/cover no-repeat;
        width: 400%;
        z-index: -1000000;
        background-attachment: fixed;
    }
    .p_item2 {
        background: url("../assets/school_bus.png") bottom/100% no-repeat;
        width: 100%;
        background-position: center;
        z-index: 2;
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
