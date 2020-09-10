<script>
export default {
  props: {
    offer: Object,
  },
  computed: {
    url() {
      return '#';
    },
  },
};
</script>
<template>
  <div class="document-offer">
    <div class="document-offer__text">
      {{ offer.text }}
    </div>
    <div class="document-offer__btn">
      <a
        v-if="offer.url"
        :href="offer.url"
        target="_blank"
      >
        <UiBtn>Скачать</UiBtn>
      </a>
    </div>
  </div>
</template>
<style lang="scss">
  .document-offer {
    padding: 16px 24px;
    display: flex;
    align-items: center;
    font-size: 14px;

    &__text {
      flex: 1;
      text-align: justify;
    }

    &__btn {
      margin-left: 24px;
    }
  }
</style>
