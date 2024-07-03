import { createRouter, createWebHistory } from "vue-router";

import ClassRoom from "../views/Class_room.vue";
import ClassPage from "../views/classs_page.vue";
import TheAdministrator from "../views/TheAdministrator.vue";
import HomeView from "../views/HomeView.vue";
import UserLogin from "../views/USerLogin.vue";
import Parent_Dashboard from "../views/Parent_Dashboard.vue";
import Student_Dashboard from "../views/Student_Dashboard.vue";
import admin_Dashboard from "../views/admin_Dashboard.vue";
import Edit_profile from "../views/Edit_profile.vue";
import Modifications from "../views/Modifications_admin.vue";
import Add_News from "../views/Add_News.vue";
import Photo_Gallery from "../views/Photo_Gallery.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },

    {
        path: "/UserLogin",
        name: "UserLogin",
        component: UserLogin,
    },
    {
        path: "/Parent_Dashboard",
        name: "Parent_Dashboard",
        component: Parent_Dashboard,
    },
    {
        path: "/Student_Dashboard",
        name: "Student_Dashboard",
        component: Student_Dashboard,
    },
    {
        path: "/Modifications",
        name: "Modifications",
        component: Modifications,
    },
    {
        path: "/Add_News",
        name: "Add_News",
        component: Add_News,
    },
    {
        path: "/admin_Dashboard",
        name: "admin_Dashboard",
        component: admin_Dashboard,
    },
    {
        path: "/Edit_profile",
        name: "Edit_profile",
        component: Edit_profile,
    },
    {
        path: "/Photo_Gallery",
        name: "Photo_Gallery",
        component: Photo_Gallery,
    },
    {
        path: "/ClassRoom",
        name: "Class",
        component: ClassRoom,
        props: true,
    },
    {
        path: "/class/:year",
        name: "classPage",
        component: ClassPage,
        props: true,
    },
    {
        path: "/admin",
        name: "Admin",
        component: TheAdministrator,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
