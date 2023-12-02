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
  <Transition>
    <div v-if="isOpen" class="q-dialog-mask" @click="close">
      <div class="q-dialog" :style="dialogStyle" @click.stop="v">
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
}

.q-dialog {
  background-color: white;
  padding: 0rem;
  border-radius: 2px;
  z-index: 101;
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
</style>
