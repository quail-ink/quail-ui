<script lang="ts" setup>
import dayjs from 'dayjs';
import { computed, onMounted, ref, watch } from 'vue';
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:modelValue', 'change']);

const date = ref('');
const time = ref('');

watch(() => props.modelValue, (value) => {
	const d = dayjs(value);
  console.log('d', d.format('YYYY-MM-DDTHH:mm:ssZ'));
  date.value = d.format('YYYY-MM-DD');
  time.value = d.format('HH:mm');
});

function changed() {
  const t = dayjs(`${date.value} ${time.value}`).format('YYYY-MM-DDTHH:mm:ssZ')
  emit('change', t);
  emit('update:modelValue', t);
}

onMounted(() => {
  const d = dayjs();
  console.log('d', d.format('YYYY-MM-DDTHH:mm:ssZ'));
  date.value = d.format('YYYY-MM-DD');
  time.value = d.format('HH:mm');
})

</script>

<template>
  <div class="wrapper">
    <input v-model="date" type="date" :disabled="!enabled" @change="changed"/>
    <input v-model="time" type="time" :disabled="!enabled" @change="changed"/>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  border: 1px solid #ccc;
  border-radius: 2px;
}
input[type="date"], input[type="time"] {
  width: 50%;
  height: 2.5rem;
  padding: 0.5rem;
  border: none;
  outline: none;
  &:focus {
    color: black;
    border: none !important;
    outline: none !important;
  }
}
</style>
