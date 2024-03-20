import DashboardView from "./components/views/DashboardView.vue";
import HomeView from "./components/views/HomeView.vue";
import LoginView from "./components/views/LoginView.vue";
import RegisterView from "./components/views/RegisterView.vue";

export const routes = [
    {path: '/', component: HomeView},
    { path: '/register', component: RegisterView },
    { path: '/login', component: LoginView },
    { path: '/dashboard', component: DashboardView },
    // { path: '/contact', component: Contact }
]
