<template>
    <img
        style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 245px;
        "
        v-if="loading1"
        src="../assets/Spinner@1x-1.0s-200px-200px.svg"
        alt=""
    />
    <div v-if="!loading1">
        <Photo_Gallery_data />
        <News_data />
        <job_data />
    </div>
    <v-layout class="footer">
        <v-footer class="d-flex flex-column w-100">
            <div
                class="d-flex w-100 align-center px-4"
                style="background: var(--main-color); color: white"
            >
                <strong>Get connected with us on social networks!</strong>

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
import Photo_Gallery_data from "../components/Photo_Gallery_data.vue";
export default {
    components: {
        job_data,
        News_data,
        Photo_Gallery_data,
    },

    data: () => ({
        icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    }),
};
</script>

<style lang="scss" scoped>
.footer {
    width: 100% !important;
    padding: 0px !important;
    margin: 0px !important;
}
</style>
