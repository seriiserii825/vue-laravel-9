<script setup lang="ts">
import HomeIntro from "../components/home/HomeIntro.vue";
import PostsLoop from "../components/home/PostsLoop.vue";
import Aside from "../components/home/Aside.vue";
import {onMounted, ref} from "vue";
import {axiosInstance} from "../axios/axios-instance.ts";
import {IPost} from "../interfaces/home/IPost.ts";
import Preloader from "../components/loading/Preloader.vue";
import {ICategoryResponse} from "../interfaces/api/ICategoryResponse.ts";

const posts = ref<IPost[]>([]);
const categories = ref<ICategoryResponse[]>([]);
const category_id = ref<number>(0);
const loading = ref<boolean>(true);
const post_current_page = ref<number>(1);
const post_total_pages = ref<number>(1);
const post_per_page = ref<number>(2);

async function getPostsByCategory(id: number, page: number = 1) {
  loading.value = true;
  const data = await axiosInstance.get(`/post?category_id=${id}&page=${page}`);
  posts.value = data.data.data;
  post_current_page.value = data.data.meta.current_page;
  post_total_pages.value = data.data.meta.last_page;
  post_per_page.value = data.data.meta.per_page;
  stopLoading();
}

async function getCategories() {
  const data = await axiosInstance.get("/category");
  categories.value = data.data.categories;
}

async function setCategoryId(id: number) {
  category_id.value = id;
  await getPostsByCategory(id);
}

async function setCurrentPage(page: number) {
  await getPostsByCategory(category_id.value, page);
}

async function init() {
  await getCategories();
  await getPostsByCategory(0);
}

function stopLoading() {
  setTimeout(() => {
    loading.value = false;
  }, 500);
}

onMounted(() => {
  init();
})
</script>

<template>
  <HomeIntro />
  <div class="container" style="min-height: 100vh">
    <div class="row">
      <div class="col-lg-8">
        <Preloader v-if="loading" />
        <div v-else>
          <h3>Posts count: {{ posts.length }}</h3>
          <PostsLoop v-if="posts" @emit_change_page="setCurrentPage" :per_page="post_per_page"
            :current_page="post_current_page" :total_pages="post_total_pages" :posts="posts" />
        </div>
      </div>
      <div class="col-lg-4">
        <Aside v-if="categories" :categories="categories" @emit_category_id="setCategoryId" />
      </div>
    </div>
  </div>
</template>
