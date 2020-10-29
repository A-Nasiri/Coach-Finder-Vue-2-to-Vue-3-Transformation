<template>
<div>
  <section>
    <base-card>
      <h2>
        {{ fullName }}
      </h2>
      <h3>
        ${{ rate }}/hour
      </h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
      <h2>Interested? Reach out now!</h2>
      <base-button link :to="contactLink">Contact</base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
      <p> {{ description }} </p>
    </base-card>
  </section>
</div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  props: ['id'],
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const selectedCoach = ref(null);

    (function getSelectedCoach() {
      selectedCoach.value = store.getters['coaches/coaches']
    .find((coach) => coach.id === props.id)
    })();

    const fullName = computed(() => selectedCoach.value.firstName + ' ' + selectedCoach.value.lastName);
    const areas = computed(() => selectedCoach.value.areas);
    const contactLink = computed(() => route.path + '/contact');
    const rate = computed(() => selectedCoach.value.hourlyRate);
    const description = computed(() => selectedCoach.value.description);

    return {
      fullName,
      areas,
      contactLink,
      rate,
      description
    }
  },
  // data() {
  //   return {
  //     selectedCoach: null
  //   }
  // },
  // computed: {
  //   fullName() {
  //     return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
  //   },
  //   areas() {
  //     return this.selectedCoach.areas;
  //   },
  //   contactLink() {
  //     return this.$route.path + '/contact';
  //   },
  //   rate() {
  //     return this.selectedCoach.hourlyRate;
  //   },
  //   description() {
  //     return this.selectedCoach.description;
  //   }
  // },
  // created() {
  //   this.selectedCoach = this.$store.getters['coaches/coaches']
  //   .find((coach) => coach.id === this.id)
  // }
}
</script>

<style>

</style>