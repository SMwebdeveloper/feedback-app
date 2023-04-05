<template lang="">
    <div class="notFound">
        <div class="notFound__img">
            <img src="@/assets/img/errors-img.svg" alt="errors image">
        </div>
        <div class="notFound__content">
            <h3 class="subtitle">There is no feedback yet.</h3>
            <p class="descr">Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
        </div>
        <router-link to="/addFeedback" class="btn btn__primary">+ Add Feedback</router-link>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="">
    
</style>