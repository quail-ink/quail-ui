<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
const props = defineProps({
  modelValue: Boolean,
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
});

const emit = defineEmits(["update:modelValue", "close"]);

const isOpen = ref(props.modelValue);

const dialogStyle = computed(() => {
  const w = document.body.clientWidth < 720 ? '100%' : props.width;
  const h = props.height;
  return {
    width: w,
    height: h,
  };
});

watch(
  () => props.modelValue,
  (value) => {
    isOpen.value = value;
  }
);

function close () {
  isOpen.value = false;
  emit('update:modelValue', false);
  emit('close');
};

function v() {
};

</script>
<template>
  <div v-if="isOpen" class="dialog-mask" @click="close">
    <Transition>
      <div class="dialog" :style="dialogStyle" @click.stop="v">
        <div class="dialog-header">
          <template v-if="title">
            <div class="dialog-title">{{ title }}</div>
          </template>
          <slot v-else name="header"></slot>
        </div>
        <div class="dialog-body">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.dialog-mask {
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
}

.dialog {
  background-color: white;
  padding: 20px;
  border-radius: 2px;
  // max-height: 70%;
  z-index: 101;
}

.dialog-header {
  display: flex;
  align-items: center;
  max-height: 78px;
  .dialog-title {
    flex: 1;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0.5rem;
  }
}

.dialog-body {
  height: calc(100% - 78px);
  padding: 0.5rem;
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
  .dialog-mask {
    align-items: flex-end;
  }
  .dialog {
    width: 100%;
    border-radius: 0;
    padding: 0;
    bottom: 0;
    background: white;
    .dialog-header {
      padding: 0.5rem 1rem;
    }
    .dialog-body {
      height: calc(100% - 78px);
      padding: 0.5rem 1rem;
      overflow-y: auto;
      margin-bottom: cal(safe-area-inset-bottom);
    }
  }
}
</style>
