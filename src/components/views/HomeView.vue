<script setup lang="ts">
import HomeIntro from "../home/HomeIntro.vue";
import PostsLoop from "../home/PostsLoop.vue";
import Aside from "../home/Aside.vue";
import {Ihome} from "../../interfaces/home/Ihome.ts";
import {onMounted, ref} from "vue";
import {axiosInstance} from "../../axios/axios-instance.ts";
import {IPost} from "../../interfaces/home/IPost.ts";

const home = ref<Ihome>();
const posts = ref<IPost[]>([]);

async function getHome() {
  const data = await axiosInstance.get('/home');
  home.value = data.data;
  posts.value = home.value.posts;
}

async function getPostsByCategory(id: number) {
  const data = await axiosInstance.get(`/post?category_id=${id}`);
  posts.value = data.data.posts;
}

async function init() {
  await getHome();
}

onMounted(() => {
  init();
})
</script>

<template>
  <HomeIntro/>
  <div class="container">
    <div class="row" v-if="home">
      <!-- Blog entries-->
      <div class="col-lg-8">
        <h3>Posts count: {{posts.length}}</h3>
        <PostsLoop v-if="posts" :posts="posts"/>
      </div>
      <div class="col-lg-4">
        <Aside v-if="home.categories" :categories="home.categories" @emit_category_id="getPostsByCategory"/>
      </div>
    </div>
  </div>
</template>
