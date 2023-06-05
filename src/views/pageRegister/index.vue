<template lang="">
  <div class="container">
    <div class="feedbackPage">
      <div class="feedback-form">
        <span class="feedback-form__icon feedback-form__icon--second">
          <img src="@/assets/img/combined.png" alt="combined image" />
        </span>
        <h2 class="subtitle">Register</h2>
        <form @submit.prevent="handleClick">
          <label class="control">
            <h2 class="control__title">Name</h2>
            <input v-model="user.name" type="text" class="control__item" />
          </label>
          <label class="control">
            <h2 class="control__title">Email</h2>
            <input v-model="user.email" type="email" class="control__item" />
          </label>
          <!-- <label class="control">
            <h2 class="control__title">Image link</h2>
            <input type="text" class="control__item" />
          </label> -->
          <label class="control">
            <h2 class="control__title">Password</h2>
            <input v-model="user.password" type="text" class="control__item" />
          </label>
          <div class="feedback-form__btn">
            <button class="btn btn__primary">Register</button>
          </div>
        </form>
        <!-- <Loader v-else /> -->
      </div>
    </div>
  </div>
</template>
<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      }, 
    };
  },
  methods: {
    handleClick() {
      const auth = getAuth()
      const email = this.user.email
      const password = this.user.password
      createUserWithEmailAndPassword(auth,email, password)
      .then(cred => {
        this.$store.dispatch('addUser', this.user)
        console.log(cred)
      }).catch(err => {
        console.log(err.message)
      })
    },
  },
};
</script>
<style lang=""></style>
