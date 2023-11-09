<script setup lang="ts">
import { computed, ref } from "vue";

const switchValue1 = ref(true);
const switchValue2 = ref(false);
const datetimeValue = ref("2023-10-23");
const dialogValue1 = ref(false);
const menuItems = computed(() => [
  {
    title: "Item 1",
    subtitle: "Item 1: subtitle",
    icon: "QIconSun",
    action: () => {
      console.log("Item 1");
    },
  },
  {
    title: "Item 2 without icon",
    action: () => {
      console.log("Item 2");
    },
  },
  {
    divider: true,
  },
  {
    title: "Item 3 with image",
    image: "https://picsum.photos/200",
    action: () => {
      console.log("Item 3");
    },
  },
  {
    title: "Item 4, disabled",
    disabled: true,
    icon: "QIconFileLock",
    action: () => {
      console.log("Item 4");
    },
  },
  {
    title: "Item 45, danger",
    danger: true,
    icon: "QIconLogout",
    action: () => {
      console.log("Item 5");
    },
  },
]);

const selectedMenuItem = ref(menuItems.value[0]);

function dropdownMenuSelectionChanged(item: any) {
  console.log("Dropdown menu selection changed", item);
}
</script>

<template>
  <div class="container">
    <h1 class="">Quail UI</h1>
    <div>
      👉
      <a href="https://github.com/quail-ink/quail-ui" target="_blank"
        >Fork me at Github</a
      >
    </div>
    <div class="section">
      <h2 class="section-title">Buttons</h2>
      <div class="grid">
        <button class="button primary">Primary</button>
        <button class="button primary elevated">Primary</button>
        <button class="button primary" disabled>Primary</button>
        <button class="button sm primary">Small</button>
        <button class="button xs primary">Smaller</button>
        <button class="button xxs primary">Smallest</button>
        <button class="button outlined">Outlined</button>
        <button class="button outlined" disabled>Outlined</button>
        <button class="button sm outlined">Outlined</button>
        <button class="button plain">Plain</button>
        <button class="button plain" disabled>Plain</button>
        <button class="button sm plain">Plain</button>
      </div>
      <div class="grid">
        <button class="button danger">Danger</button>
        <button class="button danger" disabled>Danger</button>
        <button class="button outlined danger">Danger</button>
        <button class="button outlined danger" disabled>Danger</button>
        <button class="button plain danger">Danger</button>
        <button class="button plain danger" disabled>Danger</button>
        <button class="button sm danger">Danger</button>
        <button class="button sm outlined danger">Danger</button>
        <button class="button sm plain danger">Danger</button>
      </div>
      <div class="grid">
        <button class="button icon primary">
          <QIconPlus class="icon" />
        </button>
        <button class="button icon danger">
          <QIconTrash class="icon" />
        </button>
        <button class="button icon outlined">
          <QIconSun class="icon" />
        </button>
        <button class="button icon plain">
          <QIconQuail class="icon" />
        </button>
        <button class="button primary">
          <QIconSearch class="icon" />
          <span class="button-label">Search</span>
        </button>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Text field and Textarea</h2>
      <div class="grid">
        <input type="text" placeholder="type here!" class="text-field" />
        <textarea placeholder="type here!" class="textarea" />
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Form</h2>
      <div class="grid">
        <div class="form" style="width: 100%">
          <div class="form-row">
            <div class="form-row-left">
              <label class="form-label">General Setting</label>
              <div class="form-desc">The description about the setting.</div>
            </div>
            <div class="form-row-right">
              <QSwitch v-model="switchValue2" />
            </div>
          </div>
          <div class="form-row column">
            <div class="form-label">Put a text field</div>
            <input type="text" placeholder="type here!" class="text-field" />
            <div class="form-hint">
              What you're typing here will be an example
            </div>
          </div>
          <div class="form-row column">
            <div class="form-label">Error</div>
            <div class="form-error">It seems you're typing something wrong</div>
          </div>
          <div class="form-row">
            <button class="button primary">Save</button>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">TextField with button</h2>
      <div class="grid">
        <QTextFieldWithButton
          type="text"
          placeholder="type here!"
          action-label="Go!"
        />
        <QTextFieldWithButton
          type="text"
          placeholder="type here!"
          default-text="some default text"
          action-label="Go!"
        />
        <QTextFieldWithButton
          type="email"
          placeholder="your email here!"
          action-label="Subscribe"
        />
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Fence</h2>
      <div class="grid">
        <QFence text="Some text here to tell you something useful." />
        <QFence
          text="This will redirect you to an external page"
          link="https://quail.ink"
        />
        <QFence
          text="Some text here to tell you important information."
          type="warning"
        />
        <QFence
          text="Use your favorite icon to replace the default one."
          icon="QIconSun"
        />
        <QFence
          text="Super long text here, very blah blah bla, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Loading</h2>
      <div class="grid">
        <div class="loading-wrapper" style="padding: 1rem 0">
          <QLoading />
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Switch</h2>
      <div class="grid">
        <QSwitch v-model="switchValue1" />
        <QSwitch v-model="switchValue2" />
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Menu</h2>
      <div class="grid">
        <div
          class="menu-wrapper"
          style="width: 300px; height: 260px; position: relative"
        >
          <QMenu :items="menuItems" />
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Dropdown Menu</h2>
      <div class="grid">
        <QDropdownMenu
          :items="menuItems"
          :initial-item="selectedMenuItem"
          @change="dropdownMenuSelectionChanged"
        />
        <QDropdownMenu
          :items="menuItems"
          :initial-item="selectedMenuItem"
          hide-selected
          @change="dropdownMenuSelectionChanged"
        />
        <QDropdownMenu
          :items="menuItems"
          :initial-item="selectedMenuItem"
          hide-selected
          @change="dropdownMenuSelectionChanged"
        >
          <div>Custom content</div>
        </QDropdownMenu>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Datetime Picker</h2>
      <div class="grid">
        <QDatetimePicker v-model="datetimeValue" />
        <br/>
        <QDatetimePicker v-model="datetimeValue" disabled />
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Dialog</h2>
      <div class="grid">
        <button class="button primary" @click="dialogValue1 = true">
          Open Dialog
        </button>
        <QDialog v-model="dialogValue1" title="Hello">
          <div class="dialog-body">
            <div class="form-row center">
              <p style="text-align: center">Some text here</p>
            </div>
            <div class="form-row center">
              <button class="button primary" @click="dialogValue1 = false">
                Close
              </button>
            </div>
          </div>
        </QDialog>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 1280px;
  padding: 1rem;
  margin: 0 auto;
  h2 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
}
.section {
  margin: 2rem 0;
}
.grid {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}
</style>
