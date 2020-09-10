<script>
export default {
  props: {
    value: {
      type: Number,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<template>
  <div class="ui-input">
    <input
      ref="input"
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :disabled="disabled"
      :placeholder="placeholder"
      @blur="blur"
      @focus="focus"
      @keypress.enter="$emit('submit')"
    >
  </div>
</template>
<style lang="scss">
  .ui-input {
    display: flex;
    border-bottom: 1px solid;

    input {
      border: none;
      font-size: 16px;
      width: 100%;
      outline: none;
      background: none;
      position: relative;
      height: 36px;
      display: block;
      padding: 0 16px;

      &::placeholder {
        font-weight: 300;
      }
    }
  }
</style>
