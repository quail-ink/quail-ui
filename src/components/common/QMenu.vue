<script setup lang="ts">
const props = defineProps({
  items: {
    type: Array<any>,
    required: true,
  },
});

const emit = defineEmits(["action"]);

function cls(item: any) {
  let _cls = "";
  if (item.disabled) {
    _cls += " disabled";
  }
  if (item.danger) {
    _cls += " danger";
  }
  if (item.icon) {
    _cls += " with-icon";
  }
  if (item.image) {
    _cls += " with-image";
  }
  if (item.divider) {
    _cls += " with-divider";
  }
  return _cls;
}

function doAction(item: any) {
  if (item.action) {
    item.action(item);
  }
  if (item.disabled !== true) {
    emit("action", item);
  }
}
</script>
<template>
  <div class="q-menu">
    <div
      class="q-menu-item"
      v-for="item in props.items"
      :key="`q-menu-item-${item.id}`"
      :class="cls(item)"
      @click="doAction(item)"
    >
      <div v-if="item.divider" class="q-menu-item-divider"></div>
      <div v-else class="q-menu-item-inner">
        <img
          v-if="item.image"
          class="q-menu-image"
          :src="item.image"
          :alt="item.title"
        />
        <component
          v-else-if="item.icon"
          class="q-menu-icon"
          :is="item.icon"
        />
        <div class="q-menu-item-content">
          <div class="q-menu-title">{{ item.title }}</div>
          <div v-if="item.subtitle" class="q-menu-subtitle">
            {{ item.subtitle }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.q-menu {
  position: absolute;
  width: 100%;
  min-width: 220px;
  background: white;
  transform: translateY(0.5rem);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  border-radius: 4px;
  z-index: 20;
  .q-menu-item {
    cursor: default;
    &.danger {
      color: var(--vt-c-red);
    }
    &.disabled {
      opacity: 0.5;
      .q-menu-item-inner {
        &:hover {
          background-color: transparent;
        }
      }
    }
    &.with-icon,
    &.with-image {
      .q-menu-item-inner {
        .q-menu-item-content {
          margin-left: 1rem;
        }
      }
    }
    &.with-divider {
      height: 0px;
    }

    .q-menu-item-divider {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      margin: 0 1rem;
      height: 0px;
      transform: translateY(-0.5px);
    }
    .q-menu-item-inner {
      &:hover {
        background-color: rgba(0, 0, 0, 0.06);
      }
      display: flex;
      justify-items: center;
      align-items: center;
      padding: 0.5rem 1rem;
      .q-menu-item-content {
        margin-left: 0rem;
      }
      .q-menu-subtitle {
        font-size: 0.7rem;
        opacity: 0.6;
      }
    }

    .q-menu-image {
      height: 24px;
      width: 24px;
    }

    .q-menu-icon {
      width: 16px;
      height: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
