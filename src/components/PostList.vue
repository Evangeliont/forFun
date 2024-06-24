<script setup>
import { ref, reactive } from "vue";
import PostItem from "@/components/PostItem.vue";
import { getPosts } from "@/api/getPosts.js";

const props = defineProps({
  posts: Array,
});

const newPostTitle = ref("");

const state = reactive({
  posts: props.posts,
  newPostTitle: newPostTitle,
  currentPage: 0,
  postsPerPage: 6,
  isLoading: false,
});

const addPost = (event) => {
  event.preventDefault();
  const newPost = {
    id: Date.now(),
    title: state.newPostTitle,
    body: "",
  };
  state.posts.push(newPost);
  state.newPostTitle = "";
};

const deletePost = (id) => {
  const index = state.posts.findIndex((post) => post.id === id);
  if (index !== -1) {
    state.posts.splice(index, 1);
  }
};

const editPost = (id, newTitle) => {
  const post = state.posts.find((post) => post.id === id);
  if (post) {
    post.title = newTitle;
  }
};

const loadMorePosts = async () => {
  if (state.isLoading) return;

  state.isLoading = true;
  try {
    const newPosts = await getPosts();
    const startIndex = state.currentPage * state.postsPerPage;
    const endIndex = startIndex + state.postsPerPage;
    const paginatedPosts = newPosts.slice(startIndex, endIndex);

    state.posts.push(...paginatedPosts);
    state.currentPage++;
  } catch (error) {
    console.error("Error loading more posts:", error.message);
  } finally {
    state.isLoading = false;
  }
};

loadMorePosts();
</script>

<template>
  <div class="post-wrapper">
    <form class="post-form" @submit="addPost">
      <input
        class="cmn-input post-input"
        v-model="state.newPostTitle"
        type="text"
        placeholder="New post title"
      />
      <button class="cmn-btn post-btn" type="submit">Add Post</button>
    </form>
    <ul class="post-list">
      <li class="post-item" v-for="post of state.posts" :key="post.id">
        <PostItem
          :title="post.title"
          :id="post.id"
          @delete="deletePost"
          @edit="editPost"
        />
      </li>
    </ul>
    <div class="loader" v-if="state.isLoading"></div>
    <div v-else class="load-btn-wrapper">
      <button class="cmn-btn load-more-btn" @click="loadMorePosts">More</button>
    </div>
  </div>
</template>

<style>
.post-wrapper {
  max-width: 1100px;
}

.post-form {
  max-width: 400px;
  display: flex;
  align-items: center;
  margin-bottom: 70px;
}

.post-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 40px;
}

.post-item {
  width: 300px;
  min-height: 250px;
  padding: 20px;
  border: 2px solid #5a5a5a;
  border-radius: 20px;
  background-color: #303030;
}

.load-btn-wrapper {
  max-width: 100px;
}

.load-more-btn {
  background-color: #ffffff;
  color: #000000;
}
</style>
