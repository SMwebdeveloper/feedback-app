<template>
  <div class="container">
    <h1>This is an about page</h1>
    <!-- <button class="btn btn__danger">Buton</button> <br>
    <span class="descr__small">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam perspiciatis laudantium ratione porro debitis maiores hic laborum voluptas culpa perferendis ducimus beatae deserunt dolorem veritatis officia nihil sed, impedit libero.</span>
    <p class="descr">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem, eos atque velit inventore, rem harum doloribus magni, delectus adipisci a aspernatur. Quaerat porro quia doloremque reiciendis nihil quisquam recusandae exercitationem.</p>
    <h4 class="title">Vue js</h4> -->
    <router-link to="/about " class="link">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0h24v24H0z"/>
        <path
          d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"
        />
      </svg>
      Link 1</router-link
    >
    <router-link to="/about" class="link link__dark">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"
        />
      </svg>
      Link 2</router-link>
  </div>
</template>
