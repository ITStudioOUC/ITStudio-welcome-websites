import { createRouter, createWebHistory } from "vue-router";
import rootIndex from "../views/rootIndex.vue";
import mainPage from "../views/mainPage.vue";
import departmentInformation from "../views/departmentInformation.vue";
import worksShow from "../views/worksShow.vue";
import membersInfo from "../views/membersInfo.vue";
import logOn from "../views/logOn.vue";
import query from "../views/Query.vue";

const routes = [{
        path: "/",
        component: rootIndex,
    },
    {
        path: "/mainPage",
        component: mainPage,
    },
    {
        path: "/departmentInformation",
        name: "departmentInformation",
        component: departmentInformation,
    },
    {
        path: "/worksShow",
        name: "worksShow",
        component: worksShow,
    },
    {
        path: "/membersInfo",
        name: "membersInfo",
        component: membersInfo,
    },
    {
        path: "/logOn",
        name: "logOn",
        component: logOn,
    },
    {
        path: "/query",
        name: "query",
        component: query,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;