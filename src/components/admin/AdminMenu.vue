<script setup lang="ts">
</script>

<template>
  <ul class="admin-menu">
    <li>
      <router-link to="/">Home</router-link>
    </li>
    <li>
      <router-link to="/dashboard">Dashboard</router-link>
    </li>
    <li>
      <router-link to="/admin/posts">Posts</router-link>
    </li>
  </ul>
</template>
<style lang="scss">
.admin-menu {
  a {
    display: block;
    margin-bottom: 3.2rem;
    text-decoration: none;
    color: white;
  }
}
</style>
