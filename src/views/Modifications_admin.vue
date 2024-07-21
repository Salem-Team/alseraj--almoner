<template>
    <div>
        <!-- Breadcrumbs and filters -->
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
            </v-breadcrumbs>
        </div>

        <!-- Filters using v-select -->
        <v-container class="d-flex justify-space-evenly mb-4 mt-16">
            <v-select
                v-model="selectedLevel"
                :items="Classlevels"
                label="اختر الفصل الدراسى"
            ></v-select>
            <v-select
                :items="gender"
                v-model="selectGender"
                label="اختر النوع"
            ></v-select>
            <v-select
                v-model="selectedCertificate"
                :items="certificateTitles"
                label="اختر الشهر"
            ></v-select>
            <v-select
                v-model="sectionInf"
                :items="section"
                label="اختر القسم"
            ></v-select>
            <v-select
                v-model="gradeSec"
                :items="grade"
                label="اختر المرحله الدراسيه"
            ></v-select>
            <v-btn color="primary" @click="filterStudents">تشغيل الفلتر</v-btn>
        </v-container>

        <!-- Display filtered students -->
        <v-container>
            <v-row>
                <v-col
                    v-for="student in filteredStudents"
                    :key="student.id"
                    cols="12"
                    md="4"
                >
                    <v-card>
                        <v-card-title>{{ student.name }}</v-card-title>
                        <v-card-text>
                            <p>مجموع الدرجات: {{ student.totalDegrees }}</p>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";

export default {
    data() {
        return {
            Classlevels: [],
            selectedLevel: null,
            gender: [],
            selectGender: null,
            certificateTitles: [],
            selectedCertificate: null,
            section: [],
            sectionInf: null,
            grade: [],
            gradeSec: null,
            students: [],
            filteredStudents: [],
        };
    },
    methods: {
        async filterStudents() {
            // Log current filter values
            console.log("Filters:", {
                selectedLevel: this.selectedLevel,
                selectGender: this.selectGender,
                sectionInf: this.sectionInf,
                gradeSec: this.gradeSec,
                selectedCertificate: this.selectedCertificate,
            });

            if (!this.selectedCertificate) {
                this.filteredStudents = [];
                return;
            }

            try {
                const q = collection(db, "students");
                const querySnapshot = await getDocs(q);
                const students = [];

                querySnapshot.forEach((doc) => {
                    const studentData = doc.data();
                    const studentInfo = studentData;
                    const monthlyResults = studentData.Results.reduce(
                        (acc, result) => acc.concat(result.Monthly || []),
                        []
                    );

                    const totalDegrees = monthlyResults
                        .filter(
                            (monthly) =>
                                monthly.Certificate_title ===
                                this.selectedCertificate
                        )
                        .reduce((sum, monthly) => {
                            const monthDegrees = monthly.Degrees.reduce(
                                (sum, degree) => sum + degree.Student_degree,
                                0
                            );
                            return sum + monthDegrees;
                        }, 0);

                    students.push({
                        id: doc.id,
                        name: studentInfo.student_name,
                        class: studentInfo.class || "",
                        gender: studentInfo.gender || "",
                        section: studentInfo.section || "",
                        grade: studentInfo.educational_level || "",
                        totalDegrees,
                    });
                });

                console.log("Students before filtering:", students);

                // Apply filters
                let filteredStudents = students.filter((student) => {
                    let include = true;

                    if (this.selectedLevel && student.class) {
                        console.log(
                            `Comparing level: ${this.selectedLevel} with ${student.class}`
                        );
                        include = student.class === this.selectedLevel;
                    }
                    if (this.selectGender && student.gender) {
                        console.log(
                            `Comparing gender: ${this.selectGender} with ${student.gender}`
                        );
                        include =
                            include && student.gender === this.selectGender;
                    }
                    if (this.sectionInf && student.section) {
                        console.log(
                            `Comparing section: ${this.sectionInf} with ${student.section}`
                        );
                        include =
                            include && student.section === this.sectionInf;
                    }
                    if (this.gradeSec && student.grade) {
                        console.log(
                            `Comparing grade: ${this.gradeSec} with ${student.grade}`
                        );
                        include = include && student.grade === this.gradeSec;
                    }

                    return include;
                });

                this.filteredStudents = filteredStudents;

                console.log("Filtered students:", this.filteredStudents);
            } catch (error) {
                console.error("Error fetching filtered data:", error);
                this.filteredStudents = [];
            }
        },

        async fetchInitialData() {
            try {
                const querySnapshot = await getDocs(collection(db, "students"));
                const querySnapshotTow = await getDocs(
                    collection(db, "class_rooms")
                );

                const levels = new Set();
                const gender = new Set();
                const titles = new Set();
                const section = new Set();
                const grades = new Set();
                const students = [];

                querySnapshot.forEach((doc) => {
                    const studentData = doc.data();
                    const studentInfo = studentData || [];

                    studentInfo.forEach((info) => {
                        levels.add(info.class);
                        gender.add(info.gender);
                        section.add(info.section);

                        const monthlyResults = [];
                        studentData.Results.forEach((result) => {
                            if (result.Monthly) {
                                result.Monthly.forEach((monthly) => {
                                    monthlyResults.push(monthly);
                                    titles.add(monthly.Certificate_title);
                                });
                            }
                        });

                        students.push({
                            id: doc.id,
                            name: info.student_name,
                            class: info.class,
                            gender: info.gender,
                            section: info.section,
                            grade: info.educational_level,
                            monthlyResults,
                        });
                    });
                });

                querySnapshotTow.forEach((doc) => {
                    const grade = doc.data().grade;
                    grades.add(grade);
                });

                this.Classlevels = Array.from(levels);
                this.gender = Array.from(gender);
                this.certificateTitles = Array.from(titles);
                this.section = Array.from(section);
                this.grade = Array.from(grades);
                this.students = students;

                console.log("Fetched initial data:", {
                    levels: this.Classlevels,
                    gender: this.gender,
                    certificateTitles: this.certificateTitles,
                    section: this.section,
                    grade: this.grade,
                    students: this.students,
                });
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        },
    },

    async created() {
        await this.fetchInitialData();
    },
};
</script>

<style scoped>
.right {
    width: 95% !important;
    margin: auto;
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
}
</style>
