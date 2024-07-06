<template>
    <div class="jk">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-list>
                        <v-list-item
                            v-for="(clas, index) in classes"
                            :key="index"
                            :to="{
                                name: 'classPage',
                                params: { year: clas.fullName },
                            }"
                        >
                            <v-list-item-content
                                style="padding: 10px; direction: rtl"
                                class="student-item"
                            >
                                <h2>
                                    <v-avatar
                                        color="info"
                                        style="margin-left: 20px"
                                    >
                                        {{ index + 1 }} </v-avatar
                                    >{{ clas.fullName }}
                                </h2>
                                <div>
                                    <v-avatar color="info ml-2">
                                        <v-icon
                                            icon="mdi-account-circle"
                                        ></v-icon>
                                    </v-avatar>
                                    <v-avatar color="info">
                                        <v-icon icon="mdi-book"></v-icon>
                                    </v-avatar>
                                </div>
                            </v-list-item-content>
                        </v-list-item> </v-list
                ></v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

export default {
    name: "ClassRoom",
    setup() {
        const route = useRoute();
        const classId = ref(route.params.id);

        // Watch for changes in the route params and update classId accordingly
        watch(
            () => route.params.id,
            (newId) => {
                classId.value = newId;
            }
        );

        return {
            classId,
        };
    },
    data() {
        return {
            students_class: [],
            classes: [
                { id: 1, fullName: "الصف الثالث الثانوي" },
                { id: 2, fullName: "الصف الثاني الثانوي" },
                { id: 3, fullName: " الصف أولى ثانوي" },
                { id: 4, fullName: "الصف الثالث الاعدادي" },
                { id: 5, fullName: "الصف الثاني الاعدادي" },
                { id: 6, fullName: "الصف الاول الاعدادي" },
                { id: 7, fullName: "الصف السادس الابتدائي" },
                { id: 8, fullName: "الصف الخامس الابتدائي" },
                { id: 9, fullName: "الصف الرابع الابتدائي" },
                { id: 10, fullName: "الصف الثالث الابتدائي" },
                { id: 11, fullName: "الصف الثاني الابتدائي" },
                { id: 12, fullName: "الصف الاول الابتدائي" },
                { id: 13, fullName: "ثانيه روضه" },
                { id: 14, fullName: " اولي روضه" },
            ],
            dialog_addstudent: false,
            form: {
                name: "",
                phone: "",
                email: "",
            },
            errors: {
                name: [],
                phone: [],
                email: [],
            },
        };
    },
};
</script>

<style scoped>
.student-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.student-item:hover {
    background-color: #2196f333;
}
</style>
