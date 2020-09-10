<script>
export default {
  props: {
    agreement: Object,
    form: Object,
  },
  methods: {
    submit() {
      this.$emit('submit');
    },
  },
};
</script>
<template>
  <div class="form-price" v-if="form">
    <UiCheckbox
      v-model="form.accept"
      class="form-price--mb"
    >
      Согласен с условиями оферты и принимаю их
    </UiCheckbox>
    <div
      class="form-price__label"
      v-if="agreement.useOnlineCash"
    >
      Email для чека
    </div>
    <UiInput
      v-if="agreement.useOnlineCash"
      v-model="form.email"
      placeholder="Email"
      class="form-price--mb"
      @submit="submit"
    />
    <div class="form-price__label">Сумма платежа</div>
    <UiPrice
      v-model="form.count"
      currency="RUR"
      class="form-price--mb"
      @submit="submit"
    />
    <UiBtn
      :disabled="!form.accept"
      @click="submit"
    >
      Оплатить
    </UiBtn>
  </div>
</template>
<style lang="scss">
  .form-price {
    padding: 16px;
    &__label{
      font-weight: 700;
      text-transform: uppercase;
      font-size: 14px;
    }

    &--mb {
      margin-bottom: 16px;
    }

    .ui-btn {
      width: 100%;
    }
  }
</style>
