import { defineStore } from "pinia";
import { auth, db } from "../Firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Cookies from "js-cookie";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        loading: false,
        error: null,
    }),
    actions: {
        async login(email, password, expectedUserType) {
            this.loading = true;
            try {
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                // Check if user exists
                const userRef = doc(db, "users", userCredential.user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    if (userData.userType === expectedUserType) {
                        this.user = {
                            ...userCredential.user,
                            userType: userData.userType,
                        };
                        this.error = null;
                        // Store user data in cookies
                        Cookies.set("user", JSON.stringify(this.user), {
                            expires: 7,
                        });
                    } else {
                        await signOut(auth);
                        this.error = "لايمكنك تسجيل الدخول";
                    }
                } else {
                    await setDoc(doc(db, "users", userCredential.user.uid), {
                        email: email,
                        userType: expectedUserType,
                    });

                    this.user = {
                        ...userCredential.user,
                        userType: expectedUserType,
                    };
                    this.error = null;
                    // Store user data in cookies
                }
                // Cookies.set("user", JSON.stringify(this.user), { expires: 7 });
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async logout() {
            await signOut(auth);
            this.user = null;
            // Remove user data from cookies
            Cookies.remove("user");
        },
        // For hide Error after 5s
        clearError() {
            setTimeout(() => {
                this.error = null;
            }, 5000);
        },
    },
});
