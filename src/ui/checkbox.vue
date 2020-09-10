<script>

export default {
  props: {
    value: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  computed: {},
};
</script>
<template>
  <div
    class="ui-checkbox"
    :class="{'is-active': value}"
    @click="$emit('input', !value)"
  >
    <div class="ui-checkbox__input">
      <div class="ui-checkbox__check">
        <span v-if="value">✓</span>
      </div>
    </div>
    <div class="ui-checkbox__label">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss">
  .ui-checkbox {
    display: flex;
    cursor: pointer;
    align-items: center;
    font-size: 14px;

    &__label {
      text-align: justify;
      flex: 1;
    }

    &__input {
      margin-right: 16px;
      padding: 4px;
      display: flex;
      align-items: center;
    }

    &__check {
      width: 20px;
      height: 20px;
      border-radius: 4px;
      border: 1px solid;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: .3s ease-out;
      user-select: none;
    }
  }
</style>
