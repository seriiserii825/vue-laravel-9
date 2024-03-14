<script setup lang="ts">
import {onMounted, ref} from "vue";
import {ICategoryResponse} from "../../interfaces/api/ICategoryResponse.ts";
import {axiosInstance} from "../../axios/axios-instance.ts";

const categories_left = ref<ICategoryResponse[]>([]);
const categories_right = ref<ICategoryResponse[]>([]);

function chunkArray(arr, n) {
  const chunkLength = Math.max(arr.length / n, 1);
  const chunks = [];
  for (var i = 0; i < n; i++) {
    if (chunkLength * (i + 1) <= arr.length) chunks.push(arr.slice(chunkLength * i, chunkLength * (i + 1)));
  }
  return chunks;
}

async function init() {
  try {
    const data = await axiosInstance.get('category');
    const categories_chunk = chunkArray(data.data, 2);
    categories_left.value = categories_chunk[0];
    categories_right.value = categories_chunk[1];
  } catch (e) {
    console.log(e, 'e')
  }

}

onMounted(() => {
  init();
})
</script>

<template>
  <!-- Search widget-->
  <div class="card mb-4">
    <div class="card-header">Search</div>
    <div class="card-body">
      <div class="input-group">
        <input class="form-control" type="text" placeholder="Enter search term..." aria-label="Enter search term..."
               aria-describedby="button-search"/>
        <button class="btn btn-primary" id="button-search" type="button">Go!</button>
      </div>
    </div>
  </div>
  <!-- Categories widget-->
  <div class="card mb-4">
    <div class="card-header">Categories</div>
    <div class="card-body">
      <div class="row">
        <div class="col-sm-6">
          <ul class="list-unstyled mb-0">
            <li
                v-for="category in categories_left"
                :key="category.id"
            ><a href="#!">{{ category.title}}</a></li>
          </ul>
        </div>
        <div class="col-sm-6">
          <ul class="list-unstyled mb-0">
            <li
                v-for="category in categories_right"
                :key="category.id"
            ><a href="#!">{{category.title}}</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!-- Side widget-->
  <div class="card mb-4">
    <div class="card-header">Side Widget</div>
    <div class="card-body">You can put anything you want inside of these side widgets. They are easy to use, and feature
      the Bootstrap 5 card component!
    </div>
  </div>

</template>
