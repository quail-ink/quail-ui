<template>
  <div class="q-progress" :class="color">
    <div class="q-progress-slot">
      <div class="q-progress-bar" :style="{ width: barWidth }" :class="completed? '': 'animated' ">
        <div class="q-progress-bar-inner"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance, computed } from "vue";
const props = defineProps({
  infinite: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "blue",
  },
  max: {
    type: Number,
    default: 100,
  },
  value: {
    type: Number,
    default: 0,
  },
});

const barWidth = computed(() => {
  if (props.infinite) {
    return "100%";
  }
  return `${(props.value / props.max) * 100}%`;
});

const completed = computed(() => {
  return props.value >= props.max;
});

</script>
<style lang="scss">
.q-progress {
  display: block;
  min-width: 200px;
  --q-progress-color: var(--vt-c-blue);
  --q-progress-color-light: var(--vt-c-blue-lighter);
  &.green {
    --q-progress-color: var(--vt-c-green);
    --q-progress-color-light: var(--vt-c-green-lighter);
  }
  &.red {
    --q-progress-color: var(--vt-c-red);
    --q-progress-color-light: var(--vt-c-red-lighter);
  }
  &.orange {
    --q-progress-color: var(--vt-c-orange);
    --q-progress-color-light: var(--vt-c-orange-lighter);
  }
  .q-progress-slot {
    position: relative;
    width: 100%;
    height: 8px;
    background: var(--vt-c-white-soft);
    border-radius: 4px;
    overflow: hidden;
    .q-progress-bar {
      border-radius: 4px;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      transition: width 0.2s ease-in-out;
      overflow: hidden;
      &.animated {
        .q-progress-bar-inner {
          animation: progress 1s linear infinite;
        }
      }
    }
    .q-progress-bar-inner {
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