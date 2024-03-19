<script setup lang="ts">
const props = defineProps({
  error: String,
});
</script>

<template>
  <div class="error-message">
    {{ error }}
  </div>
</template>
<style lang="scss">
.error-message {
  font-size: 0.7rem;
  color: red;
}
</style>
