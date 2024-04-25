import AdminPostCreateView from "./views/AdminPostCreateView.vue";
import AdminPostsView from "./views/AdminPostsView.vue";
import DashboardView from "./views/DashboardView.vue";
import HomeView from "./views/HomeView.vue";
import LoginView from "./views/LoginView.vue";
import RegisterView from "./views/RegisterView.vue";

export const routes = [
  {
    path: '/',
    component: HomeView,
    meta: {
      layout: 'default'
    }
  },
  {
    path: '/register', component: RegisterView,
    meta: {
      layout: 'default'
    }
  },
  {
    path: '/login', component: LoginView,
    meta: {
      layout: 'default'
    }
  },
  {
    path: '/admin/dashboard', component: DashboardView,
    meta: {
      layout: 'admin'
    }
  },
  {
    path: '/admin/posts', component: AdminPostsView,
    meta: {
      layout: 'admin'
    }
  },
  {
    path: '/admin/posts/create', component: AdminPostCreateView,
    meta: {
      layout: 'admin'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: "/",
  }
]


async function loadLayoutMiddleware(route) {
  const {layout} = route.meta;
  const normalizedLayoutName = layout || E_Layouts.DEFAULT;
  const fileName = E_LayoutToFileMap[normalizedLayoutName];
  const fileNameWithoutExtension = fileName.split('.vue')[0];

  const component = await import(
    `../../layouts/${fileNameWithoutExtension}.vue`
  );
  route.meta.layout_component = component.default;
}

