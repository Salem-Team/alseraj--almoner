import { defineStore } from "pinia";

export const useDialogStore = defineStore("dialog", {
    state: () => ({
        dialog_addstudent: false,
    }),
    actions: {
        showAddStudentDialog() {
            this.dialog_addstudent = true;
        },
        hideAddStudentDialog() {
            this.dialog_addstudent = false;
        },
    },
});
