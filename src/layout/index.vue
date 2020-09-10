<script>
import mixins from './mixins';
import DefaultLayout from './default.vue';

export default {
  mixins: [mixins],
  components: {
    DefaultLayout,
  },
  computed: {
    name() {
      return 'DefaultLayout';
    },
  },
};
</script>
<template>
  <component
    :is="name"
    @submit="$emit('submit')"
    v-bind="$props"
  ></component>
</template>
