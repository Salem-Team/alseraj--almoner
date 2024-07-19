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

import { useSecureDataStore } from "./secureData";
const firebaseConfig = {
    // Firebase configuration object
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
export const useteacher = defineStore("teacher", {
    state: () => ({
        // Reactive state
        dialog: false,
        dialog_1: false,
        dialog_3: false,
        user: {
            // Initial user object
            name: "",
            email: "",
            password: "",
            expectedUserType: "teacher",
            id: "",
            roles: [],
        },
        role: [
            // List of roles
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
        users: [], // Array to hold user data
        loading: false, // Loading state
        show_Password: false, // State for showing password
        loading1: false, // Another loading state
    }),
    actions: {
        // Actions section (methods)
        // Toggle password visibility
        toggle_Show_Password() {
            this.show_Password = !this.show_Password;
        },
        // Generate random password
        generate_Random_Password() {
            const characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let password = "";
            for (let i = 0; i < 8; i++) {
                password += characters.charAt(
                    Math.floor(Math.random() * characters.length)
                );
            }
            this.user.password = password; // Update user's password
            return this.user.password;
        },
        // Add new teacher user
        async add_teacher() {
            try {
                const secrureDataStore = useSecureDataStore();

                this.loading = true;
                // Add document to Firestore collection
                const docRef = await addDoc(collection(db, "teachers"), {
                    name: secrureDataStore.encryptData(
                        this.user.name,
                        "12345a"
                    ),
                    email: secrureDataStore.encryptData(
                        this.user.email,
                        "12345a"
                    ),
                    userType: this.user.expectedUserType,

                    password: this.user.password,

                    roles: this.user.roles,
                });
                await updateDoc(docRef, {
                    id: docRef.id,
                });
                console.log("Document written with ID: ", docRef.id);
                this.Get_data(); // Refresh user data
                this.dialog = false; // Close dialog
                this.loading = false; // Stop loading indicator
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },
        // Fetch teacher user data
        async Get_data() {
            try {
                const decryption = useSecureDataStore();
                this.loading1 = true;
                this.users = []; // Clear users array

                // Retrieve documents from Firestore collection
                const querySnapshot = await getDocs(collection(db, "teachers"));
                // Loop through documents and filter by userType
                querySnapshot.forEach((doc) => {
                    if (doc.data().userType == "teacher") {
                        const userData = {
                            id: doc.id,
                            email: decryption.decryptData(
                                doc.data().email,
                                "12345a"
                            ),

                            name: decryption.decryptData(
                                doc.data().name,
                                "12345a"
                            ),
                            userType: doc.data().expectedUserType,

                            password: doc.data().password,

                            roles: doc.data().roles,
                        };
                        this.users.push(userData); // Add teacher users to array
                    }
                });
                console.log("this.teachers", this.users);
                this.loading1 = false;
            } catch (error) {
                console.error("Error retrieving data: ", error);
            }
        },
        // Delete user from Firestore and array
        async delete_user(user_Id) {
            try {
                console.log("Deleting user from Firestore:", user_Id);
                await deleteDoc(doc(db, "teachers", user_Id)); // Delete document
                const index = this.users.findIndex(
                    (user) => user.id === user_Id
                );
                if (index !== -1) {
                    this.users.splice(index, 1); // Remove user from array
                    console.log("User deleted successfully from users array");
                } else {
                    console.log("User not found in users array");
                }
                this.Get_data(); // Refresh user data
                this.dialog_3 = false; // Close dialog
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        },
        // Store user information
        user_Information(user) {
            this.name_Information = user.name;
            this.Id_Information = user.id;
            console.log(user.id);
            this.email_Information = user.email;
            this.roles_Information = user.roles;
        },
        // Update teacher user information
        async Update_teacher(userId) {
            try {
                const secrureDataStore = useSecureDataStore();
                this.loading = true;
                const docRef = doc(db, "teachers", userId);
                // Update document in Firestore
                await updateDoc(docRef, {
                    name: secrureDataStore.encryptData(
                        this.name_Information,
                        "12345a"
                    ),
                    email: secrureDataStore.encryptData(
                        this.email_Information,
                        "12345a"
                    ),
                    roles: this.roles_Information,
                });
                this.Get_data(); // Refresh user data
                this.loading = false;
                this.dialog_1 = false; // Close dialog
            } catch (error) {
                console.error("Error updating user:", error);
            }
        },
    },
});
