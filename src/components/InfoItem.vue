<script>
export default {
  props: {
    title: String,
  },
};
</script>
<template>
  <div class="info-item">
    <div class="info-item__title">{{ title }}</div>
    <div class="info-item__span">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss">
  .info-item {
    box-sizing: border-box;
    padding: 4px 0;
    font-size: 14px;

    &__title {
      font-weight: 700;
      text-transform: uppercase;
    }

    &__span {
      margin-left: 12px;
    }
  }
</style>
