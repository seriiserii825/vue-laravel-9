<script setup lang="ts">
import {IPost} from "../../interfaces/home/IPost.ts";

const props = defineProps<{
  post: IPost
}>();
</script>

<template>
  <div class="card mb-4">
    <a href="#!"><img class="card-img-top" src="https://dummyimage.com/850x350/dee2e6/6c757d.jpg" alt="..."/></a>
    <div class="card-body">
      <div class="small text-muted">January 1, 2023</div>
      <h2 class="card-title">{{post.title}}</h2>
      <p class="card-text">{{post.text}}</p>
      <a class="btn btn-primary" href="#!">Read more →</a>
    </div>
  </div>
</template>
