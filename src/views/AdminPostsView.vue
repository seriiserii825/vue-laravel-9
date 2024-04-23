<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {axiosInstance} from '../axios/axios-instance';
import {IPost} from '../interfaces/home/IPost';
import {ICategoryResponse} from '../interfaces/api/ICategoryResponse';
const posts = ref<IPost[]>([])
const categories = ref<ICategoryResponse[]>([])

async function getPosts() {
  try {
    const response = await axiosInstance.get('/admin/post');
    posts.value = response.data.data;
  } catch (error) {
    console.log(error, "error");
  }
}
async function getCategories() {
  try {
    const response = await axiosInstance.get('/category');
    categories.value = response.data.categories;
  } catch (error) {
    console.log(error, "error");
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
  console.log('AdminPostsView mounted');
  init();
});
</script>

<template>
  <div class="admin-posts-view">
    <h3>Admin posts</h3>
    <table>
      <thead>
        <tr>
          <td>Id</td>
          <td>Title</td>
          <td>Category</td>
          <td>Created At</td>
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
  </div>
</template>
<style lang="scss">
.admin-posts-view {
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

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
