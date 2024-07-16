<template>
    <div>
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
        <v-container class="d-flex justify-space-evenly mb-4 mt-16">
            <v-select
                v-model="selectedLevel"
                :items="educationalLevels"
                label="اختر المستوى التعليمي"
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
        </v-container>
    </div>
</template>

<script>
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";
export default {
    data() {
        return {
            educationalLevels: [],
            selectedLevel: null,
            certificateTitles: [],
            selectedCertificate: null,
            gender: [],
            selectGender: "",
        };
    },
    async created() {
        // Global Get Docs
        const querySnapshot = await getDocs(collection(db, "students"));
        // First Get educational_level
        const levels = new Set();
        querySnapshot.forEach((doc) => {
            const studentInfo = doc.data().student_information;
            studentInfo.forEach((info) => {
                levels.add(info.educational_level);
            });
        });
        this.educationalLevels = Array.from(levels);
        // Seconed Get Gender
        const Gender = new Set();
        querySnapshot.forEach((doc) => {
            const studentInfo = doc.data().student_information;
            studentInfo.forEach((info) => {
                Gender.add(info.gender);
            });
        });
        this.gender = Array.from(Gender);

        // Third Get Certificate_title
        const titles = new Set();
        querySnapshot.forEach((doc) => {
            const results = doc.data().Results;
            results.forEach((result) => {
                if (result.Monthly) {
                    result.Monthly.forEach((monthly) => {
                        titles.add(monthly.Certificate_title);
                    });
                }
            });
        });
        this.certificateTitles = Array.from(titles);
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
