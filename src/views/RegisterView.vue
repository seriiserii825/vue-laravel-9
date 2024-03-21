<script setup lang="ts">
import {ref} from "vue";
import {axiosInstance} from "../axios/axios-instance";
import ErrorMessage from "../components/message/ErrorMessage.vue";

const name = ref("");
const email = ref("");
const password = ref("");

const errors = ref([]);

const onSubmit = async () => {
  try {
    await axiosInstance.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
    });
    errors.value = [];   //console.log(repsonse, "repsonse");
  } catch (e: any) {
    if (e.response.status === 422) {
      if (e.response.data.errors) {
        errors.value = e.response.data.errors;
      }
      console.log(e.response.data.errors, 'response.data.errors')
    } else {
      console.log(e, 'e')
    }
  }
};
</script>

<template>
  <div class="container">
    <div class="register">
      <div style="min-height: 100vh;">
        <div class="register__form">
          <h2 class="mb-3">Register</h2>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Name</label>
            <input type="email" v-model="name" class="form-control" aria-describedby="emailHelp">
            <ErrorMessage v-if="errors['name']" :error="errors['name'][0]"/>
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" v-model="email" aria-describedby="emailHelp">
            <ErrorMessage v-if="errors['email']" :error="errors['email'][0]"/>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" v-model="password">
            <ErrorMessage v-if="errors['password']" :error="errors['password'][0]"/>
          </div>
          <button @click="onSubmit" type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.register {
  padding: 8rem;

  &__form {
    margin: 0 auto;
    padding: 3.2rem;
    max-width: 30rem;
    background: #f1f1f1;
    border-radius: 0.5rem;
  }
}
</style>
