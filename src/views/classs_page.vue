<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <div class="ser">
                        <div class="right">
                            <div>{{ year }}</div>
                        </div>
                        <div
                            class="left"
                            style="
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                gap: 20px;
                            "
                        >
                            <font-awesome-icon
                                :icon="['fas', 'filter']"
                                style="cursor: pointer"
                            />
                            <font-awesome-icon
                                :icon="['fas', 'plus']"
                                @click="showAddStudentDialog"
                                style="cursor: pointer"
                            />
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4" sm="6">
                    <v-btn
                        style="background: #54aef5; color: white"
                        rounded="xl"
                        size="x-large"
                        block
                        >الكل</v-btn
                    > </v-col
                ><v-col cols="12" md="4" sm="6">
                    <v-btn
                        style="background: #54aef5; color: white"
                        rounded="xl"
                        size="x-large"
                        block
                        >عربي</v-btn
                    > </v-col
                ><v-col cols="12" md="4" sm="6">
                    <v-btn
                        style="background: #54aef5; color: white"
                        rounded="xl"
                        size="x-large"
                        block
                        >لغات</v-btn
                    >
                </v-col>
            </v-row>
        </v-container>
        <StudentList :year="year" />
    </div>
</template>

<script>
import StudentList from "@/components/StudentList.vue";
import { useDialogStore } from "@/store/useDialogStore";

export default {
    name: "ClassPage",
    components: {
        StudentList,
    },
    props: ["year"],
    setup() {
        const dialogStore = useDialogStore();
        const showAddStudentDialog = () => {
            dialogStore.showAddStudentDialog();
        };
        const showSearchStudentDialog = () => {
            dialogStore.showSearchStudentDialog();
        };
        return { showAddStudentDialog, showSearchStudentDialog };
    },
};
</script>

<style>
.ser {
    width: 100%;
    height: 100px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #2196f3c4;
    color: white;
    font-size: 23px;
}
</style>
