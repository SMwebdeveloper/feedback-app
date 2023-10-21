<template>
  <section class="w-full py-14">
    <div class="container mx-auto">
      <form action="" class="flex flex-col items-center justify-center">
        <label class="flex flex-col text-white text-3xl">
          Title
          <inp
            type="text"
            class="w-[500px] rounded-md text-lg "
          />
        </label>
        <label class="flex flex-col">
          Description
          <input type="text" class="max-w-[600px] bg-slate-600" />
        </label>
        <label>
          Image
          <input
            type="file"
            accept="image/png, image/gif, image/jpg"
            @change="uploadImage"
          />
        </label>
        <div>
          <img src="" alt="" />
        </div>

        <button>Create feedback</button>
      </form>
    </div>
  </section>
</template>
<script setup lang="ts">
const uploadImage = () => {};
</script>
