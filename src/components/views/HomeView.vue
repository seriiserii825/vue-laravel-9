<script setup lang="ts">
import HomeIntro from "../home/HomeIntro.vue";
import PostsLoop from "../home/PostsLoop.vue";
import Aside from "../home/Aside.vue";
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
        <Aside/>
      </div>
    </div>
  </div>
</template>
