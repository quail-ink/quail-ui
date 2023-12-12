<template>
  <div class="q-fence" :class="type">
    <a v-if="link" class="q-fence-inner with-link" :href="link" target="_blank">
      <template v-if="icon && components">
        <component :is="components[icon]" class="icon" />
      </template>
      <q-icon-help v-else class="icon" ></q-icon-help>
      <div class="q-fence-text">
        {{ text }}
      </div>
    </a>
    <div v-else class="q-fence-inner">
      <template v-if="icon && components">
        <component :is="components[icon]" class="icon" />
      </template>
      <q-icon-help v-else class="icon" ></q-icon-help>
      <div class="q-fence-text">
        {{ text }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
const components = getCurrentInstance()?.appContext.components;

const props = defineProps({
  link: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "default",
  },
  icon: {
    type: String,
  },
});
</script>
<style lang="scss">
.q-fence {
  display: block;
  width: 100%;
  .q-fence-inner {
    border-radius: 4px;
    display: flex;
    align-items: flex-start;
    width: 100%;
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
    color: var(--vt-c-text-light-1);
    opacity: 0.7;
    background: var(--vt-c-white-soft);
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    cursor: default;
    .icon {
      width: 16px;
      min-width: 16px;
      margin-right: 0.5rem;
    }
    &.with-link:hover {
      opacity: 1;
    }
    .q-fence-text {
      margin-top: 2px;
    }
  }
  &.warning {
    .q-fence-inner {
      color: var(--vt-c-orange-dark);
      background-color: var(--vt-c-orange-dimm-2);
    }
  }
  &.error {
    .q-fence-inner {
      color: var(--vt-c-red-dark);
      background-color: var(--vt-c-red-dimm-2);
    }
  }
  &.success {
    .q-fence-inner {
      color: var(--vt-c-green-dark);
      background-color: var(--vt-c-green-dimm-2);
    }
  }
}
</style>
