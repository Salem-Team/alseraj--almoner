import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import ClassRoom from "../views/Class_room.vue";
import ClassPage from "../views/classs_page.vue";
import TheAdministrator from "../views/TheAdministrator.vue";

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
  // يمكنك إضافة المزيد من المسارات هنا إذا لزم الأمر
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
