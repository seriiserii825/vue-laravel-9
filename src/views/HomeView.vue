<script setup lang="ts">
import {storeToRefs} from 'pinia'
import HomeIntro from "../components/home/HomeIntro.vue";
import PostsLoop from "../components/home/PostsLoop.vue";
import Aside from "../components/home/Aside.vue";
import {onMounted, ref, watch} from "vue";
import Preloader from "../components/loading/Preloader.vue";
import {useHomeStore} from "../stores/home-store.ts";

const home_store = useHomeStore();
const {post_loading, posts, categories} = storeToRefs(home_store);


async function init() {
  home_store.setPostLoading(true);
  try {
    await home_store.getCategories();
    await home_store.getPostsByCategory(0);
    home_store.setPostLoading(false);
  } catch (error) {
    console.log(error, "error");
    home_store.setPostLoading(false);
  }
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
        <Preloader v-if="post_loading" />
        <div v-else>
          <h3>Posts count: {{ posts.length }}</h3>
          <PostsLoop />
        </div>
      </div>
      <div class="col-lg-4">
        <Aside v-if="categories" />
      </div>
    </div>
  </div>
</template>
