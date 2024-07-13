<template>
    <div class="visible">
        <svg
            style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 245px;
            "
            v-if="loading1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
        >
            <radialGradient
                id="a12"
                cx=".66"
                fx=".66"
                cy=".3125"
                fy=".3125"
                gradientTransform="scale(1.5)"
            >
                <stop offset="0" stop-color="#336699"></stop>
                <stop offset=".3" stop-color="#336699" stop-opacity=".9"></stop>
                <stop offset=".6" stop-color="#336699" stop-opacity=".6"></stop>
                <stop offset=".8" stop-color="#336699" stop-opacity=".3"></stop>
                <stop offset="1" stop-color="#336699" stop-opacity="0"></stop>
            </radialGradient>
            <circle
                transform-origin="center"
                fill="none"
                stroke="url(#a12)"
                stroke-width="15"
                stroke-linecap="round"
                stroke-dasharray="200 1000"
                stroke-dashoffset="0"
                cx="100"
                cy="100"
                r="70"
            >
                <animateTransform
                    type="rotate"
                    attributeName="transform"
                    calcMode="spline"
                    dur="2"
                    values="360;0"
                    keyTimes="0;1"
                    keySplines="0 0 1 1"
                    repeatCount="indefinite"
                ></animateTransform>
            </circle>
            <circle
                transform-origin="center"
                fill="none"
                opacity=".2"
                stroke="#336699"
                stroke-width="15"
                stroke-linecap="round"
                cx="100"
                cy="100"
                r="70"
            ></circle>
        </svg>
        <div class="right">
            <div>
                <v-breadcrumbs>
                    <v-breadcrumbs-item @click="$router.push('/admin')" link>
                        الإشراف
                    </v-breadcrumbs-item>
                    <v-breadcrumbs-divider />
                    <v-breadcrumbs-item>الأخبار</v-breadcrumbs-item>
                </v-breadcrumbs>
            </div>
            <div class="left">
                <img
                    src="../assets/news/plus.png"
                    alt=""
                    @click="dialog = true"
                    class="pluse"
                />
            </div>
        </div>

        <v-dialog v-model="dialog" width="90%">
            <v-card width="100%" class="popup">
                <div
                    class="d-flex justify-space-between align-center title mb-4"
                >
                    <div style="color: var(--main-color)">إضافة خبر</div>
                    <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
                </div>
                <form ref="form" @submit.prevent class="ma-auto mt-4">
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
                        @input="news.upload_Image"
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
                        :maxlength="150"
                        required
                    ></v-textarea>
                    <v-btn
                        class="d-flex align-center mt-4 mb-4"
                        type="submit"
                        :loading="loading"
                        :disabled="loading"
                        @click="news.Add_News"
                        style="
                            width: 100%;
                            padding: 20px;
                            letter-spacing: normal;
                            font-weight: bold;
                            font-size: 19px;
                            background: var(--main-color);
                            color: #fff;
                        "
                    >
                        إضافة
                    </v-btn>
                </form>
            </v-card></v-dialog
        >

        <v-dialog v-model="dialog_1" width="90%">
            <v-card width="100%" class="popup">
                <div class="d-flex justify-space-between align-center title">
                    <div style="color: var(--main-color)">تعديل خبر</div>
                    <v-btn icon="mdi-close" @click="dialog_1 = false"></v-btn>
                </div>
                <form ref="form" @submit.prevent class="ma-auto mt-4">
                    <v-text-field
                        v-model="news.Title_Information"
                        type="text"
                        label="عنوان"
                        variant="outlined"
                        required
                    ></v-text-field>

                    <v-img
                        :src="news.Image_Information"
                        height="400"
                        width="100%"
                    ></v-img>
                    <br />
                    <v-textarea
                        v-model="news.Description_Information"
                        label="وصف قصير"
                        :counter="150"
                        required
                        variant="outlined"
                        :maxlength="150"
                    ></v-textarea>
                    <v-btn
                        type="submit"
                        :loading="loading"
                        :disabled="loading"
                        @click="news.Update_News(news.Id_Information)"
                        class="d-flex align-center mt-4 mb-4"
                        style="
                            width: 100%;
                            padding: 20px;
                            letter-spacing: normal;
                            font-weight: bold;
                            font-size: 19px;
                            background: var(--main-color);
                            color: #fff;
                        "
                    >
                        تعديل
                    </v-btn>
                </form>
            </v-card></v-dialog
        >
        <v-container class="box d-flex align-center justify-space-around">
            <div class="feat" v-for="New in News" :key="New.id">
                <div class="Top">
                    <font-awesome-icon
                        :icon="['fas', 'pen-to-square']"
                        @click="news.New_Information(New)"
                        @click.="dialog_1 = true"
                    />
                    <font-awesome-icon
                        :icon="['fas', 'trash']"
                        @click="news.dailog_3 = true"
                    />
                    <v-img
                        :src="New.image"
                        width="100%"
                        height="300"
                        cover
                    ></v-img>
                </div>
                <div class="Bottom">
                    <div class="title">{{ New.title }}</div>
                    <div class="time">
                        <font-awesome-icon :icon="['fas', 'clock']" />
                        <div>{{ New.time }}</div>
                    </div>
                    <div class="description">
                        {{ New.description }}
                    </div>
                </div>
            </div>
        </v-container>
    </div>
    <v-dialog v-model="news.dailog_3" width="90%">
        <v-card width="100%" class="popup">
            <div class="d-flex justify-space-between align-center title">
                <div style="color: var(--main-color)">تأكيد الحذف!</div>
                <v-btn icon="mdi-close" @click="news.dailog_3 = false"></v-btn>
            </div>

            <p
                style="
                    padding: 20px;
                    color: var(--therd-color);
                    font-weight: bold;
                "
            >
                هل أنت متأكد من حذفك لهذا الخبر
            </p>
            <v-card-text>
                <div class="d-flex align-center">
                    <v-btn
                        type="submit"
                        color="var(--main-color)"
                        :loading="loading"
                        :disabled="loading"
                        @click="news.dailog_3 = false"
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
                        @click="news.delete_New(New.id, New.image)"
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
            dialog_3,
            Add_News,
            dialog,
            loading,
            loading1,
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
            loading,
            dialog_3,
            loading1,
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
.card_title {
    background: var(--secound-color);
    margin-bottom: 15px;
    color: var(--main-color);
    p {
        font-weight: bold;
        font-size: 20px;
    }
    div {
        padding-right: 5px;
        svg {
            padding: 5px 5px;
            cursor: pointer;
            transition: 0.3s;
            border-radius: 5px;
            &:hover {
                color: var(--therd-color);
            }
        }
    }
}

.admin-card {
    padding: 68px;
    background-color: #2196f333;
}
.right {
    width: 90% !important;
    margin: auto;
    font-weight: bold;
    font-size: 20px;
    border-bottom: 5px solid var(--secound-color);
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .v-breadcrumbs-item:first-child {
        color: var(--main-color);
        cursor: pointer;
        font-size: 24px;
    }
    .v-breadcrumbs {
        padding: 16px 0;
    }
}
.v-container {
    margin: 20px auto !important;
    flex-wrap: wrap;
    padding: 0;
    justify-content: flex-start !important;
    flex-direction: column;
    gap: 40px;
}
.card {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    font-size: 20px;
    color: var(--main-color);
    font-weight: bold;
    padding: 20px;
    text-align: center;
    width: 100%;
}
.feat {
    width: 100%;
    box-shadow: 0 0 10px #ddd;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    max-width: 33%;
    & > div {
        width: 100%;

        position: relative;
    }
    .Top {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 250px;
        .v-img {
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
        }
        svg {
            position: absolute;
            top: 8px;
            left: 8px;
            width: 15px;
            height: 15px;
            padding: 6px;
            border-radius: 50%;
            cursor: pointer;
            color: #fff;
            z-index: 100000000000;
            background: var(--main-color);
            &:first-child {
                left: 40px;
            }
        }
    }
    .Bottom {
        padding: 10px;
        .title {
            font-size: 20px;
            color: var(--main-color);
            font-weight: bold;
            margin: 5px 0;
        }
        .time {
            display: flex;
            align-items: center;
            gap: 5px;
            color: var(--therd-color);
            font-weight: bold;
            margin-bottom: 20px;
            position: relative;
            font-size: 14px;
            &::before {
                content: "";
                position: absolute;
                bottom: -10px;
                left: 0;
                width: 100%;
                height: 4px;
                background: var(--secound-color);
            }
        }
        .description {
            font-weight: bold;
            color: var(--therd-color);
        }
    }
    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        margin-bottom: 15px;
        &::before {
            content: "";
            position: absolute;
            bottom: -15px;
            height: 3px;
            width: 100%;
            background: var(--secound-color);
        }
        & > div {
            display: flex;
            align-items: center;
            gap: 5px;
            .number {
                background: var(--main-color);
                color: #fff;
                border-radius: 5px;
                font-weight: bold;
                font-size: 18px;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .name {
                font-size: 20px;
                color: var(--main-color);
                font-weight: bold;
            }
            svg {
                color: var(--main-color);
                font-size: 20px;
                cursor: pointer;

                &:hover {
                    color: var(--therd-color);
                }
            }
        }
    }
    .body {
        & > div {
            font-weight: bold;
            font-size: 19px;
            color: var(--therd-color);
            margin: 20px 0 5px;
        }
        ul {
            color: var(--therd-color);
            font-weight: bold;
            font-size: 16px;
            li {
                list-style-type: square;
                list-style-position: inside;
            }
        }
    }
    .footer {
        .show_password {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            background: var(--main-color);
            width: 100%;
            padding: 10px;
            color: #fff;
            border-radius: 5px;
            cursor: pointer;
            &:hover {
                background-color: var(--therd-color);
            }
        }
    }
}
.v-card.v-theme--light.v-card--density-default.v-card--variant-elevated {
    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 10px 0;
        font-size: 23px;
        color: var(--main-color);
        font-weight: bold;
        position: relative;
        margin-bottom: 20px;
        svg {
            cursor: pointer;
            padding: 10px;
        }
        &::before {
            content: "";
            position: absolute;
            bottom: -10px;
            left: 50%;
            height: 4px;
            width: 95%;
            background: var(--secound-color);
            transform: translateX(-50%);
        }
    }
    .body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        color: var(--therd-color);
        background: var(--secound-color);
        margin: 0 10px 10px;
        border-radius: 5px;
        svg {
            color: var(--main-color);
            font-size: 18px;
            cursor: pointer;
        }
    }
}
@media (max-width: 599px) {
}
@media (min-width: 600px) and (max-width: 768px) {
}
@media (min-width: 769px) {
    .v-container {
        flex-direction: row;
        gap: 15px;
        align-items: stretch !important;
    }
    .card {
        width: 32%;
    }
    .feat {
        width: 32%;
        justify-content: flex-start;
    }
}

img.pluse {
    width: 40px;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
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
