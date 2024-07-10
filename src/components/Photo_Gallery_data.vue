<template>
    <div>
        <div class="use">
            <div class="title">
                <div class="right">معرض الصور</div>
            </div>
        </div>
        <v-container
            class="box d-flex align-center justify-space-around"
            width="90% !important"
        >
            <v-card
                class="card"
                v-for="photo in Photos"
                :key="photo.id"
                width="300px"
                max-width="25%"
            >
                <v-img :src="photo.image" height="300" cover></v-img>
            </v-card>
        </v-container>
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
    flex-wrap: wrap;
    gap: 10px;
    background: var(--secound-color);
}
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
        max-width: 100%;
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
</style>
