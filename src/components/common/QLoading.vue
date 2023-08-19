<template>
  <div class="pa-4 mb-4 rounded-sm text-center" color="glass">
    <div class="spinners py-2 mb-2 d-flex justify-center">
      <i class="spinner one" aria-hidden="true"></i>
      <i class="spinner two" aria-hidden="true"></i>
      <i class="spinner three" aria-hidden="true"></i>
      <i class="spinner four" aria-hidden="true"></i>
      <i class="spinner five" aria-hidden="true"></i>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped>
.spinners {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.spinner {
  animation: spin 2s linear infinite;
  line-height: 1;
  display: flex;
  height: 6px;
  width: 6px;
  display: block;
  background: #000;
  margin: 0 3px;
  border-radius: 2px;
  &.two {
    animation-delay: 0.2s;
  }
  &.three {
    animation-delay: 0.4s;
  }
  &.four {
    animation-delay: 0.6s;
  }
  &.five {
    animation-delay: 0.8s;
  }
}
@keyframes spin {
  0% {
    transform: translateY(-4px);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.4);
  }
  50% {
    transform: translateY(4px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  }
  100% {
    transform: translateY(-4px);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.4);
  }
}
</style>
