<template>
  <div class="q-dropdown-menu-with-text-field" >
    <div class="q-dropdown-menu-wrapper">
      <q-dropdown-menu
        :items="items"
        :initial-item="selectedItem"
        use-dialog="always"
        use-filter
        scroll-height="400px"
        hide-action-label
        variant="plain"
        @change="selectChanged"
      ></q-dropdown-menu>
    </div>
    <div class="q-text-field-wrapper">
      <input
        class="q-text-field text-field"
        :placeholder="props.placeholder"
        v-model="text"
        @change="textChanged"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { debounce } from "../../util";

const props = defineProps({
  items: {
    type: Array<any>,
    required: true,
  },
  placeholder: {
    default: "Type here",
  },
  defaultSelection: {
    type: Object,
  },
  defaultText: {
    default: "",
  },
  textDisabled: {
    default: false,
  },
  selectDisabled: {
    default: false,
  },
});

const emit = defineEmits(["change"]);

const text = ref(props.defaultText);
const selectedItem = ref(props.defaultSelection);

function selectChanged(item:any) {
  selectedItem.value = item;
  changed();
}

function textChanged() {
  changed();
}

function changed() {
  const v = {
    selected: selectedItem.value,
    text: text.value
  }
  emit('change', v);
}

onMounted(() => {
  debounce(() => {
    selectedItem.value = props.defaultSelection;
    text.value = props.defaultText;
    if (selectedItem.value === null || selectedItem.value === undefined) {
      selectedItem.value = props.items[0];
    }
  }, 300)();
});
</script>

<style scoped lang="scss">
.q-dropdown-menu-with-text-field {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  .q-dropdown-menu-wrapper {
  }
  .q-text-field-wrapper {
    flex: 1;
    &:deep(.q-text-field) {
      border: none;
      text-align: right;
    }
  }
}
</style>