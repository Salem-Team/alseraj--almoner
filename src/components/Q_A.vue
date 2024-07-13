<template>
    <div
        style="
            width: 100% !important;
            margin: auto;
            padding: 40px 0px;
            background: var(--secound-color);
        "
    >
        <div class="use">
            <div class="title">
                <div class="right">الأسئلة الشائعة</div>
            </div>
        </div>
        <v-infinite-scroll
            :height="300"
            :onLoad="load"
            width="95%"
            style="margin: auto"
        >
            <template v-for="i in 5" :key="i">
                <v-expansion-panels style="margin-bottom: 10px">
                    <v-expansion-panel
                        style="
                            color: var(--main-color);
                            font-weight: bold;
                            font-size: 20px;
                            padding: 10px;
                        "
                        title="Title"
                        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima"
                    >
                    </v-expansion-panel>
                </v-expansion-panels>
            </template>
            <template v-slot:loading> </template>
        </v-infinite-scroll>
    </div>
</template>
<script>
export default {
    data() {
        return {
            load: "Done",
        };
    },
};
</script>
<style lang="scss" scoped>
.use {
    width: fit-content !important;
    margin: auto;
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
</style>
