<script>
export default {
  props: {
    error: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<template>
  <div class="blocked" :class="{'blocked--error': error}">
    <slot></slot>
  </div>
</template>
<style lang="scss">
  .blocked {
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.9);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99;
    margin: 0;
    padding: 24px;
    transition: opacity 0.3s;
    box-sizing: border-box;

    &--error {
      color: #992211;
    }
  }
</style>
