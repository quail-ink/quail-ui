<template>
  <div class="q-share" :class="cls">
    <a v-for="serv in enabledServices" :key="`serv-${serv.name}`"
      :href="serv.url" target="_blank"
      :title="serv.tooltip" class="q-share-link" :class="serv.name">
      <component :is="serv.icon" class="icon share-icon"></component>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from "vue";
const components = getCurrentInstance()?.appContext.components;

const supportedServices:any = {
  "twitter": {
    "icon": "q-icon-color-twitter",
    "tooltip": "Share on Twitter",
    "url_template": "https://x.com/intent/tweet?url={url}&text={text}"
  },
  "facebook": {
    "icon": "q-icon-color-facebook",
    "tooltip": "Share on Facebook",
    "url_template": "https://www.facebook.com/sharer.php?u={url}"
  },
  "hackernews": {
    "icon": "q-icon-color-hackernews",
    "tooltip": "Share on Hackernews",
    "url_template": "https://news.ycombinator.com/submitlink?u={url}&t={text}"
  },
  "linkedin": {
    "icon": "q-icon-color-linkedin",
    "tooltip": "Share on LinkedIn",
    "url_template": "https://www.linkedin.com/shareArticle?mini=true&amp;url={url}"
  },
  "bluesky": {
    "icon": "q-icon-color-bluesky",
    "tooltip": "Share on Bluesky",
    "url_template": "https://bsky.app/intent/compose?text={textWithUrl}"
  },
  "mastodon": {
    "icon": "q-icon-color-mastodon",
    "tooltip": "Share on Mastodon",
    "url_template": "https://{host}/share?text={textWithUrl}"
  }
};

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
  },
  services: {
    type: Array<string>,
    default: () => ["twitter", "facebook", "hackernews", "linkedin"],
  },
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

const text = computed(() => {
  if (props.text) {
    return encodeURIComponent(props.text);
  }
  return encodeURIComponent(document.title);
});

const enabledServices = computed(() => {
  const enabled = [];
  for (const service of props.services) {
    const item = supportedServices[service];
    if (item) {
      item.url = buildUrl(item.url_template, {
        url: shareUrl.value,
        text: text.value,
        textWithUrl: `${text.value}${encodeURIComponent('\n\n')}${shareUrl.value}`,
        host: window.location.host,
      });
      enabled.push(item);
    }
  }
  return enabled;
});

function buildUrl(url: string, params: Record<string, string>) {
  for (const key in params) {
    url = url.replace(`{${key}}`, params[key]);
  }
  return url;
}

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