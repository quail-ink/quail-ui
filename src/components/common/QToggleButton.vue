<template>
  <QButton :class="cls" :disabled="disabled" :loading="loading" @click="toggle">
    <slot></slot>
  </QButton>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: 'outlined',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const _modelValue = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
  _modelValue.value = val;
});

const cls = computed(() => {
  const ret = ['q-button touchable outlined'];
  ret.push(props.class);
  if (props.loading) {
    ret.push('loading');
  }
  if (_modelValue.value) {
    ret.push('toggle-on');
  } else {
    ret.push('toggle-off');
  }
  return ret.join(' ');
});

function toggle() {
  _modelValue.value = !_modelValue.value;
  emit('update:modelValue', _modelValue.value);
}
</script>
