<script setup lang="ts">
import {IPost} from "../../interfaces/home/IPost.ts";
import PostItem from "../post/PostItem.vue";
import {onMounted, ref} from "vue";
import useChunkArray from "../../hooks/useChunkArray.ts";

const props = defineProps<{
  posts: IPost[]
}>();

const posts_row = ref<array>([]);


onMounted(() => {
  posts_row.value = useChunkArray(props.posts, 2);
  console.log(posts_row.value, 'posts_row.value')
})
</script>

<template>
  <!-- Featured blog post-->
  <PostItem :post="posts[0]"/>
  <!-- Nested row for non-featured blog posts-->
  <div class="row">
    <div class="col-lg-6">
      <PostItem v-for="post in posts_row[0]" :key="post.id" :post="post"/>
    </div>
    <div class="col-lg-6">
      <PostItem v-for="post in posts_row[1]" :key="post.id" :post="post"/>
    </div>
  </div>
</template>
