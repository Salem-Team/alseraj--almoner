<template>
    <div class="jk">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-list>
                        <v-list-item
                            v-for="(clas, index) in classes"
                            :key="index"
                            :to="{
                                name: 'classPage',
                                params: { year: clas.id },
                            }"
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
                                        {{ index + 1 }} </v-avatar
                                    >{{ clas.fullName }}
                                </h2>
                                <div>
                                    <v-avatar color="info ml-2">
                                        <v-icon
                                            icon="mdi-account-circle"
                                        ></v-icon>
                                    </v-avatar>
                                    <v-avatar color="info">
                                        <v-icon icon="mdi-book"></v-icon>
                                    </v-avatar>
                                </div>
                            </v-list-item-content>
                        </v-list-item> </v-list
                ></v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

export default {
    name: "ClassRoom",
    setup() {
        const route = useRoute();
        const classId = ref(route.params.id);

        // Watch for changes in the route params and update classId accordingly
        watch(
            () => route.params.id,
            (newId) => {
                classId.value = newId;
            }
        );

        return {
            classId,
        };
    },
    data() {
        return {
            students_class: [],
            classes: [
                { id: 1, fullName: "ثالثه ثانوي" },
                { id: 2, fullName: "ثانية ثانوي" },
                { id: 3, fullName: "أولى ثانوي" },
                { id: 4, fullName: "ثالثة إعدادي" },
                { id: 5, fullName: "ثانية إعدادي" },
                { id: 6, fullName: "أولى إعدادي" },
                { id: 7, fullName: "سادس ابتدائي" },
                { id: 8, fullName: "خامس ابتدائي" },
                { id: 9, fullName: "رابع ابتدائي" },
                { id: 10, fullName: "ثالث ابتدائي" },
                { id: 11, fullName: "ثاني ابتدائي" },
                { id: 12, fullName: "أولى ابتدائي" },
                { id: 13, fullName: "روضة أولى" },
            ],
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
    // async created() {
    //   await this.fetchStudents();
    // },
    // methods: {
    //   async fetchStudents() {
    //     const querySnapshot = await getDocs(collection(db, "students"));
    //     querySnapshot.forEach((doc) => {
    //       const student = { id: doc.id, ...doc.data(), showDetails: false };
    //       this.students_class.push(student);
    //     });
    //   },
    //   async submit() {
    //     if (this.validateForm()) {
    //       try {
    //         await addDoc(collection(db, "students"), {
    //           name: this.form.name,
    //           phone: this.form.phone,
    //           email: this.form.email,
    //         });
    //         alert("تم إضافة الطالب بنجاح");
    //         this.handleReset();
    //         await this.fetchStudents();
    //       } catch (error) {
    //         console.error("Error adding document: ", error);
    //       }
    //     }
    //   },
    //   async deleteStudent(id) {
    //     try {
    //       await deleteDoc(doc(db, "students", id));
    //       this.students_class = this.students_class.filter(
    //         (student) => student.id !== id
    //       );
    //     } catch (error) {
    //       console.error("Error deleting document: ", error);
    //     }
    //   },
    //   handleReset() {
    //     this.form.name = "";
    //     this.form.phone = "";
    //     this.form.email = "";
    //     this.errors.name = [];
    //     this.errors.phone = [];
    //     this.errors.email = [];
    //   },
    //   validateForm() {
    //     this.errors = {
    //       name: [],
    //       phone: [],
    //       email: [],
    //     };

    //     let isValid = true;

    //     if (this.form.name.length < 2) {
    //       this.errors.name.push("الاسم يجب أن يكون على الأقل حرفين.");
    //       isValid = false;
    //     }

    //     if (this.form.phone.length < 9) {
    //       this.errors.phone.push("رقم الهاتف يجب أن يكون على الأقل 9 أرقام.");
    //       isValid = false;
    //     }

    //     const emailRegex = /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i;
    //     if (!emailRegex.test(this.form.email)) {
    //       this.errors.email.push("يجب أن يكون بريدًا إلكترونيًا صالحًا.");
    //       isValid = false;
    //     }

    //     return isValid;
    //   },
    //   showStudentDetails(student) {
    //     student.showDetails = true;
    //   },
    // },
};
</script>

<style scoped>
.student-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.student-item:hover {
    background-color: #2196f333;
}
</style>
