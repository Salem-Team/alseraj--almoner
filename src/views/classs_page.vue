<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <div class="ser">
                        <div class="right">
                            <div>الطلاب</div>
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
                                :icon="['fas', 'magnifying-glass']"
                                style="cursor: pointer"
                            />
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
        return { showAddStudentDialog };
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
