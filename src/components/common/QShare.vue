<template>
  <div class="q-share" :class="cls">
    <a :href="`https://twitter.com/intent/tweet?url=${shareUrl}&text=${props.text}`" target="_blank" title="Share on Twitter" class="q-share-link twitter">
      <q-icon-color-twitter class="icon share-icon"></q-icon-color-twitter>
    </a>
    <a :href="`https://www.facebook.com/sharer.php?u=${shareUrl}`" target="_blank" title="Share on facebook" class="q-share-link facebook">
      <q-icon-color-facebook class="icon share-icon"></q-icon-color-facebook>
    </a>
    <a :href="`https://news.ycombinator.com/submitlink?u=${shareUrl}&t=${props.text}`" target="_blank" title="Share on hackernews" class="q-share-link hackernews">
      <q-icon-color-hackernews class="icon share-icon"></q-icon-color-hackernews>
    </a>
    <a :href="`https://www.linkedin.com/shareArticle?mini=true&amp;url=${shareUrl}`" target="_blank" title="Share on linkedin" class="q-share-link linkedin">
      <q-icon-color-linkedin class="icon share-icon"></q-icon-color-linkedin>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  url: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  layout: {
    type: String,
    default: "row",
  }
});

const cls = computed(() => {
  if (props.layout === "row") {
    return "q-share-layout-row";
  } else if (props.layout === "column") {
    return "q-share-layout-column";
  }
  return "q-share-layout-row";
});

const shareUrl = computed(() => {
  if (props.url) {
    return encodeURIComponent(props.url);
  }
  // share the url of the current page
  return encodeURIComponent(window.location.href);
});

</script>
<style lang="scss">
.q-share {
  .q-share-link {
    display: block;
    width: 24px;
    height: 24px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    filter: grayscale(1);
    opacity: 0.8;
    transition: all 0.2s ease-in-out;
    img {
      width: 100%;
      height: 100%;
    }
    &:hover {
      filter: grayscale(0);
      opacity: 1;
    }
  }
}
.q-share.q-share-layout-row {
  display: flex;
  justify-content: center;
  align-items: center;
  .q-share-link {
    margin-right: 0.8rem;
    &:last-child {
      margin-right: 0;
    }
  }
}
.q-share.q-share-layout-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .q-share-link {
    margin-bottom: 0.8rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
}

</style>