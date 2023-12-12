<script setup lang="ts">
import { computed, onMounted, ref, watch, type Ref } from "vue";
import { closePopupMenu } from "../../util";

const props = defineProps({
  items: {
    type: Array<any>,
    required: true,
  },
  initialItem: {
    type: Object,
    default: null,
  },
  hideSelected: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: "outlined",
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["change"]);
const expanded = ref(false);
const selectedItem: Ref<any> = ref(null);
const menuWrapper: Ref<any> = ref(null);

const actionCls = computed(() => {
  const cls: string[] = [];
  if (expanded.value) {
    cls.push("expanded");
  }

  if (props.variant === "outlined") {
    cls.push("frame");
  }

  return cls.join(" ");
});

function toggle() {
  if (!expanded.value) {
    // want to expand? close other menus
    closePopupMenu();
  }
  // toggle
  expanded.value = !expanded.value;
  // adjust menu position to make sure it's visible
  if (expanded.value) {
    setTimeout(() => {
      const wrapper = menuWrapper.value;
      const menu = wrapper.querySelector(".q-menu");
      const rect = menu.getBoundingClientRect();
      if (rect.left < 0) {
        menu.style.left = "0";
      }
    }, 10);
  }
}

function menuItemClick(item: any) {
  expanded.value = false;
  selectedItem.value = item;
  if (item.action) {
    item.action(item);
  }
  emit("change", item);
}

watch(
  () => props.initialItem,
  () => {
    if (props.initialItem) {
      selectedItem.value = props.initialItem;
    }
  }
);

onMounted(() => {
  if (props.initialItem) {
    selectedItem.value = props.initialItem;
  }

  window.addEventListener("storage", (event) => {
    if (event.key === "quailui_global_popup_trigger") {
      if (event.newValue) {
        expanded.value = false;
      }
    }
  });
});
</script>

<template>
  <div class="q-dropdown-menu">
    <div class="q-dropdown-menu-inner narrow-view">
      <div class="q-dropdown-menu-action" :class="actionCls" @click.stop="toggle">
        <div v-if="!hideSelected && selectedItem" class="q-dropdown-selected">
          <img
            v-if="selectedItem.image"
            class="menu-image"
            :src="selectedItem.image"
            :alt="selectedItem.title"
          />
          <component
            v-else-if="selectedItem.icon"
            class="icon menu-icon"
            :is="selectedItem.icon"
          ></component>
          <div class="menu-title">
            {{
              selectedItem
                ? selectedItem.title
                : props.placeholder || "Select ..."
            }}
          </div>
        </div>
        <slot></slot>
        <q-icon-chevron-down class="icon chevron-icon" ></q-icon-chevron-down>
      </div>
      <div ref="menuWrapper">
        <Transition>
          <q-menu v-if="expanded" :items="items" @action="menuItemClick"></q-menu>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.q-dropdown-menu {
  height: 44px;
  .q-dropdown-menu-inner {
    position: relative;
  }
  .q-dropdown-menu-action {
    height: 44px;
    padding: 0 0.5rem;
    display: flex;
    justify-items: center;
    align-items: center;
    cursor: pointer;
    .menu-icon {
    }
    .menu-title {
      margin-left: 0.5rem;
    }
    .chevron-icon {
      transition: transform 0.2s ease;
    }
    &.expanded {
      .chevron-icon {
        transform: rotate(180deg);
      }
    }
  }
  .q-dropdown-selected {
    white-space: nowrap;
    margin-left: 0.2rem;
    flex: 1;
    display: flex;
    align-items: center;
  }
  .menu-image {
    width: 24px;
    height: 24px;
  }
  .icon {
    height: 16px;
  }
  .q-menu {
    right: 0;
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
