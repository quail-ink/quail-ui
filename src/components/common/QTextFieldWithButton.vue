<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps({
  type: {
    default: "text",
  },
  layout: {
    default: "vertical",
  },
  actionLabel: {
    default: "Submit",
  },
  placeholder: {
    default: "Type here",
  },
  defaultText: {
    default: "",
  },
  loading: {
    default: false,
  },
  disabled: {
    default: false,
  },
});

const emit = defineEmits(["submit"]);

const text = ref(props.defaultText);

const cls = computed(() => {
  const cls: string[] = [];
  if (props.layout === "vertical") {
    cls.push("vertical");
  } else {
    cls.push("horizontal");
  }
  if (props.type === "code") {
    cls.push("code");
  }
  return cls.join(" ");
});

const validated = computed(() => {
  if (props.loading) {
    return false;
  }

  const trimed = text.value?.trim();
  if (trimed.length === 0) {
    return false;
  }

  if (props.type === "email") {
    return validateEmail.value;
  } else if (props.type === "code") {
    return validatedCode.value;
  }

  return true;
});

const validateEmail = computed(() => {
  const trimed = text.value?.trim();
  return !props.disabled && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimed);
});

const validatedCode = computed(() => {
  const trimed = text.value?.trim();
  return /^\d{6}$/.test(trimed);
});

const label = computed(() => {
  if (props.loading) {
    return "Loading...";
  }

  return props.actionLabel;
});

const submit = () => {
  if (validated.value) {
    emit("submit", { text: text.value });
  }
};
</script>

<template>
  <div class="q-text-field-with-button" :class="cls">
    <div class="q-text-field-wrapper">
      <input
        class="q-text-field text-field"
        :placeholder="props.placeholder"
        v-model="text"
      />
    </div>
    <div class="q-text-button-wrapper">
      <button class="q-button button primary" :disabled="!validated" @click="submit">
        <div clas="">
          {{ label }}
        </div>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.q-text-field-with-button {
  .q-text-field {
    text-align: center;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    min-width: 296px;
  }
  .q-button {
    transform: translateY(-1px);
    width: 100%;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.code {
    .q-text-field {
      font-family: monospace;
      letter-spacing: 0.2rem;
    }
  }
  &.horizontal {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    .q-text-field-wrapper {
      flex: 6;
    }
    .q-text-button-wrapper {
      flex: 4;
    }
    .q-text-field {
      border-radius: 4px 0 0 4px;
      min-width: auto;
    }
    .q-button {
      border-radius: 0 4px 4px 0;
      transform: translateX(-1px);
    }
  }
}
</style>
