<script setup lang="ts">
import { computed, onMounted, ref, watch, type Ref } from "vue";

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
  hintIcon: {
    type: Object,
    default: null,
  },
  hintText: {
    default: "",
  },
  disabled: {
    default: false,
  },
  rows: {
    type: Number,
    default: 5,
  },
  error: {
    default: false,
  },
  max: {
    type: Number,
    default: -1,
  },
});

const emit = defineEmits(["change", "blur", "focus", "keyup", "update:modelValue"]);
const text = ref(props.defaultText);

watch(() => props.modelValue, (val) => {
  text.value = val;
});

const exceed = computed(() => {
  if (props.max === -1) {
    return false;
  }
  return text.value.length > props.max ;
});

const hasHint = computed(() => {
  return props.hintIcon || props.hintText || props.max !== -1;
});

const cls = computed(() => {
  const ret: any = [];
  if (props.disabled) {
    ret.push("disabled");
  };
  if (props.error) {
    ret.push("error");
  }
  if (exceed.value) {
    ret.push("exceed");
  }
  return ret.join(" ");
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

<template>
  <div class="q-textarea" :class="cls">
    <textarea class="textarea" v-model="text"
      @change="textChanged" @keyup="keyup"
      :rows="rows" :placeholder="props.placeholder" :disabled="disabled"></textarea>
    <div v-if="hasHint" class="q-textarea-hint">
      <div class="q-textarea-hint-left">
        <template v-if="hintIcon">
          <component :is="hintIcon" class="q-textarea-hint-icon"></component>
        </template>
        <div v-if="hintText" class="q-textarea-hint-text text-xs">
          {{ hintText }}
        </div>
      </div>
      <div v-if="max !== -1" class="q-textarea-counter text-xs">
        {{ text.length }} / {{ max }}
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.q-textarea {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  box-shadow: inset 0px 1px 8px 0px rgba(0,0,0,0.03), 0px 1px 1px 0px #4343431A;
  transition: border-color 0.2s ease-in-out;
  &.exceed, &.error {
    border: 1px solid var(--vt-c-red-dimm-3);
    &:has(textarea:focus) {
      border-color: var(--vt-c-red-dimm-3);
    }
    .q-textarea-hint {
      background-color: var(--vt-c-red-dimm-1);
    }
    .q-textarea-counter {
      color: var(--vt-c-red);
    }
  }

  &.error {
    .q-textarea-hint {
      color: var(--vt-c-red);
    }
  }

  &:deep(textarea) {
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
  }

  // if textarea gets focus, apply border color to .q-textarea by parent pesudo class
  &:has(textarea:focus) {
    border-color: var(--vt-c-divider-light-focus);
  }

  .q-textarea-hint {
    color: var(--vt-c-text-light-3);
    padding: 0.2rem 0.5rem;
    margin-left: 0px;
    margin-right: 0px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .q-textarea-hint-left {
      display: flex;
      align-items: center;
    }
    .q-textarea-hint-icon {
      max-height: 16px;
      max-width: 16px;
      opacity: 0.7;
      margin-right: 0.5rem;
    }
  }
}
</style>