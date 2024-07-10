<template>
    <div>
        <div class="use">
            <div class="title">
                <div class="right">الأخبار</div>
            </div>
        </div>
        <v-container
            class="box d-flex align-center justify-space-around"
            width="90%"
        >
            <v-card
                v-for="New in News"
                :key="New.id"
                width="300"
                max-width="25%"
            >
                <v-img :src="New.image" height="300" cover></v-img>

                <v-card-title
                    class="card_title d-flex justify-center flex-wrap"
                    style="
                        bacground-color: transparent !important;
                        border: none !important;
                    "
                >
                    <p style="z-index: 100">
                        {{ New.title }}
                    </p>
                </v-card-title>

                <v-card-subtitle style="color: var(--therd-color) !important">
                    {{ New.time }}
                </v-card-subtitle>

                <v-card-text
                    ><p style="color: var(--main-color) !important">
                        {{ New.description }}
                    </p>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>
<script>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useNews } from "@/store/News.js";
export default defineComponent({
    setup() {
        const news = useNews();
        news.Get_data();
        // Destructure reactive references and methods from News store
        const { New, loading, loading1, Get_data, News } = storeToRefs(news);

        // Return the necessary reactive properties and methods
        return {
            New,
            loading,
            loading1,
            Get_data,
            news,
            News,
        };
    },
});
</script>
<style lang="scss" scoped>
.use {
    width: 94% !important;
    margin: auto;
    .title {
        margin-top: 40px;
        background: var(--secound-color);
        padding: 15px 20px;
        display: flex;
        align-items: start;
        justify-content: space-between;
        gap: 3px;
        border-radius: 5px;
        color: var(--main-color);
        font-weight: bold;
        font-size: 20px;
    }
}
.box {
    flex-wrap: wrap !important;
    gap: 10px !important;
}
.card_title {
    margin-bottom: 15px;
    color: var(--main-color);
    p {
        font-weight: bold;
        font-size: 20px;
    }
}
.v-img::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    border-style: solid;
    border-width: 0px 0px 130px 300px;
    border-color: transparent transparent white transparent;
    transition: 0.3s;
}
.v-card:hover .v-img::before {
    border-width: 0px 580px 270px 0;
}
.v-card {
    text-align: center !important;
}
</style>
