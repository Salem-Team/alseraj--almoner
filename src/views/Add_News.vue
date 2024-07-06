<template>
    <div class="use">
        <div class="title">
            <div class="right">
                <v-breadcrumbs>
                    <v-breadcrumbs-item @click="$router.push('/admin')" link>
                        الإشراف
                    </v-breadcrumbs-item>
                    <v-breadcrumbs-divider />
                    <v-breadcrumbs-item
                        @click="$router.push('/Modifications')"
                        link
                    >
                        الإعدادات
                    </v-breadcrumbs-item>
                    <v-breadcrumbs-divider />
                    <v-breadcrumbs-item @click="$router.push('/Add_News')" link>
                        الأخبار
                    </v-breadcrumbs-item>
                </v-breadcrumbs>
            </div>
            <div class="left">
                <font-awesome-icon
                    @click="dialog = true"
                    :icon="['fas', 'plus']"
                />
            </div>
        </div>

        <v-dialog v-model="dialog" width="90%">
            <v-card width="100%" class="popup">
                <v-card-title class="d-flex justify-space-between align-center">
                    <div class="text-h4 ps-2" style="color: var(--main-color)">
                        إضافة خبر
                    </div>
                    <v-btn
                        style="color: var(--main-color)"
                        icon="mdi-close"
                        variant="text"
                        @click="dialog = false"
                    ></v-btn>
                </v-card-title>
                <form ref="form" @submit.prevent class="ma-auto">
                    <v-text-field
                        v-model="New.title"
                        type="text"
                        label="عنوان"
                        variant="outlined"
                        required
                    ></v-text-field>

                    <v-file-input
                        v-model="New.image"
                        label="صورة"
                        accept="image/*"
                        variant="outlined"
                        prepend-icon=""
                        required
                        prepend-inner-icon="mdi-paperclip"
                        @click="news.upload_Image"
                    >
                    </v-file-input>
                    <!-- Show progress bar if New.image is truthy (assuming New is a data property) -->
                    <v-progress-linear
                        v-if="New.image"
                        :value="news.progress"
                        color="blue-grey"
                        height="25"
                    >
                        <template v-slot:default="{ value }">
                            <strong>{{ Math.ceil(value) }}%</strong>
                        </template>
                    </v-progress-linear>
                    <br />
                    <v-textarea
                        v-model="New.description"
                        label="وصف قصير"
                        :counter="150"
                        variant="outlined"
                        required
                    ></v-textarea>

                    <v-btn
                        class="d-flex align-center mt-4 mb-10"
                        type="submit"
                        color="primary"
                        @click="news.Add_News"
                    >
                        نشر
                    </v-btn>
                </form>
            </v-card></v-dialog
        >
        <v-dialog v-model="dialog_1" width="90%">
            <v-card width="100%" class="popup">
                <v-card-title class="d-flex justify-space-between align-center">
                    <div class="text-h4 ps-2" style="color: var(--main-color)">
                        تعديل خبر
                    </div>
                    <v-btn
                        style="color: var(--main-color)"
                        icon="mdi-close"
                        variant="text"
                        @click="dialog_1 = false"
                    ></v-btn>
                </v-card-title>
                <form ref="form" @submit.prevent class="ma-auto">
                    <v-text-field
                        v-model="news.Title_Information"
                        type="text"
                        label="عنوان"
                        variant="outlined"
                        required
                    ></v-text-field>

                    <v-img :src="news.Image_Information" height="200"></v-img>
                    <br />
                    <v-textarea
                        v-model="news.Description_Information"
                        label="وصف قصير"
                        :counter="150"
                        required
                        variant="outlined"
                    ></v-textarea>

                    <v-btn
                        class="d-flex align-center mt-4 mb-10"
                        type="submit"
                        color="primary"
                        @click="news.Update_News(news.Id_Information)"
                    >
                        تعديل
                    </v-btn>
                </form>
            </v-card>
        </v-dialog>
        <v-container
            class="box d-flex align-center justify-space-around"
            width="90%"
        >
            <v-card v-for="New in News" :key="New.id" width="25%">
                <v-img :src="New.image" height="200" cover></v-img>

                <v-card-title
                    class="d-flex align-center justify-center flex-wrap"
                >
                    <p>{{ New.title }}</p>
                    <v-spacer />
                    <div class="ma-2">
                        <font-awesome-icon
                            @click="news.New_Information(New)"
                            :icon="['fas', 'edit']"
                            @click.="dialog_1 = true"
                        />
                    </div>
                    <div>
                        <font-awesome-icon
                            @click="news.delete_New(New.id, New.image)"
                            :icon="['fas', 'trash']"
                        />
                    </div>
                </v-card-title>

                <v-card-subtitle>
                    {{ New.time }}
                </v-card-subtitle>

                <v-card-text>{{ New.description }} </v-card-text>
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
        const {
            New,
            News,
            Add_News,
            dialog,
            dialog_1,
            delete_New,
            Get_data,
            upload_Image,
            New_Information,
            progress,
        } = storeToRefs(news);

        // Return the necessary reactive properties and methods
        return {
            New,
            Add_News,
            delete_New,
            New_Information,
            Get_data,
            upload_Image,
            news,
            dialog,
            dialog_1,
            progress,
            News,
        };
    },
});
</script>
<style lang="scss" scoped>
form {
    width: 90%;
    margin: auto;
}

.use {
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
            }
        }
    }
}
.box {
    flex-wrap: wrap;
    gap: 10px;
}
</style>
