<script setup lang="ts">
import HomeIntro from "../home/HomeIntro.vue";
import PostsLoop from "../home/PostsLoop.vue";
import Aside from "../home/Aside.vue";
import {Ihome} from "../../interfaces/home/Ihome.ts";
import {onMounted, ref} from "vue";
import {axiosInstance} from "../../axios/axios-instance.ts";
import {IPost} from "../../interfaces/home/IPost.ts";
import Preloader from "../loading/Preloader.vue";

const home = ref<Ihome>();
const posts = ref<IPost[]>([]);
const loading = ref<boolean>(true);

async function getHome() {
  loading.value = true;
  const data = await axiosInstance.get('/home');
  home.value = data.data;
  posts.value = home.value.posts;
  stopLoading();
}

async function getPostsByCategory(id: number) {
  loading.value = true;
  const data = await axiosInstance.get(`/post?category_id=${id}`);
  posts.value = data.data.posts;
  stopLoading();
}

async function init() {
  await getHome();
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
  <HomeIntro/>
  <div class="container" style="min-height: 100vh">
    <div class="row" v-if="home">
      <!-- Blog entries-->
      <div class="col-lg-8">
        <Preloader v-if="loading"/>
        <div v-else>
          <h3>Posts count: {{ posts.length }}</h3>
          <PostsLoop v-if="posts" :posts="posts"/>
        </div>
      </div>
      <div class="col-lg-4">
        <Aside v-if="home.categories" :categories="home.categories" @emit_category_id="getPostsByCategory"/>
      </div>
    </div>
  </div>
</template>
