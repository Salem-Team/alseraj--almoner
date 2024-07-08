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
                                        <h3>99%</h3>
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
                        <v-dialog v-model="student.showDetails">
                            <v-stepper
                                v-model="e1"
                                alt-labels
                                editable
                                style="padding: 5px"
                            >
                                <v-stepper-header class="stepper_head">
                                    <template
                                        v-for="n in steps"
                                        :key="`${n}-step`"
                                    >
                                        <v-stepper-item
                                            class="stepper-width"
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
                                            <div style="padding: 20px">
                                                <div
                                                    style="
                                                        display: flex;
                                                        margin-bottom: 20px;
                                                        align-items: center;
                                                    "
                                                >
                                                    <v-avatar
                                                        color="info"
                                                        style="
                                                            margin-left: 20px;
                                                        "
                                                    >
                                                        {{ index + 1 }}
                                                    </v-avatar>
                                                    <h2 style="color: #2196f3">
                                                        معلومات الطالب
                                                    </h2>
                                                </div>
                                                <div
                                                    style="
                                                        width: 100%;
                                                        display: flex;
                                                        gap: 20px;
                                                    "
                                                >
                                                    <v-text-field
                                                        v-model="
                                                            student
                                                                .student_information[0]
                                                                .student_name
                                                        "
                                                        style="width: 50%"
                                                        :error-messages="
                                                            errors.student_name
                                                        "
                                                        required
                                                        label="اسم الطالب"
                                                    ></v-text-field>

                                                    <v-select
                                                        :items="[
                                                            '1/1',
                                                            '1/2',
                                                            '2/1',
                                                            '2/2',
                                                            '3/1',
                                                            '3/2',
                                                        ]"
                                                        variant="outlined"
                                                        style="width: 50%"
                                                        v-model="
                                                            student
                                                                .student_information[1]
                                                                .class
                                                        "
                                                        :error-messages="
                                                            errors.class
                                                        "
                                                        label="الفصل"
                                                        required
                                                    ></v-select>
                                                </div>
                                                <div
                                                    style="
                                                        width: 100%;
                                                        display: flex;
                                                        gap: 20px;
                                                    "
                                                >
                                                    <v-select
                                                        :items="classes"
                                                        v-model="
                                                            student
                                                                .student_information[2]
                                                                .educational_level
                                                        "
                                                        variant="outlined"
                                                        style="width: 50%"
                                                        :error-messages="
                                                            errors.educational_level
                                                        "
                                                        label="المرحله التعليميه"
                                                        required
                                                    ></v-select>
                                                    <v-select
                                                        v-model="
                                                            student
                                                                .student_information[3]
                                                                .gender
                                                        "
                                                        style="width: 50%"
                                                        :error-messages="
                                                            errors.gender
                                                        "
                                                        label="الجنس"
                                                        required
                                                        :items="['انثي', 'ذكر']"
                                                        variant="outlined"
                                                    ></v-select>
                                                </div>

                                                <v-select
                                                    v-model="
                                                        student
                                                            .student_information[4]
                                                            .section
                                                    "
                                                    :error-messages="
                                                        errors.section
                                                    "
                                                    label="القسم"
                                                    required
                                                    :items="['عربي', 'لغات']"
                                                    variant="outlined"
                                                ></v-select>

                                                <v-menu
                                                    ref="menu"
                                                    v-model="menu"
                                                    :close-on-content-click="
                                                        false
                                                    "
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="290px"
                                                    @open="initializeTempDate"
                                                >
                                                    <template
                                                        v-slot:activator="{
                                                            on,
                                                            attrs,
                                                        }"
                                                    >
                                                        <v-text-field
                                                            v-model="
                                                                student
                                                                    .student_information[5]
                                                                    .birthday
                                                            "
                                                            label="تاريخ الميلاد"
                                                            append-icon="mdi-calendar"
                                                            readonly
                                                            @click="menu = true"
                                                            :error-messages="
                                                                errors.birthday
                                                            "
                                                            required
                                                            v-bind="attrs"
                                                            v-on="on"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-card>
                                                        <v-date-picker
                                                            v-model="tempDate"
                                                            locale="ar"
                                                            scrollable
                                                            :first-day-of-week="
                                                                1
                                                            "
                                                        ></v-date-picker>
                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn
                                                                text
                                                                @click="
                                                                    menu = false
                                                                "
                                                                >إلغاء</v-btn
                                                            >
                                                            <v-btn
                                                                text
                                                                @click="
                                                                    confirmDate
                                                                "
                                                                >تأكيد</v-btn
                                                            >
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-menu>
                                            </div>
                                        </div>
                                        <div v-if="e1 === 2" ref="slide2">
                                            <div style="padding: 20px">
                                                <div
                                                    style="
                                                        display: flex;
                                                        margin-bottom: 20px;
                                                        align-items: center;
                                                    "
                                                >
                                                    <v-avatar
                                                        color="info"
                                                        style="
                                                            margin-left: 20px;
                                                        "
                                                    >
                                                        {{ index + 2 }}
                                                    </v-avatar>
                                                    <h2 style="color: #2196f3">
                                                        ولي الامر
                                                    </h2>
                                                </div>
                                                <v-text-field
                                                    v-model="
                                                        student.Guardian[0]
                                                            .Guardian_name
                                                    "
                                                    :error-messages="
                                                        this.errors
                                                            .Guardian_name
                                                    "
                                                    label="الاسم"
                                                    required
                                                ></v-text-field>
                                                <v-select
                                                    v-model="
                                                        student.Guardian[1]
                                                            .Brothers_in_school
                                                    "
                                                    :error-messages="
                                                        errors.Brothers_in_school
                                                    "
                                                    label="هل يوجد اخوه في المدرسه"
                                                    required
                                                    :items="['لا', 'نعم']"
                                                    variant="outlined"
                                                ></v-select>
                                                <div
                                                    v-if="
                                                        student.Guardian[1]
                                                            .Brothers_in_school ===
                                                        'نعم'
                                                    "
                                                >
                                                    <div
                                                        v-for="(
                                                            bor, index
                                                        ) in form.Guardian[2]
                                                            .brother"
                                                        :key="index"
                                                    >
                                                        <v-text-field
                                                            v-model="
                                                                student
                                                                    .Guardian[2]
                                                                    .brother[
                                                                    index
                                                                ]
                                                            "
                                                            :error-messages="
                                                                this.errors
                                                                    .brother
                                                            "
                                                            label="اسم الاخ"
                                                            :append-icon="
                                                                index == 0
                                                                    ? 'mdi-plus'
                                                                    : ''
                                                            "
                                                            @click:append="
                                                                addBrother
                                                            "
                                                            required
                                                        ></v-text-field>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="e1 === 3" ref="slide3">
                                            <div style="padding: 20px">
                                                <div
                                                    style="
                                                        display: flex;
                                                        justify-content: space-between;
                                                        align-items: center;
                                                        margin-bottom: 20px;
                                                    "
                                                >
                                                    <div
                                                        style="
                                                            display: flex;

                                                            align-items: center;
                                                        "
                                                    >
                                                        <v-avatar
                                                            color="info"
                                                            style="
                                                                margin-left: 20px;
                                                            "
                                                        >
                                                            {{ index + 3 }}
                                                        </v-avatar>
                                                        <h2
                                                            style="
                                                                color: #2196f3;
                                                            "
                                                        >
                                                            النتائج الاسبوعيه
                                                        </h2>
                                                    </div>
                                                    <v-btn
                                                        color="blue"
                                                        @click="
                                                            dialogAddSubject = true
                                                        "
                                                        >إضافة مادة جديدة</v-btn
                                                    >
                                                </div>

                                                <v-row>
                                                    <v-col
                                                        cols="4"
                                                        v-for="(
                                                            week, index
                                                        ) in student.Results[0]
                                                            .weekly"
                                                        :key="index"
                                                    >
                                                        <v-card
                                                            style="
                                                                padding: 17px;
                                                            "
                                                        >
                                                            <div
                                                                style="
                                                                    display: flex;
                                                                    justify-content: space-between;
                                                                    align-items: center;
                                                                    margin-bottom: 20px;
                                                                "
                                                            >
                                                                <div
                                                                    style="
                                                                        display: flex;
                                                                        align-items: center;
                                                                    "
                                                                >
                                                                    <v-avatar
                                                                        color="info"
                                                                        style="
                                                                            margin-left: 20px;
                                                                        "
                                                                    >
                                                                        {{
                                                                            index +
                                                                            1
                                                                        }}
                                                                    </v-avatar>
                                                                    <h2>
                                                                        {{
                                                                            week.Subject_Name
                                                                        }}
                                                                    </h2>
                                                                </div>
                                                                <div>
                                                                    <v-icon
                                                                        color="primary"
                                                                        @click="
                                                                            editSubject(
                                                                                student.id,
                                                                                index
                                                                            )
                                                                        "
                                                                    >
                                                                        mdi-pencil
                                                                    </v-icon>
                                                                    <v-icon
                                                                        color="red"
                                                                        @click="
                                                                            deleteSubject(
                                                                                student.id,
                                                                                index
                                                                            )
                                                                        "
                                                                    >
                                                                        mdi-delete
                                                                    </v-icon>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <table
                                                                    class="styled-table"
                                                                >
                                                                    <tr>
                                                                        <td>
                                                                            درجة
                                                                            الطالب
                                                                        </td>
                                                                        <td>
                                                                            {{
                                                                                week.Student_degree
                                                                            }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            الدرجة
                                                                            الكلية
                                                                        </td>
                                                                        <td>
                                                                            {{
                                                                                week.Major_degree
                                                                            }}
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </div>
                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                                <!-- Add Subject Dialog -->
                                                <v-dialog
                                                    v-model="dialogAddSubject"
                                                    max-width="500px"
                                                >
                                                    <v-card>
                                                        <v-card-title>
                                                            <span
                                                                class="headline"
                                                                >إضافة مادة
                                                                جديدة</span
                                                            >
                                                        </v-card-title>
                                                        <v-card-text>
                                                            <v-form
                                                                ref="addForm"
                                                            >
                                                                <v-text-field
                                                                    v-model="
                                                                        newSubject.Subject_Name
                                                                    "
                                                                    label="اسم المادة"
                                                                    required
                                                                ></v-text-field>
                                                                <v-text-field
                                                                    v-model="
                                                                        newSubject.Major_degree
                                                                    "
                                                                    label="الدرجة الكلية"
                                                                    type="number"
                                                                    required
                                                                ></v-text-field>
                                                                <v-text-field
                                                                    v-model="
                                                                        newSubject.Student_degree
                                                                    "
                                                                    label="درجة الطالب"
                                                                    type="number"
                                                                    required
                                                                ></v-text-field>
                                                            </v-form>
                                                        </v-card-text>
                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn
                                                                color="blue darken-1"
                                                                text
                                                                @click="
                                                                    dialogAddSubject = false
                                                                "
                                                                >إلغاء</v-btn
                                                            >
                                                            <v-btn
                                                                color="blue darken-1"
                                                                text
                                                                @click="
                                                                    addSubject(
                                                                        student.id
                                                                    )
                                                                "
                                                                >حفظ</v-btn
                                                            >
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>

                                                <!-- Edit Subject Dialog -->
                                                <v-dialog
                                                    v-model="editDialog"
                                                    max-width="500px"
                                                >
                                                    <v-card>
                                                        <v-card-title>
                                                            <span
                                                                class="headline"
                                                                >تعديل
                                                                المادة</span
                                                            >
                                                        </v-card-title>
                                                        <v-card-text>
                                                            <v-form
                                                                ref="editForm"
                                                            >
                                                                <v-text-field
                                                                    v-model="
                                                                        editedSubject.Subject_Name
                                                                    "
                                                                    label="اسم المادة"
                                                                    required
                                                                ></v-text-field>
                                                                <v-text-field
                                                                    v-model="
                                                                        editedSubject.Major_degree
                                                                    "
                                                                    label="الدرجة الكلية"
                                                                    type="number"
                                                                    required
                                                                ></v-text-field>
                                                                <v-text-field
                                                                    v-model="
                                                                        editedSubject.Student_degree
                                                                    "
                                                                    label="درجة الطالب"
                                                                    type="number"
                                                                    required
                                                                ></v-text-field>
                                                            </v-form>
                                                        </v-card-text>
                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn
                                                                color="blue darken-1"
                                                                text
                                                                @click="
                                                                    closeDialog
                                                                "
                                                                >إلغاء</v-btn
                                                            >
                                                            <v-btn
                                                                color="blue darken-1"
                                                                text
                                                                @click="
                                                                    saveEdit
                                                                "
                                                                >حفظ</v-btn
                                                            >
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                            </div>
                                        </div>
                                        <div v-if="e1 === 4" ref="slide4">
                                            <v-text-field
                                                v-model="
                                                    form.payments[0].Required
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
                            </v-stepper>
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
                            <v-toolbar title="معلومات الطالب">
                                <v-btn
                                    icon
                                    @click="
                                        dialogStore.dialog_addstudent = false
                                    "
                                >
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-toolbar>
                            <form @submit.prevent="submit">
                                <div style="padding: 20px">
                                    <div
                                        style="
                                            width: 100%;
                                            display: flex;
                                            gap: 20px;
                                        "
                                    >
                                        <v-text-field
                                            v-model="
                                                form.student_information[0]
                                                    .student_name
                                            "
                                            style="width: 50%"
                                            :error-messages="
                                                errors.student_name
                                            "
                                            required
                                            label="اسم الطالب"
                                        ></v-text-field>

                                        <v-select
                                            :items="[
                                                '1/1',
                                                '1/2',
                                                '2/1',
                                                '2/2',
                                                '3/1',
                                                '3/2',
                                            ]"
                                            variant="outlined"
                                            style="width: 50%"
                                            v-model="
                                                form.student_information[1]
                                                    .class
                                            "
                                            :error-messages="errors.class"
                                            label="الفصل"
                                            required
                                        ></v-select>
                                    </div>
                                    <div
                                        style="
                                            width: 100%;
                                            display: flex;
                                            gap: 20px;
                                        "
                                    >
                                        <v-select
                                            :items="classes"
                                            v-model="
                                                form.student_information[2]
                                                    .educational_level
                                            "
                                            variant="outlined"
                                            style="width: 50%"
                                            :error-messages="
                                                errors.educational_level
                                            "
                                            label="المستوى التعليمي"
                                            required
                                        ></v-select>
                                        <v-select
                                            v-model="
                                                form.student_information[3]
                                                    .gender
                                            "
                                            style="width: 50%"
                                            :error-messages="errors.gender"
                                            label="الجنس"
                                            required
                                            :items="['انثي', 'ذكر']"
                                            variant="outlined"
                                        ></v-select>
                                    </div>

                                    <v-select
                                        v-model="
                                            form.student_information[4].section
                                        "
                                        :error-messages="errors.section"
                                        label="القسم"
                                        required
                                        :items="['عربي', 'لغات']"
                                        variant="outlined"
                                    ></v-select>

                                    <v-menu
                                        ref="menu"
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                        @open="initializeTempDate"
                                    >
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <v-text-field
                                                v-model="formattedDate"
                                                label="تاريخ الميلاد"
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                @click="menu = true"
                                                :error-messages="
                                                    errors.birthday
                                                "
                                                required
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-card>
                                            <v-date-picker
                                                v-model="tempDate"
                                                locale="ar"
                                                scrollable
                                                :first-day-of-week="1"
                                            ></v-date-picker>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    text
                                                    @click="menu = false"
                                                    >إلغاء</v-btn
                                                >
                                                <v-btn text @click="confirmDate"
                                                    >تأكيد</v-btn
                                                >
                                            </v-card-actions>
                                        </v-card>
                                    </v-menu>
                                    <div class="text-center">
                                        <v-btn
                                            append-icon="mdi-account-circle"
                                            type="submit"
                                            style="
                                                background: rgb(70, 122, 164);
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
                        </v-card>
                    </template>
                </v-dialog>
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
    getDoc,
    updateDoc,
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
            dialogAddSubject: false,
            newSubject: {
                Subject_Name: "",
                Major_degree: null,
                Student_degree: null,
            },
            menu: false,
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
                    { birthday: null },
                ],
                Guardian: [
                    { Guardian_name: "" },
                    { Brothers_in_school: "" },
                    { brother: [""] },
                ],
                Results: [
                    {
                        weekly: [
                            {
                                Subject_Name: "",
                                Major_degree: 0,
                                Student_degree: 0,
                            },
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
                Guardian_name: [],
                Brothers_in_school: [],
                brother: [],
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
            classes: [
                "الصف الثالث الثانوي",
                "الصف الثاني الثانوي",
                " الصف أولى ثانوي",
                "الصف الثالث الاعدادي",
                "الصف الثاني الاعدادي",
                "الصف الاول الاعدادي",
                "الصف السادس الابتدائي",
                "الصف الخامس الابتدائي",
                "الصف الرابع الابتدائي",
                "الصف الثالث الابتدائي",
                "الصف الثاني الابتدائي",
                "الصف الاول الابتدائي",
                "ثانيه روضه",
                " اولي روضه",
            ],
            tempDate: null,
            formattedDate: "",
            editDialog: false,
            editedIndex: -1,
            editedSubject: {
                Subject_Name: "",
                Major_degree: 0,
                Student_degree: 0,
            },
            valid: false,
        };
    },
    async created() {
        await this.fetchStudents();
    },
    methods: {
        async addSubject(studentId) {
            try {
                const studentRef = doc(db, "students", studentId);
                const studentDoc = await getDoc(studentRef);
                if (studentDoc.exists()) {
                    const studentData = studentDoc.data();
                    studentData.Results[0].weekly.push({
                        Subject_Name: this.newSubject.Subject_Name,
                        Major_degree: this.newSubject.Major_degree,
                        Student_degree: this.newSubject.Student_degree,
                    });
                    await updateDoc(studentRef, studentData);
                    this.dialogAddSubject = false;
                    this.newSubject = {
                        Subject_Name: "",
                        Major_degree: null,
                        Student_degree: null,
                    };
                    await this.fetchStudents();
                }
            } catch (error) {
                console.error("Error adding subject:", error);
            }
        },

        editSubject(studentId, index) {
            this.editedStudentId = studentId;
            this.editedIndex = index;
            const student = this.students_class.find(
                (student) => student.id === studentId
            );
            if (student) {
                this.editedSubject = { ...student.Results[0].weekly[index] };
                this.editDialog = true;
            }
        },
        async saveEdit() {
            try {
                const studentRef = doc(db, "students", this.editedStudentId);
                const studentDoc = await getDoc(studentRef);
                if (studentDoc.exists()) {
                    const studentData = studentDoc.data();
                    Object.assign(
                        studentData.Results[0].weekly[this.editedIndex],
                        this.editedSubject
                    );
                    await updateDoc(studentRef, studentData);
                    this.closeDialog();
                    await this.fetchStudents();
                }
            } catch (error) {
                console.error("Error editing subject:", error);
            }
        },
        closeDialog() {
            this.editDialog = false;
            this.editedIndex = -1;
            this.editedSubject = {
                Subject_Name: "",
                Major_degree: 0,
                Student_degree: 0,
            };
        },
        async deleteSubject(studentId, subjectIndex) {
            try {
                const studentRef = doc(db, "students", studentId);
                const studentDoc = await getDoc(studentRef);
                if (studentDoc.exists()) {
                    const studentData = studentDoc.data();
                    studentData.Results[0].weekly.splice(subjectIndex, 1);
                    await updateDoc(studentRef, studentData);
                    await this.fetchStudents();
                }
            } catch (error) {
                console.error("Error deleting subject:", error);
            }
        },
        addBrother() {
            this.form.Guardian[2].brother.push("");
        },
        initializeTempDate() {
            this.tempDate = this.form.student_information[5].birthday;
        },
        confirmDate() {
            this.form.student_information[5].birthday = this.tempDate;
            this.formattedDate = this.formatDate(this.tempDate);
            this.menu = false;
        },
        formatDate(date) {
            if (!date) return "";
            const options = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            };
            return new Date(date).toLocaleDateString("ar-EG", options);
        },

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
                        duration: 0.7,
                        opacity: 1,
                        x: 0,
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
                        this.form.Guardian,
                        this.form.Results,
                        this.form.payments,
                        this.form.Notifications,
                        this.year
                    );

                    await addDoc(collection(db, "students"), {
                        student_information: this.form.student_information,
                        Results: this.form.Results,
                        Guardian: this.form.Guardian,
                        payments: this.form.payments,
                        Notifications: this.form.Notifications,
                        year: this.year,
                    });

                    this.dialog_addstudent = false;
                    this.handleReset();
                    await this.fetchStudents();
                    this.dialogStore.hideAddStudentDialog();
                    console.log(this.formattedDate);
                    this.form.student_information[5].birthday =
                        this.formattedDate;

                    // this.formattedDate = "";
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
                Guardian: [
                    { Guardian_name: "" },
                    { Brothers_in_school: "" },
                    { brother: "" },
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
    watch: {
        "form.student_information[5].birthday"(newVal) {
            this.formattedDate = this.formatDate(newVal);
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
.styled-table {
    width: 100%;
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 18px;
    text-align: right; /* لتنسيق النص من اليمين لليسار */
}

.styled-table th,
.styled-table td {
    padding: 12px 15px;
    border: 1px solid #dddddd;
}

.styled-table th {
    background-color: #f3f3f3;
}

.styled-table tr:nth-of-type(even) {
    background-color: #f3f3f3;
}
</style>
