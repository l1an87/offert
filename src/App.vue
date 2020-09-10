<script>
import axios from 'axios';
import Layout from './layout/index.vue';
import {
  getSearchData,
  stringToObject,
  validateEmail,
} from './utils/data';


export default {
  components: {
    Layout,
  },
  data: () => ({
    el: document.createElement('form'),
    error: '',
    loading: '',
    logo: null,
    props: {
      agency: 0,
      agreement: '',
      system: '',
      type: 0,
      redirect: '',
    },
    offer: {
      body: '',
      text: '',
      url: '',
    },
    agreement: {
      id: 0,
      code: '',
      country: {
        value: null,
        label: '',
      },
      currency: {
        value: '',
        label: '',
      },
      dates: {
        begin: '',
        end: '',
      },
      services: [],
      clients: [],
      legal: {
        value: null,
        label: '',
      },
      certificate: {
        id: 0,
        balance: 0,
      },
      report: {
        value: 0,
        label: '',
      },
      hotel: '',
      debt: 0,
      email: '',
      availableForPayment: true,
      useOnlineCash: false,
    },
    form: {
      email: '',
      count: 0,
      accept: false,
      loading: false,
    },
  }),
  methods: {
    getData() {
      try {
        const all = getSearchData();
        const data = stringToObject(atob(all.data || all.url));
        if (!data) {
          return Promise.reject('Ошибка: некорректная ссылка');
        }
        this.setData(data);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject('Ошибка: некорректная ссылка');
      }
    },
    setData(data = {}) {
      this.props.agency = +data.ag || 0;
      this.props.agreement = data.ac;
      this.props.system = data.psys;
      this.props.type = +data.oft;
      this.props.file = +data.of;
      this.props.legal = +data.leid;
      this.props.certificate = +data.ct;
      this.agreement.code = data.ac;
      this.setInput('agencyId', data.ag);
      this.setInput('agreementCode', data.ac);
      this.setInput('legalEntity', data.leid);
      this.setInput('paySystem', data.psys);
      this.setInput('ofertaType', data.oft);
      this.setInput('tourists', data.to);
      this.setInput('currencyCode', data.cur);
      this.setInput('agreementId', data.agid);
      this.setInput('course', data.co);
      this.setInput('gender', data.ge);
      this.setInput('touristDob', data.todob);
      this.setInput('fullPrice', data.ps);
      if (data.ct) {
        this.setInput('certificateId', data.ct);
      }
    },
    getAgreement() {
      let url = `/tourclient/PaymentIntegration/PublicOfferFileText?agencyId=${this.props.agency}`;
      if (this.props.agreement) {
        url += `&agreementCode=${this.props.agreement}`;
      }
      if (this.props.system) {
        url += `&paySystem=${this.props.system}`;
      }
      if (this.props.type) {
        url += `&ofertaType=${this.props.type}`;
      }
      if (this.props.file) {
        url += `&ofertaFileId=${this.props.file}`;
      }
      if (this.props.legal) {
        url += `&legalEntity=${this.props.legal}`;
      }
      if (this.props.certificate) {
        url += `&giftCertificateId=${this.props.certificate}`;
      }

      return axios.get(url)
        .then(({ data }) => {
          this.setAgreement(data);
          if (!this.agreement.availableForPayment) {
            return Promise.reject('Извините, оплата путевки в данный момент недоступна');
          }
          return Promise.resolve();
        })
        .catch(() => Promise.reject('Извините, оплата путевки в данный момент недоступна'));
    },
    setAgreement(data = {}) {
      this.offer.body = data.ofertaText;
      this.agreement.id = data.agreementId || 0;
      this.agreement.country.label = data.CountryName || '';
      this.agreement.currency.value = data.CurrencyCode || '';
      this.agreement.currency.label = data.CurrencyName || '';
      this.agreement.dates.begin = data.DateBegin.Serialized || '';
      this.agreement.dates.end = data.DateEnd.Serialized || '';
      this.agreement.clients = data.MainClient.split(', ') || [];
      this.agreement.services = data.ServicesInfo.split(', ') || [];
      this.agreement.legal.label = data.OwnerLegalName || '';
      this.agreement.certificate.id = data.certificatePaymentId || 0;
      this.agreement.certificate.balance = data.certificateBalance || 0;
      this.agreement.report.value = data.reportId || 0;
      this.agreement.hotel = data.Hotel || '';
      this.agreement.debt = data.clientDebt || 0;
      this.agreement.email = data.clientEmail || '';
      this.agreement.availableForPayment = data.availableForPayment || false;
      this.agreement.useOnlineCash = data.useOnlineCash || false;
      this.form.email = data.clientEmail || '';
      this.form.count = data.clientDebt || 0;
      if (data.certificatePaymentId) {
        this.setInput('certificatePaymentId', data.certificatePaymentId);
      }
      this.setInput('fullPrice', data.ps);
    },
    setOfferUrl() {
      this.offer.url = `/tourclient/PaymentIntegration/GetPublicOfferPdf?agencyId=${this.props.agency
      }&WebReportId=${this.agreement.report.value
      }&parameters[reportID]=100007&parameters[AG_Code]=${this.props.agreement
      }&parameters[AG_ID]=${this.agreement.id}`;
    },
    getLogo() {
      const url = `/tourclient/PaymentIntegration/GetLogoForPublicAgreement?agencyId=${this.props.agency}`;
      return axios
        .get(url)
        .then(({ data }) => this.setLogo(data))
        .catch(() => Promise.reject('Извините, оплата путевки в данный момент недоступна'));
    },
    setLogo(data = {}) {
      this.logo = data.fileData;
      this.offer.text = data.publicOfferText || 'Настоящая публичная оферта на оказание услуг (далее – Договор) заключается в особом порядке: путем акцепта настоящего договора, содержащего все существенные условия Договора, без подписания сторонами. Настоящий договор имеет юридическую силу в соответствии со ст. 434 Гражданского кодекса РФ и является равносильным договору, подписанному сторонами.';
    },
    init() {
      this.loading = 'Пожалуйста, подождите. Осуществляется формирование договора.';
      this.el = document.createElement('form');
      this.el.action = '/tourclient/PaymentIntegration/PaylerRedirectUrl';
      this.el.method = 'POST';
      return this
        .getData()
        .then(() => Promise.all([
          this.getLogo(),
          this.getAgreement(),
        ]))
        .then(() => {
          this.setOfferUrl();
          return Promise.resolve();
        })
        .catch((error) => {
          this.error = error;
        })
        .finally(() => {
          this.loading = '';
        });
    },
    handlerSubmit() {
      this.validate()
        .then(() => {
          this.loading = ' ';
          return this.submit();
        })
        .catch((error) => {
          this.loading = '';
          // eslint-disable-next-line
          window.alert(error);
        });
    },
    validate() {
      if (!this.agreement.availableForPayment) {
        return Promise.reject('Оплата запрещена');
      }
      if (this.agreement.useOnlineCash) {
        if (!validateEmail(this.form.email)) {
          return Promise.reject('Укажите Ваш Email. на него будет отправлен чек после оплаты.');
        }
      }
      if (this.agreement.certificate.id) {
        if (this.agreement.certificate.balance < this.form.count) {
          return Promise.reject('Введенная сумма не может превышать доступный остаток дотации.');
        }
      }
      return Promise.resolve();
    },
    submit() {
      if (this.agreement.useOnlineCash) {
        this.setInput('email', this.form.email);
      }
      this.setInput('clientPay', this.form.count);
      document.body.append(this.el);
      this.el.submit();
    },
    setInput(name, value) {
      let input = this.el.querySelector(`input[name=${name}]`);
      if (!input) {
        input = document.createElement('input');
        input.name = name;
        this.el.appendChild(input);
      }
      input.value = value || '';
    },
  },
  mounted() {
    const loader = document.querySelector('#layout-preloading');
    if (loader) {
      document.body.removeChild(loader);
    }
    this.init();
  },
};
</script>
<template>
  <div class="app">
    <Layout
      :offer="offer"
      :agreement="agreement"
      :props="props"
      :form="form"
      :loading="loading"
      :error="error"
      @submit="handlerSubmit"
    />
  </div>
</template>
<style lang="scss">
  body {
    margin: 0;
  }
</style>
