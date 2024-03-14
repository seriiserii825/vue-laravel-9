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
  <!-- Pagination-->
  <nav aria-label="Pagination">
    <hr class="my-0"/>
    <ul class="pagination justify-content-center my-4">
      <li class="page-item disabled"><a class="page-link" href="#" tabindex="-1" aria-disabled="true">Newer</a></li>
      <li class="page-item active" aria-current="page"><a class="page-link" href="#!">1</a></li>
      <li class="page-item"><a class="page-link" href="#!">2</a></li>
      <li class="page-item"><a class="page-link" href="#!">3</a></li>
      <li class="page-item disabled"><a class="page-link" href="#!">...</a></li>
      <li class="page-item"><a class="page-link" href="#!">15</a></li>
      <li class="page-item"><a class="page-link" href="#!">Older</a></li>
    </ul>
  </nav>

</template>
