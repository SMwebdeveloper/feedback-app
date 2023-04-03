<template lang="">
  <div class="intro">
    <div class="intro__content">
      <img src="../assets/img/intro-log.svg" alt="Intro logo img" />
      <div class="intro__select">
        <p class="intro__select--text">Sort by :</p>
        <button
          class="intro__dropdown--btn"
          @click="areOptionsVisible = !areOptionsVisible"
        >
          {{ selected }}
          <span v-if="!areOptionsVisible" class="intro__dropdown--icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path
                d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"
                fill="rgba(255,255,255,1)"
              ></path>
            </svg>
          </span>
          <span v-if="areOptionsVisible" class="intro__dropdown--icon"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path
                d="M12 11.8284L9.17154 14.6569L7.75732 13.2426L12 9L16.2426 13.2426L14.8284 14.6569L12 11.8284Z"
                fill="rgba(255,255,255,1)"
              ></path>
            </svg>
          </span>
        </button>

        <div class="intro__select--list" v-if="areOptionsVisible">
          <button
            type="button"
            class="intro__select--list__item"
            v-for="item in selectOn"
            :key="item.value"
            @click="selectOption(item)"
          >
            {{ item.name }}
            <span v-if="item.check">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="17"
              >
                <path
                  d="M10.0007 15.1709L19.1931 5.97852L20.6073 7.39273L10.0007 17.9993L3.63672 11.6354L5.05093 10.2212L10.0007 15.1709Z"
                  fill="rgba(173,31,234,1)"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>

    <a href="#" class="btn btn__primary">+Add Feedback</a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectOn: [
        { name: "Most Upvotes", value: "mostUpvotes", check: true },
        { name: "Least Upvotes", value: "leastUpvotes", check: false },
        { name: "Most Comments", value: "mostComments", check: false },
        { name: "Least Comments", value: "leastComments", check: false },
      ],
      areOptionsVisible: false,
      selected: "Most Upvotes",
    };
  },
  methods: {
    selectOption(item) {
      this.selectOn.forEach((select) => {
        return (select.check = true ? false : true);
      });
      this.selected = item.name;
      item.check = true;
      this.areOptionsVisible = false;
    },
    hideSelect() {
      this.areOptionsVisible = false;
    },
  },
//   mounted() {
//     document.addEventListener("click", this.hideSelect.bind(this), true);
//   },
//   beforeDestroy() {
//     document.removeEventListener("click", this.hideSelect);
//   },
};
</script>
