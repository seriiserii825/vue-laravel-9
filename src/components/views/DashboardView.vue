<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {axiosInstance} from '../../axios/axios-instance';
import Preloader from '../loading/Preloader.vue';

const loading = ref(true);

async function getUser() {
  try {
    await axiosInstance.get('/user');
    loading.value = false;
  } catch (error) {
    console.log(error, "error");
    loading.value = false;
  }
}

async function init() {
  await getUser();
}
onMounted(() => {
  init();
});
</script>

<template>
  <Preloader v-if="loading" />
  <div v-else class="dashboard-view">
    <h2>Dashboard</h2>
  </div>
</template>
