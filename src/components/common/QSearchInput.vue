<template>
  <div class="q-search-input">
    <QInput v-model="text" type="text" :placeholder="placeholder" :disabled="disabled"
      @keyup="keyup" @change="textChanged"></QInput>
    <div v-if="items && showItems" class="result">
      <QMenu :items="resultItems" ></QMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    default: "Type here",
  },
  defaultText: {
    default: "",
  },
  disabled: {
    default: false,
  },
  items: {
    type: Array<any>,
    default: () => [],
  },
});

const emit = defineEmits(["change", "blur", "focus", "keyup", "select", "update:modelValue"]);
const text = ref(props.defaultText);
const showItems = ref(false);

watch(() => props.modelValue, (val) => {
  text.value = val;
});

watch(() => text.value, (val) => {
  if (text.value === '') {
    showItems.value = false;
  }
});

watch(() => props.items, (val) => {
  showItems.value = val.length > 0 && text.value !== '';
});

const resultItems = computed(() => {
  return props.items.map((item) => {
    return {
      title: item.title,
      subtitle: item.subtitle,
      action: () => {
        emit("select", item);
        showItems.value = false;
      },
    };
  });
});

function keyup(e: KeyboardEvent) {
  updateValue();
  emit("keyup", e);
}

function textChanged() {
  updateValue();
  emit("change", text.value);
}

function updateValue() {
  emit("update:modelValue", text.value);
}

onMounted(() => {
});
</script>

<style scoped lang="scss">
.q-search-input {
  position: relative;
}
</style>