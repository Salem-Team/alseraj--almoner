<template>
    <div>
        <h1>صفحة السنة الدراسية</h1>
        <p>السنة الدراسية رقم: {{ year }}</p>
        <!-- تمرير خاصية السنة الدراسية إلى StudentList -->
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
