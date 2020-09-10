<script>
export default {
  props: {
    offer: Object,
  },
};
</script>
<template>
  <div class="document">
    <div
      class="document__wrap"
      v-if="offer"
    >
      <div v-html="offer.body"></div>
    </div>
  </div>
</template>
<style lang="scss">
  .document {
    overflow: auto;
    padding: 24px;

    &__wrap {
      width: 200mm;
      margin: 0 auto;
    }
  }
</style>
