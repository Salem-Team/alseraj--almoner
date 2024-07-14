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
        <div class="use">
            <div class="title">
                <div class="right">
                    <v-breadcrumbs>
                        <v-breadcrumbs-item
                            @click="$router.push('/admin')"
                            link
                        >
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
                        <v-breadcrumbs-item
                            @click="$router.push('/Photo_Gallery')"
                            link
                        >
                            معرض الصور
                        </v-breadcrumbs-item>
                    </v-breadcrumbs>
                </div>
            </div>
        </div>
        <v-card rounded="0" flat>
            <v-window v-model="onboarding">
                <!-- Section 1: Add Photo -->
                <v-window-item :value="1">
                    <div
                        class="d-flex flex-column justify-center align-center"
                        min-height="400"
                    >
                        <div
                            class="text-medium-emphasis mb-1 mt-4"
                            style="
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                                width: 90%;
                                min-height: 450px;
                                border-radius: 20px;
                                border: 3px dashed #777;
                            "
                        >
                            <div
                                class="d-flex flex-column"
                                style="
                                    flex-wrap: wrap;
                                    width: 100%;
                                    justify-content: center !important;
                                    align-items: center !important;
                                "
                            >
                                <div>
                                    <font-awesome-icon
                                        v-if="!photos.Photo.image"
                                        icon="image"
                                        size="2xl"
                                        style="
                                            color: var(--main-color);
                                            width: 150px;
                                            height: 150px;
                                        "
                                    />
                                </div>
                                <div
                                    class="mt-10 d-flex flex-column"
                                    style="
                                        width: 80%;
                                        justify-content: center !important;
                                        align-content: center !important;
                                        align-items: center !important;
                                    "
                                >
                                    <div
                                        style="
                                            width: 50%;
                                            text-align: center !important;
                                            margin: auto !important;
                                        "
                                    >
                                        <label
                                            class="custom_label"
                                            style="
                                                width: 200px;
                                                position: relative;
                                                background: #eee;
                                                border-radius: 7px;
                                                margin-top: 10px;
                                                text-align: center !important;
                                                margin: auto !important;
                                            "
                                        >
                                            <v-file-input
                                                style="width: 100%"
                                                v-model="photos.Photo.image"
                                                label="صورة"
                                                accept="image/*"
                                                variant="outlined"
                                                prepend-icon=""
                                                prepend-inner-icon="mdi-paperclip"
                                                @change="photos.onFileChange"
                                                required
                                                :rules="[
                                                    (v) =>
                                                        !!v ||
                                                        'الرجاء اختيار صورة',
                                                ]"
                                            >
                                            </v-file-input>
                                            <span
                                                style="
                                                    font-family: 'Cairo',
                                                        sans-serif;
                                                    font-size: 18px;
                                                    margin-right: 15px;
                                                    text-align: center !important;
                                                "
                                            >
                                                تصفح صورك
                                            </span>
                                            <!-- Show progress bar if photos.Photo.image is truthy (assuming photos is a data property) -->
                                            <v-progress-linear
                                                v-if="photos.Photo.image"
                                                :value="progress"
                                                color="blue-grey"
                                                height="25"
                                            >
                                                <template
                                                    v-slot:default="{ value }"
                                                >
                                                    <strong
                                                        >{{
                                                            Math.ceil(value)
                                                        }}%</strong
                                                    >
                                                </template>
                                            </v-progress-linear>
                                            <br />
                                        </label>
                                        <v-img
                                            v-if="photos.Photo.image"
                                            :src="photos.image"
                                            height="200"
                                        ></v-img>

                                        <v-select
                                            style="width: 100%"
                                            v-model="photos.type"
                                            :items="photos.Types"
                                            label="أختر نوع الصورة"
                                            variant="outlined"
                                            @blur="photos.handletypes"
                                            @click="photos.handletypes"
                                            required
                                            :rules="[
                                                (v) =>
                                                    !!v ||
                                                    'الرجاء اختيار نوع الصورة',
                                            ]"
                                        ></v-select>

                                        <v-btn
                                            class="mt-2 mb-2"
                                            type="submit"
                                            style="
                                                background-color: var(
                                                    --main-color
                                                );
                                                color: white;
                                            "
                                            :loading="loading"
                                            :disabled="loading"
                                            @click="photos.Add_Photos"
                                        >
                                            إضافة
                                        </v-btn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-window-item>

                <!-- Section 2: Display Photos -->
                <v-window-item :value="2">
                    <v-card
                        min-height="400"
                        width="95% !important"
                        style="margin: auto; margin-top: 20px"
                    >
                        <v-tabs
                            v-model="tab"
                            style="
                                background-color: var(--main-color);
                                color: white;
                            "
                        >
                            <v-tab value="party">حفلات</v-tab>
                            <v-tab value="news">أخبار</v-tab>
                            <v-tab value="trip">رحلات</v-tab>
                        </v-tabs>

                        <v-card-text>
                            <v-tabs-window v-model="tab">
                                <v-tabs-window-item value="party">
                                    <v-container
                                        class="box d-flex align-center justify-space-around"
                                        width="90%"
                                    >
                                        <v-card
                                            v-for="photo in party"
                                            :key="photo.id"
                                            width="200px"
                                            max-width="25%"
                                        >
                                            <v-fab
                                                icon="mdi-delete"
                                                location="top right"
                                                size="40"
                                                absolute
                                                style="bottom: -15px; left: 5px"
                                                offset
                                                @click="photos.dailog_3 = true"
                                            ></v-fab>
                                            <v-img
                                                :src="photo.image"
                                                height="200"
                                                cover
                                            ></v-img>
                                        </v-card>
                                    </v-container>
                                </v-tabs-window-item>

                                <v-tabs-window-item value="news">
                                    <v-container
                                        class="box d-flex align-center justify-space-around"
                                        width="90%"
                                    >
                                        <v-card
                                            v-for="photo in news"
                                            :key="photo.id"
                                            width="200px"
                                            max-width="25%"
                                        >
                                            <v-fab
                                                icon="mdi-delete"
                                                location="top right"
                                                size="40"
                                                absolute
                                                style="bottom: -15px; left: 5px"
                                                offset
                                                @click="photos.dailog_3 = true"
                                            ></v-fab>
                                            <v-img
                                                :src="photo.image"
                                                height="200"
                                                cover
                                            ></v-img>
                                        </v-card>
                                    </v-container>
                                </v-tabs-window-item>

                                <v-tabs-window-item value="trip">
                                    <v-container
                                        class="box d-flex align-center justify-space-around"
                                        width="90%"
                                    >
                                        <v-card
                                            v-for="photo in trip"
                                            :key="photo.id"
                                            width="200px"
                                            max-width="25%"
                                        >
                                            <v-fab
                                                icon="mdi-delete"
                                                location="top right"
                                                size="40"
                                                absolute
                                                style="bottom: -15px; left: 5px"
                                                offset
                                                @click="photos.dailog_3 = true"
                                            ></v-fab>
                                            <v-img
                                                :src="photo.image"
                                                height="200"
                                                cover
                                            ></v-img>
                                        </v-card>
                                    </v-container>
                                </v-tabs-window-item>
                            </v-tabs-window>
                        </v-card-text>
                    </v-card>
                </v-window-item>
            </v-window>
            <!-- Navigation Buttons -->

            <v-card-actions class="justify-center">
                <v-item-group
                    v-model="onboarding"
                    class="text-center"
                    mandatory
                >
                    <v-item
                        v-for="n in length"
                        :key="`btn-${n}`"
                        v-slot="{ isSelected, toggle }"
                        :value="n"
                    >
                        <v-btn
                            :variant="isSelected ? 'outlined' : 'text'"
                            icon="mdi-record"
                            @click="toggle"
                        ></v-btn>
                    </v-item>
                </v-item-group>
            </v-card-actions>
        </v-card>
    </div>
    <v-dialog v-model="photos.dailog_3" width="90%">
        <v-card width="100%" class="popup">
            <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h4 ps-2" style="color: var(--main-color)">
                    حذف
                </div>
                <v-btn
                    style="color: var(--main-color)"
                    icon="mdi-close"
                    variant="text"
                    @click="photos.dailog_3 = false"
                ></v-btn>
            </v-card-title>
            <v-card-text>
                <p>تأكيد الحذف</p>
                <div class="d-flex align-center mt-4">
                    <v-btn
                        type="submit"
                        color="primary"
                        :loading="loading"
                        :disabled="loading"
                        @click="photos.dailog_3 = false"
                    >
                        إلغاء
                    </v-btn>
                    <v-spacer />
                    <v-btn
                        type="submit"
                        color="error"
                        :loading="loading"
                        :disabled="loading"
                        @click="photos.delete_Photo(photo.id, photo.image)"
                    >
                        تأكيد
                    </v-btn>
                </div>
            </v-card-text>
        </v-card></v-dialog
    >
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
            dialog_3,
            loading,
            Photos,
            Add_Photos,
            dialog,
            delete_Photo,
            Get_data,
            upload_Image,
            type,
            Types,
            handletypes,
            loading1,
            tab,
            image,
            onFileChange,
            trip,
            progress,
            party,
            news,
        } = storeToRefs(photos);

        // Return the necessary reactive properties and methods
        return {
            Photo,
            dialog_3,
            loading,
            onFileChange,
            loading1,
            image,
            handletypes,
            Add_Photos,
            delete_Photo,
            Get_data,
            progress,
            upload_Image,
            photos,
            dialog,
            type,
            Types,
            Photos,
            tab,
            trip,
            party,
            news,
        };
    },
    data: () => ({
        length: 2,
        onboarding: 1,
    }),

    methods: {
        next() {
            this.onboarding =
                this.onboarding + 1 > this.length ? 1 : this.onboarding + 1;
        },
        prev() {
            this.onboarding =
                this.onboarding - 1 <= 0 ? this.length : this.onboarding - 1;
        },
    },
});
</script>
<style lang="scss" scoped>
form {
    width: 50%;
    margin: auto;
}
.feat {
    gap: 10px;
    display: flex;
    align-items: center;
    align-content: center;
    flex-direction: row !important;
    .number {
        background-color: var(--secound-color);
        font-size: 25px;
        font-weight: bold;
        padding-top: 3px;
        padding-left: 5px;
        padding-right: 5px;
        color: var(--main-color);
    }
    .title {
        color: var(--therd-color);
        font-weight: bold;
    }
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
