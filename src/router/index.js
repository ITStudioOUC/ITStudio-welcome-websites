import { createRouter, createWebHistory } from "vue-router";
import rootIndex from "../views/rootIndex.vue";
import mainPage from "../views/mainPage.vue";
const routes = [
  {
    path: "/",
    component: rootIndex,
  },
  {
    path: "/mainPage",
    component: mainPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
