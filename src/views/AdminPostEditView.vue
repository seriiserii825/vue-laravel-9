<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import {ICategoryResponse} from '../interfaces/api/ICategoryResponse';
import {axiosInstance} from '../axios/axios-instance';
import SelectComponent from '../components/ui/SelectComponent.vue';
import {useRouter} from 'vue-router';
import {E_Router} from '../enum/E_Router';

const router = useRouter();

const form_fields = ref({
  title: '',
  text: '',
  category_id: 0
})
const post_id = ref(router.currentRoute.value.params.id);

const errors = ref()
const record_exists = ref(false);

const category_options = ref<ICategoryResponse[]>([]);
const current_category = ref<ICategoryResponse>();

async function getCategories() {
  try {
    const response = await axiosInstance.get('/category');
    // console.log(response.data, "response.data");
    category_options.value = response.data.categories;
    current_category.value = response.data.categories[0];
  } catch (error) {
    console.log(error, "error");
  }
}

watch(current_category, async (new_val) => {
  if (new_val && new_val.id) {
    form_fields.value.category_id = new_val.id;
  }
});

async function getPost() {
  try {
    const response = await axiosInstance.get(`/admin/post/${post_id.value}`);
    form_fields.value = response.data.data;
  } catch (error) {
    console.log(error, "error");
  }
}

async function init() {
  await getCategories()
  if (post_id.value) {
    await getPost()
  }
}

async function submitForm() {
  try {
    await axiosInstance.post('/admin/post', form_fields.value);
    router.push(E_Router.ADMIN_POSTS);
  } catch (error: any) {
    if (error.response && error.response.status === 422) {
      errors.value = error.response.data.errors;
      record_exists.value = false;
    } else {
      record_exists.value = true;
    }
  }
}
onMounted(() => {
  init()
})
</script>

<template>
  <div class="admin-post-create-view">
    <h2 class="mb-5">Edit post</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group mb-4">
        <label for="title">Title</label>
        <input v-model="form_fields.title" type="text" id="title" name="title" class="form-control" />
        <span v-if="errors && errors.title" class="text-danger">{{ errors.title[0] }}</span>
      </div>
      <div class="form-group mb-4">
        <label>Content</label>
        <textarea v-model="form_fields.text" id="form_fields.text" name="form_fields.text" class="form-control"
          rows="10"></textarea>
        <span v-if="errors && errors.text" class="text-danger">{{ errors.text[0] }}</span>
      </div>
      <div class="form-group mb-4">
        <SelectComponent :options="category_options" v-model:value="current_category" label="Category" />
        <span v-if="errors && errors.category_id" class="text-danger">{{ errors.category_id[0] }}</span>
      </div>
      <button type="submit" class="btn btn-primary">Edit</button>
    </form>
  </div>
</template>
<style lang="scss">
.admin-post-create-view {
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  label {
    margin-bottom: 2rem;
    font-weight: bold;
  }

  .btn {
    font-size: 1.6rem;
  }
}
</style>
