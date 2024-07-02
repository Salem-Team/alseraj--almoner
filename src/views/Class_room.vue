<template>
  <div class="jk">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-list>
            <v-list-item
              v-for="(clas, index) in classes"
              :key="index"
              :to="{ name: 'classPage', params: { year: clas.id } }"
            >
              <v-list-item-content
                style="padding: 10px; direction: rtl"
                class="student-item"
              >
                <h2>
                  <v-avatar color="info" style="margin-left: 20px">
                    {{ index + 1 }} </v-avatar
                  >{{ clas.fullName }}
                </h2>
                <div>
                  <v-avatar color="info ml-2">
                    <v-icon icon="mdi-account-circle"></v-icon>
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
        { id: 1, fullName: "ثالثه ثانوي" },
        { id: 2, fullName: "ثانية ثانوي" },
        { id: 3, fullName: "أولى ثانوي" },
        { id: 4, fullName: "ثالثة إعدادي" },
        { id: 5, fullName: "ثانية إعدادي" },
        { id: 6, fullName: "أولى إعدادي" },
        { id: 7, fullName: "سادس ابتدائي" },
        { id: 8, fullName: "خامس ابتدائي" },
        { id: 9, fullName: "رابع ابتدائي" },
        { id: 10, fullName: "ثالث ابتدائي" },
        { id: 11, fullName: "ثاني ابتدائي" },
        { id: 12, fullName: "أولى ابتدائي" },
        { id: 13, fullName: "روضة أولى" },
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
