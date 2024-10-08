<template>
  <div class="q-share" :class="cls">
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
          <img :src="generalDataUrl" alt="QR Code" class="frame shadow"/>
        </div>
        <div class="operations form">
          <div class="copy-row form-row">
            <q-button class="outlined block" @click="copyUrl">
              <q-icon-copy class="icon"></q-icon-copy>
              <span class="button-label">Copy URL</span>
            </q-button>
          </div>
        </div>
      </div>
    </q-dialog>
    <a v-for="serv in enabledServices" :key="`serv-${serv.name}`"
      :title="serv.tooltip" class="q-share-link" :class="serv.name"
      @click="shareToService(serv)"
    >
      <span class="q-share-link-inner" :class="serv.name">
        <component :is="serv.icon" class="icon share-icon"></component>
      </span>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from "vue";
import { copyToClipboard } from "../../utils";
import QRCode from "qrcode";

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
const generalDataUrl = ref('');

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
      QRCode.toDataURL(generalUrl.value, { width: 400, margin: 1 }, (err:any, url:any) => {
        if (err) {
          console.error(err);
          return ;
        }
        generalDataUrl.value = url;
      });
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
    background: #bbb;
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
    &:hover {
      background: #fff;
      .q-share-link-inner {
        filter: grayscale(0);
        opacity: 1 !important;
      }
    }
  }
  .q-share-link-inner {
    display: block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    filter: grayscale(1);
    transition: all 0.2s ease-in-out;
    opacity: 0.7;
    svg {
      width: 100%;
      height: 100%;
      transition: all 0.2s ease-in-out;
    }
    &.twitter {
      opacity: 0.8;
    }
    &.facebook {
      opacity: 0.6;
    }
    &.linkedin {
      opacity: 0.6;
    }
    &.mastodon {
      opacity: 0.68;
    }
    &.bluesky {
      opacity: 0.65;
    }
    &.hackernews {
      opacity: 0.7;
    }
    &.general {
      opacity: 0.63;
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
    img {
      max-width: 200px;
      max-height: 200px;
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