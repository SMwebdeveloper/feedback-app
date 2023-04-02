<template lang="">
  <div class="intro">
    <div class="intro__content">
      <img src="../assets/img/intro-log.svg" alt="Intro logo img" />
      <div class="intro__select">
        <p>Sort by:</p>
        <select name="filter" id="filter">
          <option selected disabled>Most Upvotes</option>
          <option value="leastUpvotes">Least Upvotes</option>
          <option value="mostComments">Most Comments</option>
          <option value="leastComments">Least Comments</option>
        </select>
      </div>
    </div>

    <a href="#" class="btn btn__primary">+Add Feedback</a>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.intro {
  background: black;
  height: 4rem;
  width: 100%;
}
</style>
