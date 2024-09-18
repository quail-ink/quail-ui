<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    default: '',
  },
  icons: {
    type: Array,
    default: () => [],
  },
  symbol: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="q-payment-apparoch-item" >
    <div class="approach-inner">
      <div class="approach-icons">
        <div v-for="icon in icons" :key="`icon-${icon}`" class="icon" :class="`icon-${icon}`"></div>
      </div>
      <div class="approach-desc" v-text="props.desc"></div>
    </div>
    <div class="spacer"></div>
    <slot></slot>
    <div class="quote-currency text-sm font-bold" v-text="symbol"></div>
  </div>
</template>

<style lang="scss" scoped>
.q-payment-apparoch-item {
  padding: 0.8rem 0;
  border-radius: 6px;
  cursor: default;
  opacity: 0.8;
  display: flex;
  .approach-desc, .approach-hint {
    font-size: 0.7rem;
    color: var(--vt-c-text-light-2);
  }
  .approach-hint {
    color: var(--vt-c-text-light-3);
  }
  .approach-icons {
    .icon {
      height: 20px;
      display: inline-block;
      width: 30px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      margin-right: 0.2rem;
    }
    .icon-visa {
      background-image: url('@/assets/images/payment-icons/payment-card-visa.svg');
    }
    .icon-mastercard {
      background-image: url('@/assets/images/payment-icons/payment-card-mastercard.svg');
    }
    .icon-jcb {
      background-image: url('@/assets/images/payment-icons/payment-card-jcb.svg');
    }
    .icon-amex {
      background-image: url('@/assets/images/payment-icons/payment-card-amex.svg');
    }
    .icon-unionpay {
      background-image: url('@/assets/images/payment-icons/payment-card-unionpay.svg');
    }
    .icon-wechat {
      background-image: url('@/assets/images/payment-icons/payment-wechat.svg');
    }
    .icon-alipay {
      background-image: url('@/assets/images/payment-icons/payment-alipay.svg');
    }
    .icon-paypal {
      background-image: url('@/assets/images/payment-icons/payment-paypal.svg');
    }
    .icon-evm {
      width: 200px;
      background-position: left;
      background-image: url('@/assets/images/payment-icons/payment-evm.svg');
    }
  }
  .quote-currency {
    color: var(--vt-c-text-light-2);
  }
}
</style>