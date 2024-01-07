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
  glow: {
    default: '',
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
  if (props.glow) {
    cls.push(`glow-${props.glow}`);
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
    <div v-if="glow !== ''" class="q-button-glow"></div>
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
      border-width: 1px 0 1px 1px;
      min-width: auto;
    }
    .q-button {
      border-radius: 0 4px 4px 0;
      transform: translateY(0px);
    }
  }
  &.glow-matrix {
    position: relative;
    .q-text-field {
      color: #fff;
      background: transparent;
      border-color: rgba(255, 255, 255, 0.2) transparent rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.2) ;
      border-width: 1px 0 1px 1px;
      border-style: solid;
      &:focus {
        border-color: rgba(180, 233, 65, 0.2);
      }
    }
    .q-button {
      color: #b3e941 !important;
      background: rgba(180, 233, 65, 0.3) !important;
      &[disabled] {
        color: #8bb434 !important;
        background: rgba(180, 233, 65, 0.2) !important;
        box-shadow: none !important;
      }
    }
    .q-button-glow {
      position: absolute;
      background-color: rgba(180, 233, 65, 0.4);
      color: #b3e941;
      filter: blur(20px);
      height: 44px;
      width: 40%;
      right: 0;
    }
    &:hover {
      .q-button-glow {
        animation: glow 3s ease-in-out infinite;
      }
    }
  }
}

@keyframes glow {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(0.9);
  }
}
</style>
