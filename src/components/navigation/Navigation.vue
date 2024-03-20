<script setup lang="ts">
import {axiosInstance} from '../../axios/axios-instance';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';

async function logout() {
  try {
    await axiosInstance.post('/logout');
    window.location.href = "/login";
  } catch (error) {
    console.log(error, "error");
  }
}
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#!">Start Bootstrap</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span
          class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item"><a class="nav-link" href="#!">About</a></li>
          <li class="nav-item"><a class="nav-link" href="#!">Contact</a></li>
          <li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Blog</a></li>
        </ul>
      </div>
      <button v-if="useIsLoggedIn()" @click="logout" class="btn btn-outline-primary">Logout</button>
      <template v-else>
        <router-link to="/register" class="btn btn-outline-primary me-2">Register</router-link>
        <router-link to="/login" class="btn btn-outline-primary">Login</router-link>
      </template>
    </div>
  </nav>
</template>
