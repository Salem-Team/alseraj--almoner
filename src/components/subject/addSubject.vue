<template>
    <div class="text-black">
        <!-- Main Dialog -->
        <v-dialog
            v-model="subject"
            max-width="90%"
            @click:outside="closeSubjectDialog"
        >
            <v-card style="padding: 30px">
                <div class="header">
                    <v-card-title>
                        <span class="headline">إضافة ماده</span>
                    </v-card-title>
                    <v-btn color="blue" @click="openAddSUbDialog">
                        إضافة ماده
                    </v-btn>
                </div>
                <v-card-text>
                    <v-row>
                        <v-col
                            v-for="(sub, index) in subjects"
                            :key="sub.id"
                            cols="12"
                            md="4"
                        >
                            <v-alert
                                v-model="sub.show"
                                type="info"
                                class="pa-3 mb-3 notification-card"
                                border="left"
                                colored-border
                                @click.stop="handleAlertClick(sub.id)"
                            >
                                <div
                                    class="d-flex justify-space-between align-center"
                                >
                                    <span>{{ sub.title }}</span>
                                    <div>
                                        <v-icon
                                            small
                                            color="white"
                                            class="mr-2"
                                            @click.stop="
                                                openEditNotificationDialog(
                                                    sub.id,
                                                    index
                                                )
                                            "
                                        >
                                            mdi-pencil
                                        </v-icon>
                                        <v-icon
                                            small
                                            color="white"
                                            class="mr-2"
                                            @click.stop="
                                                deleteNotification(
                                                    sub.id,
                                                    index
                                                )
                                            "
                                        >
                                            mdi-delete
                                        </v-icon>
                                    </div>
                                </div>
                                <div
                                    class="flex justify-space-between align-space-between"
                                >
                                    <span>{{ sub.maxNumber }}</span>
                                    <span>{{ sub.minNumber }}</span>
                                </div>
                            </v-alert>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="red" @click="closeSubjectDialog">
                        إلغاء
                    </v-btn>
                </v-card-actions>
                <!-- Add Subject Dialog -->
                <v-dialog
                    v-model="dialogAddSUb"
                    max-width="500px"
                    @click:outside="closeAddSUbDialog"
                >
                    <v-card>
                        <v-card-title>
                            <span class="headline">إضافة ماده جديدة</span>
                        </v-card-title>
                        <v-card-text>
                            <v-form ref="addForm">
                                <v-text-field
                                    v-model="title"
                                    label="عنوان الماده"
                                    required
                                    :error-messages="
                                        v$.title.$error
                                            ? v$.title.$errors[0].$message
                                            : ''
                                    "
                                ></v-text-field>
                                <v-text-field
                                    v-model="maxNumber"
                                    label="الدرجه العظمه"
                                    type="number"
                                    min="0"
                                    required
                                    :error-messages="
                                        v$.maxNumber.$error
                                            ? v$.maxNumber.$errors[0].$message
                                            : ''
                                    "
                                ></v-text-field>
                                <v-text-field
                                    v-model="minNumber"
                                    label="الدرجه الصغره"
                                    type="number"
                                    min="0"
                                    required
                                    :error-messages="
                                        v$.minNumber.$error
                                            ? v$.minNumber.$errors[0].$message
                                            : ''
                                    "
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="closeAddSUbDialog"
                                >إلغاء</v-btn
                            >
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="addSubject"
                                >حفظ</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <!-- Edit Notification Dialog -->
                <v-dialog
                    v-model="editNotificationDialog"
                    max-width="500px"
                    @click:outside="closeEditNotificationDialog"
                >
                    <v-card>
                        <v-card-title>
                            <span class="headline">تعديل الماده</span>
                        </v-card-title>
                        <v-card-text>
                            <v-form ref="editForm">
                                <v-text-field
                                    v-model="editedNotification.title"
                                    label="عنوان الماده"
                                    required
                                    :error-messages="
                                        v$.title.$error
                                            ? v$.title.$errors[0].$message
                                            : ''
                                    "
                                ></v-text-field>
                                <v-text-field
                                    type="number"
                                    min="0"
                                    v-model="editedNotification.maxNumber"
                                    label="القيمه العظمه"
                                    required
                                    :error-messages="
                                        v$.editedNotification.maxNumber.$error
                                            ? v$.editedNotification.maxNumber
                                                  .$errors[0].$message
                                            : ''
                                    "
                                ></v-text-field>
                                <v-text-field
                                    type="number"
                                    min="0"
                                    v-model="editedNotification.minNumber"
                                    label="القيمه الصغره"
                                    required
                                    :error-messages="
                                        v$.editedNotification.minNumber.$error
                                            ? v$.editedNotification.minNumber
                                                  .$errors[0].$message
                                            : ''
                                    "
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="closeEditNotificationDialog"
                                >إلغاء</v-btn
                            >
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="saveNotificationEdit"
                                >حفظ</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { db } from "@/Firebase";
import { useVuelidate } from "@vuelidate/core";
import { minValue, required } from "@vuelidate/validators";
import {
    where,
    collection,
    updateDoc,
    query,
    getDocs,
    writeBatch,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
export default {
    props: ["localSubject"],
    data() {
        return {
            v$: useVuelidate(),
            gradeId: this.$route.params.year,
            subject: this.localSubject,
            dialogAddSUb: false,
            editNotificationDialog: false,
            minNumber: 0,
            maxNumber: 100,
            title: "",
            subjects: [],
            editedNotification: {},
        };
    },
    validations() {
        return {
            title: { required },
            maxNumber: { required, minValue: minValue(0) },
            minNumber: { required, minValue: minValue(0) },
        };
    },
    watch: {
        localSubject(newVal) {
            this.subject = newVal;
        },
    },
    methods: {
        openAddSUbDialog() {
            this.dialogAddSUb = true;
        },
        closeAddSUbDialog() {
            this.dialogAddSUb = false;
        },
        async addSubject() {
            this.v$.$validate();
            if (this.v$.$error) return;
            const newSubject = {
                title: this.title,
                maxNumber: this.maxNumber,
                minNumber: this.minNumber,
                id: uuidv4(),
                show: true,
            };
            try {
                const classRoomsRef = collection(db, "class_rooms");
                const q = query(
                    classRoomsRef,
                    where("grade", "==", this.gradeId)
                );
                const querySnapshot = await getDocs(q);
                const batch = writeBatch(db);
                querySnapshot.forEach((doc) => {
                    const subjects = doc.data().subjects || [];
                    subjects.push(newSubject);
                    batch.update(doc.ref, { subjects });
                });
                await batch.commit();
                this.closeAddSUbDialog();
                this.fetchGradeData(); // Refresh the data after adding
            } catch (error) {
                console.error("Error updating documents: ", error);
            }
        },
        openEditNotificationDialog(subjectId, index) {
            this.editedNotification = { ...this.subjects[index] };
            this.editNotificationDialog = true;
        },
        closeSubjectDialog() {
            this.subject = false;
            this.$emit("closeDialog", false);
        },
        closeEditNotificationDialog() {
            this.editNotificationDialog = false;
        },
        async saveNotificationEdit() {
            try {
                const classRoomsRef = collection(db, "class_rooms");
                const q = query(
                    classRoomsRef,
                    where("grade", "==", this.gradeId)
                );
                const querySnapshot = await getDocs(q);
                const batch = writeBatch(db);
                querySnapshot.forEach((doc) => {
                    const subjects = doc.data().subjects || [];
                    const index = subjects.findIndex(
                        (subject) => subject.id === this.editedNotification.id
                    );
                    if (index !== -1) {
                        subjects[index] = this.editedNotification;
                        batch.update(doc.ref, { subjects });
                    }
                });
                await batch.commit();
                this.closeEditNotificationDialog();
                this.fetchGradeData(); // Refresh the data after editing
            } catch (error) {
                console.error("Error updating documents: ", error);
            }
        },
        async deleteNotification(subjectId, index) {
            try {
                const classRoomsRef = collection(db, "class_rooms");
                const q = query(
                    classRoomsRef,
                    where("grade", "==", this.gradeId)
                );
                const querySnapshot = await getDocs(q);
                const batch = writeBatch(db);
                querySnapshot.forEach((doc) => {
                    let subjects = doc.data().subjects || [];
                    subjects = subjects.filter(
                        (subject) => subject.id !== subjectId
                    );
                    batch.update(doc.ref, { subjects });
                });
                await batch.commit();
                this.subjects.splice(index, 1);
            } catch (error) {
                console.error("Error deleting document: ", error);
            }
        },
        async fetchGradeData() {
            try {
                const classRoomsRef = collection(db, "class_rooms");
                const q = query(
                    classRoomsRef,
                    where("grade", "==", this.gradeId)
                );
                const querySnapshot = await getDocs(q);
                const data = [];
                querySnapshot.forEach((doc) => {
                    const subjects = doc.data().subjects || [];
                    subjects.forEach((subject) => {
                        data.push({ ...subject, id: uuidv4(), show: true });
                    });
                });
                this.subjects = data;
            } catch (error) {
                console.error("Error fetching grade data: ", error);
            }
        },
        handleAlertClick(subjectId) {
            const subject = this.subjects.find((sub) => sub.id === subjectId);
            if (subject) {
                subject.show = !subject.show; // Toggle visibility
            }
        },
    },
    mounted() {
        this.fetchGradeData();
    },
};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.notification-card {
    cursor: pointer;
    transition: background-color 0.3s ease;
}
.notification-card:hover {
    background-color: #f0f0f0;
}
.notification-card .v-icon {
    cursor: pointer;
    transition: color 0.3s ease;
}
.notification-card .v-icon:hover {
    color: #2196f3;
}
</style>
