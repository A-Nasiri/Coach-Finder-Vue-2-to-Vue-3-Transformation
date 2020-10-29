<template>
<div>
<base-dialog :show="!!error" title="An error occurred!" @close="handleError">
<p> {{ error }} </p>
</base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Request Received</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasRequests && !isLoading">
        <request-item v-for="req in receivedRequests"
        :key="req.id" 
        :email="req.userEmail"
        :message="req.message"/>
      </ul>
      <h3 v-else>You haven't received any requests yet!</h3>
    </base-card>
  </section>
</div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import RequestItem from '../../components/requests/RequestItem';

export default {
  components: {
    RequestItem
  },
  setup() {
    const store = useStore();

    const isLoading = ref(false);
    const error = ref(null);

    loadRequests();

    const receivedRequests = computed(() => {
      return store.getters['requests/requests'];
    });

    const hasRequests = computed(() => {
      return store.getters['requests/hasRequests'];
    });

    async function loadRequests() {
      isLoading.value = true;
      try {
        await store.dispatch('requests/fetchRequests');
      } catch (err) {
        error.value = err.message || 'Something failed!'
      }
      isLoading.value = false;
    }

    function handleError() {
      error.value = null;
    }

    return {
      isLoading,
      error,
      receivedRequests,
      hasRequests,
      loadRequests,
      handleError
    }
  },
  // data() {
  //   return {
  //     isLoading: false,
  //     error: null
  //   }
  // },
  // computed: {
  //   receivedRequests() {
  //     return this.$store.getters['requests/requests'];
  //   },
  //   hasRequests() {
  //     return this.$store.getters['requests/hasRequests'];
  //   }
  // },
  // created() {
  //   this.loadRequests();
  // },
  // methods: {
  //   async loadRequests() {
  //     this.isLoading = true;
  //     try {
  //       await this.$store.dispatch('requests/fetchRequests');
  //     } catch (error) {
  //       this.error = error.message || 'Something failed!'
  //     }
  //     this.isLoading = false;
  //   },
  //   handleError() {
  //     this.error = null;
  //   }
  // }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>