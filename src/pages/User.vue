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
        <profile-user-content :user="user" @addRemoveFollower="addRemoveFollower"/>

        <!-- visible feedbacks and followers button -->
        <div class="flex justify-between items-start mb-4">
          <h2 @click="visibleCommponents = 'feedbacks'"
            class="text-lg text-slate-200   flex flex-col-reverse items-center cursor-pointer duration-150"
            :class="{'border-b-2 border-b-slate-200 font-bold' : visibleCommponents === 'feedbacks'}"
          >
            Feedbacks
            <span class="font-extrabold inline-block">{{
              feedbacks.length
            }}</span>
          </h2>
          <h2
          @click="visibleCommponents = 'followers'"
            class="text-lg text-slate-200  mr-2 flex flex-col-reverse items-center cursor-pointer duration-150"
            :class="{'border-b-2 border-b-slate-200 font-bold' : visibleCommponents === 'followers'}"
          >
            Followers <span class="font-extrabold inline-block">{{ followers.length }}</span>
          </h2>
          <h2
          @click="visibleCommponents = 'followings'"
            class="text-lg text-slate-200  mr-2 flex flex-col-reverse items-center cursor-pointer duration-150"
            :class="{'border-b-2 border-b-slate-200 font-bold' : visibleCommponents === 'followings'}"
          >
            Following <span class="font-extrabold inline-block">{{ followings.length }}</span>
          </h2>
        </div>

        <!-- users feedbacks and followrs -->
        <div v-show="visibleCommponents === 'feedbacks'">
          <feedback v-for="feedback in feedbacks" :feedback="feedback" />
          <h2 v-if="!feedbacks.length && !loading" class="text-2xl text-slate-200 font-bold text-center mt-12">
            There are no feedbacks yet
          </h2>
        </div>
        <div v-show="visibleCommponents === 'followers'">
          <h2 v-if="!followers.length && !loading" class="text-2xl text-slate-200 font-bold text-center mt-12">
            There are no followers yet
          </h2>
        </div>
        <div v-show="visibleCommponents === 'followings'">
          <h2 v-if="!followings.length && !loading" class="text-2xl text-slate-200 font-bold text-center mt-12">
            There are no followings yet
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

const visibleCommponents = ref('feedbacks')
const loading = ref(false);
const key: any = route.params.id;

const feedbacks = computed(() => feedbackStore.userFeedbacks);
const user = computed(() => store.user);
const followers = computed(() => store.followers)
const followings = computed(() => store.following)

const addRemoveFollower = async (type: boolean) => {
  console.log()
   await store.addRemoveFollowers(user.value.id, type)
}

onMounted(async () => {
  loading.value = true;
  await store.getUsers();
  await store.getSingleUser(key, "id");
  await store.getFollowers(key)
  await store.getFollowings(user.value.userId)
  await feedbackStore.getFeedbacks();
  await feedbackStore.getUserFeedbacks(user.value.userId);
  loading.value = false;
});
</script>
