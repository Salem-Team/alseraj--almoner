import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/HomeView.vue";
import ClassRoom from "../views/Class_room.vue";
import ClassPage from "../views/classs_page.vue";
import TheAdministrator from "../views/TheAdministrator.vue";
import UserLogin from "../views/USerLogin.vue";
import Parent_Dashboard from "../views/Parent_Dashboard.vue";
import Student_Dashboard from "../views/Student_Dashboard.vue";
import admin_Dashboard from "../views/admin_Dashboard.vue";
import Edit_profile from "../views/Edit_profile.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
  {
    // يمكنك إضافة المزيد من المسارات هنا إذا لزم الأمر
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
    path: "/admin_Dashboard",
    name: "admin_Dashboard",
    component: admin_Dashboard,
  },
  {
    path: "/Edit_profile",
    name: "Edit_profile",
    component: Edit_profile,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
