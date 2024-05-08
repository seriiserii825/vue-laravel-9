export enum E_Router {
  HOME = '/',
  REGISTER = '/register',
  LOGIN = '/login',
  ADMIN_DASHBOARD = '/admin/dashboard',
  ADMIN_CATEGORIES = '/admin/categories',
  ADMIN_CATEGORIES_CREATE = '/admin/categories/create',
  ADMIN_CATEGORIES_EDIT = '/admin/categories/edit/:id',
  ADMIN_POSTS = '/admin/posts',
  ADMIN_POSTS_CREATE = '/admin/posts/create',
  ADMIN_POSTS_EDIT = '/admin/posts/edit/:id',
  NOT_FOUND = '/:pathMatch(.*)*',
}
