<template lang="">
    <div class="feedbackForm">
      <span class="feedbackForm__icon feedbackForm__icon--second">
        <img src="@/assets/img/combined.png" alt="combined image" />
      </span>
      <h2 class="subtitle">Editing ‘Add a dark theme option’</h2>
      <form>
        <AppInput />

        <AppSelect
          @selectOn="selectOption"
          :options="selectList"
          :selected="selected"
          :selectIn="selectIn"
        >
          <template #label>
            <div>
              <h2 class="control__title">Category</h2>
              <p class="descr">Choose a category for your feedback</p>
            </div>
          </template>
        </AppSelect>

        <AppSelect
          @selectOn="selectOption"
          :options="selectList"
          
        >
          <template #label>
            <div>
              <h2 class="control__title">Update Status</h2>
              <p class="descr">Change feature state</p>
            </div>
          </template>

        </AppSelect>
        <AppTextarea />
      </form>
  
      <div class="feedbackForm__btn">
        <button type="button" class="btn btn__danger">Delete</button>
        <router-link to="/" class="btn btn__dark">Cancel</router-link>
        <button class="btn btn__primary">Add Feedback</button>
      </div>
    </div>
  </template>
  <script>
  import AppInput from "@/components/UI/Controls/Input";
  import AppSelect from "@/components/UI/Controls/Select";
  import AppTextarea from "@/components/UI/Controls/Textarea";
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
        
      };
    },
    methods: {
      selectOption(item) {
         console.log(item);
      },
    },
  };
  </script>
  <style lang=""></style>
  