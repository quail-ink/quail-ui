<template>
  <div class="q-dropdown-menu-with-text-field" >
    <div class="q-dropdown-menu-with-text-field-top">
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
    <div v-if="showBottom" class="q-dropdown-menu-with-text-field-bottom">
      <div class="fill-action text-xs plain flex" @click="fill">
        <span v-text="props.fillActionLabel"></span>
        <QIconArrowUpRight class="icon" />
      </div>
      <div class="text-xs text-hint">
        <span v-text="props.hintText"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { debounce } from "../../util";
import QIconArrowUpRight from "../icons/QIconArrowUpRight.vue";

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
  fillActionLabel: {
    default: "",
  },
  fillActionValue: {
    default: "",
  },
  hintText: {
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

const showBottom = computed(() => {
  return props.fillActionLabel !== "" || props.hintText !== "";
});

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

function fill() {
  text.value = props.fillActionValue;
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
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  .q-dropdown-menu-with-text-field-top, .q-dropdown-menu-with-text-field-bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .q-dropdown-menu-with-text-field-bottom {
    color: var(--vt-c-text-light-3);
    .fill-action,.text-hint {
      padding: 0.1rem 0.5rem 0.5rem 1rem;
    }
    .fill-action {
      padding-right: 2rem;
      cursor: default;
      transition: color 0.2s ease-in;
      &:hover {
        color: var(--vt-c-text-light-2);
      }
    }
    .icon {
      width: 16px;
      height: 16px;
    }
  }
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