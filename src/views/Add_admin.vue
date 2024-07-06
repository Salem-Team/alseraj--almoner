<template>
    <div>
        <div class="use">
            <div class="title">
                <div class="right">
                    <v-breadcrumbs>
                        <v-breadcrumbs-item
                            @click="$router.push('/admin')"
                            link
                        >
                            الإشراف
                        </v-breadcrumbs-item>
                        <v-breadcrumbs-divider />
                        <v-breadcrumbs-item
                            @click="$router.push('/Modifications')"
                            link
                        >
                            الإعدادات
                        </v-breadcrumbs-item>
                        <v-breadcrumbs-divider />
                        <v-breadcrumbs-item
                            @click="$router.push('/Add_admin')"
                            link
                        >
                            إدارة المشرف
                        </v-breadcrumbs-item>
                    </v-breadcrumbs>
                </div>
                <div class="left">
                    <font-awesome-icon
                        @click="admin.dialog = true"
                        :icon="['fas', 'plus']"
                    />
                </div>
            </div>
        </div>
        <v-dialog v-model="admin.dialog" width="90%">
            <v-card width="100%" class="popup">
                <v-card-title class="d-flex justify-space-between align-center">
                    <div class="text-h4 ps-2" style="color: var(--main-color)">
                        إضافة مشرف
                    </div>
                    <v-btn
                        style="color: var(--main-color)"
                        icon="mdi-close"
                        variant="text"
                        @click="admin.dialog = false"
                    ></v-btn>
                </v-card-title>
                <form ref="form" @submit.prevent class="ma-auto">
                    <v-text-field
                        v-model="user.name"
                        type="text"
                        label=" الاسم"
                        variant="outlined"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="user.email"
                        type="email"
                        label="بريد الكتروني"
                        variant="outlined"
                        required
                    ></v-text-field>
                    <v-select
                        style="width: 100%"
                        v-model="user.roles"
                        :items="admin.role"
                        label="أختر نوع الصلاحية"
                        variant="outlined"
                        multiple
                        required
                    ></v-select>
                    <v-text-field
                        v-model="user.password"
                        type="password"
                        label="كلمة مرور"
                        variant="outlined"
                        required
                    ></v-text-field>

                    <v-btn
                        class="d-flex align-center mt-4 mb-10"
                        type="submit"
                        color="primary"
                        @click="admin.add_admin"
                    >
                        إضافة
                    </v-btn>
                </form>
            </v-card></v-dialog
        >

        <v-dialog v-model="admin.dialog_1" width="90%">
            <v-card width="100%" class="popup">
                <v-card-title class="d-flex justify-space-between align-center">
                    <div class="text-h4 ps-2" style="color: var(--main-color)">
                        إضافة مشرف
                    </div>
                    <v-btn
                        style="color: var(--main-color)"
                        icon="mdi-close"
                        variant="text"
                        @click="admin.dialog_1 = false"
                    ></v-btn>
                </v-card-title>
                <form ref="form" @submit.prevent class="ma-auto">
                    <v-text-field
                        v-model="admin.name_Information"
                        type="text"
                        label=" الاسم"
                        variant="outlined"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="admin.email_Information"
                        type="email"
                        label="بريد الكتروني"
                        variant="outlined"
                        required
                    ></v-text-field>
                    <v-btn
                        class="d-flex align-center mt-4 mb-10"
                        type="submit"
                        color="primary"
                        @click="admin.Update_admin"
                    >
                        تعديل
                    </v-btn>
                </form>
            </v-card></v-dialog
        >
        <v-container
            class="box d-flex align-center justify-space-around"
            width="90%"
        >
            <v-card v-for="user in users" :key="user.id" width="25%">
                <v-card-title
                    class="d-flex align-center justify-center flex-wrap"
                >
                    <p>{{ user.name }}</p>
                    <v-spacer />
                    <div class="ma-2">
                        <font-awesome-icon
                            @click="admin.user_Information(user)"
                            :icon="['fas', 'edit']"
                            @click.="dialog_1 = true"
                        />
                    </div>
                    <div>
                        <font-awesome-icon
                            @click="admin.delete_user(user.id)"
                            :icon="['fas', 'trash']"
                        />
                    </div>
                </v-card-title>

                <v-card-subtitle v-for="index in user.roles" :key="index">
                    {{ index }}
                </v-card-subtitle>

                <v-card-text>{{ user.email }} </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script scoped>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useadmin } from "@/store/admin.js";
export default defineComponent({
    setup() {
        const admin = useadmin();
        admin.Get_data();
        admin.generate_Random_Password();
        const {
            user,
            add_admin,
            dialog,
            delete_user,
            Get_data,
            users,
            role,
            dialog_1,
            generate_Random_Password,
            user_Information,
        } = storeToRefs(admin);
        // Return the necessary reactive properties and methods
        return {
            admin,
            generate_Random_Password,
            user,
            role,
            delete_user,
            Get_data,
            user_Information,
            users,
            add_admin,
            dialog,
            dialog_1,
        };
    },
});
</script>
<style lang="scss" scoped>
form {
    width: 90%;
    margin: auto;
}

.use {
    .title {
        margin-top: 40px;
        background: var(--secound-color);
        padding: 15px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 3px;
        border-radius: 5px;
        color: var(--main-color);
        font-weight: bold;
        font-size: 20px;
        & > div {
            display: flex;
            align-items: center;
            gap: 4px;
            &.left {
                svg {
                    cursor: pointer;
                    transition: 0.3s;
                    background: #fff;
                    padding: 10px;
                    border-radius: 5px;
                    &:hover {
                        color: var(--therd-color);
                    }
                }
            }
        }
    }
}
.box {
    flex-wrap: wrap;
    gap: 10px;
}
</style>
