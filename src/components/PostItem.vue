<script setup>
import { ref } from "vue";

const props = defineProps({
  id: Number,
  title: String,
  body: String,
});

const emit = defineEmits(["delete", "edit"]);
const isEditing = ref(false);
const newTitle = ref(props.title);

const deletePost = () => {
  emit("delete", props.id);
};

const saveEdit = () => {
  emit("edit", props.id, newTitle.value);
  isEditing.value = false;
};

const startEdit = () => {
  isEditing.value = true;
  newTitle.value = props.title;
};
</script>

<template>
  <div class="post-card" v-if="isEditing">
    <input class="cmn-input post-input-new-title" v-model="newTitle" />
    <button class="cmn-btn post-btn-save" @click="saveEdit">Save</button>
    <button class="cmn-btn post-btn-cancel" @click="isEditing = false">
      Cancel
    </button>
  </div>
  <div class="post-card" v-else>
    <h2 class="post-title">
      {{ title }}
    </h2>
    <div class="post-btn-wrapper">
      <button class="cmn-btn post-btn" @click="startEdit">Edit</button>
      <button class="cmn-btn post-btn-delete" @click="deletePost">
        Delete
      </button>
    </div>
  </div>
</template>

<style>
.post-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.post-title {
  word-wrap: break-word;
  margin-bottom: 20px;
}

.post-btn-wrapper {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
