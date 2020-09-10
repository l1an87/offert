<script>
export default {};
</script>
<template>
  <div class="ui-loading">
    <svg viewBox="25 25 50 50" class="ui-loading__spinner">
      <circle cx="50" cy="50" r="20" fill="none" class="ui-loading__path"></circle>
    </svg>
    <div class="ui-loading__slot">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss">
  .ui-loading {
    background-color: rgba(255, 255, 255, 0.9);
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    margin: 0;
    transition: opacity 0.3s;

    &__bg {
      width: 100%;
      height: 100%;
    }

    &__spinner {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 42px;
      text-align: center;
      position: absolute;
      animation: ui-loading--rotate 2s linear infinite;
    }

    &__slot {
      top: calc(50% + 35px);
      left: 50%;
      transform: translate(-50%, 0);
      text-align: center;
      position: absolute;
    }

    &__path {
      animation: ui-loading--dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
      stroke-width: 2;
      stroke: #334150;
      stroke-linecap: round;
    }
  }

  @keyframes ui-loading--rotate {
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  @keyframes ui-loading--dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40px;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120px;
    }
  }
</style>
