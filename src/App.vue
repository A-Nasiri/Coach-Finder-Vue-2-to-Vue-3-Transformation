<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import { watch, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import TheHeader from './components/layout/TheHeader';

export default {
  name: 'App',
  components: {
    TheHeader
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    store.dispatch('tryLogin');

    const didAutoLogout = computed(() => store.getters.didAutoLogout);


    watch(didAutoLogout, (newVal, oldVal) => {
      if (newVal && newVal !== oldVal) {
        router.replace('/coaches');
      }
    });
  },
  // created() {
  //   store.dispatch('tryLogin');
  // },
  // watch: {
  //   didAutoLogout(curValue, oldValue) {
  //     if (curValue && curValue !== oldValue) {
  //       this.$router.replace('/coaches');
  //     }
  //   }
  // },
  // computed: {
  //   didAutoLogout() {
  //     return this.$store.getters.didAutoLogout;
  //   }
  // }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.route-leave-to {
  opacity: 1;
  transform: translateX(30px);
}

.route-enter-active {
transition: all 0.4s ease-out;
}

.route-leave-active {
  transition: all 0.4s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
