<template>
  <button :class="cls" :disabled="!validated">
    <div v-if="props.loading" class="ocean">
      <div class="wave"></div>
    </div>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  class: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const cls = computed(() => {
  const ret = ['q-button'];
  ret.push(props.class);
  if (props.loading) {
    ret.push('loading');
  }
  return ret.join(' ');
});

const validated = computed(() => {
  return !props.disabled;
});
</script>

<style scoped lang="scss">
.q-button {
  height: 44px;
  background-color: #ddd;
  font-weight: 500;
  color: #000;
  border-radius: 4px;
  border: none;
  padding: 0.8rem 1rem;
  text-align: center;
  text-decoration: none;
  display: flex;
  font-size: 1rem;
  cursor: default;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  line-height: 1;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow:hidden;
  &.sm {
    padding: 0.6rem 0.8rem;
    height: 38px;
    font-size: 0.8rem;
  }
  &.xs {
    padding: 0.6rem 0.8rem;
    height: 32px;
    font-size: 0.8rem;
  }
  &.xxs {
    padding: 0.6rem 0.8rem;
    height: 24px;
    font-size: 0.7rem;
  }
  .button-label {
    align-self: center;
  }
  &:deep(.icon) {
    margin-right: 0.5rem;
    height: 16px !important;
    width: 16px !important;
    align-self: center;
  }
  &.block {
    width: 100%;
  }
  &.icon {
    &:deep(.icon) {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 0;
      height: 16px;
      width: 16px;
    }
  }
}
/* press animation */
.q-button:active {
  transform: scale(0.93);
}
.q-button[disabled] {
  transform: scale(1) !important;
}
.q-button {
  &.primary {
    --q-progress-color: rgba(255, 255, 255, 0.1);
    --q-progress-color-light: rgba(255, 255, 255, 0.05);
    background-color: var(--vt-c-black);
    color: white;
    &:hover {
      box-shadow: 0 0 8px rgba(41,30,56,.2);
    }
    &.elevated {
      box-shadow: 0 0 16px rgba(41, 30, 56, .3);
    }
    &[disabled] {
      box-shadow: none;
      background-color: #6a6a7f;
    }
  }
  &.danger {
    --q-progress-color: rgba(255, 255, 255, 0.15);
    --q-progress-color-light: rgba(255, 255, 255, 0.05);
    background-color: #f44336;
    color: white;
    border: none;
    &:hover {
      background-color: #d32f2f;
    }
    &[disabled] {
      opacity: 0.5;
    }
  }
  &.outlined {
    --q-progress-color: rgba(0, 0, 0, 0.0);
    --q-progress-color-light: rgba(0, 0, 0, 0.03);
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1);
    background-color: transparent;
    &:hover{
      background-color: rgba(235, 241, 247, 0.486);
    }
    &[disabled] {
      color: #888;
      background-color: transparent;
      &:hover {
        background-color: transparent !important;
      }
    }
  }
  &.outlined.danger {
    --q-progress-color: rgba(0, 0, 0, 0.0);
    --q-progress-color-light: rgba(255, 0, 0, 0.03);
    color: #d32f2f;
    box-shadow: inset 0 0 0 1px rgba(244,67,54,0.2);
    background-color: transparent;
    &:hover{
      background-color: rgba(244,67,54,0.04);
    }
    &[disabled] {
      opacity: 0.5;
    }
  }
  &.plain {
    --q-progress-color: rgba(0, 0, 0, 0.0);
    --q-progress-color-light: rgba(0, 0, 0, 0.03);
    box-shadow: none;
    border: none;
    background-color: transparent;
    &:hover{
      background-color: rgba(0,0,0,0.05);
    }
  }
  &.plain.danger {
    --q-progress-color: rgba(0, 0, 0, 0.0);
    --q-progress-color-light: rgba(255, 0, 0, 0.03);
    color: #d32f2f;
    background-color: transparent;
    &:hover{
      background-color: rgba(244,67,54,0.04);
    }
    &[disabled] {
      opacity: 0.5;
    }
  }
}
.q-button.loading {
  .ocean {
    height: 100%; /* change the height of the waves here */
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .wave {
    animation: progress 1s linear infinite;
    background: repeating-linear-gradient(
      45deg,
      var(--q-progress-color),
      var(--q-progress-color) 10px,
      var(--q-progress-color-light) 10px,
      var(--q-progress-color-light) 20px
    );
    position: absolute;
    left: -28px;
    right: 0;
    top: 0;
    bottom: 0;
  }
  &.primary {
    color: #9d9db8;
  }
  &.danger {
    color: #ffcaca;
  }
  &.outlined, &.plain {
    color: #888;
  }
  &.outlined.danger, &.plain.danger {
    color: #e67b7b;
  }
}
@keyframes progress {
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(28px);
	}
}
</style>