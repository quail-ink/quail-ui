<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  title: {
    type: String,
  }
});
</script>

<template>
<div class="q-pack-cover block-drop-shadow">
  <div class="q-pack-cover-layer one"></div>
  <div class="q-pack-cover-layer two"></div>
  <div class="q-pack-cover-inner">
    <img :src="props.src" :alt="alt"/>
  </div>
</div>
</template>

<style lang="scss" scoped>
.q-pack-cover {
  width: 128px;
}
.q-pack-cover-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // border: 1px solid #ccc;
  background: #fff;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
  transform: scale(0.97) translateY(5%);
  border-radius: 8px;
  z-index: 2;
  &.one {
    transform: scale(0.94) translateY(10%);
    z-index: 1;
  }
}
.q-pack-cover-inner {
  flex-basis: 128px;
  width: 128px;
  height: 100px;
  display: block;
  background-color: #eee;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3), 0 3px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  z-index: 3;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    z-index: 1;
    color: rgba(0, 0, 0, 0.3);
    text-align: center;
    font-size: 0.8rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

@media only screen and (max-width: 720px) {
  .q-pack-cover {
    // width: 112px;
  }
  .q-pack-cover-inner {
    flex-basis: 112px;
    width: 112px;
    height: 96px;
  }
}

</style>