<script setup lang="ts">
  import {onMounted, ref, watch} from 'vue';
import {axiosInstance} from '../axios/axios-instance';
import {IPost} from '../interfaces/home/IPost';
import {ICategoryResponse} from '../interfaces/api/ICategoryResponse';
import Paginate from '../components/ui/Paginate.vue';
import Preloader from '../components/loading/Preloader.vue';
import SelectComponent from '../components/ui/SelectComponent.vue';

// const
const posts = ref<IPost[]>([])
const categories = ref<ICategoryResponse[]>([])
const current_page = ref(1);
const total_pages = ref(5);
const loading = ref(true);
const total = ref(0);
const category_options = ref<ICategoryResponse[]>([]);
const current_category = ref<ICategoryResponse>({});
const sort_field = ref<string>('created_at')
const sort_direction = ref<string>('desc')

function setFalse() {
  setTimeout(() => {
    loading.value = false;
  }, 600);
}

async function getPosts() {
  loading.value = true;
  try {
    let url = `/admin/post?page=${current_page.value}&category_id=${current_category.value.id}&sort_field=${sort_field.value}&sort_direction=${sort_direction.value}`;
    if (current_category.value.id === 0) {
      url = `/admin/post?page=${current_page.value}&sort_field=${sort_field.value}&sort_direction=${sort_direction.value}`;
    }
    const response = await axiosInstance.get(url);
    posts.value = response.data.data;
    current_page.value = response.data.meta.current_page;
    total_pages.value = response.data.meta.last_page;
    total.value = response.data.meta.total;
    setFalse();
  } catch (error) {
    setFalse();
    console.log(error, "error");
  }
}
async function getCategories() {
  try {
    const response = await axiosInstance.get('/category');
    categories.value = response.data.categories;
    category_options.value = response.data.categories;
    category_options.value.unshift({id: 0, title: 'All', slug: '', created_at: '', updated_at: ''});
    current_category.value = response.data.categories[0];
  } catch (error) {
    console.log(error, "error");
  }
}

async function updateCurrent(page: number) {
  loading.value = true;
  current_page.value = page;
  try {
    await getPosts();
    setFalse();
  } catch (error) {
    setFalse();
    console.log(error, "error");
  }
}

watch(current_category, async (newVal) => {
  loading.value = true;
  try {
    let url = `/admin/post?category_id=${newVal.id}&sort_field=${sort_field.value}&sort_direction=${sort_direction.value}`;
    if (newVal.id === 0) {
      url = `/admin/post?sort_field=${sort_field.value}&sort_direction=${sort_direction.value}`;
    }
    const response = await axiosInstance.get(url);
    posts.value = response.data.data;
    current_page.value = response.data.meta.current_page;
    total_pages.value = response.data.meta.last_page;
    total.value = response.data.meta.total;
    setFalse();
  } catch (error) {
    setFalse();
    console.log(error, "error");
  }
});

async function sortField(field: string) {
  if (sort_field.value === field) {
    sort_direction.value = sort_direction.value === 'asc' ? 'desc' : 'asc';
    await getPosts();
  } else {
    sort_field.value = field;
    sort_direction.value = 'asc';
    await getPosts();
  }
}

function getCategoryName(categoryId: number) {
  const category = categories.value.find((category) => category.id === categoryId);
  return category ? category.title : '';
}

async function init() {
  await getCategories();
  await getPosts();
}
onMounted(() => {
  init();
});
</script>

<template>
  <header class="admin-posts-view__header">
    <h3 class="admin-posts-view__total">Admin posts ({{ total }})</h3>
    <SelectComponent :options="category_options" v-model:value="current_category" label="Category" />
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
          <td>Category</td>
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
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td>{{ getCategoryName(post.category_id) }}</td>
          <td>{{ post.created_at }}</td>
        </tr>
      </tbody>
    </table>
    <div class="admin-post-view__pagination">
      <Paginate :current_page="current_page" :total_pages="total_pages" @update_current="updateCurrent" />
    </div>
  </div>
</template>
<style lang="scss">
.admin-posts-view {
  &__total {
    margin-bottom: 3.2rem;
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
