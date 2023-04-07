<template lang="">
  <div class="feedback-form">
    <span class="feedback-form__icon feedback-form__icon--second">
      <img src="@/assets/img/combined.png" alt="combined image" />
    </span>
    <h2 class="subtitle">Editing ‘Add a dark theme option’</h2>
    <form @submit.prevent="editFeedback">
      <AppInput v-model="feedback.title" />

      <AppSelect :options="selectList" v-model="feedback.type">
        <template #label>
          <div>
            <h2 class="control__title">Category</h2>
            <p class="descr">Choose a category for your feedback</p>
          </div>
        </template>
      </AppSelect>

      <AppSelect :options="selectSecondList" v-model="feedback.status">
        <template #label>
          <div>
            <h2 class="control__title">Update Status</h2>
            <p class="descr">Change feature state</p>
          </div>
        </template>
      </AppSelect>

      <AppTextarea v-model="feedback.descr" />

      <div class="feedback-form__btn">
        <!-- <button  class="btn btn__danger">Delete</button>
        <router-link to="/" class="btn btn__dark">Cancel</router-link> -->
        <button type="submit" class="btn btn__primary">Add Feedback</button>
      </div>
    </form>
  </div>
</template>
<script>
import AppInput from "@/components/UI/Controls/Input";
import AppSelect from "@/components/UI/Controls/Select";
import AppTextarea from "@/components/UI/Controls/Textarea";
import axios from "axios";
export default {
  components: {
    AppInput,
    AppSelect,
    AppTextarea,
  },
  data() {
    return {
      selectList: [
        {
          name: "Feature",
          type: true,
          id: "1",
        },
        {
          name: "UI",
          type: false,
          id: "2",
        },
        {
          name: "UX",
          type: false,
          id: "3",
        },
        {
          name: "Enhancement",
          type: false,
          id: "4",
        },
        {
          name: "Bug",
          type: false,
          id: "5",
        },
      ],
      selectSecondList: [
        {
          name: "Suggestion",
          type: true,
          id: 1,
        },
        {
          name: "Planned",
          type: false,
          id: 2,
        },
        {
          name: "In-Progress",
          type: false,
          id: 3,
        },
        {
          name: "Live",
          type: false,
          id: 4,
        },
      ],
      feedback: {
        title:'',
        type:'',
        descr:'',
        status: "Suggestion",
      },
    };
  },
  methods: {
    async fetchFeedback() {
      try {
        let key = this.$route.params.id;
        const res = await axios.get(
          `https://feedback-8e94b-default-rtdb.firebaseio.com/feedback/${key}.json`
        );
        this.feedback = {
          title:res.data.title,
          type:res.data.type,
          id:key,
          descr:res.data.descr,
        }
      } catch (error) {
        console.log(error);
      }
    },
    editFeedback() {
      this.$store.dispatch('editFeedback', this.feedback).then(() => this.$router.push('/'))
    },
  },
  mounted() {
    this.fetchFeedback();
  },
};
</script>
<style lang=""></style>
