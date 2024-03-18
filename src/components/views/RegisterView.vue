<script setup lang="ts">
import {ref} from "vue";
import axios from "axios";

const name = ref("Serii");
const email = ref("seriiburduja@gmail.com");
const password = ref("serii1981;");
const password_confirmation = ref("serii1981;");

const onSubmit = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie')
    const response = await axios.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    });
  } catch (e) {
    console.log(e, 'e')
    if (e.response.status === 422) {
      console.log(response.data.errors, 'response.data.errors')
    } else {
      console.log(e, 'e')
    }
  }

  await axios.get('/sanctum/csrf-cookie')
  await axios.post('/register', {
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value
  }).then(response => {
    this.validationErrors = {}
    this.signIn()
  }).catch(({response}) => {
    if (response.status === 422) {
      this.validationErrors = response.data.errors
    } else {
      this.validationErrors = {}
      alert(response.data.message)
    }
  }).finally(() => {
    this.processing = false
  })
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
            <input type="email" v-model="name" class="form-control" id="exampleInputEmail1"
                   aria-describedby="emailHelp">
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" v-model="email" id="exampleInputEmail1"
                   aria-describedby="emailHelp">
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" v-model="password" id="exampleInputPassword1">
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password confirmation</label>
            <input type="password" class="form-control" v-model="password_confirmation" id="exampleInputPassword1">
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
