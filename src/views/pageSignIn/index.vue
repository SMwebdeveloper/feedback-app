<template lang="">
  <div class="container">
    <div class="feedbackPage">
      <div class="feedback-form">
        <span class="feedback-form__icon feedback-form__icon--second">
          <img src="@/assets/img/combined.png" alt="combined image" />
        </span>
        <h2 class="subtitle">Sign In</h2>
        <form @submit.prevent="handleClick">
          <label class="control">
            <h2 class="control__title">Email</h2>
            <input v-model="user.email" type="email" class="control__item" />
          </label>
          <label class="control">
            <h2 class="control__title">Password</h2>
            <input v-model="user.password" type="text" class="control__item" />
          </label>
          <div class="feedback-form__btn" style="margin-top:10px;">
            <button class="btn btn__primary">Sign in</button>
          </div>
        </form>
        <!-- <Loader v-else /> -->
      </div>
    </div>
  </div>
</template>
<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  name: "SigninComponent",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    handleClick(){
     const auth = getAuth()
     const email = this.user.email
     const password = this.user.password

     signInWithEmailAndPassword(auth, email, password)
       .then(cred => {
        console.log(cred.user)
       })
    }
  }
};
</script>
<style lang=""></style>
