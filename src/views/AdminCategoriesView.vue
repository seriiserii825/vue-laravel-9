<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {axiosInstance} from '../axios/axios-instance';
import Preloader from '../components/loading/Preloader.vue';
import {ICategoryAdmin} from '../interfaces/category/ICategoryAdmin';

const categories = ref<ICategoryAdmin[]>([])
const loading = ref(true);
const sort_field = ref<string>('created_at')
const sort_direction = ref<string>('desc')

function setFalse() {
  setTimeout(() => {
    loading.value = false;
  }, 600);
}

async function getCategories() {
  try {
    const response = await axiosInstance.get(`/admin/category_admin?sort_field=${sort_field.value}&sort_direction=${sort_direction.value}`);
    categories.value = response.data.data;
    setFalse();
  } catch (error) {
    console.log(error, "error");
    setFalse();
  }
}


async function sortField(field: string) {
  if (sort_field.value === field) {
    sort_direction.value = sort_direction.value === 'asc' ? 'desc' : 'asc';
    await getCategories();
  } else {
    sort_field.value = field;
    sort_direction.value = 'asc';
    await getCategories();
  }
}

async function init() {
  await getCategories();
}
onMounted(() => {
  init();
});
</script>

<template>
  <header class="admin-posts-view__header">
    <h3 class="admin-posts-view__total"></h3>
    <RouterLink to="/admin/categories/create" class="btn btn-success">Create New</RouterLink>
  </header>
  <Preloader v-if="loading" />
  <div class="admin-posts-view" v-else>
    <table>
      <thead>
        <tr>
          <td>Id</td>
          <td>
            <a @click.prevent="sortField('title')" href="#">
              Title
              <span v-if="sort_field === 'title' && sort_direction === 'desc'">&uarr;</span>
              <span v-if="sort_field === 'title' && sort_direction === 'asc'">&darr;</span>
            </a>
          </td>
          <td>
            <a @click.prevent="sortField('created_at')" href="#">
              Created At
              <span v-if="sort_field === 'created_at' && sort_direction === 'desc'">&uarr;</span>
              <span v-if="sort_field === 'created_at' && sort_direction === 'asc'">&darr;</span>
            </a>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.title }}</td>
          <td>{{ category.created_at }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style lang="scss">
.admin-posts-view {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btn {
      margin-right: auto;
      margin-left: 3rem;
    }
  }

  table {
    margin-top: 20px;
    width: 100%;
    border-collapse: collapse;

    thead {
      background-color: #f1f1f1;

      td {
        padding: 10px;
        font-weight: bold;
      }
    }

    tbody {
      tr:nth-child(even) {
        background-color: #f9f9f9;
      }

      td {
        padding: 10px;
        border-bottom: 1px solid #f1f1f1;
      }
    }
  }
}
</style>
