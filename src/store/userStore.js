import { defineStore } from "pinia";
import { auth, db } from "../Firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

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

                // بنتأكد هل اليوزر موجود ولا لا
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
                }
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async logout() {
            await signOut(auth);
            this.user = null;
        },
    },
});
