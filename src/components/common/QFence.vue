<template>
  <div class="fence" :class="type">
    <a v-if="link" class="fence-inner with-link" :href="link" target="_blank">
      <template v-if="icon">
        <component :is="icon" class="icon" />
      </template>
      <QIconHelp v-else class="icon" />
      <div>
        {{ text }}
      </div>
    </a>
    <div v-else class="fence-inner">
      <template v-if="icon">
        <component :is="icon" class="icon" />
      </template>
      <QIconHelp v-else class="icon" />
      <div>
        {{ text }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
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
    type: Object || null,
  },
});
</script>
<style lang="scss" scoped>
.fence {
  display: block;
  width: 100%;
  .fence-inner {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
    color: var(--vt-c-text-light-2);
    opacity: 0.6;
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
      opacity: 0.9;
    }
  }
  &.warning {
    .fence-inner {
      color: var(--vt-c-orange-dark);
      background-color: var(--vt-c-orange-dimm-2);
    }
  }
}
</style>
