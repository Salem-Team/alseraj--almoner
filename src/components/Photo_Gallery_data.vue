<template>
    <div
        style="
            width: 100% !important;
            margin: auto;
            background: var(--secound-color);
            padding: 40px 0px;
        "
    >
        <div class="use">
            <div class="title">
                <div class="right">معرض الصور</div>
            </div>
        </div>
        <div class="box d-flex align-center justify-space-around">
            <v-card
                class="card"
                v-for="photo in Photos"
                :key="photo.id"
                width="400px"
                max-width="25%"
            >
                <v-img :src="photo.image" height="300" cover></v-img>
            </v-card>
        </div>
    </div>
</template>
<script>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { usePhoto_Gallery } from "@/store/Photo_Gallery.js";
export default defineComponent({
    setup() {
        const photos = usePhoto_Gallery();
        photos.Get_data();
        // Destructure reactive references and methods from Photos store
        const {
            Photo,
            loading,
            Photos,
            Add_Photos,
            Get_data,
            loading1,
            image,
        } = storeToRefs(photos);

        // Return the necessary reactive properties and methods
        return {
            Photo,
            loading,
            Photos,
            Add_Photos,
            Get_data,
            loading1,
            image,
            photos,
        };
    },
});
</script>
<style lang="scss" scoped>
.box {
    flex-wrap: wrap !important;
    gap: 10px !important;
}
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
.card {
    border: 20px solid white;
    overflow: hidden;
    -webkit-box-shadow: 0 0 20px #ddd;
    -moz-box-shadow: 0 0 20px #ddd;
    box-shadow: 0 0 20px #ddd;
    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgb(255 255 255 / 20%);
        width: 0;
        height: 0;
        opacity: 0;
        z-index: 2;
    }
    &:hover::before {
        animation: flashing 0.7s;
    }
    .v-img {
        transition: 0.3s;
    }
    &:hover .v-img {
        transform: rotate(5deg) scale(1.1);
    }
}
@keyframes flashing {
    0%,
    40% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        width: 200%;
        height: 200%;
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
