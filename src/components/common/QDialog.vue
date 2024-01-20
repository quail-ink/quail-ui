<script lang="ts" setup>
import { computed, ref, useSlots, watch,
  nextTick,
  Ref
} from 'vue';
import { useUtil } from "../../composables/useUtil";
const slots = useSlots();
const { browserDetect } = useUtil();
const { isMobile } = browserDetect();

const props = defineProps({
  modelValue: Boolean,
  desktopMode: {
    type: String,
    default: 'dialog' // dialog, popup
  },
  noFrame: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '500px',
  },
  height: {
    type: String,
    default: 'auto',
  },
  position: {
    type: String,
    default: 'center',
  },
  persistent: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "close"]);

const shaking = ref(false);
const isOpen = ref(props.modelValue);
const popupPos = ref({ "top": "0", "left": "0" });
const triggerWrapper:Ref<any> = ref(null);
const dialogMask:Ref<any> = ref(null);

const dialogStyle = computed(() => {
  const w = document.body.clientWidth < 720 ? '100%' : props.width;
  const h = props.height;
  const ret:any = {
    width: w,
    height: h,
  };
  if (!isMobile && props.desktopMode === 'popup') {
    ret.top = popupPos.value.top;
    ret.left = popupPos.value.left;
  }
  return ret;
});

const dialogCls = computed(() => {
  let cls = [];
  if (shaking.value) {
    cls.push('shaking');
  }
  if (!isMobile) {
    cls.push(`desktop-mode-${props.desktopMode}`);
  }
  if (props.noFrame) {
    cls.push('no-frame');
  }
  return cls.join(' ');
});

const dialogMaskCls = computed(() => {
  let cls = [];
  if (!isMobile && props.desktopMode === 'popup') {
    cls.push('desktop-mode-popup');
  }
  return cls.join(' ');
});

watch(
  () => props.modelValue,
  (value) => {
    isOpen.value = value;
    nextTick(() => {
      if (!isMobile && props.desktopMode === 'popup') {
        if (triggerWrapper.value.children) {
          dialogMask.value.style.height = `${document.body.clientHeight}px`;
          const el:any = (triggerWrapper.value.children as any)[0]
          if (el) {
            const rect = el.getBoundingClientRect();
            const top = window.scrollY + rect.top + rect.height + 8;
            const left = rect.left;
            popupPos.value = { "top": `${top}px`, "left":`${left}px` };
          }
        }
      }
    })
  }
);

function close () {
  if (props.persistent) {
    // shake the dialog
    shaking.value = true;
    setTimeout(() => {
      shaking.value = false;
    }, 300);
    return
  };
  isOpen.value = false;
  emit('update:modelValue', false);
  emit('close');
};

function v() {};

</script>
<template>
  <div class="trigger-wrapper" ref="triggerWrapper">
    <slot name="trigger"></slot>
  </div>
  <Transition>
    <div v-if="isOpen" class="q-dialog-mask" @click="close" :class="dialogMaskCls" ref="dialogMask">
      <div class="q-dialog" :style="dialogStyle" @click.stop="v" :class="dialogCls">
        <div class="q-dialog-header">
          <template v-if="title">
            <div class="q-dialog-title">{{ title }}</div>
          </template>
          <slot v-else name="header"></slot>
        </div>
        <div class="q-dialog-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
.q-dialog-mask {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
  &.desktop-mode-popup {
    background-color: transparent;
    position: absolute;
  }
}

.q-dialog {
  background-color: white;
  padding: 0rem;
  border-radius: 4px;
  z-index: 101;
  &.shaking {
    animation: shake 0.3s;
  }
  &.no-frame {
    background-color: transparent;
    .q-dialog-header {
      display: none;
    }
    .q-dialog-body {
      padding: 0;
    }
    &.desktop-mode-popup {
      box-shadow: none;
    }
  }
  &.desktop-mode-popup {
    position: absolute;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }
}

.q-dialog-header {
  display: flex;
  align-items: center;
  max-height: 78px;
  .q-dialog-title {
    flex: 1;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 1rem;
  }
}

.q-dialog-body {
  height: calc(100% - 78px);
  padding: 0 1rem 1rem;
  overflow-y: auto;
  max-height: 600px;
  margin-bottom: cal(safe-area-inset-bottom);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

@media only screen and (max-width: 720px) {
  .q-dialog-mask {
    align-items: flex-end;
  }
  .q-dialog {
    width: 100%;
    border-radius: 0;
    bottom: 0;
    background: white;
    .q-dialog-header {
    }
    .q-dialog-body {
      height: calc(100% - 78px);
      overflow-y: auto;
      margin-bottom: cal(safe-area-inset-bottom);
      padding-bottom: 28px;
    }
  }
}

@keyframes shake {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.02);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}
</style>
