<template lang="">
  <div class="control">
    <slot name="label"></slot>
    <select name="" id="" class="control__item control__select" v-model="value">
      <option v-for="item in options"  :key="item.name" :value="item.name"  >{{item.name}}</option>
    </select>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    prop: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selected: "",
      areOptionsVisible: false,
    };
  },

  methods: {
    selecOption(item) {
      this.options.forEach((select) => {
        return (select.type = true ? false : true);
      });
      item.type = true;
      this.selected = item.name;
      this.areOptionsVisible = false;
      this.$emit("input", this.selected);
    },
  },
  mounted () {
    console.log(this.prop)
  }
};
</script>
<style lang=""></style>
