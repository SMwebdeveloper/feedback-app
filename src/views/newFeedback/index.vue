<template lang="">
  <div class="container">
    <div class="feedbackPage">
      <router-link to="/" class="link">
        <span>
          <img src="@/assets/img/arrow-left.svg" alt="arrow icon" />
        </span>
        Go back
      </router-link>
      <div class="feedback-form">
        <span class="feedback-form__icon">
          <img src="@/assets/img/plus.png" alt="plus image" />
        </span>
        <h2 class="subtitle">Create new Feedback</h2>
        <form @submit.prevent="onSubmit">
          <AppInput v-model="feedback.title" />

          <AppSelect
            :options="selectList"
            @selected="($event) => (feedback.type = $event)"
          >
            <template #label>
              <div>
                <h2 class="control__title">Category</h2>
                <p class="descr">Choose a category for your feedback</p>
              </div>
            </template>
          </AppSelect>
          <AppTextarea v-model="feedback.descr" />

          <input
            type="file"
            class="control control__input"
            @change="onClick"
          />>
          <img src="" alt="" class="feedback-image" id="image">
          <div class="feedback-form__btn">
            <router-link to="/" class="btn btn__dark">Cancel</router-link>
            <button class="btn btn__primary">Add Feedback</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import AppInput from "@/components/Controls/Input";
import AppSelect from "@/components/Controls/Select";
import AppTextarea from "@/components/Controls/Textarea";
import { v4 as uuidv4 } from "uuid";
import { mapActions } from "vuex";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";

export default {
  components: {
    AppInput,
    AppSelect,
    AppTextarea,
  },
  data() {
    return {
      selectList: ["Feature", "UI", "UX", "Enhancement", "Bug"],
      feedback: {
        title: "",
        type: "Feature",
        descr: "",
        id: uuidv4(),
      },
      storage: getStorage(),
      image: null
    };
  },
  methods: {
    ...mapActions({
      addFeedback: "addFeedback",
    }),
    onClick(e) {
      e.preventDefault();
      const imageEl = e.target.files[0];

      const storageRef = ref(this.storage, `images/${imageEl.name}`);
      uploadBytes(storageRef, imageEl).then((snapshot) => {
        console.log("upload image");
      });
      const img = document.getElementById('image')

      getDownloadURL(ref(this.storage, `images/${imageEl.name}`))
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'

          // This can be downloaded directly:
          const xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = (event) => {
            const blob = xhr.response;
          };
          xhr.open("GET", url);
          xhr.send();

          console.log(url)
          img.setAttribute('src', url)
          this.image = url
          console.log(this.image)
          this.$store.getters.getImage = this.image
        })
        .catch((error) => {
          // Handle any errors
        });
    },
    onSubmit() {
      this.addFeedback(this.feedback).then(() => this.$router.push("/"));
    }
  },
  mounted() {
    console.log(this.image)
  },
};
</script>
<style lang="css">
.feedback-image{
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
