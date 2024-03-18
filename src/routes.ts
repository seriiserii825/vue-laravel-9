import HomeView from "./components/views/HomeView.vue";
import RegisterView from "./components/views/RegisterView.vue";

export const routes = [
    {path: '/', component: HomeView},
    { path: '/register', component: RegisterView },
    // { path: '/contact', component: Contact }
]
