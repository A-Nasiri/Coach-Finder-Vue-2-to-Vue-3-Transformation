<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
        <input type="checkbox" name="" id="frontend" checked @change="setFilter">
        <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
        <input type="checkbox" name="" id="backend" checked @change="setFilter">
        <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
        <input type="checkbox" name="" id="career" checked @change="setFilter">
        <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script>
import { reactive } from 'vue';

export default {
    emits: ['change-filter'],
    setup(props, context) {
      let filters = reactive({
        frontend: true,
        backend: true,
        career: true
      });

      function setFilter(event) {
        const inputId = event.target.id;
        const isActive = event.target.checked;
        const updatedFilters = {
            ...filters,
            [inputId]: isActive
        };
        filters = updatedFilters;
        context.emit('change-filter', updatedFilters);
      }

      return {
        filters,
        setFilter
      }
    },
    // data() {
    //     return {
    //         filters: {
    //             frontend: true,
    //             backend: true,
    //             career: true
    //         }
    //     }
    // },
    // methods: {
    //     setFilter(event) {
    //         const inputId = event.target.id;
    //         const isActive = event.target.checked;
    //         const updatedFilters = {
    //             ...this.filters,
    //             [inputId]: isActive
    //         };
    //         this.filters = updatedFilters;
    //         this.$emit('change-filter', updatedFilters)
    //     }
    // }
}
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>