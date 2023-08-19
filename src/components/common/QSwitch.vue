<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  }
});

const val = ref(props.modelValue);

watch(() => props.modelValue, (value) => {
	val.value = value;
});

const emit = defineEmits(['update:modelValue', 'change']);

function change(event:any) {
  emit('update:modelValue', val.value);
  emit('change', val.value);
}


</script>

<template>
<label class="toggle">
	<input class="toggle-checkbox" type="checkbox" v-model="val" @change="change">
	<div class="toggle-switch"></div>
</label>
</template>

<style lang="scss" scoped>
.toggle {
	cursor: pointer;
	display: inline-block;
}
.toggle-switch {
	display: inline-block;
	background: #ccc;
	border-radius: 16px;
	width: 58px;
	height: 32px;
	position: relative;
	vertical-align: middle;
	transition: all 0.25s;
	&:before,
	&:after {
		content: "";
	}
	&:before {
		display: block;
		background: linear-gradient(to bottom, #fff 0%,#eee 100%);
		border-radius: 50%;
		box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
		width: 24px;
		height: 24px;
		position: absolute;
		top: 4px;
		left: 4px;
		transition: left 0.25s;
	}
	.toggle:hover &:before {
		background: linear-gradient(to bottom, #fff 0%,#fff 100%);
		box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
	}
	.toggle-checkbox:checked + & {
		background: rgb(55, 162, 255);
		&:before {
			left: 30px;
		}
	}
}
.toggle-checkbox {
	position: absolute;
	visibility: hidden;
}
</style>
