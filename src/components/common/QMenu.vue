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
  <div class="menu frame">
    <div
      class="menu-item"
      v-for="item in props.items"
      :key="`menu-item-${item.id}`"
      :class="cls(item)"
      @click="doAction(item)"
    >
      <div v-if="item.divider" class="menu-item-divider"></div>
      <div v-else class="menu-item-inner">
        <img
          v-if="item.image"
          class="menu-image"
          :src="item.image"
          :alt="item.title"
        />
        <component
          v-else-if="item.icon"
          class="menu-icon mr-1"
          :is="item.icon"
        />
        <div class="menu-item-content">
          <div class="menu-title">{{ item.title }}</div>
          <div v-if="item.subtitle" class="menu-subtitle">
            {{ item.subtitle }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  position: absolute;
  width: 100%;
  min-width: 220px;
  background: white;
  transform: translateY(0.5rem);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  z-index: 20;
  .menu-item {
    cursor: default;
    &.danger {
      color: var(--vt-c-red);
    }
    &.disabled {
      opacity: 0.5;
      .menu-item-inner {
        &:hover {
          background-color: transparent;
        }
      }
    }
    &.with-icon,
    &.with-image {
      .menu-item-inner {
        .menu-item-content {
          margin-left: 1rem;
        }
      }
    }

    .menu-item-divider {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      margin: 0 1rem;
      height: 0px;
    }
    .menu-item-inner {
      &:hover {
        background-color: rgba(0, 0, 0, 0.06);
      }
      display: flex;
      justify-items: center;
      align-items: center;
      padding: 0.5rem 1rem;
      .menu-item-content {
        margin-left: 0rem;
      }
      .menu-subtitle {
        font-size: 0.7rem;
      }
    }

    .menu-image {
      height: 24px;
      widows: 24px;
    }

    .menu-icon {
      width: 16px;
      height: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
