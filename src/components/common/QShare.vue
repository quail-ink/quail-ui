<template>
  <div class="q-share" :class="cls">
    <a v-for="serv in enabledServices" :key="`serv-${serv.name}`"
      :title="serv.tooltip" class="q-share-link" :class="serv.name"
      @click="shareToService(serv)"
    >
      <component :is="serv.icon" class="icon share-icon"></component>
    </a>
    <q-dialog v-model="showMastodonDialog" title="Share to Mastodon">
      <div class="q-dialog-content mastodon-dialog-content flex center">
        <q-icon-color-mastodon class="service-icon"></q-icon-color-mastodon>
        <input class="text-field" v-model="mastodonHost" placeholder="Instance Domain" ref="mastodonHostInput"/>
        <q-button class="primary icon ml-2" @click="shareToMastodon">
          <q-icon-arrow-right></q-icon-arrow-right>
        </q-button>
      </div>
    </q-dialog>
    <q-dialog v-model="showGeneralDialog" title="Share to ...">
      <div class="q-dialog-content general-dialog-content">
        <div class="qrcode-wrapper">
          <vue-qrcode :value="generalUrl" :options="{ width: 200, margin: 1 }"></vue-qrcode>
        </div>
        <div class="operations form">
          <div class="copy-row form-row">
            <q-button class="outlined ml-2 block" @click="copyUrl">
              <q-icon-copy class="icon"></q-icon-copy>
              <span class="button-label">Copy URL</span>
            </q-button>
          </div>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from "vue";
import { copyToClipboard } from "../../utils";

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
  },
  "general": {
    "icon": "q-icon-color-share",
    "tooltip": "Share to ...",
    "url_template": ""
  }
};

const showGeneralDialog = ref(false);
const generalUrl = ref('');

const showMastodonDialog = ref(false);
const mastodonHost = ref('');
const mastodonHostInput:any = ref(null);

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
    default: () => ["twitter", "facebook", "hackernews", "general"],
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
      item.name = service;
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

function shareToService(service: any) {
  switch (service.name) {
    case "mastodon":
      openMastodonDialog(service);
      break;
    case "general":
      showGeneralDialog.value = true;
      generalUrl.value = decodeURIComponent(shareUrl.value);
      break;
    default:
      window.open(service.url, "_blank");
  }
}

function copyUrl() {
  copyToClipboard(generalUrl.value);
  showGeneralDialog.value = false;
}

function openMastodonDialog(service:any) {
  showMastodonDialog.value = true
  const existing = localStorage.getItem('quailui_global_mastodon_host') || ''
  mastodonHost.value = existing
  setTimeout(() => {
    // focus the input field and select the text
    mastodonHostInput.value?.focus()
    mastodonHostInput.value?.select()
  }, 300)
}

function shareToMastodon() {
  const url = buildUrl(supportedServices.mastodon.url_template, {
    host: mastodonHost.value,
    text: text.value,
    textWithUrl: `${text.value}${encodeURIComponent('\n\n')}${shareUrl.value}`,
  });
  localStorage.setItem('quailui_global_mastodon_host', mastodonHost.value);
  window.open(url, "_blank");
  showMastodonDialog.value = false;
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
    margin-right: 0.5rem;
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
    margin-bottom: 0.5rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.mastodon-dialog-content {
  align-items: center;
  .service-icon {
    width: 36px;
    height: 36px;
    margin-right: 0.5rem;
  }
}

.general-dialog-content {
  display: flex;
  flex-direction: column;
  .qrcode-wrapper {
    flex: 0;
    display: flex;
    justify-content: center;
    canvas {
      border: 1px solid var(--vt-c-divider-light-1);
      border-radius: 6px;
    }
  }
  .operations {
    flex: 1;
    margin-top: 1rem;
  }
}

@media (max-width: 600px) {
  .general-dialog-content {
    flex-direction: column;
  }
  .qrcode-wrapper {
    margin-bottom: 1rem;
  }
  .operations {
    margin-left: 0;
  }
}
</style>