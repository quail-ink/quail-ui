<template>
  <QDropdownMenu
    :items="languageItems"
    :initial-item="selectedLangItem"
  />
</template>
<script setup lang="ts">
import { ref, computed, onMounted, Ref } from "vue";

const emit = defineEmits(["change"]);

const props = defineProps({
  initial: {
    type: String,
    default: "en",
  },
});

const selectedLangItem: Ref<any> = ref(null);

const languageItems = computed(() => {
  const items = [
    {
      title: "🇺🇸 English",
      value: "en",
      action: selectLang,
    },
    {
      title: "🇨🇳 简体中文",
      value: "zh",
      action: selectLang,
    },
    {
      title: "🇹🇼 正體中文",
      value: "zh-tw",
      action: selectLang,
    },
    {
      title: "🇯🇵 日本語",
      value: "ja",
      action: selectLang,
    },
  ];
  return items;
});


function selectLang(item: any) {
  emit("change", item.value);
}

onMounted(() => {
  selectedLangItem.value =
    languageItems.value.find((item: any) => {
      return props.initial === item.value || localStorage.getItem("quail-language") === item.value;
    }) || languageItems.value[0];
});
</script>
<style lang="scss">
</style>
