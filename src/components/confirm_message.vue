<template>
    <v-snackbar v-model="snackbar" timeout="3000">
        {{ text }}

        <template v-slot:actions>
            <v-btn
                color="var(--main-color)"
                variant="text"
                @click="snackbar = false"
            >
                إغلاق
            </v-btn>
        </template>
    </v-snackbar>
</template>
<script>
export default {
    props: ["text", "snackbar1"],
    data() {
        return {
            snackbar: this.snackbar1,
        };
    },
};
</script>
