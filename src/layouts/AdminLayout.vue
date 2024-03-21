<script lang="ts" setup="">
import {useLifecycleLogger} from "../hooks/useLifecycleLogger";
useLifecycleLogger('default');
</script>
<template>
  <div class='default-layout'>
    <slot/>
  </div>
</template>
<style lang="scss" scoped>
.default-layout {
}
</style>
