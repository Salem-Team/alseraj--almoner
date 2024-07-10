import { defineStore } from "pinia";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    collection,
    addDoc,
    doc,
    deleteDoc,
    updateDoc,
    getDocs,
} from "@firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBdk3sqIHjXvB2C-O-lvkRgMFpg8pemkno",
    authDomain: "alseraj--almoner.firebaseapp.com",
    projectId: "alseraj--almoner",
    storageBucket: "alseraj--almoner.appspot.com",
    messagingSenderId: "462211256149",
    appId: "1:462211256149:web:a03ace3c70b306620169dc",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const useadmin = defineStore("admin", {
    state: () => ({
        dialog: false,
        dialog_1: false,
        dialog_3: false,
        user: {
            name: "",
            email: "",
            password: "",
            expectedUserType: "admin",
            id: "",
            roles: [],
        },
        role: [
            "حذف واضافة مشرفين",
            "مشرف الروضة",
            "مشرف الصف الاول",
            "مشرف الصف الثاني",
            "مشرف الصف الثالث",
            "مشرف الصف الرابع",
            "مشرف الصف الخامس",
            "مشرف الصف السادس",
            "مشرف الصف الاول الاعدادي",
            "مشرف الصف الثاني الاعدادي",
            "مشرف الصف الثالث الاعدادي",
            "مشرف الصف الاول الثانوي",
            "مشرف الصف الثاني الثانوي",
            "مشرف الصف الثالث الثانوي",
        ],
        users: [],
        loading: false,
        show_Password: false,
        loading1: false,
    }),
    actions: {
        toggle_Show_Password() {
            this.show_Password = !this.show_Password;
        },
        generate_Random_Password() {
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
            this.user.password = password;
            return this.user.password;
        },
        /*async copy_Password() {
            const toast = useToast();
            try {
                await navigator.clipboard.writeText(this.user.password);
                toast.success("تم نسخ الباسورد!");
            } catch (err) {
                console.error("Failed to copy text: ", err);
                toast.error("فشل في نسخ الباسورد", {
                    className: "custom-toast-error",
                });
            }
        },*/
        async add_admin() {
            try {
                this.loading = true;
                const docRef = await addDoc(collection(db, "users"), {
                    name: this.user.name,
                    email: this.user.email,
                    userType: this.user.expectedUserType,
                    password: this.user.password,
                    roles: this.user.roles,
                });
                await updateDoc(docRef, {
                    id: docRef.id,
                });
                console.log("Document written with ID: ", docRef.id);
                console.log("this.Users", this.users);
                this.Get_data();
                this.dialog = false;
                this.loading = false;
            } catch (error) {
                // ..
                console.log(error.Message);
            }
        },
        async Get_data() {
            try {
                this.loading1 = true;
                this.users = [];
                const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((doc) => {
                    if (doc.data().userType == "admin") {
                        this.users.push(doc.data());
                    }
                });
                console.log("this.Users", this.users);
                this.loading1 = false;
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },
        async delete_user(user_Id) {
            try {
                // Log before attempting to delete
                console.log("Deleting user from Firestore:", user_Id);
                // Delete the document from Firestore
                await deleteDoc(doc(db, "users", user_Id));
                // Log after successful deletion
                console.log(
                    "user deleted from Firestore successfully:",
                    user_Id
                );
                // Find the index of the user in the users array
                const index = this.users.findIndex(
                    (user) => user.id === user_Id
                );

                // If the user is found in the users array, remove it
                if (index !== -1) {
                    this.users.splice(index, 1);
                    console.log("user deleted successfully from users array");
                } else {
                    console.log("user not found in users array");
                }
                this.Get_data();
            } catch (error) {
                console.error("Error deleting Job:", error);
            }
        },
        //get the data for each user
        user_Information(user) {
            this.name_Information = user.name;
            this.Id_Information = user.id;
            console.log(user.id);
            this.email_Information = user.email;
            this.roles_Information = user.roles;
        },
        async Update_Admin(userId) {
            try {
                this.loading = true;
                const docRef = doc(db, "users", userId);
                updateDoc(docRef, {
                    name: this.name_Information,
                    email: this.email_Information,
                    roles: this.roles_Information,
                });
                this.Get_data();
                this.loading = false;
                this.dialog_1 = false;
            } catch (error) {
                console.error("Error updating the Job:", error);
            }
        },
    },
});
