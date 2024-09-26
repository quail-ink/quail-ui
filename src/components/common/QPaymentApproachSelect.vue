<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = defineProps({
  channels: {
    type: Array<any>,
    required: true,
    default: () => [],
  },
});

const _channels = ref(props.channels);

const emit = defineEmits(['select']);

function selectedCls(ch:any) {
  const cls = [ch.selected ? 'selected': ''];
  if (ch.disabled) {
    cls.push('disabled');
  }
  return cls.join(' ')
}

function selectPaymentApproach(item:any) {
  if (item.disabled) {
    return;
  }
  const idx = _channels.value.findIndex((ch) => ch.name === item.name);
  if (idx === -1) {
    return;
  }
  _channels.value.forEach((ch) => {
    ch.selected = false;
  });
  _channels.value[idx].selected = true;
  emit('select', { name: item.name } );
}
</script>

<template>
  <div class="q-payment-approach-select">
    <div v-for="ch in _channels" :key="`app-${ch.name}`" class="q-payment-approach-item-wrapper mb-1" :class="selectedCls(ch)"
      @click="selectPaymentApproach(ch)">
      <QPaymentApproachItem
        :name="ch.name" :icons="ch.icons" :symbol="ch.symbol" :desc="ch.desc" :disabled="ch.disabled"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.q-payment-approach-item-wrapper {
  border-radius: 6px;
  border: 1px solid transparent;
  padding: 0 0.8rem;
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

}
</style>