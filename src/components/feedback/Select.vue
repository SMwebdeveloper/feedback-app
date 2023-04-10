<template lang="">
  <div class="feedback-header__select">
    <span
      class="feedback-header__select--text"
      :class="`${areOptionsVisible && 'opacity'}`"
    >
      Sort by :
    </span>

    <button
      class="feedback-header__dropdown--btn"
      @click="areOptionsVisible = !areOptionsVisible"
    >
      <span
       :class="`${areOptionsVisible && 'opacity'}`">
        {{ selected }}
      </span>

        <img
          class="feedback-header__dropdown--icon"
          :class="`${areOptionsVisible && 'active'}`"
          src="@/assets/img/arrow-down.svg"
          alt="arrow down"
        />
    </button>

    <div
      class="feedback-header__select--list"
      v-if="areOptionsVisible">
      <button
        type="button"
        class="feedback-header__select--list__item"
        v-for="item in options"
        :key="item.value"
        @click="selectOptions(item)"
      >
        {{ item.name }}

          <img v-if="item.check"
            src="@/assets/img/check.svg"
            alt="check icon" />

      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data (){
    return {
      selected:'Most Upvotes',
      areOptionsVisible:false
    }
  },
  methods:{
    selectOptions(item){
      this.options.forEach(item => {
        return item.check = true ? false : true
      })
      this.$emit('selectOption', item)
      this.selected = item.name
      item.check = true
      this.areOptionsVisible = false
    }
  }
};
</script>
<style lang=""></style>
