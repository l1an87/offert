<script>
import mixins from './mixins';
import stylerUi from '../ui/styler';
import Info from '@/components/Info.vue';
import Document from '@/components/Document.vue';
import DocumentOffer from '@/components/DocumentOffer.vue';
import Blocked from '@/components/Blocked.vue';
import FormPrice from '@/components/FormPrice.vue';

export default {
  mixins: [mixins],
  components: {
    FormPrice,
    DocumentOffer,
    Document,
    Info,
    Blocked,
  },
  data: () => ({
    val: false,
  }),
  created() {
    stylerUi();
  },
};
</script>
<template>
  <div class="page">
    <div class="wrap">
      <UiLoading
        v-if="!!loading"
      >
        {{loading}}
      </UiLoading>
      <Blocked
        v-if="!!error"
        error
      >
        {{ error }}
      </Blocked>
      <div class="body">
        <div class="title"> Договор оферты</div>
        <Document
          :offer="offer"
          class="page__flex"
        />
        <DocumentOffer
          :offer="offer"
          class="page__bt"
        />
      </div>
      <div class="right">
        <div class="title">Информация по путевке</div>
        <Info
          class="page__flex"
          :agreement="agreement"
        />
        <div class="right__price">
          <FormPrice
            @submit="$emit('submit')"
            :agreement="agreement"
            :form="form"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .page {
    background: #f5f5f5;
    box-sizing: border-box;
    height: 100vh;
    padding: 8px;
    font-family: Roboto, sans-serif;

    &__flex {
      flex: 1;
    }

    &__bt {
      border-top: 1px solid rgba(0, 0, 0, 0.12);
    }

    &__bb {
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }

    .wrap {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      height: 100%;
    }

    .body {
      flex: 1;
      background: #ffffff;
      color: #333333;
      display: flex;
      flex-direction: column;
      margin: 8px;
      box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    }

    .title {
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      padding: 16px 24px;
      font-size: 18px;
      font-weight: 700;
      text-transform: uppercase;
      text-align: center;
    }

    .right {
      box-sizing: border-box;
      width: 320px;
      background: #ffffff;
      color: #333333;
      border-left: 1px solid rgba(0, 0, 0, 0.12);
      display: flex;
      flex-direction: column;
      margin: 8px;
      box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);

      &__price {
        border-top: 1px solid rgba(0, 0, 0, 0.12);
      }

      * {
        font-family: Roboto, sans-serif;
      }


    }
  }

  .show--1200 {
    display: none;
  }

  @media (max-width: 1200px) {
    .show--1200 {
      display: block;
    }
    .page {
      height: auto;

      .wrap {
        display: block;
        padding: 0 16px;
      }

      .body {
        display: block;
        margin: 16px 0;

        .document {
          max-height: 60vh;
        }

        .document-offer {
          display: block;

          &__btn {
            margin: 12px 0;

            .ui-btn {
              width: 100%;
            }
          }
        }
      }

      .right {
        width: 100%;
        margin: 16px 0;
      }
    }
  }
</style>
