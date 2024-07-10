<template>
    <v-container class="login-container">
        <v-card>
            <v-card-title class="text-center">Login</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="handleLogin">
                    <v-select
                        v-model="userType.type"
                        :items="userType.types"
                        label="User Type"
                        required
                    ></v-select>
                    <v-text-field
                        v-model="email"
                        label="Email"
                        type="email"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        required
                    ></v-text-field>

                    <v-btn
                        type="submit"
                        :loading="loading"
                        :disabled="loading"
                        color="primary"
                    >
                        Login
                    </v-btn>
                    <v-alert v-if="error" type="error" class="mt-2">{{
                        error
                    }}</v-alert>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import Cookies from "js-cookie";

export default {
    data() {
        return {
            email: "",
            password: "",
            userType: {
                type: "",
                types: ["parent", "admin"],
            },
            loading: false,
            error: null,
            user: null,
        };
    },
    watch: {
        "userType.type"(newValue) {
            if (newValue === "parent") {
                this.email = "parent@gmail.com";
                this.password = "123456";
            } else if (newValue === "admin") {
                this.email = "admin@gmail.com";
                this.password = "123456";
            }
        },
    },
    methods: {
        async handleLogin() {
            this.loading = true;
            this.error = null;

            // تحقق من البريد الإلكتروني وكلمة المرور
            if (
                (this.userType.type === "parent" &&
                    this.email === "parent@gmail.com" &&
                    this.password === "123456") ||
                (this.userType.type === "admin" &&
                    this.email === "admin@gmail.com" &&
                    this.password === "123456")
            ) {
                this.user = { email: this.email, type: this.userType.type };
                Cookies.set("user", JSON.stringify(this.user), { expires: 7 });

                if (this.userType.type === "parent") {
                    this.$router.push({ name: "Parent_Dashboard" });
                } else if (this.userType.type === "admin") {
                    this.$router.push({ name: "admin_Dashboard" });
                }
            } else {
                this.error = "Invalid email or password";
            }

            this.loading = false;
        },
    },
};
</script>

<style scoped>
.login-container {
    max-width: 300px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.error {
    color: red;
}
</style>
