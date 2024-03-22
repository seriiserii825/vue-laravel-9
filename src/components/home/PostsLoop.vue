<script setup lang="ts">
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import PostItem from "../post/PostItem.vue";
import {onMounted, ref, watch} from "vue";
import useChunkArray from "../../hooks/useChunkArray.ts";
import {useHomeStore} from "../../stores/home-store.ts";
import {storeToRefs} from "pinia";

const emits = defineEmits(['emit_change_page']);

const home_store = useHomeStore();
const {posts, post_total_pages, post_current_page, category_id} = storeToRefs(home_store);

const posts_row = ref();

async function updateHandler(page: number) {
  await home_store.getPostsByCategory(category_id.value, page);
}


watch(() => posts.value, async (newVal, oldVal) => {
  if (newVal !== oldVal) {
    posts_row.value = useChunkArray(posts.value, 2);
  }
})

onMounted(() => {
  posts_row.value = useChunkArray(posts.value, 2);
})
</script>

<template>
  <!-- Nested row for non-featured blog posts-->
  <div class="row" v-if="posts_row && posts_row.length > 0">
    <div class="col-lg-6">
      <PostItem v-for="post in posts_row[0]" :key="post.id" :post="post" />
    </div>
    <div class="col-lg-6">
      <PostItem v-for="post in posts_row[1]" :key="post.id" :post="post" />
    </div>
  </div>
  <!-- TODO: move pagination to home -->
  <div v-if="post_total_pages > 1" class="row mb-4">
    <v-pagination v-model="post_current_page" :pages="post_total_pages" :range-size="1" active-color="#DCEDFF"
      @update:modelValue="updateHandler" />
  </div>

</template>
<style lang="scss">
.Pagination {
  justify-content: center;
}
</style>
