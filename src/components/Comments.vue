<template>
  <ul class="pt-5 pb-11">
    <li
      v-for="{id, userId, comment, author: { img, name } } in comments"
      class="flex items-start mb-2 bg-slate-100 p-1 rounded-lg"
      :class="`${store.authToken === userId ? 'bg-slate-400' : 'bg-slate-300'}`"
    >
      <img :src="img ? img : userImage" alt="user image" class="w-8 h-8 rounded-full mr-3" />
      <div class="flex-1">
        <h6 class="text-sm capitalize font-semibold">{{ store.authToken === userId ? "My comment" : name }}</h6>
        <span class="inline-block w-full text-slate-800 font-bold">{{
          comment
        }}</span>
      </div>
      <button v-if="deleteBtn" class="">
        <img
          src="@/assets/images/trash.svg"
          class="w-5 h-full"
          :data-id="id"
          data-name="comments"
        />
      </button>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from '@/store/auth'
import userImage from '@/assets/images/user-image.jpg'

const store = useAuthStore()
const route = useRoute();
const deleteBtn = ref(false);
const props = defineProps({
  comments: {
    type: Array,
    required: true,
  },
});
watchEffect(() => {
  if (route.name === "profile") {
    deleteBtn.value = true;
  } else {
    deleteBtn.value = false;
  }
});

const comments = computed(() => props.comments);
</script>
