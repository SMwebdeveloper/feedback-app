<template lang="">
  <div class="feedbackHeader__select">

    <p class="feedbackHeader__select--text" :class="`${areOptionsVisible && 'opacity'}`">Sort by :</p>
    <button
      class="feedbackHeader__dropdown--btn"
      @click="areOptionsVisible = !areOptionsVisible"
    >
      <p :class="`${areOptionsVisible && 'opacity'}`">{{ selected }}</p>
      <span v-if="!areOptionsVisible" class="feedbackHeader__dropdown--icon">
        <img src="@/assets/img/arrow-down.svg" alt="arrow down">
      </span>
      <span v-if="areOptionsVisible" class="feedbackHeader__dropdown--icon">
        <img src="@/assets/img/arrow-up.svg" alt="arrow up">
      </span>
    </button>

    <div class="feedbackHeader__select--list" v-if="areOptionsVisible">
      <button
        type="button"
        class="feedbackHeader__select--list__item"
        v-for="item in selectOn"
        :key="item.value"
        @click="$emit('selectOption', item)"
      >
        {{ item.name }}
        <span v-if="item.check">
         <img src="@/assets/img/check.svg" alt="check icon">
        </span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
    props:{
        selectOn:{
            type:Array,
            required:true
        },
        areOptionsVisible:{
            type:Boolean,
            default:false
        },
        selected:{
            type:String,
            required:true
        }
    },

};
</script>
<style lang=""></style>
