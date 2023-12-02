<script setup lang="ts">
import { computed, ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
  totalPage: {
    type: Number,
    default: 0,
  },
  hasPrev: {
    type: Boolean,
    default: false,
  },
  hasNext: {
    type: Boolean,
    default: false,
  },
});

const indicators = computed(() => {
  let max = 6;
  const result:any = [];
  if (props.totalPage !== 0) {
    if (props.totalPage < max) {
      for (let i = 1; i <= props.totalPage; i++) {
        result.push({ label: i });
      }
    } else {
      result.push({ label: 1});
      // check the range around the current page
      let start = val.value - 2;
      let end = val.value + 2;
      if (start < 2) {
        start = 2;
        end = start + max - 2;
      }
      if (end > props.totalPage - 1) {
        end = props.totalPage - 1;
        start = end - max + 2;
      }
      if (start > 2) {
        result.push({ label: "…", disabled: true });
      }
      for (let i = start; i <= end; i++) {
        result.push({ label: i });
      }
      if (end < props.totalPage - 1) {
        result.push({ label: "…", disabled: true });
      }
      result.push({ label: props.totalPage });
    }
  } else {

  }
  return result;
});

const val = ref(props.modelValue);

watch(() => props.modelValue, (value) => {
	val.value = value;
});

const emit = defineEmits(["change:next", "change:prev", "change:goto", "update:modelValue"]);

function prevPage() {
  val.value--;
  emit("change:prev", val.value);
  emit("update:modelValue", val.value);
}

function nextPage() {
  val.value++;
  emit("change:next", val.value);
  emit("update:modelValue", val.value);
}

function gotoPage(ix: any, item:any ) {
  if (item.disabled) {
    return;
  }
  val.value = ix;
  emit("change:goto", val.value);
  emit("update:modelValue", val.value);
}

</script>
<template>
  <div class="pagination">
    <button class="prev button sm outlined icon" @click="prevPage" :disabled="!props.hasPrev">
      <q-icon-arrow-left class="icon" ></q-icon-arrow-left>
    </button>
    <div v-if="totalPage !== 0" class="page-indicators">
      <div v-for="item in indicators" class="page-indicator">
        <button class="page-indicator button sm plain" :class="item.label === val? 'active': ''" :disabled="item.disabled" @click="gotoPage(item.label, item)">
          {{ item.label }}
        </button>
      </div>
    </div>
    <div v-else class="page-indicator-simple">
      <div class="">{{ modelValue }}</div>
    </div>
    <button class="next button sm outlined icon" @click="nextPage" :disabled="!props.hasNext">
      <q-icon-arrow-right class="icon" ></q-icon-arrow-right>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  font-size: 0.8rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .page-indicators {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.2rem;
  }
  .page-indicator {
    margin-right: 1px;
    &:last-child {
      margin-right: 0;
    }
    .button {
      padding-left: 0.6rem;
      padding-right: 0.6rem;
      opacity: 0.6;
    }
    .button[disabled] {
      opacity: 0.5;
      border: none;
      padding-left: 0rem;
      padding-right: 0rem;
    }
    .button.active {
      background-color: rgba(0, 0, 0, 0.06);
      opacity: 1;
    }
  }
  .page-indicator-simple {
    padding: 0 1rem;
    font-size: 0.9rem;
  }
}
</style>