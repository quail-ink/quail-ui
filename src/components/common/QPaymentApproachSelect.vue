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

function selectPaymentApproach(item:any) {
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
    <QPaymentApproachItem v-for="ch in _channels" :key="`app-${ch.name}`" class="mb-1"
      :name="ch.name" :icons="ch.icons" :selected="ch.selected" :symbol="ch.symbol" :desc="ch.desc" :disabled="ch.disabled"
      @select="selectPaymentApproach" />
  </div>
</template>

<style lang="scss" scoped>
</style>