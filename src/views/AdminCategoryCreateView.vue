<script setup lang="ts">
import {ref, watch} from 'vue';
import {axiosInstance} from '../axios/axios-instance';
import {useRouter} from 'vue-router';
import {E_Router} from '../enum/E_Router';

const router = useRouter();

const form_fields = ref({
  title: '',
  slug: ''
})
const errors = ref({})
const record_exists = ref(false);

watch(() => form_fields.value.title, () => {
  form_fields.value.slug = form_fields.value.title.toLowerCase().replace(/ /g, '-');
})

async function submitForm() {
  try {
    await axiosInstance.post('/admin/category_admin', form_fields.value);
    router.push(E_Router.ADMIN_CATEGORIES)
    record_exists.value = false;
  } catch (error) {
    if (error.response && error.response.status === 422) {
      errors.value = error.response.data.errors;
      record_exists.value = false;
    } else {
      record_exists.value = true;
    }
    console.log(error, "error");
  }
  console.log(form_fields.value);

}
</script>

<template>
  <div class="admin-post-create-view">
    <h2 class="mb-5">Create New Category</h2>
    <div v-if="record_exists" class="alert alert-danger">Record already exists</div>
    <form @submit.prevent="submitForm">
      <div class="form-group mb-4">
        <label for="title">Title</label>
        <input v-model="form_fields.title" type="text" id="title" name="title" class="form-control" />
        <span v-if="errors && errors.title" class="text-danger">{{ errors.title[0] }}</span>
      </div>
      <div class="form-group mb-4">
        <label for="slug">Slug</label>
        <input v-model="form_fields.slug" type="text" id="slug" name="slug" class="form-control" />
        <span v-if="errors && errors.slug" class="text-danger">{{ errors.slug[0] }}</span>
      </div>
      <button type="submit" class="btn btn-primary">Create</button>
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
