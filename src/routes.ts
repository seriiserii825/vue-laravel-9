import {E_Router} from "./enum/E_Router";
import AdminCategoriesView from "./views/AdminCategoriesView.vue";
import AdminCategoryCreateView from "./views/AdminCategoryCreateView.vue";
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
    path: E_Router.HOME, component: RegisterView,
    meta: {
      layout: 'default'
    }
  },
  {
    path: E_Router.LOGIN, component: LoginView,
    meta: {
      layout: 'default'
    }
  },
  {
    path: E_Router.ADMIN_DASHBOARD, component: DashboardView,
    meta: {
      layout: 'admin'
    }
  },
  {
    path: E_Router.ADMIN_CATEGORIES, component: AdminCategoriesView,
    meta: {
      layout: 'admin'
    }
  },
  {
    path: E_Router.ADMIN_CATEGORIES_CREATE, component: AdminCategoryCreateView,
    meta: {
      layout: 'admin'
    }
  },
  {
    path: E_Router.ADMIN_POSTS, component: AdminPostsView,
    meta: {
      layout: 'admin'
    }
  },
  {
    path: E_Router.ADMIN_POSTS_CREATE, component: AdminPostCreateView,
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

