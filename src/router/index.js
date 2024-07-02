import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserLogin from "../views/USerLogin.vue";
import Parent_Dashboard from "../views/Parent_Dashboard.vue";
import Student_Dashboard from "../views/Student_Dashboard.vue";
import admin_Dashboard from "../views/admin_Dashboard.vue";
import Edit_profile from "../views/Edit_profile.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
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
