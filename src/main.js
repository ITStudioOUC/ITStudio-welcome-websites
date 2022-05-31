import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "animate.css";
import 'aos/dist/aos.css'
import AOS from 'aos/dist/aos.js'
import ElementUI from 'element-plus';
import "element-plus/theme-chalk/index.css"
import axios from 'axios';
const app = createApp(App);
app.config.globalProperties.$http = axios;
axios.defaults.baseURL = 'http://101.43.216.170:8001/v1/api';

AOS.init({
    duration: 800,
    disable: 'mobile',
    once: true,
});
app.use(store).use(router).use(AOS).use(ElementUI).mount("#app");