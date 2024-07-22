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
                        v-for="(student, index) in sortedStudents"
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
                                                        confirmDeleteStudent(
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
                                    <div
                                        style="
                                            display: flex;
                                            justify-content: space-between;
                                            align-items: center;
                                        "
                                    >
                                        <h3 style="color: #2196f3">
                                            فصل
                                            {{
                                                student.student_information[1]
                                                    .class
                                            }}
                                        </h3>
                                        <h3 style="color: #2196f3">
                                            قسم
                                            {{
                                                student.student_information[4]
                                                    .section
                                            }}
                                        </h3>
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
                                        <h3>
                                            {{
                                                parseFloat(
                                                    percentageTotalDegrees(
                                                        student
                                                    ).toFixed(1)
                                                )
                                            }}%
                                        </h3>
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
                                        <h3>
                                            {{
                                                parseFloat(
                                                    percentageTotalDegrees2(
                                                        student
                                                    ).toFixed(1)
                                                )
                                            }}%
                                        </h3>
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
                                        <h3>
                                            {{
                                                parseFloat(
                                                    percentageTotalDegrees3(
                                                        student
                                                    ).toFixed(1)
                                                )
                                            }}%
                                        </h3>
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
                                        <h3>
                                            {{
                                                parseFloat(
                                                    percentageTotalDegrees4(
                                                        student
                                                    ).toFixed(1)
                                                )
                                            }}%
                                        </h3>
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
                                        @click.stop="
                                            openStudentDetails(student)
                                        "
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
                        <v-dialog v-model="dialogStudentDetails">
                            <v-stepper
                                v-model="e1"
                                alt-labels
                                editable
                                style="padding: 5px"
                            >
                                <v-stepper-header class="stepper_head">
                                    <template
                                        v-for="(step, index) in steps"
                                        :key="`${index}-step`"
                                    >
                                        <v-stepper-item
                                            class="stepper-width"
                                            style="
                                                font-size: 13px;
                                                font-weight: bold;
                                            "
                                            :complete="e1 > index + 1"
                                            :step="`Step ${index + 1}`"
                                            :value="index + 1"
                                            ref="stepperItems"
                                        >
                                            {{ step }}
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
                                                        justify-content: space-between;
                                                    "
                                                >
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
                                                        <h2
                                                            style="
                                                                color: #2196f3;
                                                            "
                                                        >
                                                            معلومات الطالب
                                                        </h2>
                                                    </div>
                                                    <v-btn
                                                        color="primary"
                                                        :disabled="!changesMade"
                                                        @click="saveChanges"
                                                        :class="{
                                                            'grey--text':
                                                                !changesMade,
                                                        }"
                                                    >
                                                        حفظ التغييرات
                                                    </v-btn>
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
                                                            selectedStudent
                                                                .student_information[0]
                                                                .student_name
                                                        "
                                                        style="width: 50%"
                                                        :error-messages="
                                                            errors.student_name
                                                        "
                                                        required
                                                        label="اسم الطالب"
                                                        @input="markChanges"
                                                    ></v-text-field>
                                                    <v-select
                                                        :items="[
                                                            '1/1',
                                                            '1/2',
                                                            '1/3',
                                                            '1/4',
                                                            '1/5',
                                                            '1/6',
                                                            '2/1',
                                                            '2/2',
                                                            '2/3',
                                                            '2/4',
                                                            '2/5',
                                                            '2/6',
                                                            '3/1',
                                                            '3/2',
                                                            '3/3',
                                                            '3/4',
                                                            '3/5',
                                                            '3/6',
                                                        ]"
                                                        variant="outlined"
                                                        style="width: 50%"
                                                        v-model="
                                                            selectedStudent
                                                                .student_information[1]
                                                                .class
                                                        "
                                                        :error-messages="
                                                            errors.class
                                                        "
                                                        label="الفصل"
                                                        required
                                                        @blur="markChanges"
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
                                                        v-model="
                                                            selectedStudent
                                                                .student_information[3]
                                                                .gender
                                                        "
                                                        style="width: 100%"
                                                        :error-messages="
                                                            errors.gender
                                                        "
                                                        label="الجنس"
                                                        required
                                                        :items="['انثي', 'ذكر']"
                                                        variant="outlined"
                                                        @blur="markChanges"
                                                    ></v-select>
                                                </div>
                                                <v-select
                                                    v-model="
                                                        selectedStudent
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
                                                    @blur="markChanges"
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
                                                                selectedStudent
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
                                                        >{{
                                                            index + 2
                                                        }}</v-avatar
                                                    >
                                                    <h2 style="color: #2196f3">
                                                        ولي الامر
                                                    </h2>
                                                </div>
                                                <v-text-field
                                                    v-model="
                                                        Guardian[0]
                                                            .Guardian_name
                                                    "
                                                    :error-messages="
                                                        errors.Guardian_name
                                                    "
                                                    label="الاسم"
                                                    required
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        Guardian[1]
                                                            .Guardian_phone
                                                    "
                                                    :error-messages="
                                                        errors.Guardian_phone
                                                    "
                                                    label="رقم التليفون"
                                                    required
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        Guardian[2]
                                                            .Guardian_email
                                                    "
                                                    :error-messages="
                                                        errors.Guardian_email
                                                    "
                                                    label="الايميل"
                                                    required
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="randomPassword"
                                                    :error-messages="
                                                        errors.Guardian_password
                                                    "
                                                    label="باسورد"
                                                    placeholder="باسورد"
                                                    :append-inner-icon="
                                                        visible
                                                            ? 'mdi-eye-off'
                                                            : 'mdi-eye'
                                                    "
                                                    :type="
                                                        visible
                                                            ? 'text'
                                                            : 'password'
                                                    "
                                                    density="compact"
                                                    prepend-inner-icon="mdi-content-copy"
                                                    variant="outlined"
                                                    @click:prepend-inner="
                                                        copyPassword
                                                    "
                                                    @click:append-inner="
                                                        toggleVisibility
                                                    "
                                                ></v-text-field>
                                                <v-select
                                                    v-model="
                                                        Guardian[4]
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
                                                        Guardian[4]
                                                            .Brothers_in_school ===
                                                        'نعم'
                                                    "
                                                >
                                                    <div
                                                        v-for="(
                                                            bor, index
                                                        ) in Guardian[5]
                                                            .brother"
                                                        :key="index"
                                                    >
                                                        <v-text-field
                                                            v-model="
                                                                Guardian[5]
                                                                    .brother[
                                                                    index
                                                                ]
                                                            "
                                                            :error-messages="
                                                                errors.brother
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
                                                        ) in selectedStudent
                                                            .Results[0].weekly"
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
                                                                                selectedStudent.id,
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
                                                                                selectedStudent.id,
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
                                                                    <tr>
                                                                        <td>
                                                                            تاريخ
                                                                            الامتحان
                                                                        </td>
                                                                        <td>
                                                                            {{
                                                                                week.Date
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
                                                                <v-menu
                                                                    ref="menuz"
                                                                    v-model="
                                                                        menuz
                                                                    "
                                                                    :close-on-content-click="
                                                                        false
                                                                    "
                                                                    transition="scale-transition"
                                                                    offset-y
                                                                    min-width="290px"
                                                                    @open="
                                                                        initializeTempDatez
                                                                    "
                                                                >
                                                                    <template
                                                                        v-slot:activator="{
                                                                            on,
                                                                            attrs,
                                                                        }"
                                                                    >
                                                                        <v-text-field
                                                                            v-model="
                                                                                newSubject.Date
                                                                            "
                                                                            label="تاريخ الامتحان"
                                                                            prepend-icon="mdi-calendar"
                                                                            readonly
                                                                            required
                                                                            @click="
                                                                                menuz = true
                                                                            "
                                                                            v-bind="
                                                                                attrs
                                                                            "
                                                                            v-on="
                                                                                on
                                                                            "
                                                                        ></v-text-field>
                                                                    </template>
                                                                    <v-card>
                                                                        <v-date-picker
                                                                            v-model="
                                                                                tempDatez
                                                                            "
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
                                                                                    menuz = false
                                                                                "
                                                                                >إلغاء</v-btn
                                                                            >
                                                                            <v-btn
                                                                                text
                                                                                @click="
                                                                                    confirmDatez
                                                                                "
                                                                                >تأكيد</v-btn
                                                                            >
                                                                        </v-card-actions>
                                                                    </v-card>
                                                                </v-menu>
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
                                                                        selectedStudent.id
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
                                                                <v-menu
                                                                    ref="menu"
                                                                    v-model="
                                                                        menuz
                                                                    "
                                                                    :close-on-content-click="
                                                                        false
                                                                    "
                                                                    transition="scale-transition"
                                                                    offset-y
                                                                    min-width="290px"
                                                                    @open="
                                                                        initializeTempDatez
                                                                    "
                                                                >
                                                                    <template
                                                                        v-slot:activator="{
                                                                            on,
                                                                            attrs,
                                                                        }"
                                                                    >
                                                                        <v-text-field
                                                                            v-model="
                                                                                editedSubject.Date
                                                                            "
                                                                            label="تاريخ الامتحان"
                                                                            prepend-icon="mdi-calendar"
                                                                            readonly
                                                                            required
                                                                            @click="
                                                                                menuz = true
                                                                            "
                                                                            v-bind="
                                                                                attrs
                                                                            "
                                                                            v-on="
                                                                                on
                                                                            "
                                                                        ></v-text-field>
                                                                    </template>
                                                                    <v-card>
                                                                        <v-date-picker
                                                                            v-model="
                                                                                tempDatez
                                                                            "
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
                                                                                    confirmDatez
                                                                                "
                                                                                >تأكيد</v-btn
                                                                            >
                                                                        </v-card-actions>
                                                                    </v-card>
                                                                </v-menu>
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
                                            <div style="padding: 20px">
                                                <div
                                                    style="
                                                        display: flex;
                                                        justify-content: space-between;
                                                        align-items: center;
                                                    "
                                                >
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
                                                            >{{
                                                                index + 4
                                                            }}</v-avatar
                                                        >
                                                        <h2
                                                            style="
                                                                color: #2196f3;
                                                            "
                                                        >
                                                            النتائج الشهرية
                                                        </h2>
                                                    </div>
                                                    <v-btn
                                                        rounded="xs"
                                                        size="large"
                                                        :disabled="
                                                            !changesMade2
                                                        "
                                                        @click="saveChanges2"
                                                        color="primary"
                                                        :class="{
                                                            'grey--text':
                                                                !changesMade2,
                                                        }"
                                                        >حفظ التغييرات</v-btn
                                                    >
                                                </div>
                                                <!-- Select month buttons -->
                                                <v-card flat>
                                                    <v-row>
                                                        <v-col
                                                            cols="12"
                                                            class="d-flex justify-center ma-3"
                                                        >
                                                            <v-btn
                                                                rounded="xs"
                                                                size="large"
                                                                @click="
                                                                    selectMonth(
                                                                        'شهر يناير'
                                                                    )
                                                                "
                                                                >شهر
                                                                يناير</v-btn
                                                            >
                                                            <v-btn
                                                                rounded="xs"
                                                                size="large"
                                                                @click="
                                                                    selectMonth(
                                                                        'شهر فبراير'
                                                                    )
                                                                "
                                                                >شهر
                                                                فبراير</v-btn
                                                            >
                                                            <v-btn
                                                                rounded="xs"
                                                                size="large"
                                                                @click="
                                                                    selectMonth(
                                                                        'شهر مارس'
                                                                    )
                                                                "
                                                                >شهر مارس</v-btn
                                                            >
                                                            <v-btn
                                                                rounded="xs"
                                                                size="large"
                                                                @click="
                                                                    selectMonth(
                                                                        'شهر ابرايل'
                                                                    )
                                                                "
                                                                >شهر
                                                                ابرايل</v-btn
                                                            >
                                                        </v-col>
                                                    </v-row>

                                                    <!-- Student information -->
                                                    <v-row
                                                        class="d-flex flex-row align-center justify-space-between ma-5"
                                                    >
                                                        <v-col>
                                                            <v-col>
                                                                <v-text-title
                                                                    >الاسم:</v-text-title
                                                                >
                                                                <v-text-title>{{
                                                                    selectedStudent
                                                                        .student_information[0]
                                                                        .student_name
                                                                }}</v-text-title>
                                                            </v-col>
                                                            <v-col>
                                                                <v-text-title
                                                                    >المرحلة
                                                                    الدراسية:</v-text-title
                                                                >
                                                                <v-text-title>{{
                                                                    year
                                                                }}</v-text-title>
                                                            </v-col>
                                                            <v-col>
                                                                <v-text-title
                                                                    >امتحان:</v-text-title
                                                                >
                                                                <v-text-title>{{
                                                                    selectedMonth
                                                                }}</v-text-title>
                                                            </v-col>
                                                        </v-col>
                                                        <v-col
                                                            class="d-flex flex-column align-end"
                                                        >
                                                            <div
                                                                class="par d-flex flex-column justify-center"
                                                                style="
                                                                    width: 200px;
                                                                    height: 200px;
                                                                "
                                                            >
                                                                <img
                                                                    src="../assets/images.jpeg"
                                                                    alt="School Logo"
                                                                />
                                                                <p class="ma-2">
                                                                    معهد السراج
                                                                    المنير
                                                                    الأزهري
                                                                </p>
                                                            </div>
                                                        </v-col>
                                                    </v-row>

                                                    <!-- Results table -->
                                                    <div class="table">
                                                        <v-table>
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        اسم
                                                                        المادة
                                                                    </th>
                                                                    <th>
                                                                        اسم
                                                                        المعلم
                                                                    </th>
                                                                    <th>
                                                                        تقييم
                                                                        السلوك
                                                                    </th>
                                                                    <th>
                                                                        الدرجة
                                                                        الصغرى
                                                                    </th>
                                                                    <th>
                                                                        الدرجة
                                                                        الكبرى
                                                                    </th>
                                                                    <th>
                                                                        الدرجة
                                                                        النهائية
                                                                        للطالب
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr
                                                                    v-for="(
                                                                        degree,
                                                                        index
                                                                    ) in selectedMonthlyDegrees"
                                                                    :key="index"
                                                                >
                                                                    <td>
                                                                        {{
                                                                            degree.Subject_Name
                                                                        }}
                                                                    </td>
                                                                    <td>
                                                                        <v-text-field
                                                                            v-model="
                                                                                degree.Teacher_Name
                                                                            "
                                                                            style="
                                                                                text-align: center;
                                                                            "
                                                                            required
                                                                        ></v-text-field>
                                                                    </td>
                                                                    <td>
                                                                        <v-text-field
                                                                            v-model="
                                                                                degree.Behavior_assessment
                                                                            "
                                                                            style="
                                                                                text-align: center;
                                                                            "
                                                                            required
                                                                        ></v-text-field>
                                                                    </td>
                                                                    <td>
                                                                        {{
                                                                            degree.Minor_degree
                                                                        }}
                                                                    </td>
                                                                    <td>
                                                                        {{
                                                                            degree.Major_degree
                                                                        }}
                                                                    </td>
                                                                    <td>
                                                                        <v-text-field
                                                                            v-model="
                                                                                degree.Student_degree
                                                                            "
                                                                            style="
                                                                                text-align: center;
                                                                            "
                                                                            required
                                                                        ></v-text-field>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </v-table>
                                                    </div>
                                                </v-card>
                                            </div>
                                        </div>
                                        <div v-if="e1 === 5" ref="slide5">
                                            <div
                                                style="
                                                    display: flex;
                                                    justify-content: space-between;
                                                    align-items: center;
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
                                                        >{{
                                                            index + 5
                                                        }}</v-avatar
                                                    >
                                                    <h2 style="color: #2196f3">
                                                        المدفوعات
                                                    </h2>
                                                </div>
                                                <v-btn
                                                    rounded="xs"
                                                    size="large"
                                                    :disabled="!changesMade3"
                                                    @click="saveChanges3"
                                                    color="primary"
                                                    :class="{
                                                        'grey--text':
                                                            !changesMade,
                                                    }"
                                                    >حفظ التعديلات</v-btn
                                                >
                                            </div>
                                            <v-card
                                                flat
                                                class="mx-auto my-4"
                                                max-width="90%"
                                            >
                                                <v-container fluid>
                                                    <v-row class="ma-10">
                                                        <v-col
                                                            cols="12"
                                                            sm="4"
                                                            class="d-flex justify-center"
                                                        >
                                                            <v-card
                                                                class="pa-3 fixed-card mb-3"
                                                                outlined
                                                            >
                                                                <v-card-title
                                                                    class="custom-title custom-font text-center"
                                                                    style="
                                                                        font-size: 20px;
                                                                    "
                                                                    >المستحق</v-card-title
                                                                >
                                                                <v-card-subtitle
                                                                    class="custom-font centered-subtitle"
                                                                    style="
                                                                        font-size: 16px;
                                                                    "
                                                                >
                                                                    <v-text-field
                                                                        v-model="
                                                                            selectedStudent
                                                                                .payments
                                                                                .Requird
                                                                        "
                                                                        style="
                                                                            text-align: center;
                                                                        "
                                                                        class="payments_input"
                                                                        required
                                                                        @input="
                                                                            handleInput
                                                                        "
                                                                    ></v-text-field>
                                                                </v-card-subtitle>
                                                            </v-card>
                                                        </v-col>
                                                        <v-col
                                                            cols="12"
                                                            sm="4"
                                                            class="d-flex justify-center"
                                                        >
                                                            <v-card
                                                                class="pa-3 fixed-card mb-3"
                                                                outlined
                                                            >
                                                                <v-card-title
                                                                    class="custom-title custom-font text-center"
                                                                    style="
                                                                        font-size: 20px;
                                                                    "
                                                                    >المدفوع</v-card-title
                                                                >
                                                                <v-card-subtitle
                                                                    class="custom-font centered-subtitle"
                                                                    style="
                                                                        font-size: 16px;
                                                                    "
                                                                >
                                                                    <v-text-field
                                                                        v-model="
                                                                            selectedStudent
                                                                                .payments
                                                                                .paid_up
                                                                        "
                                                                        style="
                                                                            text-align: center;
                                                                        "
                                                                        class="payments_input"
                                                                        required
                                                                        @input="
                                                                            handleInput
                                                                        "
                                                                    ></v-text-field>
                                                                </v-card-subtitle>
                                                            </v-card>
                                                        </v-col>
                                                        <v-col
                                                            cols="12"
                                                            sm="4"
                                                            class="d-flex justify-center"
                                                        >
                                                            <v-card
                                                                class="pa-3 fixed-card mb-3"
                                                                outlined
                                                            >
                                                                <v-card-title
                                                                    class="custom-title custom-font text-center"
                                                                    style="
                                                                        font-size: 20px;
                                                                    "
                                                                    >نظام
                                                                    التقسيط</v-card-title
                                                                >
                                                                <v-card-subtitle
                                                                    class="custom-font centered-subtitle"
                                                                    style="
                                                                        font-size: 16px;
                                                                    "
                                                                >
                                                                    <v-select
                                                                        v-model="
                                                                            selectedStudent
                                                                                .payments
                                                                                .installment_system
                                                                        "
                                                                        :items="[
                                                                            'مره واحده',
                                                                            'مرتين',
                                                                            'ثلاث مرات',
                                                                            'اربع مرات',
                                                                            'خمس مرات',
                                                                        ]"
                                                                        style="
                                                                            text-align: center;
                                                                        "
                                                                        class="payments_input"
                                                                        required
                                                                        @blur="
                                                                            handleInput
                                                                        "
                                                                    ></v-select>
                                                                </v-card-subtitle>
                                                            </v-card>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-card>
                                        </div>
                                        <div v-if="e1 === 6" ref="slide6">
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
                                                        >{{
                                                            index + 6
                                                        }}</v-avatar
                                                    >
                                                    <h2 style="color: #2196f3">
                                                        الاشعارات
                                                    </h2>
                                                </div>
                                                <v-btn
                                                    color="blue"
                                                    @click="
                                                        dialogAddNotice = true
                                                    "
                                                    >إضافةاشعار</v-btn
                                                >
                                            </div>

                                            <v-row>
                                                <v-col
                                                    v-for="(
                                                        note, index
                                                    ) in selectedStudent.Notifications"
                                                    :key="index"
                                                    cols="12"
                                                    md="4"
                                                >
                                                    <v-alert
                                                        :type="
                                                            note.NotificationType ===
                                                            'سئ'
                                                                ? 'error'
                                                                : note.NotificationType ===
                                                                  'جيد'
                                                                ? 'success'
                                                                : 'info'
                                                        "
                                                        class="pa-3 mb-3 notification-card"
                                                        border="left"
                                                        colored-border
                                                    >
                                                        <div
                                                            class="d-flex justify-space-between align-center"
                                                        >
                                                            <span>{{
                                                                note.NoticeTitle
                                                            }}</span>
                                                            <div>
                                                                <v-icon
                                                                    small
                                                                    color="white"
                                                                    class="mr-2"
                                                                    @click="
                                                                        editNotifications(
                                                                            selectedStudent.id,
                                                                            index
                                                                        )
                                                                    "
                                                                >
                                                                    mdi-pencil
                                                                </v-icon>
                                                                <v-icon
                                                                    small
                                                                    class="mr-2"
                                                                    color="white"
                                                                    @click="
                                                                        deleteNotification(
                                                                            selectedStudent.id,
                                                                            index
                                                                        )
                                                                    "
                                                                >
                                                                    mdi-delete
                                                                </v-icon>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            {{
                                                                note.theDescription
                                                            }}
                                                        </div>
                                                    </v-alert>
                                                </v-col>
                                            </v-row>

                                            <v-dialog
                                                v-model="dialogAddNotice"
                                                max-width="500px"
                                            >
                                                <v-card>
                                                    <v-card-title>
                                                        <span class="headline"
                                                            >إضافة اشعار
                                                            جديدة</span
                                                        >
                                                    </v-card-title>
                                                    <v-card-text>
                                                        <v-form ref="addForm">
                                                            <v-text-field
                                                                v-model="
                                                                    AddNotice.NoticeTitle
                                                                "
                                                                label="عنوان الاشعار"
                                                                required
                                                            ></v-text-field>
                                                            <v-textarea
                                                                v-model="
                                                                    AddNotice.theDescription
                                                                "
                                                                label="الوصف"
                                                                required
                                                            ></v-textarea>
                                                            <v-select
                                                                v-model="
                                                                    AddNotice.NotificationType
                                                                "
                                                                label="نوع الاشعار"
                                                                required
                                                                :items="[
                                                                    'سئ',
                                                                    'جيد',
                                                                    'معلومات',
                                                                ]"
                                                            ></v-select>
                                                        </v-form>
                                                    </v-card-text>
                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn
                                                            color="blue darken-1"
                                                            text
                                                            @click="
                                                                dialogAddNotice = false
                                                            "
                                                            >إلغاء</v-btn
                                                        >
                                                        <v-btn
                                                            color="blue darken-1"
                                                            text
                                                            @click="
                                                                addNotifications(
                                                                    selectedStudent.id
                                                                )
                                                            "
                                                            >حفظ</v-btn
                                                        >
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>

                                            <v-dialog
                                                v-model="
                                                    editNotificationsDialog
                                                "
                                                max-width="500px"
                                            >
                                                <v-card>
                                                    <v-card-title>
                                                        <span class="headline"
                                                            >تعديل الاشعار</span
                                                        >
                                                    </v-card-title>
                                                    <v-card-text>
                                                        <v-form ref="editForm">
                                                            <v-text-field
                                                                v-model="
                                                                    editedNotifications.NoticeTitle
                                                                "
                                                                label="عنوان الاشعار"
                                                                required
                                                            ></v-text-field>
                                                            <v-textarea
                                                                v-model="
                                                                    editedNotifications.theDescription
                                                                "
                                                                label="الوصف"
                                                                required
                                                            ></v-textarea>
                                                            <v-select
                                                                v-model="
                                                                    editedNotifications.NotificationType
                                                                "
                                                                label="نوع الاشعار"
                                                                required
                                                                :items="[
                                                                    'سئ',
                                                                    'جيد',
                                                                    'معلومات',
                                                                ]"
                                                            ></v-select>
                                                        </v-form>
                                                    </v-card-text>
                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn
                                                            color="blue darken-1"
                                                            text
                                                            @click="
                                                                closeNotificationsDialogs
                                                            "
                                                            >إلغاء</v-btn
                                                        >
                                                        <v-btn
                                                            color="blue darken-1"
                                                            text
                                                            @click="
                                                                saveNotificationsEdit
                                                            "
                                                            >حفظ</v-btn
                                                        >
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </div>
                                        <div v-if="e1 === 7" ref="slide7">
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
                                                        {{ index + 7 }}
                                                    </v-avatar>
                                                    <h2 style="color: #2196f3">
                                                        الصور
                                                    </h2>
                                                </div>
                                                <v-btn
                                                    color="blue"
                                                    @click="
                                                        dialogAddPhoto = true
                                                    "
                                                    >اضافه صوره</v-btn
                                                >
                                            </div>
                                            <v-row>
                                                <v-col
                                                    v-for="(
                                                        photo, index
                                                    ) in selectedStudent.photos"
                                                    :key="index"
                                                    cols="12"
                                                    md="4"
                                                >
                                                    <v-card
                                                        class="pa-3 mb-3 notification-card"
                                                        outlined
                                                    >
                                                        <v-card-title
                                                            class="d-flex align-left"
                                                            style="
                                                                justify-content: end;
                                                            "
                                                        >
                                                            <div>
                                                                <v-icon
                                                                    small
                                                                    class="mr-2"
                                                                    @click="
                                                                        deletePhotos(
                                                                            selectedStudent.id,
                                                                            index
                                                                        )
                                                                    "
                                                                    >mdi-delete</v-icon
                                                                >
                                                            </div>
                                                        </v-card-title>
                                                        <v-card-text>
                                                            <v-img
                                                                :src="
                                                                    photo.linkphoto
                                                                "
                                                                aspect-ratio="1"
                                                                class="mb-2"
                                                            ></v-img>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-col>
                                            </v-row>

                                            <v-dialog
                                                v-model="dialogAddPhoto"
                                                max-width="500px"
                                            >
                                                <v-card>
                                                    <v-card-title>
                                                        <span class="headline"
                                                            >إضافة صوره
                                                            جديدة</span
                                                        >
                                                    </v-card-title>
                                                    <v-card-text>
                                                        <v-form ref="addForm">
                                                            <v-file-input
                                                                style="
                                                                    width: 100%;
                                                                "
                                                                v-model="
                                                                    AddPhoto.file
                                                                "
                                                                label="صورة"
                                                                accept="image/*"
                                                                variant="outlined"
                                                                prepend-icon=""
                                                                width="100%"
                                                                prepend-inner-icon="mdi-paperclip"
                                                                required
                                                            ></v-file-input>
                                                            <v-textarea
                                                                v-model="
                                                                    AddPhoto.grade
                                                                "
                                                                label="وصف الصوره"
                                                                required
                                                            ></v-textarea>
                                                        </v-form>
                                                    </v-card-text>
                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn
                                                            color="blue darken-1"
                                                            text
                                                            @click="
                                                                dialogAddPhoto = false
                                                            "
                                                            >إلغاء</v-btn
                                                        >
                                                        <v-btn
                                                            color="blue darken-1"
                                                            text
                                                            @click="
                                                                addPhoto(
                                                                    selectedStudent.id
                                                                )
                                                            "
                                                            >حفظ</v-btn
                                                        >
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </div>
                                    </form>
                                </v-stepper-window>
                            </v-stepper>
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
                                                '1/3',
                                                '1/4',
                                                '1/5',
                                                '1/6',
                                                '2/1',
                                                '2/2',
                                                '2/3',
                                                '2/4',
                                                '2/5',
                                                '2/6',
                                                '3/1',
                                                '3/2',
                                                '3/3',
                                                '3/4',
                                                '3/5',
                                                '3/6',
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
                                            v-model="
                                                form.student_information[3]
                                                    .gender
                                            "
                                            style="width: 100%"
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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
import { getStorage } from "firebase/storage";
import { gsap } from "gsap";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css"; // Import the CSS file
import { initializeApp } from "@firebase/app";
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
import { useDialogStore } from "@/store/useDialogStore";
export default {
    name: "StudentList",
    props: {
        year: {
            type: Number,
            required: true,
        },
        sortStudents: Function,
        selectedSection: {
            type: String,
            default: "الكل",
        },
    },
    setup() {
        const toast = useToast();

        // Example usage of toast
        // toast.success("This is a success message!");

        const dialogStore = useDialogStore();
        return { dialogStore, toast };
    },
    data() {
        return {
            dialog_stu: false,
            menuz: false,
            steps: [
                "معلومات الطالب",
                "ولي الامر",
                "النتائج الاسبوعيه",
                "النتائج الشهريه",
                "المدفوعات",
                "الاشعارات",
                "الصور",
            ],
            tempDatez: null,
            editNotificationsDialog: false,
            editPhotosDialog: false,
            dialogAddNotice: false,
            dialogAddPhoto: false,
            dialogs: false,
            editedField: "",
            editedValue: "",
            randomPassword: "",
            selectedMonth: "شهر يناير",
            dialogAddSubject: false,
            newSubject: {
                Subject_Name: "",
                Major_degree: null,
                Student_degree: null,
                Date: null,
            },
            years: "",
            AddNotice: {
                NoticeTitle: "",
                theDescription: "",
                NotificationType: "",
            },
            AddPhoto: {
                Date: "",
                link: "",
            },
            visible: false,
            menu: false,
            e1: 1,
            students_class: [],
            dialog_addstudent: false,
            searchQuery: "",
            students: [],
            form: {
                student_information: [
                    { student_name: "" },
                    { class: "" },
                    { educational_level: this.year },
                    { gender: "" },
                    { section: "" },
                    { birthday: null },
                ],
                Guardian: [
                    { Guardian_name: "" },
                    { Guardian_phone: "" },
                    { Guardian_email: "" },
                    { Guardian_password: "" },
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
                                Date: null,
                            },
                        ],
                    },
                    {
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
                            {
                                Certificate_title: "شهر مارس",
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
                            {
                                Certificate_title: "شهر ابرايل",
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
                    },
                ],
                payments: {
                    Requird: 0,
                    paid_up: 0,
                    installment_system: "",
                },
                Notifications: [
                    {
                        NoticeTitle: "",
                        theDescription: "",
                        NotificationType: "",
                    },
                ],

                photos: [
                    {
                        Date: "",
                        link: "",
                    },
                ],
            },

            errors: {
                student_name: [],
                class: [],
                educational_level: [],
                gender: [],
                section: [],
                birthday: [],
                Guardian_name: [],
                Guardian_phone: [],
                Guardian_email: [],
                Guardian_password: [],
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
                Date: null,
            },
            editedNotifications: {
                NoticeTitle: "",
                theDescription: "",
                NotificationType: "",
            },
            editedPhotos: {
                Date: "",
                link: "",
            },
            loading: false,
            currentStudentId: null,
            valid: false,
            editedmony: {
                Requird: 0,
                paid_up: 0,
                installment_system: "",
            },
            hhhh: false,
            editednas: {
                Requird: 100,
                paid_up: 120,
                installment_system: "شهريا",
            },
            selectedStudent: "",
            dialogStudentDetails: false,
            changesMade: false,
            changesMade2: true,
            changesMade3: false,
        };
    },
    async created() {
        await this.fetchStudents();
        this.years = new Date().getFullYear();
    },
    methods: {
        totalDegrees(student) {
            const degrees = student.Results[1].Monthly[0].Degrees; // Assuming the first month is the desired one
            let total = 0;
            degrees.forEach((degree) => {
                total += Number(degree.Student_degree); // Ensuring the degree is a number
            });
            return total;
        },
        percentageTotalDegrees(student) {
            const totalDegrees = this.totalDegrees(student);
            const maxDegrees =
                student.Results[1].Monthly[0].Degrees.length * 100; // Assuming each subject has a max of 100
            return (totalDegrees / maxDegrees) * 100;
        },
        totalDegrees2(student) {
            const degrees = student.Results[1].Monthly[1].Degrees; // Assuming the first month is the desired one
            let total = 0;
            degrees.forEach((degree) => {
                total += Number(degree.Student_degree); // Ensuring the degree is a number
            });
            return total;
        },
        percentageTotalDegrees2(student) {
            const totalDegrees = this.totalDegrees2(student);
            const maxDegrees =
                student.Results[1].Monthly[1].Degrees.length * 100; // Assuming each subject has a max of 100
            return (totalDegrees / maxDegrees) * 100;
        },
        totalDegrees3(student) {
            const degrees = student.Results[1].Monthly[2].Degrees; // Assuming the first month is the desired one
            let total = 0;
            degrees.forEach((degree) => {
                total += Number(degree.Student_degree); // Ensuring the degree is a number
            });
            return total;
        },
        percentageTotalDegrees3(student) {
            const totalDegrees = this.totalDegrees3(student);
            const maxDegrees =
                student.Results[1].Monthly[2].Degrees.length * 100; // Assuming each subject has a max of 100
            return (totalDegrees / maxDegrees) * 100;
        },
        totalDegrees4(student) {
            const degrees = student.Results[1].Monthly[3].Degrees; // Assuming the first month is the desired one
            let total = 0;
            degrees.forEach((degree) => {
                total += Number(degree.Student_degree); // Ensuring the degree is a number
            });
            return total;
        },
        percentageTotalDegrees4(student) {
            const totalDegrees = this.totalDegrees4(student);
            const maxDegrees =
                student.Results[1].Monthly[3].Degrees.length * 100; // Assuming each subject has a max of 100
            return (totalDegrees / maxDegrees) * 100;
        },
        async updateField(section, index, field, value) {
            if (!this.selectedStudent) {
                console.error("Error: selectedStudent is null");
                return;
            }

            // Update the selected student data
            this.selectedStudent[section][index][field] = value;
            this.changesMade = true;
            // Call updateFirebaseField to update Firestore
            await this.updateFirebaseField();
        },

        async updateFirebaseField() {
            try {
                const studentDoc = doc(db, "students", this.selectedStudent.id);

                // Update only the necessary fields in Firestore
                await updateDoc(studentDoc, {
                    student_information:
                        this.selectedStudent.student_information,
                });

                console.log("Document updated successfully");
            } catch (error) {
                console.error("Error updating document:", error);
            }
        },
        markChanges() {
            // Mark changes only, without updating Firebase
            if (!this.changesMade) {
                this.changesMade = true;
                // Optionally, you can also store the original data for comparison
                this.originalStudentData = JSON.parse(
                    JSON.stringify(this.selectedStudent)
                );
            }
        },
        async saveChanges() {
            try {
                const studentDoc = doc(db, "students", this.selectedStudent.id);
                // Update only if changes were marked

                if (this.changesMade) {
                    await updateDoc(studentDoc, {
                        student_information:
                            this.selectedStudent.student_information,
                    });
                    console.log("Document updated successfully");
                }
                // Reset changesMade and original data
                this.changesMade = false;
                this.originalStudentData = {};
            } catch (error) {
                console.error("Error updating document:", error);
            }
        },
        selectMonth(month) {
            this.selectedMonth = month;
            // Fetch the data for the selected month
        },
        saveChanges2() {
            this.updateMonthlyDegrees(this.selectedMonthlyDegrees); // Example to update Firebase
            this.changesMade2 = false;
        },

        getAlertType(notificationType) {
            if (notificationType === "سي") {
                return "error";
            }
            switch (notificationType) {
                case "success":
                    return "success";
                case "error":
                    return "error";
                case "warning":
                    return "warning";
                case "info":
                    return "info";
                default:
                    return "info";
            }
        },
        getIcon(notificationType) {
            switch (notificationType) {
                case "success":
                    return "mdi-check-circle";
                case "error":
                case "سي":
                    return "mdi-alert-circle";
                case "warning":
                    return "mdi-alert";
                case "info":
                    return "mdi-information";
                default:
                    return "mdi-information";
            }
        },
        getIconClass(notificationType) {
            switch (notificationType) {
                case "success":
                    return "green";
                case "error":
                case "سي":
                    return "red";
                case "warning":
                    return "orange";
                case "info":
                    return "blue";
                default:
                    return "blue";
            }
        },
        async fetchStudents() {
            try {
                const querySnapshot = await getDocs(collection(db, "students"));
                this.students = querySnapshot.docs.map((doc) => {
                    const studentData = doc.data();
                    const student = {
                        id: doc.id,
                        ...studentData,
                        student_information:
                            studentData.student_information.map(
                                (info, index) => {
                                    if (
                                        index === 5 &&
                                        info.birthday &&
                                        info.birthday.seconds
                                    ) {
                                        const date = new Date(
                                            info.birthday.seconds * 1000
                                        );
                                        return {
                                            ...info,
                                            birthday: this.formatDate(date),
                                        };
                                    }
                                    return info;
                                }
                            ),
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
                try {
                    // Add student data to Firestore
                    const docRef = await addDoc(collection(db, "students"), {
                        student_information: this.form.student_information,
                        Results: this.form.Results,
                        payments: this.form.payments,
                        Notifications: this.form.Notifications,
                        photos: this.form.photos,
                        year: new Date().getFullYear(),
                    });

                    // Get the ID of the newly added document
                    const newStudentId = docRef.id;

                    // Construct the student object to add to the local array
                    const newStudent = {
                        id: newStudentId,
                        student_information: this.form.student_information,
                        Results: this.form.Results,
                        payments: this.form.payments,
                        Notifications: this.form.Notifications,
                        photos: this.form.photos,
                        year: this.years,
                    };

                    // Push the new student to the local array
                    this.students.push(newStudent);

                    // Reset form fields and close dialog
                    this.dialog_addstudent = false;
                    this.handleReset();
                    await this.fetchStudents();
                    this.dialogStore.hideAddStudentDialog();

                    console.log("Added new student:", newStudent);
                } catch (error) {
                    console.error("Error adding document:", error);
                }
            }
        },
        openDeleteDialog(studentId) {
            this.dialog_stu = studentId;
        },
        closeDeleteDialog() {
            this.dialog_stu = null;
        },
        async confirmDeleteStudent(studentId) {
            this.loading = true;
            try {
                await this.deleteStudent(studentId);
            } catch (error) {
                console.error("Error deleting student:", error);
            } finally {
                this.loading = false;
                this.closeDeleteDialog();
            }
        },
        async deleteStudent(id) {
            try {
                await deleteDoc(doc(db, "students", id));
                this.students = this.students.filter(
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
                    { birthday: null },
                ],
                Guardian: [
                    { Guardian_name: "" },
                    { Guardian_phone: "" },
                    { Guardian_email: "" },
                    { Guardian_password: "" },
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
                                Date: null,
                            },
                        ],
                    },
                    {
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
                            {
                                Certificate_title: "شهر مارس",
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
                            {
                                Certificate_title: "شهر ابرايل",
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
                    },
                ],
                payments: {
                    Requird: 0,
                    paid_up: 0,
                    installment_system: "",
                },
                Notifications: [
                    {
                        NoticeTitle: "",
                        theDescription: "",
                        NotificationType: "",
                    },
                ],
                photos: [
                    {
                        Date: "",
                        link: "",
                    },
                ],
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
        async searchStudent() {
            try {
                const trimmedQuery = this.searchQuery.trim().toLowerCase();
                // Fetch all students if search query is empty
                if (!trimmedQuery) {
                    const querySnapshot = await getDocs(
                        collection(db, "students")
                    );
                    this.students = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                        showDetails: false,
                    }));
                } else {
                    // Perform search based on the trimmed search query
                    const querySnapshot = await getDocs(
                        collection(db, "students")
                    );
                    this.students = querySnapshot.docs
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
        removeItem(index) {
            this.testform4.splice(index, 1);
        },
        generateRandomPassword() {
            // توليد كلمة مرور عشوائية
            const characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let password = "";
            for (let i = 0; i < 8; i++) {
                password += characters.charAt(
                    Math.floor(Math.random() * characters.length)
                );
            }
            // تحديث حالة المكون لعرض الكلمة المرور الجديدةة
            this.randomPassword = password;
            return this.randomPassword;
        },
        toggleVisibility() {
            this.visible = !this.visible;
        },
        async copyPassword() {
            const toast = useToast();
            try {
                await navigator.clipboard.writeText(this.randomPassword);
                toast.success("تم نسخ الباسورد!");
            } catch (err) {
                console.error("Failed to copy text: ", err);
                toast.error("فشل في نسخ الباسورد", {
                    className: "custom-toast-error",
                });
            }
        },
        openStudentDetails(student) {
            this.selectedStudent = student;
            this.dialogStudentDetails = true;
        },
        // l;
        initializeTempDate() {
            // this.tempDate = this.form.student_information[5].birthday;
            this.tempDate = this.form.student_information[5].birthday;
            new Date().toISOString().substr(0, 10);
        },
        confirmDate() {
            this.form.student_information[5].birthday = this.tempDate;
            this.formattedDate = this.formatDate(this.tempDate);
            this.menu = false;
        },
        formatDate(date) {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");
            return `${year}/${month}/${day}`;
        },
        // ik
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
                        Date: this.newSubject.Date,
                    });
                    // Update selectedStudent with the updated data
                    // عند تحديث selectedStudent باستخدام بيانات محدثة
                    this.selectedStudent = Object.assign(
                        {},
                        this.selectedStudent,
                        studentData
                    );

                    // Update the student document with the new weekly result
                    await updateDoc(studentRef, studentData);

                    // Close the dialog after adding the subject
                    this.dialogAddSubject = false;

                    // Reset newSubject for future additions
                    this.newSubject = {
                        Subject_Name: "",
                        Major_degree: null,
                        Student_degree: null,
                        Date: null,
                    };

                    // Fetch students again to update the UI
                    await this.fetchStudents();
                }
            } catch (error) {
                console.error("Error adding subject:", error);
            }
        },

        editSubject(studentId, index) {
            this.editedStudentId = studentId;
            this.editedIndex = index;
            const student = this.students.find(
                (student) => student.id === studentId
            );

            if (student) {
                this.editedSubject = {
                    ...student.Results[0].weekly[index],
                };
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
                    // عند تحديث selectedStudent باستخدام بيانات محدثة
                    this.selectedStudent = Object.assign(
                        {},
                        this.selectedStudent,
                        studentData
                    );
                    console.log(this.selectedStudent);

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
                Date: null, // إعادة تعيين التاريخ
            };
        },
        async deleteSubject(studentId, subjectIndex) {
            try {
                const studentRef = doc(db, "students", studentId);
                const studentDoc = await getDoc(studentRef);

                if (!studentDoc.exists()) {
                    console.error("Student does not exist with id:", studentId);
                    return;
                }

                const studentData = studentDoc.data();

                if (!studentData.Results || !studentData.Results[0].weekly) {
                    console.error(
                        "Invalid student data structure:",
                        studentData
                    );
                    return;
                }

                if (
                    subjectIndex < 0 ||
                    subjectIndex >= studentData.Results[0].weekly.length
                ) {
                    console.error("Invalid subject index:", subjectIndex);
                    return;
                }
                // عند تحديث selectedStudent باستخدام بيانات محدثة
                this.selectedStudent = Object.assign(
                    {},
                    this.selectedStudent,
                    studentData
                );

                studentData.Results[0].weekly.splice(subjectIndex, 1);

                await updateDoc(studentRef, studentData);
                await this.fetchStudents();

                console.log(
                    "Deleted subject at index:",
                    subjectIndex,
                    "for student with id:",
                    studentId
                );
            } catch (error) {
                console.error("Error deleting subject:", error);
            }
        },
        formatDatez(date) {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");
            return `${year}/${month}/${day}`;
        },
        initializeTempDatez() {
            this.tempDatez =
                this.newSubject.Date ||
                this.editedSubject.Date ||
                new Date().toISOString().substr(0, 10);
        },
        confirmDatez() {
            const formattedDate = this.formatDatez(this.tempDatez);
            if (this.dialogAddSubject) {
                this.newSubject.Date = formattedDate;
            } else {
                this.editedSubject.Date = formattedDate;
            }
            this.menuz = false;
        },
        // ool
        // ias
        async saveNotificationsEdit() {
            try {
                const studentRef = doc(db, "students", this.editedStudentId);
                const studentDoc = await getDoc(studentRef);
                if (studentDoc.exists()) {
                    const studentData = studentDoc.data();
                    Object.assign(
                        studentData.Notifications[this.editedIndex],
                        this.editedNotifications
                    );
                    // عند تحديث selectedStudent باستخدام بيانات محدثة
                    this.selectedStudent = Object.assign(
                        {},
                        this.selectedStudent,
                        studentData
                    );
                    await updateDoc(studentRef, studentData);
                    this.closeNotificationsDialogs();
                    await this.fetchStudents();
                }
            } catch (error) {
                console.error("Error editing subject:", error);
            }
        },
        editNotifications(studentId, index) {
            this.editedStudentId = studentId;
            this.editedIndex = index;
            const selectedStudent = this.students.find(
                (selectedStudent) => selectedStudent.id === studentId
            );

            if (selectedStudent) {
                this.editedNotifications = {
                    ...selectedStudent.Notifications[index],
                };
                this.editNotificationsDialog = true;
            }
        },
        async addNotifications(studentId) {
            try {
                const studentRef = doc(db, "students", studentId);
                const studentDoc = await getDoc(studentRef);
                if (studentDoc.exists()) {
                    const studentData = studentDoc.data();
                    studentData.Notifications.push({
                        NoticeTitle: this.AddNotice.NoticeTitle,
                        theDescription: this.AddNotice.theDescription,
                        NotificationType: this.AddNotice.NotificationType,
                    });
                    // عند تحديث selectedStudent باستخدام بيانات محدثة
                    this.selectedStudent = Object.assign(
                        {},
                        this.selectedStudent,
                        studentData
                    );
                    await updateDoc(studentRef, studentData);
                    this.dialogAddNotice = false;

                    await this.fetchStudents();
                }
            } catch (error) {
                console.error("Error adding subject:", error);
            }
        },

        async deleteNotification(studentId, NotificatIndex) {
            try {
                const studentRef = doc(db, "students", studentId);
                const studentDoc = await getDoc(studentRef);
                if (studentDoc.exists()) {
                    const studentData = studentDoc.data();
                    studentData.Notifications.splice(NotificatIndex, 1);
                    // عند تحديث selectedStudent باستخدام بيانات محدثة
                    this.selectedStudent = Object.assign(
                        {},
                        this.selectedStudent,
                        studentData
                    );
                    await updateDoc(studentRef, studentData);
                    await this.fetchStudents();
                    // this.dilog_ss = true;
                }
            } catch (error) {
                console.error("Error deleting subject:", error);
            }
        },
        closeNotificationsDialogs() {
            this.editNotificationsDialog = false;
            this.editedIndex = -1;
            this.editedNotifications = {
                NoticeTitle: "",
                theDescription: "",
                NotificationType: "",
            };
        },

        // ul
        editPhotos(studentId, index) {
            this.editedStudentId = studentId;
            this.editedIndex = index;
            const selectedStudent = this.students_class.find(
                (student) => student.id === studentId
            );
            if (selectedStudent) {
                this.editedPhotos = { ...selectedStudent.photos[index] };
                this.editPhotosDialog = true;
            }
        },
        async savePhotosEdit() {
            try {
                let downloadURL = this.editedPhotos.linkphoto;
                if (this.editedPhotos.file) {
                    const storageRef = ref(
                        storage,
                        `photos/${this.editedPhotos.file.name}`
                    );
                    await uploadBytes(storageRef, this.editedPhotos.file);
                    downloadURL = await getDownloadURL(storageRef);
                }

                const studentRef = doc(db, "students", this.editedStudentId);
                const studentDoc = await getDoc(studentRef);
                if (studentDoc.exists()) {
                    const studentData = studentDoc.data();
                    studentData.photos[this.editedIndex] = {
                        linkphoto: downloadURL,
                        grade: this.editedPhotos.grade || "",
                    };
                    // عند تحديث selectedStudent باستخدام بيانات محدثة
                    this.selectedStudent = Object.assign(
                        {},
                        this.selectedStudent,
                        studentData
                    );
                    // Log the data before updating
                    console.log("Updating student data:", studentData);

                    // Ensure no undefined values
                    Object.keys(studentData).forEach((key) => {
                        if (studentData[key] === undefined) {
                            delete studentData[key];
                        }
                    });

                    await updateDoc(studentRef, { photos: studentData.photos });
                    this.closePhotoDialogs();
                    await this.fetchStudents();
                }
            } catch (error) {
                console.error("Error editing subject:", error);
            }
        },
        async addPhoto(studentId) {
            try {
                if (this.AddPhoto.file) {
                    const storageRef = ref(
                        storage,
                        `photos/${this.AddPhoto.file.name}`
                    );
                    await uploadBytes(storageRef, this.AddPhoto.file);
                    const downloadURL = await getDownloadURL(storageRef);

                    const studentRef = doc(db, "students", studentId);
                    const studentDoc = await getDoc(studentRef);
                    if (studentDoc.exists()) {
                        const studentData = studentDoc.data();
                        // عند تحديث selectedStudent باستخدام بيانات محدثة
                        this.selectedStudent = Object.assign(
                            {},
                            this.selectedStudent,
                            studentData
                        );

                        studentData.photos.push({
                            DatePhoto: this.AddPhoto.Date,
                            linkphoto: downloadURL,
                        });
                        await updateDoc(studentRef, studentData);
                        this.dialogAddPhoto = false;

                        studentData.photos = {
                            DatePhoto: "",
                            linkphoto: null,
                        };
                        this.AddPhoto = {
                            Date: "",
                            link: null,
                        };
                        await this.fetchStudents();
                    }
                }
            } catch (error) {
                console.error("Error adding photo:", error);
            }
        },
        async deletePhotos(studentId, PhotosIndex) {
            try {
                const studentRef = doc(db, "students", studentId);
                const studentDoc = await getDoc(studentRef);
                if (studentDoc.exists()) {
                    const studentData = studentDoc.data();
                    studentData.photos.splice(PhotosIndex, 1);
                    // عند تحديث selectedStudent باستخدام بيانات محدثة
                    this.selectedStudent = Object.assign(
                        {},
                        this.selectedStudent,
                        studentData
                    );
                    await updateDoc(studentRef, studentData);
                    await this.fetchStudents();
                    // this.dilog_ss = true;
                }
            } catch (error) {
                console.error("Error deleting subject:", error);
            }
        },

        async updateGuardian() {
            try {
                if (this.currentStudentId) {
                    const studentRef = doc(
                        db,
                        "students",
                        this.currentStudentId
                    );

                    await updateDoc(studentRef, {
                        Guardian: this.Guardian,
                    });

                    console.log("Guardian information updated successfully");
                } else {
                    console.error(
                        "No student ID is set for updating guardian information."
                    );
                }
            } catch (error) {
                console.error("Error updating guardian information:", error);
            }
        },
        closePhotoDialogs() {
            this.editPhotosDialog = false;
            this.editedIndex = -1;
            this.editedPhotos = {
                NoticeTitle: "",
                theDescription: "",
                NotificationType: "",
            };
        },
        // aos
        async saveStudentDetails() {
            if (this.selectedStudent) {
                try {
                    const studentRef = doc(db, "students", this.student.id);
                    await updateDoc(studentRef, this.student);
                    await this.fetchStudents(); // Optionally refetch students to update the list
                    this.dialogStudentDetails = false;
                    console.log("Student details updated successfully");
                } catch (error) {
                    console.error("Error updating student details:", error);
                }
            }
        },
        animateSlideChange() {
            const slides = [
                this.$refs.slide1,
                this.$refs.slide2,
                this.$refs.slide3,
                this.$refs.slide4,
                this.$refs.slide5,
                this.$refs.slide6,
                this.$refs.slide7,
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

        async updateMonthlyDegrees(degrees) {
            if (!this.selectedStudent) {
                this.console.error("Error: selectedStudent is null");
                return;
            }

            try {
                const studentRef = doc(db, "students", this.selectedStudent.id);

                // Clone the current results to avoid mutating the original data
                const updatedResults = [...this.selectedStudent.Results];

                // Map through Monthly results to find and update the selected month
                const updatedMonthly = updatedResults[1].Monthly.map(
                    (month) => {
                        if (month.Certificate_title === this.selectedMonth) {
                            return { ...month, Degrees: degrees };
                        }
                        return month;
                    }
                );

                // Update the Monthly field in updatedResults
                updatedResults[1].Monthly = updatedMonthly;

                // Update Firestore document with updatedResults
                await updateDoc(studentRef, {
                    Results: updatedResults,
                });

                console.log("Monthly degrees updated successfully");
            } catch (error) {
                console.error("Error updating monthly degrees:", error);
            }
        },
        handleInput() {
            // Track changes
            this.changesMade3 = true;
        },
        async updateFirebase(studentId, payments) {
            try {
                const studentDoc = doc(db, "students", studentId);
                await updateDoc(studentDoc, { payments });
                console.log("Document updated successfully");
            } catch (error) {
                console.error("Error updating document:", error);
            }
        },
        saveChanges3() {
            // استدعاء updateFirebase فقط عند النقر على زر الحفظ
            this.updateFirebase(
                this.selectedStudent.id,
                this.selectedStudent.payments
            );
            this.changesMade3 = false;
        },
    },
    watch: {
        "form.student_information[5].birthday"(newVal) {
            this.formattedDate = this.formatDate(newVal);
        },
        "Guardian[0].Guardian_name": "updateGuardian",
        "Guardian[1].Guardian_phone": "updateGuardian",
        "Guardian[2].Guardian_email": "updateGuardian",
        "Guardian[3].Guardian_password": "updateGuardian",
        "Guardian[4].Brothers_in_school": "updateGuardian",
        "Guardian[5].brother": {
            handler: "updateGuardian",
            deep: true, // To detect changes in nested array elements
        },
        selectedMonthlyDegrees: {
            handler() {
                // Save changes to Firebase
                this.changesMade2 = true;
            },
            deep: true,
        },
    },
    computed: {
        filteredStudents() {
            if (this.selectedSection === "الكل") {
                return this.students.filter(
                    (student) =>
                        student.student_information[2].educational_level ===
                        this.year
                );
            }
            return this.students.filter(
                (student) =>
                    student.student_information[2].educational_level ===
                        this.year &&
                    student.student_information[4].section ===
                        this.selectedSection
            );
        },
        sortedStudents() {
            const studentsToSort = this.filteredStudents;
            const sorted = [...studentsToSort].sort((a, b) => {
                const nameA =
                    a.student_information[0].student_name.toUpperCase();
                const nameB =
                    b.student_information[0].student_name.toUpperCase();

                if (this.$parent.isSortedAscending) {
                    // الترتيب من الألف إلى الياء
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                } else {
                    // الترتيب من الياء إلى الألف
                    if (nameA < nameB) return 1;
                    if (nameA > nameB) return -1;
                }
                return 0;
            });
            return sorted;
        },
        selectedMonthlyDegrees() {
            if (!this.selectedStudent) {
                return [];
            }
            return (
                this.selectedStudent.Results[1].Monthly.find(
                    (month) => month.Certificate_title === this.selectedMonth
                )?.Degrees || []
            );
        },
    },
    mounted() {
        this.searchStudent(); // Fetch all students initially
        this.generateRandomPassword();
        this.fetchStudents();

        this.students = this.$parent.students_class; // Assuming students_class is passed down from parent
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
.v-list-item:hover {
    background-color: #2195f30e !important;
}

.error-message {
    color: red;
    font-size: 14px;
    margin-top: -10px;
    margin-bottom: 10px;
} /*
.v-progress-linear {
    position: static;
    overflow: visible;
} */
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
.custom-font {
    font-family: "Cairo", sans-serif;
    font-size: 22px;
    font-weight: bold;
}
.custom-title {
    font-size: 20px;
    font-weight: 500;
    color: #333;
    font-weight: bold;
}
.v-card-title {
    padding: 16px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #eee;
}
.v-card-text {
    padding: 16px;
}
.fixed-card {
    width: 250px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.centered-subtitle {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
.fixed_img {
    width: 100%;
    max-width: 300px;
}

.center_subtitle {
    text-align: center;
}
.payments_input input {
    text-align: center;
    font-size: 26px;
}
.notification-card {
    position: relative;
}
.notification-card .v-card-title {
    font-weight: bold;
}
.notification-card .v-card-text {
    margin-top: 10px;
}
.notification-card .v-icon {
    cursor: pointer;
    color: #42a5f5;
}
.notification-card .v-icon:hover {
    color: #1e88e5;
}
.v-overlay__scrim {
    display: none;
}
</style>
