<template>
  <QDropdownMenu
    :items="languageItems"
    :initial-item="selectedLangItem"
  />
</template>
<script setup lang="ts">
import { ref, computed, onMounted, Ref, watch } from "vue";

const emit = defineEmits(["change"]);

const props = defineProps({
  lang: {
    type: String,
    default: "en",
  },
  noFlag: {
    type: Boolean,
    default: false,
  },
  auto: {
    type: Boolean,
    default: false,
  },
  presist: {
    type: Boolean,
    default: false,
  },
});

const selectedLangItem: Ref<any> = ref(null);

const languageItems = computed(() => {
  let items = [
    {
      title_flag: "🇺🇸 English",
      title_no_flag: "English",
      value: "en",
      action: selectLang,
    },
    {
      title_flag: "🇨🇳 简体中文",
      title_no_flag: "简体中文",
      value: "zh",
      action: selectLang,
    },
    {
      title_flag: "🇹🇼 正體中文",
      title_no_flag: "正體中文",
      value: "zh-tw",
      action: selectLang,
    },
    {
      title_flag: "🇯🇵 日本語",
      title_no_flag: "日本語",
      value: "ja",
      action: selectLang,
    },
  ]
  if (props.auto) {
    items.unshift({
      title_flag: "🌐 Auto",
      title_no_flag: "Auto",
      value: "",
      action: selectLang,
    });
  }
  items = items.map((item) => {
    return {
      ...item,
      title: props.noFlag ? item.title_no_flag: item.title_flag,
    };
  });

  return items;
});

function selectLang(item: any) {
  if (props.presist) {
    localStorage.setItem("quail-language", item.value);
  }
  emit("change", {
    title: props.noFlag ? item.title_no_flag: item.title,
    value: item.value,
  });
}

watch(() => props.lang, (lang) => {
  selectedLangItem.value = languageItems.value.find((item: any) => {
    return lang === item.value;
  });
});

onMounted(() => {
  selectedLangItem.value =
    languageItems.value.find((item: any) => {
      return props.lang === item.value || localStorage.getItem("quail-language") === item.value;
    }) || languageItems.value[0];
});
</script>
<style lang="scss">
</style>
