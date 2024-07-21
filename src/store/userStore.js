import { defineStore } from "pinia";
import Cookies from "js-cookie";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        loading: false,
        error: null,
    }),
    actions: {
        async login(email, password, userType) {
            this.loading = true;
            try {
                // تحقق من البريد الإلكتروني وكلمة المرور
                if (
                    (userType === "parent" &&
                        email === "parent@gmail.com" &&
                        password === "123456") ||
                    (userType === "admin" &&
                        email === "admin@gmail.com" &&
                        password === "123456")
                ) {
                    this.user = { email, userType };
                    this.error = null;
                    // تخزين بيانات المستخدم في الكوكيز
                    Cookies.set("user", JSON.stringify(this.user), {
                        expires: 7,
                    });
                } else {
                    this.error = "Invalid email or password";
                }
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        logout() {
            this.user = null;
            // إزالة بيانات المستخدم من الكوكيز
            Cookies.remove("user");
        },
        // لإخفاء الخطأ بعد 5 ثوانٍ
        clearError() {
            setTimeout(() => {
                this.error = null;
            }, 5000);
        },
    },
});
