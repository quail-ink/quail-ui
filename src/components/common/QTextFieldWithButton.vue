
<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
  type: {
    default: 'text'
  },
  actionLabel: {
    default: 'Submit'
  },
  placeholder: {
    default: 'Type here'
  },
  defaultText: {
    default: ''
  },
  loading: {
    default: false
  },
  disabled: {
    default: false
  }
});

const emit = defineEmits(["submit"]);

const text = ref(props.defaultText);

const validated = computed(() => {
  if (props.loading) {
    return false;
  }

  const trimed = text.value?.trim();
  if (trimed.length === 0) {
    return false;
  }

  if (props.type === 'email') {
    return validateEmail.value;
  } else if (props.type === 'code') {
    return validatedCode.value;
  }

  return true;
});

const validateEmail = computed(()=> {
  const trimed = text.value?.trim();
  return !props.disabled && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimed)
})

const validatedCode = computed(()=> {
  const trimed = text.value?.trim();
  return /^\d{6}$/.test(trimed)
})

const label = computed(() => {
  if (props.loading) {
    return 'Loading...';
  }

  return props.actionLabel
});

const submit = () => {
  if (validated.value) {
    emit('submit', { text: text.value })
  }
};

</script>

<template>
  <div class="text-field-with-button" :class="props.type">
    <div>
      <input class="text-field" :placeholder="props.placeholder" v-model="text"/>
    </div>
    <div>
      <button class="button primary" :disabled="!validated" @click="submit">
        <div clas="">
          {{ label }}
        </div>
      </button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.text-field-with-button {
  .text-field {
    text-align: center;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    min-width: 296px
  }
  .button {
    transform: translateY(-1px);
    width: 100%;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.code {
    .text-field {
      font-family: monospace;
      letter-spacing: 0.2rem;
    }
  }
}
</style>