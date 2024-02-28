<template>
  <div class="q-avatar" :style="sty">
    <img :src="props.src" :alt="alt" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "An Avatar",
  },
  size: {
    type: String,
    default: "32px",
  },
});

const sty = ref({
  width: `${props.size}px`,
  height: `${props.size}px`,
});
</script>
<style lang="scss">
.q-avatar {
  display: block;
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
}
</style>
