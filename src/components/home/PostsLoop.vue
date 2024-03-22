<script setup lang="ts">
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import {IPost} from "../../interfaces/home/IPost.ts";
import PostItem from "../post/PostItem.vue";
import {onMounted, ref} from "vue";
import useChunkArray from "../../hooks/useChunkArray.ts";

const emits = defineEmits(['emit_change_page']);

const props = defineProps<{
  posts: IPost[],
  current_page: number,
  total_pages: number,
  per_page: number
}>();

const posts_row = ref([]);
const current_page = ref(props.current_page);

function updateHandler(page: number) {
  emits('emit_change_page', page);
}


onMounted(() => {
  posts_row.value = useChunkArray(props.posts, 2);
  // console.log(posts_row.value, 'posts_row.value')
})
</script>

<template>
  <!-- Nested row for non-featured blog posts-->
  <div class="row">
    <div class="col-lg-6">
      <PostItem v-for="post in posts_row[0]" :key="post.id" :post="post" />
    </div>
    <div class="col-lg-6">
      <PostItem v-for="post in posts_row[1]" :key="post.id" :post="post" />
    </div>
  </div>
  <!-- TODO: move pagination to home -->
  <div v-if="total_pages > 1" class="row mb-4">
    <v-pagination v-model="current_page" :pages="total_pages" :range-size="1" active-color="#DCEDFF" @update:modelValue="updateHandler" />
  </div>

</template>
<style lang="scss">
.Pagination {
  justify-content: center;
}
</style>
