<script>
import InfoItem from '@/components/InfoItem.vue';

export default {
  props: {
    agreement: Object,
  },
  components: { InfoItem },
};
</script>
<template>
  <div class="info" v-if="agreement">
    <InfoItem title="Путевка">
      {{ agreement.code }}
    </InfoItem>
    <InfoItem
      title="Страна"
      v-if="agreement.country.label"
    >
      {{ agreement.country.label }}
    </InfoItem>
    <InfoItem
      title="Даты тура"
      v-if="agreement.dates.begin"
    >
      {{ agreement.dates.begin }}
      -
      {{ agreement.dates.end }}
    </InfoItem>
    <InfoItem
      title="Размещение"
      v-if="agreement.hotel"
    >
      {{ agreement.hotel }}
    </InfoItem>
    <InfoItem
      title="Услуги"
      v-if="agreement.services && agreement.services.length"
    >
      <div
        v-for="(service, idx) in agreement.services"
        :key="`service-${service}_${idx}`"
      >
        {{ service }}
      </div>
    </InfoItem>
    <InfoItem
      title="Туристы"
      v-if="agreement.clients && agreement.clients.length"
    >
      <div
        v-for="(client, idx) in agreement.clients"
        :key="`client-${client}_${idx}`"
      >
        {{ client }}
      </div>
    </InfoItem>
    <InfoItem
      title="Юр.лицо для зачисления"
      v-if="agreement.legal.label"
    >
      {{ agreement.legal.label }}
    </InfoItem>
    <InfoItem
      title="Оплата дотацией"
      v-if="agreement.certificate.id"
    >
      <div>Номер: {{ agreement.certificate.id }}</div>
      <div>Баланс: {{ agreement.certificate.balance }} {{ 'RUB' | currency }}</div>
    </InfoItem>
    <InfoItem
      title="К оплате"
      v-if="agreement.debt"
    >
      {{ agreement.debt | price }} {{ agreement.currency.value | currency }}
    </InfoItem>
  </div>
</template>
<style lang="scss">
  .info {
    overflow: auto;
    padding: 16px;

    .info-item {
      margin-bottom: 4px;
    }
  }
</style>
