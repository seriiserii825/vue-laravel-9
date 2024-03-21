import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
// import './style.css'
import './assets/css/bootstrap.css'
import './assets/css/styles.css'
import App from './App.vue'
import {routes} from "./routes.ts";
import useResetLocalStorage from './hooks/useResetLocalStorage.ts'
import {addErrorHandler} from './axios/axios-instance.ts'
import {loadLayoutMiddleware} from './middleware/loadLayoutMiddleware.ts'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach(loadLayoutMiddleware);

addErrorHandler((error: any) => {
  const config = error.response.config;
  const error_code = error.response.status;
  console.log(error_code, "error_code");
  if (error_code === 400 || error_code === 401 || error_code === 419) {
    useResetLocalStorage();
    window.location.href = "/login";
  }
  if ("error_alert" in config) {
    console.log(config.error_alert, "config.error_alert");
    console.log(error.response.data, "error.response.data");
  }
  return Promise.reject(error);
});

app.use(router)
app.mount('#app')
