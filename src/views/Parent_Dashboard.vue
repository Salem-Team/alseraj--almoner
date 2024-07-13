<template>
    <div class="profile-container">
        <div class="header" v-if="user">
            <h2 class="welcome-text">مرحبا {{ user.email }}</h2>
            <div class="action-buttons">
                <v-btn color="primary ml-2" small @click="Edit"
                    >تعديل البيانات</v-btn
                >
                <v-btn color="#555" small @click="My_Logout">تسجيل خروج</v-btn>
            </div>
        </div>

        <v-card class="profile-card">
            <v-toolbar color="info" dark flat>
                <v-toolbar-title class="text-center"
                    >الصفحه الشخصيه</v-toolbar-title
                >
            </v-toolbar>

            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="4">
                        <v-card class="info-card" style="height: 100%">
                            <v-card-title class="info-card-title text-center"
                                >بياناتك الشخصيه</v-card-title
                            >
                            <v-divider></v-divider>
                            <v-card-text class="info-card-text">
                                <strong>الاسم:</strong>
                                <div>{{ parent.name }}</div>
                                <strong>الايميل:</strong>
                                <div>{{ parent.email }}</div>
                                <strong>رقم الهاتف:</strong>
                                <div>{{ parent.phoneNumber }}</div>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="8">
                        <v-card class="info-card" style="height: 100%">
                            <v-card-title class="info-card-title text-center">
                                الأولاد المسجلين
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-row
                                    v-for="child in children"
                                    :key="child.id"
                                    class="child-info mb-3"
                                >
                                    <v-col
                                        cols="12"
                                        sm="4"
                                        class="d-flex flex-column align-center"
                                    >
                                        <strong class="text-h6">الاسم:</strong>
                                        <div>{{ child.name }}</div>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="4"
                                        class="d-flex flex-column align-center"
                                    >
                                        <strong class="text-h6"
                                            >الصف الدراسي:</strong
                                        >
                                        <div>{{ child.gradeLevel }}</div>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="4"
                                        class="d-flex align-center justify-center"
                                    >
                                        <v-btn
                                            color="info"
                                            small
                                            @click="goToChildDetails(child.id)"
                                        >
                                            عرض التفاصيل
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "../store/userStore";

export default {
    data: () => ({
        items: ["بياناتك الشخصيه", "اطفالى"],
        children: [
            {
                id: 1,
                name: "أحمد",
                gradeLevel: "الابتدائية",
            },
        ],
        parent: {
            name: "على احمد عبدالله",
            email: "parent@gmail.com",
            phoneNumber: "0105245841",
        },
    }),
    computed: {
        ...mapState(useAuthStore, ["user"]),
    },
    methods: {
        ...mapActions(useAuthStore, ["logout"]),
        Edit() {
            this.$router.push({ name: "Edit_profile" });
        },

        methods: {
            ...mapActions(useAuthStore, ["logout"]),
            Edit() {
                this.$router.push({ name: "Edit_profile" });
            },
            async My_Logout() {
                try {
                    await this.logout();
                    this.$router.push({ name: "home" });
                } catch (error) {
                    console.error("حدث خطأ أثناء تسجيل الخروج:", error.message);
                }
            },
        },

        goToChildDetails(childId) {
            this.$router.push({
                name: "ChildDetails",
                params: { id: childId },
            });
        },
        startEditing() {
            // نسخ بيانات الوالد للتعديل
            this.editedParent = { ...this.parent };
            this.editingMode = true;
        },
        saveChanges() {
            // حفظ التعديلات وتحديث البيانات
            this.parent = { ...this.editedParent };
            this.editingMode = false;
        },
    },
};
</script>

<style scoped>
* {
    direction: rtl;
}

.profile-container {
    max-width: 90%;
    margin: 20px auto;
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.header {
    padding: 10px 20px;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.action-buttons v-btn {
    margin-left: 10px;
}

.profile-card {
    background-color: #fff;
    border-radius: 12px;
    overflow: hidden;
}

.info-card {
    background-color: #eee;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.info-card-title {
    font-size: 1.5rem;
    font-weight: bold;
}

.info-card-text {
    font-size: 1.25rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.info-card-text > * {
    padding: 8px;
}

.child-info {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f1f1f1;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
