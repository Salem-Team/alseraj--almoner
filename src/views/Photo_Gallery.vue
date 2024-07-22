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
        <Offline_error>
            <template v-slot:default>
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
                                                        v-if="
                                                            photos.types ==
                                                            'صورة'
                                                        "
                                                        style="width: 100%"
                                                        v-model="
                                                            photos.Photo.image
                                                        "
                                                        label="صورة"
                                                        accept="image/*"
                                                        variant="outlined"
                                                        prepend-icon=""
                                                        prepend-inner-icon="mdi-paperclip"
                                                        @change="
                                                            photos.onFileChange
                                                        "
                                                        required
                                                        :rules="[
                                                            (v) =>
                                                                !!v ||
                                                                'الرجاء اختيار صورة',
                                                        ]"
                                                    >
                                                    </v-file-input>
                                                    <v-file-input
                                                        v-if="
                                                            photos.types ==
                                                            'فيديو'
                                                        "
                                                        style="width: 100%"
                                                        v-model="
                                                            photos.Photo.video
                                                        "
                                                        label="فيديو"
                                                        accept="mp4"
                                                        variant="outlined"
                                                        prepend-icon=""
                                                        prepend-inner-icon="mdi-paperclip"
                                                        @change="
                                                            photos.on_Video_Change
                                                        "
                                                        required
                                                        :rules="[
                                                            (v) =>
                                                                !!v ||
                                                                'الرجاء اختيار فيديو',
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
                                                        v-if="
                                                            photos.Photo.image
                                                        "
                                                        :value="progress"
                                                        color="blue-grey"
                                                        height="25"
                                                    >
                                                        <template
                                                            v-slot:default="{
                                                                value,
                                                            }"
                                                        >
                                                            <strong
                                                                >{{
                                                                    Math.ceil(
                                                                        value
                                                                    )
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
                                                <video
                                                    v-if="photos.Photo.video"
                                                    width="320"
                                                    height="240"
                                                    controls
                                                >
                                                    <source
                                                        :src="photos.video"
                                                        type="video/mp4"
                                                    />

                                                    Your browser does not
                                                    support the video tag.
                                                </video>
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
                                                <v-select
                                                    style="width: 100%"
                                                    v-model="photos.types"
                                                    :items="['صورة', 'فيديو']"
                                                    label="أختر النوع "
                                                    variant="outlined"
                                                    required
                                                    :rules="[
                                                        (v) =>
                                                            !!v ||
                                                            'الرجاء اختيار النوع ',
                                                    ]"
                                                ></v-select>
                                                <v-btn
                                                    v-if="
                                                        photos.types == 'صورة'
                                                    "
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
                                                    إضافة صورة
                                                </v-btn>
                                                <v-btn
                                                    v-if="
                                                        photos.types == 'فيديو'
                                                    "
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
                                                    @click="photos.Add_Video"
                                                >
                                                    إضافة فيديو
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
                                    <v-tab value="all" @click="photos.show_Data"
                                        >الكل</v-tab
                                    >
                                    <v-tab
                                        value="party"
                                        @click="photos.show_Data"
                                        >حفلات</v-tab
                                    >
                                    <v-tab
                                        value="news"
                                        @click="photos.show_Data"
                                        >أخبار</v-tab
                                    >
                                    <v-tab
                                        value="trip"
                                        @click="photos.show_Data"
                                        >رحلات</v-tab
                                    >
                                </v-tabs>

                                <v-card-text>
                                    <v-tabs-window v-model="tab">
                                        <v-tabs-window-item value="party">
                                            <Empty_error
                                                v-if="empty3 === true"
                                                :text="text3"
                                            />
                                            <v-container
                                                v-if="
                                                    (!loading1,
                                                    empty3 === false)
                                                "
                                                class="box d-flex align-center justify-space-around"
                                                width="90%"
                                            >
                                                <v-card
                                                    v-for="photo in Photos"
                                                    :key="photo.id"
                                                    width="200px"
                                                    max-width="25%"
                                                    @click.="
                                                        photos.photo_Information(
                                                            photo
                                                        )
                                                    "
                                                    @click="dialog_6 = true"
                                                >
                                                    <v-fab
                                                        icon="mdi-delete"
                                                        location="top right"
                                                        size="40"
                                                        absolute
                                                        style="
                                                            bottom: -15px;
                                                            left: 5px;
                                                        "
                                                        offset
                                                        @click="
                                                            photos.dialog_3 = true
                                                        "
                                                    ></v-fab>
                                                    <v-img
                                                        v-if="
                                                            photo.File_type ==
                                                            'صورة'
                                                        "
                                                        :src="photo.image"
                                                        height="200"
                                                        cover
                                                    ></v-img>
                                                    <video
                                                        v-if="
                                                            photo.File_type ==
                                                            'فيديو'
                                                        "
                                                        width="320"
                                                        height="240"
                                                        controls
                                                    >
                                                        <source
                                                            :src="photo.video"
                                                            type="video/mp4"
                                                        />

                                                        Your browser does not
                                                        support the video tag.
                                                    </video>
                                                </v-card>
                                            </v-container>
                                        </v-tabs-window-item>

                                        <v-tabs-window-item value="all">
                                            <Empty_error
                                                v-if="empty === true"
                                                :text="text0"
                                            />
                                            <v-container
                                                v-if="
                                                    (!loading1, empty === false)
                                                "
                                                class="box d-flex align-center justify-space-around"
                                                width="90%"
                                            >
                                                <v-card
                                                    v-for="photo in Photos"
                                                    :key="photo.id"
                                                    width="200px"
                                                    max-width="25%"
                                                    @click.="
                                                        photos.photo_Information(
                                                            photo
                                                        )
                                                    "
                                                    @click="dialog_6 = true"
                                                >
                                                    <v-fab
                                                        icon="mdi-delete"
                                                        location="top right"
                                                        size="40"
                                                        absolute
                                                        style="
                                                            bottom: -15px;
                                                            left: 5px;
                                                        "
                                                        offset
                                                        @click="
                                                            photos.dialog_3 = true
                                                        "
                                                    ></v-fab>
                                                    <v-img
                                                        v-if="
                                                            photo.File_type ==
                                                            'صورة'
                                                        "
                                                        :src="photo.image"
                                                        height="200"
                                                        cover
                                                    ></v-img>
                                                    <video
                                                        v-if="
                                                            photo.File_type ==
                                                            'فيديو'
                                                        "
                                                        width="320"
                                                        height="240"
                                                        controls
                                                    >
                                                        <source
                                                            :src="photo.video"
                                                            type="video/mp4"
                                                        />

                                                        Your browser does not
                                                        support the video tag.
                                                    </video>
                                                </v-card>
                                            </v-container>
                                        </v-tabs-window-item>
                                        <v-tabs-window-item value="news">
                                            <Empty_error
                                                v-if="empty2 === true"
                                                :text="text2"
                                            />
                                            <v-container
                                                v-if="
                                                    (!loading1,
                                                    empty2 === false)
                                                "
                                                class="box d-flex align-center justify-space-around"
                                                width="90%"
                                            >
                                                <v-card
                                                    v-for="photo in Photos"
                                                    :key="photo.id"
                                                    width="200px"
                                                    max-width="25%"
                                                    @click.="
                                                        photos.photo_Information(
                                                            photo
                                                        )
                                                    "
                                                    @click="dialog_6 = true"
                                                >
                                                    <v-fab
                                                        icon="mdi-delete"
                                                        location="top right"
                                                        size="40"
                                                        absolute
                                                        style="
                                                            bottom: -15px;
                                                            left: 5px;
                                                        "
                                                        offset
                                                        @click="
                                                            photos.dialog_3 = true
                                                        "
                                                    ></v-fab>
                                                    <v-img
                                                        v-if="
                                                            photo.File_type ==
                                                            'صورة'
                                                        "
                                                        :src="photo.image"
                                                        height="200"
                                                        cover
                                                    ></v-img>
                                                    <video
                                                        v-if="
                                                            photo.File_type ==
                                                            'فيديو'
                                                        "
                                                        width="320"
                                                        height="240"
                                                        controls
                                                    >
                                                        <source
                                                            :src="photo.video"
                                                            type="video/mp4"
                                                        />

                                                        Your browser does not
                                                        support the video tag.
                                                    </video>
                                                </v-card>
                                            </v-container>
                                        </v-tabs-window-item>

                                        <v-tabs-window-item value="trip">
                                            <Empty_error
                                                v-if="empty1 === true"
                                                :text="text1"
                                            />
                                            <v-container
                                                v-if="
                                                    (!loading1,
                                                    empty1 === false)
                                                "
                                                class="box d-flex align-center justify-space-around"
                                                width="90%"
                                            >
                                                <v-card
                                                    v-for="photo in Photos"
                                                    :key="photo.id"
                                                    width="200px"
                                                    max-width="25%"
                                                    @click.="
                                                        photos.photo_Information(
                                                            photo
                                                        )
                                                    "
                                                    @click="dialog_6 = true"
                                                >
                                                    <v-fab
                                                        icon="mdi-delete"
                                                        location="top right"
                                                        size="40"
                                                        absolute
                                                        style="
                                                            bottom: -15px;
                                                            left: 5px;
                                                        "
                                                        offset
                                                        @click="
                                                            photos.dialog_3 = true
                                                        "
                                                    ></v-fab>
                                                    <v-img
                                                        v-if="
                                                            photo.File_type ==
                                                            'صورة'
                                                        "
                                                        :src="photo.image"
                                                        height="200"
                                                        cover
                                                    ></v-img>
                                                    <video
                                                        v-if="
                                                            photo.File_type ==
                                                            'فيديو'
                                                        "
                                                        width="320"
                                                        height="240"
                                                        controls
                                                    >
                                                        <source
                                                            :src="photo.video"
                                                            type="video/mp4"
                                                        />

                                                        Your browser does not
                                                        support the video tag.
                                                    </video>
                                                </v-card>
                                            </v-container>
                                        </v-tabs-window-item>
                                        <!-- Display each photo -->
                                        <v-dialog
                                            v-model="dialog_6"
                                            width="90%"
                                        >
                                            <v-card width="100%" class="popup">
                                                <div
                                                    class="d-flex justify-space-between align-center title"
                                                >
                                                    <div
                                                        style="
                                                            color: var(
                                                                --main-color
                                                            );
                                                        "
                                                    >
                                                        الصور
                                                    </div>
                                                    <v-btn
                                                        icon="mdi-close"
                                                        @click="
                                                            dialog_6 = false
                                                        "
                                                    ></v-btn>
                                                </div>
                                                <v-carousel hide-delimiters>
                                                    <div>
                                                        <v-carousel-item
                                                            class="pa-5"
                                                            v-if="
                                                                photos.File_Information ==
                                                                'صورة'
                                                            "
                                                            :src="
                                                                photos.Photo_Information
                                                            "
                                                            height="400"
                                                            cover
                                                        ></v-carousel-item>
                                                    </div>
                                                    <div
                                                        v-for="photo in Photos"
                                                        :key="photo.id"
                                                    >
                                                        <v-carousel-item
                                                            v-if="
                                                                photo.File_type ==
                                                                'صورة'
                                                            "
                                                            class="pa-5"
                                                            :src="photo.image"
                                                            height="400"
                                                            cover
                                                        ></v-carousel-item>
                                                    </div>
                                                </v-carousel> </v-card
                                        ></v-dialog>
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
            </template>
        </Offline_error>
    </div>
    <v-dialog v-model="dialog_3" width="90%">
        <v-card width="100%" class="popup">
            <div class="d-flex justify-space-between align-center title">
                <div style="color: var(--main-color)">تأكيد الحذف!</div>
                <v-btn icon="mdi-close" @click="dialog_3 = false"></v-btn>
            </div>

            <p
                style="
                    padding: 20px;
                    color: var(--therd-color);
                    font-weight: bold;
                "
            >
                هل أنت متأكد من حذفك لهذه الصورة؟
            </p>
            <v-card-text>
                <div class="d-flex align-center">
                    <v-btn
                        type="submit"
                        color="var(--main-color)"
                        :loading="loading"
                        :disabled="loading"
                        @click="dialog_3 = false"
                        style="
                            color: #fff;
                            font-weight: bold;
                            width: 48%;
                            height: 45px;
                        "
                    >
                        إلغاء
                    </v-btn>
                    <v-spacer />
                    <v-btn
                        type="submit"
                        color="var(--pink-color)"
                        :loading="loading"
                        :disabled="loading"
                        @click="photos.delete_Photo(photo.id, photo.image)"
                        style="
                            color: #fff;
                            font-weight: bold;
                            width: 48%;
                            height: 45px;
                        "
                    >
                        تأكيد
                    </v-btn>
                </div>
            </v-card-text>
        </v-card></v-dialog
    >
    <confirm_message
        v-if="snackbar === true"
        :text="text10"
        :snackbar1="snackbar"
    />
    <confirm_message
        v-if="snackbar2 === true"
        :text="text11"
        :snackbar1="snackbar2"
    />
</template>

<script>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { usePhoto_Gallery } from "@/store/Photo_Gallery.js";
import Offline_error from "@/components/Offline_error.vue";
import Empty_error from "@/components/Empty_error.vue";
import confirm_message from "@/components/confirm_message.vue";
export default defineComponent({
    inject: ["Emitter"],
    components: {
        confirm_message,
        Empty_error,
        Offline_error,
    },
    setup() {
        const photos = usePhoto_Gallery();
        photos.Get_data();
        // Destructure reactive references and methods from Photos store
        const {
            Photo,
            types,
            text0,
            empty,
            text10,
            text11,
            snackbar,
            snackbar2,
            text1,
            empty1,
            text2,
            empty2,
            text3,
            empty3,
            Add_Video,
            dialog_3,
            loading,
            Photos,
            Add_Photos,
            on_Video_Change,
            dialog,
            delete_Photo,
            Get_data,
            upload_Image,
            type,
            Types,
            video,
            dialog_6,
            handletypes,
            Photo_Information,
            photo_Information,
            loading1,
            tab,
            image,
            onFileChange,
            trip,
            progress,
            show_Data,
            party,
            news,
        } = storeToRefs(photos);

        // Return the necessary reactive properties and methods
        return {
            Photo,
            types,
            text0,
            empty,
            text10,
            text11,
            snackbar,
            snackbar2,
            text1,
            empty1,
            text2,
            empty2,
            text3,
            empty3,
            on_Video_Change,
            video,
            Add_Video,
            dialog_3,
            loading,
            dialog_6,
            onFileChange,
            loading1,
            image,
            handletypes,
            Add_Photos,
            delete_Photo,
            Photo_Information,
            photo_Information,
            Get_data,
            progress,
            show_Data,
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
    width: 96.5%;
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
.popup .title {
    padding: 20px 20px 0 !important;
    font-size: 23px;
    font-weight: bold;
    color: var(--main-color);
    position: relative;
    margin-bottom: 15px;
    &::before {
        content: "";
        position: absolute;
        bottom: -15px;
        height: 3px;
        width: calc(100% - 40px);
        background: var(--secound-color);
        left: 50%;
        transform: translateX(-50%);
    }
}
.v-btn--icon.v-btn--density-default {
    color: var(--main-color);
    width: auto;
    height: auto;
    box-shadow: none;
    &:hover {
        background: #fff;
    }
}
</style>
