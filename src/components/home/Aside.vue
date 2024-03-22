<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useHomeStore} from '../../stores/home-store';

const home_store = useHomeStore();
const {categories, category_id} = storeToRefs(home_store);
async function getCategory(id: number) {
  home_store.setCategoryId(id);
  await home_store.getPostsByCategory(id);
}
</script>

<template>
  <div class="card mb-4">
    <div class="card-header">Categories</div>
    <div class="card-body">
      <div class="row">
        <ul v-if="categories && categories.length > 0" class="list-unstyled mb-0">
          <li v-for="category in categories" :key="category.id" @click="getCategory(category.id)"
            class="btn btn-outline-primary m-2" :class="{'btn-primary text-white': category_id === category.id}">{{
          category.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
