<script lang="ts" setup="">
import {useLifecycleLogger} from "../hooks/useLifecycleLogger";
import Navigation from '../components/navigation/Navigation.vue';
import Footer from "../components/footer/Footer.vue";
useLifecycleLogger('default');
</script>
<template>
  <div class='default-layout'>
    <Navigation />
    <slot/>
    <Footer />
  </div>
</template>
<style lang="scss" scoped>
.default-layout {
}
</style>
