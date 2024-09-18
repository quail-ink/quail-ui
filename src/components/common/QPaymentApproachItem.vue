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
  selected: {
    type: Boolean,
    default: false,
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

const emit = defineEmits(['select']);

const selectedVal = ref(props.selected);

watch(() => props.selected, (val) => {
  selectedVal.value = val;
})

const selectedCls = computed(() => {
  const cls = [props.selected ? 'selected': ''];
  if (props.disabled) {
    cls.push('disabled');
  }
  return cls.join(' ')
})

function selectPaymentApproach() {
  if (props.disabled) {
    return;
  }
  emit('select', { name: props.name, symbol: props.symbol } );
}

</script>

<template>
  <div class="q-payment-apparoch-item" @click="selectPaymentApproach" :class="selectedCls">
    <div class="approach-inner">
      <div class="approach-icons">
        <div v-for="icon in icons" :key="`icon-${icon}`" class="icon" :class="`icon-${icon}`"></div>
      </div>
      <div class="approach-desc" v-text="props.desc"></div>
    </div>
    <div class="spacer"></div>
    <div class="quote-currency text-sm font-bold" v-text="symbol"></div>
  </div>
</template>

<style lang="scss" scoped>
.q-payment-apparoch-item {
  padding: 0.8rem 0.5rem 0.6rem 0.5rem;
  border-radius: 6px;
  cursor: default;
  opacity: 0.8;
  display: flex;
  border: 1px solid transparent;
  &.selected {
    filter: none;
    opacity: 1;
    border-color: var(--vt-c-blue);
    background-color: var(--vt-c-blue-dimm-1);
  }
  &.disabled {
    filter: grayscale(1);
    cursor: not-allowed;
    .approach-icons {
      opacity: 0.5;
    }
  }
  &:hover {
    background-color: var(--vt-c-blue-dimm-1);
    &.selected {
      background-color: var(--vt-c-blue-dimm-1);
    }
  }
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
    color: var(--vt-c-text-light-3);
  }
}
</style>