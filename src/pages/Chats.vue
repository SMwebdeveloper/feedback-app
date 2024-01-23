<template>
    <section>
        <div class="project-container relative">
            <h2 class="text-white text-3xl font-bold absolute top-1/2 left-1/3 z-10 drop-shadow-lg">Soon</h2>
            <ul class="blur-sm">
                <li v-for="item in 7" :key="item" class="flex items-center border-b-2 border-whtie py-4">
                    <img src="@/assets/images/user-image.jpg" alt="user image" class="w-10 h-10 rounded-full mr-8">
                    <h2 class="text-white text-2xl font-bold">Samandar</h2>
                </li>
            </ul>
        </div>
    </section>
</template>