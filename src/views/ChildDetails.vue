<template>
    <v-container>
        <v-card>
            <v-toolbar color="#fff" title="تفاصيل الطالب"> </v-toolbar>

            <div class="d-flex flex-row" style="width: 100%; height: 100vh">
                <v-tabs v-model="tab" color="primary" direction="vertical">
                    <v-tab
                        prepend-icon="mdi-account"
                        text="معلومات شخصيه"
                        value="option-1"
                    ></v-tab>
                    <v-tab
                        prepend-icon="mdi-lock"
                        text="النتائج الاسبوعيه"
                        value="option-2"
                    ></v-tab>
                    <v-tab
                        prepend-icon="mdi-access-point"
                        text="النتائج الشهريه"
                        value="option-3"
                    ></v-tab>
                    <v-tab
                        prepend-icon="mdi-access-point"
                        text=" المدفوعات"
                        value="option-4"
                    ></v-tab>
                    <v-tab
                        prepend-icon="mdi-access-point"
                        text=" الاشعارات"
                        value="option-5"
                    ></v-tab>
                    <v-tab
                        prepend-icon="mdi-access-point"
                        text=" الصور"
                        value="option-6"
                    ></v-tab>
                    <v-tab
                        prepend-icon="mdi-access-point"
                        text=" الاحصائيات"
                        value="option-7"
                    ></v-tab>
                </v-tabs>

                <v-tabs-window
                    v-model="tab"
                    style="width: 100%; height: 100% !important"
                >
                    <v-tabs-window-item value="option-1">
                        <v-card
                            flat
                            v-if="student"
                            class="mx-auto my-4"
                            max-width="90%"
                        >
                            <v-card-title
                                style="
                                    background: #2980b9;
                                    border-radius: 20px;
                                    padding: 24px;
                                "
                                class="d-flex flex-column align-center custom-font"
                            >
                                <img
                                    :src="student.photos.url"
                                    width="200"
                                    height="200"
                                    style="
                                        background-color: #eee;
                                        border-radius: 50%;
                                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                    "
                                    class="avatar-hover"
                                />
                                <h2 class="text-h5 mt-2 mb-1 text-white">
                                    {{ student.name }}
                                </h2>
                                <v-chip color="#fff" text-color="white">{{
                                    student.gender
                                }}</v-chip>
                            </v-card-title>
                            <v-card-text>
                                <v-container fluid>
                                    <v-row class="ma-10">
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            class="d-flex justify-center"
                                        >
                                            <v-card
                                                class="pa-3 mb-3 fixed-card"
                                                outlined
                                            >
                                                <v-card-title
                                                    class="custom-title custom-font text-center"
                                                    style="font-size: 20px"
                                                >
                                                    العمر
                                                </v-card-title>
                                                <v-card-subtitle
                                                    class="custom-font centered-subtitle"
                                                    style="font-size: 16px"
                                                    >{{
                                                        student.age
                                                    }}</v-card-subtitle
                                                >
                                            </v-card>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            class="d-flex justify-center text-center"
                                        >
                                            <v-card
                                                class="pa-3 mb-3 fixed-card"
                                                outlined
                                            >
                                                <v-card-title
                                                    class="custom-title custom-font"
                                                    style="font-size: 20px"
                                                >
                                                    تاريخ الميلاد
                                                </v-card-title>
                                                <v-card-subtitle
                                                    class="custom-font centered-subtitle"
                                                    style="font-size: 16px"
                                                    >{{
                                                        student.BithOfDate
                                                    }}</v-card-subtitle
                                                >
                                            </v-card>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            class="d-flex justify-center"
                                        >
                                            <v-card
                                                class="pa-3 mb-3 fixed-card"
                                                outlined
                                            >
                                                <v-card-title
                                                    class="custom-title custom-font text-center"
                                                    style="font-size: 20px"
                                                >
                                                    المرحلة الدراسية
                                                </v-card-title>
                                                <v-card-subtitle
                                                    class="custom-font centered-subtitle"
                                                    style="font-size: 16px"
                                                    >{{
                                                        student.gradeLevel
                                                    }}</v-card-subtitle
                                                >
                                            </v-card>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            class="d-flex justify-center"
                                        >
                                            <v-card
                                                class="pa-3 mb-3 fixed-card"
                                                outlined
                                            >
                                                <v-card-title
                                                    class="custom-title custom-font text-center"
                                                    style="font-size: 20px"
                                                >
                                                    السنة الدراسية
                                                </v-card-title>
                                                <v-card-subtitle
                                                    class="custom-font centered-subtitle"
                                                    style="font-size: 16px"
                                                    >{{
                                                        student.schoolYear
                                                    }}</v-card-subtitle
                                                >
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-card>
                        <v-alert type="error" v-else class="custom-font">
                            لا يوجد بيانات لهذا الطالب
                        </v-alert>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="option-2">
                        <h2 class="ma-2">النتائج الأسبوعية</h2>
                        <v-card flat>
                            <v-list>
                                <v-list-item>
                                    <v-table>
                                        <thead>
                                            <tr>
                                                <th>المادة</th>
                                                <th>الدرجة الكبرى</th>
                                                <th>درجة الطالب</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                                v-for="(
                                                    result, index
                                                ) in student.Results
                                                    .weeklyResults"
                                                :key="index"
                                            >
                                                <td>
                                                    {{ result.Subject_Name }}
                                                </td>
                                                <td>
                                                    {{ result.Major_degree }}
                                                </td>
                                                <td>
                                                    {{ result.Student_degree }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </v-table>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-tabs-window-item>

                    <v-tabs-window-item
                        value="option-3"
                        style="width: 100% !important"
                    >
                        <v-card flat>
                            <v-row
                                class="d-flex flex-row align-center justify-space-between"
                            >
                                <v-col>
                                    <h2 class="ma-2">النتائج الشهرية</h2>
                                </v-col>
                                <v-col class="d-flex justify-end">
                                    <v-btn
                                        color="blue"
                                        class="ml-5"
                                        @click="downloadPDF"
                                    >
                                        <v-icon left size="25px" class="ml-2"
                                            >mdi-printer</v-icon
                                        >
                                        تحميل الشهادة
                                    </v-btn>
                                </v-col>
                            </v-row>

                            <!-- أزرار اختيار الشهر -->
                            <v-row>
                                <v-col
                                    cols="12"
                                    class="d-flex justify-center ma-3"
                                >
                                    <v-btn
                                        rounded="xs"
                                        size="large"
                                        @click="selectMonth('شهر يناير')"
                                        >شهر يناير</v-btn
                                    >
                                    <v-btn
                                        rounded="xs"
                                        size="large"
                                        @click="selectMonth('شهر فبراير')"
                                        >شهر فبراير</v-btn
                                    >
                                    <v-btn
                                        rounded="xs"
                                        size="large"
                                        @click="selectMonth('شهر مارس')"
                                        >شهر مارس</v-btn
                                    >
                                    <v-btn
                                        rounded="xs"
                                        size="large"
                                        @click="selectMonth('شهر ابرايل')"
                                        >شهر ابرايل</v-btn
                                    >
                                </v-col>
                            </v-row>

                            <!-- بيانات الطالب -->
                            <v-row
                                class="d-flex flex-row align-center justify-space-between ma-5"
                            >
                                <v-col>
                                    <v-col>
                                        <v-text-title>الاسم:</v-text-title>
                                        <v-text-title>{{
                                            student.name
                                        }}</v-text-title>
                                    </v-col>
                                    <v-col>
                                        <v-text-title
                                            >المرحلة الدراسية:</v-text-title
                                        >
                                        <v-text-title>{{
                                            student.gradeLevel
                                        }}</v-text-title>
                                    </v-col>
                                    <v-col>
                                        <v-text-title
                                            >السنة الدراسية:</v-text-title
                                        >
                                        <v-text-title>{{
                                            student.schoolYear
                                        }}</v-text-title>
                                    </v-col>
                                </v-col>
                                <v-col class="d-flex flex-column align-end">
                                    <div
                                        class="par d-flex flex-column justify-center"
                                        style="width: 200px; height: 200px"
                                    >
                                        <img
                                            src="../assets/images.jpeg"
                                            alt="School Logo"
                                        />
                                        <p class="ma-2">
                                            معهد السراج المنير الأزهري
                                        </p>
                                    </div>
                                </v-col>
                            </v-row>

                            <!-- جدول النتائج -->
                            <div class="table">
                                <v-table>
                                    <thead>
                                        <tr>
                                            <th>اسم المادة</th>
                                            <th>اسم المعلم</th>
                                            <th>تقييم السلوك</th>
                                            <th>الدرجة الصغرى</th>
                                            <th>الدرجة الكبرى</th>
                                            <th>الدرجة النهائية للطالب</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(
                                                degree, index
                                            ) in selectedMonthlyDegrees"
                                            :key="index"
                                        >
                                            <td>{{ degree.Subject_Name }}</td>
                                            <td>{{ degree.Teacher_Name }}</td>
                                            <td>
                                                {{ degree.Behavior_assessment }}
                                            </td>
                                            <td>{{ degree.Minor_degree }}</td>
                                            <td>{{ degree.Major_degree }}</td>
                                            <td>{{ degree.Student_degree }}</td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </div>
                        </v-card>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="option-4">
                        <v-card
                            flat
                            v-if="student"
                            class="mx-auto my-4"
                            max-width="90%"
                        >
                            <v-card-title
                                class="text-h4 custom-font"
                                style="color: #2980b9"
                                >المدفوعات</v-card-title
                            >
                            <v-card-subtitle class="mb-4 text-h6 custom-title"
                                >اختر نظام التقسيط</v-card-subtitle
                            >
                            <v-row>
                                <v-col cols="12" sm="12" md="12">
                                    <v-select
                                        v-model="selectedPlan"
                                        :items="selectPaid"
                                        label="اختر نظام التقسيط"
                                        @change="updateCircles"
                                        outlined
                                        dense
                                    ></v-select>
                                    <v-timeline
                                        v-if="selectedPlan"
                                        class="mt-5 custom-timeline"
                                    >
                                        <v-timeline-item
                                            v-for="month in numberOfMonths"
                                            :key="month"
                                            :color="'primary'"
                                            class="custom-timeline-item"
                                        >
                                            <v-card outlined>
                                                <v-card-title class="text-h6"
                                                    >شهر
                                                    {{ month }}</v-card-title
                                                >
                                                <v-card-text>
                                                    القسط الشهري:
                                                    {{ installmentAmount }} جنيه
                                                </v-card-text>
                                            </v-card>
                                        </v-timeline-item>
                                    </v-timeline>
                                </v-col>
                                <v-col cols="12">
                                    <v-row
                                        v-if="selectedPlan"
                                        class="d-flex flex-column mt-16"
                                    >
                                        <v-col>
                                            <h2 class="mb-5">أذهب للدفع</h2>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="8"
                                            class="d-flex flex-row gap-5"
                                        >
                                            <v-text-field
                                                v-model="totalAmount"
                                                label="المبلغ المستحق"
                                                outlined
                                                @input="validateTotalAmount"
                                            ></v-text-field>
                                            <v-text-field
                                                class="mr-2"
                                                v-model="amount"
                                                label="المبلغ المدفوع"
                                                outlined
                                            ></v-text-field>
                                            <v-btn
                                                color="primary"
                                                size="large"
                                                :disabled="remainingAmount <= 0"
                                                @click="payAmount"
                                                style="
                                                    height: 60px;
                                                    width: 150px;
                                                "
                                                >دفع</v-btn
                                            >
                                        </v-col>
                                    </v-row>

                                    <v-row v-if="paidAmount > 0">
                                        <v-col cols="12">
                                            <div
                                                class="d-flex justify-center mt-16"
                                            >
                                                <div class="progress_container">
                                                    <div
                                                        class="progress"
                                                        :style="{
                                                            width: progressBarWidth,
                                                        }"
                                                    ></div>
                                                    <div
                                                        v-for="(
                                                            circle, index
                                                        ) in circles"
                                                        :key="index"
                                                        :class="[
                                                            'circle',
                                                            {
                                                                circle_active:
                                                                    index <=
                                                                    currentActive,
                                                                circle_success:
                                                                    paidAmount >=
                                                                    (totalAmount /
                                                                        circles.length) *
                                                                        (index +
                                                                            1),
                                                            },
                                                        ]"
                                                    >
                                                        <v-icon
                                                            >mdi-check-bold</v-icon
                                                        >
                                                        <span
                                                            class="step_label"
                                                            >{{
                                                                steps[index]
                                                            }}</span
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        </v-col>
                                        <div class="ma-16 d-flex flex-column">
                                            <div class="d-flex">
                                                <div
                                                    class="status-box paid-amount"
                                                ></div>
                                                <span class="status-text mr-2"
                                                    >المبلغ المدفوع</span
                                                >
                                            </div>
                                            <div class="d-flex">
                                                <div
                                                    class="status-box unpaid-amount"
                                                ></div>
                                                <span class="status-text mr-2"
                                                    >ما لم يتم دفعه</span
                                                >
                                            </div>
                                        </div>
                                        <v-col cols="12">
                                            <div
                                                class="cont ma-16 d-flex justify-space-around align-center"
                                            >
                                                <div
                                                    class="d-flex flex-column align-center gap-3"
                                                >
                                                    <h3>المبلغ المستحق</h3>
                                                    <p>{{ totalAmount }}</p>
                                                </div>
                                                <div
                                                    class="d-flex flex-column align-center gap-3"
                                                >
                                                    <h3>المبلغ المدفوع</h3>
                                                    <p>{{ paidAmount }}</p>
                                                </div>
                                                <div
                                                    class="d-flex flex-column align-center gap-3"
                                                >
                                                    <h3>الباقي من القسط</h3>
                                                    <p>
                                                        {{
                                                            totalAmount -
                                                            paidAmount
                                                        }}
                                                    </p>
                                                </div>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <!-- v-alert for notifications -->
                            <v-alert
                                title="تنبيه"
                                class="custom-alert mt-4"
                                v-if="alertMessage"
                                v-model="alertMessage"
                                dense
                                outlined
                                closable
                                type="warning"
                            >
                                {{ alertMessage }}
                            </v-alert>
                        </v-card>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="option-5">
                        <v-card flat v-if="student">
                            <h2 class="ma-5">الاشعارات</h2>
                            <v-list-item
                                height="200"
                                v-for="notification in student.Notifications"
                                :key="notification.id"
                            >
                                <v-alert
                                    class="ma-2"
                                    :title="notification.Title"
                                    type="info"
                                    variant="tonal"
                                    ><p class="mt-3 rounded-md">
                                        {{ notification.Details }}
                                    </p></v-alert
                                >
                            </v-list-item>
                        </v-card>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="option-6">
                        <v-card flat v-if="student">
                            <v-container fluid>
                                <v-row>
                                    <v-col cols="12">
                                        <v-select
                                            v-model="selectedGrade"
                                            :items="gradeLevels"
                                            label="اختر المرحلة الدراسية"
                                            outlined
                                            dense
                                            class="mb-4"
                                        ></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col
                                        v-for="photo in filteredPhotos"
                                        :key="photo.link"
                                        cols="12"
                                        sm="6"
                                        md="4"
                                        class="d-flex justify-center"
                                    >
                                        <v-card outlined class="pa-3 mb-3">
                                            <v-img
                                                :src="photo.link"
                                                aspect-ratio="1"
                                                class="mb-2"
                                            ></v-img>
                                            <v-card-subtitle
                                                class="custom-font"
                                                style="font-size: 16px"
                                            >
                                                التاريخ: {{ photo.Date }}
                                            </v-card-subtitle>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                        <v-alert type="error" v-else>
                            لا يوجد بيانات لهذا الطالب
                        </v-alert>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="option-7">
                        <v-card flat v-if="student">
                            <v-list-item
                                v-for="statistic in student.statistics"
                                :key="statistic.id"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>{{
                                        statistic.data
                                    }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                    </v-tabs-window-item>
                </v-tabs-window>
            </div>
        </v-card>
    </v-container>
</template>

<script>
import jsPDF from "jspdf";
import "jspdf-autotable";
import Amiri_Regular from "@/assets/fonts/Amiri-Regular.js";

export default {
    data() {
        return {
            alertMessage: false,
            reachedProgress: false,
            currentActive: 0,
            // circles: [],
            totalAmount: null,
            paidAmount: 0,
            progress: 0,
            tab: "option-1", // تحديد التاب الافتراضي
            selectedGrade: null,
            gradeLevels: ["الصف الأول", "الصف الثاني", "الصف الثالث"],
            selectedMonth: "شهر يناير",
            selectedPlan: null,
            selectPaid: ["شهر", "شهرين", "3 شهر", "4 شهر", "5 شهر"],
            amount: 0,
            selectedPaymentPlan: null,
            paymentPlans: ["شهر", "شهرين", "3 شهر", "4 شهر", "5 شهر"],
            steps: [
                "بدأ ",
                "الخطوة 1",
                "الخطوة 2",
                "الخطوة 3",
                "الخطوة 4",
                "الخطوة 5",
            ],

            // خاص بالبروحريس بار وتقسيم القسط

            student: {
                name: "أحمد محمد",
                gender: "ذكر",
                age: 12,
                BithOfDate: "2009-08-05",
                gradeLevel: "الصف الخامس",
                schoolYear: "2023-2024",
                photo: {
                    url1: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
                },
                Results: {
                    weeklyResults: [
                        {
                            Subject_Name: "دين",
                            Major_degree: 100,
                            Student_degree: 96,
                        },
                        {
                            Subject_Name: "دراسات",
                            Major_degree: 50,
                            Student_degree: 42,
                        },
                    ],
                },
                Monthly: [
                    {
                        Certificate_title: "شهر يناير",
                        Degrees: [
                            {
                                Subject_Name: "عربي",
                                Teacher_Name: "عماد عمر",
                                Behavior_assessment: "ممتاز",
                                Minor_degree: 50,
                                Major_degree: 100,
                                Student_degree: 99,
                            },
                            {
                                Subject_Name: "قرآن كريم",
                                Teacher_Name: "نور محمود",
                                Behavior_assessment: "ممتاز",
                                Minor_degree: 50,
                                Major_degree: 100,
                                Student_degree: 95,
                            },
                            {
                                Subject_Name: " جغرافيا",
                                Teacher_Name: "علاء محمود",
                                Behavior_assessment: "ممتاز",
                                Minor_degree: 50,
                                Major_degree: 100,
                                Student_degree: 80,
                            },
                            {
                                Subject_Name: " تاريخ",
                                Teacher_Name: "خالد محمد",
                                Behavior_assessment: "ممتاز",
                                Minor_degree: 50,
                                Major_degree: 100,
                                Student_degree: 77,
                            },
                        ],
                    },
                    // أضف المزيد من الأشهر هنا
                    {
                        Certificate_title: "شهر فبراير",
                        Degrees: [
                            {
                                Subject_Name: "انجليزى",
                                Teacher_Name: "كريم عمر",
                                Behavior_assessment: "جيد",
                                Minor_degree: 50,
                                Major_degree: 100,
                                Student_degree: 98,
                            },
                            {
                                Subject_Name: " جغرافيا",
                                Teacher_Name: "كمال محمود",
                                Behavior_assessment: "جيد جدا",
                                Minor_degree: 50,
                                Major_degree: 100,
                                Student_degree: 94,
                            },
                            {
                                Subject_Name: " جغرافيا",
                                Teacher_Name: "علاء محمود",
                                Behavior_assessment: "ممتاز",
                                Minor_degree: 50,
                                Major_degree: 100,
                                Student_degree: 82,
                            },
                            {
                                Subject_Name: " تاريخ",
                                Teacher_Name: "خالد محمد",
                                Behavior_assessment: "ممتاز",
                                Minor_degree: 50,
                                Major_degree: 100,
                                Student_degree: 79,
                            },
                        ],
                    },
                ],
                payments: {
                    Requird: 100,
                    paid_up: 120,
                    installment_system: "شهريا",
                },
                Notifications: [
                    {
                        Title: "جواب الفصل لولي الأمر",
                        Details:
                            "السيد/السيدة [اسم ولي الأمر]، نود إعلامكم بقرار فصل ابنكم/ابنتكم [اسم الطالب] من معهد السراج المنير الأزهري بسبب تكرار المخالفات للوائح والانضباط المدرسي، وذلك اعتبارًا من تاريخ هذا الخطاب.",
                    },
                ],

                photos: [
                    {
                        Date: "2023/2/5",
                        link: "https://images.pexels.com/photos/6778692/pexels-photo-6778692.jpeg",
                        grade: "الصف الأول",
                    },
                    {
                        Date: "2022/3/9",
                        link: "https://firebasestorage.googleapis.com/v0/b/alseraj--almoner.appspot.com/o/images%2F%D8%AE%D9%84%D9%81%D9%8A%D8%A9%20%D9%84%D9%84%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20-%20Copy.jpg?alt=media&token=6262aa52-b522-47e1-b17d-a11ecec9e4cf",
                        grade: "الصف الثاني",
                    },
                    {
                        Date: "2022/3/4",
                        link: "https://images.pexels.com/photos/7410112/pexels-photo-7410112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                        grade: "الصف الثالث",
                    },
                    // أضف المزيد من الصور هنا
                    {
                        Date: "2023/5/15",
                        link: "https://images.pexels.com/photos/9389657/pexels-photo-9389657.jpeg",
                        grade: "الصف الأول",
                    },

                    {
                        Date: "2022/4/10",
                        link: "https://images.pexels.com/photos/62403/pexels-photo-62403.jpeg",
                        grade: "الصف الثاني",
                    },
                    {
                        Date: "2022/7/1",
                        link: "https://images.pexels.com/photos/870711/pexels-photo-870711.jpeg",
                        grade: "الصف الثالث",
                    },
                    {
                        Date: "2022/8/8",
                        link: "https://images.pexels.com/photos/3023202/pexels-photo-3023202.jpeg",
                        grade: "الصف الثالث",
                    },
                ],
                statistics: [
                    { id: 1, data: "إحصائيات تجريبية 1" },
                    { id: 2, data: "إحصائيات تجريبية 2" },
                ],
            },
        };
    },
    computed: {
        circles() {
            if (!this.selectedPlan) return [];
            // Include a circle at the beginning with index 0
            return [
                0,
                ...Array.from(
                    { length: this.selectPaid.indexOf(this.selectedPlan) + 1 },
                    (_, i) => i + 1
                ),
            ];
        },
        remainingAmount() {
            return this.totalAmount - this.paidAmount;
        },
        filteredPhotos() {
            if (!this.selectedGrade) {
                return this.student.photos;
            }
            return this.student.photos.filter(
                (photo) => photo.grade === this.selectedGrade
            );
        },
        selectedMonthlyDegrees() {
            // اختر الشهر المحدد
            return (
                this.student.Monthly.find(
                    (month) => month.Certificate_title === this.selectedMonth
                )?.Degrees || []
            );
        },
        numberOfMonths() {
            if (!this.selectedPlan) return [];
            const monthsMap = {
                شهر: 1,
                شهرين: 2,
                "3 شهر": 3,
                "4 شهر": 4,
                "5 شهر": 5,
            };
            return Array.from(
                { length: monthsMap[this.selectedPlan] },
                (_, i) => i + 1
            );
        },
        paymentPlanMonths() {
            if (!this.selectedPaymentPlan) return [];

            const monthsMap = {
                شهر: 1,
                شهرين: 2,
                "3 شهر": 3,
                "4 شهر": 4,
                "5 شهر": 5,
            };

            return Array.from(
                { length: monthsMap[this.selectedPaymentPlan] },
                (_, i) => i + 1
            );
        },
        installmentAmount() {
            if (!this.selectedPlan) return 0;
            const monthsMap = {
                شهر: 1,
                شهرين: 2,
                "3 شهر": 3,
                "4 شهر": 4,
                "5 شهر": 5,
            };
            return (this.totalAmount / monthsMap[this.selectedPlan]).toFixed(2);
        },

        calculateProgress() {
            return (this.paidAmount / this.totalAmount) * 100;
        },
        // خاص بالنسبه المئويه
        progressBarWidth() {
            if (this.remainingAmount <= 0) {
                return "100%"; // Keep the progress bar at 100% when remaining amount reaches 0
            }
            const percentage = (this.paidAmount / this.totalAmount) * 100;
            return `${percentage}%`;
        },
    },
    methods: {
        payAmount() {
            const amountToPay = parseInt(this.amount);

            // تحقق من أن المبلغ المدفوع غير سالب وأنه رقم صالح
            if (isNaN(amountToPay) || amountToPay <= 0) {
                this.showAlert("الرجاء إدخال المبلغ بالأرقام");
                return;
            }

            // تحقق من أن المبلغ المدفوع لا يتجاوز المبلغ المستحق
            if (amountToPay > this.remainingAmount) {
                this.showAlert(
                    "عفوا ! لا يمكن دفع مبلغ أكبر من المبلغ المستحق"
                );
                return;
            }

            // تحقق من أن المبلغ المدفوع لا يقل عن قيمة القسط الشهري
            if (amountToPay < this.installmentAmount) {
                this.showAlert("عفوا ! لا نقبل أقل من قيمة القسط الشهري");
                return;
            }

            if (this.remainingAmount <= 0) {
                return; // Do nothing if remaining amount is 0
            }

            if (this.currentActive < this.circles.length) {
                this.currentActive++;
            }

            this.paidAmount += amountToPay;
            this.amount = 0; // Reset the paid amount after payment
            this.updateProgress();
        },
        validateTotalAmount() {
            if (this.totalAmount !== null) {
                if (isNaN(this.totalAmount) || this.totalAmount < 0) {
                    this.showAlert("لابد ان يكون رقما وليس سالبا");
                    this.totalAmount = null;
                }
            }
        },
        showAlert(message) {
            this.alertMessage = message;
            setTimeout(() => {
                this.alertMessage = "";
            }, 30000); // Hide alert after 3 seconds
        },
        resetPayment() {
            this.currentActive = 0;
            this.paidAmount = 0;
            // Reset any other payment related data
        },
        selectMonth(month) {
            this.selectedMonth = month;
        },
        // حساب الباقى
        updateProgress() {
            this.progress = (this.paidAmount / this.totalAmount) * 100;
        },

        downloadPDF() {
            const doc = new jsPDF("landscape");
            doc.addFileToVFS("Amiri-Regular.ttf", Amiri_Regular);
            doc.addFont("Amiri-Regular.ttf", "Amiri-Regular", "normal");
            doc.setFont("Amiri-Regular");
            //border
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 5; // حجم الهامش من كل جانب
            doc.setLineWidth(0.5);
            doc.rect(
                margin,
                margin,
                pageWidth - 2 * margin,
                pageHeight - 2 * margin
            );
            // Profile Certification

            // إضافة الصورة
            const imgData =
                "data:image/jpeg;base64,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"; // حط النص اللي جبته من الموقع هنا
            doc.addImage(imgData, "JPEG", 15, 15, 50, 50);

            // إضافة النص تحت الصورة
            // دى فنكشن built in
            doc.setFontSize(14);
            doc.text("معهد السراج المنير الأزهرى", 16, 70);

            doc.text("الاسم:  " + this.student.name, 248, 30);
            doc.text("المرحله الدراسيه:  " + this.student.gradeLevel, 225, 40);
            doc.text("السنه الدراسيه:  " + this.student.schoolYear, 232, 50);
            doc.setFontSize(30);
            doc.text("شهادة", 130, 84);

            const tableColumn = [
                "الدرجة النهائية للطالب",
                "الدرجة الكبرى",
                "الدرجة الصغرى",
                "تقييم السلوك",
                "اسم المعلم",
                "اسم المادة",
            ];
            const tableRows = [];
            this.selectedMonthlyDegrees.forEach((degree) => {
                const degreeData = [
                    degree.Minor_degree,
                    degree.Student_degree,
                    degree.Major_degree,
                    degree.Behavior_assessment,
                    degree.Teacher_Name,
                    degree.Subject_Name,
                ];
                tableRows.push(degreeData);
            });
            //  ده التيبل
            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 100,
                styles: {
                    font: "Amiri-Regular",
                    fontSize: 10,
                    cellWidth: "wrap",
                    halign: "right", // تحديد محاذاة النص إلى اليمين
                    valign: "middle", // تحديد محاذاة عمودياً
                    cellPadding: 5, // تحديد هامش الخلية
                },
                columnStyles: {
                    0: { cellWidth: "auto" },
                    1: { cellWidth: "auto" },
                    2: { cellWidth: "auto" },
                    3: { cellWidth: "auto" },
                    4: { cellWidth: "auto" },
                    5: { cellWidth: "auto" },
                },
            });

            doc.save("table.pdf");
        },
    },
    watch: {
        selectedPlan(newVal) {
            // Update circles when selectedPlan changes
            this.circles = Array.from(
                { length: this.selectPaid.indexOf(newVal) + 1 },
                (_, i) => i
            );
            this.resetPayment(); // Reset payment when plan changes
        },
    },
};
</script>
<style scoped>
.custom-font {
    font-family: "Cairo", sans-serif;
    font-size: 22px;
    font-weight: bold;
}
.custom-title {
    font-size: 20px;
    font-weight: 500;
    color: #333;
}
.v-card-title {
    padding: 16px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #eee;
}
.v-card-text {
    padding: 16px;
}
.custom-timeline {
    max-width: 90%;
    margin: 0 auto;
}
.custom-timeline-item {
    margin-bottom: 16px;
}
.custom-timeline-item .v-timeline-item__icon {
    background-color: #2980b9;
}
.custom-timeline-item .v-card {
    border-radius: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.custom-timeline-item .v-card-title {
    background-color: #2980b9;
    color: white;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}
.custom-timeline-item .v-card-text {
    background-color: #f0f0f0;
}
.cont > div {
    margin: 10px;
    padding: 20px;
    color: #fff;
    background: #2980b9;
}
.progress_container {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-bottom: 2rem;
    max-width: 90%;
    width: 500px;
    align-items: center;
}
.progress_container::before {
    content: "";
    background-color: #95a5a6;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 4px;
    width: 100%;
    z-index: -1;
}
.progress {
    background-color: #2980b9;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    height: 4px;
    width: 0;
    z-index: -1;
    transition: width 0.4s ease-in;
}
.circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    text-align: center;
    direction: rtl;
    position: relative;
}
.step_label {
    font-size: 12px;
    color: black;
    position: absolute;
    top: 60px;
    width: 100px;
    text-align: center;
}
.circle_active {
    background-color: #2980b9;
}
.circle_success {
    background-color: #2980b9;
}
.status-box {
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-right: 8px;
    border-radius: 4px;
}
.paid-amount {
    background-color: #2980b9;
}
.unpaid-amount {
    background-color: gray;
}
.status-text {
    font-size: 16px;
    font-weight: bold;
    color: #333;
}
.custom-alert {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 120px;
    font-size: 25px;
    z-index: 9999;
    border-radius: 20px;
    transition: all 0.5s ease-in-out;
    /* text-align: center; */
}
</style>
