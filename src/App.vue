<template>
    <nav class="ma-2">
        <router-link to="/">Home</router-link> |
        <router-link to="/admin">لوحة الاشراف</router-link>|
        <span v-if="user">
            <router-link @click="logout" to="/UserLogin">Sign Out</router-link>
        </span>
        <span v-else>
            <router-link to="/UserLogin">Sign In</router-link>
        </span>
    </nav>
    <router-view />
</template>

<script>
import { useAuthStore } from "./store/userStore";
import { mapActions, mapState } from "pinia";

export default {
    data() {
        return {
            Students: {
                id: "jhuhce789394hfp",
                Student_information: {
                    student_name: "محمود علي حسين",
                    class: "3/1",
                    educational_level: "الصف الثالث الإبتدائي",
                    gender: "ذكر",
                    Section: "لغات",
                    birthday: "2010/3/2",
                },
                Results: {
                    Weekly: [
                        {
                            Subject_Name: "دين",
                            Major_degree: 100,
                            Student_degree: 96,
                        },
                        {
                            Subject_Name: "دراسات",
                            Major_degree: 50,
                            Student_degree: 42,
                        },
                    ],
                    Monthly: [
                        {
                            Certificate_title: "شهر نوفمبر",
                            Degrees: [
                                {
                                    Subject_Name: "عربي",
                                    Teacher_Name: "عماد عمر",
                                    Behavior_assessment: "ممتاز",
                                    Minor_degree: 50,
                                    Major_degree: 100,
                                    Student_degree: 99,
                                },
                                {
                                    Subject_Name: "قرآن كريم",
                                    Teacher_Name: "نور محمود",
                                    Behavior_assessment: "ممتاز",
                                    Minor_degree: 50,
                                    Major_degree: 100,
                                    Student_degree: 95,
                                },
                            ],
                        },
                    ],
                },
                Payments: {
                    Required: 20000,
                    Paid_Up: 10000,
                    Installment_System: 2,
                },
                Notifications: [
                    {
                        Title: "جواب الفصل لولي الأمر",
                        Details:
                            "السيد/السيدة [اسم ولي الأمر]، نود إعلامكم بقرار فصل ابنكم/ابنتكم [اسم الطالب] من معهد السراج المنير الأزهري بسبب تكرار المخالفات للوائح والانضباط المدرسي، وذلك اعتبارًا من تاريخ هذا الخطاب.",
                    },
                ],
                Images: [
                    {
                        link: "https://firebasestorage.googleapis.com/v0/b/alseraj--almoner.appspot.com/o/images%2F%D8%AE%D9%84%D9%81%D9%8A%D8%A9%20%D9%84%D9%84%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20-%20Copy.jpg?alt=media&token=6262aa52-b522-47e1-b17d-a11ecec9e4cf",
                        Date: "2022/3/4",
                    },
                ],
            },
        };
    },
    computed: {
        ...mapState(useAuthStore, ["user"]),
    },
    methods: {
        ...mapActions(useAuthStore, ["logout"]),
    },
};
</script>

<style lang="scss">
* {
    direction: rtl !important;
}
body {
    font-family: "Cairo", sans-serif;
    font-weight: 400;
    font-style: normal;
}
:root {
    --main-color: #0088ff;
    --secound-color: #eee;
    --therd-color: #7a7a7a;
}
nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
