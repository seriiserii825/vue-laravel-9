import {ref} from "vue";
import {defineStore} from "pinia";
import {IPost} from "../interfaces/home/IPost";
import {ICategoryResponse} from "../interfaces/api/ICategoryResponse";
import {IPostMeta} from "../interfaces/posts/IPostMeta";
import {axiosInstance} from "../axios/axios-instance";

export const useHomeStore = defineStore("home", () => {
  const category_id = ref<number>(0);
  const posts = ref<IPost[]>([]);
  const categories = ref<ICategoryResponse[]>([]);
  const post_current_page = ref<number>(1);
  const post_total_pages = ref<number>(1);
  const post_per_page = ref<number>(2);
  const post_loading = ref<boolean>(false);

  function setPosts(data: IPost[]) {
    posts.value = data;
  }

  function stopLoading() {
    setTimeout(() => {
      post_loading.value = false;
    }, 500)
  }

  function setPostLoading(loading: boolean) {
    post_loading.value = loading;
  }

  async function getPostsByCategory(id: number, page: number = 1) {
    post_loading.value = true;
    const data = await axiosInstance.get(`/post?category_id=${id}&page=${page}`);
    setPosts(data.data.data);
    setPostsMeta(data.data.meta);
    stopLoading();
  }

  async function getCategories() {
    post_loading.value = true;
    const data = await axiosInstance.get("/category");
    setCategories(data.data.categories);
    stopLoading();
  }


  function setCurrentPage(page: number) {
    post_current_page.value = page;
  }

  function setCategories(data: ICategoryResponse[]) {
    categories.value = data;
  }
  function setCategoryId(id: number) {
    category_id.value = id;
  }
  function setPostsMeta(data: IPostMeta) {
    post_current_page.value = data.current_page;
    post_total_pages.value = data.last_page;
    post_per_page.value = data.per_page;
  }

  return {
    post_loading,
    setPostLoading,
    posts,
    setPosts,
    post_current_page,
    post_total_pages,
    post_per_page,
    getPostsByCategory,
    setPostsMeta,
    setCurrentPage,
    categories,
    setCategories,
    category_id,
    setCategoryId,
    getCategories
  };
});
