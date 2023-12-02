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
    result.push({ label: props.totalPage});
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
    <button class="prev button outlined icon" @click="prevPage" :disabled="!props.hasPrev">
      <QIconArrowLeft class="icon" />
    </button>
    <div class="page-indicators">
      <div v-for="item, ix in indicators" class="page-indicator">
        <button class="page-indicator button plain" :class="ix === val - 1? 'active': ''" :disabled="item.disabled" @click="gotoPage(ix + 1, item)">
          {{ item.label }}
        </button>
      </div>
    </div>
    <button class="next button outlined icon" @click="nextPage" :disabled="!props.hasNext">
      <QIconArrowRight class="icon" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  font-size: 0.8rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  .page-indicators {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.5rem;
  }
  .page-indicator {
    margin-left: 1px;
    margin-right: 1px;
    &[disabled] {
      opacity: 0.5;
      border: none;
      padding-left: 0.2rem;
      padding-right: 0.2rem;
    }
    &.active {
      background-color: rgba(0, 0, 0, 0.06);
    }
  }
}
</style>