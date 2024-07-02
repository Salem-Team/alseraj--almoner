<template>
    <v-container class="login-container">
        <v-card>
            <v-card-title class="text-center">Login</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="handleLogin">
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
                    <v-select
                        v-model="userType.type"
                        :items="userType.types"
                        label="User Type"
                        required
                    ></v-select>
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
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "../store/userStore";

export default {
    data() {
        return {
            email: "",
            password: "",
            userType: {
                // كائن يحتوي على أنواع المستخدمين
                type: "parent", // النوع الافتراضي
                types: ["parent", "student", "admin"], // الأنواع المتاحة
            },
        };
    },
    computed: {
        ...mapState(useAuthStore, ["loading", "error"]),
    },
    methods: {
        ...mapActions(useAuthStore, ["login"]),
        async handleLogin() {
            await this.login(this.email, this.password, this.userType.type);
            if (!this.error && this.userType.type === "parent") {
                this.$router.push({ name: "Parent_Dashboard" });
            }
            if (!this.error && this.userType.type === "student") {
                this.$router.push({ name: "Student_Dashboard" });
            }
            if (!this.error && this.userType.type === "admin") {
                this.$router.push({ name: "admin_Dashboard" });
            }
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
