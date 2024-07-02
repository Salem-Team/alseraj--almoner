<template>
  <div>
    <StudentList :year="year" />
  </div>
</template>

<script>
import StudentList from "@/components/StudentList.vue";

export default {
  name: "ClassPage",
  components: {
    StudentList,
  },
  props: ["year"],
};
</script>
