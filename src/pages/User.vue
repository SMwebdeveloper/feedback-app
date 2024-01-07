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
        <div class="flex justify-between items-start mb-4">
          <h2
            class="text-lg text-slate-200 font-normal mr-2 border-b-2 border-b-slate-200 flex flex-col-reverse items-center"
          >
            Feedbacks
            <span class="font-extrabold inline-block">{{
              feedbacks.length
            }}</span>
          </h2>
          <h2
            class="text-lg text-slate-200 font-normal mr-2 flex flex-col-reverse items-center"
          >
            Followers <span class="font-extrabold inline-block">28</span>
          </h2>
          <h2
            class="text-lg text-slate-200 font-normal mr-2 flex flex-col-reverse items-center"
          >
            Following <span class="font-extrabold inline-block">28</span>
          </h2>
        </div>
        <div>
          <feedback v-for="feedback in feedbacks" :feedback="feedback" />
          <h2 v-if="!feedbacks.length && !loading" class="text-2xl text-slate-200 font-bold text-center mt-12">
            There are no feedbacks yet
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
const feedbackStore = useFeedbackStore();

const loading = ref(false);
const key: any = route.params.id;

const feedbacks = computed(() => feedbackStore.userFeedbacks);
const user = computed(() => store.user);

onMounted(async () => {
  loading.value = true;
  await store.getUsers();
  await store.getSingleUser(key, "id");
  await feedbackStore.getFeedbacks();
  await feedbackStore.getUserFeedbacks(user.value.userId);
  loading.value = false;
});
</script>
