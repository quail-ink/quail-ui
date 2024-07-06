<template>
  <div class="q-input" :class="cls">
    <div class="q-input-prepend-out">
      <slot name="prepend-out"></slot>
    </div>
    <div class="q-text-field-wrapper">
      <div class="q-input-prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        ref="textField"
        class="q-text-field text-field"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        v-model="text"
        @change="textChanged"
        @keyup="keyup"
        @focus="() => emit('focus')"
        @blur="() => emit('blur')"
      />
      <QButton class="clear-btn plain icon" @click="clear">
        <QIconEditorDelete class="icon" />
      </QButton>
      <div class="q-input-append">
        <slot name="append"></slot>
      </div>
    </div>
    <div class="q-input-append-out">
      <slot name="append-out"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import QIconCloseCirle from "../icons/QIconCloseCircle.vue";

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
});

const emit = defineEmits(["change", "blur", "focus", "keyup", "update:modelValue"]);
const text = ref(props.defaultText);
const textField = ref<any>(null);

watch(() => props.modelValue, (val) => {
  text.value = val;
});

const cls = computed(() => {
  const ret:any = {
    "disabled": props.disabled,
  };
  ret['empty'] = text.value === '';
  return ret;
});

function keyup(e: KeyboardEvent) {
  updateValue();
  emit("keyup", e);
}

function textChanged() {
  updateValue();
  emit("change", text.value);
}

function clear() {
  text.value = "";
  updateValue();
  textField.value.focus();
  emit("change", text.value);
}

function updateValue() {
  emit("update:modelValue", text.value);
}

onMounted(() => {
});
</script>

<style scoped lang="scss">
.q-input {
  width: 100%;
  display: flex;
  align-items: center;

  .q-input-prepend, .q-input-append,
  .q-input-prepend-out, .q-input-append-out {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .q-text-field-wrapper {
    width: 100%;
    height: 44px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    box-shadow: inset 0px 1px 8px 0px rgba(0,0,0,0.03), 0px 1px 1px 0px #4343431A;
    align-items: center;
    display: flex;
    &:deep(.q-text-field) {
      border: none;
      height: 42px;
      box-shadow: none;
    }
    .clear-btn {
      height: 42px;
      color: var(--vt-c-text-light-3);
    }
  }
  &.empty {
    .clear-btn {
      display: none;
    }
  }
}
</style>