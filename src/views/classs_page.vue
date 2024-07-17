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
                            <div class="cards d-flex justify-space-evenly mb-4">
                                <v-card
                                    style="
                                        background-color: var(
                                            --secound-color
                                        ) !important;
                                        width: 20% !important;
                                    "
                                    class="card text-center mt-3"
                                    prepend-icon="mdi-account"
                                    link
                                    @click="dialog_1 = true"
                                >
                                    <v-card-title @click="dialog = false"
                                        >إضافة إشعارات</v-card-title
                                    >
                                </v-card>
                                <v-card
                                    style="
                                        background-color: var(
                                            --secound-color
                                        ) !important;
                                    "
                                    class="card text-center mt-3"
                                    prepend-icon="mdi-newspaper-variant-multiple-outline"
                                    @click="showAddStudentDialog"
                                    width="20%"
                                >
                                    <v-card-title @click="dialog = false"
                                        >إضافة بيانات الطالب</v-card-title
                                    >
                                </v-card>
                                <v-card
                                    style="
                                        background-color: var(
                                            --secound-color
                                        ) !important;
                                    "
                                    class="card text-center mt-3"
                                    prepend-icon="mdi-image"
                                    link
                                    @click="dialog_2 = true"
                                    width="20%"
                                >
                                    <v-card-title @click="dialog = false"
                                        >إضافة الصور</v-card-title
                                    >
                                </v-card>
                            </div>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialog_1" max-width="90%">
                        <v-card style="padding: 30px">
                            <div
                                style="
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    margin-bottom: 20px;
                                "
                            >
                                <div style="display: flex; align-items: center">
                                    <v-card-title>
                                        <span class="headline"
                                            >إضافة اشعار</span
                                        >
                                    </v-card-title>
                                </div>
                                <v-btn
                                    color="blue"
                                    @click="dialogAddNotice = true"
                                    >إضافة اشعار</v-btn
                                >
                            </div>
                            <v-card-text>
                                <v-row>
                                    <v-col
                                        v-for="(
                                            classRoom, index
                                        ) in filteredClasses[0].Notifications"
                                        :key="classRoom.id"
                                        @click="selectClass(classRoom)"
                                        cols="12"
                                        md="4"
                                    >
                                        <v-alert
                                            :type="
                                                classRoom.NotificationType ===
                                                'سئ'
                                                    ? 'error'
                                                    : classRoom.NotificationType ===
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
                                                    classRoom.NoticeTitle
                                                }}</span>
                                                <div>
                                                    <v-icon
                                                        small
                                                        color="white"
                                                        class="mr-2"
                                                        @click="
                                                            editNotification(
                                                                filteredClasses[0]
                                                                    .id,
                                                                index
                                                            )
                                                        "
                                                        >mdi-pencil</v-icon
                                                    >
                                                    <v-icon
                                                        small
                                                        class="mr-2"
                                                        color="white"
                                                        @click="
                                                            deleteNotification(
                                                                filteredClasses[0]
                                                                    .id
                                                            )
                                                        "
                                                        >mdi-delete</v-icon
                                                    >
                                                </div>
                                            </div>
                                            <div>
                                                {{ classRoom.theDescription }}
                                            </div>
                                        </v-alert>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-dialog
                                v-model="dialogAddNotice"
                                max-width="500px"
                            >
                                <v-card>
                                    <v-card-title>
                                        <span class="headline"
                                            >إضافة اشعار جديدة</span
                                        >
                                    </v-card-title>
                                    <v-card-text>
                                        <v-form ref="addForm">
                                            <v-text-field
                                                v-model="
                                                    newNotification.NoticeTitle
                                                "
                                                label="عنوان الاشعار"
                                                required
                                            ></v-text-field>
                                            <v-textarea
                                                v-model="
                                                    newNotification.theDescription
                                                "
                                                label="الوصف"
                                                required
                                            ></v-textarea>
                                            <v-select
                                                v-model="
                                                    newNotification.NotificationType
                                                "
                                                label="نوع الاشعار"
                                                required
                                                :items="['سئ', 'جيد']"
                                            ></v-select>
                                        </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="dialogAddNotice = false"
                                            >إلغاء</v-btn
                                        >
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="
                                                addNotification(
                                                    filteredClasses[0].id
                                                )
                                            "
                                            >حفظ</v-btn
                                        >
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <!-- <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="dialogAddNotice = false"
                                    >إلغاء</v-btn
                                >
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="saveNotification"
                                    >حفظ</v-btn
                                >
                            </v-card-actions> -->
                        </v-card>
                    </v-dialog>
                    <v-dialog
                        v-model="editNotificationDialog"
                        max-width="500px"
                    >
                        <v-card>
                            <v-card-title>
                                <span class="headline">تعديل الاشعار</span>
                            </v-card-title>
                            <v-card-text>
                                <v-form ref="editForm">
                                    <v-text-field
                                        v-model="editedNotification.NoticeTitle"
                                        label="عنوان الاشعار"
                                        required
                                    ></v-text-field>
                                    <v-textarea
                                        v-model="
                                            editedNotification.theDescription
                                        "
                                        label="الوصف"
                                        required
                                    ></v-textarea>
                                    <v-select
                                        v-model="
                                            editedNotification.NotificationType
                                        "
                                        label="نوع الاشعار"
                                        required
                                        :items="['سئ', 'جيد']"
                                    ></v-select>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="closeNotificationDialogs"
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
                    <v-dialog v-model="dialog_2" max-width="90%">
                        <div style="background: white; padding: 53px">
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
                                    <h2 style="color: #2196f3">الصور</h2>
                                </div>
                                <v-btn
                                    color="blue"
                                    @click="dialogAddPhoto = true"
                                    >اضافه صوره</v-btn
                                >
                            </div>
                            <v-row>
                                <v-col
                                    cols="12"
                                    md="4"
                                    v-for="(photo, index) in filteredClasses[0]
                                        .photos"
                                    :key="index"
                                >
                                    <v-card
                                        class="mb-3 notification-card"
                                        outlined
                                    >
                                        <v-card-title
                                            class="d-flex align-left"
                                            style="justify-content: end"
                                        >
                                            <div>
                                                <v-icon
                                                    small
                                                    class="mr-2"
                                                    @click="
                                                        deletePhotos(
                                                            filteredClasses[0]
                                                                .id
                                                        )
                                                    "
                                                    >mdi-delete</v-icon
                                                >
                                            </div>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-img
                                                :src="photo.linkphoto"
                                                aspect-ratio="1"
                                                class="mb-2"
                                            ></v-img>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </div>
                    </v-dialog>

                    <v-dialog v-model="dialogAddPhoto" max-width="500px">
                        <v-card>
                            <v-card-title>
                                <span class="headline">إضافة صوره جديدة</span>
                            </v-card-title>
                            <v-card-text>
                                <v-form ref="addForm">
                                    <v-file-input
                                        style="width: 100%"
                                        v-model="AddPhoto.file"
                                        label="صورة"
                                        accept="image/*"
                                        variant="outlined"
                                        prepend-icon=""
                                        width="100%"
                                        prepend-inner-icon="mdi-paperclip"
                                        required
                                    ></v-file-input>
                                    <v-textarea
                                        v-model="AddPhoto.grade"
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
                                    @click="dialogAddPhoto = false"
                                    >إلغاء</v-btn
                                >
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="addPhoto(filteredClasses[0].id)"
                                    >حفظ</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
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
                    >
                </v-col>
                <v-col cols="12" md="4" sm="6">
                    <v-btn
                        style="background: #54aef5; color: white"
                        rounded="xl"
                        size="x-large"
                        block
                        >عربي</v-btn
                    >
                </v-col>
                <v-col cols="12" md="4" sm="6">
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
    </div>
</template>

<script>
import StudentList from "@/components/StudentList.vue";
import { useDialogStore } from "@/store/useDialogStore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    getFirestore,
} from "firebase/firestore";
import { initializeApp } from "@firebase/app";
import { getStorage } from "firebase/storage";
import "vue-toastification/dist/index.css"; // Import the CSS file

const firebaseConfig = {
    apiKey: "AIzaSyBdk3sqIHjXvB2C-O-lvkRgMFpg8pemkno",
    authDomain: "alseraj--almoner.firebaseapp.com",
    projectId: "alseraj--almoner",
    storageBucket: "alseraj--almoner.appspot.com",
    messagingSenderId: "462211256149",
    appId: "1:462211256149:web:a03ace3c70b306620169dc",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
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
            photos: [
                {
                    Date: "",
                    link: "",
                },
            ],
            class_rooms: [],
            dialog: false,
            newNotification: {
                NoticeTitle: "",
                theDescription: "",
                NotificationType: "",
            },
            dialogAddPhoto: false,
            dialog_1: false,
            dialog_2: false,
            dialogAddNotice: false,
            editNotificationDialog: false,
            dialogFilter: false,
            AddNotice: {
                NoticeTitle: "",
                theDescription: "",
                NotificationType: "",
            },
            editedNotification: {
                NoticeTitle: "",
                theDescription: "",
                NotificationType: "",
            },

            progress: 0,
            selectedClass: [],
            students: [],
            classes: [],
            AddPhoto: {
                Date: "",
                link: "",
            },
        };
    },
    computed: {
        filteredClasses() {
            return this.class_rooms.filter(
                (classs) => classs.grade === this.year
            );
        },
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
        async fetchClassRooms() {
            try {
                const querySnapshot = await getDocs(
                    collection(db, "class_rooms")
                );
                this.class_rooms = querySnapshot.docs.map((doc) => {
                    const classRoomData = doc.data();
                    const classRoom = {
                        id: doc.id,
                        ...classRoomData,
                    };
                    return classRoom;
                });

                console.log("Fetched class rooms:", this.class_rooms);
            } catch (error) {
                console.error("Error fetching class rooms:", error);
            }
        },
        async addNotification(classId) {
            try {
                const classRef = doc(db, "class_rooms", classId);
                const classDoc = await getDoc(classRef);
                if (classDoc.exists()) {
                    const classData = classDoc.data();
                    classData.Notifications.push({
                        NoticeTitle: this.newNotification.NoticeTitle,
                        theDescription: this.newNotification.theDescription,
                        NotificationType: this.newNotification.NotificationType,
                    });
                    // تأكد من أن Notifications موجودة وهي مصفوفة
                    // if (!Array.isArray(classData.Notifications)) {
                    //     classData.Notifications = [
                    //         {
                    //             NoticeTitle: "",
                    //             theDescription: "",
                    //             NotificationType: "",
                    //         },
                    //     ];
                    // }
                    // classData.Notifications.push({
                    //     NoticeTitle: this.newNotification.NoticeTitle,
                    //     theDescription: this.newNotification.theDescription,
                    //     NotificationType: this.newNotification.NotificationType,
                    // });
                    this.newNotification = Object.assign(
                        {},
                        this.newNotification,
                        classData
                    );

                    await updateDoc(classRef, classData);
                    this.dialogAddNotice = false;
                    this.newNotification = {
                        NoticeTitle: "",
                        theDescription: "",
                        NotificationType: "",
                    };
                    await this.fetchClassRooms();
                } else {
                    console.error("Class document does not exist.");
                }
            } catch (error) {
                console.error("Error adding notification:", error);
            }
        },
        async deleteNotification(classId, notificationIndex) {
            try {
                const classRef = doc(db, "class_rooms", classId);
                const classDoc = await getDoc(classRef);
                if (classDoc.exists()) {
                    const classData = classDoc.data();
                    classData.Notifications.splice(notificationIndex, 1);
                    await updateDoc(classRef, {
                        Notifications: classData.Notifications,
                    });
                    await this.fetchClassRooms();
                }
            } catch (error) {
                console.error("Error deleting notification:", error);
            }
        },
        editNotification(classId, index) {
            this.editedNotification = {
                ...this.filteredClasses[0].Notifications[index],
            };
            this.editedClassId = classId;
            this.editedIndex = index;
            console.log(this.editedIndex);
            this.editNotificationDialog = true;
        },
        async saveNotificationEdit() {
            try {
                const classRef = doc(db, "class_rooms", this.editedClassId);
                const classDoc = await getDoc(classRef);
                if (classDoc.exists()) {
                    const classData = classDoc.data();
                    Object.assign(
                        classData.Notifications[this.editedIndex],
                        this.editedNotification
                    );
                    await updateDoc(classRef, {
                        Notifications: classData.Notifications,
                    });
                    this.closeNotificationDialogs();
                    await this.fetchClassRooms();
                }
            } catch (error) {
                console.error("Error editing notification:", error);
            }
        },
        selectClass(classRoom) {
            this.selectedClass = classRoom;
        },
        closeNotificationDialogs() {
            this.editNotificationDialog = false;
        },
        // OIJI
        async addPhoto(classId) {
            try {
                if (this.AddPhoto.file) {
                    const storageRef = ref(
                        storage,
                        `photos/${this.AddPhoto.file.name}`
                    );
                    await uploadBytes(storageRef, this.AddPhoto.file);
                    const downloadURL = await getDownloadURL(storageRef);

                    const classRef = doc(db, "class_rooms", classId);
                    const classDoc = await getDoc(classRef);
                    if (classDoc.exists()) {
                        const classData = classDoc.data();

                        // تأكد من أن photos موجودة وهي مصفوفة
                        if (!Array.isArray(classData.photos)) {
                            classData.photos = [];
                        }

                        classData.photos.push({
                            DatePhoto: this.AddPhoto.Date,
                            linkphoto: downloadURL,
                        });
                        await updateDoc(classRef, { photos: classData.photos });

                        this.dialogAddPhoto = false;
                        this.AddPhoto = {
                            Date: "",
                            link: "",
                        };
                        await this.fetchClassRooms();
                    } else {
                        console.error("Class document does not exist.");
                    }
                }
            } catch (error) {
                console.error("Error adding photo:", error);
            }
        },
        async deletePhotos(classId, photoIndex) {
            try {
                const classRef = doc(db, "class_rooms", classId);
                const classDoc = await getDoc(classRef);
                if (classDoc.exists()) {
                    const classData = classDoc.data();
                    classData.photos.splice(photoIndex, 1);
                    await updateDoc(classRef, { photos: classData.photos });
                    await this.fetchClassRooms();
                }
            } catch (error) {
                console.error("Error deleting photo:", error);
            }
        },
    },
    async mounted() {
        await this.fetchClassRooms();
        console.log(this.filteredClasses);
    },
};
</script>

<style lang="scss" scoped>
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
