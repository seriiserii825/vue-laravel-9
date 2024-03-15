<script setup lang="ts">
import {ICategoryResponse} from "../../interfaces/api/ICategoryResponse.ts";
import {ref} from "vue";

const emits = defineEmits(['emit_category_id']);

const props = defineProps<{
  categories: ICategoryResponse[]
}>();

const current_category_id = ref<number>(0);


function getCategory(id: number) {
  current_category_id.value = id;
  emits('emit_category_id', id);
}
</script>

<template>
  <!-- Categories widget-->
  <div class="card mb-4">
    <div class="card-header">Categories</div>
    <div class="card-body">
      <div class="row">
        <ul class="list-unstyled mb-0">
          <li
              v-for="category in categories"
              :key="category.id"
              @click="getCategory(category.id)"
              class="btn btn-outline-primary m-2"
              :class="{'btn-primary text-white': current_category_id === category.id}"
          >{{ category.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
