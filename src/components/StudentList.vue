<template>
    <v-container>
        <v-text-field
            v-model="searchQuery"
            @input="searchStudent"
            label="ادخل اسم الطالب"
        ></v-text-field>

        <v-row>
            <v-col cols="12">
                <v-list>
                    <v-list-item
                        v-for="(student, index) in filteredStudents"
                        :key="student.id"
                    >
                        <v-list-item-content class="student-item">
                            <v-row>
                                <v-col>
                                    <div
                                        style="
                                            padding: 10px;
                                            display: flex;
                                            justify-content: space-between;
                                            align-items: center;
                                        "
                                    >
                                        <h2>
                                            <v-avatar
                                                color="info"
                                                style="margin-left: 20px"
                                            >
                                                {{ index + 1 }}
                                            </v-avatar>
                                            {{
                                                student.student_information[0]
                                                    .student_name
                                            }}
                                        </h2>
                                        <div>
                                            <v-avatar color="info">
                                                <v-icon
                                                    @click.stop="
                                                        deleteStudent(
                                                            student.id
                                                        )
                                                    "
                                                    icon="mdi-delete"
                                                ></v-icon>
                                            </v-avatar>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row style="margin-right: 70px; margin-top: 0px">
                                <v-col cols="12">
                                    <div>
                                        <h3 style="color: #2196f3">فصل 2/1</h3>
                                    </div>
                                </v-col>
                                <v-col cols="2">
                                    <v-card
                                        style="
                                            display: flex;
                                            justify-content: center;
                                            flex-direction: column;
                                            align-items: center;
                                            padding: 10px;
                                            background: rgb(33, 150, 243);
                                            color: #fff;
                                        "
                                    >
                                        <h3>93%</h3>
                                        <p>الشهر الاول</p>
                                    </v-card> </v-col
                                ><v-col cols="2">
                                    <v-card
                                        style="
                                            display: flex;
                                            justify-content: center;
                                            flex-direction: column;
                                            align-items: center;
                                            padding: 10px;
                                            background: rgb(33, 150, 243);
                                            color: #fff;
                                        "
                                    >
                                        <h3>83%</h3>
                                        <p>الشهر الثاني</p>
                                    </v-card> </v-col
                                ><v-col cols="2">
                                    <v-card
                                        style="
                                            display: flex;
                                            justify-content: center;
                                            flex-direction: column;
                                            align-items: center;
                                            padding: 10px;
                                            background: rgb(33, 150, 243);
                                            color: #fff;
                                        "
                                    >
                                        <h3>90%</h3>
                                        <p>امتحان الترم</p>
                                    </v-card> </v-col
                                ><v-col cols="2">
                                    <v-card
                                        style="
                                            display: flex;
                                            justify-content: center;
                                            flex-direction: column;
                                            align-items: center;
                                            padding: 10px;
                                            background: rgb(33, 150, 243);
                                            color: #fff;
                                        "
                                    >
                                        <h3>93%</h3>
                                        <p>الشهر الاول</p>
                                    </v-card> </v-col
                                ><v-col cols="2">
                                    <v-card
                                        style="
                                            display: flex;
                                            justify-content: center;
                                            flex-direction: column;
                                            align-items: center;
                                            padding: 10px;
                                            background: rgb(33, 150, 243);
                                            color: #fff;
                                        "
                                    >
                                        <h3>93%</h3>
                                        <p>الشهر الثاني</p>
                                    </v-card>
                                </v-col>
                                <v-col cols="2">
                                    <v-card
                                        style="
                                            display: flex;
                                            justify-content: center;
                                            flex-direction: column;
                                            align-items: center;
                                            padding: 10px;
                                            background: rgb(33, 150, 243);
                                            color: #fff;
                                        "
                                    >
                                        <h3>95%</h3>
                                        <p>امتحان اخر العام</p>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <v-row
                                style="
                                    margin-right: 70px;
                                    margin-top: 20px;
                                    margin-bottom: 20px;
                                "
                            >
                                <v-col>
                                    <div
                                        style="
                                            display: flex;
                                            justify-content: space-between;
                                            align-items: center;
                                        "
                                    >
                                        <h3
                                            style="
                                                color: #2196f3;
                                                margin-bottom: 20px;
                                            "
                                        >
                                            المصروفات
                                        </h3>
                                        <h3
                                            style="
                                                color: #2196f3;
                                                margin-bottom: 20px;
                                            "
                                        >
                                            1000/1500
                                        </h3>
                                    </div>
                                    <div>
                                        <v-progress-linear
                                            v-model="progress"
                                            height="25"
                                            color="blue"
                                            reverse
                                        >
                                            <template
                                                v-slot:default="{ value }"
                                            >
                                                <div
                                                    :style="{
                                                        color: 'white',
                                                        position: 'absolute',
                                                        right: `calc(${value}% - 5%)`,
                                                        transform:
                                                            'translateX(-50%)',
                                                        marginTop: '-70px',
                                                    }"
                                                    class="progress-label"
                                                >
                                                    <div
                                                        class="label-container"
                                                    >
                                                        {{ Math.ceil(value) }}%
                                                        <div
                                                            class="arrow-down"
                                                        ></div>
                                                    </div>
                                                </div>
                                            </template>
                                        </v-progress-linear>
                                        <div
                                            style="
                                                display: flex;
                                                justify-content: space-between;
                                                margin-top: 10px;
                                            "
                                        >
                                            <span>بداية الدراسة</span>
                                            <span>شهر 11</span>
                                            <span>شهر 12</span>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-card
                                        @click.stop="student.showDetails = true"
                                        style="
                                            padding: 10px;
                                            display: flex;
                                            justify-content: center;
                                            align-items: center;
                                            background: #e3f1fd;
                                        "
                                    >
                                        <v-icon
                                            style="margin-left: 6px"
                                            icon="mdi-information-outline"
                                        ></v-icon
                                        >التفاصيل</v-card
                                    >
                                </v-col>
                            </v-row>
                        </v-list-item-content>
                        <v-dialog
                            v-model="student.showDetails"
                            max-width="500px"
                        >
                            <v-card>
                                <v-card-title>{{ student.name }}</v-card-title>
                                <v-card-text>
                                    <div>رقم الهاتف: {{ student.phone }}</div>
                                    <div>
                                        البريد الإلكتروني: {{ student.email }}
                                    </div>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn
                                        text
                                        @click="student.showDetails = false"
                                        >إغلاق</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <!-- New Search Student Dialog -->
                        <v-dialog
                            transition="dialog-top-transition"
                            width="90%"
                            v-model="dialogStore.dialog_searchstudent"
                        >
                            <template v-slot:default>
                                <v-card>
                                    <v-toolbar
                                        title="البحث عن طالب"
                                    ></v-toolbar>
                                    <v-card-text class="text-h2 pa-6">
                                        <v-text-field
                                            v-model="searchQuery"
                                            label="ادخل اسم الطالب"
                                        ></v-text-field>
                                        <v-btn @click="searchStudent"
                                            >بحث</v-btn
                                        >
                                    </v-card-text>
                                    <v-card-actions class="justify-end">
                                        <v-btn
                                            text="Close"
                                            @click="
                                                dialogStore.hideSearchStudentDialog
                                            "
                                            >Close</v-btn
                                        >
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                    </v-list-item>
                </v-list>
            </v-col>
            <v-col cols="2">
                <v-dialog
                    transition="dialog-top-transition"
                    width="90%"
                    v-model="dialogStore.dialog_addstudent"
                >
                    <template v-slot:default>
                        <v-card
                            class="mx-auto text-white"
                            style="
                                background: #3875a5 !important;
                                color: white !important;
                                width: 100% !important;
                            "
                        >
                            <v-toolbar title="بيانات الطالب">
                                <v-btn
                                    icon
                                    @click="
                                        dialogStore.dialog_addstudent = false
                                    "
                                >
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-toolbar>
                            <v-stepper
                                v-model="e1"
                                alt-labels
                                style="padding: 5px"
                            >
                                <template v-slot:default="{ prev, next }">
                                    <v-stepper-header class="stepper_head">
                                        <template
                                            v-for="n in steps"
                                            :key="`${n}-step`"
                                        >
                                            <v-stepper-item
                                                class="stepper-width"
                                                :ripple="false"
                                                style="
                                                    font-size: 13px;
                                                    font-weight: bold;
                                                "
                                                :complete="e1 > n"
                                                :step="`Step ${n}`"
                                                :value="n"
                                                ref="stepperItems"
                                            >
                                            </v-stepper-item>
                                        </template>
                                    </v-stepper-header>

                                    <v-stepper-window class="m-3">
                                        <form @submit.prevent="submit">
                                            <div v-if="e1 === 1" ref="slide1">
                                                <v-text-field
                                                    v-model="
                                                        form
                                                            .student_information[0]
                                                            .student_name
                                                    "
                                                    :error-messages="
                                                        errors.student_name
                                                    "
                                                    required
                                                    label="اسم الطالب"
                                                ></v-text-field>

                                                <v-text-field
                                                    v-model="
                                                        form
                                                            .student_information[1]
                                                            .class
                                                    "
                                                    :error-messages="
                                                        errors.class
                                                    "
                                                    label="الفصل"
                                                    required
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        form
                                                            .student_information[2]
                                                            .educational_level
                                                    "
                                                    :error-messages="
                                                        errors.educational_level
                                                    "
                                                    label="المستوى التعليمي"
                                                    required
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        form
                                                            .student_information[3]
                                                            .gender
                                                    "
                                                    :error-messages="
                                                        errors.gender
                                                    "
                                                    label="الجنس"
                                                    required
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        form
                                                            .student_information[4]
                                                            .section
                                                    "
                                                    :error-messages="
                                                        errors.section
                                                    "
                                                    label="القسم"
                                                    required
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        form
                                                            .student_information[5]
                                                            .birthday
                                                    "
                                                    :error-messages="
                                                        errors.birthday
                                                    "
                                                    label="تاريخ الميلاد"
                                                    required
                                                ></v-text-field>
                                            </div>
                                            <div v-if="e1 === 2" ref="slide2">
                                                <v-text-field
                                                    v-model="
                                                        form.Results[0]
                                                            .weekly[0]
                                                            .Subject_Name
                                                    "
                                                    :error-messages="
                                                        errors.weekly_Subject_Name
                                                    "
                                                    label="اسم المادة الأسبوعية"
                                                    required
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        form.Results[0]
                                                            .weekly[1].Degree
                                                    "
                                                    :error-messages="
                                                        errors.weekly_Degree
                                                    "
                                                    label="الدرجة الأسبوعية"
                                                    required
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        form.Results[0]
                                                            .weekly[2].Data
                                                    "
                                                    :error-messages="
                                                        errors.weekly_Data
                                                    "
                                                    label="بيانات الأسبوع"
                                                    required
                                                ></v-text-field>
                                            </div>
                                            <div v-if="e1 === 3" ref="slide3">
                                                <v-text-field
                                                    v-model="
                                                        form.payments[0]
                                                            .Required
                                                    "
                                                    :error-messages="
                                                        this.errors
                                                            .payments_Required
                                                    "
                                                    label="المطلوب دفعه"
                                                    required
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        form.payments[1].paid_up
                                                    "
                                                    :error-messages="
                                                        errors.payments_paid_up
                                                    "
                                                    label="المبلغ المدفوع"
                                                    required
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        form.payments[2]
                                                            .installment_system
                                                    "
                                                    :error-messages="
                                                        errors.payments_installment_system
                                                    "
                                                    label="نظام الأقساط"
                                                    required
                                                ></v-text-field>
                                            </div>
                                            <div
                                                v-if="e1 === 4"
                                                ref="slide4"
                                            ></div>
                                            <div v-if="e1 === 5" ref="slide5">
                                                <div class="text-center">
                                                    <v-btn
                                                        append-icon="mdi-account-circle"
                                                        type="submit"
                                                        style="
                                                            background: #2a597d;
                                                            color: white;
                                                            font-size: 24px;
                                                            padding: 3px;
                                                            width: 42%;
                                                        "
                                                    >
                                                        اضافه طالب
                                                    </v-btn>
                                                </div>
                                            </div>
                                        </form>
                                    </v-stepper-window>
                                    <v-stepper-actions
                                        class="d-flex justify-center ga-5"
                                        :disabled="disabled"
                                        @click:next="next"
                                        @click:prev="prev"
                                        type="submit"
                                        style="padding: 0 1.5rem 1rem"
                                    >
                                        <template #prev="{ props }">
                                            <v-btn
                                                class="prev"
                                                style="background-color: #eee"
                                                @click="
                                                    () => props.onClick('prev')
                                                "
                                                rounded="lg"
                                                size="large"
                                            >
                                                <span class="icon2 ml-3"
                                                    ><font-awesome-icon
                                                        icon="chevron-right"
                                                        size="lg"
                                                /></span>
                                                <span> رجوع</span>
                                            </v-btn>
                                        </template>
                                        <template #next="{ props }">
                                            <div>
                                                <v-btn
                                                    @click="
                                                        () => {
                                                            props.onClick(
                                                                'next'
                                                            );
                                                        }
                                                    "
                                                    rounded="lg"
                                                    size="large"
                                                >
                                                    <span> التالي</span>
                                                    <span class="icon1 mr-4">
                                                        <font-awesome-icon
                                                            icon="chevron-left"
                                                            size="lg"
                                                    /></span>
                                                </v-btn>
                                            </div>
                                        </template>
                                    </v-stepper-actions>
                                </template>
                            </v-stepper>
                        </v-card>
                    </template>
                </v-dialog>
                <!-- <v-card-text class="text-h2 pa-6">
                                <form @submit.prevent="submit">
                                    <v-text-field
                                        v-model="
                                            form.student_information[0]
                                                .student_name
                                        "
                                        :error-messages="errors.student_name"
                                        required
                                        label="اسم الطالب"
                                    ></v-text-field>

                                    <v-text-field
                                        v-model="
                                            form.student_information[1].class
                                        "
                                        :error-messages="errors.class"
                                        label="الفصل"
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="
                                            form.student_information[2]
                                                .educational_level
                                        "
                                        :error-messages="
                                            errors.educational_level
                                        "
                                        label="المستوى التعليمي"
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="
                                            form.student_information[3].gender
                                        "
                                        :error-messages="errors.gender"
                                        label="الجنس"
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="
                                            form.student_information[4].section
                                        "
                                        :error-messages="errors.section"
                                        label="القسم"
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="
                                            form.student_information[5].birthday
                                        "
                                        :error-messages="errors.birthday"
                                        label="تاريخ الميلاد"
                                        required
                                    ></v-text-field>

                                    <v-text-field
                                        v-model="
                                            form.Results[0].weekly[0]
                                                .Subject_Name
                                        "
                                        :error-messages="
                                            errors.weekly_Subject_Name
                                        "
                                        label="اسم المادة الأسبوعية"
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="
                                            form.Results[0].weekly[1].Degree
                                        "
                                        :error-messages="errors.weekly_Degree"
                                        label="الدرجة الأسبوعية"
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="form.Results[0].weekly[2].Data"
                                        :error-messages="errors.weekly_Data"
                                        label="بيانات الأسبوع"
                                        required
                                    ></v-text-field>

                                    <v-text-field
                                        v-model="form.payments[0].Required"
                                        :error-messages="
                                            this.errors.payments_Required
                                        "
                                        label="المطلوب دفعه"
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="form.payments[1].paid_up"
                                        :error-messages="
                                            errors.payments_paid_up
                                        "
                                        label="المبلغ المدفوع"
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="
                                            form.payments[2].installment_system
                                        "
                                        :error-messages="
                                            errors.payments_installment_system
                                        "
                                        label="نظام الأقساط"
                                        required
                                    ></v-text-field>

                                    <div class="text-center">
                                        <v-btn
                                            append-icon="mdi-account-circle"
                                            type="submit"
                                            style="
                                                background: #2a597d;
                                                color: white;
                                                font-size: 24px;
                                                padding: 3px;
                                                width: 42%;
                                            "
                                        >
                                            اضافه طالب
                                        </v-btn>
                                    </div>
                                </form>
                            </v-card-text> -->
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {
    collection,
    addDoc,
    deleteDoc,
    getDocs,
    doc,
    getFirestore,
} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBdk3sqIHjXvB2C-O-lvkRgMFpg8pemkno",
    authDomain: "alseraj--almoner.firebaseapp.com",
    projectId: "alseraj--almoner",
    storageBucket: "alseraj--almoner.appspot.com",
    messagingSenderId: "462211256149",
    appId: "1:462211256149:web:a03ace3c70b306620169dc",
};
import { gsap } from "gsap";

import { initializeApp } from "@firebase/app";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
import { useDialogStore } from "@/store/useDialogStore";
export default {
    name: "StudentList",
    props: {
        year: {
            type: Number,
            required: true,
        },
    },
    setup() {
        const dialogStore = useDialogStore();
        return { dialogStore };
    },
    data() {
        return {
            e1: 1,
            steps: 5,
            students_class: [],
            dialog_addstudent: false,
            searchQuery: "",
            form: {
                student_information: [
                    { student_name: "" },
                    { class: "" },
                    { educational_level: "" },
                    { gender: "" },
                    { section: "" },
                    { birthday: "" },
                ],
                Results: [
                    {
                        weekly: [
                            { Subject_Name: "" },
                            { Degree: "" },
                            { Data: "" },
                        ],
                    },
                    {
                        monthly: [
                            { Certifications_title: "" },
                            {
                                Degree: [
                                    { Subject_Name: "" },
                                    { Teacher_Name: "" },
                                    { Behavior_assessment: "" },
                                    { Minor_degree: "" },
                                    { Major_degree: "" },
                                    { Student_degree: "" },
                                    { Major_degree: "" },
                                    { Major_degree: "" },
                                ],
                            },
                        ],
                    },
                ],
                payments: [
                    { Required: "" },
                    { paid_up: "" },
                    { installment_system: "" },
                ],
                Notifications: [{ Title: "" }, { Details: "" }],
            },
            errors: {
                student_name: [],
                class: [],
                educational_level: [],
                gender: [],
                section: [],
                birthday: [],
                weekly_Subject_Name: [],
                weekly_Degree: [],
                weekly_Data: [],
                monthly_Certifications_title: [],
                monthly_Subject_Name: [],
                monthly_Teacher_Name: [],
                monthly_Behavior_assessment: [],
                monthly_Minor_degree: [],
                monthly_Major_degree: [],
                monthly_Student_degree: [],
                payments_Required: [],
                payments_paid_up: [],
                payments_installment_system: [],
                Notifications_Title: [],
                Notifications_Details: [],
            },
            currentStep: "Step 1",
            progress: 75,
        };
    },
    async created() {
        await this.fetchStudents();
    },
    methods: {
        animateSlideChange() {
            const slides = [
                this.$refs.slide1,
                this.$refs.slide2,
                this.$refs.slide3,
                this.$refs.slide4,
                this.$refs.slide5,
            ];

            slides.forEach((slide, index) => {
                gsap.fromTo(
                    slide,
                    {
                        opacity: 0.5, // البداية من opacity 0.5
                        x: 100 * (index + 1), // الوضع الأولي للإحداثي y (من الأعلى)
                    },
                    {
                        duration: 0.7, // مدة الحركة
                        opacity: 1, // النهاية عند opacity 1
                        x: 0, // النهاية عند الإحداثي y = 0 (الأسفل)
                        // delay: index * 0.1, // تأخير حسب الترتيب
                        ease: "power2.out", // نوع الانتقال
                    }
                );
            });
        },
        async fetchStudents() {
            try {
                const querySnapshot = await getDocs(collection(db, "students"));
                this.students_class = querySnapshot.docs.map((doc) => {
                    const student = {
                        id: doc.id,
                        ...doc.data(),
                        showDetails: false,
                    };
                    return student;
                });
                console.log("Fetched students:", this.students_class);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        },
        async submit() {
            if (this.validateForm()) {
                console.log(this.errors);

                try {
                    console.log(
                        "Adding student:",
                        this.form.student_information,
                        this.form.Results,
                        this.form.payments,
                        this.form.Notifications,
                        this.year
                    );

                    await addDoc(collection(db, "students"), {
                        student_information: this.form.student_information,
                        Results: this.form.Results,
                        payments: this.form.payments,
                        Notifications: this.form.Notifications,
                        year: this.year,
                    });

                    this.dialog_addstudent = false;
                    this.handleReset();
                    await this.fetchStudents();
                    this.dialogStore.hideAddStudentDialog();
                } catch (error) {
                    console.error("Error adding document:", error);
                }
            }
        },
        async deleteStudent(id) {
            try {
                await deleteDoc(doc(db, "students", id));
                this.students_class = this.students_class.filter(
                    (student) => student.id !== id
                );
                console.log("Deleted student with id:", id);
            } catch (error) {
                console.error("Error deleting document:", error);
            }
        },
        handleReset() {
            this.form = {
                student_information: [
                    { student_name: "" },
                    { class: "" },
                    { educational_level: "" },
                    { gender: "" },
                    { section: "" },
                    { birthday: "" },
                ],
                Results: [
                    {
                        weekly: [
                            { Subject_Name: "" },
                            { Degree: "" },
                            { Data: "" },
                        ],
                    },
                    {
                        monthly: [
                            { Certifications_title: "" },
                            {
                                Degree: [
                                    { Subject_Name: "" },
                                    { Teacher_Name: "" },
                                    { Behavior_assessment: "" },
                                    { Minor_degree: "" },
                                    { Major_degree: "" },
                                    { Student_degree: "" },
                                ],
                            },
                        ],
                    },
                ],
                payments: [
                    { Required: "" },
                    { paid_up: "" },
                    { installment_system: "" },
                ],
                Notifications: [{ Title: "" }, { Details: "" }],
            };
        },

        validateForm() {
            let isValid = true;
            // Clear previous error messages
            // Validation rules
            if (!this.form.student_information[0].student_name) {
                this.errors.student_name.push("اسم الطالب مطلوب.");
                isValid = false;
            }
            if (!this.form.student_information[1].class) {
                this.errors.class.push("الفصل مطلوب.");
            }
            if (!this.form.student_information[2].educational_level) {
                this.errors.educational_level.push("المستوى التعليمي مطلوب.");
            }
            if (!this.form.student_information[3].gender) {
                this.errors.gender.push("الجنس مطلوب.");
            }
            if (!this.form.student_information[4].section) {
                this.errors.section.push("القسم مطلوب.");
            }
            if (!this.form.student_information[5].birthday) {
                this.errors.birthday.push("تاريخ الميلاد مطلوب.");
            }
            if (!this.form.Results[0].weekly[0].Subject_Name) {
                this.errors.weekly_Subject_Name.push(
                    "اسم المادة الأسبوعية مطلوب."
                );
            }
            if (!this.form.Results[0].weekly[1].Degree) {
                this.errors.weekly_Degree.push("الدرجة الأسبوعية مطلوبة.");
            }
            if (!this.form.Results[0].weekly[2].Data) {
                this.errors.weekly_Data.push("بيانات الأسبوع مطلوبة.");
            }
            if (!this.form.Results[1].monthly[0].Certifications_title) {
                this.errors.monthly_Certifications_title.push(
                    "عنوان الشهادة الشهرية مطلوب."
                );
            }
            if (!this.form.Results[1].monthly[1].Degree[0].Subject_Name) {
                this.errors.monthly_Subject_Name.push(
                    "اسم المادة الشهرية مطلوب."
                );
            }
            if (!this.form.Results[1].monthly[1].Degree[1].Teacher_Name) {
                this.errors.monthly_Teacher_Name.push("اسم المعلم مطلوب.");
            }
            if (
                !this.form.Results[1].monthly[1].Degree[2].Behavior_assessment
            ) {
                this.errors.monthly_Behavior_assessment.push(
                    "تقييم السلوك مطلوب."
                );
            }
            if (!this.form.Results[1].monthly[1].Degree[3].Minor_degree) {
                this.errors.monthly_Minor_degree.push("الدرجة الصغرى مطلوبة.");
            }
            if (!this.form.Results[1].monthly[1].Degree[4].Major_degree) {
                this.errors.monthly_Major_degree.push("الدرجة الكبرى مطلوبة.");
            }
            if (!this.form.Results[1].monthly[1].Degree[5].Student_degree) {
                this.errors.monthly_Student_degree.push("درجة الطالب مطلوبة.");
            }
            if (!this.form.payments[0].Required) {
                this.errors.payments_Required.push("المطلوب دفعه مطلوب.");
            }
            if (!this.form.payments[1].paid_up) {
                this.errors.payments_paid_up.push("المبلغ المدفوع مطلوب.");
            }
            if (!this.form.payments[2].installment_system) {
                this.errors.payments_installment_system.push(
                    "نظام الأقساط مطلوب."
                );
            }
            if (!this.form.Notifications[0].Title) {
                this.errors.Notifications_Title.push(
                    "   عنوان للإشعارات مطلوب."
                );
            }
            if (!this.form.Notifications[1].Details) {
                this.errors.Notifications_Details.push(
                    "محتوي  للإشعارات مطلوب ."
                );
            }

            // Check for errors before submitting
            // return Object.values(this.errors).every((err) => err.length === 0);
            // Check if there are any errors
            return isValid;
        },
        showStudentDetails(student) {
            student.showDetails = true;
        },
        async searchStudent() {
            try {
                const trimmedQuery = this.searchQuery.trim().toLowerCase();
                // Fetch all students if search query is empty
                if (!trimmedQuery) {
                    const querySnapshot = await getDocs(
                        collection(db, "students")
                    );
                    this.students_class = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                        showDetails: false,
                    }));
                } else {
                    // Perform search based on the trimmed search query
                    const querySnapshot = await getDocs(
                        collection(db, "students")
                    );
                    this.students_class = querySnapshot.docs
                        .map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                            showDetails: false,
                        }))
                        .filter((student) =>
                            student.student_information[0].student_name
                                .toLowerCase()
                                .includes(trimmedQuery)
                        );
                }
            } catch (error) {
                console.error("Error searching students:", error);
            }
        },
    },

    computed: {
        filteredStudents() {
            return this.students_class.filter(
                (student) => student.year === this.year
            );
        },
    },
    mounted() {
        this.searchStudent(); // Fetch all students initially
    },
};
</script>

<style scoped>
.student-item {
    padding: 10px;
    direction: rtl;
}
.student-item {
    padding: 10px !important;
}
.student-item:hover {
    background-color: #2196f333 !important;
}
.error-message {
    color: red;
    font-size: 14px;
    margin-top: -10px;
    margin-bottom: 10px;
}
.v-progress-linear {
    position: relative;
    overflow: visible;
}
.progress-label .label-container {
    background-color: #3875a5;
    padding: 5px 10px;
    border-radius: 5px;
    position: relative;
    color: white;
}
.progress-label .arrow-down {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #3875a5;
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
}
</style>
