<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-list>
                    <v-list-item
                        v-for="(student, index) in filteredStudents"
                        :key="student.id"
                    >
                        <v-list-item-content
                            style="padding: 10px; direction: rtl"
                            class="student-item"
                        >
                            <h2>
                                <v-avatar
                                    color="info"
                                    style="margin-left: 20px"
                                >
                                    {{ index + 1 }}
                                </v-avatar>
                                {{ student.name }}
                            </h2>
                            <div>
                                <v-avatar color="info ml-2">
                                    <v-icon
                                        @click.stop="student.showDetails = true"
                                        icon="mdi-information-outline"
                                    ></v-icon>
                                </v-avatar>
                                <v-avatar color="info">
                                    <v-icon
                                        @click.stop="deleteStudent(student.id)"
                                        icon="mdi-delete"
                                    ></v-icon>
                                </v-avatar>
                            </div>
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
                    </v-list-item>
                </v-list>
            </v-col>
            <v-col cols="2">
                <v-dialog
                    transition="dialog-top-transition"
                    width="50%"
                    v-model="dialogStore.dialog_addstudent"
                >
                    <template v-slot:default>
                        <v-card>
                            <v-toolbar title="بيانات الطالب"></v-toolbar>
                            <v-card-text class="text-h2 pa-6">
                                <form @submit.prevent="submit">
                                    <v-text-field
                                        v-model="form.name"
                                        :counter="10"
                                        :error-messages="errors.name"
                                        label="الاسم"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="form.phone"
                                        :counter="7"
                                        :error-messages="errors.phone"
                                        label="رقم الهاتف"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="form.email"
                                        :error-messages="errors.email"
                                        label="البريد الإلكتروني"
                                    ></v-text-field>
                                    <v-btn type="submit">إرسال</v-btn>
                                </form>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                                <v-btn
                                    text="Close"
                                    @click="dialogStore.hideAddStudentDialog"
                                    >Close</v-btn
                                >
                            </v-card-actions>
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
} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBdk3sqIHjXvB2C-O-lvkRgMFpg8pemkno",
    authDomain: "alseraj--almoner.firebaseapp.com",
    projectId: "alseraj--almoner",
    storageBucket: "alseraj--almoner.appspot.com",
    messagingSenderId: "462211256149",
    appId: "1:462211256149:web:a03ace3c70b306620169dc",
};
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
            students_class: [],
            dialog_addstudent: false,
            form: {
                name: "",
                phone: "",
                email: "",
            },
            errors: {
                name: [],
                phone: [],
                email: [],
            },
        };
    },
    async created() {
        await this.fetchStudents();
    },
    methods: {
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
                try {
                    console.log(
                        "Adding student:",
                        this.form.name,
                        this.form.phone,
                        this.form.email,
                        this.year
                    );
                    await addDoc(collection(db, "students"), {
                        name: this.form.name,
                        phone: this.form.phone,
                        email: this.form.email,
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
            this.form.name = "";
            this.form.phone = "";
            this.form.email = "";
            this.errors.name = [];
            this.errors.phone = [];
            this.errors.email = [];
        },
        validateForm() {
            this.errors = {
                name: [],
                phone: [],
                email: [],
            };

            let isValid = true;

            if (this.form.name.length < 2) {
                this.errors.name.push("الاسم يجب أن يكون على الأقل حرفين.");
                isValid = false;
            }

            if (this.form.phone.length < 9) {
                this.errors.phone.push(
                    "رقم الهاتف يجب أن يكون على الأقل 9 أرقام."
                );
                isValid = false;
            }

            const emailRegex = /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i;
            if (!emailRegex.test(this.form.email)) {
                this.errors.email.push("يجب أن يكون بريدًا إلكترونيًا صالحًا.");
                isValid = false;
            }

            console.log("Form validation result:", isValid, this.errors);

            return isValid;
        },
        showStudentDetails(student) {
            student.showDetails = true;
        },
    },
    computed: {
        filteredStudents() {
            return this.students_class.filter(
                (student) => student.year === this.year
            );
        },
    },
};
</script>

<style scoped>
.student-item {
    padding: 10px;
    direction: rtl;
}
.student-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.student-item:hover {
    background-color: #2196f333;
}
</style>
