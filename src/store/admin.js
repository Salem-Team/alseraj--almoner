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
import {
    getAuth,
    createUserWithEmailAndPassword,
    deleteUser,
} from "firebase/auth";
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
    }),
    actions: {
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
        async add_admin() {
            const auth = getAuth();
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    this.user.email,
                    this.user.password,
                    this.user.roles
                );
                // Signed in
                console.log(...userCredential.user.uid);
                this.user.id = userCredential.user.uid;
                console.log(this.user.id);
                await addDoc(collection(db, "users"), {
                    name: this.user.name,
                    email: this.user.email,
                    userType: this.user.expectedUserType,
                    password: this.user.password,
                    roles: this.user.roles,
                    id: this.user.id,
                });
            } catch (error) {
                // ..
                console.log(error.Message);
            }
        },
        async Get_data() {
            try {
                this.users = [];
                const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((doc) => {
                    this.users.push(doc.data());
                });
                console.log("this.Users", this.users);
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },
        async delete_user(userId) {
            const auth = getAuth();
            try {
                // Log before attempting to delete
                console.log("Deleting User from Firestore:", userId);
                // Assuming deleteUser is an async function, await its completion
                await deleteUser(auth, this.user.id);
                // Delete the document from Firestore
                await deleteDoc(doc(db, "users", userId));
                // Log after successful deletion
                console.log(
                    "user deleted from Firestore successfully:",
                    userId
                );
                // Find the index of the New in the News array
                const index = this.users.findIndex(
                    (user) => user.id === userId
                );
                // If the New is found in the News array, remove it
                if (index !== -1) {
                    this.users.splice(index, 1);
                    console.log("New deleted successfully from Users array");
                } else {
                    console.log("New not found in users array");
                }
                this.Get_data();
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        },
        //get the data for each user
        user_Information(user) {
            this.name_Information = user.name;
            this.Id_Information = user.id;
            console.log(user.id);
            this.email_Information = user.email;
        },
        async Update_Users(userId) {
            try {
                const docRef = doc(db, "users", userId);
                updateDoc(docRef, {
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password,
                    roles: this.user.roles,
                });
                this.Get_data();
                this.dialog_1 = false;
            } catch (error) {
                console.error("Error updating the New:", error);
            }
        },
    },
});
