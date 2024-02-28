<template>
  <div>
    <suspense>
      <template #default class="h-full">
        <main>
          <router-view v-slot="{ Component }">
            <transition name="route" made="out-in" :duration="500">
              <Component :is="Component" />
            </transition>
          </router-view>
        </main>      </template>
      <template #fallback>
        <loader />
      </template>
    </suspense>

      <app-footer />
  </div>
</template>
<script setup lang="ts">
import AppFooter from "@/components/AppFooter.vue";
import { useAuthStore } from "@/store/auth";
import { onMounted } from "vue";

const store = useAuthStore();

onMounted(async () => {
  await store.getUsers();
});
</script>
<style scoped lang="css">
main {
  will-change: transform, opacity;
}
.route-enter-from {
  opacity: 0;
  transform: translateY(200px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateY(-200px);
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>