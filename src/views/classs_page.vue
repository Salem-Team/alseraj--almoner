<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <div class="ser">
                        <div class="right">
                            <div>{{ year }}</div>
                        </div>
                        <div
                            class="left"
                            style="
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                gap: 20px;
                            "
                        >
                            <font-awesome-icon
                                :icon="['fas', 'filter']"
                                style="cursor: pointer"
                                @click="dialogFilter = true"
                            />
                            <font-awesome-icon
                                :icon="['fas', 'plus']"
                                @click="dialog = true"
                                style="cursor: pointer"
                            />
                        </div>
                    </div>
                    <v-dialog v-model="dialog" width="90%">
                        <v-card width="100%" class="popup">
                            <v-card-title
                                class="d-flex justify-space-between align-center"
                            >
                                <div
                                    class="text-h4 ps-2"
                                    style="color: var(--main-color)"
                                >
                                    إضافة
                                </div>
                                <v-btn
                                    style="color: var(--main-color)"
                                    icon="mdi-close"
                                    variant="text"
                                    @click="dialog = false"
                                ></v-btn>
                            </v-card-title>
                            <v-container
                                class="d-flex justify-space-evenly mb-4"
                            >
                                <v-card
                                    style="
                                        background-color: var(
                                            --main-color
                                        ) !important;
                                        color: white !important;
                                    "
                                    class="card text-center mt-3"
                                    prepend-icon="mdi-account"
                                    link
                                    min-width="15%"
                                    @click="dialog_1 = true"
                                >
                                    <v-card-title @click="dialog = false"
                                        >إضافة إشعارات</v-card-title
                                    >
                                </v-card>
                                <v-card
                                    style="
                                        background-color: var(
                                            --main-color
                                        ) !important;
                                        color: white !important;
                                    "
                                    class="card text-center mt-3"
                                    prepend-icon="mdi-newspaper-variant-multiple-outline"
                                    @click="showAddStudentDialog"
                                    min-width="15%"
                                >
                                    <v-card-title @click="dialog = false"
                                        >إضافة بيانات الطالب</v-card-title
                                    >
                                </v-card>
                                <v-card
                                    style="
                                        background-color: var(
                                            --main-color
                                        ) !important;
                                        color: white !important;
                                    "
                                    class="card text-center mt-3"
                                    prepend-icon="mdi-image"
                                    link
                                    @click="dialog_2 = true"
                                    min-width="15%"
                                >
                                    <v-card-title @click="dialog = false"
                                        >إضافة الصور</v-card-title
                                    >
                                </v-card>
                            </v-container>
                        </v-card></v-dialog
                    >
                    <v-dialog v-model="dialog_1" width="90%">
                        <v-card width="100%" class="popup">
                            <v-card-title
                                class="d-flex justify-space-between align-center"
                            >
                                <div
                                    class="text-h4 ps-2"
                                    style="color: var(--main-color)"
                                >
                                    إضافة إشعارات
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
                                    type="text"
                                    label=" عنوان"
                                    variant="outlined"
                                    required
                                ></v-text-field>
                                <v-textarea
                                    label="وصف قصير"
                                    :counter="150"
                                    variant="outlined"
                                    required
                                ></v-textarea>
                                <v-select
                                    style="width: 100%"
                                    :items="type"
                                    label="أختر نوع الاشعار"
                                    variant="outlined"
                                    required
                                ></v-select>

                                <v-btn
                                    class="d-flex align-center mt-4 mb-10"
                                    type="submit"
                                    color="primary"
                                >
                                    إضافة
                                </v-btn>
                            </form>
                        </v-card></v-dialog
                    >

                    <v-dialog v-model="dialog_2" width="90%">
                        <v-card width="100%" class="popup">
                            <v-card-title
                                class="d-flex justify-space-between align-center"
                            >
                                <div
                                    class="text-h4 ps-2"
                                    style="color: var(--main-color)"
                                >
                                    إضافة صورة
                                </div>
                                <v-btn
                                    style="color: var(--main-color)"
                                    icon="mdi-close"
                                    variant="text"
                                    @click="dialog_2 = false"
                                ></v-btn>
                            </v-card-title>
                            <form ref="form" @submit.prevent class="ma-auto">
                                <v-file-input
                                    style="width: 100%"
                                    label="صورة"
                                    accept="image/*"
                                    variant="outlined"
                                    prepend-icon=""
                                    width="100%"
                                    prepend-inner-icon="mdi-paperclip"
                                    required
                                >
                                </v-file-input>
                                <!-- Show progress bar if New.image is truthy (assuming New is a data property) -->
                                <v-progress-linear
                                    :value="progress"
                                    color="blue-grey"
                                    height="25"
                                >
                                    <template v-slot:default="{ value }">
                                        <strong>{{ Math.ceil(value) }}%</strong>
                                    </template>
                                </v-progress-linear>
                                <br />
                                <v-img src="" height="200"></v-img>
                                <v-btn
                                    class="d-flex align-center mt-4 mb-10"
                                    type="submit"
                                    color="primary"
                                >
                                    إضافة
                                </v-btn>
                            </form>
                        </v-card></v-dialog
                    >
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4" sm="6">
                    <v-btn
                        style="background: #54aef5; color: white"
                        rounded="xl"
                        size="x-large"
                        block
                        >الكل</v-btn
                    > </v-col
                ><v-col cols="12" md="4" sm="6">
                    <v-btn
                        style="background: #54aef5; color: white"
                        rounded="xl"
                        size="x-large"
                        block
                        >عربي</v-btn
                    > </v-col
                ><v-col cols="12" md="4" sm="6">
                    <v-btn
                        style="background: #54aef5; color: white"
                        rounded="xl"
                        size="x-large"
                        block
                        >لغات</v-btn
                    >
                </v-col>
            </v-row>
        </v-container>
        <StudentList :year="year" />
        <v-dialog v-model="dialogFilter" max-width="400">
            <v-card>
                <v-card-title>
                    <span class="headline">فلتر</span>
                </v-card-title>

                <v-card-text>
                    <v-row>
                        <v-col cols="8"> ترتيب أبجدي </v-col>
                        <v-col cols="4">
                            <v-btn
                                @click="toggleAlphabetical"
                                :color="alphabetical ? 'success' : 'error'"
                                icon
                            >
                                <v-icon>
                                    {{
                                        alphabetical
                                            ? "mdi-toggle-switch"
                                            : "mdi-toggle-switch-off"
                                    }}
                                </v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="8"> المدفوعات </v-col>
                        <v-col cols="4">
                            <v-btn
                                @click="togglePayments"
                                :color="payments ? 'success' : 'error'"
                                icon
                            >
                                <v-icon>
                                    {{
                                        payments
                                            ? "mdi-toggle-switch"
                                            : "mdi-toggle-switch-off"
                                    }}
                                </v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-select
                                v-model="selectedMonth"
                                :items="months"
                                label="ترتيب الأول"
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="applyFilter">تطبيق</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import StudentList from "@/components/StudentList.vue";
import { useDialogStore } from "@/store/useDialogStore";

export default {
    name: "ClassPage",
    components: {
        StudentList,
    },
    props: ["year"],
    setup() {
        const dialogStore = useDialogStore();
        const showAddStudentDialog = () => {
            dialogStore.showAddStudentDialog();
        };
        const showSearchStudentDialog = () => {
            dialogStore.showSearchStudentDialog();
        };
        return { showAddStudentDialog, showSearchStudentDialog };
    },
    data() {
        return {
            dialogFilter: false,
            dialog: false,
            dialog_1: false,
            dialog_2: false,
            type: ["جيد", "معلومات", "سيء"],
            alphabetical: false,
            payments: false,
            selectedMonth: null,
            months: ["الشهر الأول", "الشهر الثاني"],
        };
    },
    methods: {
        toggleAlphabetical() {
            this.alphabetical = !this.alphabetical;
        },
        togglePayments() {
            this.payments = !this.payments;
        },
        applyFilter() {
            // تطبيق الفلتر بناءً على الخيارات المحددة
            this.dialog = false;
        },
    },
};
</script>

<style scoped>
form {
    width: 90%;
    margin: auto;
}
.ser {
    width: 100%;
    height: 100px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #2196f3c4;
    color: white;
    font-size: 23px;
}
</style>
