<script>
import IMask from 'imask';

export default {
  props: {
    value: {
      type: Number,
    },
    type: {
      type: String,
      default: 'text',
    },
    min: {
      type: Number,
      default: -Infinity,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    scale: {
      type: Number,
      default: 2,
    },
    currency: {
      type: String,
      default: '',
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
  data: () => ({
    el: null,
    elFocus: false,
  }),
  computed: {
    elInput() {
      return this.$refs.input;
    },
    options() {
      return {
        mask: Number,
        min: this.min,
        max: this.max,
        scale: this.scale,
        thousandsSeparator: ' ',
      };
    },
  },
  watch: {
    value(v) {
      if (v) {
        this.el.typedValue = v;
      } else {
        this.el.value = '';
      }
    },
    min() {
      this.update();
    },
    max() {
      this.update();
    },
    scale() {
      this.update();
    },
  },
  methods: {
    update() {
      this.el.updateOptions(this.options);
    },
    blur() {
      this.$emit('blur');
      if (this.el.unmaskedValue === '') {
        this.el.value = '0';
      }
      if (this.elFocus) {
        const val = +this.el.unmaskedValue || 0;
        this.$emit('input', val);
        this.$emit('change', val);
      }
      this.elFocus = false;
    },
    focus() {
      this.elFocus = true;
      if (this.el.value === '0') {
        this.el.value = '';
      }
      this.$emit('focus');
    },
    submit() {
      this.elInput.blur();
      this.$emit('submit');
    },
  },
  mounted() {
    const refs = this.$refs;
    this.el = IMask(refs.input, this.options);
    this.el.on('accept', () => {
      if (!this.elFocus) {
        return;
      }
      const val = +this.el.unmaskedValue;
      this.$emit('input', val);
      this.update();
    });
    this.el.typedValue = this.value;
  },
};
</script>
<template>
  <div class="ui-price">
    <input
      ref="input"
      type="text"
      :disabled="disabled"
      @blur="blur"
      @focus="focus"
      @keypress.enter="submit"
    >
    <span v-if="currency">{{currency | currency}}</span>
  </div>
</template>
<style lang="scss">
  .ui-price {
    display: flex;
    border-bottom: 1px solid;

    input {
      flex: 1;
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

    span {
      display: block;
      margin: 0;
      line-height: 36px;
      overflow: hidden;
      flex-shrink: 0;
      font-size: 16px;
      padding: 0 16px;
      user-select: none;
    }
  }
</style>
