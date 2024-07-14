<template>
    <div style="width: 100% !important; margin: auto; padding: 40px 0px">
        <!-- News Section -->
        <div class="use">
            <div class="title">
                <div class="right">الأخبار</div>
            </div>
        </div>

        <!-- News Cards Container -->
        <v-container class="box d-flex align-center justify-space-around">
            <!-- News Card Loop -->
            <v-card
                class="feat"
                v-for="New in News"
                :key="New.id"
                width="100%"
                max-width="25%"
            >
                <!-- Image -->
                <v-img :src="New.image" height="300" cover></v-img>

                <!-- Title -->
                <v-card-text
                    class="card_title d-flex justify-center flex-wrap"
                    style="z-index: 100"
                >
                    {{ New.title }}
                </v-card-text>

                <!-- Time -->
                <v-card-subtitle style="margin-top: 20px">
                    {{ New.time }}
                </v-card-subtitle>

                <!-- Description -->
                <v-card-text>
                    <p style="color: var(--therd-color) !important">
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
        // Access the News store
        const news = useNews();

        // Initialize or fetch data on component setup
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
    width: fit-content !important;
    margin: auto;

    /* Title Styling */
    .title {
        text-transform: uppercase;
        color: var(--main-color);
        margin: 0 auto 80px;
        border: 2px solid var(--main-color);
        padding: 10px 20px;
        font-size: 30px;
        width: fit-content;
        position: relative;
        z-index: 1;
        transition: 0.3s;
    }

    /* Title Pseudo-elements */
    .title::before {
        content: "";
        width: 12px;
        height: 12px;
        background-color: var(--main-color);
        position: absolute;
        border-radius: 50%;
        top: 50%;
        right: -30px;
        transform: translateY(-50%);
    }
    .title::after {
        content: "";
        width: 12px;
        height: 12px;
        background-color: var(--main-color);
        position: absolute;
        border-radius: 50%;
        top: 50%;
        left: -30px;
        transform: translateY(-50%);
    }
    .title:hover::before {
        z-index: -1;
        animation: right-move 0.5s linear forwards;
    }
    .title:hover::after {
        z-index: -1;
        animation: left-move 0.5s linear forwards;
    }
    .title:hover {
        color: white;
        border: 2px solid white;
        transition-delay: 0.5s;
    }
}

/* Box and Card Styling */
.box {
    flex-wrap: wrap !important;
    gap: 10px !important;
    align-items: stretch !important;
}
.card_title {
    color: var(--main-color);
    margin: auto;
    width: fit-content;
    border-bottom: 2px solid var(--main-color);
    font-weight: bold;
    font-size: 20px;
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

/* Media Queries */
@media (min-width: 769px) {
    .v-container {
        flex-direction: row;
        gap: 15px;
        align-items: stretch !important;
    }

    .feat {
        width: 32% !important;
    }
}

/* Keyframe Animations */
@keyframes left-move {
    50% {
        left: 0;
        width: 12px;
        height: 12px;
    }
    100% {
        left: 0;
        border-radius: 0;
        width: 50%;
        height: 100%;
    }
}
@keyframes right-move {
    50% {
        right: 0;
        width: 12px;
        height: 12px;
    }
    100% {
        right: 0;
        border-radius: 0;
        width: 50%;
        height: 100%;
    }
}

/* Button Styling */
.btn {
    margin: auto !important;
    text-align: center;
    margin-top: 40px !important;
}
</style>
