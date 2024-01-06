<template>
  <section>
    <div class="project-container">
      <a>
        <chevron-left-icon
          @click="router.back()"
          class="text-white w-10 font-medium mb-5 cursor-pointer"
        />
      </a>
      <loader v-if="loading" />
      <div v-else>
        <profile-user-content :user="user" />
        <div class="flex">
          <h2 class="text-lg text-slate-200 font-normal mr-2">
            Feedbacks <span class="font-extrabold">28</span>
          </h2>
          <h2 class="text-lg text-slate-200 font-normal mr-2">
            Followers <span class="font-extrabold">28</span>
          </h2>
          <h2 class="text-lg text-slate-200 font-normal mr-2">
            Following <span class="font-extrabold">28</span>
          </h2>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { useFeedbackStore } from "@/store/feedback";
import { onMounted, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";
import ProfileUserContent from "@/components/ProfileUserContent.vue";

const route = useRoute();
const router = useRouter();
const store = useAuthStore();
const loading = ref(false);
const feedbackStore = useFeedbackStore();
// const feedbacks = computed(() => feedbackStore.)
const user = computed(() => store.user);
onMounted(async () => {
  loading.value = true;
  await store.getUsers();
  await store.getSingleUser(route.params.id, "id");
  loading.value = false;
});
</script>
