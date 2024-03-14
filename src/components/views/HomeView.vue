<script setup lang="ts">
import HomeIntro from "../home/HomeIntro.vue";
import PostsLoop from "../home/PostsLoop.vue";
import Aside from "../home/Aside.vue";
import {Ihome} from "../../interfaces/home/Ihome.ts";
import {onMounted, ref} from "vue";
import {axiosInstance} from "../../axios/axios-instance.ts";

const home = ref<Ihome>();

async function getHome() {
  const data = await axiosInstance.get('/home');
  home.value = data.data;
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
    <div class="row">
      <!-- Blog entries-->
      <div class="col-lg-8">
        <PostsLoop/>
      </div>
      <div class="col-lg-4">
        <Aside v-if="home && home.categories" :categories="home.categories"/>
      </div>
    </div>
  </div>
</template>
