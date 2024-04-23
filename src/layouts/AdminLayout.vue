<script lang="ts" setup="">
import AdminMenu from "../components/admin/AdminMenu.vue";
import {useLifecycleLogger} from "../hooks/useLifecycleLogger";
useLifecycleLogger('default');
</script>
<template>
  <div class='default-layout'>
    <div class="default-layout__menu">
      <AdminMenu />
    </div>
    <div class="default-layout__content">
      <slot />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.default-layout {
  display: flex;
  justify-content: center;
  min-height: 100vh;

  &__menu {
    padding: 3.2rem 2rem;
    flex: 0 0 20rem;
    color: white;
    background: #444;
  }

  &__content {
    flex: 1;
    padding: 3.2rem;
  }
}
</style>
