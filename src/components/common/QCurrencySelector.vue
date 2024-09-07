<template>
  <QDropdownMenu :items="currencyItems" :initial-item="selectedCurrenyItem" />
</template>
<script setup lang="ts">
import { ref, computed, onMounted, Ref, watch } from "vue";

const emit = defineEmits(["change"]);

const props = defineProps({
  currency: {
    type: String,
    default: "USD",
  },
});

const selectedCurrenyItem: Ref<any> = ref(null);

const currencyItems = computed(() => {
  let items = [
    {
      title: "US Dollar",
      value: "USD",
      action: selectItem,
    },
    {
      title: "人民币",
      value: "CNY",
      action: selectItem,
    },
    {
      title: "新台幣",
      value: "TWD",
      action: selectItem,
    },
    {
      title: "日本円",
      value: "JPY",
      action: selectItem,
    },
  ]
  items = items.map((item) => {
    return {
      ...item,
      title: item.title,
    };
  });

  return items;
});

function selectItem(item: any) {
  emit("change", {
    title: item.title,
    value: item.value,
  });
}

watch(() => props.currency, (lang) => {
  selectedCurrenyItem.value = currencyItems.value.find((item: any) => {
    return lang === item.value;
  });
});

onMounted(() => {
  selectedCurrenyItem.value =
    currencyItems.value.find((item: any) => {
      return props.currency === item.value;
    }) || currencyItems.value[0];
});
</script>
<style lang="scss">
</style>
