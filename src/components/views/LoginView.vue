<script setup lang="ts">
import {ref} from "vue";
import {axiosInstance} from "../../axios/axios-instance";
import ErrorMessage from "../message/ErrorMessage.vue";

const email = ref("");
const password = ref("");

const errors = ref([]);

const onSubmit = async () => {
  try {
    const response = await axiosInstance.post('/login', {
      email: email.value,
      password: password.value,
    });
    localStorage.setItem("userToken", response.data.access_token);
    errors.value = [];   //console.log(repsonse, "repsonse");
  } catch (e: any) {
    console.log(e, "e");
    if (e.repsonse && e.response.status === 422 || e.response.status === 401) {
      console.log(e.response.data, 'e')
      if (e.response.data.errors) {
        errors.value = e.response.data.errors;
      }
      // console.log(e.response.data.errors, 'response.data.errors')
    } else {
      console.log(e.response.data.message, "e.response.data.message");
      console.log(e.response.data, 'e')
    }
  }
};
</script>

<template>
  <div class="container">
    <div class="register">
      <div style="min-height: 100vh;">
        <div class="register__form">
          <h2 class="mb-3">Login</h2>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" name="email" class="form-control" v-model="email" aria-describedby="emailHelp">
            <ErrorMessage v-if="errors['email']" :error="errors['email'][0]" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" name="password" class="form-control" v-model="password">
            <ErrorMessage v-if="errors['password']" :error="errors['password'][0]" />
          </div>
          <button @click="onSubmit" type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>
