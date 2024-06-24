<script setup>
import { onMounted, reactive } from "vue";
import PostList from "@/components/PostList.vue";
import { getPosts } from "@/api/getPosts.js";

const state = reactive({
  posts: [],
  isLoading: true,
  error: null,
});

onMounted(async () => {
  try {
    state.posts = await getPosts();
  } catch (error) {
    state.error = "Error loading posts";
    console.error("Error receiving data:", error.message);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <div class="container">
    <h1 class="title">Posts</h1>
    <div class="loader" v-if="state.isLoading"></div>
    <div v-if="state.posts">
      <PostList :posts="state.posts" />
    </div>
    <div class="error" v-else>
      <div>Error receiving data</div>
    </div>
  </div>
</template>

<style>
@import url("@/assets/style.css");
</style>
